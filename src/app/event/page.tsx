import React from "react";
import { Box, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Image from 'next/image';

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
    }} data-aos="zoom-in"
    data-aos-duration="1500">
      <Box sx={{
        background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%', height: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'
      }}>
        <Typography component="h2" sx={{ fontSize: '3rem', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
              data-aos-duration="1500">EVENT</Typography>
      </Box>
    </Box>


    <Box sx={{
      width: '80%', minHeight: '100vh', margin: 'auto', padding: '3rem', display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      justifyContent: 'center', alignItems: 'center'
    }}>
      <Box sx={{
        flex: 1, minWidth: '24.1669rem', minHeight: { xs: '100%', sm: '100%', md: '49.6875rem' }, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px', display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start', alignItems: 'start',
        borderRadius:'50px 50px 0px 0px'
      }} data-aos="fade-up"
      data-aos-duration="1500">
        <Box sx={{ flex: 1, minWidth: '100%', minHeight: '100%', position: 'relative' }}>
          <Image
            src="/images/Pictures.png"
            alt="news"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
        <Box sx={{padding:'1rem'}}>
          <Typography component="p" sx={{ fontWeight: '50rem', fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' }, lineHeight: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }, fontFamily: 'Raleway, sans-serif' }}>A Vibrant Kaleidoscope:
            Primagic Schools Paint the Town with Colors on November 11th, 2023</Typography>
          <Typography component="p" sx={{ fontSize: '1.25rem', fontFamily: 'Raleway, sans-serif' }}>More Details</Typography>
        </Box>
      </Box>

      <Box sx={{
        flex: 1, minWidth: '24.1669rem', minHeight: { xs: '100%', sm: '100%', md: '49.6875rem' }, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px', display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start', alignItems: 'start',
        borderRadius:'50px 50px 0px 0px'
      }} data-aos="fade-up"
      data-aos-duration="1500">
        <Box sx={{ flex: 1, minWidth: '100%', minHeight: '100%', position: 'relative' }}>
          <Image
            src="/images/Pictures.png"
            alt="news"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
        <Box sx={{padding:'1rem'}}>
          <Typography component="p" sx={{ fontWeight: '50rem', fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' }, lineHeight: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }, fontFamily: 'Raleway, sans-serif' }}>A Vibrant Kaleidoscope:
            Primagic Schools Paint the Town with Colors on November 11th, 2023</Typography>
          <Typography component="p" sx={{ fontSize: '1.25rem' }}>More Details</Typography>
        </Box>
      </Box>

      <Box sx={{
        flex: 1, minWidth: '24.1669rem', minHeight: { xs: '100%', sm: '100%', md: '49.6875rem' }, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px', display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start', alignItems: 'start',
        borderRadius:'50px 50px 0px 0px'
      }} data-aos="fade-up"
      data-aos-duration="1500">
        <Box sx={{ flex: 1, minWidth: '100%', minHeight: '100%', position: 'relative' }}>
          <Image
            src="/images/Pictures.png"
            alt="news"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
        <Box sx={{padding:'1rem'}}>
          <Typography component="p" sx={{ fontWeight: '50rem', fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' }, lineHeight: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }, fontFamily: 'Raleway, sans-serif' }}>A Vibrant Kaleidoscope:
            Primagic Schools Paint the Town with Colors on November 11th, 2023</Typography>
          <Typography component="p" sx={{ fontSize: '1.25rem', fontFamily: 'Raleway, sans-serif' }}>More Details</Typography>
        </Box>
      </Box>


    </Box>
    <Footer />
  </>
);

export default Event;