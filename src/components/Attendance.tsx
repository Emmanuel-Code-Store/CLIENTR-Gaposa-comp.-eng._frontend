import * as React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

function StaffAttendance() {
  const [tabValue, setTabValue] = React.useState('daily');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB" }}>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="container" sx={{p: 3 }}>
        <Box className="header">
          <Typography variant="h4" className="title">
            Test Attendance
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Take Attendance
          </Button>
        </Box>

        <Tabs value={tabValue} onChange={handleTabChange} className=" SavedSearchIcon ">
          <Tab label="Daily Attendance" value="daily" />
          <Tab label="Class Attendance" value="class" />
          <Tab label="Student Records" value="student" />
          <Tab label="Reports" value="reports" />
        </Tabs>

        {tabValue === 'daily' && (
          <Card className="card">
            <CardHeader
              title="Daily Attendance"
              subheader="Record and view attendance for a specific date"
            />
            <CardContent>
              <Grid container className="form-grid">
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Date</InputLabel>
                    <DatePicker />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Class/Grade</InputLabel>
                    <Select label="Class/Grade">
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
                    <InputLabel>Section</InputLabel>
                    <Select label="Section">
                      <MenuItem value="a">Section A</MenuItem>
                      <MenuItem value="b">Section B</MenuItem>
                      <MenuItem value="c">Section C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} className="button-grid">
                  <Button variant="contained" startIcon={<SearchIcon />} fullWidth>
                    Load Students
                  </Button>
                </Grid>
              </Grid>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-cell-no">No.</TableCell>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="center" className="table-cell-status">
                        Present
                      </TableCell>
                      <TableCell align="center" className="table-cell-status">
                        Absent
                      </TableCell>
                      <TableCell align="center" className="table-cell-status">
                        Late
                      </TableCell>
                      <TableCell>Remarks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { id: 'ST-2023-001', name: 'John Smith', index: 1 },
                      { id: 'ST-2023-002', name: 'Sarah Johnson', index: 2 },
                      { id: 'ST-2023-003', name: 'Michael Brown', index: 3 },
                      { id: 'ST-2023-004', name: 'Emily Davis', index: 4 },
                      { id: 'ST-2023-005', name: 'David Wilson', index: 5 },
                    ].map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.index}</TableCell>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell align="center">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <TextField placeholder="Add remarks" fullWidth />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Box className="card-footer" sx={{ m:3 }}>
              <Typography variant="body2" className="summary">
                <strong>Total:</strong> 5 students |{' '}
                <span className="present">0 Present</span> |{' '}
                <span className="absent">0 Absent</span> |{' '}
                <span className="late">0 Late</span>
              </Typography>
              <Button variant="contained">Save Attendance</Button>
            </Box>
          </Card>
        )}

        {tabValue === 'class' && (
          <Card className="card">
            <CardHeader
              title="Class Attendance Summary"
              subheader="View attendance statistics by class"
            />
            <CardContent>
              <Grid container className="form-grid">
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Month</InputLabel>
                    <Select label="Month" defaultValue="current">
                      <MenuItem value="current">Current Month</MenuItem>
                      <MenuItem value="jan">January</MenuItem>
                      <MenuItem value="feb">February</MenuItem>
                      <MenuItem value="mar">March</MenuItem>
                      <MenuItem value="apr">April</MenuItem>
                      <MenuItem value="may">May</MenuItem>
                      <MenuItem value="jun">June</MenuItem>
                      <MenuItem value="jul">July</MenuItem>
                      <MenuItem value="aug">August</MenuItem>
                      <MenuItem value="sep">September</MenuItem>
                      <MenuItem value="oct">October</MenuItem>
                      <MenuItem value="nov">November</MenuItem>
                      <MenuItem value="dec">December</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Class/Grade</InputLabel>
                    <Select label="Class/Grade">
                      <MenuItem value="all">All Classes</MenuItem>
                      <MenuItem value="grade1">Grade 1</MenuItem>
                      <MenuItem value="grade2">Grade 2</MenuItem>
                      <MenuItem value="grade3">Grade 3</MenuItem>
                      <MenuItem value="grade4">Grade 4</MenuItem>
                      <MenuItem value="grade5">Grade 5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} className="button-grid">
                  <Button variant="contained" startIcon={<FilterListIcon />} fullWidth>
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>

              <Grid container className="stats-grid">
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader title={<Typography variant="h6" className="present-rate">Present Rate</Typography>} />
                    <CardContent>
                      <Typography variant="h4" className="stat-value">92.5%</Typography>
                      <Typography variant="body2" className="stat-description">
                        Average across all classes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader title={<Typography variant="h6" className="absence-rate">Absence Rate</Typography>} />
                    <CardContent>
                      <Typography variant="h4" className="stat-value">5.8%</Typography>
                      <Typography variant="body2" className="stat-description">
                        Average across all classes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader title={<Typography variant="h6" className="tardiness-rate">Tardiness Rate</Typography>} />
                    <CardContent>
                      <Typography variant="h4" className="stat-value">1.7%</Typography>
                      <Typography variant="body2" className="stat-description">
                        Average across all classes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Class/Grade</TableCell>
                      <TableCell>Total Students</TableCell>
                      <TableCell>Present (%)</TableCell>
                      <TableCell>Absent (%)</TableCell>
                      <TableCell>Late (%)</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { class: 'Grade 1 - Section A', students: 32, present: 94.2, absent: 4.5, late: 1.3 },
                      { class: 'Grade 1 - Section B', students: 30, present: 93.1, absent: 5.2, late: 1.7 },
                      { class: 'Grade 2 - Section A', students: 28, present: 91.8, absent: 6.3, late: 1.9 },
                      { class: 'Grade 2 - Section B', students: 29, present: 90.5, absent: 7.2, late: 2.3 },
                    ].map((row) => (
                      <TableRow key={row.class}>
                        <TableCell className="class-name">{row.class}</TableCell>
                        <TableCell>{row.students}</TableCell>
                        <TableCell>
                          <Typography className="present-value">{row.present}%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="absent-value">{row.absent}%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="late-value">{row.late}%</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="text">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Box className="card-footer" sx={{ m:3 }}>
              <Button variant="outlined" startIcon={<DownloadIcon />}>
                Export Report
              </Button>
            </Box>
          </Card>
        )}

        {tabValue === 'student' && (
          <Card className="card">
            <CardHeader
              title="Student Attendance Records"
              subheader="View individual student attendance history"
            />
            <CardContent>
              <Grid container className="form-grid">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search by student name or ID..."
                    InputProps={{
                      startAdornment: <SearchIcon className="search-icon" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Date Range</InputLabel>
                    <Select label="Date Range" defaultValue="current-month">
                      <MenuItem value="current-month">Current Month</MenuItem>
                      <MenuItem value="last-month">Last Month</MenuItem>
                      <MenuItem value="last-3-months">Last 3 Months</MenuItem>
                      <MenuItem value="current-term">Current Term</MenuItem>
                      <MenuItem value="current-year">Current Academic Year</MenuItem>
                      <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} className="button-grid">
                  <Button variant="contained" startIcon={<SearchIcon />} fullWidth>
                    Search
                  </Button>
                </Grid>
              </Grid>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Present Days</TableCell>
                      <TableCell>Absent Days</TableCell>
                      <TableCell>Late Days</TableCell>
                      <TableCell>Attendance Rate</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { id: 'ST-2023-001', name: 'John Smith', class: 'Grade 1 - A', present: 18, absent: 1, late: 1, rate: 90 },
                      { id: 'ST-2023-002', name: 'Sarah Johnson', class: 'Grade 1 - A', present: 20, absent: 0, late: 0, rate: 100 },
                      { id: 'ST-2023-003', name: 'Michael Brown', class: 'Grade 1 - A', present: 17, absent: 2, late: 1, rate: 85 },
                      { id: 'ST-2023-004', name: 'Emily Davis', class: 'Grade 1 - A', present: 19, absent: 1, late: 0, rate: 95 },
                      { id: 'ST-2023-005', name: 'David Wilson', class: 'Grade 1 - A', present: 16, absent: 3, late: 1, rate: 80 },
                    ].map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell className="student-name">{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.present}</TableCell>
                        <TableCell>{student.absent}</TableCell>
                        <TableCell>{student.late}</TableCell>
                        <TableCell>
                          <Typography className={student.rate >= 90 ? 'present-value' : 'late-value'}>
                            {student.rate}%
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="text">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Box className="card-footer" sx={{ m:3 }}>
              <Typography variant="body2" className="summary" sx={{ mb: 2 }}>
                Showing 5 of 32 students
              </Typography>
              <Box className="pagination">
                <Button variant="outlined" size="small">
                  Previous
                </Button>
                <Button variant="outlined" size="small">
                  Next
                </Button>
              </Box>
            </Box>
          </Card>
        )}

        {tabValue === 'reports' && (
          <Card className="card">
            <CardHeader
              title="Attendance Reports"
              subheader="Generate and download attendance reports"
            />
            <CardContent>
              <Grid container className="reports-grid">
                <Grid item xs={12} md={6} sx={{ mb: 2}}>
                  <Card>
                    <CardHeader
                      title="Daily Attendance Report"
                      subheader="Generate a report for a specific date"
                    />
                    <CardContent className="report-card-content">
                      <FormControl fullWidth>
                        <InputLabel shrink>Date</InputLabel>
                        <DatePicker />
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Class/Grade</InputLabel>
                        <Select label="Class/Grade">
                          <MenuItem value="all">All Classes</MenuItem>
                          <MenuItem value="grade1">Grade 1</MenuItem>
                          <MenuItem value="grade2">Grade 2</MenuItem>
                          <MenuItem value="grade3">Grade 3</MenuItem>
                          <MenuItem value="grade4">Grade 4</MenuItem>
                          <MenuItem value="grade5">Grade 5</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                    <Box className="report-card-footer">
                      <Button variant="contained" startIcon={<DownloadIcon />} fullWidth>
                        Generate Daily Report
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader
                      title="Monthly Attendance Report"
                      subheader="Generate a report for a specific month"
                    />
                    <CardContent className="report-card-content">
                      <FormControl fullWidth>
                        <InputLabel>Month</InputLabel>
                        <Select label="Month">
                          <MenuItem value="current">Current Month</MenuItem>
                          <MenuItem value="jan">January</MenuItem>
                          <MenuItem value="feb">February</MenuItem>
                          <MenuItem value="mar">March</MenuItem>
                          <MenuItem value="apr">April</MenuItem>
                          <MenuItem value="may">May</MenuItem>
                          <MenuItem value="jun">June</MenuItem>
                          <MenuItem value="jul">July</MenuItem>
                          <MenuItem value="aug">August</MenuItem>
                          <MenuItem value="sep">September</MenuItem>
                          <MenuItem value="oct">October</MenuItem>
                          <MenuItem value="nov">November</MenuItem>
                          <MenuItem value="dec">December</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Class/Grade</InputLabel>
                        <Select label="Class/Grade">
                          <MenuItem value="all">All Classes</MenuItem>
                          <MenuItem value="grade1">Grade 1</MenuItem>
                          <MenuItem value="grade2">Grade 2</MenuItem>
                          <MenuItem value="grade3">Grade 3</MenuItem>
                          <MenuItem value="grade4">Grade 4</MenuItem>
                          <MenuItem value="grade5">Grade 5</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                    <Box className="report-card-footer">
                      <Button variant="contained" startIcon={<DownloadIcon />} fullWidth>
                        Generate Monthly Report
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader
                      title="Student Attendance Report"
                      subheader="Generate a report for a specific student"
                    />
                    <CardContent className="report-card-content">
                      <TextField label="Student ID" placeholder="Enter student ID" fullWidth />
                      <FormControl fullWidth>
                        <InputLabel>Time Period</InputLabel>
                        <Select label="Time Period">
                          <MenuItem value="current-month">Current Month</MenuItem>
                          <MenuItem value="last-month">Last Month</MenuItem>
                          <MenuItem value="current-term">Current Term</MenuItem>
                          <MenuItem value="current-year">Current Academic Year</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                    <Box className="report-card-footer">
                      <Button variant="contained" startIcon={<DownloadIcon />} fullWidth>
                        Generate Student Report
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader
                      title="Custom Attendance Report"
                      subheader="Generate a report with custom parameters"
                    />
                    <CardContent className="report-card-content">
                      <Grid container className="date-grid">
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel shrink>Start Date</InputLabel>
                            <DatePicker />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel shrink>End Date</InputLabel>
                            <DatePicker />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <FormControl fullWidth>
                        <InputLabel>Class/Grade</InputLabel>
                        <Select label="Class/Grade">
                          <MenuItem value="all">All Classes</MenuItem>
                          <MenuItem value="grade1">Grade 1</MenuItem>
                          <MenuItem value="grade2">Grade 2</MenuItem>
                          <MenuItem value="grade3">Grade 3</MenuItem>
                          <MenuItem value="grade4">Grade 4</MenuItem>
                          <MenuItem value="grade5">Grade 5</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                    <Box className="report-card-footer">
                      <Button variant="contained" startIcon={<DownloadIcon />} fullWidth>
                        Generate Custom Report
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </LocalizationProvider>
    </Box>
  );
}

export default StaffAttendance;