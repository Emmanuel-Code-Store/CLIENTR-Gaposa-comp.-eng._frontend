import React from "react";
import { Box, Typography } from '@mui/material';
import Navbar from '@computerEngineering/components/Navbar';
import Footer from "@computerEngineering/components/Footer";
import Image from 'next/image';

const subSections = ['All', 'Sports', 'Facilities', 'Welcome', 'Colour', 'Staff', 'Vaidictory', 'Acheivement', 'Children-Day'];

const Gallery: React.FC = () => (
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
        <Typography component="h2" sx={{ fontSize: '3rem' }}>Gallery</Typography>
        <Typography component="p" textAlign="center" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' }, padding: '0 2rem' }}>Our Mission is to provide a world class learning opportunities where no child is left out or behind.</Typography>
      </Box>
    </Box>

    <Box sx={{
      margin: '1rem auto', width: '80%',
    }}>
      <Typography component="ul" sx={{
        minWidth: '100%', height: '5rem', display: 'flex',
        flexDirection: 'row',
        gap: 2,
        justifyContent: 'start', alignItems: 'center', overflowX: 'auto', padding: '0 1rem'
      }}>
        {subSections.map((section) => (
          <Typography component="li" key={section} color="inherit" >
            {section}
          </Typography>
        ))}
      </Typography>
    </Box>
    <Box sx={{ width: '100%', minHeight: '100vh', marginBottom: '2rem' }}>
      <Box sx={{
        width: '80%', height: '100%', margin: 'auto', display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center', alignContent: 'center',
        justifyItems: 'center', alignItems: 'center'
      }}>
        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>

        <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
          <Image
            src="/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
            alt="light"
            layout="fill"
            objectFit="cover"
            style={{
              borderRadius: '1.25rem',
            }}
          />
        </Box>


      </Box>
    </Box>
    <Footer />
  </>
);

export default Gallery;