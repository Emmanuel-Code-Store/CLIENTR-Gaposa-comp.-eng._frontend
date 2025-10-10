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
import { useSubject } from '../hooks/useSubject';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface SubjectRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const SubjectRegistrationDialog: FC<SubjectRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    subject_description: '',
  });

  const { signup, loading } = useSubject();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, code, subject_description } = formData;
    if (!name || !code || !subject_description) {
      toastr.error('Please fill in all required fields');
      return;
    }

    signup(formData).subscribe({
      next: () => {
        toastr.success(`Subject "${formData.name}" registered successfully!`);
        setFormData({ name: '', code: '', subject_description: '' });
        onClose();
      },
      error: (err: Error) => {
        toastr.error(err.message || 'Failed to register subject');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Subject</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="subject-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Subject Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Subject Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Description"
            name="subject_description"
            value={formData.subject_description}
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
          form="subject-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubjectRegistrationDialog;
