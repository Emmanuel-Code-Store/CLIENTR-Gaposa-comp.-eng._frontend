'use client'

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Image from 'next/image';

const Contact: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('error');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !phone || !message) {
      setAlertMessage('Empty fields detected. Please fill in all fields.');
      setAlertSeverity('error');
      return;
    }

    setAlertMessage('Message sent successfully!');
    setAlertSeverity('success');

    setTimeout(() => {
      alert(`Message from ${username}: ${message}`);
      setUsername('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAlertMessage('');
    }, 2000);
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
                <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '2rem', md: '3rem' }, lineHeight: '5rem', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-left"
      data-aos-duration="1500">Contact Us</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} data-aos="fade-left"
      data-aos-duration="1500">
                <Image src="/images/Group 2149.png" width={40} height={40} alt="Address" />
                <Box>
                  <Typography component="p" data-aos="fade-left"
      data-aos-duration="1500" sx={{fontFamily: 'Raleway, sans-serif'}}>Address</Typography>
                  <Typography component="p" data-aos="fade-left"
      data-aos-duration="1500" sx={{fontFamily: 'Raleway, sans-serif'}}>14, Adegboyega Street, Alade, Ijoko, Ogun State, Nigeria</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} data-aos="fade-left"
      data-aos-duration="1500">
                <Image src="/images/Group 21491.png" width={40} height={40} alt="Call Us" />
                <Box data-aos="fade-left"
      data-aos-duration="1500">
                  <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>Call Us</Typography>
                  <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>+234 906 6929 845, +234 802 8704 43</Typography>
                </Box>
              </Box>

              <Box data-aos="fade-left"
      data-aos-duration="1500" sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Image src="/images/Group 21492.png" width={40} height={40} alt="Email" />
                <Box data-aos="fade-left"
      data-aos-duration="1500">
                  <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>Email</Typography>
                  <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>info@tenderstepsschools.com.ng</Typography>
                </Box>
              </Box>

              <Box data-aos="fade-left"
      data-aos-duration="1500">
                <Typography component="p" sx={{ lineHeight: '5rem', fontFamily: 'Raleway, sans-serif' }}>Follow Us</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                  <Image src="/images/logos_facebook.png" width={40} height={40} alt="Facebook" />
                </Box>
              </Box>


            </Box>

            <Box data-aos="fade-left"
      data-aos-duration="1700" sx={{ width: { xs: '90%', sm: '80%', md: '50%' }, padding: { xs: '0', sm: '0', md: '2rem' }, paddingBottom: { xs: '1rem', sm: '1rem', md: '0' } }}>
            {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems:'start', justifyContent:'space-between' }}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    label="Your Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{height:'3.75rem', fontFamily: 'Raleway, sans-serif'}}
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
      }} data-aos="fade-up"
      data-aos-duration="1700">
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
