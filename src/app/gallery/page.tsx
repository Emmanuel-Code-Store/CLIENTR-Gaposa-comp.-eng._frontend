"use client";

import React, { useState } from "react";
import { Box, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Image from 'next/image';

const subSections = ['All', 'Sports', 'Facilities', 'Welcome', 'Colour', 'Staff', 'Vaidictory', 'Acheivement', 'Children-Day'] as const;

type SubSection = typeof subSections[number];

const images: Record<SubSection, string[]> = {
  All: [
    "/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg",
    "/images/71a192f1193d3440fb7331a6170c899d.jpeg",
    "/images/50c9ff32ed1d55593cbd69421680d464.jpeg",
    "/images/f48bb2c9708fa7bc83eb8305842d2dcd.jpeg",
    "/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg",
    "/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg",
    "/images/71a192f1193d3440fb7331a6170c899d.jpeg",
    "/images/153253.jpg",
    "/images/happy-african-american-student-raising-600nw-1937721487.webp",
  ],
  Sports: [
    "/images/71a192f1193d3440fb7331a6170c899d.jpeg",
    "/images/71a192f1193d3440fb7331a6170c899d.jpeg"
  ],
  Facilities: [
    "/images/50c9ff32ed1d55593cbd69421680d464.jpeg",
    "/images/50c9ff32ed1d55593cbd69421680d464.jpeg"
  ],
  Welcome: [
    "/images/f48bb2c9708fa7bc83eb8305842d2dcd.jpeg",
    "/images/f48bb2c9708fa7bc83eb8305842d2dcd.jpeg"
  ],
  Colour: [
    "/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg",
    "/images/f015fe04f0921d2c21decc51f1fd23b0.jpeg"
  ],
  Staff: [
    "/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg",
    "/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
  ],
  Vaidictory: [
    "/images/71a192f1193d3440fb7331a6170c899d.jpeg",
    "/images/71a192f1193d3440fb7331a6170c899d.jpeg"
  ],
  Acheivement: [
    "/images/153253.jpg",
    "/images/153253.jpg"
  ],
  'Children-Day': [
    "/images/happy-african-american-student-raising-600nw-1937721487.webp",
    "/images/happy-african-american-student-raising-600nw-1937721487.webp"
  ],

};

const Gallery: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SubSection>('All');

  const handleSectionClick = (section: SubSection) => {
    setSelectedSection(section);
  };

  return (
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
            data-aos-duration="1500">Gallery</Typography>
          <Typography component="p" textAlign="center" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' }, padding: '0 2rem', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
            data-aos-duration="1500">Our Mission is to provide a world class learning opportunities where no child is left out or behind.</Typography>
        </Box>
      </Box>

      <Box sx={{
        margin: '1rem auto', width: '80%',
      }}>
        <Typography component="ul" sx={{
          minWidth: '100%', height: '5rem', display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'start', alignItems: 'center', overflowX: 'auto', padding: '0 1rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}>
          {subSections.map((section) => (
            <Typography component="li" sx={{ cursor: "pointer" }} key={section} color="inherit" data-aos="fade-left"
              data-aos-duration="1500"
              onClick={() => handleSectionClick(section as SubSection)}
            >
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

          {images[selectedSection].map((imageSrc: string, index: number) => (
            <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }} key={index} data-aos="zoom-in"
              data-aos-duration={`${1000 + index * 100}`}>
              <Image
                src={imageSrc}
                alt={selectedSection}
                layout="fill"
                objectFit="cover"
                style={{
                  borderRadius: '1.25rem',
                }}
              />
            </Box>
          ))}


        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Gallery;