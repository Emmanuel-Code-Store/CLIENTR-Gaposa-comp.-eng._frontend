'use client'

import type React from "react"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  Avatar,
  Badge,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Slider,
  Tab,
  Tabs,
} from "@mui/material"
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  ScreenShare,
  StopScreenShare,
  CallEnd,
  Chat,
  People,
  Settings,
  MoreVert,
  Send,
  EmojiEmotions,
  AttachFile,
  Fullscreen,
  FullscreenExit,
  VolumeUp,
  VolumeOff,
} from "@mui/icons-material"

interface Message {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  type: "text" | "system"
}

interface Participant {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  isMuted: boolean
  isCameraOn: boolean
  isScreenSharing: boolean
}

export default function VideoCallChat() {
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Hey everyone! Ready for the meeting?",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      user: "System",
      avatar: "",
      message: "Sarah Johnson joined the call",
      timestamp: new Date(Date.now() - 240000),
      type: "system",
    },
    {
      id: "3",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Yes! Let me share my screen in a moment.",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
    {
      id: "4",
      user: "Mike Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Perfect timing! I have the latest updates ready.",
      timestamp: new Date(Date.now() - 120000),
      type: "text",
    },
  ])

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isMuted: !isMicOn,
      isCameraOn: isCameraOn,
      isScreenSharing: false,
    },
    {
      id: "2",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isMuted: false,
      isCameraOn: true,
      isScreenSharing: false,
    },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isMuted: true,
      isCameraOn: true,
      isScreenSharing: isScreenSharing,
    },
    {
      id: "4",
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isMuted: false,
      isCameraOn: false,
      isScreenSharing: false,
    },
  ])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        message: chatMessage,
        timestamp: new Date(),
        type: "text",
      }
      setMessages([...messages, newMessage])
      setChatMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn)
    setParticipants((prev) => prev.map((p) => (p.id === "1" ? { ...p, isCameraOn: !isCameraOn } : p)))
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
    setParticipants((prev) => prev.map((p) => (p.id === "1" ? { ...p, isMuted: isMicOn } : p)))
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    setParticipants((prev) => prev.map((p) => (p.id === "3" ? { ...p, isScreenSharing: !isScreenSharing } : p)))
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#1a1a1a" }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "#2d2d2d" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Team Meeting - Project Review
          </Typography>
          <Chip label="Recording" color="error" size="small" sx={{ mr: 2 }} />
          <Typography variant="body2" sx={{ color: "white", mr: 2 }}>
            45:23
          </Typography>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>Copy meeting link</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Meeting info</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Report issue</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Video Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Main Video */}
          <Box sx={{ flex: 1, position: "relative", bgcolor: "#000" }}>
            {isScreenSharing ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#1e3a8a",
                  backgroundImage:
                    "linear-gradient(45deg, #1e3a8a 25%, #3b82f6 25%, #3b82f6 50%, #1e3a8a 50%, #1e3a8a 75%, #3b82f6 75%)",
                  backgroundSize: "20px 20px",
                }}
              >
                <Typography variant="h4" color="white">
                  Sarah&apos;s Screen Share
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/placeholder.svg?height=600&width=800&query=video-call-main)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "rgba(0,0,0,0.7)",
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                  }}
                >
                  <Avatar src="/placeholder.svg?height=32&width=32" sx={{ width: 32, height: 32, mr: 1 }} />
                  <Typography variant="body2" color="white">
                    Sarah Johnson
                  </Typography>
                  {participants.find((p) => p.name === "Sarah Johnson")?.isMuted && (
                    <MicOff sx={{ ml: 1, fontSize: 16, color: "red" }} />
                  )}
                </Box>
              </Box>
            )}

            {/* Fullscreen Toggle */}
            <IconButton
              sx={{ position: "absolute", top: 16, right: 16, bgcolor: "rgba(0,0,0,0.5)" }}
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <FullscreenExit sx={{ color: "white" }} /> : <Fullscreen sx={{ color: "white" }} />}
            </IconButton>
          </Box>

          {/* Participant Videos Grid */}
          <Box sx={{ height: 120, display: "flex", gap: 1, p: 1, bgcolor: "#2d2d2d" }}>
            {participants.map((participant) => (
              <Paper
                key={participant.id}
                sx={{
                  minWidth: 160,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: participant.isCameraOn ? "transparent" : "#424242",
                }}
              >
                {participant.isCameraOn ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${participant.avatar})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar src={participant.avatar} sx={{ width: 40, height: 40, mb: 1 }} />
                  </Box>
                )}

                {/* Participant Info Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.7)",
                    p: 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" color="white" noWrap>
                    {participant.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {participant.isMuted && <MicOff sx={{ fontSize: 12, color: "red" }} />}
                    {participant.isScreenSharing && <ScreenShare sx={{ fontSize: 12, color: "green" }} />}
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Control Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              p: 2,
              bgcolor: "#2d2d2d",
            }}
          >
            <IconButton
              onClick={toggleMic}
              sx={{
                bgcolor: isMicOn ? "rgba(255,255,255,0.1)" : "red",
                "&:hover": { bgcolor: isMicOn ? "rgba(255,255,255,0.2)" : "darkred" },
              }}
            >
              {isMicOn ? <Mic sx={{ color: "white" }} /> : <MicOff sx={{ color: "white" }} />}
            </IconButton>

            <IconButton
              onClick={toggleCamera}
              sx={{
                bgcolor: isCameraOn ? "rgba(255,255,255,0.1)" : "red",
                "&:hover": { bgcolor: isCameraOn ? "rgba(255,255,255,0.2)" : "darkred" },
              }}
            >
              {isCameraOn ? <Videocam sx={{ color: "white" }} /> : <VideocamOff sx={{ color: "white" }} />}
            </IconButton>

            <IconButton
              onClick={toggleScreenShare}
              sx={{
                bgcolor: isScreenSharing ? "green" : "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: isScreenSharing ? "darkgreen" : "rgba(255,255,255,0.2)" },
              }}
            >
              {isScreenSharing ? <StopScreenShare sx={{ color: "white" }} /> : <ScreenShare sx={{ color: "white" }} />}
            </IconButton>

            <IconButton
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              {isSpeakerOn ? <VolumeUp sx={{ color: "white" }} /> : <VolumeOff sx={{ color: "white" }} />}
            </IconButton>

            <Button variant="contained" color="error" startIcon={<CallEnd />} sx={{ mx: 2 }}>
              End Call
            </Button>

            <IconButton
              onClick={() => setIsChatOpen(!isChatOpen)}
              sx={{
                bgcolor: isChatOpen ? "primary.main" : "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: isChatOpen ? "primary.dark" : "rgba(255,255,255,0.2)" },
              }}
            >
              <Chat sx={{ color: "white" }} />
            </IconButton>

            <IconButton
              onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
              sx={{
                bgcolor: isParticipantsOpen ? "primary.main" : "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: isParticipantsOpen ? "primary.dark" : "rgba(255,255,255,0.2)" },
              }}
            >
              <People sx={{ color: "white" }} />
            </IconButton>

            <IconButton
              onClick={() => setIsSettingsOpen(true)}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <Settings sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Chat Sidebar */}
        <Drawer
          anchor="right"
          variant="persistent"
          open={isChatOpen}
          sx={{
            width: 350,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 350,
              position: "relative",
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Chat" />
                <Tab label="Notes" />
              </Tabs>
            </Box>

            {activeTab === 0 && (
              <>
                {/* Messages */}
                <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
                  {messages.map((message) => (
                    <Box key={message.id} sx={{ mb: 2 }}>
                      {message.type === "system" ? (
                        <Box sx={{ textAlign: "center", py: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {message.message}
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Avatar src={message.avatar} sx={{ width: 32, height: 32 }} />
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Typography variant="subtitle2" color="text.primary">
                                {message.user}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatTime(message.timestamp)}
                              </Typography>
                            </Box>
                            <Paper sx={{ p: 1.5, bgcolor: "white" }}>
                              <Typography variant="body2">{message.message}</Typography>
                            </Paper>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="primary" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      <Send />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton size="small">
                      <EmojiEmotions />
                    </IconButton>
                    <IconButton size="small">
                      <AttachFile />
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}

            {activeTab === 1 && (
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  placeholder="Take notes during the meeting..."
                  variant="outlined"
                />
              </Box>
            )}
          </Box>
        </Drawer>

        {/* Participants Sidebar */}
        <Drawer
          anchor="right"
          open={isParticipantsOpen}
          onClose={() => setIsParticipantsOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 300,
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Participants ({participants.length})
            </Typography>
            <List>
              {participants.map((participant) => (
                <ListItem key={participant.id}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: participant.isOnline ? "green" : "grey",
                            border: "2px solid white",
                          }}
                        />
                      }
                    >
                      <Avatar src={participant.avatar} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={participant.name}
                    secondary={
                      <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                        {participant.isMuted && <Chip label="Muted" size="small" color="error" />}
                        {!participant.isCameraOn && <Chip label="Camera Off" size="small" color="warning" />}
                        {participant.isScreenSharing && <Chip label="Sharing" size="small" color="success" />}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Audio
            </Typography>
            <FormControlLabel control={<Switch checked={isMicOn} onChange={toggleMic} />} label="Microphone" />
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Microphone Volume</Typography>
              <Slider defaultValue={80} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Speaker Volume</Typography>
              <Slider defaultValue={90} />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Video
            </Typography>
            <FormControlLabel control={<Switch checked={isCameraOn} onChange={toggleCamera} />} label="Camera" />
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Video Quality</Typography>
              <Button variant="outlined" fullWidth>
                HD (720p)
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              General
            </Typography>
            <FormControlLabel control={<Switch defaultChecked />} label="Show participant names" />
            <FormControlLabel control={<Switch defaultChecked />} label="Enable chat notifications" />
            <FormControlLabel control={<Switch />} label="Auto-record meetings" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsSettingsOpen(false)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}