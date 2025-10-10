"use client"

import { Box, Typography, Paper, TextField, List, ListItem, Grid, styled } from "@mui/material"
import { ChevronRight } from "lucide-react"

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.spacing(1),
}))

const TopicList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  "& .MuiListItem-root": {
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    "&:last-child": {
      marginBottom: 0,
    },
  },
}))

const EditorArea = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.spacing(1),
  minHeight: 600,
  marginTop: theme.spacing(2),
}))

// Mock data
const topics = ["SCHEME OF WORK", ...Array(12).fill("SPEECH OF WORK")]


export default function ENote() {
  
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          E-Note
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          <span>Session 2019/2020</span>
          <ChevronRight size={16} />
          <span>First</span>
          <ChevronRight size={16} />
          <span>SS2</span>
          <ChevronRight size={16} />
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Section - Editor */}
        <Grid item xs={12} md={8}>
          <ContentPaper elevation={0}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                mb: 3,
              }}
            >
              E-NOTE FOR SSS 1 - FIRST TERM
              <br />
              ENGLISH LANGUAGE
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                NOTE
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="SCHEME OF WORK"
                sx={{
                  backgroundColor: "background.paper",
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                NOTE
              </Typography>
              <EditorArea />
            </Box>
          </ContentPaper>
        </Grid>

        {/* Right Section - Topics */}
        <Grid item xs={12} md={4}>
          <ContentPaper elevation={0}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                mb: 3,
              }}
            >
              TOPIC
            </Typography>
            <TopicList>
              {topics.map((topic, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: "background.paper",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Typography variant="body2">{topic}</Typography>
                </ListItem>
              ))}
            </TopicList>
          </ContentPaper>
        </Grid>
      </Grid>
    </Box>
  )
}

