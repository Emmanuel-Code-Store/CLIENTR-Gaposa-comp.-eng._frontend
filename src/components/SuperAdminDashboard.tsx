'use client';

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  Button,
  LinearProgress,
  Stack,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  alpha,
} from '@mui/material';
import {
  Search,
  Settings,
  Users,
  Eye,
  EyeOff,
  FileText,
  Users2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { User } from "../types/user";
import {
  Search as SearchIcon,
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Circle as CircleIcon,
  NotificationsOutlined as NotificationIcon,
} from "@mui/icons-material"
import UserTable from '@/components/Table';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  backgroundColor: theme.palette.grey[50],
}));

const StatCardWrapper = styled(Card)(({ theme }) => ({
  height: '100%',
  '& .MuiCardContent-root': {
    height: '100%',
    padding: theme.spacing(3),
  },
}));

interface SuperAdminDashboardProps {
  user: User;
  roleName: string;
}

const settings = [
  { title: 'SEO', icon: '/images/f-i-3-1 2.svg' },
  { title: 'Page', icon: '/images/f-i-3-1 2.svg' },
];
const users = [
  { title: 'Profile', icon: '/images/f-i-3-1 2.svg' },
  { title: 'Dashboard', icon: '/images/f-i-3-1 2.svg' },
  { title: 'Logout', icon: '/images/f-i-3-1 2.svg' },
];



