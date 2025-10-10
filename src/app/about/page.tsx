import React from "react";
import { Button, Box, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const About: React.FC = () => (
  <>
    <Navbar />
    <Box sx={{
      background: 'linear-gradient(270deg, rgba(41, 12, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)'
      , width: '100%',
      minHeight: '100vh',
      backgroundImage: 'url(/images/80fd2abc35ce83b00538f50db423ceed.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} data-aos="zoom-in"
    data-aos-duration="1500">
      <Box sx={{
        width: '100%', height: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'
      }}>
        <Typography component="h2" sx={{ fontSize: '3rem', fontFamily: 'Raleway, sans-serif'  }} data-aos="fade-up"
              data-aos-duration="1600">About Us</Typography>
      </Box>
    </Box>
    <Box sx={{
      width: '100%', minHeight: '50rem', bgcolor: '#fff', display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{
        width: { xs: '90%', sm: '80%', md: '70%' },
        minHeight: { xs: '100%', sm: '20.625rem', md: '28.625rem' },
        padding: '1.25rem',
        bgcolor: '#fff',
        margin: { xs: '5rem auto', sm: '2rem auto', md: 'auto' },
        boxShadow: '5px 4px 4px 0px #00000040, -4px -4px 4px 0px #00000040',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <Box textAlign="center">
          <Typography component="h2" sx={{ color: '#FF2600', fontSize: { xs: '.7rem', sm: '1rem', md: '2rem' }, fontFamily: 'Raleway, sans-serif'}} data-aos="fade-up"
              data-aos-duration="1500">COMMITMENT AND VALUES</Typography>
          <Typography component="h2" sx={{ color: '#FF2600', fontSize: { xs: '.7rem', sm: '1rem', md: '2rem' }, fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
              data-aos-duration="1600">
            ---------------------------OF -----------------------------</Typography>
          <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' }, lineHeight: { xs: '2rem', sm: '3rem', md: '5.725rem' }, color: ' #572269', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
              data-aos-duration="1700">TENDER STEPS SCHOOLS</Typography>
        </Box>
        <Typography component="p" sx={{ fontSize: { sm: '1.25rem', md: '1.25rem' }, lineHeight: '2.5rem', color: '#3A3E47', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
              data-aos-duration="1800">At Tender Steps Schools, we believe in nurturing a culture where commitment and value converge to shape bright futures. Our unwavering dedication to excellence is evident in every aspect of our educational journey. With a deep-rooted commitment to providing holistic education and instilling enduring values, we pave the way for each child to flourish and succeed. Join us on this transformative path, where every step taken is imbued with purpose and promise.</Typography>
      </Box>

    </Box>

    <Box sx={{
      background: 'linear-gradient(270deg, rgba(41, 12, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)'
      , width: '100%',
      minHeight: '100vh',
      backgroundImage: 'url(/images/f48bb2c9708fa7bc83eb8305842d2dcd.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box sx={{
        background: 'linear-gradient(270deg, rgba(0,0,0, 0.7) 45.91%, rgba(0,0,0, 0.7) 100%)', width: '100%', minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '2rem', sm: '2rem', md: '2rem' }
      }}>
        <Box sx={{
          width: { xs: '90%', sm: '80%', md: '80%', lg: '70%' }, minHeight: '39.25rem',
          display: 'flex',
          flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '6.8125rem', color: '#fff', margin: 'auto',
        }}>
          <Box sx={{
            width: { xs: '100%', sm: '90%', md: '57%' }, display: 'flex',
            flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '3.0625rem',
          }} data-aos="fade-down"
          data-aos-duration="1500">
            <Typography component="h2" sx={{ fontSize: { xs: '2.75rem', sm: '2.75rem', md: '3.75rem' }, lineHeight: { xs: '3.625rem', sm: '3.625rem', md: '5.625rem' }, color: '#fff', fontWeight: { xs: '20rem', sm: '30rem', md: '50rem' }, fontFamily: 'Raleway, sans-serif' }}>Our Objectives</Typography>
            <Box sx={{ borderLeft: '1px solid #fff ', padding: '0 1.25rem' }}>
              <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>To be an enviable centre of Academic Excellence where each child is nurtured to soar to Greater height in His Steps.</Typography>
            </Box>
          </Box>
          <Box sx={{
            width: '100%', minHeight: '16.25rem', display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'space-between',
          }} data-aos="zoom-in"
          data-aos-duration="1500">
            <Box sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: '24.79rem' }, borderTop: '1px solid #FFFFFF' }}>
              <Typography component="h3" sx={{ fontSize: { xs: '2.75rem', sm: '2.75rem', md: '3.75rem' }, lineHeight: { xs: '3.625rem', sm: '3.625rem', md: '5.625rem' }, color: '#fff', fontWeight: { xs: '20rem', sm: '30rem', md: '50rem' }, fontFamily: 'Raleway, sans-serif' }}>Our Vision</Typography>
              <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>To be an enviable centre of Academic Excellence where each child is nurtured to soar to Greater height in His Steps.</Typography>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: '24.79rem' }, borderTop: '1px solid #FFFFFF' }}>
              <Typography component="h3" sx={{ fontSize: { xs: '2.75rem', sm: '2.75rem', md: '3.75rem' }, lineHeight: { xs: '3.625rem', sm: '3.625rem', md: '5.625rem' }, color: '#fff', fontWeight: { xs: '20rem', sm: '30rem', md: '50rem' }, fontFamily: 'Raleway, sans-serif' }}>Our Mission</Typography>
              <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>To provide a world class learning opportunities where no child is left out or behind.</Typography>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: '24.79rem' }, borderTop: '1px solid #FFFFFF' }}>
              <Typography component="h3" sx={{ fontSize: { xs: '2.75rem', sm: '2.75rem', md: '3.75rem' }, lineHeight: { xs: '3.625rem', sm: '3.625rem', md: '5.625rem' }, color: '#fff', fontWeight: { xs: '20rem', sm: '30rem', md: '50rem' }, fontFamily: 'Raleway, sans-serif' }}>Our Core Values</Typography>
              <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>An Academic Excellence Center: Nurturing Every Child&quot;s Potential to Soar.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>


    <Box sx={{
      width: '100%', minHheight: '100vh', bgcolor: '#fff', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: { xs: '1rem', sm: '1rem', md: '1rem' }
    }} data-aos="zoom-in"
    data-aos-duration="1500">
      <Box sx={{
        width: { xs: '100%', sm: '80%', md: '70%' }, minHeight: '26.75rem', display: 'flex',
        flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: '1.875rem',
      }}>
        <Box sx={{ bgcolor: '#F3E9F7', width: '100%', height: '4.25rem' }}>
          <Typography component="p" sx={{ fontWeight: { xs: '11.25rem', sm: '21.25rem', md: '31.25rem' }, lineHeight: '4rem', paddingLeft: '1.25rem', fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' }, fontFamily: 'Raleway, sans-serif' }} data-aos="zoom-in"
              data-aos-duration="1500">TENDER STEPS SCHOOL ANTHEM</Typography>
        </Box>
        <Typography component="p" data-aos="zoom-in"
              data-aos-duration="1600" sx={{fontFamily: 'Raleway, sans-serif'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
        <Link href="/schoolmanagement">
          <Button sx={{ width: '100%',  borderRadius: '30px', border: '1px solid #0C123A', bgcolor: '#659AC9', color: '#fff', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem',fontFamily: 'Raleway, sans-serif' }}>
            Meet the Manangement <ArrowForwardIcon />
          </Button>
        </Link>
        </Box>
      </Box>

    </Box>

    <Footer />
  </>
);

export default About;