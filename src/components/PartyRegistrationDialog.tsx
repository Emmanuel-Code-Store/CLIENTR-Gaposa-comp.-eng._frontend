"use client";

import React, { useState, FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { useParty } from "@/hooks/useParty";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface PartyRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const PartyRegistrationDialog: FC<PartyRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    partyName: "",
    partyDescription: "",
  });

  const { createParty, loading } = useParty();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      partyName: formData.partyName,
      partyDescription: formData.partyDescription,
    };

    createParty(payload).subscribe({
      next: () => {
        toastr.success("Party registered successfully.");
        onClose();
      },
      error: (err) => {
        console.error("Error creating party:", err);
        toastr.error("Failed to register party.");
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Party</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Party Name"
            name="partyName"
            value={formData.partyName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Party Description"
            name="partyDescription"
            value={formData.partyDescription}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartyRegistrationDialog;
