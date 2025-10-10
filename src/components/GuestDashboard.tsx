'use client';

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Box,
  Typography,
  Grid,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  InputBase,
  alpha,
} from '@mui/material';
import { Search, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { User } from "../types/user";
import { Search as SearchIcon } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  backgroundColor: theme.palette.grey[50],
}));

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
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

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
}));

interface GuestDashboardProps {
  user: User;
  roleName: string;
}

const settings = [
  { title: 'Page', icon: '/images/f-i-3-1 2.svg' },
];

const electionInfo = [
  {
    id: 1,
    position: "Student President",
    candidates: ["Emily Peterson", "Jacob Lee"],
    status: "Ongoing",
  },
  {
    id: 2,
    position: "Vice President",
    candidates: ["Sarah Martin", "Liam Johnson"],
    status: "Upcoming",
  },
];

export default function GuestDashboard({ user, roleName }: GuestDashboardProps) {
  const [page, setPage] = useState(1);
  const totalPages = 2;
  const [anchorElSetting, setAnchorElSetting] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenSettingMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSetting(event.currentTarget);
  };

  const handleCloseSettingMenu = () => {
    setAnchorElSetting(null);
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome {roleName}, {user.fullname || 'Guest'}
        </Typography>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h1">
                  School Elections
                </Typography>
                <SearchContainer>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search elections..." inputProps={{ "aria-label": "search" }} />
                </SearchContainer>
              </Box>

              <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell>Position</TableCell>
                      <TableCell>Candidates</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {electionInfo.map((election) => (
                      <TableRow key={election.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{election.position}</TableCell>
                        <TableCell>{election.candidates.join(', ')}</TableCell>
                        <TableCell>{election.status}</TableCell>
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
          </Grid>

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </MainContent>
  );
}