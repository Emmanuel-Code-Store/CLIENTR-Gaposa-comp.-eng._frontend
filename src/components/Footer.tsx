import React from "react";
import { Box, Typography } from "@mui/material";
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const linksData = [
    {
        title: "Quick Links",
        items: [
            "Our Facilities",
            "Testimonials",
            "Media Gallery",
            "Alumni",
            "Our Curriculum"
        ]
    },
    {
        title: "Discover",
        items: [
            "About Computer Engineering",
            "Management",
            "Management Message",
            "High Flyers"
        ]
    },
    {
        title: "Keep In Touch",
        items: [
            "Contact Us",
            "Newsletter",
            "Social Media Connect"
        ]
    },
    {
        title: "Admissions",
        items: [
            "Admission Adver",
            "Admission Process"
        ]
    }
]

const Footer: React.FC = () => (
    <>
        <Box sx={{
            background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%',
            minHeight: '100vh',
            backgroundImage: 'url(/images/new-mech-hall-in-gaposa.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Box sx={{
                background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)', width: '100%', height: '100vh'
            }}>

            </Box>
        </Box>

        <Box sx={{
            bgcolor: '#0C123A', width: '100%', minHeight: '50vh', paddingTop: '1rem', display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '80%', height: '100%', display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    src="/images/logo.jpeg"
                    alt="light"
                    width={150}
                    height={150}
                    style={{ objectFit: "scale-down", borderRadius:'100%' }}
                />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}>
                    <Box sx={{
                        borderTop: '1px solid #FFFFFF80',
                        borderBottom: '1px solid #FFFFFF80',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',
                        padding: '20px',
                        flexWrap: 'wrap',
                        gap: '3rem'
                    }}>
                        {linksData.map((category, index) => (
                            <ul key={index}>
                                <Typography component="li" sx={{ fontWeight: 'bolder', fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' } }}>{category.title}</Typography>
                                {category.items.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Typography sx={{ fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' } }}>
                                            {item}
                                        </Typography>
                                        <ArrowForwardIcon sx={{
                                            fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                                            color: 'white',
                                            transform: 'rotate(-45deg)'
                                        }} />
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: '80%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 0'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        src="/images/emojione_copyright.png"
                        alt="light"
                        width={20}
                        height={20}
                        style={{ objectFit: "scale-down" }}
                    />
                    <Typography component="p" sx={{ fontSize: { xs: '.8rem', sm: '1rem', md: '1.5rem' }, lineHeight: { xs: '1rem', sm: '2rem', md: '3rem' }, color: '#fff' }}>
                        2025 Computer Engineering Department
                    </Typography>
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '80%', md: 'auto' } }}>
                    <ul style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <li>
                            <Image
                                src="/images/logos_facebook.png"
                                alt="light"
                                width={40}
                                height={40}
                                style={{ objectFit: "scale-down" }}
                            />
                        </li>
                        <li>
                            <Image
                                src="/images/logos_facebook.png"
                                alt="light"
                                width={40}
                                height={40}
                                style={{ objectFit: "scale-down" }}
                            />
                        </li>
                        <li>
                            <Image
                                src="/images/logos_facebook.png"
                                alt="light"
                                width={40}
                                height={40}
                                style={{ objectFit: "scale-down" }}
                            />
                        </li>
                        <li>
                            <Image
                                src="/images/logos_facebook.png"
                                alt="light"
                                width={40}
                                height={40}
                                style={{ objectFit: "scale-down" }}
                            />
                        </li>
                    </ul>
                </Box>
            </Box>
        </Box>
    </>
);

export default Footer;
