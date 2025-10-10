"use client"

import {
  Box,
  Typography,
} from "@mui/material"

import Image from "next/image"

export default function ElectionFooter() {

  return (

    <Box sx={{ bgcolor: '#E8E6F6', minHeight: '200px', width: '100%', mt: 10, p: 5, display: 'flex', justifyContent: 'center', gap: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/images/election_logo.jpeg" alt="Description of image" width={50} height={50} style={{ borderRadius: '8px' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4" sx={{ fontSize: '2rem' }}>
          Contact
        </Typography>
        <Typography variant="body1">Gate (ICT) Polytechnic Saapade</Typography>
        <Typography variant="body1">+61 491 678 996</Typography>
        <Typography variant="body1">info@gaposa.comp.eng.edu.ng</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4" sx={{ fontSize: '2rem' }}>
          Visit
        </Typography>
        <Typography variant="body1">168 N Edwards Street</Typography>
        <Typography variant="body1">PO Box 1002</Typography>
        <Typography variant="body1">Saapade, Ogun 93526</Typography>
        <Typography variant="body1">Open:</Typography>
        <Typography variant="body1">Monday - Friday, Excluding Holidays</Typography>
        <Typography variant="body1">8:30 am to 12:00 pm and 1:00 pm - 5:00</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4" sx={{ fontSize: '2rem' }}>
          Social
        </Typography>
        <Typography variant="body1">Facebook</Typography>
        <Typography variant="body1">Instagram</Typography>
        <Typography variant="body1">Twitter</Typography>
        <Typography variant="body1">Whatsapp</Typography>
      </Box>
    </Box>
  )
}
