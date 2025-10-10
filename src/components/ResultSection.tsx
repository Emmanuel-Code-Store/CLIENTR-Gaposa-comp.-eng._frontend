"use client"

import { CheckCircle } from "@mui/icons-material"
import { Box, Typography, Paper } from "@mui/material"

interface ResultsSectionProps {
  votedFor: string | null
}

const candidates = {
  candidate1: { name: "Jane Smith", party: "Progressive Party" },
  candidate2: { name: "John Doe", party: "Conservative Party" },
  candidate3: { name: "Alex Johnson", party: "Centrist Alliance" },
  candidate4: { name: "Maria Garcia", party: "Green Future" },
}

export function ResultsSection({ votedFor }: ResultsSectionProps) {
  const candidate = votedFor ? candidates[votedFor as keyof typeof candidates] : null

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, py: 6 }}>
      <CheckCircle sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Vote Successfully Cast
      </Typography>

      {candidate && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6">You voted for:</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
            {candidate.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {candidate.party}
          </Typography>
        </Box>
      )}

      <Paper sx={{ mt: 6, maxWidth: 400, mx: "auto", padding: 3, textAlign: "center", backgroundColor: "background.default" }}>
        <Typography variant="body2" color="textSecondary">
          Your vote has been securely recorded. Thank you for participating in the democratic process.
        </Typography>
      </Paper>
    </Box>
  )
}
