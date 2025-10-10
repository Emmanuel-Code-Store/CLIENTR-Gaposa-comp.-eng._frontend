"use client";

import { useEffect, useState, useMemo } from "react";
import { Subscription } from "rxjs";
import { useVote, ElectionResults } from "@/hooks/useVote";
import {
  Typography,
  Container,
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Grid,
  Menu as MUIMenu,
  MenuItem as MUIMenuItem,
  Fade,
  Avatar,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon,
  LocationOn as LocationOnIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import ElectionHeader from "@/components/ElectionHeader";
import ElectionFooter from "@/components/ElectionFooter";

interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number;
  color: string;
}

interface District {
  id: string;
  name: string;
}

interface ElectionData {
  totalRegisteredVoters: number;
  totalVotesCast: number;
  districts: District[];
  candidates: Candidate[];
  districtResults: Record<string, Record<string, number>>;
  historicalData: { year: number; turnout: number }[];
  electionName?: string;
}

export default function ElectionResultsPage() {
  const { loading, error, fetchResults } = useVote();
  const [electionData, setElectionData] = useState<ElectionData | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Candidate | "votes";
    direction: "ascending" | "descending";
  }>({
    key: "votes",
    direction: "descending",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("table");

  useEffect(() => {
    const sub: Subscription = fetchResults().subscribe({
      next: (data: ElectionResults) => {
        const transformedData: ElectionData = {
          totalRegisteredVoters: data.totalRegisteredVoters || 12500,
          totalVotesCast: data.candidates.reduce(
            (sum, c) => sum + (c.votes || 0),
            0
          ),
          districts: data.districts?.length
            ? data.districts
            : [
                { id: "all", name: "All Districts" },
                { id: "north", name: "Northern District" },
                { id: "central", name: "Central District" },
                { id: "east", name: "Eastern District" },
                { id: "west", name: "Western District" },
                { id: "south", name: "Southern District" },
              ],
          candidates: data.candidates.map((c, idx) => ({
            id: c.candidateId,
            name: c.name || "Unknown Candidate",
            party: c.party || "Independent",
            votes: c.votes || 0,
            color: ["#4f46e5", "#ef4444", "#22c55e", "#f59e0b"][idx % 4],
          })),
          districtResults:
            data.districtResults && Object.keys(data.districtResults).length
              ? data.districtResults
              : {
                  north: { a: 800, b: 600, c: 300, d: 200 },
                  central: { a: 750, b: 700, c: 400, d: 250 },
                  east: { a: 600, b: 500, c: 300, d: 200 },
                  west: { a: 550, b: 600, c: 250, d: 150 },
                  south: { a: 500, b: 400, c: 250, d: 200 },
                },
          historicalData: data.historicalData?.length
            ? data.historicalData
            : [
                { year: 2012, turnout: 65 },
                { year: 2016, turnout: 68 },
                { year: 2020, turnout: 72 },
                { year: 2024, turnout: 68 },
              ],
          electionName: `${
            data.electionName || "Departmental Election"
          } ${new Date().getFullYear()}`,
        };
        setElectionData(transformedData);
      },
      error: (err) => console.error("Failed to fetch results:", err),
    });
    return () => sub.unsubscribe();
  }, [fetchResults]);

  const totalVotes = useMemo(
    () =>
      electionData?.candidates.reduce(
        (sum, candidate) => sum + candidate.votes,
        0
      ) || 0,
    [electionData?.candidates]
  );

  const getCandidatesForDistrict = useMemo(() => {
    const sortCandidates = (candidates: Candidate[]) => {
      return [...candidates].sort((a, b) => {
        if (sortConfig.key === "name") {
          return sortConfig.direction === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortConfig.key === "party") {
          return sortConfig.direction === "ascending"
            ? a.party.localeCompare(b.party)
            : b.party.localeCompare(a.party);
        } else {
          return sortConfig.direction === "ascending"
            ? a.votes - b.votes
            : b.votes - a.votes;
        }
      });
    };

    if (!electionData) return [];
    if (selectedDistrict === "all") {
      return sortCandidates(electionData.candidates);
    }

    const districtResults = electionData.districtResults[selectedDistrict] || {};
    return sortCandidates(
      electionData.candidates.map((candidate) => ({
        ...candidate,
        votes: districtResults[candidate.id] || 0,
      }))
    );
  }, [
    electionData,
    selectedDistrict,
    sortConfig,
  ]);

  const voteMargin = useMemo(() => {
    if (!electionData || electionData.candidates.length < 2) {
      return "N/A";
    }
    return (
      electionData.candidates[0].votes -
      electionData.candidates[1].votes
    ).toLocaleString();
  }, [electionData]);

  const voteMarginPercentage = useMemo(() => {
    if (!electionData || electionData.candidates.length < 2 || totalVotes === 0) {
      return "N/A";
    }
    return (
      ((electionData.candidates[0].votes -
        electionData.candidates[1].votes) /
        totalVotes) *
      100
    ).toFixed(1);
  }, [electionData, totalVotes]);

  const districtTotalVotes = (districtId: string) => {
    if (!electionData || districtId === "all") {
      return totalVotes;
    }
    const districtResults = electionData.districtResults[districtId] || {};
    return Object.values(districtResults).reduce((sum, votes) => sum + votes, 0);
  };

  const handleSort = (key: keyof Candidate | "votes") => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const getSortIcon = (key: keyof Candidate | "votes") => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <ExpandLessIcon fontSize="small" />
      ) : (
        <ExpandMoreIcon fontSize="small" />
      );
    }
    return null;
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading && !electionData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !electionData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  if (!electionData) return null;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "grey.50" }}>
      <ElectionHeader />
      <Container component="main" sx={{ flex: 1, py: 12 }}>
        <Fade in timeout={1000}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "indigo.900", mb: 1 }}>
                {electionData.electionName || "Election Results"}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                Comprehensive view of the {new Date().getFullYear()} Departmental Election results
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {[
                {
                  title: "Total Registered Voters",
                  value: electionData.totalRegisteredVoters.toLocaleString(),
                  icon: <LocationOnIcon />,
                },
                {
                  title: "Total Votes Cast",
                  value: electionData.totalVotesCast.toLocaleString(),
                  subtitle: totalVotes > 0
                    ? `${((electionData.totalVotesCast / electionData.totalRegisteredVoters) * 100).toFixed(1)}% turnout`
                    : "N/A",
                  icon: <BarChartIcon />,
                },
                {
                  title: "Leading Candidate",
                  value: electionData.candidates[0]?.name || "N/A",
                  subtitle: electionData.candidates[0] && totalVotes > 0
                    ? `${((electionData.candidates[0].votes / totalVotes) * 100).toFixed(1)}% of votes`
                    : "N/A",
                  icon: <PieChartIcon />,
                },
                {
                  title: "Vote Margin",
                  value: voteMargin,
                  subtitle: voteMarginPercentage !== "N/A" ? `${voteMarginPercentage}% difference` : "N/A",
                  icon: <ShowChartIcon />,
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          textAlign: "center",
                          height: "100%",
                        }}
                      >
                        <Avatar sx={{ bgcolor: "indigo.100", color: "indigo.600", mb: 1 }}>
                          {item.icon}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: "grey.600", fontWeight: "medium" }}>
                          {item.title}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "indigo.900" }}>
                          {item.value}
                        </Typography>
                        {item.subtitle && (
                          <Typography variant="caption" sx={{ color: "grey.500", mt: 0.5 }}>
                            {item.subtitle}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: "center", bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: "indigo.600" }} />
                <Select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value as string)}
                  sx={{ minWidth: 200, bgcolor: "white", borderRadius: 1 }}
                  size="small"
                >
                  {electionData.districts.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Apply Filters">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<FilterListIcon />}
                    sx={{ bgcolor: "indigo.600", "&:hover": { bgcolor: "indigo.700" } }}
                    onClick={handleMenuClick}
                  >
                    Filters
                  </Button>
                </Tooltip>
                <MUIMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MUIMenuItem onClick={handleMenuClose}>Filter by Date</MUIMenuItem>
                  <MUIMenuItem onClick={handleMenuClose}>Filter by Region</MUIMenuItem>
                  <MUIMenuItem onClick={handleMenuClose}>Clear Filters</MUIMenuItem>
                </MUIMenu>
                <Tooltip title="Export Data">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<FileDownloadIcon />}
                    sx={{ bgcolor: "indigo.600", "&:hover": { bgcolor: "indigo.700" } }}
                  >
                    Export
                  </Button>
                </Tooltip>
              </Box>
            </Box>

            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 1 }}
              centered
            >
              {[
                { value: "table", label: "Table View", icon: <BarChartIcon /> },
                { value: "charts", label: "Charts", icon: <PieChartIcon /> },
                { value: "trends", label: "Trends", icon: <ShowChartIcon /> },
              ].map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {tab.icon}
                      <Typography variant="body2">{tab.label}</Typography>
                    </Box>
                  }
                  sx={{ textTransform: "none", fontWeight: "medium", color: activeTab === tab.value ? "indigo.600" : "grey.600" }}
                />
              ))}
            </Tabs>

            {activeTab === "table" && (
              <Fade in timeout={500}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardHeader
                    title={<Typography variant="h6">Election Results (Live)</Typography>}
                    subheader={
                      <Typography variant="body2" sx={{ color: "grey.600" }}>
                        {selectedDistrict === "all"
                          ? "Showing results from all districts"
                          : `Showing results from ${electionData.districts.find((d) => d.id === selectedDistrict)?.name}`}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Table>
                      <caption>Election results as of {new Date().toLocaleDateString()}</caption>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: 50 }}>#</TableCell>
                          <TableCell sx={{ cursor: "pointer" }} onClick={() => handleSort("name")}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              Candidate {getSortIcon("name")}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ cursor: "pointer" }} onClick={() => handleSort("party")}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              Party {getSortIcon("party")}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ cursor: "pointer", textAlign: "right" }} onClick={() => handleSort("votes")}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                              Votes {getSortIcon("votes")}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ textAlign: "right" }}>Percentage</TableCell>
                          <TableCell>Progress</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getCandidatesForDistrict.map((candidate, index) => (
                          <TableRow key={candidate.id} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                            <TableCell sx={{ fontWeight: "medium" }}>{index + 1}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar>{candidate.name.charAt(0)}</Avatar>
                                {candidate.name}
                                {index === 0 && <Chip label="Leading" color="success" size="small" />}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={candidate.party}
                                sx={{ bgcolor: candidate.color, color: "white", fontWeight: "medium" }}
                              />
                            </TableCell>
                            <TableCell sx={{ textAlign: "right", fontWeight: "medium" }}>
                              {candidate.votes.toLocaleString()}
                            </TableCell>
                            <TableCell sx={{ textAlign: "right" }}>
                              {districtTotalVotes(selectedDistrict) > 0 ? ((candidate.votes / districtTotalVotes(selectedDistrict)) * 100).toFixed(2) : "0.00"}%
                            </TableCell>
                            <TableCell sx={{ width: 200 }}>
                              <LinearProgress
                                variant="determinate"
                                value={districtTotalVotes(selectedDistrict) > 0 ? (candidate.votes / districtTotalVotes(selectedDistrict)) * 100 : 0}
                                sx={{
                                  height: 8,
                                  bgcolor: "grey.200",
                                  "& .MuiLinearProgress-bar": { bgcolor: candidate.color },
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {activeTab === "charts" && (
              <Fade in timeout={500}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader
                          title={<Typography variant="h6">Vote Distribution</Typography>}
                          subheader={<Typography variant="body2" sx={{ color: "grey.600" }}>Breakdown of votes by candidate</Typography>}
                        />
                        <CardContent sx={{ height: 350 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getCandidatesForDistrict}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis />
                              <RechartsTooltip />
                              <Bar dataKey="votes" name="Votes">
                                {getCandidatesForDistrict.map((entry) => (
                                  <Cell key={`cell-${entry.id}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader
                          title={<Typography variant="h6">Vote Share</Typography>}
                          subheader={<Typography variant="body2" sx={{ color: "grey.600" }}>Percentage of total votes</Typography>}
                        />
                        <CardContent sx={{ height: 350 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getCandidatesForDistrict}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="votes"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {getCandidatesForDistrict.map((entry) => (
                                  <Cell key={`cell-${entry.id}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <RechartsTooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                      title={<Typography variant="h6">Department Level Comparison</Typography>}
                      subheader={
                        <Typography variant="body2" sx={{ color: "grey.600" }}>
                          Vote distribution across department level for each candidate
                        </Typography>
                      }
                    />
                    <CardContent sx={{ height: 400 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={electionData.districts
                            .filter((d) => d.id !== "all")
                            .map((district) => {
                              const results = electionData.districtResults[district.id] || {};
                              return {
                                name: district.name,
                                ...electionData.candidates.reduce(
                                  (acc, candidate) => {
                                    acc[candidate.name] = results[candidate.id] || 0;
                                    return acc;
                                  },
                                  {} as Record<string, number>
                                ),
                              };
                            })}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          {electionData.candidates.map((candidate) => (
                            <Bar key={candidate.id} dataKey={candidate.name} stackId="a" fill={candidate.color} />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Box>
              </Fade>
            )}

            {activeTab === "trends" && (
              <Fade in timeout={500}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                      title={<Typography variant="h6">Voter Turnout Trends</Typography>}
                      subheader={<Typography variant="body2" sx={{ color: "grey.600" }}>Historical voter participation rates</Typography>}
                    />
                    <CardContent sx={{ height: 350 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={electionData.historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="turnout"
                            name="Voter Turnout (%)"
                            stroke="#4f46e5"
                            strokeWidth= {2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader title={<Typography variant="h6">Key Statistics</Typography>} />
                        <CardContent>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {[
                              {
                                label: "Voter Turnout",
                                value: totalVotes > 0
                                  ? ((electionData.totalVotesCast / electionData.totalRegisteredVoters) * 100).toFixed(1)
                                  : "0.0",
                                progress: totalVotes > 0
                                  ? (electionData.totalVotesCast / electionData.totalRegisteredVoters) * 100
                                  : 0,
                              },
                              {
                                label: "Leading Margin",
                                value: electionData.candidates.length >= 2 && totalVotes > 0
                                  ? (((electionData.candidates[0].votes - electionData.candidates[1].votes) / totalVotes) * 100).toFixed(1)
                                  : "0.0",
                                progress: electionData.candidates.length >= 2 && totalVotes > 0
                                  ? ((electionData.candidates[0].votes - electionData.candidates[1].votes) / totalVotes) * 100
                                  : 0,
                              },
                              { label: "Invalid Ballots", value: "2.3", progress: 2.3 },
                            ].map((item, index) => (
                              <Box key={index}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography variant="body2" sx={{ fontWeight: "medium", color: "grey.700" }}>
                                    {item.label}
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: "medium", color: "indigo.900" }}>
                                    {item.value}%
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={item.progress}
                                  sx={{ mt: 1, height: 8, bgcolor: "grey.200", "& .MuiLinearProgress-bar": { bgcolor: "indigo.600" } }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader title={<Typography variant="h6">Election Facts</Typography>} />
                        <CardContent>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {[
                              { label: "Highest Turnout", value: "Eastern District (76.2%)" },
                              { label: "Lowest Turnout", value: "Western District (62.8%)" },
                              { label: "Most Competitive", value: "Central District (1.2% margin)" },
                            ].map((item, index) => (
                              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "indigo.100", color: "indigo.600", width: 32, height: 32 }}>
                                  <LocationOnIcon fontSize="small" />
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: "medium", color: "grey.700" }}>
                                    {item.label}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "grey.600" }}>
                                    {item.value}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}
          </Box>
        </Fade>
      </Container>
      <ElectionFooter />
    </Box>
  );
}