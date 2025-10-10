"use client";

import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const images = [
  "/images/71a192f1193d3440fb7331a6170c899d.jpeg",
  "/images/istockphoto-483322025-612x612.jpg",
  "/images/abcd.png",
  "/images/landingImg.jpeg",
  "/images/Untitled.jpeg",
  "/images/Pictures.png",
  "/images/80fd2abc35ce83b00538f50db423ceed.png",
];

export default function News() {

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
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: 2,
          justifyContent: 'space-between', alignItems: { xs: 'start', sm: 'start', md: 'center' },
        }}>
          <Typography component="h2" sx={{ color: '#FF2600', borderLeft: '5px solid #FF2600', paddingLeft: '1rem', fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' } }}>
            Tender Steps News & Updates
          </Typography>
          <Button sx={{ background: '#659AC9', color: '#fff', width: { xs: '80%', sm: '50%', md: '20%' }, borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
            Learn More <ArrowForwardIcon />
          </Button>
        </Box>

        <Box sx={{
          width: '90vw',
          height: '35rem',
          position: 'relative',
          overflow: 'hidden',
        }}>


          <Box
            sx={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'start',
              alignItems: 'start',
              overflowY: 'none',
              overflowX: 'scroll',
            }}
          >
            {images.map((image, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    width: '35rem',
                    minHeight: { md: '35rem' },
                    marginRight: '1rem',
                  }}
                >
                  <Image
                    src={image}
                    alt="carousel image"
                    width={100}
                    height={100}
                    layout="responsive"
                    style={{ width: "35rem", minHeight: "35rem", objectFit: "cover" }}
                    priority
                  />
                </Box>
                <Box sx={{ width: '80%', margin: 'auto', position: 'relative', marginTop: '-80px', padding: '2rem', height: '8rem', bgcolor: '#fff' }}>
                  <Typography component="p">Children’s Day Extravaganza at Tender Steps Schools</Typography>
                </Box>
              </Box>
            ))}
          </Box>



        </Box>
      </Box>
    </Box>
  );
}
