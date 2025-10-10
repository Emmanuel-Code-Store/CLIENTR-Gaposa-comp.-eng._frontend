'use client'

import { Box, CircularProgress, Skeleton, Typography, styled } from '@mui/material'
import Image from 'next/image'

const LoadingWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  gap: theme.spacing(4),
}))

const LogoContainer = styled(Box)(() => ({
  position: 'relative',
  width: '150px',
  height: '150px',
  animation: 'pulse 1.5s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
}))

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const StyledCircularProgress = styled(CircularProgress)(() => ({
  color: '#659AC9',
}))

const SkeletonContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  padding: theme.spacing(2),
}))

export default function Loading() {
  const skeletonWidths = ['89%', '85%', '78%', '79%']

  return (
    <LoadingWrapper>
      <LogoContainer>
        <Image
          src={process.env.NEXT_PUBLIC_SCHOOL_LOGO_URL || ""}
          alt={`${process.env.NEXT_PUBLIC_SCHOOL_NAME || ""} `}
          layout="fill"
          objectFit="contain"
          priority
        />
      </LogoContainer>

      <ProgressContainer>
        <StyledCircularProgress size={40} />
        <Typography
          variant="body1"
          sx={{
            color: '#0C123A',
            fontWeight: 500,
            animation: 'fadeInOut 1.5s infinite',
            '@keyframes fadeInOut': {
              '0%': { opacity: 0.5 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.5 },
            },
          }}
        >
          Loading...
        </Typography>
      </ProgressContainer>

      <SkeletonContainer>
        <Box sx={{ mb: 2 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{
              backgroundColor: 'rgba(101, 154, 201, 0.1)',
              borderRadius: 1
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="33.33%"
              height={100}
              sx={{
                backgroundColor: 'rgba(101, 154, 201, 0.1)',
                borderRadius: 1
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {skeletonWidths.map((width, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={width}
              height={20}
              sx={{
                backgroundColor: 'rgba(101, 154, 201, 0.1)',
                borderRadius: 1
              }}
            />
          ))}
        </Box>
      </SkeletonContainer>

      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#0C123A',
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SCHOOL_NAME}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: '#659AC9',
            display: 'block',
          }}
        >
          {process.env.NEXT_PUBLIC_SCHOOL_MOTTO}
        </Typography>

      </Box>
    </LoadingWrapper>
  )
}
