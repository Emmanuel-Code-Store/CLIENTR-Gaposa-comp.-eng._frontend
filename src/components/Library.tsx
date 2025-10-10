"use client"

import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Pagination,
  Fab,
  Badge,
  Container,
  Card,
} from "@mui/material"
import {
  Search,
  Add,
  NotificationsOutlined,
} from "@mui/icons-material"

const booksData = [
  {
    id: "2024-LIT-001-01",
    name: "Great Expectations",
    writer: "Charles Dickens",
    subject: "English Literature",
    classes: "Class 12",
    publishDate: "1861",
    status: "Available",
    color: "#e53e3e",
  },
  {
    id: "2024-SCI-002-01",
    name: "Brief History of Time",
    writer: "Stephen Hawking",
    subject: "Science",
    classes: "Class 10-12",
    publishDate: "1988",
    status: "Checked Out",
    color: "#3182ce",
  },
  {
    id: "2024-HIS-003-01",
    name: "A People's History of the United States",
    writer: "Howard Zinn",
    subject: "History",
    classes: "Class 11-12",
    publishDate: "1980",
    status: "Available",
    color: "#dd6b20",
  },
  {
    id: "2024-MATH-004-01",
    name: "Calculus Made Easy",
    writer: "Silvanus P. Thompson",
    subject: "Mathematics",
    classes: "Class 12",
    publishDate: "1910",
    status: "Available",
    color: "#38a169",
  },
  {
    id: "2024-BIO-005-01",
    name: "The Selfish Gene",
    writer: "Richard Dawkins",
    subject: "Biology",
    classes: "Class 11",
    publishDate: "1976",
    status: "Checked Out",
    color: "#2d3748",
  },
  {
    id: "2024-ART-006-01",
    name: "The Story of Art",
    writer: "E.H. Gombrich",
    subject: "Art History",
    classes: "Class 9-12",
    publishDate: "1950",
    status: "Available",
    color: "#38a169",
  },
  {
    id: "2024-CHE-007-01",
    name: "Organic Chemistry as a Second Language",
    writer: "David Klein",
    subject: "Chemistry",
    classes: "Class 11-12",
    publishDate: "2004",
    status: "Available",
    color: "#38a169",
  },
  {
    id: "2024-ENG-009-01",
    name: "Elements of Style",
    writer: "William Strunk Jr.",
    subject: "English Grammar",
    classes: "Class 9-12",
    publishDate: "1918",
    status: "Checked Out",
    color: "#e53e3e",
  },
  {
    id: "2024-PHY-008-01",
    name: "Fundamentals of Physics",
    writer: "David Halliday",
    subject: "Physics",
    classes: "Class 11-12",
    publishDate: "1960",
    status: "Available",
    color: "#d69e2e",
  },
  {
    id: "2024-PSY-010-01",
    name: "Thinking, Fast and Slow",
    writer: "Daniel Kahneman",
    subject: "Psychology",
    classes: "Class 12",
    publishDate: "2011",
    status: "Available",
    color: "#3182ce",
  },
]

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooks, setSelectedBooks] = useState<string[]>([])

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedBooks(booksData.map((book) => book.id))
    } else {
      setSelectedBooks([])
    }
  }

  const handleSelectBook = (bookId: string) => {
    setSelectedBooks((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "white",
            borderBottom: "1px solid #e2e8f0",
            color: "#1e293b",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <TextField
              placeholder="Search"
              size="small"
              sx={{
                width: 300,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8fafc",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#64748b" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsOutlined />
                </Badge>
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Linda Adora
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Admin
                  </Typography>
                </Box>
                <Avatar sx={{ width: 40, height: 40 }}>LA</Avatar>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Container maxWidth={false} sx={{ py: 3, px: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1e293b" }}>
              All Books
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                placeholder="Search by ID, Name or Subject"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: 300,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#64748b" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Fab size="small" sx={{ bgcolor: "#fbbf24", "&:hover": { bgcolor: "#f59e0b" } }}>
                <Add />
              </Fab>

              <Fab size="small" sx={{ bgcolor: "#fbbf24", "&:hover": { bgcolor: "#f59e0b" } }}>
                <Add />
              </Fab>
            </Box>
          </Box>

          <Card elevation={0} sx={{ border: "1px solid #e2e8f0" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8fafc" }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedBooks.length > 0 && selectedBooks.length < booksData.length}
                        checked={selectedBooks.length === booksData.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Book ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Book Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Writer</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Class(es)</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Publish Date</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {booksData.map((book) => (
                    <TableRow key={book.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedBooks.includes(book.id)}
                          onChange={() => handleSelectBook(book.id)}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#475569" }}>{book.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            variant="rounded"
                            sx={{
                              bgcolor: book.color,
                              width: 32,
                              height: 32,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {book.name.charAt(0)}
                          </Avatar>
                          <Typography sx={{ fontWeight: 500, color: "#1e293b" }}>{book.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "#475569" }}>{book.writer}</TableCell>
                      <TableCell sx={{ color: "#475569" }}>{book.subject}</TableCell>
                      <TableCell sx={{ color: "#475569" }}>{book.classes}</TableCell>
                      <TableCell sx={{ color: "#475569" }}>{book.publishDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={book.status}
                          size="small"
                          sx={{
                            bgcolor: book.status === "Available" ? "#dcfce7" : "#fee2e2",
                            color: book.status === "Available" ? "#16a34a" : "#dc2626",
                            fontWeight: 500,
                            border: "none",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Previous
            </Typography>

            <Pagination
              count={17}
              defaultPage={1}
              siblingCount={2}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#64748b",
                },
                "& .Mui-selected": {
                  bgcolor: "#0ea5e9 !important",
                  color: "white",
                },
              }}
            />

            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Next
            </Typography>
          </Box>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            mt: "auto",
            py: 2,
            px: 3,
            borderTop: "1px solid #e2e8f0",
            bgcolor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#64748b",
              fontSize: "0.875rem",
            }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                📧 emailaddress@mail.com
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                📞 +82 1234 5678
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Terms of Use
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Copyright © Peterdraw
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
