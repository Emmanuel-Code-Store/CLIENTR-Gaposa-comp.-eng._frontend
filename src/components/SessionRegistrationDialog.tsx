'use client';

import React, { useState, FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useSession } from '../hooks/useSession'; 
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface SessionRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const SessionRegistrationDialog: FC<SessionRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    session_description: '',
  });

  const { signup, loading } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, code, session_description } = formData;
    if (!name || !code || !session_description) {
      toastr.error('Please fill in all required fields');
      return;
    }

    signup(formData).subscribe({
      next: () => {
        toastr.success(`Session "${formData.name}" registered successfully!`);
        setFormData({ name: '', code: '', session_description: '' });
        onClose();
      },
      error: (err: Error) => {
        toastr.error(err.message || 'Failed to register session');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Session</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="session-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Session Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Session Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Description"
            name="session_description"
            value={formData.session_description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={3}
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="session-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionRegistrationDialog;
