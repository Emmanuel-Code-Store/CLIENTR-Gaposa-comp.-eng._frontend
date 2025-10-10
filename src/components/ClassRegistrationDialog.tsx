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
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useClass } from '../hooks/useClass'; 


toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface ClassRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ClassRegistrationDialog: FC<ClassRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { signup, loading } = useClass();

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

    if (!formData.name.trim()) {
      toastr.error('Please fill in the class name');
      return;
    }

    console.log('ClassRegistrationDialog: Submitting form with data:', {
      name: formData.name,
    });

    const data = {
    className: formData.name,
  };

    signup(data).subscribe({
      next: () => {
        toastr.success(`${formData.name} registration successful!`);
        setFormData({ name: '' });
        onClose();
      },
      error: (err: Error) => {
        console.error('ClassRegistrationDialog: Signup error:', err.message);
        toastr.error(err.message || 'Failed to register class');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Class</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="class-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Class Name"
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
          form="class-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassRegistrationDialog;
