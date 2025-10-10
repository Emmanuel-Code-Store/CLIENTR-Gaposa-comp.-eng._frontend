"use client"

import { useState } from "react"
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemButton,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  TextField,
  Grid,
  Stack,
} from "@mui/material"
import {
  Search as SearchIcon,
  Add,
  FilterList,
  Phone,
  VideoCall,
  Info,
  Edit,
  Help,
  AttachFile,
  EmojiEmotions,
  Send,
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

const messages = [
  {
    id: 1,
    name: "Dr. Lila Ramirez",
    time: "9:00 AM",
    message: "Please ensure the monthly attendance report is accurate before the April 30th deadline",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: false,
  },
  {
    id: 2,
    name: "Ms. Heather Morris",
    time: "10:15 AM",
    message: "Don&apos;t forget the staff training on digital tools scheduled for May 5th at 3 PM in the...",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    id: 3,
    name: "Staff Coordination",
    time: "2:00 PM",
    message: "Ms. Patel: All staff performance reviews are due by the end of this month. Please submit your report...",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
    isGroup: true,
  },
  {
    id: 4,
    name: "Officer Dan Brooks",
    time: "3:10 PM",
    message: "Review the updated security protocols effective May 1st. Familiarize yourself with...",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    id: 5,
    name: "Ms. Tina Goldberg",
    time: "5:00 PM",
    message: "Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    id: 6,
    name: "Mr. Roberto Gracias",
    time: "7:00 PM",
    message: "Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    id: 7,
    name: "Mr. Reed",
    time: "9:00 PM",
    message: "Science Club meeting today at lunch in lab room 204. We&apos;ll be planning for the Science Fair.",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: false,
  },
  {
    id: 8,
    name: "Nurse Emily",
    time: "7:00 PM",
    message: "Flu vaccinations are available next week. Please bring your consent forms signed...",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
]

const chatMessages = [
  {
    id: 1,
    sender: "Mr. Franklin",
    role: "School Secretary",
    time: "8:00 AM",
    message:
      "Good morning, everyone! Please remember to update your calendars. The school board meeting has been rescheduled to April 27th at 10 AM.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    sender: "Mrs. Thompson",
    role: "Vice Principal",
    time: "8:05 AM",
    message:
      "Thanks for the heads-up, Ms. Franklin. I&apos;ll make sure the agenda items from each department are ready by next Monday. Can someone confirm it next Monday with Mr. Reed?",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    sender: "Mr. Harris",
    role: "Health Services Coordinator",
    time: "8:10 AM",
    message:
      "Can someone confirm if the nurse&apos;s office will receive additional flu vaccines before the health fair next week?",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    sender: "Linda Adora",
    role: "Admin",
    time: "8:15 AM",
    message:
      "Maintenance update: The gym&apos;s air conditioning system will be repaired this Wednesday. Gym classes need to be relocated for the day.",
    avatar: "/placeholder.svg?height=32&width=32",
    isCurrentUser: true,
  },
  {
    id: 5,
    sender: "Ms. Patel",
    role: "HR Manager",
    time: "8:20 AM",
    message:
      "All staff performance reviews are due by the end of this month. Please submit your reports to HR as soon as possible. Thank you.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const groupMembers = [
  { name: "Mr. Franklin", role: "School Secretary", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Mrs. Thompson", role: "Vice Principal", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Mr. Harris", role: "Health Services Coordinator", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Linda Adora", role: "Admin", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Ms. Patel", role: "HR Manager", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function Chats() {
  const [selectedMessage, setSelectedMessage] = useState(3)
  const [newMessage, setNewMessage] = useState("")

  return (
     <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB"}}>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          display: "flex",
          height: "100%",
        }}
      >
        {/* Messages List */}
        <Box sx={{ width: 400, borderRight: "1px solid #e0e0e0", display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Search sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, flexGrow: 1 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search" inputProps={{ "aria-label": "search" }} />
              </Search>
              <IconButton>
                <FilterList />
              </IconButton>
              <IconButton
                sx={{ backgroundColor: "#2196f3", color: "white", "&:hover": { backgroundColor: "#1976d2" } }}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>

          <List sx={{ flexGrow: 1, overflow: "auto", p: 0 }}>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                disablePadding
                sx={{
                  borderBottom: "1px solid #f0f0f0",
                  backgroundColor: selectedMessage === message.id ? "#f5f5f5" : "transparent",
                }}
              >
                <ListItemButton onClick={() => setSelectedMessage(message.id)} sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, width: "100%" }}>
                    <Badge
                      badgeContent={message.isGroup ? "👥" : ""}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "transparent",
                          fontSize: "12px",
                        },
                      }}
                    >
                      <Avatar src={message.avatar} sx={{ width: 40, height: 40 }} />
                    </Badge>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                        <Typography variant="subtitle2" fontWeight="bold" noWrap>
                          {message.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {message.time}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {message.message}
                      </Typography>
                      {message.unread && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              backgroundColor: "#2196f3",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0", backgroundColor: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src="/placeholder.svg?height=40&width=40" />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Staff Coordination
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click here to see group members
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton>
                  <VideoCall />
                </IconButton>
                <IconButton>
                  <Phone />
                </IconButton>
                <IconButton>
                  <Info />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Chat Messages */}
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, backgroundColor: "#fafafa" }}>
            <Stack spacing={3}>
              {chatMessages.map((msg) => (
                <Box key={msg.id}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Avatar src={msg.avatar} sx={{ width: 32, height: 32 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary">
                          {msg.sender}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {msg.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {msg.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                        {msg.message}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, backgroundColor: "white", borderTop: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your message"
                variant="outlined"
                size="small"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <EmojiEmotions />
              </IconButton>
              <IconButton color="primary">
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Group Info Sidebar */}
        <Box sx={{ width: 300, borderLeft: "1px solid #e0e0e0",  maxHeight:"100vh", overflowY: "auto" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Group Info
              </Typography>
              <Box>
                <IconButton size="small">
                  <Edit />
                </IconButton>
                <IconButton size="small">
                  <Help />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 1,
                  background: "linear-gradient(135deg, #ff9800 0%, #f44336 100%)",
                }}
              >
                👥
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                Staff Coordination
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Group • {groupMembers.length} members
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>Description</strong>
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5, mb: 3 }}>
              This is your go-to hub for seamless communication, collaboration, and coordination among our team members.
              Whether you&apos;re working on a project, seeking assistance, or just want to connect with your colleagues,
              this chat has got you covered.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                Members
              </Typography>
              <Typography variant="caption" color="primary" sx={{ cursor: "pointer" }}>
                View All
              </Typography>
            </Box>

            <Stack spacing={2}>
              {groupMembers.map((member, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={member.avatar} sx={{ width: 32, height: 32 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Attachment
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Media • 34
                </Typography>
                <Typography variant="caption" color="primary" sx={{ cursor: "pointer" }}>
                  Files • 12
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid item xs={4} key={item}>
                    <Box
                      sx={{
                        aspectRatio: "1",
                        backgroundColor: "#f5f5f5",
                        borderRadius: 1,
                        backgroundImage: `url(/placeholder.svg?height=60&width=60)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
