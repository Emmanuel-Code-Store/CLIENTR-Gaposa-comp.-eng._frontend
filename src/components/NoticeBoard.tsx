"use client"

import { useState } from "react"
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  InputBase,
  Chip,
  Button,
  Grid,
  Container,
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import { styled, alpha } from "@mui/material/styles"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}))

const notices = [
  {
    id: 1,
    title: "Welcome Back to School!",
    author: "Principal Linda Carter",
    date: "August 1, 2024",
    views: "1.2K",
    content:
      "As we embark on another exciting academic year, let's embrace the opportunities that lie ahead. We're thrilled to welcome new faces and reunite with returning students. Don't miss our opening assembly on August 5th!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Fall Sports Tryouts Schedule",
    author: "Coach Michael Jordan",
    date: "August 15, 2024",
    views: "850",
    content:
      "Get ready to show your spirit and skills! Tryouts for soccer, volleyball, and football start next week. Check the gym bulletin board for exact dates and required gear. Go Eagles!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Library Hours Extension",
    author: "Librarian Sarah Knox",
    date: "September 5, 2024",
    views: "500",
    content:
      "Attention students! To support your exam preparation, the library will offer extended hours starting September 15th. Join us for additional study sessions and access thousands of resources!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Flu Vaccination Clinic",
    author: "Nurse Emily White",
    date: "October 10, 2024",
    views: "300",
    content:
      "Protect yourself this flu season! The school nurse's office will host a vaccination clinic on October 20th. Sign up in the main office. Vaccines are free and available to all students and staff.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "Annual Food Drive Kickoff",
    author: "Head of Student Council Tom Briggs",
    date: "November 1, 2024",
    views: "400",
    content:
      "Let's make a difference together! Our annual food drive starts November 5th. Please bring non-perishable food items to Room 108. Help us reach our goal to collect over 2,000 pounds of food for local food banks.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function NoticeBoard() {
  const [selectedNotice, setSelectedNotice] = useState(notices[0])

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Notice Board */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Notice Board
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Search sx={{ backgroundColor: "#f5f5f5", color: "black" }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search by Title or Author" inputProps={{ "aria-label": "search" }} />
                  </Search>
                  <IconButton sx={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                    <FilterIcon />
                  </IconButton>
                  <IconButton sx={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Notice Cards */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {notices.map((notice) => (
                  <Card
                    key={notice.id}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { boxShadow: 3 },
                      border: selectedNotice.id === notice.id ? "2px solid #2196f3" : "1px solid #e0e0e0",
                    }}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Avatar src={notice.avatar} sx={{ width: 48, height: 48 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                            {notice.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            By {notice.author}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {notice.content}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="caption" color="text.secondary">
                            {notice.date}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <ViewIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="caption">{notice.views}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Pagination */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                <Button startIcon={<ArrowBackIcon />} disabled>
                  Previous
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Page 1 of 12
                </Typography>
                <Button endIcon={<ArrowForwardIcon />}>Next</Button>
              </Box>
            </Grid>

            {/* Right Sidebar - Featured Notice */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/placeholder.svg?height=200&width=400"
                  alt="Welcome Back to School"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {selectedNotice.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    By {selectedNotice.author}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {selectedNotice.date}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ViewIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption">{selectedNotice.views}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedNotice.content}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Attention students! To support your exam preparation, the library will offer extended hours starting
                    September 15th. Join us for additional study sessions and access thousands of resources. Please
                    bring and collect over 2,000 pounds of food for local food banks.
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Tag
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip label="School" size="small" color="primary" variant="outlined" />
                    <Chip label="Academic" size="small" color="info" variant="outlined" />
                    <Chip label="Student" size="small" color="warning" variant="outlined" />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{ backgroundColor: "#2196f3" }}
                  >
                    Read Full Page
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #e0e0e0" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  📧 emailaddress@mail.com
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: { md: "right" } }}>
                <Typography variant="body2" color="text.secondary">
                  📞 +82 1234 5678
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Terms of Use • Privacy Policy • Copyright © Peterdraw
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
