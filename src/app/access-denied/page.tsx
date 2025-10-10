import { Metadata } from 'next';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Access Denied',
  description: 'You do not have permission to access this page',
};

export default function AccessDeniedPage() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom>
        Access Denied
      </Typography>
      <Typography variant='body1' gutterBottom>
        You do not have permission to access this page.
      </Typography>
      <Button variant='contained' component={Link} href='/dashboard'>
        Back to Dashboard
      </Button>
    </Box>
  );
}