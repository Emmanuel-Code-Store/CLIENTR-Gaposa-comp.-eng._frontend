"use client";

import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image"; import { motion } from "framer-motion";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpeg",
  "/images/6.jpg",
  "/images/7.jpeg",
  "/images/8.jpeg",
  "/images/9.jpg"
];

export default function News() {
  const [currentIndex, setCurrentIndex] = React.useState(0);


  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{
      padding: '2rem 0', minHeight: '100vh', bgcolor: '#fdf9ff', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <Box sx={{
        width: { xs: '90%', sm: '90%', md: '80%' }, display: 'flex',
        flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: '1rem',

      }}>
        <Box sx={{
          width:'100%',
          display: 'flex',
          flexDirection: {xs:'column', sm:'column', md:'row'},
          gap: 2,
          justifyContent: 'space-between', alignItems: {xs:'start', sm:'start', md:'center'},
        }}>
          <Typography component="h2" sx={{ color: '#FF2600', borderLeft: '5px solid #FF2600', paddingLeft: '1rem', fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' } }}>
            Computer Engineering News & Updates
          </Typography>
          <Button sx={{ background: '#659AC9', color: '#fff', width: {xs:'80%', sm:'50%', md:'20%'}, borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
            Learn More <ArrowForwardIcon />
          </Button>
        </Box>

        <Box sx={{
          width: '90vw',
          height: '35rem',
          display: 'flex',
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center', position: 'relative',
          overflow: 'hidden',
        }}>

          <Button
            onClick={goPrev}
            sx={{
              zIndex: '20000',
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: '#659AC9', color: '#fff', borderRadius: '50%', padding: '1rem',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Prev
          </Button>

          <motion.div
            style={{ display: 'flex', transition: 'transform 0.5s ease' }}
            animate={{ x: -currentIndex * 100 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Box
                  sx={{
                    width: { xs: '15rem', sm: '25rem', md: '35rem' },
                    minHeight: { xs: '15rem', sm: '25rem', md: '35rem' },
                    marginRight: '1rem',
                  }}
                >

                  <Image
                    src={image}
                    alt="carousel image"
                    layout="responsive"
                    width={100}
                    height={100}
                    style={{ width: '35rem', minHeight: '35rem', objectFit: "cover" }}
                  />
                </Box>
                <Box sx={{ width: '80%', margin: 'auto', position: 'relative', marginTop: '-80px', padding: '2rem', height: '8rem', bgcolor: '#fff' }}>
                  <Typography component="p">Children’s Day Extravaganza at Computer ENgineering</Typography>
                </Box>
              </motion.div>
            ))}
          </motion.div>


          <Button
            onClick={goNext}
            sx={{
              zIndex: '20000',
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: '#659AC9', color: '#fff', borderRadius: '50%', padding: '1rem',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
