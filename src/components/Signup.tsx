'use client';

import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  styled,
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 440,
  padding: theme.spacing(4),
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    height: 40,
    '&:hover fieldset': {
      borderColor: theme.palette.grey[300],
    },
  },
}));

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    phone: '',
    address: '',
  });
  const { signup, loading } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      toastr.error('Please fill in all required fields');
      return;
    }

    signup({
      email: formData.email,
      password: formData.password,
      fullname: formData.fullname,
      phone: formData.phone || undefined,
      address: formData.address || undefined,
      role_id: '1'
    }).subscribe({
      next: () => {
        toastr.success('Signup successful!');
      },
      error: (err: Error) => {
        toastr.error(err.message || 'Failed to sign up');
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        p: 2,
      }}
    >
      <StyledCard>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: '1rem',
          }}
        >
          <Link href='/'>
            <Image
              src={process.env.NEXT_PUBLIC_SCHOOL_LOGO_URL || ""}
              alt={`${process.env.NEXT_PUBLIC_SCHOOL_NAME || ""} `}
              width={100}
              height={100}
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          </Link>
        </Box>
        <Stack spacing={1} sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant='h5'
            component='h1'
            sx={{ fontWeight: 600, fontFamily: 'Raleway, sans-serif' }}
          >
            {process.env.NEXT_PUBLIC_SCHOOL_NAME || ""} Signup
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Please enter your signup details to continue.
          </Typography>
        </Stack>

        <Stack component='form' spacing={2} onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500, fontFamily: 'Raleway, sans-serif' }}
            >
              Full Name *
            </Typography>
            <StyledTextField
              fullWidth
              placeholder='User full name'
              variant='outlined'
              size='small'
              autoComplete='name'
              type='text'
              name='fullname'
              value={formData.fullname}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Stack>
          <Stack spacing={1}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500, fontFamily: 'Raleway, sans-serif' }}
            >
              Email Address *
            </Typography>
            <StyledTextField
              fullWidth
              placeholder='user@example.com'
              variant='outlined'
              size='small'
              autoComplete='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Stack>
          <Stack spacing={1}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500, fontFamily: 'Raleway, sans-serif' }}
            >
              Password *
            </Typography>
            <StyledTextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder='••••••••••••••'
              variant='outlined'
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                      size='small'
                      sx={{ color: 'text.secondary' }}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name='password'
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Stack>
          <Stack spacing={1}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500, fontFamily: 'Raleway, sans-serif' }}
            >
              Phone Number
            </Typography>
            <StyledTextField
              fullWidth
              placeholder='+1234567890'
              variant='outlined'
              size='small'
              autoComplete='tel'
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500, fontFamily: 'Raleway, sans-serif' }}
            >
              Address
            </Typography>
            <StyledTextField
              fullWidth
              placeholder='123 Main St'
              variant='outlined'
              size='small'
              autoComplete='street-address'
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
            />
          </Stack>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ bgcolor: '#0D0F29', height: 40, fontFamily: 'Raleway, sans-serif' }}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ textAlign: 'center', fontFamily: 'Raleway, sans-serif' }}
          >
            Already have an account?{' '}
            <Link href='auth/user-login' style={{ color: '#0D0F29', textDecoration: 'underline' }}>
              Login
            </Link>
          </Typography>
        </Stack>
      </StyledCard>
    </Box>
  );
}