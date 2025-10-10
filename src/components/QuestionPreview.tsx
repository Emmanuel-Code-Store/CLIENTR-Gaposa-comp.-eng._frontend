"use client"

import { useState } from "react"
import {
  Plus,
  ChevronRight,
  Eye,
  Settings,
  Search,
} from "lucide-react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  IconButton,
  styled,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"
import Grid2 from "@mui/material/Grid2"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderColor: theme.palette.grey[200],
  "&.header": {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}))

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& + &": {
    marginLeft: theme.spacing(1),
  },
}))

interface Question {
  id: number
  subject: string
  question: string
  options: string[]
  correct: number
  difficulty: string
}

interface DisplayQuestion extends Question {
  pins: string[]
  name: string
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

export default function QuestionPreview() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    subject: "",
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    difficulty: "Medium",
  })

  const getDisplayQuestions = (): DisplayQuestion[] =>
    questions.map((q) => ({
      ...q,
      pins: Array(7).fill("Pin"),
      name: q.subject,
    }))

  const handleAddQuestion = () => {
    if (newQuestion.subject && newQuestion.question && newQuestion.options?.every((opt) => opt.trim())) {
      const question: Question = {
        id: Date.now(),
        subject: newQuestion.subject!,
        question: newQuestion.question!,
        options: newQuestion.options!,
        correct: newQuestion.correct || 0,
        difficulty: newQuestion.difficulty || "Medium",
      }
      setQuestions([...questions, question])
      setNewQuestion({ subject: "", question: "", options: ["", "", "", ""], correct: 0, difficulty: "Medium" })
      setIsAddingQuestion(false)
    }
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Subject Question Preview
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem" }}>
          <span>Session 2019/2020</span>
          <ChevronRight size={16} />
          <span>First</span>
          <ChevronRight size={16} />
          <span>SS2</span>
          <ChevronRight size={16} />
        </Box>
      </Box>

      {/* Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Showing</Typography>
          <Select size="small" value={10} sx={{ minWidth: 80 }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography variant="body2">Entries</Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200", mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Array(7)
                .fill("Pin")
                .map((header, index) => (
                  <StyledTableCell key={index} className="header">
                    {header}
                  </StyledTableCell>
                ))}
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header" align="right">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getDisplayQuestions().map((question, index) => (
              <TableRow
                key={question.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(244, 114, 182, 0.1)",
                  },
                }}
              >
                {question.pins.map((pin: string, pinIndex: number) => (
                  <StyledTableCell
                    key={pinIndex}
                    sx={{
                      color: index % 2 === 0 ? "pink.500" : "success.main",
                    }}
                  >
                    {pin}
                  </StyledTableCell>
                ))}
                <StyledTableCell>{question.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <ActionIconButton size="small">
                    <Eye size={16} />
                  </ActionIconButton>
                  <ActionIconButton size="small">
                    <Settings size={16} />
                  </ActionIconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Question UI */}
      <Box p={4}>
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Question Management</Typography>
            <Button onClick={() => setIsAddingQuestion(true)} startIcon={<Plus size={16} />}>
              Add Question
            </Button>
          </Box>

          {isAddingQuestion && (
            <Card sx={{ mt: 2 }}>
              <CardHeader title="Add New Question" />
              <CardContent>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Subject</InputLabel>
                      <Select
                        value={newQuestion.subject}
                        onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                      >
                        {subjects.map((subject) => (
                          <MenuItem key={subject} value={subject}>
                            {subject}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Difficulty</InputLabel>
                      <Select
                        value={newQuestion.difficulty}
                        onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                      >
                        {difficulties.map((d) => (
                          <MenuItem key={d} value={d}>
                            {d}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      label="Question"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    />
                  </Grid2>

                  {newQuestion.options?.map((opt, index) => (
                    <Grid2 size={{ xs: 12 }} key={index}>
                      <TextField
                        fullWidth
                        label={`Option ${index + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...(newQuestion.options || [])]
                          updated[index] = e.target.value
                          setNewQuestion({ ...newQuestion, options: updated })
                        }}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button onClick={() => setIsAddingQuestion(false)}>Cancel</Button>
                <Button onClick={handleAddQuestion} variant="contained">
                  Save
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  )
}