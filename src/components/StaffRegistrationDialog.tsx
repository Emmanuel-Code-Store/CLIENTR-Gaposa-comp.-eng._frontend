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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
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

interface StaffRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const StaffRegistrationDialog: FC<StaffRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    role_id: '6',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
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

    if (!formData.role_id || !formData.fullname || !formData.email || !formData.password) {
      toastr.error('Please fill in all required fields');
      return;
    }

    const data = {
      role_id: formData.role_id,
      email: formData.email,
      password: formData.password,
      fullname: formData.fullname,
      phone: formData.phone || undefined,
      address: formData.address || undefined,
    };

    signup(data).subscribe({
      next: () => {
        const roleName = {
          '6': 'Super Admin',
          '4': 'Staff',
          '2': 'Student',
          '1': 'Guest',
          '3': 'Alumni',
          '5': 'parent-guardian',
        }[formData.role_id] || 'User';
        toastr.success(`${roleName} registration successful!`);
        setFormData({ role_id: '4', fullname: '', email: '', phone: '', address: '', password: '' });
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
      <DialogTitle>Register User</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="admin-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <FormControl fullWidth required disabled={loading}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
            >
              <MenuItem value="4">Staff</MenuItem>
            </Select>
          </FormControl>
           
          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
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

export default StaffRegistrationDialog;