'use client';
import { Grid2, Paper, Box, Typography, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from 'next/image';
import styles from '@computerEngineering/app/page.module.css';
import News from "@computerEngineering/components/News";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MyCarousel = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      bannerImage: "/images/DSC_1521-1024x678.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      bannerImage: "/images/Gateway-Polytechnic-ICT-Saapade.jpg",
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: "/images/2.jpeg",
    },
  ];

  return (
    <Carousel autoPlay interval={2000} animation="slide" indicators={false}>
      {items.map((item, index) => (
        <Paper key={index} style={{ textAlign: "center" }}>
          <Image
            src={item.bannerImage}
            alt={item.name}
            layout="responsive"
            width={100}
            height={100}
            priority
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
            <Typography component="p" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' }, color: '#214ECE' }}>Reunite and Reconnect!</Typography>
            <Typography component="h3" sx={{ fontWeight: 'bolder', fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}>Welcome Back
              to School!</Typography>
            <Typography component="p">The moment we’ve been eagerly awaiting has arrived - welcome back to school! it’s time to rekindle the spirit of curiosity, embrace new challenges, and embark on a fresh academic adventure.</Typography>
            <Box sx={{
              display: { xs: 'block', sm: 'flex', md: 'flex' },
              flexWrap: 'wrap',
              gap: 5,
              justifyContent: 'center',
              width: 'auto'
            }}>
              <Button sx={{ marginRight: '2rem', background: '#659AC9', color: '#fff', flex: 2, height: '3.75rem', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', }}>
                About Us <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
          <Box sx={{
            flex: { xs: 'none', sm: 'none', md: 'none', lg: 'none' }, width: { xs: '20.5625rem', sm: '25.5625rem', md: '30.5625rem', lg: '36.5625rem' }, minHeight: { xs: '19.875rem', sm: '29.875rem', md: '39.875rem', lg: '49.875rem' }
          }}>
            <Image src="/images/c.jpeg"
              width={100}
              height={100}
              layout="responsive"
              alt="staff"
              className={styles.image}
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

          <Box textAlign="center" sx={{ color: '#fff', padding: '2rem 0', width: { xs: '100%', sm: '80%', md: '50%' }, margin: 'auto' }}>
            <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' } }}>Explore What We Offer</Typography>
            <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontWeight: 'bolder' }}>Nurturing Precious
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
            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#FFE9E4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <Image src="/images/extracurricular 1.png"
                width={150}
                height={150}
                alt="light"
                style={{}}
              />
              <Typography component="p" sx={{ color: '#FE5D37', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', width: '80%' }}>Extracurricular
                Activities</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#AE8479' }}>Enriching Extracurricular
                Adventures</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#EDEAFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <Image src="/images/Rectangle 1135.png"
                width={150}
                height={150}
                alt="light"
                style={{}}
              />
              <Typography component="p" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', color: '#786ACF', width: '80%' }}>E-learning</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#8883A5' }}>Cutting -Edge E-Learning
                Opportunities</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#FFF3D8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <Image src="/images/requirements 1.png"
                width={150}
                height={150}
                alt="light"
                style={{}}
              />
              <Typography component="p" sx={{ color: '#FEC624', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', width: '80%' }}>Character
                Development</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#A08E66' }}>Holistic Character
                Development</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', width: '25rem', height: '35rem', borderRadius: '3rem', bgcolor: '#DEFDFA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
              <Image src="/images/dictionary 1.png"
                width={150}
                height={150}
                alt="light"
                style={{}}
              />
              <Typography component="p" sx={{ color: '#5BD7CA', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontWeight: 'bolder', width: '60%' }}>Up to Date
                Syllabus</Typography>
              <Typography component="p" sx={{ fontSize: '1.2rem', color: '#6DA39E' }}>Modern Syllabus
                Mastery</Typography>
            </Box>
          </Box>

          <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: { xs: '90%', sm: '50%', md: '30%' }, borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
            Learn More about Computer Engineering  School <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#fdf9ff', padding: '3rem 0' }}>
        <Typography component="h2" textAlign="center" sx={{ fontSize: '2rem', color: '#FF2600' }}>DISCOVER COMPUTER ENGINEERING DEPARTMENT</Typography>
        <Typography component="p" textAlign="center">Learn more about us, our mission, Vision ane core values.</Typography>
        <Box sx={{
          width: '80%', margin: 'auto', display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center'
        }}>

          <Box textAlign="center" sx={{ width: '374px', minHeight: '30rem', bgcolor: '#fff', borderBottom: '5px solid #FF2600', padding: '2rem' }}>
            <Box sx={{ width: '100%', height: '15rem', borderRadius: '5px 5px 50px 5px', bgcolor: '#D9D9D9' }}>

            </Box>
            <Typography component="h3" sx={{ fontSize: '38px', color: '#FF2600' }}>Get to know us</Typography>
            <Typography component="p">To provide a world class learning opportunities where no child is left out or behind.</Typography>
            <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: '70%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>

          <Box textAlign="center" sx={{ width: '374px', minHeight: '30rem', bgcolor: '#fff', borderBottom: '5px solid #FF2600', padding: '2rem' }}>
            <Box sx={{ width: '100%', height: '15rem', borderRadius: '5px 5px 50px 5px', bgcolor: '#D9D9D9' }}>

            </Box>
            <Typography component="h3" sx={{ fontSize: '38px', color: '#FF2600' }}>Get to know us</Typography>
            <Typography component="p">To provide a world class learning opportunities where no child is left out or behind.</Typography>
            <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: '70%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>

          <Box textAlign="center" sx={{ width: '374px', minHeight: '30rem', bgcolor: '#fff', borderBottom: '5px solid #FF2600', padding: '2rem' }}>
            <Box sx={{ width: '100%', height: '15rem', borderRadius: '5px 5px 50px 5px', bgcolor: '#D9D9D9' }}>

            </Box>
            <Typography component="h3" sx={{ fontSize: '38px', color: '#FF2600' }}>Get to know us</Typography>
            <Typography component="p">To provide a world class learning opportunities where no child is left out or behind.</Typography>
            <Button color="inherit" sx={{ background: '#659AC9', color: '#fff', margin: 'auto', marginTop: '3rem', width: '70%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>

        </Box>
      </Box>

      <Box sx={{ bgcolor: '#0C123A', width: '100%', minHeight: '50vh' }}>
        <Box sx={{
          width: { xs: '100%', sm: '90%', md: '80%' }, minHeight: '100vh', margin: 'auto', display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center', alignItems: 'center', padding: '2rem 0'
        }}>
          <Box sx={{ flex: { xs: 'none', sm: 'none', md: 1 }, width: { xs: '100%', sm: '80%', md: '50%' }, minHeight: { xs: '100%', sm: '80%', md: '50%' }, }}>
            <Image
              src="/images/EqKzFK3WMAE9aUm.jpg"
              alt="star"
              layout="responsive"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
            />

          </Box>
          <Box sx={{ flex: { xs: 'none', sm: 'none', md: 1 }, width: { xs: '100%', sm: '80%', md: '50%' }, }}>
            <Typography component="p" sx={{ color: '#FF2600', fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' } }}>Celebrating Excellence</Typography>
            <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, color: '#fff' }}>Meet the  Stars</Typography>
            <Typography component="p" sx={{ color: '#fff' }}>Computer Engineering  take pride in EXCELLENCE, student who have excelled remarkably in external and international examinations. With a rigorous academic curriculum, dedicated staff, and a supportive learning environment, our students achieve extraordinary success, setting new benchmarks for excellence and making us proud as a leading educational institution.</Typography>
            <Button sx={{ background: '#659AC9', color: '#fff', marginTop: '3rem', width: '50%', borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
              Learn More <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      <News />

      <Box sx={{ bgcolor: '#f1f5ff' }}>
        <Box sx={{ width: { xs: '100%', sm: '90%', md: '80%' }, minHeight: '100vh', margin: 'auto', padding: { xs: '.9rem', sm: '1rem', md: '2rem' } }}>
          <Box sx={{ margin: '2rem 0', paddingLeft: '1rem', borderLeft: '5px solid #FF2600' }}>
            <Typography component="h2" sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' }, color: '#FF2600', lineHeight: '3rem' }}>Meet The Management</Typography>
          </Box>

          <Box sx={{
            minWidth: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            margin: 'auto',
          }}>
            <Box sx={{ position: 'relative' }}>
              <Image
                src="/images/a.jpg"
                alt="light"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Image
                src="/images/b.jpeg"
                alt="light"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Image
                src="/images/c.jpeg"
                alt="light"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Image
                src="/images/a.jpg"
                alt="light"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Image
                src="/images/b.jpeg"
                alt="light"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  MANAGEMENT TEAM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Image
                src="/images/c.jpeg"
                alt="light"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: '1.5rem',
                    textAlign: 'center',
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
          <Typography component="p" sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '2rem' } }}>TESTIMONIALS</Typography>
          <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' } }}>Hear what <span style={{ color: '#FF2600' }}>ALUMNI
          </span></Typography>
          <Typography component="p" sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' } }}>have to say about Computer Engineering  Schools</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}>


          <Box sx={{ borderRadius: '1rem', padding: '1rem', textAlign: 'center', width: '390px', height: '30rem', boxShadow: '2px 4px 10px 0px #0000001A', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <Typography component="p" sx={{ color: '#3A3E47' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitrices. Suspendisse bibendum ultrices enim, quis blandit quam sollicitudin nec. Ut posuere porta enim, id Praesent in metus sed ipsum vestibulum rutrum. Donec ac lacus ac libero mattis p</Typography>
            <Typography component="p" sx={{ color: '#3A3E47', fontSize: '1.5rem', fnotWeight: 'bolder', borderTop: '1px solid var(--Lemon, #88C90D)' }}>LOREM IPSUM</Typography>
            <Typography component="p" sx={{ mt: '5rem' }}>Parent</Typography>
          </Box>

          <Box sx={{ borderRadius: '1rem', padding: '1rem', textAlign: 'center', width: '390px', height: '30rem', boxShadow: '2px 4px 10px 0px #0000001A', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <Typography component="p" sx={{ color: '#3A3E47' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitrices. Suspendisse bibendum ultrices enim, quis blandit quam sollicitudin nec. Ut posuere porta enim, id Praesent in metus sed ipsum vestibulum rutrum. Donec ac lacus ac libero mattis p</Typography>
            <Typography component="p" sx={{ color: '#3A3E47', fontSize: '1.5rem', fnotWeight: 'bolder', borderTop: '1px solid var(--Lemon, #88C90D)' }}>LOREM IPSUM</Typography>
            <Typography component="p" sx={{ mt: '5rem' }}>Parent</Typography>
          </Box>

          <Box sx={{ borderRadius: '1rem', padding: '1rem', textAlign: 'center', width: '390px', height: '30rem', boxShadow: '2px 4px 10px 0px #0000001A', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <Typography component="p" sx={{ color: '#3A3E47' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elitrices. Suspendisse bibendum ultrices enim, quis blandit quam sollicitudin nec. Ut posuere porta enim, id Praesent in metus sed ipsum vestibulum rutrum. Donec ac lacus ac libero mattis p</Typography>
            <Typography component="p" sx={{ color: '#3A3E47', fontSize: '1.5rem', fnotWeight: 'bolder', borderTop: '1px solid var(--Lemon, #88C90D)' }}>LOREM IPSUM</Typography>
            <Typography component="p" sx={{ mt: '5rem' }}>Parent</Typography>
          </Box>

        </Box>
        <Button sx={{ background: '#659AC9', color: '#fff', marginTop: '3rem', width: { xs: '80%', sm: '50%', md: '20%' }, borderRadius: '30px', border: '1px solid #0C123A', display: 'flex', flexDirection: 'row', gap: '1rem', height: '3.75rem' }}>
          Learn More <ArrowForwardIcon />
        </Button>

      </Box>





    </>
  );
};

export default Home;
