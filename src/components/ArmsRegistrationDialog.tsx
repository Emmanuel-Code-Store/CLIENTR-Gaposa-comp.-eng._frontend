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
  SelectChangeEvent,
} from '@mui/material';
import { useArms } from '../hooks/useArms';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface ArmsRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ArmsRegistrationDialog: FC<ArmsRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { signup, loading } = useArms();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target as { name?: string; value: string };
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name) {
      toastr.error('Please fill in all required fields');
      return;
    }

    console.log('ArmsRegistrationDialog: Submitting form with data:', {
      name: formData.name,
    });

    const data = {
      name: formData.name,
    };

    signup(data).subscribe({
      next: () => {
        toastr.success(`${formData.name} registration successful!`);
        setFormData({ name: '' });
        onClose();
      },
      error: (err: Error) => {
        console.error('ArmsRegistrationDialog: Signup error:', err.message);
        toastr.error(err.message || 'Failed to register arms');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Arms</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="arms-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Arms Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
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
          form="arms-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArmsRegistrationDialog;