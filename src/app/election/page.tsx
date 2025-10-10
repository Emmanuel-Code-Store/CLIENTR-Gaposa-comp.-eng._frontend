"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Card,
  CardContent,
  Divider,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import ElectionHeader from "@/components/ElectionHeader";
import ElectionFooter from "@/components/ElectionFooter";
import ElectionResults from "@/components/ElectionResults";
import { useUser, User } from "@/hooks/useUser";

export default function ElectionHome() {
  const { fetchStaffCleared, fetchStudentCleared, fetchParentCleared, fetchAlumniCleared } =
    useUser();

  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchAllCleared = async () => {
  //     const staff = await fetchStaffCleared();
  //     const students = await fetchStudentCleared();
  //     const parents = await fetchParentCleared();
  //     const alumni = await fetchAlumniCleared();

  //     setUsers([...staff, ...students, ...parents, ...alumni]);
  //   };
  //   fetchAllCleared();
  // }, [fetchStaffCleared, fetchStudentCleared, fetchParentCleared, fetchAlumniCleared]); 

useEffect(() => {
    const fetchAllCleared = async () => {
      const staff = await fetchStaffCleared();
      const students = await fetchStudentCleared();
      const parents = await fetchParentCleared();
      const alumni = await fetchAlumniCleared();

      setUsers([...staff, ...students, ...parents, ...alumni]);
    };
    fetchAllCleared();
  }, []); 

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers([]);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const matches = users.filter(
      (u) =>
        u.fullname?.toLowerCase().includes(lower) ||
        u.email?.toLowerCase().includes(lower) ||
        u.userId.toLowerCase().includes(lower)
    );
    setFilteredUsers(matches.slice(0, 8));
  }, [searchTerm, users]);

  const handleFaqToggle = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const votingResources = [
    { title: "Registration", description: "Register and get accredited now.", img: "/images/register_vote.jpg" },
    { title: "Protect your Vote", description: "Protect your Vote Now.", img: "/images/secure_vote.png" },
    { title: "Candidate Campaign Info", description: "Who are you voting for?", img: "/images/campaign_election.jpg" },
    { title: "Election and Result Audits", description: "We collate and announce election results.", img: "/images/election_audits.png" },
    { title: "Election Calendars", description: "We announce election, collation, and result days.", img: "/images/election_calendar.avif" },
    { title: "Election Laws", description: "Rules and Laws guiding election process.", img: "/images/election_law.png" },
  ];

  const faqs = [
    { question: "How to navigate", answer: "Follow the instructions on our website to navigate the voting process." },
    { question: "Registering Vote", answer: "Ensure you are registered and accredited before the election date." },
    { question: "Voting Procedure during Covid-19", answer: "Follow safety protocols, including wearing masks and maintaining distance." },
  ];

  return (
    <Box>
      <ElectionHeader />

      <Box sx={{ bgcolor: "#3f51b5", py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700, mb: 3 }}>
                Early Voting is Open to all
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
                On October 5 2024, all registered voters in the Computer Engineering Department will receive ballots by mail that can be returned or delivered in person.
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff", mb: 4 }}>
                Search your name to confirm if registered and accredited.
              </Typography>

              {/* Search input */}
              <Box sx={{ position: "relative" }}>
                <TextField
                  placeholder="Search your name"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                  }}
                />
                {filteredUsers.length > 0 && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 10,
                      maxHeight: 250,
                      overflowY: "auto",
                    }}
                  >
                    <List>
                      {filteredUsers.map((u) => (
                        <ListItem key={u.userId} disablePadding>
                          <ListItemButton onClick={() => setSearchTerm(u.fullname || u.email || u.userId)}>
                            <ListItemText primary={u.fullname || u.email} secondary={u.roleName} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/election.png"
                alt="Election cartoon"
                sx={{
                  width: "100%",
                  maxHeight: 500,
                  borderRadius: "3rem 3rem 2rem 6rem",
                  objectFit: "cover",
                  boxShadow: 5,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ElectionResults />

      <Container sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Voting Resources
        </Typography>
        <Typography variant="body1" gutterBottom>
          Learn how to vote, where to vote, what you&apos;ll be voting on, and more.
        </Typography>

        <Divider
          sx={{
            my: 4,
            height: 10,
            backgroundImage: "linear-gradient(to right, #a855f7, #ec4899)",
            border: "none",
            borderRadius: "9999px",
          }}
        />
        <Grid container spacing={3}>
          {votingResources.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", p: 2, textAlign: "center", boxShadow: 3 }}>
                <CardContent>
                  <Box component="img" src={item.img} alt={item.title} sx={{ width: 200, height: 150, mb: 2, borderRadius: "20px" }} />
                  <Typography variant="h6" fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box id="faq" sx={{ py: 8, bgcolor: "#f5f5f5" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" gutterBottom>
            Learn how to vote, where to vote, what you&apos;ll be voting on, and more.
          </Typography>

          {faqs.map((item, index) => (
            <Box key={index} sx={{ my: 3 }}>
              <Divider
                sx={{
                  height: 8,
                  backgroundImage: "linear-gradient(to right, #a855f7, #ec4899)",
                  border: "none",
                  borderRadius: "9999px",
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Box component="img" src="/images/faq-logo.avif" alt={item.question} sx={{ width: 40, height: 40, mr: 2, borderRadius: "20px" }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {item.question}
                </Typography>
                <IconButton onClick={() => handleFaqToggle(index)}>
                  <ExpandMoreIcon
                    sx={{
                      transform: faqOpen === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.3s",
                    }}
                  />
                </IconButton>
              </Box>
              {faqOpen === index && (
                <Box sx={{ mt: 1, ml: 6 }}>
                  <Typography variant="body2">{item.answer}</Typography>
                </Box>
              )}
              <Divider
                sx={{
                  height: 8,
                  mt: 3,
                  backgroundImage: "linear-gradient(to right, #a855f7, #ec4899)",
                  border: "none",
                  borderRadius: "9999px",
                }}
              />
            </Box>
          ))}
        </Container>
      </Box>

      <ElectionFooter />
    </Box>
  );
}
