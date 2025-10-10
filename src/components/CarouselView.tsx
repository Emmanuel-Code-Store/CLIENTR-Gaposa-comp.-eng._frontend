'use client';

import React from "react";
import { Container, Box } from "@mui/material";
import Slider from "react-slick";
import Image from 'next/image';

const images = [
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg",
  "/images/landingImg.jpeg"
];

const CarouselView: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box>
      <Container sx={{ minWidth: '100vw', textAlign: 'center', height: '100vh' }}>
        <Box textAlign="center" sx={{ background: 'pink', textAlign: 'center', width: '100%', height: '100vh' }}>

          <Slider {...settings}>
            {images.map((image, index) => (
              <Box key={index} sx={{ width: '100%', height: '100vh', background: 'green' }}>
                <Image
                  src={image}
                  alt={`Slide ${index}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100vh", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default CarouselView;
