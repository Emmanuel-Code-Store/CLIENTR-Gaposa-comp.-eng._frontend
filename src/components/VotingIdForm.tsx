import React, { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useUser } from "@/hooks/useUser";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface VotingIdFormProps {
  onAuthenticated: () => void;
}

export function VotingIdForm({ onAuthenticated }: VotingIdFormProps) {
  const [voterId, setVoterId] = useState("");
  const [pin, setPin] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const { sendOtp, otpSent, loading, verifyPin } = useUser();

  const handleSendPin = async () => {
    setError("");

    if (!voterId) {
      setError("Please enter a valid Voter ID");
      toastr.error("Please enter a valid Voter ID");
      return;
    }

    const success = await sendOtp(voterId);

    if (!success) {
      setError("Error sending OTP. Please try again.");
      toastr.error("Error sending OTP. Please try again.");
    } else {
      toastr.success("OTP has been sent to your email!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!voterId || !pin) {
      setError("Please fill in all fields");
      toastr.warning("Please fill in all fields");
      return;
    }

    setVerifying(true);

    try {
      await verifyPin(voterId, pin);

      if (otpSent && pin.length === 4) {
        setAuthenticated(true);
        toastr.success("Authentication Successful");
        setTimeout(() => {
          onAuthenticated();
        }, 1000);
      } else {
        setError("Invalid PIN or Voter ID.");
        toastr.error("Invalid PIN or Voter ID. Ensure Voter ID is correct and PIN is 4 digits.");
      }
    } catch {
      setError("Invalid Voter ID or PIN. Please check and try again.");
      toastr.error("Invalid Voter ID or PIN. Please check and try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, py: 6 }}>
      {authenticated ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CheckCircle sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Authentication Successful
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              id="voterId"
              label="Voter ID"
              variant="outlined"
              fullWidth
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              placeholder="Enter your Voter ID"
              disabled={verifying || otpSent}
              error={!!error && !otpSent}
              helperText={error && !otpSent ? "Please enter a valid Voter ID" : ""}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {otpSent && (
              <TextField
                id="pin"
                label="PIN"
                variant="outlined"
                fullWidth
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter your 4-digit PIN"
                disabled={verifying}
                error={!!error}
                helperText={error && "PIN should be 4 digits"}
              />
            )}

            <Button
              onClick={handleSendPin}
              variant="outlined"
              sx={{
                ml: 2,
                height: "100%",
                alignSelf: "flex-start",
                fontWeight: "bold",
                color: "primary.main",
              }}
              disabled={verifying || otpSent}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send Pin"}
            </Button>
          </Box>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={verifying || !pin || !voterId || (otpSent && pin.length !== 4)}
            sx={{ py: 1.5 }}
          >
            {verifying ? <CircularProgress size={24} color="inherit" /> : "Verify Identity"}
          </Button>
        </form>
      )}
    </Box>
  );
}