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

import { useElectionPost } from "@/hooks/useElectionPost";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface LiveStreamRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const LiveStreamRegistrationDialog: FC<LiveStreamRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    postName: "",
    postDescription: "",
  });

  const { createElectionPost, loading } = useElectionPost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      postName: formData.postName,
      postDescription: formData.postDescription,
    };

    createElectionPost(payload).subscribe({
      next: () => {
        toastr.success("Post registered successfully.");
        onClose();
      },
      error: (err) => {
        console.error("Error creating post:", err);
        toastr.error("Failed to register post.", err);
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Post</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Post Name"
            name="postName"
            value={formData.postName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Post Description"
            name="postDescription"
            value={formData.postDescription}
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

export default LiveStreamRegistrationDialog;
