'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add, Delete, AccessTime } from '@mui/icons-material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useElection, Election } from '@/hooks/useElection';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    info: { main: '#f59e0b' },
  },
  typography: {
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  marginRight: theme.spacing(1),
}));

function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ViewElection() {
  const [tabValue, setTabValue] = useState('upcoming');
  const { fetchElections, deleteElection, loading, error } = useElection();
  const [elections, setElections] = useState<Election[]>([]);

  // useEffect(() => {
  //   const sub = fetchElections().subscribe({
  //     next: (data) => setElections(data),
  //     error: (err) => console.error('Error fetching elections:', err),
  //   });
  //   return () => sub.unsubscribe();
  // }, [fetchElections]);

    useEffect(() => {
    const sub = fetchElections().subscribe({
      next: (data) => setElections(data),
      error: (err) => console.error('Error fetching elections:', err),
    });
    return () => sub.unsubscribe();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleDelete = async (electionId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this election?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteElection(electionId);
        setElections((prev) => prev.filter((e) => e.election_uuid !== electionId));
        Swal.fire('Deleted!', 'Election deleted successfully.', 'success');
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete election';
        console.error('Delete failed:', errorMessage);
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: { xs: 2, sm: 4, md: 4 }, pt: 3 }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h5">Election Management</Typography>
            <StyledButton variant="contained" color="primary" startIcon={<Add />}>
              Create New Election
            </StyledButton>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} aria-label="election tabs">
            <Tab label="Upcoming Elections" value="upcoming" />
            <Tab label="Active Elections" value="active" />
            <Tab label="Past Elections" value="past" />
            <Tab label="Create Election" value="create" />
          </Tabs>

          {/* Upcoming Elections Tab */}
          <TabPanel value={tabValue} index="upcoming">
            <StyledCard>
              <CardHeader
                title="Upcoming Elections"
                subheader="View and manage scheduled elections"
              />
              <CardContent>
                {/* Loading and error states */}
                {loading && (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                )}
                {error && <Alert severity="error">{error.message}</Alert>}

                {!loading && !error && (
                  <Table sx={{ border: 1, borderColor: "grey.300", borderRadius: 1 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Election Name</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {elections.length > 0 ? (
                        elections.map((election) => (
                          <TableRow key={election.election_uuid}>
                            <TableCell sx={{ fontWeight: "medium" }}>{election.name}</TableCell>
                            <TableCell>
                              {new Date(election.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(election.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <AccessTime sx={{ mr: 1, color: "info.main" }} />
                                <Typography color="info.main" sx={{ fontWeight: "medium" }}>
                                  Scheduled
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <StyledButton
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDelete(election.election_uuid)}
                              >
                                <Delete />
                              </StyledButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No elections found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </StyledCard>
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
