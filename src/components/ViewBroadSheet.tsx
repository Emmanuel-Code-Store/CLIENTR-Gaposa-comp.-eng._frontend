

'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Tabs,
  Tab,
  Chip,
  Grid,
  LinearProgress,
  Menu,
  IconButton,
  styled,
} from '@mui/material';
import {
  Download,
  Print,
  Search,
  FilterList,
  Tune,
  TableChart,
  BarChart,
  Description,
} from '@mui/icons-material';

// Type Definitions
type SubjectKey = 'Mathematics' | 'English' | 'Science' | 'SocialStudies' | 'ComputerScience';

interface SubjectScores {
  ca1: number;
  ca2: number;
  exam: number;
}

interface Student {
  id: number;
  name: string;
  regNumber: string;
  gender: string;
  subjects: Record<SubjectKey, SubjectScores>;
}

interface StudentWithTotals extends Student {
  grandTotal: number;
  average: string;
}

interface StudentWithPosition extends StudentWithTotals {
  position: number;
}

interface SubjectStats {
  average: number;
  highest: number;
  lowest: number;
  passes: number;
  failures: number;
}

type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

// Mock Data
const mockStudents: Student[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  regNumber: `REG${2023}${i + 1}`.padStart(10, '0'),
  gender: i % 2 === 0 ? 'Male' : 'Female',
  subjects: {
    Mathematics: {
      ca1: Math.floor(Math.random() * 15) + 5,
      ca2: Math.floor(Math.random() * 15) + 5,
      exam: Math.floor(Math.random() * 60) + 30,
    },
    English: {
      ca1: Math.floor(Math.random() * 15) + 5,
      ca2: Math.floor(Math.random() * 15) + 5,
      exam: Math.floor(Math.random() * 60) + 30,
    },
    Science: {
      ca1: Math.floor(Math.random() * 15) + 5,
      ca2: Math.floor(Math.random() * 15) + 5,
      exam: Math.floor(Math.random() * 60) + 30,
    },
    SocialStudies: {
      ca1: Math.floor(Math.random() * 15) + 5,
      ca2: Math.floor(Math.random() * 15) + 5,
      exam: Math.floor(Math.random() * 60) + 30,
    },
    ComputerScience: {
      ca1: Math.floor(Math.random() * 15) + 5,
      ca2: Math.floor(Math.random() * 15) + 5,
      exam: Math.floor(Math.random() * 60) + 30,
    },
  },
}));

const subjects: SubjectKey[] = [
  'Mathematics',
  'English',
  'Science',
  'SocialStudies',
  'ComputerScience',
];
const classes = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
const terms = ['First Term', 'Second Term', 'Third Term'];
const sessions = ['2022/2023', '2023/2024', '2024/2025'];

// Helper Functions
const calculateTotal = (subject: SubjectScores): number => {
  return subject.ca1 + subject.ca2 + subject.exam;
};

const calculateGrade = (total: number): Grade => {
  if (total >= 80) return 'A';
  if (total >= 70) return 'B';
  if (total >= 60) return 'C';
  if (total >= 50) return 'D';
  if (total >= 40) return 'E';
  return 'F';
};

const calculateRemark = (grade: Grade): string => {
  switch (grade) {
    case 'A':
      return 'Excellent';
    case 'B':
      return 'Very Good';
    case 'C':
      return 'Good';
    case 'D':
      return 'Fair';
    case 'E':
      return 'Pass';
    default:
      return 'Fail';
  }
};

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  '@media print': {
    boxShadow: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  marginRight: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  fontSize: '0.75rem',
}));

function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

