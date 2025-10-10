'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  styled,
} from '@mui/material';
import { Add, Delete, Search } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  usePartyPostCandidate,
  PartyPostCandidate,
} from '@/hooks/usePartyPostCandidate';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    success: { main: '#2e7d32' },
    warning: { main: '#ed6c02' },
    error: { main: '#d32f2f' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
});

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  marginRight: theme.spacing(1),
}));

function TabPanel(props: {
  children: React.ReactNode;
  value: string;
  index: string;
}) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ViewPartyCandidate() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<PartyPostCandidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [candidates, setCandidates] = useState<PartyPostCandidate[]>([]);

  console.log(isCreateDialogOpen);

  const { fetchPartyPostCandidates, deletePartyPostCandidate } = usePartyPostCandidate();

  // useEffect(() => {
  //   const sub = fetchPartyPostCandidates().subscribe({
  //     next: (data) => setCandidates(data),
  //     error: (err) =>
  //       Swal.fire('Error', err.message || 'Failed to fetch candidates', 'error'),
  //   });
  //   return () => sub.unsubscribe();
  // }, [fetchPartyPostCandidates]);

   useEffect(() => {
    const sub = fetchPartyPostCandidates().subscribe({
      next: (data) => setCandidates(data),
      error: (err) =>
        Swal.fire('Error', err.message || 'Failed to fetch candidates', 'error'),
    });
    return () => sub.unsubscribe();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleViewCandidate = (candidate: PartyPostCandidate) => {
    setSelectedCandidate(candidate);
    setIsViewDialogOpen(true);
  };

  // Delete candidate
  const handleDelete = (uuid: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = deletePartyPostCandidate(uuid).subscribe({
          next: () => {
            setCandidates((prev) => prev.filter((c) => c.party_post_id !== uuid));
            Swal.fire('Deleted!', 'The candidate has been deleted.', 'success');
          },
          error: (err) => {
            Swal.fire('Error', err.message || 'Failed to delete candidate', 'error');
          },
        });
        return () => sub.unsubscribe();
      }
    });
  };

  // Filter by search with type checks to prevent toLowerCase() errors
  const filteredCandidates = candidates.filter(
    (c) =>
      (typeof c.post?.postName === 'string' && c.post.postName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof c.party?.partyName === 'string' && c.party.partyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof c.candidate?.fullname === 'string' && c.candidate.fullname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof c.election?.name === 'string' && c.election.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Render candidates in the table
  const renderTable = (rows: PartyPostCandidate[]) => (
    <StyledCard>
      <CardContent sx={{ p: 0 }}>
        <Table sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Post</TableCell>
              <TableCell>Party</TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Election</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((candidate: PartyPostCandidate) => (
              <TableRow key={candidate.party_post_id}>
                <TableCell>{candidate.post?.postName}</TableCell>
                <TableCell>{candidate.party?.partyName}</TableCell>
                <TableCell>{candidate.candidate?.fullname}</TableCell>
                <TableCell>{candidate.election?.name}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <StyledButton
                      variant="text"
                      size="small"
                      onClick={() => handleViewCandidate(candidate)}
                    >
                      <Search />
                    </StyledButton>
                    <StyledButton
                      variant="text"
                      size="small"
                      onClick={() => handleDelete(candidate.party_post_id)}
                    >
                      <Delete />
                    </StyledButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </StyledCard>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F9FAFB', p: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h5">Party Candidate Management</Typography>
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create Party Candidate
          </StyledButton>
        </Box>

        {/* Search + Tabs */}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="party candidate tabs">
            <Tab label="All Party Candidates" value="all" />
            <Tab label="Executive" value="executive" />
            <Tab label="Legislative" value="legislative" />
            <Tab label="Judicial" value="judicial" />
          </Tabs>
          <Box sx={{ position: 'relative', width: 250 }}>
            <Search sx={{ position: 'absolute', left: 10, top: 12, color: 'text.secondary' }} />
            <TextField
              placeholder="Search candidates..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ '& .MuiInputBase-root': { pl: 5 } }}
            />
          </Box>
        </Box>

        {/* Tabs with filtered data */}
        <TabPanel value={tabValue} index="all">
          {renderTable(filteredCandidates)}
        </TabPanel>
        <TabPanel value={tabValue} index="executive">
          {renderTable(filteredCandidates.filter((c) => c.post?.postName.includes('President')))}
        </TabPanel>
        <TabPanel value={tabValue} index="legislative">
          {renderTable(filteredCandidates.filter((c) => c.post?.postName.includes('Legislator')))}
        </TabPanel>
        <TabPanel value={tabValue} index="judicial">
          {renderTable(filteredCandidates.filter((c) => c.post?.postName.includes('Judge')))}
        </TabPanel>

        {/* View Candidate Dialog */}
        <Dialog
          open={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          maxWidth="md"
        >
          <DialogTitle>Party Candidate Details</DialogTitle>
          <DialogContent>
            {selectedCandidate && (
              <>
                <DialogContentText>
                  Details of selected party candidate
                </DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">Post: {selectedCandidate.post?.postName}</Typography>
                    <Typography variant="body1">Party: {selectedCandidate.party?.partyName}</Typography>
                    <Typography variant="body1">Candidate: {selectedCandidate.candidate?.fullname}</Typography>
                    <Typography variant="body1">Election: {selectedCandidate.election?.name}</Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={() => setIsViewDialogOpen(false)} color="primary">
              Close
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}