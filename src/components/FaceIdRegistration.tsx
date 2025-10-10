"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  GlobalStyles,
} from "@mui/material";
import {
  Face as FaceIcon,
  Camera as CameraIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useFaceIdRegistration } from "@/hooks/useFaceIdRegistration";

interface FaceIdRegistrationProps {
  userId: string;
  onBack: () => void;
}

const FaceIdRegistration = ({ userId, onBack }: FaceIdRegistrationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [image, setImage] = useState<File | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const { registerFaceId, loading, error, success, response } = useFaceIdRegistration(
    userId,
    image
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   return () => {
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, [stream]);

    useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setCameraStarted(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setCameraStarted(false);
  };

  const toggleCamera = () => {
    if (cameraStarted) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(dataUrl);

        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "captured_image.png", { type: "image/png" });
            setImage(file);
          });
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      registerFaceId();
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes verticalLine": {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: `translateY(${isMobile ? 240 : 480}px)` },
            "100%": { transform: "translateY(0)" },
          },
          "@keyframes pulse": {
            "0%": {
              boxShadow: "0 0 0 0 rgba(33, 150, 243, 0.4)",
            },
            "70%": {
              boxShadow: "0 0 0 15px rgba(33, 150, 243, 0)",
            },
            "100%": {
              boxShadow: "0 0 0 0 rgba(33, 150, 243, 0)",
            },
          },
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      />

      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FaceIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h4" component="h1" color="primary">
              Face ID Registration
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <form onSubmit={handleSubmit}>
              <Card
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "black",
                  animation: "none",
                }}
              >
                <Box sx={{ background: '#fff', width: '100%', paddingLeft: '15px', borderRadius: '10px', marginBottom: '10px' }}>
                  <Typography variant="h6" gutterBottom>
                    Capture Your Face
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Position your face within the camera frame
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: isMobile ? "100%" : 640,
                    height: isMobile ? 240 : 480,
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover" }}
                  />

                  {cameraStarted && !loading && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 4,
                        backgroundColor: theme.palette.success.main,
                        opacity: 0.7,
                        borderRadius: 2,
                        animation: "verticalLine 3s ease-in-out infinite",
                      }}
                    />
                  )}

                  {loading && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: 8,
                      }}
                    >
                      <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
                    </Box>
                  )}
                </Box>

                <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />
              </Card>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "center",
                  gap: 2,
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onBack}
                  disabled={loading}
                  sx={{
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    borderRadius: 3,
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  onClick={toggleCamera}
                  disabled={loading}
                  sx={{
                    background: cameraStarted
                      ? "linear-gradient(45deg, #e53935 30%, #ef5350 90%)"
                      : "linear-gradient(45deg, #4caf50 30%, #81c784 90%)",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: cameraStarted
                      ? "0 3px 5px 2px rgba(229, 57, 53, .3)"
                      : "0 3px 5px 2px rgba(76, 175, 80, .3)",
                    "&:disabled": {
                      backgroundColor: theme.palette.grey[400],
                      color: theme.palette.grey[700],
                      boxShadow: "none",
                    },
                  }}
                >
                  {cameraStarted ? "Stop Camera" : "Start Camera"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={captureImage}
                  disabled={loading || !cameraStarted}
                  startIcon={<CameraIcon />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                  }}
                >
                  {loading ? "Capturing..." : "Capture"}
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !image}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                    px: 3,
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: 3,
                    "&:disabled": {
                      backgroundColor: theme.palette.grey[400],
                      color: theme.palette.grey[700],
                      boxShadow: "none",
                    },
                  }}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Box>
            </form>

            {capturedImage && (
              <Card
                sx={{
                  p: 2,
                  mt: 3,
                  borderRadius: 2,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  opacity: 0,
                  animation: "fadeIn 0.5s ease-in forwards",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Captured Image
                </Typography>
                <Image
                  src={capturedImage}
                  alt="Captured Face"
                  width={isMobile ? 300 : 200} // Set width based on isMobile
                  height={isMobile ? 225 : 150} // Maintain aspect ratio (4:3)
                  style={{
                    borderRadius: 8,
                    marginTop: 8,
                    width: isMobile ? "100%" : 200, // Ensure responsiveness
                    height: "auto",
                  }}
                />
              </Card>
            )}

            {error && (
              <Card
                sx={{
                  p: 2,
                  mt: 3,
                  bgcolor: theme.palette.error.light,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  opacity: 0,
                  animation: "fadeIn 0.5s ease-in forwards",
                }}
              >
                <ErrorIcon color="error" sx={{ mr: 1, fontSize: 30 }} />
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Card>
            )}

            {success && response && (
              <Card
                sx={{
                  p: 2,
                  mt: 3,
                  borderRadius: 2,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  opacity: 0,
                  animation: "fadeIn 0.5s ease-in forwards",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Registration Response
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}
                >
                  <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 30 }} />
                  <Typography variant="body1">
                    Verified: {response.verified ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Card>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default FaceIdRegistration;