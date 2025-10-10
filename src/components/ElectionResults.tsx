"use client";

import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { useVote, type ElectionResults } from "@/hooks/useVote";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  BarChart as BarChartIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number;
  percentage: number;
  color: string;
  change: number;
}

interface Region {
  id: number;
  name: string;
  winner: string;
  color: string;
  counted: number;
}

interface Update {
  id: number;
  time: string;
  text: string;
}

interface Results {
  totalVotes: number;
  percentageCounted: number;
  lastUpdated: Date;
  candidates: Candidate[];
  regions: Region[];
  updates: Update[];
}

export default function ElectionResults() {
  const { loading, error, fetchResults } = useVote();
  const [results, setResults] = useState<Results | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   const fetchAndSetResults = () => {
  //     const sub: Subscription = fetchResults().subscribe({
  //       next: (data: ElectionResults) => {
  //         const totalVotes = data.candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
  //         const transformedData: Results = {
  //           totalVotes,
  //           percentageCounted: data.totalRegisteredVoters
  //             ? Number.parseFloat(((totalVotes / data.totalRegisteredVoters) * 100).toFixed(1))
  //             : 0,
  //           lastUpdated: new Date(),
  //           candidates: data.candidates.map((c, idx) => ({
  //             id: Number(c.candidateId),
  //             name: c.name || "Unknown Candidate",
  //             party: c.party || "Independent",
  //             votes: c.votes || 0,
  //             percentage:
  //               totalVotes > 0
  //                 ? Number.parseFloat(((c.votes / totalVotes) * 100).toFixed(1))
  //                 : 0,
  //             color: ["#8b5cf6", "#14b8a6", "#f59e0b", "#ef4444"][idx % 4],
  //             change: 0,
  //           })),
  //           regions:
  //             data.districts?.length > 0
  //               ? data.districts.map((d, idx) => {
  //                   const districtResults = data.districtResults?.[d.id] || {};
  //                   const winner = data.candidates.reduce((prev, curr) => {
  //                     const prevVotes = districtResults[prev.candidateId] || 0;
  //                     const currVotes = districtResults[curr.candidateId] || 0;
  //                     return currVotes > prevVotes ? curr : prev;
  //                   }, data.candidates[0]);
  //                   return {
  //                     id: idx + 1,
  //                     name: d.name,
  //                     winner: winner.name || "Unknown",
  //                     color:
  //                       ["#8b5cf6", "#14b8a6", "#f59e0b", "#ef4444"][
  //                         data.candidates.findIndex((c) => c.candidateId === winner.candidateId) % 4
  //                       ],
  //                     counted:
  //                       totalVotes > 0
  //                         ? Number.parseFloat(
  //                             (
  //                               (Object.values(districtResults).reduce(
  //                                 (sum, votes) => sum + votes,
  //                                 0
  //                               ) /
  //                                 totalVotes) *
  //                               100
  //                             ).toFixed(1)
  //                           )
  //                         : 0,
  //                   };
  //                 })
  //               : [],
  //           updates: [
  //             {
  //               id: 1,
  //               time: "2 minutes ago",
  //               text: `${data.districts?.[0]?.name || "Department"} Voting has Commenced`,
  //             },
  //             {
  //               id: 2,
  //               time: "8 minutes ago",
  //               text: `${data.candidates[0]?.name || "Candidate"} takes lead`,
  //             },
  //           ],
  //         };
  //         setResults(transformedData);
  //       },
  //       error: (err) => console.error("Failed to fetch results:", err),
  //     });

  //     return sub;
  //   };

  //   const initialSub = fetchAndSetResults();

  //   const interval = setInterval(() => {
  //     setRefreshing(true);
  //     const sub = fetchAndSetResults();
  //     setTimeout(() => setRefreshing(false), 1000);
  //     setTimeout(() => sub.unsubscribe(), 4500);
  //   }, 5000000);

  //   return () => {
  //     initialSub.unsubscribe();
  //     clearInterval(interval);
  //   };
  // }, [fetchResults]); 

  useEffect(() => {
    const fetchAndSetResults = () => {
      const sub: Subscription = fetchResults().subscribe({
        next: (data: ElectionResults) => {
          const totalVotes = data.candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
          const transformedData: Results = {
            totalVotes,
            percentageCounted: data.totalRegisteredVoters
              ? Number.parseFloat(((totalVotes / data.totalRegisteredVoters) * 100).toFixed(1))
              : 0,
            lastUpdated: new Date(),
            candidates: data.candidates.map((c, idx) => ({
              id: Number(c.candidateId),
              name: c.name || "Unknown Candidate",
              party: c.party || "Independent",
              votes: c.votes || 0,
              percentage:
                totalVotes > 0
                  ? Number.parseFloat(((c.votes / totalVotes) * 100).toFixed(1))
                  : 0,
              color: ["#8b5cf6", "#14b8a6", "#f59e0b", "#ef4444"][idx % 4],
              change: 0,
            })),
            regions:
              data.districts?.length > 0
                ? data.districts.map((d, idx) => {
                    const districtResults = data.districtResults?.[d.id] || {};
                    const winner = data.candidates.reduce((prev, curr) => {
                      const prevVotes = districtResults[prev.candidateId] || 0;
                      const currVotes = districtResults[curr.candidateId] || 0;
                      return currVotes > prevVotes ? curr : prev;
                    }, data.candidates[0]);
                    return {
                      id: idx + 1,
                      name: d.name,
                      winner: winner.name || "Unknown",
                      color:
                        ["#8b5cf6", "#14b8a6", "#f59e0b", "#ef4444"][
                          data.candidates.findIndex((c) => c.candidateId === winner.candidateId) % 4
                        ],
                      counted:
                        totalVotes > 0
                          ? Number.parseFloat(
                              (
                                (Object.values(districtResults).reduce(
                                  (sum, votes) => sum + votes,
                                  0
                                ) /
                                  totalVotes) *
                                100
                              ).toFixed(1)
                            )
                          : 0,
                    };
                  })
                : [],
            updates: [
              {
                id: 1,
                time: "2 minutes ago",
                text: `${data.districts?.[0]?.name || "Department"} Voting has Commenced`,
              },
              {
                id: 2,
                time: "8 minutes ago",
                text: `${data.candidates[0]?.name || "Candidate"} takes lead`,
              },
            ],
          };
          setResults(transformedData);
        },
        error: (err) => console.error("Failed to fetch results:", err),
      });

      return sub;
    };

    const initialSub = fetchAndSetResults();

    const interval = setInterval(() => {
      setRefreshing(true);
      const sub = fetchAndSetResults();
      setTimeout(() => setRefreshing(false), 1000);
      setTimeout(() => sub.unsubscribe(), 4500);
    }, 5000000);

    return () => {
      initialSub.unsubscribe();
      clearInterval(interval);
    };
  }, []); 

  if (loading && !results) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !results) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  if (!results) return null;

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      <Container sx={{ maxWidth: "7xl", px: 4, py: 8 }}>
        {/* Header */}
        <Box component="header" sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "grey.900", mb: 2 }}>
            {`${new Date().getFullYear()} Departmental Election Results`}
          </Typography>

          {/* Metadata */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              color: "grey.500",
              fontSize: "0.875rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <BarChartIcon fontSize="small" />
              <Typography variant="body2">{formatNumber(results.totalVotes)} votes counted</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">Last updated: {results.lastUpdated.toLocaleTimeString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <RefreshIcon fontSize="small" className={refreshing ? "refreshing" : ""} />
              <Typography variant="body2">Live updates</Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            {
              title: "Total Votes",
              value: formatNumber(results.totalVotes),
            },
            {
              title: "Percentage Counted",
              value: `${results.percentageCounted}%`,
              progress: results.percentageCounted,
            },
            {
              title: "Estimated Completion",
              value: results.percentageCounted < 90 ? "In progress" : "Final count soon",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
                <CardContent sx={{ p: 6 }}>
                  <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: item.progress ? "flex-end" : "center", gap: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {item.value}
                    </Typography>
                    {item.progress && (
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          width: "100%",
                          height: 10,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": { bgcolor: "blue.600" },
                          mb: 2,
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Candidate Results */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "grey.900", mb: 4 }}>
          Candidate Results
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 8 }}>
          {results.candidates.map((candidate) => (
            <Card key={candidate.id} sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {candidate.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {candidate.party}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {candidate.percentage}%
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                      {candidate.change > 0 ? (
                        <ArrowUpwardIcon sx={{ fontSize: "1rem", color: "green.500" }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ fontSize: "1rem", color: "red.500" }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ color: candidate.change > 0 ? "green.500" : "red.500" }}
                      >
                        {Math.abs(candidate.change)}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: "grey.700", mb: 2 }}>
                  {formatNumber(candidate.votes)} votes
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={candidate.percentage}
                  sx={{
                    height: 16,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": { bgcolor: candidate.color },
                    borderRadius: 9999,
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Regional Results and Updates */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "grey.900", mb: 4 }}>
              Department Level Results
            </Typography>
            <Card sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                {results.regions.map((region, index) => (
                  <Box key={region.id}>
                    {index > 0 && <Divider />}
                    <Box sx={{ display: "flex", justifyContent: "space-between", py: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationOnIcon sx={{ fontSize: "1rem", color: "grey.500" }} />
                        <Typography variant="body1">{region.name}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: region.color, borderRadius: "50%" }} />
                        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                          {region.winner}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "grey.500" }}>
                          ({region.counted}%)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Updates */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "grey.900", mb: 4 }}>
              Latest Updates
            </Typography>
            <Card sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                {results.updates.map((update, index) => (
                  <Box key={update.id}>
                    {index > 0 && <Divider />}
                    <Box sx={{ py: 3 }}>
                      <Typography variant="body1" sx={{ fontWeight: "medium", mb: 1 }}>
                        {update.text}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "grey.500" }}>
                        {update.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Rotation Animation */}
      <style jsx global>{`
        .refreshing {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
}