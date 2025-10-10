"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
  styled,
} from "@mui/material";
import {
  Add,
  Delete,
  CheckCircle,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParty, Party } from "@/hooks/useParty";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    success: { main: "#2e7d32" },
    warning: { main: "#ed6c02" },
    error: { main: "#d32f2f" },
    info: { main: "#f59e0b" },
    background: { default: "#f5f5f5" },
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
  textTransform: "none",
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

export default function ViewParty() {
  const [tabValue, setTabValue] = useState("active");
  const [parties, setParties] = useState<Party[]>([]);
  const { fetchParties, deleteParty } = useParty();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const sub = fetchParties().subscribe({
      next: (data) => setParties(data),
      error: (err) =>
        Swal.fire("Error", err.message || "Failed to fetch parties", "error"),
    });
    return () => sub.unsubscribe();
  }, []);

  const handleDelete = (uuid: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = deleteParty(uuid).subscribe({
          next: () => {
            setParties((prev) => prev.filter((p) => p.partyId !== uuid));
            Swal.fire("Deleted!", "The party has been deleted.", "success");
          },
          error: (err) => {
            Swal.fire("Error", err.message || "Failed to delete party", "error");
          },
        });
        return () => sub.unsubscribe();
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: { xs: 2, sm: 4, md: 4 },
          pt: 3,
        }}
      >
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
            <Typography variant="h5">Party Management</Typography>
            <StyledButton variant="contained" color="primary" startIcon={<Add />}>
              Register New Party
            </StyledButton>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} aria-label="party tabs">
            <Tab label="Active Parties" value="active" />
            <Tab label="Pending Registration" value="pending" />
            <Tab label="Register Party" value="register" />
            <Tab label="Party Candidates" value="candidates" />
          </Tabs>

          {/* Active Parties */}
          <TabPanel value={tabValue} index="active">
            <StyledCard>
              <CardHeader
                title="Active Political Parties"
                subheader="View and manage registered political parties"
              />
              <CardContent>
                <Table sx={{ border: 1, borderColor: "grey.300", borderRadius: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 48 }}>Abbreviation</TableCell>
                      <TableCell>Party Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parties.map((party) => (
                      <TableRow key={party.partyId}>
                        <TableCell>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              bgcolor: "blue.100",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold", color: "blue.600" }}>
                              {party.partyName.slice(0, 3).toUpperCase()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: "medium" }}>{party.partyName}</TableCell>
                        <TableCell>{party.partyDescription}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CheckCircle sx={{ mr: 1, color: "success.main" }} />
                            <Typography color="success.main" sx={{ fontWeight: "medium" }}>
                              Active
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                            <StyledButton
                              variant="text"
                              size="small"
                              onClick={() => handleDelete(party.partyId)}
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
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
