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
  FileText,
  Users2,
  Vote,
} from 'lucide-react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { useRouter } from 'next/navigation';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { User } from "../types/user";
import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Circle as CircleIcon,
  NotificationsOutlined as NotificationIcon,
} from "@mui/icons-material"
import UserTable from '@/components/Table';
import { LucideIcon } from "lucide-react";
import { ElementType } from "react";


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

interface DashboardProps {
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

type StatCardIcon = LucideIcon | ElementType<SvgIconProps>;


interface StatCardProps {
  title: string;
  count: number;
  icon: StatCardIcon;
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
    case "Pending":
      return (
        <Chip
          icon={<CircleIcon sx={{ fontSize: "10px !important", color: "#2196f3 !important" }} />}
          label="Pending"
          size="small"
          sx={{
            backgroundColor: "transparent",
            "& .MuiChip-label": { color: "#2196f3", paddingLeft: "4px" },
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
        <Icon sx={{ fontSize: 20 }} />
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
          75% Progress
        </Typography>
      </Stack>
    </CardContent>
  </StatCardWrapper>
);

// Sample data for parent dashboard
const parentChildTasks = [
  {
    id: 1,
    childName: "Emily Peterson",
    topic: "World War II",
    taskName: "Essay on WWII Impact",
    submissionDate: "April 30, 2024",
    status: "Submitted",
  },
  {
    id: 2,
    childName: "Jacob Lee",
    topic: "The Cold War",
    taskName: "Research Paper",
    submissionDate: "May 5, 2024",
    status: "Pending",
  },
];

const parentElectionInfo = [
  {
    id: 1,
    position: "Student President",
    childInvolved: "Emily Peterson (Candidate)",
    status: "Ongoing",
  },
  {
    id: 2,
    position: "Vice President",
    childInvolved: "No",
    status: "Upcoming",
  },
];

const parentMessages = [
  {
    id: 1,
    sender: "Mrs. Allen",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "Yesterday",
    message: "Your child's essay has been graded",
  },
  {
    id: 2,
    sender: "Principal Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 days ago",
    message: "Parent-teacher meeting scheduled",
  },
];

const parentActivities = [
  {
    id: 1,
    type: "Grade Update",
    icon: "grade",
    message: "New grade posted for History 101",
    time: "1 hour ago",
  },
  {
    id: 2,
    type: "Election Notification",
    icon: "vote",
    message: "Your child is nominated for Student President",
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "Meeting Reminder",
    icon: "event",
    message: "Parent meeting tomorrow",
    time: "1 day ago",
  },
];

export function ParentDashboard({ user, roleName }: DashboardProps) {
  const [page, setPage] = useState(1)
  const totalPages = 5
  const [anchorElSetting, setAnchorElSetting] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

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
            { title: 'Child Tasks', icon: FileText },
            { title: 'Elections Involving Child', icon: Vote },
            { title: 'Child Classes', icon: Users2 },
            { title: 'Notifications', icon: NotificationIcon },
          ].map((stat) => (
            <Grid item xs={12} md={3} key={stat.title}>
              <StatCard title={stat.title} count={3} icon={stat.icon} />
            </Grid>
          ))}
        </Grid>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h1">
                  Child&apos;s Tasks & Elections
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <SearchContainer>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                  </SearchContainer>
                </Box>
              </Box>

              <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell>Child Name/Position</TableCell>
                      <TableCell>Topic/Involvement</TableCell>
                      <TableCell>Task/Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parentChildTasks.map((task) => (
                      <TableRow key={task.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{task.childName}</TableCell>
                        <TableCell>{task.topic}</TableCell>
                        <TableCell>{task.taskName}</TableCell>
                        <TableCell>{task.submissionDate}</TableCell>
                        <TableCell>{getStatusChip(task.status)}</TableCell>
                      </TableRow>
                    ))}
                    {parentElectionInfo.map((election) => (
                      <TableRow key={election.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{election.position}</TableCell>
                        <TableCell>{election.childInvolved}</TableCell>
                        <TableCell>{election.status}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>{getStatusChip(election.status)}</TableCell>
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
                    {parentMessages.map((message, index) => (
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
                        {index < parentMessages.length - 1 && <Divider variant="inset" component="li" />}
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
                    {parentActivities.map((activity, index) => (
                      <Box key={activity.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor:
                                  activity.icon === "grade" ? "#4caf50" : activity.icon === "vote" ? "#ff9800" : "#2196f3",
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
                        {index < parentActivities.length - 1 && <Divider variant="inset" component="li" />}
                      </Box>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Contact Teacher
                    </Typography>
                    <Stack spacing={2}>
                      <Select fullWidth size="small" displayEmpty value="">
                        <MenuItem disabled value="">
                          Select Child
                        </MenuItem>
                        <MenuItem value="emily">Emily Peterson</MenuItem>
                        <MenuItem value="jacob">Jacob Lee</MenuItem>
                      </Select>
                      <Select fullWidth size="small" displayEmpty value="">
                        <MenuItem disabled value="">
                          Select Teacher
                        </MenuItem>
                        <MenuItem value="allen">Mrs. Allen</MenuItem>
                        <MenuItem value="johnson">Principal Johnson</MenuItem>
                      </Select>
                      <TextField fullWidth label="Message" variant="outlined" size="small" multiline rows={3} />
                      <Button variant="contained" fullWidth sx={{ bgcolor: '#0D0F29' }}>
                        Send Message
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      View Child Grades/ Election Status
                    </Typography>
                    <Stack spacing={2}>
                      <Select fullWidth size="small" displayEmpty value="">
                        <MenuItem disabled value="">
                          Select Child
                        </MenuItem>
                        <MenuItem value="emily">Emily Peterson</MenuItem>
                        <MenuItem value="jacob">Jacob Lee</MenuItem>
                      </Select>
                      <Select fullWidth size="small" displayEmpty value="">
                        <MenuItem disabled value="">
                          Select View (Grades/Election)
                        </MenuItem>
                        <MenuItem value="grades">Grades</MenuItem>
                        <MenuItem value="election">Election Status</MenuItem>
                      </Select>
                      <Button variant="contained" fullWidth sx={{ bgcolor: '#0D0F29' }}>
                        View Details
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