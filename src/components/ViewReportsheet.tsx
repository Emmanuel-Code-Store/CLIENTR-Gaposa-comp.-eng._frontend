'use client';

import React from "react";
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
  Checkbox,
  Chip,
  Grid,
  styled,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Download,
  Print,
  Description,
  Upload,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, 
    secondary: { main: '#dc004e' },
    success: { main: '#2e7d32' },
    warning: { main: '#ed6c02' },
    error: { main: '#d32f2f' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
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

export default function ReportSheet() {
  const [tabValue, setTabValue] = React.useState('generate');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: { xs: 2, sm: 4 }, flex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5">Report Sheet</Typography>
          <StyledButton variant="contained" color="primary" startIcon={<Add />}>
            Create New Report
          </StyledButton>
        </Box>

        <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
          <Tab label="Generate Reports" value="generate" />
          <Tab label="View Reports" value="view" />
          <Tab label="Report Templates" value="templates" />
          <Tab label="Report Settings" value="settings" />
        </Tabs>

        {/* Generate Reports Tab */}
        <TabPanel value={tabValue} index="generate">
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Generate Student Report Sheets</Typography>}
              subheader={<Typography color="text.secondary">Create academic reports for students</Typography>}
            />
            <CardContent>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="academic-term">Academic Term</InputLabel>
                    <Select id="academic-term" defaultValue="">
                      <MenuItem value="">
                        <em>Select term</em>
                      </MenuItem>
                      <MenuItem value="term1">First Term</MenuItem>
                      <MenuItem value="term2">Second Term</MenuItem>
                      <MenuItem value="term3">Third Term</MenuItem>
                      <MenuItem value="midterm1">First Mid-Term</MenuItem>
                      <MenuItem value="midterm2">Second Mid-Term</MenuItem>
                      <MenuItem value="final">Final</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="academic-year">Academic Year</InputLabel>
                    <Select id="academic-year" defaultValue="">
                      <MenuItem value="">
                        <em>Select year</em>
                      </MenuItem>
                      <MenuItem value="2023-2024">2023-2024</MenuItem>
                      <MenuItem value="2022-2023">2022-2023</MenuItem>
                      <MenuItem value="2021-2022">2021-2022</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="report-class">Class/Grade</InputLabel>
                    <Select id="report-class" defaultValue="">
                      <MenuItem value="">
                        <em>Select class</em>
                      </MenuItem>
                      <MenuItem value="grade1">Grade 1</MenuItem>
                      <MenuItem value="grade2">Grade 2</MenuItem>
                      <MenuItem value="grade3">Grade 3</MenuItem>
                      <MenuItem value="grade4">Grade 4</MenuItem>
                      <MenuItem value="grade5">Grade 5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="report-section">Section</InputLabel>
                    <Select id="report-section" defaultValue="">
                      <MenuItem value="">
                        <em>Select section</em>
                      </MenuItem>
                      <MenuItem value="a">Section A</MenuItem>
                      <MenuItem value="b">Section B</MenuItem>
                      <MenuItem value="c">Section C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 48 }}>
                        <Checkbox id="select-all" />
                      </TableCell>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Subjects Completed</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { id: 'ST-2023-001', name: 'John Smith', class: 'Grade 1 - A', subjects: '8/8', status: 'Ready' },
                      { id: 'ST-2023-002', name: 'Sarah Johnson', class: 'Grade 1 - A', subjects: '8/8', status: 'Ready' },
                      { id: 'ST-2023-003', name: 'Michael Brown', class: 'Grade 1 - A', subjects: '7/8', status: 'Incomplete' },
                      { id: 'ST-2023-004', name: 'Emily Davis', class: 'Grade 1 - A', subjects: '8/8', status: 'Ready' },
                      { id: 'ST-2023-005', name: 'David Wilson', class: 'Grade 1 - A', subjects: '6/8', status: 'Incomplete' },
                    ].map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox id={`select-${index + 1}`} />
                        </TableCell>
                        <TableCell>{student.id}</TableCell>
                        <TableCell sx={{ fontWeight: 'medium' }}>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.subjects}</TableCell>
                        <TableCell>
                          <Chip
                            label={student.status}
                            color={student.status === 'Ready' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <StyledButton variant="text" size="small">
                            Preview
                          </StyledButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Selected:</strong> 0 of 5 students
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <StyledButton variant="outlined" startIcon={<Print />}>
                  Print Selected
                </StyledButton>
                <StyledButton variant="outlined" startIcon={<Download />}>
                  Download Selected
                </StyledButton>
                <StyledButton variant="contained">Generate Reports</StyledButton>
              </Box>
            </CardActions>
          </StyledCard>

          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Individual Student Report</Typography>}
              subheader={<Typography color="text.secondary">Generate a report for a specific student</Typography>}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormLabel htmlFor="student-id">Student ID</FormLabel>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField id="student-id" fullWidth placeholder="Enter student ID" />
                    <StyledButton variant="outlined">
                      <Search />
                    </StyledButton>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormLabel htmlFor="student-name">Student Name</FormLabel>
                  <TextField id="student-name" fullWidth placeholder="Student name will appear here" disabled />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormLabel htmlFor="student-class">Class</FormLabel>
                  <TextField id="student-class" fullWidth placeholder="Class will appear here" disabled />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="individual-term">Academic Term</InputLabel>
                    <Select id="individual-term" defaultValue="">
                      <MenuItem value="">
                        <em>Select term</em>
                      </MenuItem>
                      <MenuItem value="term1">First Term</MenuItem>
                      <MenuItem value="term2">Second Term</MenuItem>
                      <MenuItem value="term3">Third Term</MenuItem>
                      <MenuItem value="midterm1">First Mid-Term</MenuItem>
                      <MenuItem value="midterm2">Second Mid-Term</MenuItem>
                      <MenuItem value="final">Final</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="individual-year">Academic Year</InputLabel>
                    <Select id="individual-year" defaultValue="">
                      <MenuItem value="">
                        <em>Select year</em>
                      </MenuItem>
                      <MenuItem value="2023-2024">2023-2024</MenuItem>
                      <MenuItem value="2022-2023">2022-2023</MenuItem>
                      <MenuItem value="2021-2022">2021-2022</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="report-template">Report Template</InputLabel>
                    <Select id="report-template" defaultValue="">
                      <MenuItem value="">
                        <em>Select template</em>
                      </MenuItem>
                      <MenuItem value="standard">Standard Template</MenuItem>
                      <MenuItem value="detailed">Detailed Template</MenuItem>
                      <MenuItem value="simplified">Simplified Template</MenuItem>
                      <MenuItem value="custom">Custom Template</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
              <StyledButton variant="outlined" startIcon={<Description />}>
                Preview
              </StyledButton>
              <StyledButton variant="contained">Generate Report</StyledButton>
            </CardActions>
          </StyledCard>
        </TabPanel>

        {/* View Reports Tab */}
        <TabPanel value={tabValue} index="view">
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">View Generated Reports</Typography>}
              subheader={<Typography color="text.secondary">Access and manage previously generated reports</Typography>}
            />
            <CardContent>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="view-term">Academic Term</InputLabel>
                    <Select id="view-term" defaultValue="term1">
                      <MenuItem value="all">All Terms</MenuItem>
                      <MenuItem value="term1">First Term</MenuItem>
                      <MenuItem value="term2">Second Term</MenuItem>
                      <MenuItem value="term3">Third Term</MenuItem>
                      <MenuItem value="midterm1">First Mid-Term</MenuItem>
                      <MenuItem value="midterm2">Second Mid-Term</MenuItem>
                      <MenuItem value="final">Final</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="view-year">Academic Year</InputLabel>
                    <Select id="view-year" defaultValue="2023-2024">
                      <MenuItem value="all">All Years</MenuItem>
                      <MenuItem value="2023-2024">2023-2024</MenuItem>
                      <MenuItem value="2022-2023">2022-2023</MenuItem>
                      <MenuItem value="2021-2022">2021-2022</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="view-class">Class/Grade</InputLabel>
                    <Select id="view-class" defaultValue="grade1">
                      <MenuItem value="all">All Classes</MenuItem>
                      <MenuItem value="grade1">Grade 1</MenuItem>
                      <MenuItem value="grade2">Grade 2</MenuItem>
                      <MenuItem value="grade3">Grade 3</MenuItem>
                      <MenuItem value="grade4">Grade 4</MenuItem>
                      <MenuItem value="grade5">Grade 5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <StyledButton variant="contained" startIcon={<FilterList />}>
                    Apply Filter
                  </StyledButton>
                </Grid>
              </Grid>

              <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Report ID</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Term</TableCell>
                      <TableCell>Academic Year</TableCell>
                      <TableCell>Generated Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { id: 'RPT-2023-001', student: 'John Smith', class: 'Grade 1 - A', term: 'First Term', year: '2023-2024', date: 'Oct 15, 2023' },
                      { id: 'RPT-2023-002', student: 'Sarah Johnson', class: 'Grade 1 - A', term: 'First Term', year: '2023-2024', date: 'Oct 15, 2023' },
                      { id: 'RPT-2023-003', student: 'Michael Brown', class: 'Grade 1 - A', term: 'First Term', year: '2023-2024', date: 'Oct 15, 2023' },
                      { id: 'RPT-2023-004', student: 'Emily Davis', class: 'Grade 1 - A', term: 'First Term', year: '2023-2024', date: 'Oct 15, 2023' },
                      { id: 'RPT-2023-005', student: 'David Wilson', class: 'Grade 1 - A', term: 'First Term', year: '2023-2024', date: 'Oct 15, 2023' },
                    ].map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell sx={{ fontWeight: 'medium' }}>{report.student}</TableCell>
                        <TableCell>{report.class}</TableCell>
                        <TableCell>{report.term}</TableCell>
                        <TableCell>{report.year}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <StyledButton variant="text" size="small">
                              View
                            </StyledButton>
                            <StyledButton variant="text" size="small">
                              Download
                            </StyledButton>
                            <StyledButton variant="text" size="small">
                              Print
                            </StyledButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing 5 of 32 reports
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <StyledButton variant="outlined" size="small">
                  Previous
                </StyledButton>
                <StyledButton variant="outlined" size="small">
                  Next
                </StyledButton>
              </Box>
            </CardActions>
          </StyledCard>
        </TabPanel>

        {/* Report Templates Tab */}
        <TabPanel value={tabValue} index="templates">
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Report Templates</Typography>}
              subheader={<Typography color="text.secondary">Manage and customize report templates</Typography>}
            />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <StyledButton variant="contained" startIcon={<Add />}>
                  Create New Template
                </StyledButton>
              </Box>
              <Grid container spacing={2}>
                {[
                  { title: 'Standard Template', desc: 'Default comprehensive report template', lastMod: 'Oct 10, 2023', usedBy: 'All grades' },
                  { title: 'Detailed Template', desc: 'Expanded report with detailed assessments', lastMod: 'Sep 28, 2023', usedBy: 'Grades 3-5' },
                  { title: 'Simplified Template', desc: 'Condensed report for younger students', lastMod: 'Oct 5, 2023', usedBy: 'Grades 1-2' },
                ].map((template) => (
                  <Grid item xs={12} md={4} key={template.title}>
                    <StyledCard>
                      <CardHeader
                        title={
                          <Typography variant="subtitle1">{template.title}</Typography>
                        }
                        subheader={
                          <Typography variant="body2" color="text.secondary">
                            {template.desc}
                          </Typography>
                        }
                        sx={{ pb: 0 }}
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Box
                          sx={{
                            height: 200,
                            bgcolor: "grey.200",
                            borderRadius: 1,
                            mb: 2,
                          }}
                          className="aspect-[8.5/11]"
                        >
                          <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 8 }}>
                            Template Preview
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Last modified: {template.lastMod}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Used by: {template.usedBy}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "space-between" }}>
                        <StyledButton variant="outlined" size="small">
                          Preview
                        </StyledButton>
                        <StyledButton variant="outlined" size="small">
                          Edit
                        </StyledButton>
                      </CardActions>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </TabPanel>

        {/* Report Settings Tab */}
        <TabPanel value={tabValue} index="settings">
          <StyledCard>
            <CardHeader
              title={
                <Typography variant="subtitle1">
                  Report Settings
                </Typography>
              }
              subheader={
                <Typography color="text.secondary">
                  Configure global settings for report generation
                </Typography>
              }
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* General Settings */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>General Settings</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="school-name">School Name</FormLabel>
                    <TextField id="school-name" fullWidth defaultValue="Springfield Elementary School" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="school-address">School Address</FormLabel>
                    <TextField id="school-address" fullWidth defaultValue="123 Education St, Springfield" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="school-logo">School Logo</FormLabel>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ height: 64, width: 64, border: 1, borderColor: 'grey.300', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                        <Typography variant="caption">Logo</Typography>
                      </Box>
                      <StyledButton variant="outlined" startIcon={<Upload />}>
                        Upload Logo
                      </StyledButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="principal-name">Principal&apos;s Name</FormLabel>
                    <TextField id="principal-name" fullWidth defaultValue="Dr. Jane Smith" />
                  </Grid>
                </Grid>
              </Box>

              {/* Grading System */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Grading System</Typography>
                <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Grade</TableCell>
                        <TableCell>Score Range</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { grade: 'A', range: '90-100', desc: 'Excellent' },
                        { grade: 'B', range: '80-89', desc: 'Very Good' },
                        { grade: 'C', range: '70-79', desc: 'Good' },
                        { grade: 'D', range: '60-69', desc: 'Fair' },
                        { grade: 'F', range: '0-59', desc: 'Needs Improvement' },
                      ].map((row) => (
                        <TableRow key={row.grade}>
                          <TableCell sx={{ fontWeight: 'medium' }}>{row.grade}</TableCell>
                          <TableCell>{row.range}</TableCell>
                          <TableCell>{row.desc}</TableCell>
                          <TableCell align="right">
                            <StyledButton variant="text" size="small">
                              Edit
                            </StyledButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>

              {/* Report Comments */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Report Comments</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="comment-bank">Comment Bank</InputLabel>
                      <Select id="comment-bank" defaultValue="">
                        <MenuItem value="">
                          <em>Select comment type</em>
                        </MenuItem>
                        <MenuItem value="excellent">Excellent Performance</MenuItem>
                        <MenuItem value="good">Good Performance</MenuItem>
                        <MenuItem value="average">Average Performance</MenuItem>
                        <MenuItem value="needs-improvement">Needs Improvement</MenuItem>
                        <MenuItem value="behavior">Behavior Comments</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="auto-comment">Auto-generate Comments</FormLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Checkbox id="auto-comment" />
                      <Typography variant="body2">
                        Enable automatic comment generation based on performance
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel htmlFor="default-comment">Default Principal&apos;s Comment</FormLabel>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      id="default-comment"
                      placeholder="Enter default comment"
                      defaultValue="We appreciate your continued support in your child&apos;s educational journey. Together, we can help them reach their full potential."
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Signature Settings */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Signature Settings</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="principal-signature">Principal&apos;s Signature</FormLabel>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ height: 64, width: 128, border: 1, borderColor: 'grey.300', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                        <Typography variant="caption">Signature</Typography>
                      </Box>
                      <StyledButton variant="outlined" startIcon={<Upload />}>
                        Upload Signature
                      </StyledButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="digital-stamp">Digital Stamp/Seal</FormLabel>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ height: 64, width: 64, border: 1, borderColor: 'grey.300', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                        <Typography variant="caption">Stamp</Typography>
                      </Box>
                      <StyledButton variant="outlined" startIcon={<Upload />}>
                        Upload Stamp
                      </StyledButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <StyledButton variant="contained" color="primary">
                Save Settings
              </StyledButton>
            </CardActions>
          </StyledCard>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
