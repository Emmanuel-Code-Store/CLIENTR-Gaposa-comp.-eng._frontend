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
import { useModule } from '../hooks/useModule';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Configure toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface ModuleRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ModuleRegistrationDialog: FC<ModuleRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    moduleName: '',
  });
  const { createModule, loading } = useModule();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.moduleName.trim()) {
      toastr.error('Please enter a module name');
      return;
    }

    console.log('ModuleRegistrationDialog: Submitting form with data:', {
      moduleName: formData.moduleName,
    });

    createModule({ moduleName: formData.moduleName }).subscribe({
      next: () => {
        toastr.success(`Module "${formData.moduleName}" created successfully!`);
        setFormData({ moduleName: '' });
        onClose();
      },
      error: (err: Error) => {
        console.error('ModuleRegistrationDialog: Create error:', err.message);
        toastr.error(err.message || 'Failed to create module');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Module</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="module-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Module Name"
            name="moduleName"
            value={formData.moduleName}
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
          form="module-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModuleRegistrationDialog;
