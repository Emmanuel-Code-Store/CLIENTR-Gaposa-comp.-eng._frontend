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
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useAssessmentType } from '../hooks/useAssessmentType';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface AssessmentTypeRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const AssessmentTypeRegistrationDialog: FC<AssessmentTypeRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ assessment: '' });
  const { createAssessmentType, loading } = useAssessmentType();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.assessment) {
      toastr.error('Please fill in all required fields');
      return;
    }

    console.log('Submitting assessment type:', formData);

    createAssessmentType(formData).subscribe({
      next: () => {
        toastr.success(`Assessment type "${formData.assessment}" created successfully!`);
        setFormData({ assessment: '' });
        onClose();
      },
      error: (err: Error) => {
        console.error('AssessmentTypeRegistrationDialog: Error:', err.message);
        toastr.error(err.message || 'Failed to create assessment type');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Assessment Type</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="assessment-type-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Assessment Type Name"
            name="assessment"
            value={formData.assessment}
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
          form="assessment-type-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssessmentTypeRegistrationDialog;
