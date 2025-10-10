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
import { useSubscription } from '../hooks/useSubscription';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Configure toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

interface SubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
}

const SubscriptionDialog: FC<SubscriptionDialogProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const { signup, loading } = useSubscription();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toastr.error('Please enter your email');
      return;
    }

    signup({ email }).subscribe({
      next: () => {
        toastr.success(`${email} subscribed successfully!`);
        setEmail('');
        onClose();
      },
      error: (err: Error) => {
        console.error('Subscription error:', err.message);
        toastr.error(err.message || 'Subscription failed');
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="subscription-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
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
          form="subscription-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDialog;
