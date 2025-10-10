"use client"
import { useState } from "react"
import type React from "react"

import {
  Box,
  Typography,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Chip,
  Card,
  CardContent,
  Avatar,
} from "@mui/material"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  SportsScore as SportsIcon,
} from "@mui/icons-material"


interface DayEvent {
  id: number
  title: string
  color: string
}

interface CalendarDay {
  day: number
  isCurrentMonth: boolean
  events: DayEvent[]
}

interface AgendaEvent {
  id: number
  title: string
  time: string
  location: string
  icon: React.ReactNode
  color: string
}

const calendarData: CalendarDay[] = [
  { day: 28, isCurrentMonth: false, events: [] },
  { day: 29, isCurrentMonth: false, events: [] },
  { day: 30, isCurrentMonth: false, events: [] },
  { day: 31, isCurrentMonth: false, events: [] },
  { day: 1, isCurrentMonth: true, events: [{ id: 1, title: "Teacher Professional Day", color: "#e3f2fd" }] },
  {
    day: 2,
    isCurrentMonth: true,
    events: [
      { id: 2, title: "Students Day", color: "#e8f5e9" },
      { id: 3, title: "AP Calculus Exam", color: "#e8f5e9" },
    ],
  },
  { day: 3, isCurrentMonth: true, events: [{ id: 4, title: "Spring Concert", color: "#e0f7fa" }] },
  { day: 4, isCurrentMonth: true, events: [] },
  { day: 5, isCurrentMonth: true, events: [] },
  { day: 6, isCurrentMonth: true, events: [] },
  { day: 7, isCurrentMonth: true, events: [] },
  {
    day: 8,
    isCurrentMonth: true,
    events: [
      { id: 5, title: "Science Fair", color: "#e3f2fd" },
      { id: 6, title: "Teacher Meeting", color: "#fff8e1" },
    ],
  },
  {
    day: 9,
    isCurrentMonth: true,
    events: [
      { id: 7, title: "Science Fair", color: "#e3f2fd" },
      { id: 8, title: "PTA Meeting", color: "#fff8e1" },
    ],
  },
  { day: 10, isCurrentMonth: true, events: [] },
  { day: 11, isCurrentMonth: true, events: [] },
  { day: 12, isCurrentMonth: true, events: [] },
  { day: 13, isCurrentMonth: true, events: [{ id: 9, title: "English Literature Exam", color: "#f8bbd0" }] },
  { day: 14, isCurrentMonth: true, events: [] },
  { day: 15, isCurrentMonth: true, events: [{ id: 10, title: "Varsity Track Meet", color: "#fff8e1" }] },
  { day: 16, isCurrentMonth: true, events: [{ id: 11, title: "Junior Prom", color: "#e8f5e9" }] },
  { day: 17, isCurrentMonth: true, events: [] },
  { day: 18, isCurrentMonth: true, events: [] },
  {
    day: 19,
    isCurrentMonth: true,
    events: [
      { id: 12, title: "Senior Project Presentations", color: "#f8bbd0" },
      { id: 13, title: "Teacher Meeting", color: "#fff8e1" },
    ],
  },
  { day: 20, isCurrentMonth: true, events: [] },
  { day: 21, isCurrentMonth: true, events: [{ id: 14, title: "Board of Education Meeting", color: "#fff8e1" }] },
  {
    day: 22,
    isCurrentMonth: true,
    events: [
      { id: 15, title: "Art Exhibition", color: "#e3f2fd" },
      { id: 16, title: "PTA Meeting", color: "#fff8e1" },
    ],
  },
  { day: 23, isCurrentMonth: true, events: [] },
  { day: 24, isCurrentMonth: true, events: [] },
  { day: 25, isCurrentMonth: true, events: [] },
  { day: 26, isCurrentMonth: true, events: [{ id: 17, title: "Memorial Day", color: "#e3f2fd" }] },
  { day: 27, isCurrentMonth: true, events: [] },
  {
    day: 28,
    isCurrentMonth: true,
    events: [
      { id: 18, title: "Sophomore Class Trip", color: "#f8bbd0" },
      { id: 19, title: "Art Fair & Exhibition", color: "#e3f2fd" },
    ],
  },
  { day: 29, isCurrentMonth: true, events: [] },
  { day: 30, isCurrentMonth: true, events: [{ id: 20, title: "Last Day of School", color: "#e8f5e9" }] },
  { day: 31, isCurrentMonth: true, events: [] },
]

