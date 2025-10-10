'use client'; 

import React, { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import styles from './page.module.css';
import Slider from '@mui/material/Slider';

const SliderComp: React.FC = () => {
  const [value, setValue] = useState(30); 
  const handleSliderChange = (event: Event, newValue: number | number[]) => { 
    setValue(newValue as number); 
  };

  return (
    <Box className={styles.page}>
      
      <Container>
        <Box textAlign="center" marginTop={4}>
          <div style={{ padding: '20px' }}>
            <Typography gutterBottom>Slider Example</Typography>
            <Slider
              value={value}
              onChange={handleSliderChange}
              aria-labelledby="continuous-slider"
              min={0}  
              max={100}
              step={1} 
              valueLabelDisplay="auto" 
              valueLabelFormat={(value) => `${value}%`}
            />
            <Typography variant="body2" color="textSecondary">
              Value: {value}%
            </Typography>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default SliderComp;