// Main Component
export default function ViewBroadSheet() {
  const [selectedClass, setSelectedClass] = useState('JSS 1');
  const [selectedTerm, setSelectedTerm] = useState('First Term');
  const [selectedSession, setSelectedSession] = useState('2023/2024');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [activeTab, setActiveTab] = useState('broadsheet');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null);

  // Filter students based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents(mockStudents);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = mockStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.regNumber.toLowerCase().includes(query)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery]);

  // Calculate class statistics
  const classStats: Record<SubjectKey, SubjectStats> = subjects.reduce((acc, subject) => {
    const scores = mockStudents.map((student) => calculateTotal(student.subjects[subject]));
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passes = scores.filter((score) => score >= 40).length;
    const failures = scores.length - passes;

    acc[subject] = { average, highest, lowest, passes, failures };
    return acc;
  }, {} as Record<SubjectKey, SubjectStats>);

  // Calculate student totals and averages
  const studentsWithTotals: StudentWithTotals[] = mockStudents.map((student) => {
    const subjectTotals = subjects.map((subject) => calculateTotal(student.subjects[subject]));
    const grandTotal = subjectTotals.reduce((sum, total) => sum + total, 0);
    const average = grandTotal / subjects.length;

    return {
      ...student,
      grandTotal,
      average: average.toFixed(1),
    };
  });

  // Sort students by grand total and assign positions
  const sortedStudents: StudentWithTotals[] = [...studentsWithTotals].sort(
    (a, b) => b.grandTotal - a.grandTotal
  );

  const studentsWithPositions: StudentWithPosition[] = sortedStudents.map(
    (student, index, arr) => {
      let position = index + 1;
      if (index > 0 && student.grandTotal === arr[index - 1].grandTotal) {
        position = (arr[index - 1] as StudentWithPosition).position;
      }
      return {
        ...student,
        position,
      };
    }
  );

  // Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleViewClick = (event: React.MouseEvent<HTMLElement>) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFilterAnchorEl(null);
    setViewAnchorEl(null);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Academic Records
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage student scores, broadsheets, and academic performance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <StyledButton variant="outlined" startIcon={<Print />} onClick={handlePrint}>
            Print
          </StyledButton>
          <StyledButton variant="outlined" startIcon={<Download />} onClick={handleExport}>
            Export
          </StyledButton>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="class-select">Class</InputLabel>
              <Select
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="term-select">Term</InputLabel>
              <Select
                id="term-select"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                {terms.map((term) => (
                  <MenuItem key={term} value={term}>
                    {term}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="session-select">Session</InputLabel>
              <Select
                id="session-select"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                {sessions.map((session) => (
                  <MenuItem key={session} value={session}>
                    {session}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_e, newValue) => setActiveTab(newValue)}
        aria-label="score tabs"
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Tab
            label="Broadsheet"
            value="broadsheet"
            icon={<TableChart />}
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            label="Score Sheet"
            value="scoresheet"
            icon={<Description />}
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            label="Statistics"
            value="statistics"
            icon={<BarChart />}
            iconPosition="start"
            sx={{ textTransform: 'none', display: { xs: 'none', md: 'flex' } }}
          />
        </Box>

        {/* Broadsheet Tab */}
        <TabPanel value={activeTab} index="broadsheet">
          <StyledCard>
            <CardHeader
              title={
                <Typography variant="h6">
                  Class Broadsheet
                </Typography>
              }
              subheader={
                <Typography variant="body2" color="text.secondary">
                  {selectedClass} - {selectedTerm} - {selectedSession}
                </Typography>
              }
              action={
                <Box sx={{ display: 'flex', gap: 1, '@media print': { display: 'none' } }}>
                  <IconButton onClick={handleFilterClick}>
                    <FilterList />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      Filter
                    </Typography>
                  </IconButton>
                  <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={handleClose}>Show All Students</MenuItem>
                    <MenuItem onClick={handleClose}>Show Only Passed</MenuItem>
                    <MenuItem onClick={handleClose}>Show Only Failed</MenuItem>
                  </Menu>
                  <IconButton onClick={handleViewClick}>
                    <Tune />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      View
                    </Typography>
                  </IconButton>
                  <Menu
                    anchorEl={viewAnchorEl}
                    open={Boolean(viewAnchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={handleClose}>Show All Columns</MenuItem>
                    <MenuItem onClick={handleClose}>Hide CA Scores</MenuItem>
                    <MenuItem onClick={handleClose}>Show Only Totals</MenuItem>
                  </Menu>
                </Box>
              }
            />
            <CardContent>
              <TableContainer sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 80 }}>S/N</TableCell>
                      <TableCell sx={{ minWidth: 180 }}>Student Name</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Reg Number</TableCell>
                      {subjects.map((subject) => (
                        <TableCell key={subject} align="center" sx={{ minWidth: 100 }}>
                          {subject}
                        </TableCell>
                      ))}
                      <TableCell align="center" sx={{ minWidth: 80 }}>
                        Total
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 80 }}>
                        Average
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 80 }}>
                        Position
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentsWithPositions.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 'medium' }}>{student.name}</TableCell>
                        <TableCell>{student.regNumber}</TableCell>
                        {subjects.map((subject) => {
                          const total = calculateTotal(student.subjects[subject]);
                          const grade = calculateGrade(total);
                          return (
                            <TableCell key={subject} align="center">
                              {total}
                              <StyledChip
                                label={grade}
                                color={grade === 'F' ? 'error' : 'success'}
                                size="small"
                              />
                            </TableCell>
                          );
                        })}
                        <TableCell align="center" sx={{ fontWeight: 'medium' }}>
                          {student.grandTotal}
                        </TableCell>
                        <TableCell align="center">{student.average}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${student.position}${student.position === 1 ? 'st' : student.position === 2 ? 'nd' : student.position === 3 ? 'rd' : 'th'}`}
                            color={student.position <= 3 ? 'primary' : 'default'}
                            variant={student.position <= 3 ? 'filled' : 'outlined'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Class Statistics</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  Performance summary for {selectedClass} - {selectedTerm} - {selectedSession}
                </Typography>
              }
            />
            <CardContent>
              <TableContainer sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell align="center">Class Average</TableCell>
                      <TableCell align="center">Highest Score</TableCell>
                      <TableCell align="center">Lowest Score</TableCell>
                      <TableCell align="center">Pass Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjects.map((subject) => {
                      const stats = classStats[subject];
                      const passRate = ((stats.passes / (stats.passes + stats.failures)) * 100).toFixed(1);
                      return (
                        <TableRow key={subject}>
                          <TableCell sx={{ fontWeight: 'medium' }}>{subject}</TableCell>
                          <TableCell align="center">{stats.average.toFixed(1)}</TableCell>
                          <TableCell align="center">{stats.highest}</TableCell>
                          <TableCell align="center">{stats.lowest}</TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="body2"
                              color={parseFloat(passRate) < 50 ? 'error.main' : 'success.main'}
                            >
                              {passRate}%
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </TabPanel>

        {/* Score Sheet Tab */}
        <TabPanel value={activeTab} index="scoresheet">
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Score Sheet Entry</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  {selectedClass} - {selectedTerm} - {selectedSession}
                </Typography>
              }
              action={
                <FormControl sx={{ width: 180, '@media print': { display: 'none' } }}>
                  <InputLabel htmlFor="subject-select">Subject</InputLabel>
                  <Select id="subject-select" defaultValue="Mathematics">
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
            />
            <CardContent>
              <TableContainer sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 80 }}>S/N</TableCell>
                      <TableCell sx={{ minWidth: 180 }}>Student Name</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Reg Number</TableCell>
                      <TableCell align="center">CA 1 (20%)</TableCell>
                      <TableCell align="center">CA 2 (20%)</TableCell>
                      <TableCell align="center">Exam (60%)</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Grade</TableCell>
                      <TableCell align="center">Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student, index) => {
                      const subjectScores = student.subjects.Mathematics; // Hardcoded for demo
                      const total = calculateTotal(subjectScores);
                      const grade = calculateGrade(total);
                      const remark = calculateRemark(grade);
                      return (
                        <TableRow key={student.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell sx={{ fontWeight: 'medium' }}>{student.name}</TableCell>
                          <TableCell>{student.regNumber}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0, max: 20 }}
                              defaultValue={subjectScores.ca1}
                              sx={{ width: 64, mx: 'auto', display: 'block' }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0, max: 20 }}
                              defaultValue={subjectScores.ca2}
                              sx={{ width: 64, mx: 'auto', display: 'block' }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0, max: 60 }}
                              defaultValue={subjectScores.exam}
                              sx={{ width: 64, mx: 'auto', display: 'block' }}
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'medium' }}>
                            {total}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={grade}
                              color={grade === 'F' ? 'error' : 'primary'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">{remark}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <StyledButton variant="outlined">Cancel</StyledButton>
                <StyledButton variant="contained">Save Scores</StyledButton>
              </Box>
            </CardContent>
          </StyledCard>
        </TabPanel>

        {/* Statistics Tab */}
        <TabPanel value={activeTab} index="statistics">
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardHeader title={<Typography variant="subtitle2">Class Average</Typography>} />
                <CardContent>
                  <Typography variant="h5" color="primary">
                    {(Object.values(classStats).reduce((sum, stat) => sum + stat.average, 0) /
                      subjects.length).toFixed(1)}
                    %
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Across all subjects
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardHeader title={<Typography variant="subtitle2">Pass Rate</Typography>} />
                <CardContent>
                  <Typography variant="h5" color="primary">
                    {(Object.values(classStats).reduce(
                      (sum, stat) => sum + (stat.passes / (stat.passes + stat.failures)) * 100,
                      0
                    ) / subjects.length).toFixed(1)}
                    %
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Students scoring 40% and above
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardHeader title={<Typography variant="subtitle2">Total Students</Typography>} />
                <CardContent>
                  <Typography variant="h5" color="primary">
                    {mockStudents.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    In {selectedClass} class
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Subject Performance</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  Average scores by subject for {selectedClass}
                </Typography>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {subjects.map((subject) => {
                  const stats = classStats[subject];
                  return (
                    <Box key={subject}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {subject}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {stats.average.toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={stats.average}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'primary.main',
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </StyledCard>
        </TabPanel>
      </Tabs>
    </Box>
  );
}