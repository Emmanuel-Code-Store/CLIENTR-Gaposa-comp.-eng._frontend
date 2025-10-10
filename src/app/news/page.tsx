import React from "react";
import { Button, Box, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from 'next/link';


const News: React.FC = () => (
  <>
    <Navbar />
    <Box sx={{
      background: 'linear-gradient(270deg, rgba(41, 12, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)'
      , width: '100%',
      minHeight: '100vh',
      backgroundImage: 'url(/images/abcd.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} data-aos="zoom-in"
    data-aos-duration="1500">
      <Box sx={{
        background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%', height: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'
      }}>
        <Typography component="h2" sx={{ fontSize: '3rem', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
              data-aos-duration="1500">News Letter</Typography>
        <Typography component="p" textAlign="center" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' }, padding: '0 2rem', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
              data-aos-duration="1500">Stay Connected with Tender Steps School: Get the Latest Updates and News</Typography>
      </Box>
    </Box>
    <Box sx={{
      width: '80%', minHeight: '10vh', display: 'flex',
      flexWrap: 'wrap', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center', margin: 'auto', padding: '2rem 0'
    }}>
      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }}>
          <Box sx={{
            width: '100%', height: '50%',
          }} data-aos="fade-up"
          data-aos-duration="1500">
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }} data-aos="zoom-in"
              data-aos-duration="1500">Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>


      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>


      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>

      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>


      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>

      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>


      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>

      <Link href="/newsDetails">


        <Box sx={{
          width: '100%', minHeight: '50%', boxShadow: '2px 2px 4px 0px #00000080', border: '1px solid #FFFDFF', bgcolor: '#fff', padding: '1.5625rem',
        }} data-aos="fade-up"
        data-aos-duration="1500">
          <Box sx={{
            width: '100%', height: '50%',
          }}>
            <Image
              src="/images/WhatsApp-Image-2024-05-27-at-18.52.12_3c8812f8.png"
              alt="news"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center'
          }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: '2.25rem', fontFamily: 'Raleway, sans-serif' }}>Important</Typography>

            <Button sx={{ width: '80%', height: '3.75rem', margin: 'auto', borderRadius: '30px', border: '1px solid #659AC9', display: 'flex', flexDirection: 'row', gap: '1rem', color: '#659AC9' }}>
              <Box sx={{fontFamily: 'Raleway, sans-serif'}}>
                <Image
                  src="/images/f7_book.png"
                  alt="news"
                  width={100}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
              Read News
            </Button>
          </Box>
        </Box>
      </Link>



    </Box>
    <Footer />
  </>
);

export default News;