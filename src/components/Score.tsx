'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormLabel,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
  styled,
  Tooltip,
} from '@mui/material';
import {
  Print,
  Download,
  Description,
  MenuBook,
  Person,
  Save,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';

// Styled components
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

function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

// Mock data
const mockStudent = {
  id: 1,
  name: 'John Doe',
  regNumber: 'REG20230001',
  class: 'JSS 2',
  gender: 'Male',
  age: 14,
  term: 'First Term',
  session: '2023/2024',
  subjects: [
    {
      name: 'Mathematics',
      ca1: 15,
      ca2: 18,
      exam: 52,
      total: 85,
      grade: 'A',
      remark: 'Excellent',
      teacherComment: 'John shows exceptional aptitude in mathematics.',
    },
    {
      name: 'English Language',
      ca1: 14,
      ca2: 16,
      exam: 48,
      total: 78,
      grade: 'A',
      remark: 'Excellent',
      teacherComment: 'Good command of language and expression.',
    },
    {
      name: 'Science',
      ca1: 12,
      ca2: 14,
      exam: 45,
      total: 71,
      grade: 'B',
      remark: 'Very Good',
      teacherComment: 'Shows interest in scientific concepts.',
    },
    {
      name: 'Social Studies',
      ca1: 13,
      ca2: 15,
      exam: 42,
      total: 70,
      grade: 'B',
      remark: 'Very Good',
      teacherComment: 'Good understanding of social concepts.',
    },
    {
      name: 'Computer Science',
      ca1: 16,
      ca2: 17,
      exam: 50,
      total: 83,
      grade: 'A',
      remark: 'Excellent',
      teacherComment: 'Demonstrates strong technical skills.',
    },
    {
      name: 'Physical Education',
      ca1: 15,
      ca2: 16,
      exam: 45,
      total: 76,
      grade: 'A',
      remark: 'Excellent',
      teacherComment: 'Active participation in physical activities.',
    },
    {
      name: 'Creative Arts',
      ca1: 14,
      ca2: 15,
      exam: 43,
      total: 72,
      grade: 'B',
      remark: 'Very Good',
      teacherComment: 'Shows creativity and artistic skills.',
    },
    {
      name: 'Agricultural Science',
      ca1: 13,
      ca2: 14,
      exam: 40,
      total: 67,
      grade: 'C',
      remark: 'Good',
      teacherComment: 'Average understanding of agricultural concepts.',
    },
    {
      name: 'Home Economics',
      ca1: 15,
      ca2: 16,
      exam: 44,
      total: 75,
      grade: 'B',
      remark: 'Very Good',
      teacherComment: 'Good practical skills in home management.',
    },
    {
      name: 'Civic Education',
      ca1: 14,
      ca2: 15,
      exam: 42,
      total: 71,
      grade: 'B',
      remark: 'Very Good',
      teacherComment: 'Good understanding of civic responsibilities.',
    },
  ],
  attendance: {
    schoolDays: 120,
    present: 115,
    absent: 5,
    late: 3,
  },
  behavior: {
    punctuality: 'Excellent',
    neatness: 'Very Good',
    conduct: 'Excellent',
    reliability: 'Very Good',
    cooperation: 'Excellent',
  },
  classTeacherComment:
    'John is a dedicated student who consistently performs well across all subjects. He is respectful to teachers and peers.',
  principalComment: 'An exemplary student with great potential. Keep up the good work.',
  nextTermBegins: 'January 8, 2024',
  nextTermFees: '₦75,000',
};

const classes = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
const terms = ['First Term', 'Second Term', 'Third Term'];
const sessions = ['2022/2023', '2023/2024', '2024/2025'];
const students = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  regNumber: `REG${2023}${i + 1}`.padStart(10, '0'),
}));

