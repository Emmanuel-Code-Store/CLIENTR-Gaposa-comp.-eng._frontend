'use client';

import React from "react";
import { Container, Box } from "@mui/material";
import Slider from "react-slick"; 
import styles from './page.module.css';
import Image from 'next/image';

const images = [
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg"
];

const Carousel: React.FC = () => {
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  
    autoplaySpeed: 2000,
  };

  return (
    <Box className={styles.page}>
      <Container  sx={{ background: 'red', minWidth:'100vw', textAlign: 'center', height: '100vh' }}>
        <Box textAlign="center"  sx={{ background: 'pink', textAlign: 'center', width:'100%', height: '100vh' }}>
         
          <Slider {...settings}> 
            {images.map((image, index) => (
               <Box key={index} sx={{ width: '100%', height: '100vh', background: 'green' }}>
               <Image layout="fill"  src={image} alt={`Slide ${index}`} style={{ width: "100%", height: "100%" }}/>
             </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Carousel;
