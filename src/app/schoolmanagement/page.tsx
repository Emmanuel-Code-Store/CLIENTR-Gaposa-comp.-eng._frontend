import React from "react";
import { Box, Typography } from '@mui/material';
import Navbar from '@computerEngineering/components/Navbar';
import Footer from "@computerEngineering/components/Footer";
import Card from "@computerEngineering/components/Card";

const Event: React.FC = () => (
  <>
    <Navbar />
    <Box sx={{
      background: 'linear-gradient(270deg, rgba(41, 12, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)'
      , width: '100%',
      minHeight: '100vh',
      backgroundImage: 'url(/images/71a192f1193d3440fb7331a6170c899d.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box sx={{
        background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%', height: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'
      }}>
        <Typography component="h2" textAlign="center" sx={{ fontSize: { xs: '2rem', sm: '2rem', md: '3rem' } }}>School Management</Typography>
        <Typography component="p" textAlign="center" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' }, padding: '0 2rem' }}>Our Mission is to provide a world class learning opportunities where no child is left out or behind.</Typography>
      </Box>
    </Box>

    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <Card />
    </Box>

    <Footer />
  </>
);

export default Event;