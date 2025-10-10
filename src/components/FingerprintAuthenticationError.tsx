"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
  useTheme,
  Alert,
  IconButton,
} from "@mui/material"
import {
  Fingerprint as FingerprintIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Refresh as RefreshIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"

interface FingerprintAuthenticationProps {
  onBack: () => void
}

const FingerprintAuthentication: React.FC<FingerprintAuthenticationProps> = ({ onBack }) => {
  const theme = useTheme()
  const [scanning, setScanning] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMessage, setDialogMessage] = useState("")
  const [pulseAnimation, setPulseAnimation] = useState(true)
  const [scanProgress, setScanProgress] = useState(0)
  const [isRegistered, setIsRegistered] = useState(true)

  useEffect(() => {
    // Check if fingerprint is registered
    const fingerprintRegistered = localStorage.getItem("fingerprintRegistered") === "true"
    setIsRegistered(fingerprintRegistered)
  }, [])

  useEffect(() => {
    // Create pulse animation effect
    const interval = setInterval(() => {
      setPulseAnimation((prev) => !prev)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // useEffect(() => {
  //   if (scanning) {
  //     const interval = setInterval(() => {
  //       setScanProgress((prev) => {
  //         if (prev >= 100) {
  //           clearInterval(interval)
  //           return 100
  //         }
  //         return prev + 5
  //       })
  //     }, 100)

  //     return () => clearInterval(interval)
  //   } else {
  //     setScanProgress(0)
  //   }
  // }, [scanning])

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setScanProgress(0)
    }
  }, [])

  const handleStartAuthentication = () => {
    setScanning(true)
    setError(null)
    setAuthenticated(false)


    setTimeout(() => {
      setScanning(false)

      if (Math.random() > 0.2) {
        setAuthenticated(true)
        setDialogTitle("Authentication Successful")
        setDialogMessage("Your identity has been verified successfully.")
      } else {
        setError("Fingerprint verification failed. Please try again.")
        setDialogTitle("Authentication Failed")
        setDialogMessage(
          "We couldn't verify your fingerprint. Please try again or use an alternative authentication method.",
        )
      }

      setOpenDialog(true)
    }, 2000)
  }

  const handleReset = () => {
    setScanning(false)
    setAuthenticated(false)
    setError(null)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const renderScannerState = () => {
    if (!isRegistered) {
      return (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            No fingerprint registered. Please register your fingerprint first.
          </Alert>
          <Box
            sx={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: theme.palette.grey[200],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 3,
              boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LockIcon
              sx={{
                fontSize: 100,
                color: theme.palette.grey[500],
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Fingerprint authentication Failed
          </Typography>
          <Button variant="contained" color="primary" onClick={onBack} sx={{ mt: 3 }}>
            Go to Dashboard
          </Button>
        </Box>
      )
    }

    if (scanning) {
      return (
        <Box sx={{ position: "relative", textAlign: "center", p: 4 }}>
          <Box
            sx={{
              position: "relative",
              width: 250,
              height: 250,
              margin: "0 auto",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={scanProgress}
              size={250}
              thickness={4}
              sx={{ color: theme.palette.primary.main }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.grey[200],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <FingerprintIcon
                  sx={{
                    fontSize: 120,
                    color: theme.palette.primary.main,
                    opacity: 0.7,
                  }}
                />

                {/* Scanning effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(to bottom, 
                    rgba(33, 150, 243, 0) 0%, 
                    rgba(33, 150, 243, 0.2) 49%, 
                    rgba(33, 150, 243, 0.4) 50%, 
                    rgba(33, 150, 243, 0.2) 51%, 
                    rgba(33, 150, 243, 0) 100%)`,
                    backgroundSize: "100% 20px",
                    animation: "scanMove 2s linear infinite",
                    "@keyframes scanMove": {
                      "0%": { top: "-100%" },
                      "100%": { top: "100%" },
                    },
                  }}
                />

                {/* Glowing ring */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    boxShadow: `0 0 20px 5px rgba(33, 150, 243, ${scanProgress / 200})`,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
            Authenticating...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Keep your finger on the scanner
          </Typography>

          <Box sx={{ mt: 3, maxWidth: 400, mx: "auto" }}>
            <Box
              sx={{
                position: "relative",
                height: 8,
                bgcolor: theme.palette.grey[200],
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${scanProgress}%`,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 4,
                  transition: "width 0.3s ease",
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
              {scanProgress < 30
                ? "Reading fingerprint..."
                : scanProgress < 60
                  ? "Analyzing patterns..."
                  : scanProgress < 90
                    ? "Verifying identity..."
                    : "Authentication almost complete..."}
            </Typography>
          </Box>
        </Box>
      )
    }

    if (authenticated) {
      return (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              position: "relative",
              boxShadow: "0 0 30px rgba(76, 175, 80, 0.3)",
              animation: "successPulse 2s infinite",
              "@keyframes successPulse": {
                "0%": { boxShadow: "0 0 30px rgba(76, 175, 80, 0.3)" },
                "50%": { boxShadow: "0 0 30px rgba(76, 175, 80, 0.6)" },
                "100%": { boxShadow: "0 0 30px rgba(76, 175, 80, 0.3)" },
              },
            }}
          >
            <LockOpenIcon
              sx={{
                fontSize: 100,
                color: theme.palette.success.main,
                animation: "fadeInScale 0.5s ease-out",
                "@keyframes fadeInScale": {
                  "0%": { opacity: 0, transform: "scale(0.5)" },
                  "70%": { opacity: 1, transform: "scale(1.1)" },
                  "100%": { opacity: 1, transform: "scale(1)" },
                },
              }}
            />
          </Box>
          <Typography variant="h4" color="success.main" sx={{ mt: 3, fontWeight: "bold" }}>
            Authentication Successful
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            You have been successfully authenticated
          </Typography>

          {/* Add a visual fingerprint pattern for a nice touch */}
          <Box
            sx={{
              mt: 3,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              opacity: 0.7,
            }}
          >
            <svg width="200" height="60" viewBox="0 0 200 60">
              <path
                d="M30,30 C60,10 140,10 170,30 M40,30 C65,15 135,15 160,30 M50,30 C70,20 130,20 150,30 M60,30 C75,25 125,25 140,30 M70,30 C80,28 120,28 130,30"
                fill="none"
                stroke={theme.palette.success.main}
                strokeWidth="1.5"
              />
            </svg>
          </Box>
        </Box>
      )
    }

    if (error) {
      return (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              boxShadow: "0 0 30px rgba(244, 67, 54, 0.3)",
              animation: "errorPulse 2s infinite",
              "@keyframes errorPulse": {
                "0%": { boxShadow: "0 0 30px rgba(244, 67, 54, 0.3)" },
                "50%": { boxShadow: "0 0 30px rgba(244, 67, 54, 0.6)" },
                "100%": { boxShadow: "0 0 30px rgba(244, 67, 54, 0.3)" },
              },
            }}
          >
            <ErrorIcon
              sx={{
                fontSize: 100,
                color: theme.palette.error.main,
                animation: "shake 0.5s ease-out",
                "@keyframes shake": {
                  "0%, 100%": { transform: "translateX(0)" },
                  "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
                  "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
                },
              }}
            />
          </Box>
          <Typography variant="h5" color="error" sx={{ mt: 3, fontWeight: "bold" }}>
            Authentication Failed
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {error}
          </Typography>

          {/* Add a broken fingerprint pattern for a nice touch */}
          <Box
            sx={{
              mt: 3,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              opacity: 0.7,
            }}
          >
            <svg width="200" height="60" viewBox="0 0 200 60">
              <path
                d="M30,30 C45,20 70,15 90,30 M110,30 C130,15 155,20 170,30 M40,30 C50,22 65,20 80,30 M120,30 C135,20 150,22 160,30 M50,30 C60,25 70,25 80,30 M120,30 C130,25 140,25 150,30"
                fill="none"
                stroke={theme.palette.error.main}
                strokeWidth="1.5"
                strokeDasharray="5,5"
              />
            </svg>
          </Box>
        </Box>
      )
    }

    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: theme.palette.grey[200],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            position: "relative",
            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.1)",
            animation: pulseAnimation ? "pulse 1.5s infinite" : "none",
            "@keyframes pulse": {
              "0%": {
                boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(33, 150, 243, 0.4)",
              },
              "70%": {
                boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 15px rgba(33, 150, 243, 0)",
              },
              "100%": {
                boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(33, 150, 243, 0)",
              },
            },
          }}
        >
          <FingerprintIcon
            sx={{
              fontSize: 120,
              color: theme.palette.grey[500],
            }}
          />

          {/* Add concentric circles for a target effect */}
          <Box
            sx={{
              position: "absolute",
              width: "70%",
              height: "70%",
              borderRadius: "50%",
              border: `2px dashed ${theme.palette.primary.main}`,
              opacity: 0.3,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "85%",
              height: "85%",
              borderRadius: "50%",
              border: `2px dashed ${theme.palette.primary.main}`,
              opacity: 0.2,
              animation: "rotate 15s linear infinite reverse",
              "@keyframes rotate": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>
        <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
          Place your finger on the scanner
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Touch the fingerprint sensor to authenticate
        </Typography>

        {/* Add a fingerprint pattern for a nice touch */}
        <Box
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            opacity: 0.3,
          }}
        >
          <svg width="200" height="60" viewBox="0 0 200 60">
            <path
              d="M30,30 C60,10 140,10 170,30 M40,30 C65,15 135,15 160,30 M50,30 C70,20 130,20 150,30 M60,30 C75,25 125,25 140,30 M70,30 C80,28 120,28 130,30"
              fill="none"
              stroke={theme.palette.grey[400]}
              strokeWidth="1.5"
            />
          </svg>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <LockIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h4" component="h1" color="primary">
          Fingerprint Authentication
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        {renderScannerState()}
      </Card>

      {isRegistered && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4, maxWidth: 800, mx: "auto" }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={scanning}
            startIcon={<RefreshIcon />}
            sx={{ borderRadius: 2 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleStartAuthentication}
            disabled={scanning}
            startIcon={<FingerprintIcon />}
            sx={{
              borderRadius: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
            }}
          >
            Authenticate
          </Button>
        </Box>
      )}

      {/* Result Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: authenticated ? theme.palette.success.light : theme.palette.error.light,
            color: authenticated ? theme.palette.success.contrastText : theme.palette.error.contrastText,
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            {authenticated ? (
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
            color={authenticated ? "success" : "primary"}
            autoFocus
          >
            {authenticated ? "Continue" : "Try Again"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FingerprintAuthentication
