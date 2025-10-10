"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Fingerprint as FingerprintIcon,
  CheckCircle as CheckCircleIcon,
  TouchApp as TouchAppIcon,
} from "@mui/icons-material";
import { useFido } from "@/hooks/useFido";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  onBack: () => void;
}

// interface RegisterFidoResult {
//   success: boolean;
//   message: string;
// }

const FingerprintRegistration: React.FC<Props> = ({ onBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { registerFido, isLoading, error } = useFido();
  const { user } = useAuth();
  const userId = user?.userId;

  const [activeStep, setActiveStep] = useState(0);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const registrationSteps = ["Place finger", "Scan fingerprint", "Verify fingerprint", "Complete"];

  const handleStartRegistration = async () => {
    setDialogTitle("Starting registration...");
    setDialogMessage("");
    setOpenDialog(true);

    if (!userId) {
      setDialogTitle("Registration Failed");
      setDialogMessage("User ID is not available. Please log in and try again.");
      return;
    }

    const result = await registerFido(userId);

    if (result.success) {
      setRegistrationComplete(true);
      setDialogTitle("Registration Successful");
      setDialogMessage(result.message);
      setActiveStep(3);
    } else {
      setDialogTitle("Registration Failed");
      setDialogMessage(result.message);
    }
  };

  const handleNextStep = () => {
    if (activeStep === 2) {
      handleStartRegistration();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    if (activeStep === 0) {
      onBack();
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FingerprintIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h4" component="h1" color="primary">
            Fingerprint Registration
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"} sx={{ mb: 4 }}>
          {registrationSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {activeStep === 0 && (
            <Box textAlign="center">
              <Typography variant="h6">Place your finger on the scanner</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Make sure your finger is clean and dry
              </Typography>
              <TouchAppIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
            </Box>
          )}

          {activeStep === 1 && (
            <Box textAlign="center">
              <Typography variant="h6">Scanning fingerprint...</Typography>
              <CircularProgress size={100} sx={{ mt: 2 }} />
            </Box>
          )}

          {activeStep === 2 && (
            <Box textAlign="center">
              <Typography variant="h6">Verify fingerprint</Typography>
              {isLoading ? (
                <CircularProgress size={100} sx={{ mt: 2 }} />
              ) : (
                <FingerprintIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
              )}
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}

          {activeStep === 3 && registrationComplete && (
            <Box textAlign="center">
              <CheckCircleIcon sx={{ fontSize: 100, color: theme.palette.success.main }} />
              <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                Fingerprint registered successfully!
              </Typography>
            </Box>
          )}
        </Card>

        <Box display="flex" justifyContent="space-between">
          <Button onClick={handleBackStep} disabled={isLoading}>
            Back
          </Button>

          {activeStep < 3 ? (
            <Button variant="contained" onClick={handleNextStep} disabled={isLoading}>
              {activeStep === 2 ? "Verify Fingerprint" : "Next"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={onBack}
              startIcon={<CheckCircleIcon />}
            >
              Continue
            </Button>
          )}
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FingerprintRegistration;