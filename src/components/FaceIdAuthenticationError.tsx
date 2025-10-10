"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
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
  CameraAlt as CameraIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  VideocamOff as VideocamOffIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"

interface FaceIdAuthenticationProps {
  onBack: () => void
}

const FaceIdAuthenticationError: React.FC<FaceIdAuthenticationProps> = ({ onBack }) => {
  const theme = useTheme()

  // State
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null)
  const [faceDetected, setFaceDetected] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMessage, setDialogMessage] = useState("")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [registeredImage, setRegisteredImage] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const faceIdRegistered = localStorage.getItem("faceIdRegistered") === "true"
    const storedImage = localStorage.getItem("faceIdImage")

    setIsRegistered(faceIdRegistered)
    if (storedImage) {
      setRegisteredImage(storedImage)
    }
  }, [])

  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  // Progress animation
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 4
        })
      }, 80)

      return () => clearInterval(interval)
    } else {
      setScanProgress(0)
    }
  }, [scanning])

  // Face overlay animation
  useEffect(() => {
    if (cameraActive && overlayRef.current) {
      const ctx = overlayRef.current.getContext("2d")
      if (!ctx) return

      let animationFrame: number
      let scanPosition = 0
      let scanDirection = 1

      const drawFaceOverlay = () => {
        if (!overlayRef.current) return

        const width = overlayRef.current.width
        const height = overlayRef.current.height

        ctx.clearRect(0, 0, width, height)

        // Only draw face detection overlay when not scanning
        if (!scanning) {
          const centerX = width / 2
          const centerY = height / 2
          const radiusX = width * 0.3
          const radiusY = height * 0.4

          // Draw face outline
          ctx.strokeStyle = faceDetected ? "rgba(76, 175, 80, 0.8)" : "rgba(33, 150, 243, 0.8)"
          ctx.lineWidth = 3

          // Draw oval face guide
          ctx.beginPath()
          ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
          ctx.stroke()

          // Add corner markers for a more technical look
          const markerLength = 20
          const corners = [
            { x: centerX - radiusX, y: centerY - radiusY }, // top-left
            { x: centerX + radiusX, y: centerY - radiusY }, // top-right
            { x: centerX + radiusX, y: centerY + radiusY }, // bottom-right
            { x: centerX - radiusX, y: centerY + radiusY }, // bottom-left
          ]

          ctx.strokeStyle = faceDetected ? "rgba(76, 175, 80, 0.9)" : "rgba(33, 150, 243, 0.9)"
          ctx.lineWidth = 2

          corners.forEach((corner) => {
            // Horizontal line
            ctx.beginPath()
            ctx.moveTo(corner.x - (corner.x === centerX - radiusX ? -markerLength : markerLength), corner.y)
            ctx.lineTo(corner.x, corner.y)
            ctx.stroke()

            // Vertical line
            ctx.beginPath()
            ctx.moveTo(corner.x, corner.y - (corner.y === centerY - radiusY ? -markerLength : markerLength))
            ctx.lineTo(corner.x, corner.y)
            ctx.stroke()
          })

          // Draw scanning animation when face is detected
          if (faceDetected) {
            // Update scan position
            scanPosition += scanDirection * 2
            if (scanPosition > radiusY || scanPosition < -radiusY) {
              scanDirection *= -1
            }

            // Draw horizontal scan line
            const scanY = centerY + scanPosition

            // Create gradient for scan line
            const gradient = ctx.createLinearGradient(centerX - radiusX, scanY, centerX + radiusX, scanY)
            gradient.addColorStop(0, "rgba(33, 150, 243, 0)")
            gradient.addColorStop(0.5, "rgba(33, 150, 243, 0.8)")
            gradient.addColorStop(1, "rgba(33, 150, 243, 0)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(centerX - radiusX - 10, scanY)
            ctx.lineTo(centerX + radiusX + 10, scanY)
            ctx.stroke()

            // Add glow effect
            ctx.strokeStyle = "rgba(33, 150, 243, 0.3)"
            ctx.lineWidth = 6
            ctx.beginPath()
            ctx.moveTo(centerX - radiusX - 10, scanY)
            ctx.lineTo(centerX + radiusX + 10, scanY)
            ctx.stroke()

            // Add measurement points along the scan line
            ctx.fillStyle = "rgba(33, 150, 243, 0.8)"
            for (let x = centerX - radiusX; x <= centerX + radiusX; x += radiusX / 3) {
              ctx.beginPath()
              ctx.arc(x, scanY, 2, 0, 2 * Math.PI)
              ctx.fill()
            }

            // Add facial recognition points when face is detected
            const facePoints = [
              { x: centerX, y: centerY - radiusY * 0.5 }, // forehead
              { x: centerX, y: centerY + radiusY * 0.5 }, // chin
              { x: centerX - radiusX * 0.5, y: centerY }, // left cheek
              { x: centerX + radiusX * 0.5, y: centerY }, // right cheek
              { x: centerX - radiusX * 0.3, y: centerY - radiusY * 0.2 }, // left eye
              { x: centerX + radiusX * 0.3, y: centerY - radiusY * 0.2 }, // right eye
              { x: centerX, y: centerY + radiusY * 0.1 }, // nose
              { x: centerX, y: centerY + radiusY * 0.3 }, // mouth
            ]

            ctx.fillStyle = "rgba(33, 150, 243, 0.8)"
            facePoints.forEach((point) => {
              ctx.beginPath()
              ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI)
              ctx.fill()

              // Add connecting lines between points for a mesh effect
              if (Math.abs(scanY - point.y) < 20) {
                ctx.strokeStyle = "rgba(33, 150, 243, 0.8)"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(point.x - 30, point.y)
                ctx.lineTo(point.x + 30, point.y)
                ctx.stroke()
              }
            })

            // Add data visualization text
            ctx.font = "10px monospace"
            ctx.fillStyle = "rgba(33, 150, 243, 0.9)"
            ctx.fillText(
              `SCAN: ${Math.round(((scanPosition + radiusY) / (radiusY * 2)) * 100)}%`,
              centerX + radiusX + 15,
              scanY,
            )
            ctx.fillText(`Y: ${Math.round(scanY)}`, centerX - radiusX - 50, scanY)
          }
        }

        animationFrame = requestAnimationFrame(drawFaceOverlay)
      }

      drawFaceOverlay()

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [cameraActive, faceDetected, scanning])

  // Start camera with real device access
  const startCamera = async () => {
    try {
      setCameraPermissionError(null)

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((err) => {
              console.error("Error playing video:", err)
              setCameraPermissionError("Error starting video stream. Please try again.")
            })
          }
          setCameraActive(true)

          // Simulate face detection after a delay
          setTimeout(() => {
            setFaceDetected(true)
          }, 2000)
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraPermissionError(
        "Camera access denied. Please allow camera access in your browser settings and refresh the page.",
      )
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraActive(false)
    setFaceDetected(false)
  }

  // Capture image from video
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480

        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/png")
        setCurrentImage(imageDataUrl)
        return imageDataUrl
      }
    }
    return null
  }

  const handleStartVerification = () => {
    if (!faceDetected) {
      setError("No face detected. Please position your face in the frame.")
      return
    }

    if (!isRegistered) {
      setError("No face registered. Please register your face first.")
      return
    }

    setScanning(true)
    setError(null)

    // Capture the current face image for verification
    captureImage()

    // Simulate verification process
    setTimeout(() => {
      setScanning(false)

      // 90% chance of successful verification for demo purposes
      if (Math.random() > 0.1) {
        setAuthenticated(true)
        setDialogTitle("Authentication Successful")
        setDialogMessage("Your identity has been verified successfully.")
      } else {
        setError("Face verification failed. Please try again.")
        setDialogTitle("Authentication Failed")
        setDialogMessage(
          "We couldn't verify your identity. Please try again or use an alternative authentication method.",
        )
      }

      setOpenDialog(true)
    }, 2000)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <LockIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h4" component="h1" color="primary">
          Face ID Authentication
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {!isRegistered && (
        <Alert severity="warning" sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
          No face registered. Please register your face first.
        </Alert>
      )}

      <Card
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 400,
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
          }}
        >
          {cameraActive ? (
            <>
              <video
                ref={videoRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: scanning ? 0.7 : 1,
                }}
                autoPlay
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                style={{
                  display: "none",
                }}
              />
              <canvas
                ref={overlayRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
                width={800}
                height={400}
              />
              {scanning && (
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CircularProgress
                      variant="determinate"
                      value={scanProgress}
                      color="primary"
                      size={100}
                      thickness={4}
                      sx={{
                        boxShadow: "0 0 20px rgba(33, 150, 243, 0.5)",
                        borderRadius: "50%",
                      }}
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
                        flexDirection: "column",
                      }}
                    >
                      <LockOpenIcon
                        sx={{
                          fontSize: 50,
                          color: "white",
                          animation: "pulse 1.5s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.6, transform: "scale(0.95)" },
                            "50%": { opacity: 1, transform: "scale(1)" },
                            "100%": { opacity: 0.6, transform: "scale(0.95)" },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="h6" color="white" sx={{ mt: 3, fontWeight: "bold" }}>
                    Verifying identity... {Math.round(scanProgress)}%
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ mt: 1, maxWidth: "80%", textAlign: "center" }}>
                    {scanProgress < 30
                      ? "Analyzing facial features..."
                      : scanProgress < 60
                        ? "Comparing with registered template..."
                        : scanProgress < 90
                          ? "Verifying identity..."
                          : "Authentication almost complete..."}
                  </Typography>
                </Box>
              )}
              {authenticated && !scanning && (
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 30px rgba(76, 175, 80, 0.5)",
                      animation: "expand 0.5s ease-out",
                      "@keyframes expand": {
                        "0%": { transform: "scale(0)" },
                        "70%": { transform: "scale(1.1)" },
                        "100%": { transform: "scale(1)" },
                      },
                    }}
                  >
                    <CheckCircleIcon
                      color="success"
                      sx={{
                        fontSize: 80,
                        animation: "fadeIn 0.5s ease-out",
                        "@keyframes fadeIn": {
                          "0%": { opacity: 0 },
                          "100%": { opacity: 1 },
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    color="white"
                    sx={{
                      mt: 3,
                      fontWeight: "bold",
                      animation: "slideUp 0.5s ease-out",
                      "@keyframes slideUp": {
                        "0%": { transform: "translateY(20px)", opacity: 0 },
                        "100%": { transform: "translateY(0)", opacity: 1 },
                      },
                    }}
                  >
                    Authentication Successful
                  </Typography>
                  <Typography
                    variant="body1"
                    color="white"
                    sx={{
                      mt: 1,
                      opacity: 0.8,
                      animation: "slideUp 0.5s ease-out 0.1s",
                      animationFillMode: "both",
                    }}
                  >
                    Welcome back! Your identity has been verified.
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
              }}
            >
              <CameraIcon sx={{ fontSize: 80, mb: 3 }} />
              <Typography variant="h6">Camera is turned off</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={startCamera}
                sx={{ mt: 3 }}
                startIcon={<CameraIcon />}
                size="large"
                disabled={!isRegistered}
              >
                Turn on camera
              </Button>
              {cameraPermissionError && (
                <Alert severity="error" sx={{ mt: 3, maxWidth: "80%" }}>
                  {cameraPermissionError}
                </Alert>
              )}
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Face Authentication
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Verify your identity using Face ID. Look directly at the camera and ensure your face is clearly visible.
          </Typography>

          {error && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                mt: 3,
                bgcolor: theme.palette.error.light,
                borderRadius: 1,
              }}
            >
              <ErrorIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            {cameraActive ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={stopCamera}
                startIcon={<VideocamOffIcon />}
                disabled={scanning}
              >
                Turn off camera
              </Button>
            ) : (
              <Button variant="outlined" onClick={onBack} startIcon={<ArrowBackIcon />}>
                Back to Dashboard
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleStartVerification}
              disabled={!cameraActive || scanning || !faceDetected || !isRegistered}
              startIcon={<LockOpenIcon />}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
              }}
            >
              Verify Identity
            </Button>
          </Box>

          {authenticated && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "success.light",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1" color="success.dark">
                Identity verified successfully
              </Typography>
            </Box>
          )}
        </Box>

        {authenticated && currentImage && registeredImage && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Authentication Result
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, mt: 2, flexWrap: "wrap" }}
            >
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Registered Face:
                </Typography>
                <Box
                  component="img"
                  src={registeredImage}
                  alt="Registered face"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 150,
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
              </Box>
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Authenticated Face:
                </Typography>
                <Box
                  component="img"
                  src={currentImage}
                  alt="Authenticated face"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 150,
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body1" color="success.main">
                Face match successful with 98% confidence
              </Typography>
            </Box>
          </Box>
        )}
      </Card>

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

export default FaceIdAuthenticationError
