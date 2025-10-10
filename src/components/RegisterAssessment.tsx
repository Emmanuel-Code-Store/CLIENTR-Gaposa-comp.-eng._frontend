"use client"

import { useState } from "react"
import {
  Typography,
  Button,
  Tabs as MuiTabs,
  Tab,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  IconButton,
  Badge as MuiBadge,
  Grid,
  Chip,
  ButtonGroup,
  InputAdornment,
  styled,
} from "@mui/material"
import { Add, Edit, Delete, BarChart, School, Quiz } from "@mui/icons-material"
import {
  Search,
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
} from "lucide-react"

interface Question {
  id: number
  subject: string
  question: string
  options: string[]
  correct: number
  difficulty: string
}

const initialQuestions: Question[] = [
  {
    id: 1,
    subject: "Mathematics",
    question: "What is the derivative of x²?",
    options: ["2x", "x²", "2", "x"],
    correct: 0,
    difficulty: "Medium",
  },
  {
    id: 2,
    subject: "Mathematics",
    question: "Solve for x: 2x + 5 = 13",
    options: ["4", "6", "8", "3"],
    correct: 0,
    difficulty: "Easy",
  },
  {
    id: 3,
    subject: "Physics",
    question: "What is Newton's second law of motion?",
    options: ["F = ma", "E = mc²", "v = u + at", "s = ut + ½at²"],
    correct: 0,
    difficulty: "Medium",
  },
]

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English Literature"]
const difficulties = ["Easy", "Medium", "Hard"]

export default function AdminDashboard() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [editing, setEditing] = useState<Question | null>(null)
  const [tab, setTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    subject: "",
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    difficulty: "Medium",
  })

  const handleAdd = () => {
    if (!newQuestion.subject || !newQuestion.question || newQuestion.options?.some((o) => o === "")) return
    const question: Question = {
      id: Date.now(),
      subject: newQuestion.subject,
      question: newQuestion.question,
      options: newQuestion.options!,
      correct: newQuestion.correct || 0,
      difficulty: newQuestion.difficulty || "Medium",
    }
    setQuestions([...questions, question])
    setNewQuestion({ subject: "", question: "", options: ["", "", "", ""], correct: 0, difficulty: "Medium" })
  }

  const handleSaveEdit = () => {
    if (!editing) return
    setQuestions(questions.map((q) => (q.id === editing.id ? editing : q)))
    setEditing(null)
  }

  const getSubjectStats = () => {
    return subjects.map((s) => ({
      subject: s,
      count: questions.filter((q) => q.subject === s).length,
    }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const ActionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  }))

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Register Question
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          <span>Session 2025/2026</span>
          <ChevronRight size={16} />
          <span>Assessment</span>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <ButtonGroup size="small">
          <ActionButton startIcon={<Copy size={16} />}>Copy</ActionButton>
          <ActionButton startIcon={<FileText size={16} />}>CSV</ActionButton>
          <ActionButton startIcon={<FileSpreadsheet size={16} />}>Excel</ActionButton>
          <ActionButton startIcon={<FilePdf size={16} />}>PDF</ActionButton>
          <ActionButton startIcon={<Printer size={16} />}>Print</ActionButton>
        </ButtonGroup>

        <TextField
          size="small"
          placeholder="Search staff"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        <MuiTabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab icon={<School />} label="Subjects" />
          <Tab icon={<Quiz />} label="Questions" />
          <Tab icon={<BarChart />} label="Analytics" />
        </MuiTabs>

        {/* Questions Tab */}
        {tab === 1 && (
          <Box>
            {/* Edit form */}
            {editing && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6">Edit Question</Typography>
                  <TextField
                    fullWidth
                    label="Question"
                    value={editing.question}
                    onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  {editing.options.map((opt, i) => (
                    <TextField
                      key={i}
                      fullWidth
                      label={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const opts = [...editing.options]
                        opts[i] = e.target.value
                        setEditing({ ...editing, options: opts })
                      }}
                      sx={{ mb: 1 }}
                    />
                  ))}
                  <Button variant="contained" onClick={handleSaveEdit} sx={{ mr: 2 }}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => setEditing(null)}>
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            )}

            <Typography variant="h6" gutterBottom>
              Add New Question
            </Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Subject"
                  value={newQuestion.subject}
                  onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                >
                  {subjects.map((subj) => (
                    <MenuItem key={subj} value={subj}>
                      {subj}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Difficulty"
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                >
                  {difficulties.map((diff) => (
                    <MenuItem key={diff} value={diff}>
                      {diff}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Question"
                  multiline
                  rows={2}
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                />
              </Grid>
              {newQuestion.options?.map((opt, i) => (
                <Grid item xs={6} key={i}>
                  <TextField
                    fullWidth
                    label={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const opts = [...newQuestion.options!]
                      opts[i] = e.target.value
                      setNewQuestion({ ...newQuestion, options: opts })
                    }}
                  />
                  <Button
                    size="small"
                    color={newQuestion.correct === i ? "primary" : "inherit"}
                    onClick={() => setNewQuestion({ ...newQuestion, correct: i })}
                  >
                    Mark Correct
                  </Button>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button startIcon={<Add />} variant="contained" onClick={handleAdd}>
                  Save Question
                </Button>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
              Question List
            </Typography>
            <Grid container spacing={2}>
              {questions.map((q) => (
                <Grid item xs={12} md={6} key={q.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{q.subject}</strong> | {q.difficulty}
                      </Typography>
                      <Typography>{q.question}</Typography>
                      <Box mt={1}>
                        {q.options.map((opt, idx) => (
                          <Chip
                            key={idx}
                            label={opt}
                            color={q.correct === idx ? "success" : "default"}
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                      <Box mt={2}>
                        <IconButton onClick={() => setEditing(q)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => setQuestions(questions.filter((x) => x.id !== q.id))}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Subjects Tab */}
        {tab === 0 && (
          <Box mt={3}>
            <Typography variant="h6">Subjects</Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
              {getSubjectStats()
                .filter((s) => s.count > 0)
                .map((s) => (
                  <MuiBadge key={s.subject} badgeContent={s.count} color="primary">
                    <Chip label={s.subject} variant="outlined" />
                  </MuiBadge>
                ))}
            </Box>
          </Box>
        )}

        {/* Analytics Tab */}
        {tab === 2 && (
          <Box mt={3}>
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body1" mt={2}>
              Total Questions: {questions.length}
            </Typography>
            <Typography variant="body1" mt={1}>
              Subjects Covered: {getSubjectStats().filter((s) => s.count > 0).length}
            </Typography>
            <Typography variant="body1" mt={1}>
              Easy: {questions.filter((q) => q.difficulty === "Easy").length} | Medium:{" "}
              {questions.filter((q) => q.difficulty === "Medium").length} | Hard:{" "}
              {questions.filter((q) => q.difficulty === "Hard").length}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