const agendaEvents: AgendaEvent[] = [
  {
    id: 1,
    title: "Science Fair Setup",
    time: "08:00 am",
    location: "Science Club",
    icon: <SchoolIcon />,
    color: "#e3f2fd",
  },
  {
    id: 2,
    title: "Teacher Meeting",
    time: "11:00 am",
    location: "All Teacher",
    icon: <PersonIcon />,
    color: "#fff8e1",
  },
  {
    id: 3,
    title: "Varsity Track Meet",
    time: "01:00 pm",
    location: "Track Team",
    icon: <SportsIcon />,
    color: "#f8bbd0",
  },
  {
    id: 4,
    title: "Parents Meeting",
    time: "03:00 pm",
    location: "All Teacher and Parents",
    icon: <PersonIcon />,
    color: "#fff8e1",
  },
]

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

export default function Calendar() {
  const [view, setView] = useState("month")

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleViewChange}
                aria-label="calendar view"
                size="small"
              >
                <ToggleButton value="month" aria-label="month view">
                  Month
                </ToggleButton>
                <ToggleButton value="week" aria-label="week view">
                  Week
                </ToggleButton>
                <ToggleButton value="day" aria-label="day view">
                  Day
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6">May 2030</Typography>
              <Box>
                <IconButton size="small">
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton size="small">
                  <ChevronRightIcon />
                </IconButton>
              </Box>
              <Chip label="Today" size="small" />
            </Box>
          </Box>

          <Paper sx={{ overflow: "hidden" }}>
            <Grid container>
              {daysOfWeek.map((day) => (
                <Grid
                  item
                  key={day}
                  xs={12 / 7}
                  sx={{
                    p: 1,
                    textAlign: "center",
                    borderBottom: "1px solid #f0f0f0",
                    borderRight: "1px solid #f0f0f0",
                    "&:last-child": {
                      borderRight: "none",
                    },
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="medium">
                    {day}
                  </Typography>
                </Grid>
              ))}

              {calendarData.map((day, index) => (
                <Grid
                  item
                  key={index}
                  xs={12 / 7}
                  sx={{
                    height: 120,
                    p: 1,
                    borderBottom: "1px solid #f0f0f0",
                    borderRight: "1px solid #f0f0f0",
                    "&:nth-of-type(7n)": {
                      borderRight: "none",
                    },
                    "&:nth-last-of-type(-n+7)": {
                      borderBottom: "none",
                    },
                    bgcolor: day.day === 8 ? "#f8f9fa" : "transparent",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: !day.isCurrentMonth ? "text.disabled" : "text.primary",
                      fontWeight: day.day === 8 ? "bold" : "normal",
                    }}
                  >
                    {day.day}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {day.events.map((event) => (
                      <Box
                        key={event.id}
                        sx={{
                          bgcolor: event.color,
                          p: 0.5,
                          borderRadius: 0.5,
                          mb: 0.5,
                          fontSize: "0.75rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.title}
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Agenda</Typography>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Paper sx={{ mb: 3, p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                Big Day and Celebration Day
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ borderLeft: "3px solid #f8bbd0", pl: 1 }}>
                Subject Presentation & Exam
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ borderLeft: "3px solid #e0f7fa", pl: 1 }}>
                Fair, Exhibition & Performance
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ borderLeft: "3px solid #fff8e1", pl: 1 }}>
                Official Meeting
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">May, 8 2030</Typography>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>

          {agendaEvents.map((event) => (
            <Card key={event.id} sx={{ mb: 2, bgcolor: event.color }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "white" }}>{event.icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {event.time}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
