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
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useAssessment } from '../hooks/useAssessment';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface AssessmentRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const AssessmentRegistrationDialog: FC<AssessmentRegistrationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    assessment: '',
    classarm: '',
    session: '',
    term: '',
  });
  const { createAssessment, loading } = useAssessment();

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

    if (!formData.assessment || !formData.classarm || !formData.session || !formData.term) {
      toastr.error('Please fill in all required fields');
      return;
    }

    console.log('Submitting assessment:', formData);

    createAssessment(formData).subscribe({
      next: () => {
        toastr.success('Assessment created successfully!');
        setFormData({ assessment: '', classarm: '', session: '', term: '' });
        onClose();
      },
      error: (err: Error) => {
        console.error('Assessment creation error:', err.message);
        toastr.error(err.message || 'Failed to create assessment');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Assessment</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="assessment-registration-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <FormControl fullWidth required disabled={loading}>
            <InputLabel id="assessment-label">Assessment Type</InputLabel>
            <Select
              labelId="assessment-label"
              name="assessment"
              value={formData.assessment}
              variant="outlined"
              required
              fullWidth
              disabled={loading}
              onChange={handleChange}
            >
              <MenuItem value="Class Work">Class Work</MenuItem>
              <MenuItem value="Exam">Exam</MenuItem>
              <MenuItem value="Test">Test</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Class Arm"
            name="classarm"
            value={formData.classarm}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Session"
            name="session"
            value={formData.session}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Term"
            name="term"
            value={formData.term}
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
          form="assessment-registration-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssessmentRegistrationDialog;
