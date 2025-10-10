"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  useTheme,
} from "@mui/material"
import {
  Fingerprint as FingerprintIcon,
  Face as FaceIcon,
  HowToReg as RegisterIcon,
  LockOpen as AuthenticateIcon,
} from "@mui/icons-material"
import FingerprintRegistration from "@/components/FingerprintRegistration"
import  FingerprintAuthentication  from "@/components/FingerprintAuthentication"
import FaceIdRegistration from "@/components/FaceIdRegistration"
import FaceIdAuthentication from "@/components/FaceIdAuthentication"
import { useAuth } from "@/hooks/useAuth"

export default function ReegisterBiometric() {
  const theme = useTheme()
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const { user, loading } = useAuth()

  const [userId, setUserId] = useState<string | null>(null)

// useEffect(() => {
//   if (!loading && user && user.userId) {
//     setUserId(user.userId)
//   }
// }, [user, loading])

useEffect(() => {
  if (!loading && user && user.userId) {
    setUserId(user.userId)
  }
}, [user, loading])

  const handleComponentChange = (component: string) => {
    setActiveComponent(component)
  }

  const handleBackToDashboard = () => {
    setActiveComponent(null)
  }

  if (loading) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h6" align="center">Loading authentication status...</Typography>
    </Container>
  )
}

  const renderActiveComponent = () => {
    if (!userId) {
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="error">
            User Details not found. Please log in again.
          </Typography>
        </Box>
      )
    }

    switch (activeComponent) {
      case "fingerprint-registration":
        return <FingerprintRegistration onBack={handleBackToDashboard} />;
      case "fingerprint-authentication":
        return <FingerprintAuthentication onBack={handleBackToDashboard} onAuthenticated={() => console.log("Fingerprint Authenticated!")} />;
      case "faceid-registration":
        return <FaceIdRegistration userId={userId} onBack={handleBackToDashboard}/>;
      case "faceid-authentication":
        return <FaceIdAuthentication onBack={handleBackToDashboard} onAuthenticated={() => console.log("Face Id Authenticated!")} />;
      default:
        return renderDashboard();
    }
  }

  const renderDashboard = () => {
    return (
      <>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Biometric Authentication
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Secure your application with fingerprint and face recognition
          </Typography>
        </Box>

        <Grid container spacing={4}>
          
          <Grid item xs={12} md={6}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 30px rgba(0, 0, 0, 0.12)",
                },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "8px",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                }}
              />

              <CardContent sx={{ textAlign: "center", py: 5, px: 4 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px auto",
                    position: "relative",
                  }}
                >
                  <FingerprintIcon sx={{ fontSize: 70, color: theme.palette.primary.main }} />
                  
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: `2px dashed ${theme.palette.primary.main}`,
                      opacity: 0.3,
                      animation: "rotate 15s linear infinite",
                      "@keyframes rotate": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
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
                      animation: "rotate 10s linear infinite reverse",
                    }}
                  />
                </Box>

                <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                  Fingerprint
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
                  Register and authenticate using your fingerprint for secure access. Fingerprint biometrics offer a
                  convenient and secure way to verify your identity.
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    opacity: 0.2,
                    mb: 3,
                  }}
                >
                  <svg width="200" height="40" viewBox="0 0 200 40">
                    <path
                      d="M30,20 C60,5 140,5 170,20 M40,20 C65,8 135,8 160,20 M50,20 C70,12 130,12 150,20 M60,20 C75,16 125,16 140,20 M70,20 C80,18 120,18 130,20"
                      fill="none"
                      stroke={theme.palette.primary.main}
                      strokeWidth="1.5"
                    />
                  </svg>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", pb: 5, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<RegisterIcon />}
                  onClick={() => handleComponentChange("fingerprint-registration")}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                    },
                  }}
                >
                  Register
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<AuthenticateIcon />}
                  onClick={() => handleComponentChange("fingerprint-authentication")}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    borderWidth: "2px",
                    "&:hover": {
                      borderWidth: "2px",
                    },
                  }}
                >
                  Authenticate
                </Button>
              </CardActions>
            </Card>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 30px rgba(0, 0, 0, 0.12)",
                },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "8px",
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                }}
              />

              <CardContent sx={{ textAlign: "center", py: 5, px: 4 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px auto",
                    position: "relative",
                  }}
                >
                  <FaceIcon sx={{ fontSize: 70, color: theme.palette.primary.main }} />
                  
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(to bottom, 
                          rgba(33, 150, 243, 0) 0%, 
                          rgba(33, 150, 243, 0.1) 49%, 
                          rgba(33, 150, 243, 0.2) 50%, 
                          rgba(33, 150, 243, 0.1) 51%, 
                          rgba(33, 150, 243, 0) 100%)`,
                        backgroundSize: "100% 20px",
                        animation: "scanMove 3s linear infinite",
                        "@keyframes scanMove": {
                          "0%": { top: "-100%" },
                          "100%": { top: "100%" },
                        },
                      }}
                    />
                  </Box>

                  {/* Add facial recognition points */}
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: 0.4,
                    }}
                  >
                    <circle cx="60" cy="40" r="2" fill={theme.palette.primary.main} />
                    <circle cx="60" cy="80" r="2" fill={theme.palette.primary.main} />
                    <circle cx="40" cy="60" r="2" fill={theme.palette.primary.main} />
                    <circle cx="80" cy="60" r="2" fill={theme.palette.primary.main} />
                    <circle cx="45" cy="45" r="2" fill={theme.palette.primary.main} />
                    <circle cx="75" cy="45" r="2" fill={theme.palette.primary.main} />
                    <circle cx="60" cy="60" r="2" fill={theme.palette.primary.main} />
                    <circle cx="60" cy="70" r="2" fill={theme.palette.primary.main} />
                  </svg>
                </Box>

                <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                  Face ID
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
                  Register and authenticate using facial recognition for secure access. Face ID provides a contactless
                  and intuitive way to verify your identity.
                </Typography>

                
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    opacity: 0.2,
                    mb: 3,
                  }}
                >
                  <svg width="120" height="40" viewBox="0 0 120 40">
                    <rect
                      x="10"
                      y="5"
                      width="100"
                      height="30"
                      rx="15"
                      stroke={theme.palette.primary.main}
                      strokeWidth="1"
                      fill="none"
                    />
                    <line x1="60" y1="5" x2="60" y2="35" stroke={theme.palette.primary.main} strokeWidth="1" />
                    <line x1="10" y1="20" x2="110" y2="20" stroke={theme.palette.primary.main} strokeWidth="1" />
                  </svg>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", pb: 5, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<RegisterIcon />}
                  onClick={() => handleComponentChange("faceid-registration")}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                    },
                  }}
                >
                  Register
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<AuthenticateIcon />}
                  onClick={() => handleComponentChange("faceid-authentication")}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    borderWidth: "2px",
                    "&:hover": {
                      borderWidth: "2px",
                    },
                  }}
                >
                  Authenticate
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
          minHeight: "80vh",
        }}
      >
        {renderActiveComponent()}
      </Paper>
    </Container>
  )
}
