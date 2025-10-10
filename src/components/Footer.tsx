import React from "react";
import { Box, Typography } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const linksData = [
    {
        title: "Quick Links",
        items: [
            { label: "Our Facilities", href: "/#" },
            { label: "Testimonials", href: "/#" },
            { label: "Media Gallery", href: "/#" },
            { label: "Alumni", href: "/#" },
            { label: "Our Curriculum", href: "/#" },
        ]
    },
    {
        title: "Discover",
        items: [
            { label: `About ${process.env.NEXT_PUBLIC_SCHOOL_NAME}`, href: "/about" },
            { label: "Management", href: "/#" },
            { label: "Management Message", href: "/#" },
            { label: "High Flyers", href: "/#" },
            { label: "Election Home", href: "/election" },
            { label: "About Election", href: "/aboutelection" },
            { label: "Election Result", href: "/electionresult" },
        ]
    },
    {
        title: "Keep In Touch",
        items: [
            { label: "Contact Us", href: "/contact" },
            { label: "Newsletter", href: "/#" },
            { label: "Social Media Connect", href: "/#" }
        ]
    },
    {
        title: "Admissions",
        items: [
            { label: "Admission Adver", href: "/#" },
            { label: "Admission Process", href: "/#" }
        ]
    }
];

const Footer: React.FC = () => (
    <>
        <Box sx={{
            background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)',
            width: '100%',
            minHeight: '100vh',
            backgroundImage: 'url(/images/f48bb2c9708fa7bc83eb8305842d2dcd.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Box sx={{
                background: 'linear-gradient(270deg, rgba(12, 18, 58, 0.8) 45.91%, rgba(33, 78, 206, 0.8) 100%)',
                width: '100%',
                height: '100vh'
            }}>
            </Box>
        </Box>

        <Box sx={{
            bgcolor: '#0C123A',
            width: '100%',
            minHeight: '50vh',
            paddingTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    src="/images/logo.png"
                    alt={`${process.env.NEXT_PUBLIC_SCHOOL_NAME} Logo`}
                    width={150}
                    height={150}
                    style={{ objectFit: "scale-down", borderRadius: '100%' }}
                    data-aos="zoom-in"
                    data-aos-duration="1000"
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
                            <ul key={index}
                                data-aos="zoom-in"
                                data-aos-duration="1500"
                            >
                                <Typography
                                    component="li"
                                    sx={{
                                        fontWeight: 'bolder',
                                        fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' }
                                    }}
                                >
                                    {category.title}
                                </Typography>
                                {category.items.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Link href={item.href} passHref>
                                            <Typography
                                                component="a"
                                                sx={{
                                                    fontSize: { xs: '.9rem', sm: '1rem', md: '1.5rem' },
                                                    fontFamily: 'Raleway, sans-serif',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                        color: '#ccc'
                                                    }
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Link>
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
                        alt="Copyright"
                        width={20}
                        height={20}
                        style={{ objectFit: "scale-down" }}
                    />
                    <Typography
                        component="p"
                        sx={{
                            fontSize: { xs: ".8rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: { xs: "1rem", sm: "2rem", md: "3rem" },
                            color: "#fff",
                        }}
                    >
                        {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SCHOOL_NAME} All rights reserved.
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
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Facebook color="#fff" />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter color="#fff" />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram color="#fff" />
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin color="#fff" />
                            </a>
                        </li>
                        <li>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <Youtube color="#fff" />
                            </a>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Box>
    </>
);

export default Footer;
