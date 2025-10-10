'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function MediaControlCard() {

  return (
    <Box sx={{
      width: '80%', minHeight: '100vh', display: 'flex',
      flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '3.0625rem', padding:'3rem 0', margin:'auto'
    }}>
      <Card sx={{ display: 'flex', width: '40rem', height: {xs:'10rem', sm:'18rem', md:'20rem'} }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{fontSize: {xs:'1rem', sm:'1.5rem', md:'2rem'}}} component="div" variant="h5">
              Dr. Adekunle
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Principal
            </Typography>
          </CardContent>

        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <Image
            src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
            alt="light"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Card>


      <Card sx={{ display: 'flex', width: '40rem', height: {xs:'10rem', sm:'18rem', md:'20rem'} }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{fontSize: {xs:'1rem', sm:'1.5rem', md:'2rem'}}} component="div" variant="h5">
              Dr. Adekunle
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Principal
            </Typography>
          </CardContent>

        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <Image
            src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
            alt="light"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Card>

      <Card sx={{ display: 'flex', width: '40rem', height: {xs:'10rem', sm:'18rem', md:'20rem'} }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{fontSize: {xs:'1rem', sm:'1.5rem', md:'2rem'}}} component="div" variant="h5">
              Dr. Adekunle
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Principal
            </Typography>
          </CardContent>

        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <Image
            src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
            alt="light"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Card>
      <Card sx={{ display: 'flex', width: '40rem', height: {xs:'10rem', sm:'18rem', md:'20rem'} }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{fontSize: {xs:'1rem', sm:'1.5rem', md:'2rem'}}} component="div" variant="h5">
              Dr. Adekunle
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Principal
            </Typography>
          </CardContent>

        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <Image
            src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
            alt="light"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Card>
      <Card sx={{ display: 'flex', width: '40rem', height: {xs:'10rem', sm:'18rem', md:'20rem'} }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{fontSize: {xs:'1rem', sm:'1.5rem', md:'2rem'}}} component="div" variant="h5">
              Dr. Adekunle
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Principal
            </Typography>
          </CardContent>

        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <Image
            src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
            alt="light"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Card>
      <Card sx={{ display: 'flex', width: '40rem', height: {xs:'10rem', sm:'18rem', md:'20rem'} }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{fontSize: {xs:'1rem', sm:'1.5rem', md:'2rem'}}} component="div" variant="h5">
              Dr. Adekunle
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Principal
            </Typography>
          </CardContent>

        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <Image
            src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
            alt="light"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Card>

    </Box>
  );
}
