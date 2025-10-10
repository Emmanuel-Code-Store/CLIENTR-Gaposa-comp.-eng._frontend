'use client';

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

import { useElection } from "@/hooks/useElection"; 
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface ElectionRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ElectionRegistrationDialog: FC<ElectionRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    electionName: "",
    startDate: "",
    endDate: "",
  });

  const { createElection, loading } = useElection();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      name: formData.electionName,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    createElection(payload).subscribe({
      next: () => {
        toastr.success("Election registered successfully.");
        onClose();
      },
      error: (err) => {
        console.error("Error creating election:", err);
        toastr.error("Failed to register election." , err);
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Election</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Election Name"
            name="electionName"
            value={formData.electionName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Start Date and Time"
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            label="End Date and Time"
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ElectionRegistrationDialog;
