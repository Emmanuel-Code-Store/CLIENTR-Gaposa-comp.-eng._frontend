"use client"

import { Box, Typography, Paper, List, ListItem, Button, styled } from "@mui/material"
import { ChevronRight } from "lucide-react"

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  width: "100%",
  maxWidth: 600,
}))

const TopicList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  "& .MuiListItem-root": {
    padding: theme.spacing(1.5, 2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    cursor: "pointer",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
}))

// Mock data
const topics = ["SCHEME OF WORK", ...Array(12).fill("SPEECH OF WORK")]

export default function StaffLessonNote() {
  
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
      <ContentPaper elevation={0}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          English Language
        </Typography>

        <TopicList>
          {topics.map((topic, index) => (
            <ListItem
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Typography variant="body2">{topic}</Typography>
            </ListItem>
          ))}
        </TopicList>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0D0F29",
              "&:hover": {
                bgcolor: "#1a1d4d",
              },
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "divider",
              color: "text.primary",
              "&:hover": {
                borderColor: "text.primary",
                backgroundColor: "action.hover",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </ContentPaper>
    </Box>
  )
}

