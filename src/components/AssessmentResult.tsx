"use client"

import { useSearchParams } from "next/navigation"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Chip,
  Divider,
} from "@mui/material"
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react"
import Link from "next/link"

const subjects = {
  1: "Mathematics",
  2: "Physics",
  3: "Chemistry",
  4: "Biology",
  5: "Computer Science",
  6: "English Literature",
}

export default function AssessmentResult() {
  const searchParams = useSearchParams()
  const subjectId = searchParams.get("subject")
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "0")

  const percentage = Math.round((score / total) * 100)
  const subject = subjects[Number.parseInt(subjectId || "1") as keyof typeof subjects]

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: "A+", color: "#16a34a" }
    if (percentage >= 80) return { grade: "A", color: "#22c55e" }
    if (percentage >= 70) return { grade: "B+", color: "#3b82f6" }
    if (percentage >= 60) return { grade: "B", color: "#60a5fa" }
    if (percentage >= 50) return { grade: "C", color: "#eab308" }
    return { grade: "F", color: "#ef4444" }
  }

  const { grade, color } = getGrade(percentage)

  return (
     <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
   
      <Card sx={{ width: "100%", maxWidth: 800, margin:'auto' }}>
        <CardHeader
          title={
            <Box textAlign="center">
              <Trophy size={64} color="#eab308" />
              <Typography variant="h4" fontWeight="bold" mt={1}>
                Examination Results
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {subject}
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box textAlign="center">
            <Typography variant="h2" fontWeight="bold" color="text.primary">
              {percentage}%
            </Typography>
            <Chip
              label={`Grade: ${grade}`}
              sx={{
                mt: 1,
                fontSize: "1rem",
                backgroundColor: color,
                color: "#fff",
                px: 2,
                py: 1,
              }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: "center", pt: 3 }}>
                  <CheckCircle size={32} color="#22c55e" />
                  <Typography variant="h5" fontWeight="bold" color="success.main" mt={1}>
                    {score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Correct Answers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: "center", pt: 3 }}>
                  <XCircle size={32} color="#ef4444" />
                  <Typography variant="h5" fontWeight="bold" color="error.main" mt={1}>
                    {total - score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Incorrect Answers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box
            textAlign="center"
            p={2}
            sx={{
              backgroundColor: "#f9fafb",
              borderRadius: 2,
            }}
          >
            {percentage >= 80 ? (
              <Typography color="success.main" fontWeight="medium">
                🎉 Excellent performance! You have demonstrated strong understanding of the subject.
              </Typography>
            ) : percentage >= 60 ? (
              <Typography color="primary.main" fontWeight="medium">
                👍 Good job! You have a solid grasp of the material with room for improvement.
              </Typography>
            ) : (
              <Typography color="error.main" fontWeight="medium">
                📚 Keep studying! Consider reviewing the material and taking the exam again.
              </Typography>
            )}
          </Box>

          <Box display="flex" justifyContent="center" gap={2}>
            <Link href="/" passHref>
              <Button variant="outlined" startIcon={<RotateCcw size={16} />}>
                Take Another Exam
              </Button>
            </Link>
            <Link href={`/exam/${subjectId}`} passHref>
              <Button variant="contained" startIcon={<RotateCcw size={16} />}>
                Retake This Exam
              </Button>
            </Link>
          </Box>

          <Divider />
          <Grid container spacing={2} textAlign="center">
            <Grid item xs={4}>
              <Typography fontWeight="bold">Total Questions</Typography>
              <Typography color="text.secondary">{total}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Time Taken</Typography>
              <Typography color="text.secondary">Completed</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Accuracy</Typography>
              <Typography color="text.secondary">{percentage}%</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
