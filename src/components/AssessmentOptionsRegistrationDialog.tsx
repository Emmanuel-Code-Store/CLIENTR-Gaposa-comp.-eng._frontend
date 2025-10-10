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
import { useUser } from '../hooks/useUser';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface AssessmentOptionsRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const AssessmentOptionsRegistrationDialog: FC<AssessmentOptionsRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    assessment: '',
  });

  const { createAssessmentOption, loading } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target as { name?: string; value: string };
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.assessment) {
      toastr.error('Please fill in all required fields');
      return;
    }

    console.log('AssessmentOptionsRegistrationDialog: Submitting form with data:', formData);

    try {
      await createAssessmentOption(formData);
      toastr.success(`${formData.assessment} option created successfully!`);
      setFormData({ assessment: '' });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('AssessmentOptionsRegistrationDialog: Error:', err.message);
        toastr.error(err.message || 'Failed to create assessment option');
      } else {
        console.error('AssessmentOptionsRegistrationDialog: Unknown error:', err);
        toastr.error('Failed to create assessment option');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Assessment Options</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="assessment-options-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Assessment Option"
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
          form="assessment-options-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssessmentOptionsRegistrationDialog;
