'use client'

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Navbar from '@computerEngineering/components/Navbar';
import Footer from "@computerEngineering/components/Footer";
import Image from 'next/image';

const Contact: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Message: ${message}`);
  };

  return (
    <>
      <Navbar />
      <Box sx={{
        background: 'linear-gradient(180deg, rgba(33, 78, 206, 0.9) 27.5%, #0C123A 100%)',
        width: '100%',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>


        <Box sx={{ width: { xs: '98%', sm: '90%', md: '80%' }, minHeight: '80vh', borderRadius: '1.25rem', bgcolor: '#fff', color: '#000', margin: { xs: '2rem 0', sm: '2rem 0', md: '0' } }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
          }}>
            <Box sx={{ width: { xs: '100%', sm: '100%', md: '50%' }, background: 'linear-gradient(270deg, #DAD3D3 0%, #FAFAFA 14%)', padding: '2rem', minHeight: '80vh',  borderRadius: '1.25rem 0 0 1.25rem', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'start' }}>

              <Box>
                <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '2rem', md: '3rem' }, lineHeight: '5rem' }}>Contact Us</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Image src="/images/Group 2149.png" width={40} height={40} alt="Address" />
                <Box>
                  <Typography component="p">Address</Typography>
                  <Typography component="p">Sapaade, Ode Remo, Ogun State, Nigeria</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Image src="/images/Group 21491.png" width={40} height={40} alt="Call Us" />
                <Box>
                  <Typography component="p">Call Us</Typography>
                  <Typography component="p">+234 906 6929 845, +234 802 8704 43</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Image src="/images/Group 21492.png" width={40} height={40} alt="Email" />
                <Box>
                  <Typography component="p">Email</Typography>
                  <Typography component="p">info@computerengineering.gapoa.edu.ng</Typography>
                </Box>
              </Box>

              <Box>
                <Typography component="p" sx={{ lineHeight: '5rem' }}>Follow Us</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                </Box>
              </Box>


            </Box>

            <Box sx={{ width: { xs: '90%', sm: '80%', md: '50%' }, padding: { xs: '0', sm: '0', md: '2rem' }, paddingBottom: { xs: '1rem', sm: '1rem', md: '0' } }}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems:'start', justifyContent:'space-between' }}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Your Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{height:'3.75rem'}}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>


      <Box sx={{
        minWidth: '100%',
        height: '100vh',
        background: '#FFF5F5',
        position: 'relative', 
      }}>
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
          style={{
            minWidth: '100%',
            height: '100%',
            border: 'none', 
            display: 'block'
          }}
        ></iframe>
      </Box>

      <Footer />
    </>
  );
};

export default Contact;
