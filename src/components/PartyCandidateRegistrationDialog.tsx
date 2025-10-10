import React, { useState, useEffect, FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useElection } from "@/hooks/useElection";
import { useElectionPost } from "@/hooks/useElectionPost";
import { useParty } from "@/hooks/useParty";
import { useUser } from "@/hooks/useUser";
import { usePartyPostCandidate, CreatePartyPostCandidateDto } from "@/hooks/usePartyPostCandidate";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

interface PartyPostCandidateDialogRegistrationProps {
  open: boolean;
  onClose: () => void;
}

const PartyPostCandidateDialogRegistration: FC<PartyPostCandidateDialogRegistrationProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    post: "",
    party: "",
    candidate: "",
    election: "",
  });

  const [posts, setPosts] = useState<{ post_uuid: string; postName: string }[]>([]);
  const [parties, setParties] = useState<{ partyId: string; partyName: string }[]>([]);
  const [candidates, setCandidates] = useState<{ userId: string; fullname: string }[]>([]);
  const [elections, setElections] = useState<{ election_uuid: string; name: string }[]>([]);

  const { fetchElectionPosts } = useElectionPost();
  const { fetchElections } = useElection();
  const { fetchParties } = useParty();
  const { fetchAllUsers } = useUser();
  const { createPartyPostCandidate, loading } = usePartyPostCandidate();
  
  useEffect(() => {
    if (open) {
      fetchElections().subscribe({
        next: (data) => setElections(data.map((election) => ({
          election_uuid: election.election_uuid,
          name: election.name,
        }))),
        error: (err) => {
          console.error("Error fetching elections:", err);
          toastr.error("Failed to fetch elections.");
        },
      });

      fetchElectionPosts().subscribe({
        next: (data) => setPosts(data.map((post) => ({
          post_uuid: post.post_uuid,
          postName: post.postName,
        }))),
        error: (err) => {
          console.error("Error fetching election posts:", err);
          toastr.error("Failed to fetch election posts.");
        },
      });

      fetchParties().subscribe({
        next: (data) => setParties(data.map((party) => ({
          partyId: party.partyId,
          partyName: party.partyName,
        }))),
        error: (err) => {
          console.error("Error fetching parties:", err);
          toastr.error("Failed to fetch parties.");
        },
      });

      fetchAllUsers()
        .then((users) => {
          setCandidates(users.map((user) => ({
            userId: user.userId,
            fullname: user.fullname || "Unnamed Candidate",
          })));
        })
        .catch((err) => {
          console.error("Error fetching candidates:", err);
          toastr.error("Failed to fetch candidates.");
        });
    }
  }, [open]);


  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const payload: CreatePartyPostCandidateDto = {
      postId: formData.post,
      partyId: formData.party,
      candidateId: formData.candidate,
      electionId: formData.election,
    };

    createPartyPostCandidate(payload).subscribe({
      next: () => {
        toastr.success("Party Post Candidate registered successfully.");
        onClose();
      },
      error: (err) => {
        console.error("Error registering Party Post Candidate:", err);
        toastr.error("Failed to register Party Post Candidate.", err.message || "Unknown Error");
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Party Post Candidate</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {/* Post */}
          <FormControl fullWidth required>
            <InputLabel>Post</InputLabel>
            <Select label="Post" name="post" value={formData.post} onChange={handleChange}>
              {posts.map((post) => (
                <MenuItem key={post.post_uuid} value={post.post_uuid}>
                  {post.postName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Party */}
          <FormControl fullWidth required>
            <InputLabel>Party</InputLabel>
            <Select label="Party" name="party" value={formData.party} onChange={handleChange}>
              {parties.map((party) => (
                <MenuItem key={party.partyId} value={party.partyId}>
                  {party.partyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Candidate */}
          <FormControl fullWidth required>
            <InputLabel>Candidate</InputLabel>
            <Select label="Candidate" name="candidate" value={formData.candidate} onChange={handleChange}>
              {candidates.map((candidate) => (
                <MenuItem key={candidate.userId} value={candidate.userId}>
                  {candidate.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Election */}
          <FormControl fullWidth required>
            <InputLabel>Election</InputLabel>
            <Select label="Election" name="election" value={formData.election} onChange={handleChange}>
              {elections.map((election) => (
                <MenuItem key={election.election_uuid} value={election.election_uuid}>
                  {election.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartyPostCandidateDialogRegistration;