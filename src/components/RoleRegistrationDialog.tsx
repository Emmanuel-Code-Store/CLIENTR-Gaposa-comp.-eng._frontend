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
import { useUser } from '../hooks/useUser';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface RoleRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const RoleRegistrationDialog: FC<RoleRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    role_id: '',
    name: '',
  });
  const { signup, loading } = useUser();

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

    console.log('AdminRegistrationDialog: Submitting form with data:', {
      name: formData.name,
    });

    const data = {
      role_id: formData.role_id,
      fullname: formData.name,
    };

    signup(data).subscribe({
      next: () => {
        toastr.success(`${name} registration successful!`);
        setFormData({ role_id: '', name: '' });
        onClose();
      },
      error: (err: Error) => {
        console.error('AdminRegistrationDialog: Signup error:', err.message);
        toastr.error(err.message || 'Failed to register user');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Role</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="admin-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Full Name"
            name="fullname"
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
          form="admin-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleRegistrationDialog;