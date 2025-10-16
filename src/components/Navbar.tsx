'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, Box, Typography, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const iconSizes = {
  smallWidth: 20,
  mediumWidth: 30,
  largeWidth: 50,

  smallHeight: 20,
  mediumHeight: 30,
  largeHeight: 50,
};

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const handleNavigation = (section: string) => {
    if (section !== 'Portal ') {
      router.push(`/${section.toLowerCase()}`);
    }
  };

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  const sections = ['Home', 'About', 'Gallery', 'News', 'Event', 'Portal ', 'Contact'];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ backgroundColor: "#0C123A", }}>
        <Box sx={{
          display: 'flex', flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          }, gap: { xs: '1rem', sm: '1rem' }, flexGrow: 1, justifyContent: 'start', alignItems: 'center', minWidth: '100%'
        }}>
          <Box sx={{ padding: '1rem 0', display: 'flex', gap: '1rem', flexGrow: 1, justifyContent: 'start', alignItems: 'center', borderBottom: { xs: '1px solid #B8C6E4', md: 'none' }, minWidth: { xs: '100%', md: 'auto' }, }}>
            <Image src="/images/call.png"
              width={40}
              height={40}
              alt="light"
              style={{}}
            />
            <Box>
              <p>Call Us</p>
              <p>+234 802 344 2012</p>
            </Box>
          </Box>
          <Box sx={{
            padding: '1rem 0', display: 'flex', gap: '1rem', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', borderLeft: { sm: 'none', md: '1px solid #B8C6E4' },
            borderBottom: { xs: '1px solid #B8C6E4', md: 'none' },
            paddingLeft: { xs: '0rem', md: '1rem' }, minWidth: { xs: '100%', md: 'auto' }
          }}>
            <Image src="/images/location.png"
              width={40}
              height={40}
              alt="light"
              style={{}}
            />
            <Box>
              <p>Email</p>
              <p>info@computerengineeringgaposa.org</p>
            </Box>
          </Box>
          <Box sx={{ padding: '1rem 0', display: 'flex', gap: '1rem', flexGrow: 1, justifyContent: 'start', alignItems: 'center', borderLeft: { sm: 'none', md: '1px solid #B8C6E4', }, minWidth: { xs: '100%', md: 'auto' }, paddingLeft: { xs: '0rem', md: '1rem' } }}>
            <Image src="/images/mail.png"
              width={40}
              height={40}
              alt="light"
              style={{}}
            />
            <Box>
              <p>Location</p>
              <p>KM 55 lagos/ibadan expressway saapade remo Ogun state, Nigeria</p>
            </Box>
          </Box>
        </Box>
      </Toolbar>

      <Toolbar sx={{ display: { md: 'flex' }, flexGrow: 1, justifyContent: 'space-between', aligngItems: 'center', color: '#000' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '9.375rem', height: '9.375rem' }}>
          <Image
            src="/images/logo.jpeg"
            alt="logo"
            layout="responsive"
            width={iconSizes.largeWidth}
            height={iconSizes.largeHeight}
            style={{ cursor: 'pointer' }}
            priority
          />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', fontWeight: 'bold', gap: '2rem' }}>
          {sections.map((section) => (
            <Button
              key={section}
              color="inherit"
              onClick={() => handleNavigation(section)}
              endIcon={section === 'Portal ' ? <ExpandMoreIcon sx={{ marginLeft: 'auto' }} /> : null}
            >
              {section}
            </Button>
          ))}
        </Box>


        <Box sx={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '2rem', md: '3rem' }, height: { xs: '2rem', md: '3rem' } }}>
            <Image src="/images/search.png"
              layout="responsive"
              width={iconSizes.largeWidth}
              height={iconSizes.largeHeight}
              alt="search"
              style={{ cursor: 'pointer' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '2rem', md: '3rem' }, height: { xs: '2rem', md: '3rem' } }}>
            <Image src="/images/dots.png"
              layout="responsive"
              width={iconSizes.largeWidth}
              height={iconSizes.largeHeight}
              alt="options"
              style={{ cursor: 'pointer' }}
            />
          </Box>

          <IconButton color="inherit" edge="start" onClick={() => toggleDrawer(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>

        </Box>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {sections.map((section) => (
              <ListItem component="button" key={section} onClick={() => { handleNavigation(section); toggleDrawer(false); }} disabled={section === 'Portal '}>
                <Typography>{section}</Typography>
                {section === 'Portal ' && <ExpandMoreIcon sx={{ marginLeft: 'auto' }} />}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
