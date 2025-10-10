"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
  GlobalStyles,
  Paper,
} from "@mui/material";
import {
  Camera as CameraIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
} from "@mui/icons-material";
import { useFaceIdAuthentication } from "@/hooks/useFaceIdAuthentication";

interface FaceIdVoteAuthenticationProps {
  onAuthenticated: () => void;
}

const FaceIdVoteAuthentication = ({
  onAuthenticated,
}: FaceIdVoteAuthenticationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [image, setImage] = useState<File | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { authenticateFaceId, loading, error, response } =
    useFaceIdAuthentication(image);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    if (stream) return;
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };


  // useEffect(() => {
  //   return () => {
  //     stopCamera();
  //   };
  // }, [stopCamera]); 

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);


  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(dataUrl);

        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "captured_image.png", {
              type: "image/png",
            });
            setImage(file);
          });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      const result = await authenticateFaceId();
      if (result?.data.verified) {
        onAuthenticated();
      }
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
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      />

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: 700,
          margin: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Face ID Authentication
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              position: "relative",
              backgroundColor: "black",
              borderRadius: 2,
              overflow: "hidden",
              width: isMobile ? "100%" : 640,
              height: isMobile ? 240 : 480,
              mx: "auto",
              mb: 3,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Green horizontal line moving vertically */}
            {stream && (
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

            {/* Loading overlay */}
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
              </Box>
            )}
          </Box>

          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width="640"
            height="480"
          />

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
              onClick={startCamera}
              disabled={loading || Boolean(stream)}
              startIcon={<PlayArrowIcon />}
              sx={{
                px: 3,
                py: 1.5,
                textTransform: "none",
                borderRadius: 3,
              }}
            >
              Start Camera
            </Button>

            <Button
              variant="outlined"
              onClick={stopCamera}
              disabled={loading || !stream}
              startIcon={<StopIcon />}
              sx={{
                px: 3,
                py: 1.5,
                textTransform: "none",
                borderRadius: 3,
              }}
            >
              Stop Camera
            </Button>

            <Button
              variant="outlined"
              onClick={captureImage}
              disabled={loading || !stream}
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
              {loading ? "Authenticating..." : "Authenticate"}
            </Button>
          </Box>
        </form>

        {capturedImage && (
          <Box
            sx={{
              textAlign: "center",
              opacity: 0,
              animation: "fadeIn 0.5s ease-in forwards",
              mb: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Captured Image:
            </Typography>
            <Image
              src={capturedImage}
              alt="Captured Face"
              width={isMobile ? 300 : 200} // Set width based on isMobile
              height={isMobile ? 225 : 150} // Maintain aspect ratio (4:3)
              style={{
                borderRadius: 8,
                width: isMobile ? "100%" : 200, // Ensure responsiveness
                height: "auto",
              }}
            />
          </Box>
        )}

        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.error.main,
              bgcolor: theme.palette.error.light,
              p: 2,
              borderRadius: 2,
              mt: 2,
            }}
          >
            <ErrorIcon />
            <Typography>{error}</Typography>
          </Box>
        )}

        {response && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              opacity: 0,
              animation: "fadeIn 0.5s ease-in forwards",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Response:
            </Typography>
            <Typography>
              Authenticated: {response.data.verified ? "Yes" : "No"}
            </Typography>
            <Typography>Similarity: {response.data.similarity}</Typography>
            <Typography>Message: {response.message}</Typography>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default FaceIdVoteAuthentication;