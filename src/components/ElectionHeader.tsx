"use client"

import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import Link from "next/link"

const pages = [
  { label: "Home", href: "/election" },
  { label: "About", href: "/aboutelection" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contactelection" },
  { label: "Results", href: "/electionresult" },
  { label: "Login", href: "/auth/user-login" },
  { label: "Register", href: "/signup" },
]

const ElectionHeader = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "#1a237e" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/" passHref>
              <Image src="/images/logo.jpeg" alt="Logo" width={40} height={40} style={{ borderRadius: 8, cursor: "pointer" }} />
            </Link>
            <Link href="/" passHref legacyBehavior>
              <Typography variant="h6" sx={{ color: "#fff", textDecoration: "none", cursor: "pointer" }}>
                Gaposa Election
              </Typography>
            </Link>
          </Box>

          {/* Menu Items */}
          {isMobile ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#fff" }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleMenuClose}>
                    <Link href={page.href} passHref legacyBehavior>
                      <Typography textAlign="center">{page.label}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {pages.map((page) => (
                <Link key={page.label} href={page.href} passHref legacyBehavior>
                  <Button sx={{ color: "#fff", fontWeight: 600 }}>{page.label}</Button>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ElectionHeader