// Custom styled components
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: "1px solid #e0e0e0",
  [theme.breakpoints.up("sm")]: {
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

// Sample data
const students = [
  {
    id: 1,
    name: "Emily Peterson",
    status: "History 101 (Fall Semester)",
    topic: "World War II",
    taskName: "Essay on the Impact of WWII on Modern Europe",
    submissionDate: "April 30, 2024",
    action: "Active",
  },
  {
    id: 2,
    name: "Jacob Lee",
    status: "History 202",
    topic: "The Cold War",
    taskName: "Research Paper on the Cuban Missile Crisis",
    submissionDate: "May 5, 2024",
    action: "Not Viewed",
  },
  {
    id: 3,
    name: "Sarah Martin",
    status: "History 304",
    topic: "European Colonization",
    taskName: "Prepare Arguments for Class Debate",
    submissionDate: "April 29, 2024",
    action: "Reviewing",
  },
  {
    id: 4,
    name: "Liam Johnson",
    status: "History 201",
    topic: "American History",
    taskName: "Presentation on the Civil Rights Movement",
    submissionDate: "May 10, 2024",
    action: "Not Viewed",
  },
  {
    id: 5,
    name: "Olivia Smith",
    status: "History 310 (Fall Semester)",
    topic: "Industrial Revolution",
    taskName: "Group Project on the Effects of Industrialization",
    submissionDate: "May 3, 2024",
    action: "Reviewing",
  },
]

const messages = [
  {
    id: 1,
    sender: "Mrs. Allen",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "11:30 AM",
    message: "Please check your grading report for Emily's final World War II essay",
  },
  {
    id: 2,
    sender: "Tim Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "10:45 PM",
    message: "When will the European Colonization debate topics be finalized?",
  },
  {
    id: 3,
    sender: "Principal Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2:15 PM",
    message: "Please submit your attendance at today's Fall Department meeting",
  },
]

const activities = [
  {
    id: 1,
    type: "Curriculum Update Submitted",
    icon: "info",
    message: "History curriculum has been updated with new reading materials",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "Student Grade Posted",
    icon: "grade",
    message: "Grades for Cold War Research Papers have been submitted",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "Department Meeting Reminder",
    icon: "event",
    message: "Reminder: Department meeting at 3:30 PM today in the conference room",
    time: "6 hours ago",
  },
]


export default function SuperAdminDashboard({ user, roleName }: SuperAdminDashboardProps) {
  const [page, setPage] = useState(1)
  const totalPages = 12

  const [showPassword, setShowPassword] = useState(false);
  const [anchorElSetting, setAnchorElSetting] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  interface StatCardProps {
    title: string;
    count: number;
    icon: LucideIcon;
  }

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Chip
            icon={<CircleIcon sx={{ fontSize: "10px !important", color: "#4caf50 !important" }} />}
            label="Active"
            size="small"
            sx={{
              backgroundColor: "transparent",
              "& .MuiChip-label": { color: "#4caf50", paddingLeft: "4px" },
            }}
          />
        )
      case "Not Viewed":
        return (
          <Chip
            icon={<CircleIcon sx={{ fontSize: "10px !important", color: "#f44336 !important" }} />}
            label="Not Viewed"
            size="small"
            sx={{
              backgroundColor: "transparent",
              "& .MuiChip-label": { color: "#f44336", paddingLeft: "4px" },
            }}
          />
        )
      case "Reviewing":
        return (
          <Chip
            icon={<CircleIcon sx={{ fontSize: "10px !important", color: "#ff9800 !important" }} />}
            label="Reviewing"
            size="small"
            sx={{
              backgroundColor: "transparent",
              "& .MuiChip-label": { color: "#ff9800", paddingLeft: "4px" },
            }}
          />
        )
      default:
        return null
    }
  }


  const StatCard: React.FC<StatCardProps> = ({ title, count, icon: Icon }) => (
    <StatCardWrapper>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <Icon size={20} />
            <Typography variant="body2">{title}</Typography>
          </Box>
          <Typography variant="h4" component="div">
            {count}
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            75% Registered Student
          </Typography>
        </Stack>
      </CardContent>
    </StatCardWrapper>
  );

  const handleOpenSettingMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSetting(event.currentTarget);
  };

  const handleCloseSettingMenu = () => {
    setAnchorElSetting(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/auth/user-login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/auth/user-login');
    }
  };

  return (
    <MainContent>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            sx={{
              width: 240,
              backgroundColor: 'white',
              borderRadius: 1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="gray" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenSettingMenu} sx={{ p: 0 }}>
                  <Settings size={20} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElSetting}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElSetting)}
                onClose={handleCloseSettingMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={handleCloseSettingMenu}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#659AC9',
                        },
                      }}
                      onClick={() => {
                        router.push(`/${setting.title.toLowerCase().replace(/\s/g, '')}`);
                      }}
                    >
                      <Box sx={{ width: 40, height: 40 }}>
                        <Image
                          src={setting.icon || '/placeholder.svg'}
                          alt={setting.title}
                          width={40}
                          height={40}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Box>
                      <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Tooltip title="Open User">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.fullname || 'User'} src="/static/images/avatar/2.jpg" />
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
                {users.map((menuItem) => (
                  <MenuItem key={menuItem.title} onClick={handleCloseUserMenu}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#659AC9',
                        },
                      }}
                      onClick={() => {
                        if (menuItem.title === 'Logout') {
                          handleLogout();
                        } else {
                          router.push(`/${menuItem.title.toLowerCase().replace(/\s/g, '')}`);
                        }
                      }}
                    >
                      <Box sx={{ width: 40, height: 40 }}>
                        <Image
                          src={menuItem.icon || '/placeholder.svg'}
                          alt={menuItem.title}
                          width={40}
                          height={40}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Box>
                      <Typography sx={{ textAlign: 'center' }}>{menuItem.title}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome {roleName}, {user.fullname || 'Default User'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { title: 'Registered Students', icon: Users },
            { title: 'Registered Staffs', icon: Users2 },
            { title: 'Total Orders', icon: FileText },
            { title: 'Total Student', icon: Users },
          ].map((stat) => (
            <Grid item xs={12} md={3} key={stat.title}>
              <StatCard title={stat.title} count={580} icon={stat.icon} />
            </Grid>
          ))}
        </Grid>


        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h1">
                  Student Tasks
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <SearchContainer>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search by Topic..." inputProps={{ "aria-label": "search" }} />
                  </SearchContainer>
                  <IconButton
                    sx={{
                      backgroundColor: "#ffc107",
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "#ffb300" },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Topic</TableCell>
                      <TableCell>Task Name</TableCell>
                      <TableCell>Submission Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" fontWeight="medium">
                            {student.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {student.status}
                          </Typography>
                        </TableCell>
                        <TableCell>{student.topic}</TableCell>
                        <TableCell>{student.taskName}</TableCell>
                        <TableCell>{student.submissionDate}</TableCell>
                        <TableCell>{getStatusChip(student.action)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                <Button
                  startIcon={<ChevronLeftIcon />}
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Page {page} of {totalPages}
                </Typography>
                <Button
                  endIcon={<ChevronRightIcon />}
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3, boxShadow: "none", border: "1px solid #e0e0e0" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Messages</Typography>
                    <Button variant="text" size="small">
                      View all
                    </Button>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {messages.map((message, index) => (
                      <Box key={message.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar src={message.avatar} alt={message.sender} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2">{message.sender}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {message.time}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary" sx={{ display: "inline", mt: 0.5 }}>
                                {message.message}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < messages.length - 1 && <Divider variant="inset" component="li" />}
                      </Box>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Recent Activity</Typography>
                    <Button variant="text" size="small">
                      View all
                    </Button>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {activities.map((activity, index) => (
                      <Box key={activity.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor:
                                  activity.icon === "info" ? "#2196f3" : activity.icon === "grade" ? "#4caf50" : "#ff9800",
                              }}
                            >
                              <NotificationIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="subtitle2">{activity.type}</Typography>}
                            secondary={
                              <Stack spacing={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                  {activity.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.time}
                                </Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                        {index < activities.length - 1 && <Divider variant="inset" component="li" />}
                      </Box>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={3}>
              {/* Add Student Form */}
              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Add Student
                    </Typography>
                    <Stack spacing={2}>
                      <TextField fullWidth label="Admission No" variant="outlined" size="small" />
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField fullWidth label="Surname" variant="outlined" size="small" />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth label="First Name" variant="outlined" size="small" />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth label="Last Name" variant="outlined" size="small" />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Select fullWidth size="small" displayEmpty value="">
                            <MenuItem disabled value="">
                              Select Session
                            </MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={4}>
                          <Select fullWidth size="small" displayEmpty value="">
                            <MenuItem disabled value="">
                              Select Class
                            </MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={4}>
                          <Select fullWidth size="small" displayEmpty value="">
                            <MenuItem disabled value="">
                              Select Gender
                            </MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Upload PDF
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" fullWidth>
                            Choose File
                          </Button>
                          <Button variant="contained">Upload</Button>
                        </Stack>
                      </Box>
                      <Button variant="contained" fullWidth sx={{ bgcolor: '#0D0F29' }}>
                        Save
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Add Staff
                    </Typography>
                    <Stack spacing={2}>
                      <TextField fullWidth label="Staff Name" variant="outlined" size="small" />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField fullWidth label="Username" variant="outlined" size="small" />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField fullWidth label="Teacher's Email" variant="outlined" size="small" />
                        </Grid>
                      </Grid>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Select fullWidth size="small" displayEmpty value="">
                        <MenuItem disabled value="">
                          Select Role
                        </MenuItem>
                      </Select>
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Upload PDF
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" fullWidth>
                            Choose File
                          </Button>
                          <Button variant="contained">Upload</Button>
                        </Stack>
                      </Box>
                      <Button variant="contained" fullWidth sx={{ bgcolor: '#0D0F29' }}>
                        Save
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 2, borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="body2" color="text.secondary">
              email@school.edu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +1 123 456 6789
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Terms of Use
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Copyright © PearShare
              </Typography>
            </Box>
          </Box>

          <UserTable />
        </Container>

      </Box>
    </MainContent>
  );
}