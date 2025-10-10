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
import { useDepartment } from '../hooks/useDepartment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { lastValueFrom } from 'rxjs';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface DepartmentRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const DepartmentRegistrationDialog: FC<DepartmentRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ name: '' });
  const { signup, loading } = useDepartment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toastr.error('Please enter a department name');
      return;
    }

    try {
      console.log('Submitting department registration:', formData);
      await lastValueFrom(signup({ name: formData.name }));

      toastr.success(`${formData.name} registered successfully!`);
      setFormData({ name: '' });
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register department';
      console.error('Signup error:', errorMessage);
      toastr.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Department</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="department-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Department Name"
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
          form="department-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentRegistrationDialog;
