"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { usePartyPostCandidate, PartyPostCandidate } from "@/hooks/usePartyPostCandidate";
import { useVote } from "@/hooks/useVote";

interface BallotSectionProps {
  onVote?: (partyPostId: string) => void;
}

export function BallotSection({ onVote }: BallotSectionProps) {
  const { fetchPartyPostCandidates } = usePartyPostCandidate();
  const { castVote, loading, error: voteError } = useVote();

  const [candidates, setCandidates] = useState<PartyPostCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   const sub = fetchPartyPostCandidates().subscribe({
  //     next: (allCandidates) => {
  //       if (!allCandidates || allCandidates.length === 0) return;

  //       const latestElectionId = allCandidates
  //         .sort(
  //           (a, b) =>
  //             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //         )[0]?.election.id;

  //       const filtered = allCandidates.filter(
  //         (c) => c.election.id === latestElectionId
  //       );

  //       setCandidates(filtered);
  //     },
  //     error: (err) => {
  //       console.error("Error fetching candidates:", err);
  //       setError("Failed to load candidates. Please try again.");
  //     },
  //   });

  //   return () => sub.unsubscribe();
  // }, [fetchPartyPostCandidates]); 


  useEffect(() => {
    const sub = fetchPartyPostCandidates().subscribe({
      next: (allCandidates) => {
        if (!allCandidates || allCandidates.length === 0) return;

        const latestElectionId = allCandidates
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0]?.election.id;

        const filtered = allCandidates.filter(
          (c) => c.election.id === latestElectionId
        );

        setCandidates(filtered);
      },
      error: (err) => {
        console.error("Error fetching candidates:", err);
        setError("Failed to load candidates. Please try again.");
      },
    });

    return () => sub.unsubscribe();
  }, []); 

  const handleSubmit = () => {
    if (!selectedCandidate) {
      setError("Please select a candidate before submitting your vote");
      return;
    }

    setError("");
    setSuccess("");

    const sub = castVote({ partyPostId: selectedCandidate }).subscribe({
      next: (res) => {
        setSuccess("Your vote has been submitted successfully!");
        console.log("Vote submitted:", res);
        if (onVote) onVote(selectedCandidate);
      },
      error: (err) => {
        console.error("Error casting vote:", err);
        setError(err.message || "Failed to submit vote");
      },
    });

    return () => sub.unsubscribe();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" component="h3" sx={{ fontWeight: "medium" }}>
        Select Your Candidate
      </Typography>

      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {voteError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {voteError.message}
        </Alert>
      )}

      {success && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>
      )}

      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          value={selectedCandidate || ""}
          onChange={(event) => setSelectedCandidate(event.target.value)}
          name="candidate-selection"
        >
          <Box sx={{ display: "grid", gap: 2 }}>
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor:
                    selectedCandidate === candidate.party_post_id ? "#f0f0f0" : "transparent",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={() => setSelectedCandidate(candidate.party_post_id)}
              >
                <FormControlLabel
                  value={candidate.party_post_id}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">
                        {candidate.candidate.fullname}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {candidate.party.partyName} — {candidate.post.postName}
                      </Typography>
                    </Box>
                  }
                />
              </Card>
            ))}
          </Box>
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        fullWidth
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Vote"}
      </Button>
    </Box>
  );
}
