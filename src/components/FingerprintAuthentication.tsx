'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Fingerprint as FingerprintIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  LockOpen as LockOpenIcon,
} from '@mui/icons-material';

import { base64urlToBuffer, bufferToBase64url } from '../utils/base64url';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  onBack: () => void;
  onAuthenticated: () => void;
}

interface PublicKeyCredentialDescriptorJSON {
  type: PublicKeyCredentialType;
  id: string;
  transports?: AuthenticatorTransport[];
}

const FingerprintAuthentication: React.FC<Props> = ({ onBack, onAuthenticated }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const userId = user?.userId;

  const [authScanning, setAuthScanning] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [pulseAnimation, setPulseAnimation] = useState(true);

  const baseUrl = '/api/fido';

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleStartAuthentication = async () => {
    if (!userId) {
      setAuthError('User not found. Please log in again.');
      setDialogTitle('Authentication Error');
      setDialogMessage('Unable to find user ID.');
      setOpenDialog(true);
      return;
    }

    setAuthScanning(true);
    setAuthProgress(0);
    setAuthError(null);
    setAuthenticated(false);

    setStatusProgress(5);

    try {
      const res = await fetch(`${baseUrl}/authenticate/initiate/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to initiate authentication');
      const options: PublicKeyCredentialRequestOptions = await res.json();

      options.challenge = base64urlToBuffer(options.challenge as unknown as string);

      if (options.allowCredentials) {
        const creds = options.allowCredentials as unknown as PublicKeyCredentialDescriptorJSON[];

        options.allowCredentials = creds.map((cred) => ({
          type: cred.type,
          id: base64urlToBuffer(cred.id),
          transports: cred.transports,
        }));
      }


      const assertion = (await navigator.credentials.get({
        publicKey: options,
      })) as PublicKeyCredential;

      const authResponse = {
        id: assertion.id,
        rawId: bufferToBase64url(assertion.rawId),
        type: assertion.type,
        response: {
          clientDataJSON: bufferToBase64url(assertion.response.clientDataJSON),
          authenticatorData: bufferToBase64url(
            (assertion.response as AuthenticatorAssertionResponse).authenticatorData
          ),
          signature: bufferToBase64url(
            (assertion.response as AuthenticatorAssertionResponse).signature
          ),
          userHandle: (assertion.response as AuthenticatorAssertionResponse).userHandle
            ? bufferToBase64url((assertion.response as AuthenticatorAssertionResponse).userHandle!)
            : null,
        },
      };

      const verifyRes = await fetch(`${baseUrl}/authenticate`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          response: authResponse,
        }),
      });

      const result: { verified: boolean } = await verifyRes.json();

      setAuthScanning(false);

      if (result.verified) {
        setAuthenticated(true);
        setDialogTitle('Authentication Successful');
        setDialogMessage('Your identity has been verified successfully.');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      console.error(error);
      setAuthError(error.message || 'Authentication failed. Please try again.');
      setDialogTitle('Authentication Failed');
      setDialogMessage('We couldn’t verify your fingerprint. Please try again.');
    } finally {
      setOpenDialog(true);
      setAuthProgress(100);
    }
  };

  const setStatusProgress = (start: number) => {
    let current = start;
    const interval = setInterval(() => {
      current += 5;
      setAuthProgress(current);
      if (current >= 100 || !authScanning) {
        clearInterval(interval);
      }
    }, 80);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (authenticated) {
      onAuthenticated?.();
    }
  };

  const renderAuthenticationContent = () => {
    return (
      <Box>
        <Card
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            minHeight: 350,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {authScanning ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Authenticating...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Keep your finger on the scanner
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <CircularProgress
                  variant="determinate"
                  value={authProgress}
                  size={150}
                  thickness={4}
                  sx={{ color: theme.palette.primary.main }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FingerprintIcon
                    sx={{
                      fontSize: 80,
                      color: theme.palette.primary.main,
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.6 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.6 },
                      },
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {`${Math.round(authProgress)}%`}
              </Typography>
            </Box>
          ) : authenticated ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Authentication Successful
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your identity has been verified
              </Typography>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.success.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <LockOpenIcon sx={{ fontSize: 80, color: theme.palette.success.dark }} />
              </Box>
              <Typography variant="body1" color="success.main" sx={{ mt: 3 }}>
                Welcome back! You are now logged in.
              </Typography>
            </Box>
          ) : authError ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Authentication Failed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {authError}
              </Typography>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.error.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <ErrorIcon sx={{ fontSize: 80, color: theme.palette.error.dark }} />
              </Box>
              <Typography variant="body1" color="error" sx={{ mt: 3 }}>
                Please try again or use an alternative method.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Fingerprint Authentication
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Place your finger on the scanner to authenticate
              </Typography>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.grey[200],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  animation: pulseAnimation ? 'pulse 1.5s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0.4)' },
                    '70%': { boxShadow: '0 0 0 15px rgba(33, 150, 243, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0)' },
                  },
                }}
              >
                <FingerprintIcon sx={{ fontSize: 80, color: theme.palette.grey[500] }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                Touch the fingerprint sensor to verify your identity
              </Typography>
            </Box>
          )}
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={onBack} disabled={authScanning}>
            Back
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setAuthScanning(false);
              setAuthProgress(0);
              setAuthenticated(false);
              setAuthError(null);
            }}
            disabled={authScanning}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleStartAuthentication}
            disabled={authScanning}
            startIcon={<FingerprintIcon />}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
            }}
          >
            Authenticate
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FingerprintIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h4" component="h1" color="primary">
            Fingerprint Authentication
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {renderAuthenticationContent()}
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: dialogTitle.includes('Successful')
              ? theme.palette.success.light
              : theme.palette.error.light,
            color: dialogTitle.includes('Successful')
              ? theme.palette.success.contrastText
              : theme.palette.error.contrastText,
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            {dialogTitle.includes('Successful') ? (
              <CheckCircleIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
            ) : (
              <ErrorIcon color="error" sx={{ mr: 2, fontSize: 40 }} />
            )}
            <DialogContentText>{dialogMessage}</DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color={dialogTitle.includes('Successful') ? 'success' : 'primary'}
            autoFocus
          >
            {dialogTitle.includes('Successful') ? 'Continue' : 'Try Again'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FingerprintAuthentication;
