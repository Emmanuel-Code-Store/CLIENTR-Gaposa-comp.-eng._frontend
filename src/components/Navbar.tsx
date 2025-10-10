"use client"

import * as React from 'react';
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  Menu,
  MenuItem,
  Grid,
  Tooltip,
  Collapse
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useAOS } from "@/hooks/useAOS";

const iconSizes = {
  smallWidth: 20,
  mediumWidth: 30,
  largeWidth: 50,
  smallHeight: 20,
  mediumHeight: 30,
  largeHeight: 50,
}

const menuItems = [
  { title: "Admission", icon: "/images/f-i-3-1 2.svg" },
  { title: "News", icon: "/images/icons8-order-note-64.svg" },
  { title: "Event", icon: "/images/people_15131817.svg" },
  { title: "About Us", icon: "/images/group_921296.svg" },
  { title: "Gallery", icon: "/images/image_17105427.svg" },
  { title: "Contact Us", icon: "/images/contacting_17241594.svg" },
]


const Navbar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openDrawer, setOpenDrawer] = useState(false)
  const [portalAnchor, setPortalAnchor] = useState<null | HTMLElement>(null)
  const [dotsAnchor, setDotsAnchor] = useState<null | HTMLElement>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [openPortalDropdown, setOpenPortalDropdown] = useState(false);

  const router = useRouter()

  const handleNavigation = (section: string) => {
    if (section !== "Portal") {
      router.push(`/${section.toLowerCase()}`)
      setActiveSection(section)
    }
  }

  const handlePortalClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPortalAnchor(event.currentTarget)
  }

  const handlePortalClose = () => {
    setPortalAnchor(null)
  }

  const handleDotsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setDotsAnchor(event.currentTarget)
  }

  const handleDotsClose = () => {
    setDotsAnchor(null)
  }

  const handlePortalDropDownClick = () => {
    setOpenPortalDropdown(prev => !prev);
  };


  const sections = ["Home", "About", "Gallery", "News", "Event", "Portal", "Contact"]
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  useAOS({ once: false });

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>

      <Toolbar sx={{ backgroundColor: "#0C123A", }}>
        <Box sx={{
          display: 'flex', flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          }, gap: { xs: '1rem', sm: '1rem' }, flexGrow: 1, justifyContent: 'start', alignItems: 'center', minWidth: '100%'
        }}>
          <Box sx={{ padding: '1rem 0', display: 'flex', gap: '1rem', flexGrow: 1, justifyContent: 'start', alignItems: 'center', borderBottom: { xs: '1px solid #B8C6E4', md: 'none' }, minWidth: { xs: '100%', md: 'auto' }, }}>
            <Image src="/images/call.png"
              width={40}
              height={40}
              alt="call"
              style={{ width: '', height: '' }}
            />
            <Box>
              <p>Call Us</p>
              <p>+234 906 6929 845, +234 802 8704 43</p>
            </Box>
          </Box>
          <Box sx={{
            padding: '1rem 0', display: 'flex', gap: '1rem', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', borderLeft: { sm: 'none', md: '1px solid #B8C6E4' },
            borderBottom: { xs: '1px solid #B8C6E4', md: 'none' },
            paddingLeft: { xs: '0rem', md: '1rem' }, minWidth: { xs: '100%', md: 'auto' }
          }}>
            <Image src="/images/mail.png"
              width={40}
              height={40}
              alt="mail"
              style={{ width: '', height: '' }}
            />
            <Box>
              <p>Email</p>
              <p>info@tenderstepsschools.com.ng</p>
            </Box>
          </Box>
          <Box sx={{ padding: '1rem 0', display: 'flex', gap: '1rem', flexGrow: 1, justifyContent: 'start', alignItems: 'center', borderLeft: { sm: 'none', md: '1px solid #B8C6E4', }, minWidth: { xs: '100%', md: 'auto' }, paddingLeft: { xs: '0rem', md: '1rem' } }}>
            <Image src="/images/location.png"
              width={40}
              height={40}
              alt="location"
              style={{ width: '', height: '' }}
            />
            <Box>
              <p>Location</p>
              <p>14, Adegboyega, Ijoko, Ogun State, Nigeria</p>
            </Box>
          </Box>
        </Box>
      </Toolbar>

      <Toolbar
        sx={{
          display: { md: "flex" },
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          color: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "9.375rem",
            height: "9.375rem",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            layout="responsive"
            width={iconSizes.largeWidth}
            height={iconSizes.largeHeight}
            style={{ cursor: "pointer" }}
            priority
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            justifyContent: "center",
            fontWeight: "bold",
            gap: "2rem",
          }}
        >
          {sections.map((section) => (
            <Button
              key={section}
              color="inherit"
              onClick={section === "Portal" ? handlePortalClick : () => handleNavigation(section)}
              onMouseEnter={() => setHoveredSection(section)}
              onMouseLeave={() => setHoveredSection(null)}
              sx={{
                color: hoveredSection === section || activeSection === section ? "#659AC9" : "inherit",
                borderBottom:
                  hoveredSection === section || activeSection === section
                    ? "2px solid #659AC9"
                    : "2px solid transparent",
                borderRadius: 0,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              endIcon={section === "Portal" ? portalAnchor ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null}
            >
              {section}
            </Button>
          ))}
        </Box>

        <Menu
          anchorEl={portalAnchor}
          open={Boolean(portalAnchor)}
          onClose={handlePortalClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem
            onClick={() => {
              handlePortalClose()
              router.push("auth/admin-login")
            }}
          >
            <Box sx={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center", fontFamily: 'Raleway, sans-serif' }}>
              Admin
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handlePortalClose()
              router.push("auth/staff-login")
            }}
          >
            <Box sx={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center", fontFamily: 'Raleway, sans-serif' }}>
              Staff
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handlePortalClose()
              router.push("auth/student-login")
            }}
          >
            <Box sx={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center", fontFamily: 'Raleway, sans-serif' }}>
              Student
            </Box>
          </MenuItem>
        </Menu>

        <Box sx={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center" }}>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Search">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { xs: "2rem", md: "3rem" },
                    height: { xs: "2rem", md: "3rem" },
                  }}
                >
                  <Image
                    src="/images/search.png"
                    layout="responsive"
                    width={iconSizes.largeWidth}
                    height={iconSizes.largeHeight}
                    alt="search"
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Menu>
          </Box>

          <Box
            onClick={handleDotsClick}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "2rem", md: "3rem" },
              height: { xs: "2rem", md: "3rem" },
              cursor: "pointer",
            }}
          >
            <Image
              src="/images/dots.png"
              layout="responsive"
              width={iconSizes.largeWidth}
              height={iconSizes.largeHeight}
              alt="options"
            />
          </Box>

          <Menu
            anchorEl={dotsAnchor}
            open={Boolean(dotsAnchor)}
            onClose={handleDotsClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 0,
                m: 0,
                p: 0,
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
              }
            }}
          >
            <Box sx={{ p: 1, width: 300 }}>
              <Grid container spacing={2}>
                {menuItems.map((item) => (
                  <Grid item xs={4} key={item.title}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        "&:hover": {
                          color: "#659AC9",
                        },
                        fontFamily: 'Raleway, sans-serif'
                      }}
                      onClick={() => {
                        handleDotsClose();
                        router.push(`/${item.title.toLowerCase().replace(/\s/g, "").replace(/us/g, "")}`);
                      }}
                    >
                      <Box sx={{ width: 40, height: 40 }}>
                        <Image
                          src={item.icon || "/placeholder.svg"}
                          alt={item.title}
                          width={40}
                          height={40}
                          layout="responsive"
                        />
                      </Box>
                      <Typography variant="caption" align="center">
                        {item.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Menu>

          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpenDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "9.375rem",
              height: "9.375rem",
              marginLeft: '1rem'
            }}
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              layout="responsive"
              width={iconSizes.largeWidth}
              height={iconSizes.largeHeight}
              style={{ cursor: "pointer" }}
              priority
            />
          </Box>
          <List>
            {sections.map((section) => (
              <React.Fragment key={section}>
                <ListItem
                  key={section}
                  sx={{
                    color: activeSection === section ? "#659AC9" : "inherit",
                    borderBottom: activeSection === section ? "2px solid #659AC9" : "none",
                    cursor: "pointer",
                    fontFamily: 'Raleway, sans-serif'
                  }}
                  onClick={() => {
                    if (section === "Portal") {
                      handlePortalDropDownClick();
                    } else {
                      setActiveSection(section);
                      setOpenDrawer(false);
                    }
                  }}
                >
                  {section === "Portal" ? (
                    <Typography sx={{ fontFamily: 'Raleway, sans-serif' }}>{section}</Typography>
                  ) : (
                    <Link href={`/${section.toLowerCase()}`} passHref>
                      <Typography sx={{ fontFamily: 'Raleway, sans-serif' }}>{section}</Typography>
                    </Link>

                  )}
                  {section === "Portal" && (
                    openPortalDropdown ? (
                      <ExpandLessIcon sx={{ marginLeft: "auto", fontFamily: 'Raleway, sans-serif' }} />
                    ) : (
                      <ExpandMoreIcon sx={{ marginLeft: "auto", fontFamily: 'Raleway, sans-serif' }} />
                    )
                  )}
                </ListItem>


                {section === "Portal" && openPortalDropdown && (
                  <Collapse in={openPortalDropdown} timeout={5000} unmountOnExit>

                    <Box sx={{ paddingLeft: '1rem' }}>
                      <List>
                        <ListItem
                          sx={{ color: 'inherit', }}
                          onClick={() => {
                            setOpenDrawer(false);
                          }}
                        >
                          <Link href="/auth/admin-login" passHref>
                            <Typography
                              data-aos="zoom-in"
                              data-aos-duration="1000"
                              sx={{ fontFamily: 'Raleway, sans-serif' }}
                            >Admin</Typography>
                          </Link>
                        </ListItem>
                        <ListItem
                          sx={{ color: 'inherit' }}
                          onClick={() => {
                            setOpenDrawer(false);
                          }}
                        >
                          <Link href="/auth/staff-login" passHref>
                            <Typography
                              data-aos="zoom-in"
                              data-aos-duration="1300"
                              sx={{ fontFamily: 'Raleway, sans-serif' }}
                            >Staff</Typography>
                          </Link>
                        </ListItem>
                        <ListItem
                          sx={{ color: 'inherit' }}
                          onClick={() => {
                            setOpenDrawer(false);
                          }}
                        >
                          <Link href="/auth/student-login" passHref>
                            <Typography
                              data-aos="zoom-in"
                              data-aos-duration="1500"
                              sx={{ fontFamily: 'Raleway, sans-serif' }}
                            >Student</Typography>
                          </Link>
                        </ListItem>
                      </List>
                    </Box>
                  </Collapse>
                )}

              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Navbar;