// Main component
export default function Score() {
  const [selectedClass, setSelectedClass] = useState('JSS 2');
  const [selectedTerm, setSelectedTerm] = useState('First Term');
  const [selectedSession, setSelectedSession] = useState('2023/2024');
  const [selectedStudent, setSelectedStudent] = useState(mockStudent.regNumber);
  const [activeTab, setActiveTab] = useState('entry');

  // Calculate student statistics
  const totalSubjects = mockStudent.subjects.length;
  const totalScore = mockStudent.subjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageScore = (totalScore / totalSubjects).toFixed(1);
  const passedSubjects = mockStudent.subjects.filter((subject) => subject.total >= 40).length;
  const failedSubjects = totalSubjects - passedSubjects;
  const position = '2nd';

  // Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', p: { xs: 2, sm: 4 }, flex: 1 }}>
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
          <Typography variant="h5">Score Sheet</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage individual student scores and generate report cards
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <StyledButton variant="outlined" startIcon={<Print />} onClick={handlePrint}>
            Print
          </StyledButton>
          <StyledButton variant="outlined" startIcon={<Download />} onClick={handleExport}>
            Export PDF
          </StyledButton>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_e, newValue) => setActiveTab(newValue)} aria-label="score tabs">
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Tab label="Score Entry" value="entry" icon={<Description />} iconPosition="start" />
          <Tab label="Report Card" value="report" icon={<MenuBook />} iconPosition="start" />
          <Tab
            label="Student Info"
            value="student"
            icon={<Person />}
            iconPosition="start"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          />
        </Box>

        </Tabs>
        {/* Filters */}
        <Box sx={{ mb: 4 }}>
  <Grid container spacing={2}>
    {/* Class Select */}
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

    {/* Term Select */}
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

    {/* Session Select */}
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

    {/* Student Select */}
    <Grid item xs={12} md={3}>
      <FormControl fullWidth>
        <InputLabel htmlFor="student-select">Student</InputLabel>
        <Select
          id="student-select"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {students.map((student) => (
            <MenuItem key={student.id} value={student.regNumber}>
              {student.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
</Box>

        {/* Score Entry Tab */}
         <TabPanel value={activeTab} index="entry">
           <StyledCard>
             <CardHeader
              title={<Typography variant="h6">Student Score Entry</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  {mockStudent.name} - {selectedClass} - {selectedTerm} - {selectedSession}
                </Typography>
              }
            />
            <CardContent>
              <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 80 }}>S/N</TableCell>
                      <TableCell sx={{ minWidth: 180 }}>Subject</TableCell>
                      <TableCell align="center">CA 1 (20%)</TableCell>
                      <TableCell align="center">CA 2 (20%)</TableCell>
                      <TableCell align="center">Exam (60%)</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Grade</TableCell>
                      <TableCell align="center">Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockStudent.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 'medium' }}>{subject.name}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            inputProps={{ min: 0, max: 20 }}
                            defaultValue={subject.ca1}
                            sx={{ width: 64, mx: 'auto', display: 'block' }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            inputProps={{ min: 0, max: 20 }}
                            defaultValue={subject.ca2}
                            sx={{ width: 64, mx: 'auto', display: 'block' }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            inputProps={{ min: 0, max: 60 }}
                            defaultValue={subject.exam}
                            sx={{ width: 64, mx: 'auto', display: 'block' }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'medium' }}>
                          {subject.total}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={subject.grade}
                            color={subject.grade === 'F' ? 'error' : 'primary'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">{subject.remark}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <FormLabel htmlFor="teacherComment">Class Teacher&apos;s Comment</FormLabel>
                  <TextField
                    id="teacherComment"
                    fullWidth
                    multiline
                    rows={2}
                    defaultValue={mockStudent.classTeacherComment}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="principalComment">Principal&apos;s Comment</FormLabel>
                  <TextField
                    id="principalComment"
                    fullWidth
                    multiline
                    rows={2}
                    defaultValue={mockStudent.principalComment}
                  />
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
              <StyledButton variant="outlined">Cancel</StyledButton>
              <StyledButton variant="contained" startIcon={<Save />}>
                Save Scores
              </StyledButton>
            </CardActions>
          </StyledCard>
        </TabPanel>

        {/* Report Card Tab */}
        <TabPanel value={activeTab} index="report">
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Student Report Card</Typography>}
              subheader={
                <Typography variant="body2" color="text.secondary">
                  {mockStudent.name} - {selectedClass} - {selectedTerm} - {selectedSession}
                </Typography>
              }
              action={
                <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 1, '@media print': { display: 'none' } }}>
                  <StyledButton variant="outlined" startIcon={<Print />} onClick={handlePrint}>
                    Print Report
                  </StyledButton>
                </Box>
              }
            />
            <CardContent sx={{ '@media print': { pt: 0 } }}>
              <Box
                sx={{
                  border: { xs: 1, print: 0 },
                  borderColor: 'grey.300',
                  borderRadius: { xs: 1, print: 0 },
                  p: { xs: 3, print: 0 },
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography variant="h5">SCHOOL NAME</Typography>
                  <Typography variant="body2" color="text.secondary">
                    123 School Address, City, State
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    STUDENT REPORT CARD
                  </Typography>
                  <Typography variant="body2">
                    {selectedTerm} - {selectedSession} Academic Session
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Student Name:</Typography>
                        <Typography>{mockStudent.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Reg Number:</Typography>
                        <Typography>{mockStudent.regNumber}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Class:</Typography>
                        <Typography>{selectedClass}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Gender:</Typography>
                        <Typography>{mockStudent.gender}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Term:</Typography>
                        <Typography>{selectedTerm}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Session:</Typography>
                        <Typography>{selectedSession}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Position:</Typography>
                        <Typography>
                          {position} out of {students.length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ width: 120, fontWeight: 'medium' }}>Average Score:</Typography>
                        <Typography>{averageScore}%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Academic Performance
                  </Typography>
                  <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, overflowX: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: 50 }}>S/N</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell align="center">CA 1</TableCell>
                          <TableCell align="center">CA 2</TableCell>
                          <TableCell align="center">Exam</TableCell>
                          <TableCell align="center">Total</TableCell>
                          <TableCell align="center">Grade</TableCell>
                          <TableCell>Remark</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockStudent.subjects.map((subject, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell sx={{ fontWeight: 'medium' }}>{subject.name}</TableCell>
                            <TableCell align="center">{subject.ca1}</TableCell>
                            <TableCell align="center">{subject.ca2}</TableCell>
                            <TableCell align="center">{subject.exam}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'medium' }}>
                              {subject.total}
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={subject.grade}
                                color={subject.grade === 'F' ? 'error' : 'primary'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{subject.remark}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Attendance Record
                    </Typography>
                    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>School Days</TableCell>
                            <TableCell align="right">{mockStudent.attendance.schoolDays}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Present</TableCell>
                            <TableCell align="right">{mockStudent.attendance.present}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Absent</TableCell>
                            <TableCell align="right">{mockStudent.attendance.absent}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Late</TableCell>
                            <TableCell align="right">{mockStudent.attendance.late}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Behavior and Conduct
                    </Typography>
                    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Punctuality</TableCell>
                            <TableCell align="right">{mockStudent.behavior.punctuality}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Neatness</TableCell>
                            <TableCell align="right">{mockStudent.behavior.neatness}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Conduct</TableCell>
                            <TableCell align="right">{mockStudent.behavior.conduct}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Cooperation</TableCell>
                            <TableCell align="right">{mockStudent.behavior.cooperation}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Class Teacher&apos;s Comment
                    </Typography>
                    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, p: 2 }}>
                      <Typography variant="body1">{mockStudent.classTeacherComment}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Principal&apos;s Comment
                    </Typography>
                    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, p: 2 }}>
                      <Typography variant="body1">{mockStudent.principalComment}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Next Term Begins
                    </Typography>
                    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, p: 2 }}>
                      <Typography variant="body1">{mockStudent.nextTermBegins}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Next Term Fees
                    </Typography>
                    <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, p: 2 }}>
                      <Typography variant="body1">{mockStudent.nextTermFees}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          borderTop: '2px dashed',
                          borderColor: 'grey.500',
                          pt: 1,
                          maxWidth: 192,
                          mx: 'auto',
                        }}
                      >
                        <Typography variant="subtitle2">Class Teacher&apos;s Signature</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          borderTop: '2px dashed',
                          borderColor: 'grey.500',
                          pt: 1,
                          maxWidth: 192,
                          mx: 'auto',
                        }}
                      >
                        <Typography variant="subtitle2">Principal&apos;s Signature</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </StyledCard>
        </TabPanel>

        {/* Student Info Tab */}
        <TabPanel value={activeTab} index="student">
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Student Information</Typography>}
              subheader={<Typography variant="body2" color="text.secondary">View and update student details</Typography>}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <FormLabel htmlFor="studentName">Full Name</FormLabel>
                      <TextField id="studentName" fullWidth defaultValue={mockStudent.name} />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="regNumber">Registration Number</FormLabel>
                      <TextField id="regNumber" fullWidth defaultValue={mockStudent.regNumber} disabled />
                    </Box>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select id="gender" defaultValue={mockStudent.gender}>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <TextField id="age" type="number" fullWidth defaultValue={mockStudent.age} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="class">Class</InputLabel>
                        <Select id="class" defaultValue={selectedClass}>
                          {classes.map((cls) => (
                            <MenuItem key={cls} value={cls}>
                              {cls}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="term">Current Term</InputLabel>
                        <Select id="term" defaultValue={selectedTerm}>
                          {terms.map((term) => (
                            <MenuItem key={term} value={term}>
                              {term}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="session">Academic Session</InputLabel>
                        <Select id="session" defaultValue={selectedSession}>
                          {sessions.map((session) => (
                            <MenuItem key={session} value={session}>
                              {session}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select id="status" defaultValue="Active">
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="Graduated">Graduated</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <StyledButton variant="outlined">Cancel</StyledButton>
              <StyledButton variant="contained">Update Student Information</StyledButton>
            </CardActions>
          </StyledCard>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardHeader title={<Typography variant="subtitle2">Academic Performance</Typography>} />
                <CardContent>
                  <Typography variant="h5" color="primary">
                    {averageScore}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average score across all subjects
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                    <Tooltip title="Subjects with score of 40% or higher">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle color="success" sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{passedSubjects} Passed</Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Subjects with score below 40%">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Warning color="error" sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{failedSubjects} Failed</Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardHeader title={<Typography variant="subtitle2">Attendance Rate</Typography>} />
                <CardContent>
                  <Typography variant="h5" color="primary">
                    {((mockStudent.attendance.present / mockStudent.attendance.schoolDays) * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {mockStudent.attendance.present} present out of {mockStudent.attendance.schoolDays} school days
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Info color="info" sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{mockStudent.attendance.absent} days absent</Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardHeader title={<Typography variant="subtitle2">Class Position</Typography>} />
                <CardContent>
                  <Typography variant="h5" color="primary">
                    {position}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Out of {students.length} students in class
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label="Top 10%" color="primary" variant="outlined" size="small" />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </TabPanel>

    </Box>
  );
}