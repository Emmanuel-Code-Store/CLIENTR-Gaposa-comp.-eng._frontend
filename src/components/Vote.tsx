"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Tabs,
  Tab,
  Stack,
  useTheme,
  Paper,
  IconButton,
  Button,
  styled,
} from "@mui/material"
import {
  Settings,
  User,
  BarChart,
} from "lucide-react"

import FaceIdVoteAuthentication from "@/components/FaceIdVoteAuthentication"
import FingerprintAuthentication from "@/components/FingerprintAuthentication"
import { VotingIdForm } from "@/components/VotingIdForm"
import { BallotSection } from "@/components/BallotSection"
import { ResultsSection } from "@/components/ResultSection"
import { Fingerprint, Face, CreditCard } from "@mui/icons-material"

type AuthMethod = "face" | "thumbprint" | "votingId" | null
type AppState = "auth" | "voting" | "results"

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}))

export default function Vote() {
  const theme = useTheme()
  const [authMethod, setAuthMethod] = useState<AuthMethod>("face")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [appState, setAppState] = useState<AppState>("auth")
  const [votedFor, setVotedFor] = useState<string | null>(null)
  
  console.log(isAuthenticated);

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    setAppState("voting")
  }

  const handleVote = (candidate: string) => {
    setVotedFor(candidate)
    setAppState("results")
  }

  const resetApp = () => {
    setAuthMethod("face")
    setIsAuthenticated(false)
    setAppState("auth")
    setVotedFor(null)
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 2 }}>
      {/* Top bar */}
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <IconButton>
          <Settings size={20} />
        </IconButton>
        <IconButton>
          <User size={20} />
        </IconButton>
      </Box>


      {/* Card */}
      <Card
        sx={{
          mx: "auto",
          borderRadius: 4,
          boxShadow: 6,
          background: "linear-gradient(to right, #ffffff, #f0f4ff)",
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" fontWeight={600} color="primary" gutterBottom>
            {appState === "auth" && "🔐 Voter Authentication"}
            {appState === "voting" && "🗳️ Cast Your Vote"}
            {appState === "results" && "Vote Confirmation"}
          </Typography>

          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            {appState === "auth" && "Please authenticate using one of the methods below"}
            {appState === "voting" && "Select a candidate to vote for"}
            {appState === "results" && "Thank you for voting. Your choice has been recorded."}
          </Typography>
        </CardContent>

        <CardContent>
          {appState === "auth" && (
            <Stack spacing={3}>
              <Paper elevation={3} sx={{ borderRadius: 3 }}>
                <Tabs
                  value={authMethod}
                  onChange={(_, newValue) => setAuthMethod(newValue)}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    backgroundColor: "#e3f2fd",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <Tab
                    label="Face"
                    value="face"
                    icon={<Face sx={{ color: "#1976d2" }} />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Thumbprint"
                    value="thumbprint"
                    icon={<Fingerprint sx={{ color: "#388e3c" }} />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Voting ID"
                    value="votingId"
                    icon={<CreditCard sx={{ color: "#f57c00" }} />}
                    iconPosition="start"
                  />
                </Tabs>
              </Paper>

              <Box sx={{ p: 2 }}>
                {authMethod === "face" && (
                  <FaceIdVoteAuthentication
                    onAuthenticated={handleAuthenticated}
                  />
                )}
                {authMethod === "thumbprint" && (
                  <FingerprintAuthentication
                    onBack={() => { }}
                    onAuthenticated={handleAuthenticated}
                  />
                )}
                {authMethod === "votingId" && (
                  <VotingIdForm onAuthenticated={handleAuthenticated} />
                )}
              </Box>
            </Stack>
          )}

          {appState === "voting" && (
            <Box sx={{ p: 2 }}>
              <BallotSection onVote={handleVote} />
            </Box>
          )}

          {appState === "results" && (
            <Box sx={{ p: 2 }}>
              <ResultsSection votedFor={votedFor} />
            </Box>
          )}
        </CardContent>

        {appState === "results" && (
          <CardActions sx={{ justifyContent: "center", pb: 2 }}>
            <ActionButton
              onClick={resetApp}
              startIcon={<BarChart size={18} />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1,
                fontWeight: "bold",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              View Result
            </ActionButton>
          </CardActions>
        )}
      </Card>
    </Box>
  )
}
