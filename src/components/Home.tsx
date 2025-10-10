'use client';
import { Grid2, Paper, Box, Typography, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from 'next/image';
import News from "@/components/News";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAOS } from "@/hooks/useAOS";


const MyCarousel = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      bannerImage: "/images/landingImg.jpeg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      bannerImage: "/images/landingImg.jpeg",
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: "/images/landingImg.jpeg",
    },
  ];
  useAOS({ once: false });

  return (
    <Carousel autoPlay interval={15000} animation="slide" indicators={false}>
      {items.map((item, index) => (
        <Paper key={index} style={{ textAlign: "center" }}>
          <Image
            src={item.bannerImage}
            alt={item.name}
            layout="responsive"
            width={100}
            height={100}
            priority
            data-aos="zoom-in"
            data-aos-duration="1000"
          />
        </Paper>
      ))}
    </Carousel>
  );
};

const Home = () => {
  return (
    <>
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 size={12}>
          <MyCarousel />
        </Grid2>
      </Grid2>


      <Box sx={{ background: '#E9E9E9', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh',  fontFamily: 'Raleway, sans-serif' }}>
        <Box sx={{
          width: { xs: '100%', sm: '90%', md: '80%' }, minHeight: '40vh', borderRadius: { xs: '0px', sm: '10px', md: '20px' }, background: '#09226AE5', padding: '2rem', margin: '3rem auto', display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          <Typography data-aos="fade-left"
            data-aos-duration="1500" component="h2" textAlign="center" sx={{ color: '#fff', fontSize: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }, fontFamily: 'Raleway, sans-serif' }}>Tender Step  Important Update</Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}>
            <Box data-aos="fade-left"
              data-aos-duration="1600" sx={{
                background: '#FFFDFF', maxWidth: '400px', minHeight: '380px', borderRadius: '20px', flex: 1, minWidth: { xs: '15.75rem', md: '18.75rem' }, textAlign: 'center', alignItems: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'
              }}>
              <Image src="/images/update.png"
                width={40}
                height={40}
                alt="light"
                style={{ width: '', height: '' }}
              />
              <Typography component="p" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontWeight: 'bold', lineHeight: '3.5rem',fontFamily: 'Raleway, sans-serif' }}>Tender Step  School Important Update</Typography>
              <Button color="inherit" sx={{ width: '100%', height: '3.75rem', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem',fontFamily: 'Raleway, sans-serif' }}>
                Learn More<ArrowForwardIcon />
              </Button>
            </Box>

            <Box data-aos="fade-left"
              data-aos-duration="1700" sx={{
                background: '#FFFDFF', maxWidth: '400px', minHeight: '380px', borderRadius: '20px', flex: 1, minWidth: { xs: '15.75rem', md: '18.75rem' }, textAlign: 'center', alignItems: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'
              }}>
              <Image src="/images/update.png"
                width={40}
                height={40}
                alt="light"
                style={{ width: '', height: '' }}
              />
              <Typography component="p" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontWeight: 'bold', lineHeight: '3.5rem', fontFamily: 'Raleway, sans-serif' }}>Tender Step  School Important Update</Typography>
              <Button color="inherit" sx={{ width: '100%', height: '3.75rem', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', fontFamily: 'Raleway, sans-serif'}}>
                Learn More <ArrowForwardIcon />
              </Button>
            </Box>

            <Box data-aos="fade-up"
              data-aos-duration="1500" sx={{
                background: '#FFFDFF', maxWidth: '400px', minHeight: '380px', borderRadius: '20px', flex: 1, minWidth: { xs: '15.75rem', md: '18.75rem' }, textAlign: 'center', alignItems: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'
              }}>
              <Image src="/images/update.png"
                width={40}
                height={40}
                alt="light"
                style={{ width: '', height: '' }}
              />
              <Typography component="p" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontWeight: 'bold', lineHeight: '3.5rem', fontFamily: 'Raleway, sans-serif' }}>Tender Step  School Important Update</Typography>
              <Button data-aos="zoom-in"
                data-aos-duration="1500" color="inherit" sx={{ width: '100%', height: '3.75rem', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', fontFamily: 'Raleway, sans-serif' }}>
                Learn More <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ background: '#fff', minHeight: '50vh', }}>
        <Box sx={{
          margin: '2rem auto', display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: '4rem', sm: '4rem', md: '4rem', lg: '2rem' },
          justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'center' },
          alignItems: 'center',
          borderRadius: '20px',
          width: { xs: '100%', sm: '90%', md: '80%' },
          minHeight: '60vh',
          boxShadow: '5px 5px 40px 0px #0000004D',
          padding: '20px'
        }}>
          <Box sx={{ flex: { xs: 'none', sm: 'none', md: 'none', lg: 1 }, minWidth: '40%', width: { xs: '100%', sm: '100%', md: '100%', lg: '50%' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: '2rem', paddingLeft: { xs: '.5rem', sm: '.5rem', md: '.5rem', lg: '2rem' } }}>
            <Typography component="p" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' }, color: '#214ECE', fontFamily: 'Raleway, sans-serif' }} data-aos="fade-left"
              data-aos-duration="1200">Reunite and Reconnect!</Typography>
            <Typography component="h3" sx={{ fontWeight: 'bolder', fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontFamily: 'Raleway, sans-serif' }} data-aos="fade-left"
              data-aos-duration="1300">Welcome Back
              to School!</Typography>
            <Typography component="p" data-aos="fade-left"
              data-aos-duration="1400" sx={{ fontFamily: 'Raleway, sans-serif'}}>The moment we’ve been eagerly awaiting has arrived - welcome back to school! it’s time to rekindle the spirit of curiosity, embrace new challenges, and embark on a fresh academic adventure.</Typography>
            <Box sx={{
              display: { xs: 'block', sm: 'flex', md: 'flex' },
              flexWrap: 'wrap',
              gap: 5,
              justifyContent: 'center',
              width: '100%'
            }}>
              <Button sx={{ marginRight: '2rem', background: '#659AC9', color: '#fff', flex: 1, height: '3.75rem', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem',fontFamily: 'Raleway, sans-serif' }}>
                About Us <ArrowForwardIcon />
              </Button>
              <Button sx={{ background: '#659AC9', color: '#fff', flex: 2, height: '3.75rem', borderRadius: '30px', border: '1px solid #0C123A', marginTop: { xs: '1rem', sm: '0rem', md: '0rem' }, display: 'flex', flexDirection: 'row', gap: '1rem', fontFamily: 'Raleway, sans-serif'}}>
                Management Messages <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
          <Box sx={{
            flex: { xs: 'none', sm: 'none', md: 'none', lg: 'none' }, width: { xs: '20.5625rem', sm: '25.5625rem', md: '30.5625rem', lg: '36.5625rem' }, minHeight: { xs: '19.875rem', sm: '29.875rem', md: '39.875rem', lg: '49.875rem' }
          }}>
            <Image src="/images/staff.png"
              width={100}
              height={100}
              layout="responsive"
              alt="staff"
              className="image"
              data-aos="zoom-in"
              data-aos-duration="1500"
            />
          </Box>
        </Box>
      </Box>


      <Box sx={{
        background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%',
        minHeight: '100vh',
        backgroundImage: 'url(/images/71a192f1193d3440fb7331a6170c899d.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box sx={{
          background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%', minHeight: '100vh', padding: '2rem 0'
        }}>

          <Box textAlign="center" data-aos="fade-up" data-aos-duration="1800" sx={{ color: '#fff', padding: '2rem 0', width: { xs: '100%', sm: '80%', md: '50%' }, margin: 'auto' }}>
            <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' }, fontFamily: 'Raleway, sans-serif' }} data-aos="zoom-in"
              data-aos-duration="1500">Explore What We Offer</Typography>
            <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontWeight: 'bolder', fontFamily: 'Raleway, sans-serif' }} data-aos="zoom-in"
              data-aos-duration="1600">Nurturing Precious
              Hearts With Quality Care</Typography>
          </Box>
          <Box sx={{
            // width:'80%',
            margin: 'auto',
            padding: { xs: '0 1rem', sm: '0 1.5rem', md: '0 2rem' }, display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            alignItem: 'center'
          }}>
            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#FFE9E4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }} data-aos="zoom-in"
              data-aos-duration="1500">
              <Image src="/images/extracurricular 1.png"
                width={150}
                height={150}
                alt="light"
                style={{ width: '', height: '' }}
              />
              <Typography component="p" sx={{ color: '#FE5D37', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', width: '80%',fontFamily: 'Raleway, sans-serif' }}>Extracurricular
                Activities</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#AE8479', fontFamily: 'Raleway, sans-serif' }}>Enriching Extracurricular
                Adventures</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#EDEAFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }} data-aos="zoom-in"
              data-aos-duration="1500">
              <Image src="/images/Rectangle 1135.png"
                width={150}
                height={150}
                alt="light"
                style={{ width: '', height: '' }}
              />
              <Typography component="p" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', color: '#786ACF', width: '80%',fontFamily: 'Raleway, sans-serif' }}>E-learning</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#8883A5', fontFamily: 'Raleway, sans-serif' }}>Cutting -Edge E-Learning
                Opportunities</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#FFF3D8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }} data-aos="zoom-in"
              data-aos-duration="1500">
              <Image src="/images/requirements 1.png"
                width={150}
                height={150}
                alt="light"
                style={{}}
              />
              <Typography component="p" sx={{ color: '#FEC624', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', width: '80%', fontFamily: 'Raleway, sans-serif' }}>Character
                Development</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#A08E66', fontFamily: 'Raleway, sans-serif' }}>Holistic Character
                Development</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#DEFDFA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }} data-aos="zoom-in"
              data-aos-duration="1500">
              <Image src="/images/dictionary 1.png"
                width={150}
                height={150}
                alt="light"
                style={{}}
              />
              <Typography component="p" sx={{ color: '#5BD7CA', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', width: '60%', fontFamily: 'Raleway, sans-serif' }}>Up to Date
                Syllabus</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#6DA39E', fontFamily: 'Raleway, sans-serif'  }}>Modern Syllabus
                Mastery</Typography>
            </Box>
          </Box>

          <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: { xs: '90%', sm: '50%', md: '30%' }, borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem', fontFamily: 'Raleway, sans-serif' }}>
            Learn More about Tender Step  School <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#fdf9ff', padding: '3rem 0' }}>
        <Typography component="h2" textAlign="center" sx={{ fontSize: '2rem', color: '#FF2600', fontFamily: 'Raleway, sans-serif' }}>DISCOVER TENDER STEP SCHOOL</Typography>
        <Typography component="p" textAlign="center" sx={{fontFamily: 'Raleway, sans-serif'}}>Learn more about us, our mission, Vision ane core values.</Typography>
        <Box sx={{
          width: '80%', margin: 'auto', display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          mt: '1rem'
        }}>

          <Box textAlign="center" sx={{ width: '374px', minHeight: '30rem', bgcolor: '#fff', borderBottom: '5px solid #FF2600', padding: '2rem' }} data-aos="fade-right"
            data-aos-duration="1500">
            <Box sx={{ width: '100%', height: '15rem', borderRadius: '5px 5px 50px 5px', bgcolor: '#D9D9D9' }}>

            </Box>
            <Typography component="h3" sx={{ fontSize: '38px', color: '#FF2600', fontFamily: 'Raleway, sans-serif' }}>Get to know us</Typography>
            <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>To provide a world class learning opportunities where no child is left out or behind.</Typography>
            <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: '70%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem', fontFamily: 'Raleway, sans-serif' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>

          <Box textAlign="center" sx={{ width: '374px', minHeight: '30rem', bgcolor: '#fff', borderBottom: '5px solid #FF2600', padding: '2rem' }}
            data-aos="fade-right"
            data-aos-duration="1500">
            <Box sx={{ width: '100%', height: '15rem', borderRadius: '5px 5px 50px 5px', bgcolor: '#D9D9D9' }}>

            </Box>
            <Typography component="h3" sx={{ fontSize: '38px', color: '#FF2600', fontFamily: 'Raleway, sans-serif' }}>Get to know us</Typography>
            <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>To provide a world class learning opportunities where no child is left out or behind.</Typography>
            <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: '70%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem', fontFamily: 'Raleway, sans-serif' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>

          <Box textAlign="center" sx={{ width: '374px', minHeight: '30rem', bgcolor: '#fff', borderBottom: '5px solid #FF2600', padding: '2rem' }}
            data-aos="fade-right"
            data-aos-duration="1500">
            <Box sx={{ width: '100%', height: '15rem', borderRadius: '5px 5px 50px 5px', bgcolor: '#D9D9D9' }}>

            </Box>
            <Typography component="h3" sx={{ fontSize: '38px', color: '#FF2600',fontFamily: 'Raleway, sans-serif' }}>Get to know us</Typography>
            <Typography component="p" sx={{fontFamily: 'Raleway, sans-serif'}}>To provide a world class learning opportunities where no child is left out or behind.</Typography>
            <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: '70%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem', fontFamily: 'Raleway, sans-serif' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>

        </Box>
      </Box>

      <Box sx={{ bgcolor: '#0C123A', width: '100%', minHeight: '50vh', padding: { xs: '0 1rem', sm: '0 1.5rem', md: '0 2rem' }, }}>
        <Box sx={{
          width: { xs: '100%', sm: '90%', md: '80%' }, minHeight: '100vh', margin: 'auto', display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center', alignItems: 'center', padding: '2rem 0'
        }}>
          <Box sx={{ flex: { xs: 'none', sm: 'none', md: 1 }, width: { xs: '100%', sm: '80%', md: '50%' }, minHeight: { xs: '100%', sm: '80%', md: '50%' }, }}>
            <Image
              src="/images/153253.jpg"
              alt="star"
              layout="responsive"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              data-aos="zoom-in"
              data-aos-duration="1500"
            />

          </Box>
          <Box sx={{ flex: { xs: 'none', sm: 'none', md: 1 }, width: { xs: '100%', sm: '80%', md: '50%' }, }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' }, fontFamily: 'Raleway, sans-serif' }}>Celebrating Excellence</Typography>
            <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, color: '#fff', fontFamily: 'Raleway, sans-serif' }}>Meet the  Stars</Typography>
            <Typography component="p" sx={{ color: '#fff', fontFamily: 'Raleway, sans-serif' }}>Tender Step  take pride in EXCELLENCE, student who have excelled remarkably in external and international examinations. With a rigorous academic curriculum, dedicated staff, and a supportive learning environment, our students achieve extraordinary success, setting new benchmarks for excellence and making us proud as a leading educational institution.</Typography>
            <Button sx={{ background: '#659AC9', color: '#fff', marginTop: '3rem', width: '50%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem', fontFamily: 'Raleway, sans-serif' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      <News />

      <Box sx={{ bgcolor: '#f1f5ff' }}>
        <Box sx={{ minHeight: '100vh', margin: 'auto', padding: { xs: '.9rem', sm: '1rem', md: '2rem' } }}>
          <Box sx={{ width: { xs: '100%', sm: '90%', md: '80%' }, margin: '2rem auto', paddingLeft: '1rem', borderLeft: '5px solid #FF2600' }}>
            <Typography component="h2" sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' }, color: '#FF2600', lineHeight: '3rem', fontFamily: 'Raleway, sans-serif' }}>Popular Links</Typography>
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '90%', md: '80%' },
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            padding: { xs: '.9rem', sm: '1rem', md: '0rem' },
          }}>

            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box sx={{
                width: '100%',
                margin: 'auto',
              }}>
                <Image
                  src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
                  alt="light"
                  width={800}
                  height={800}
                  layout="responsive"
                  objectFit="cover"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  margin: 'auto',
                  textAlign: 'center',
                  top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  width:'100%'
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' },
                    lineHeight: 1.5, fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box sx={{
                width: '100%',
                margin: 'auto',
              }}>
                <Image
                  src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
                  alt="light"
                  width={800}
                  height={800}
                  layout="responsive"
                  objectFit="cover"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  margin: 'auto',
                  textAlign: 'center',
                  top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  width:'100%'
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' },
                    lineHeight: 1.5, fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box sx={{
                width: '100%',
                margin: 'auto',
              }}>
                <Image
                  src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
                  alt="light"
                  width={800}
                  height={800}
                  layout="responsive"
                  objectFit="cover"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  margin: 'auto',
                  textAlign: 'center',
                  top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  width:'100%'
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' },
                    lineHeight: 1.5, fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box sx={{
                width: '100%',
                margin: 'auto',
              }}>
                <Image
                  src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
                  alt="light"
                  width={800}
                  height={800}
                  layout="responsive"
                  objectFit="cover"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  margin: 'auto',
                  textAlign: 'center',
                  top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  width:'100%'
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' },
                    lineHeight: 1.5, fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box sx={{
                width: '100%',
                margin: 'auto',
              }}>
                <Image
                  src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
                  alt="light"
                  width={800}
                  height={800}
                  layout="responsive"
                  objectFit="cover"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  margin: 'auto',
                  textAlign: 'center',
                  top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  width:'100%'
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' },
                    lineHeight: 1.5, fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>



            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Box sx={{
                width: '100%',
                margin: 'auto',
              }}>
                <Image
                  src="/images/00c18a25d66fe1f8f35b970d33e0ab46.jpeg"
                  alt="light"
                  width={800}
                  height={800}
                  layout="responsive"
                  objectFit="cover"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  margin: 'auto',
                  textAlign: 'center',
                  top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  width:'100%'
                }}
              >

                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' },
                    lineHeight: 1.5, fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>








          </Box>
        </Box>
      </Box>
      <Box sx={{
        width: '100vw', minHeight: '100vh', background: '#0C123A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem 0'
      }}>
        <Box textAlign="center" sx={{ color: '#fff' }}>
          <Typography component="p" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' }, fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
            data-aos-duration="1500">TESTIMONIALS</Typography>
          <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' } }} data-aos="fade-up"
            data-aos-duration="1500">Hear what <span style={{ color: '#FF2600', fontFamily: 'Raleway, sans-serif' }}>ALUMNI
            </span></Typography>
          <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' }, fontFamily: 'Raleway, sans-serif' }} data-aos="fade-up"
            data-aos-duration="1500">have to say about Tender Step  Schools</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: '.9rem', sm: '1rem', md: '0rem' }
          }}
        >


          <Box sx={{ borderRadius: '1rem', padding: '1rem', textAlign: 'center', width: { xs: '100%', sm: '500px', md: '390px' }, height: { xs: '35rem', sm: '35rem', md: '30rem' }, boxShadow: '2px 4px 10px 0px #0000001A', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }} data-aos="zoom-in"
            data-aos-duration="1500">
            <Typography component="p" sx={{ color: '#3A3E47', fontFamily: 'Raleway, sans-serif' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitrices. Suspendisse bibendum ultrices enim, quis blandit quam sollicitudin nec. Ut posuere porta enim, id Praesent in metus sed ipsum vestibulum rutrum. Donec ac lacus ac libero mattis p</Typography>
            <Typography component="p" sx={{ color: '#3A3E47', fontSize: '1.5rem', fnotWeight: 'bolder', borderTop: '1px solid var(--Lemon, #88C90D)', fontFamily: 'Raleway, sans-serif' }}>LOREM IPSUM</Typography>
            <Typography component="p" sx={{ mt: '5rem', fontFamily: 'Raleway, sans-serif' }}>Parent</Typography>
          </Box>

          <Box sx={{ borderRadius: '1rem', padding: '1rem', textAlign: 'center', width: { xs: '100%', sm: '500px', md: '390px' }, height: { xs: '35rem', sm: '35rem', md: '30rem' }, boxShadow: '2px 4px 10px 0px #0000001A', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }} data-aos="zoom-in"
            data-aos-duration="1500">
            <Typography component="p" sx={{ color: '#3A3E47', fontFamily: 'Raleway, sans-serif' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitrices. Suspendisse bibendum ultrices enim, quis blandit quam sollicitudin nec. Ut posuere porta enim, id Praesent in metus sed ipsum vestibulum rutrum. Donec ac lacus ac libero mattis p</Typography>
            <Typography component="p" sx={{ color: '#3A3E47', fontSize: '1.5rem', fnotWeight: 'bolder', borderTop: '1px solid var(--Lemon, #88C90D)', fontFamily: 'Raleway, sans-serif' }}>LOREM IPSUM</Typography>
            <Typography component="p" sx={{ mt: '5rem', fontFamily: 'Raleway, sans-serif' }}>Parent</Typography>
          </Box>

          <Box sx={{ borderRadius: '1rem', padding: '1rem', textAlign: 'center', width: { xs: '100%', sm: '500px', md: '390px' }, height: { xs: '35rem', sm: '35rem', md: '30rem' }, boxShadow: '2px 4px 10px 0px #0000001A', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }} data-aos="zoom-in"
            data-aos-duration="1500">
            <Typography component="p" sx={{ color: '#3A3E47', fontFamily: 'Raleway, sans-serif' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitrices. Suspendisse bibendum ultrices enim, quis blandit quam sollicitudin nec. Ut posuere porta enim, id Praesent in metus sed ipsum vestibulum rutrum. Donec ac lacus ac libero mattis p</Typography>
            <Typography component="p" sx={{ color: '#3A3E47', fontSize: '1.5rem', fnotWeight: 'bolder', borderTop: '1px solid var(--Lemon, #88C90D)', fontFamily: 'Raleway, sans-serif' }}>LOREM IPSUM</Typography>
            <Typography component="p" sx={{ mt: '5rem' }}>Parent</Typography>
          </Box>

        </Box>
        <Button sx={{ background: '#659AC9', color: '#fff', marginTop: '3rem', width: { xs: '80%', sm: '50%', md: '20%' }, borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem', fontFamily: 'Raleway, sans-serif' }}>
          Learn More <ArrowForwardIcon />
        </Button>

      </Box>





    </>
  );
};

export default Home;
