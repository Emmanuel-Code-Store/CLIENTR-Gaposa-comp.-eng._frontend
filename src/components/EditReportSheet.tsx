"use client"
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Fab,
  TextField,
  Divider,
} from "@mui/material"
import {
  Print,
  Download,
  NavigateNext,
  NavigateBefore,
  School,
  EmojiEvents,
  SportsScore,
  Groups,
  BarChart,
} from "@mui/icons-material"
import { useState } from "react"

const EditReportSheet = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Sample student data
  const studentData = {
    name: "Sarah Johnson",
    class: "Grade 10A",
    schoolYear: "2023-2024",
    teacherName: "Mrs. Jennifer Adams",
    sheetNo: "RC-2024-156",
  }

  const subjects = [
    { subject: "Reading", term1: 82, term2: 85, term3: 88, term4: 90, total: 345, obtained: 86, grade: "A" },
    { subject: "Language", term1: 78, term2: 80, term3: 82, term4: 85, total: 325, obtained: 81, grade: "A-" },
    { subject: "Spelling", term1: 90, term2: 92, term3: 88, term4: 94, total: 364, obtained: 91, grade: "A+" },
    { subject: "Writing", term1: 75, term2: 78, term3: 82, term4: 85, total: 320, obtained: 80, grade: "A-" },
    { subject: "Math", term1: 88, term2: 90, term3: 92, term4: 94, total: 364, obtained: 91, grade: "A+" },
    { subject: "Science", term1: 85, term2: 87, term3: 89, term4: 91, total: 352, obtained: 88, grade: "A" },
    { subject: "Social Studies", term1: 80, term2: 82, term3: 85, term4: 88, total: 335, obtained: 84, grade: "B+" },
    {
      subject: "Physical Education",
      term1: 90,
      term2: 92,
      term3: 90,
      term4: 94,
      total: 366,
      obtained: 92,
      grade: "A+",
    },
    { subject: "Art", term1: 85, term2: 88, term3: 90, term4: 92, total: 355, obtained: 89, grade: "A" },
    { subject: "Music", term1: 82, term2: 85, term3: 87, term4: 90, total: 344, obtained: 86, grade: "A" },
    { subject: "Extracurricular", term1: 88, term2: 90, term3: 92, term4: 95, total: 365, obtained: 91, grade: "A+" },
  ]

  const termGrades = [
    { term: "1st", quarterlyGrade: "A-", averageGrade: 84 },
    { term: "2nd", quarterlyGrade: "A", averageGrade: 86 },
    { term: "3rd", quarterlyGrade: "A", averageGrade: 88 },
    { term: "4th", quarterlyGrade: "A+", averageGrade: 91 },
  ]

  const attendanceData = {
    totalDays: 200,
    attended: 185,
    absent: 15,
    lateArrivals: 5,
    earlyDepartures: 3,
    attendanceByTerm: [
      { term: "1st Term", percentage: 90 },
      { term: "2nd Term", percentage: 92 },
      { term: "3rd Term", percentage: 94 },
      { term: "4th Term", percentage: 96 },
    ],
  }

  const sportsData = [
    {
      activity: "Basketball",
      role: "Team Captain",
      achievements: "Inter-school Champion",
      participation: 95,
      sportsmanship: 90,
      teamwork: 92,
    },
    {
      activity: "Swimming",
      role: "Team Member",
      achievements: "District Level Participation",
      participation: 88,
      sportsmanship: 92,
      teamwork: 90,
    },
    {
      activity: "Athletics",
      role: "Sprinter",
      achievements: "School Record in 100m Sprint",
      participation: 94,
      sportsmanship: 88,
      teamwork: 85,
    },
  ]

  const socialData = {
    leadership: 90,
    communication: 85,
    teamwork: 92,
    respect: 95,
    responsibility: 88,
    activities: [
      { activity: "Student Council", role: "Class Representative", performance: "Excellent" },
      { activity: "Debate Club", role: "Active Member", performance: "Very Good" },
      { activity: "Community Service", role: "Volunteer", performance: "Outstanding" },
    ],
  }

  const academicProgress = {
    strengths: ["Critical thinking", "Problem-solving", "Research skills", "Written communication"],
    areasForImprovement: ["Oral presentations", "Group discussions", "Time management"],
    achievements: ["Science Fair Winner", "Essay Competition Finalist", "Perfect Attendance Award"],
    termProgress: [
      { term: "1st Term", score: 84 },
      { term: "2nd Term", score: 86 },
      { term: "3rd Term", score: 88 },
      { term: "4th Term", score: 91 },
    ],
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    window.print()
  }

  const FloatingActionButtons = () => (
    <Box
      className="no-print"
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Fab color="primary" onClick={handlePrint} sx={{ bgcolor: "#4CAF50" }}>
        <Print />
      </Fab>
      <Fab color="secondary" onClick={handleDownload} sx={{ bgcolor: "#1a237e" }}>
        <Download />
      </Fab>
      <Fab
        onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)}
        sx={{ bgcolor: currentPage === 1 ? "#1a237e" : "#4CAF50", color: "white" }}
      >
        {currentPage === 1 ? <NavigateNext /> : <NavigateBefore />}
      </Fab>
    </Box>
  )

  if (currentPage === 1) {
    return (
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <FloatingActionButtons />

        <Box id="report-content" sx={{ maxWidth: "210mm", margin: "0 auto", p: 2 }}>
          {/* Page 1 - Report Card */}
          <Paper
            elevation={1}
            sx={{
              p: 4,
              mb: 4,
              minHeight: "297mm",
              position: "relative",
              overflow: "hidden",
              border: "1px solid #ddd",
            }}
          >
            {/* Decorative corner elements */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 80,
                height: 80,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%231a237e'%3E%3Cpath d='M0,0 C30,10 50,30 60,100 L0,100 Z'/%3E%3C/svg%3E")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                opacity: 0.1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 80,
                height: 80,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%231a237e'%3E%3Cpath d='M100,100 C70,90 50,70 40,0 L100,0 Z'/%3E%3C/svg%3E")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                opacity: 0.1,
              }}
            />

            {/* Green curved element on right side */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: "150px",
                background: `
                  linear-gradient(to bottom, transparent, transparent),
                  linear-gradient(to bottom, #4CAF50, #4CAF50),
                  linear-gradient(to bottom, #1a237e, #1a237e)
                `,
                backgroundSize: "100px 100%, 30px 100%, 70px 100%",
                backgroundPosition: "right top, right top, calc(100% - 30px) top",
                backgroundRepeat: "no-repeat",
                zIndex: 0,
                clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)",
              }}
            />

            {/* Content wrapper */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: "#4CAF50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mr: 2,
                    }}
                  >
                    <School sx={{ fontSize: 30, color: "white" }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000" }}>
                      REPORT CARD
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      School Name Goes Here
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ ml: "auto", textAlign: "right" }}>
                  <Typography variant="body2">
                    <strong>Sheet No:</strong> {studentData.sheetNo}
                  </Typography>
                </Box>
              </Box>

              {/* Student Information */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ minWidth: 120 }}>
                      Student Name:
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      defaultValue={studentData.name}
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& input": { borderBottom: "1px solid #000" } }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ minWidth: 120 }}>
                      Class/Section:
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      defaultValue={studentData.class}
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& input": { borderBottom: "1px solid #000" } }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ minWidth: 120 }}>
                      School Year:
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      defaultValue={studentData.schoolYear}
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& input": { borderBottom: "1px solid #000" } }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ minWidth: 120 }}>
                      Teacher Name:
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      defaultValue={studentData.teacherName}
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& input": { borderBottom: "1px solid #000" } }}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* Subjects Table */}
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>Subject</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        1<sup>st</sup> Term
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        2<sup>nd</sup> Term
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        3<sup>rd</sup> Term
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        4<sup>th</sup> Term
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        Total
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        Obtained
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                        Grade
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjects.map((subject, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "rgba(0, 0, 0, 0.02)",
                          },
                        }}
                      >
                        <TableCell>{subject.subject}</TableCell>
                        <TableCell align="center">{subject.term1}</TableCell>
                        <TableCell align="center">{subject.term2}</TableCell>
                        <TableCell align="center">{subject.term3}</TableCell>
                        <TableCell align="center">{subject.term4}</TableCell>
                        <TableCell align="center">{subject.total}</TableCell>
                        <TableCell align="center">{subject.obtained}</TableCell>
                        <TableCell align="center">{subject.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Terms Based Grades */}
              <Box sx={{ mb: 4 }}>
                <TableContainer component={Paper} variant="outlined" sx={{ width: "50%", ml: "auto" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          Terms Based Grades
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          1<sup>st</sup>
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          2<sup>nd</sup>
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          3<sup>rd</sup>
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          4<sup>th</sup>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Quarterly Grade</TableCell>
                        {termGrades.map((term, index) => (
                          <TableCell key={index} align="center">
                            {term.quarterlyGrade}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Grade</TableCell>
                        {termGrades.map((term, index) => (
                          <TableCell key={index} align="center">
                            {term.averageGrade}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Teacher's Feedback */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ textAlign: "right", mb: 1 }}>
                  TEACHER&apos;S FEEDBACK
                </Typography>
                <Box
                  sx={{
                    borderBottom: "1px solid #000",
                    height: "24px",
                    mb: 1,
                  }}
                />
                <Box
                  sx={{
                    borderBottom: "1px solid #000",
                    height: "24px",
                    mb: 1,
                  }}
                />
                <Box
                  sx={{
                    borderBottom: "1px solid #000",
                    height: "24px",
                    mb: 1,
                  }}
                />
              </Box>

              {/* Attendance */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    Total School Days:
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid #000",
                      width: "60px",
                      textAlign: "center",
                    }}
                  >
                    {attendanceData.totalDays}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    Attended:
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid #000",
                      width: "60px",
                      textAlign: "center",
                    }}
                  >
                    {attendanceData.attended}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    Absent:
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid #000",
                      width: "60px",
                      textAlign: "center",
                    }}
                  >
                    {attendanceData.absent}
                  </Box>
                </Box>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "#e0e0e0",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2">OFFICE TEMPLATES ONLINE</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    )
  }

  // Page 2 - Detailed Analysis
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <FloatingActionButtons />

      <Box id="report-content" sx={{ maxWidth: "210mm", margin: "0 auto", p: 2 }}>
        <Paper
          elevation={1}
          sx={{
            p: 4,
            minHeight: "297mm",
            position: "relative",
            overflow: "hidden",
            border: "1px solid #ddd",
          }}
        >
          {/* Decorative corner elements */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 80,
              height: 80,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%231a237e'%3E%3Cpath d='M0,0 C30,10 50,30 60,100 L0,100 Z'/%3E%3C/svg%3E")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              opacity: 0.1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 80,
              height: 80,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%231a237e'%3E%3Cpath d='M100,100 C70,90 50,70 40,0 L100,0 Z'/%3E%3C/svg%3E")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom right",
              opacity: 0.1,
            }}
          />

          {/* Green curved element on right side */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "150px",
              background: `
                linear-gradient(to bottom, transparent, transparent),
                linear-gradient(to bottom, #4CAF50, #4CAF50),
                linear-gradient(to bottom, #1a237e, #1a237e)
              `,
              backgroundSize: "100px 100%, 30px 100%, 70px 100%",
              backgroundPosition: "right top, right top, calc(100% - 30px) top",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
              clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)",
            }}
          />

          {/* Content wrapper */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#4CAF50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    mr: 2,
                  }}
                >
                  <BarChart sx={{ fontSize: 30, color: "white" }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000" }}>
                    DETAILED PERFORMANCE ANALYSIS
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {studentData.name} - {studentData.class} | {studentData.schoolYear}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Attendance Analysis */}
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#4CAF50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mr: 2,
                    }}
                  >
                    <School sx={{ fontSize: 24, color: "white" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1a237e" }}>
                    Attendance Analysis
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={5}>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                              Attendance Summary
                            </TableCell>
                            <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                              Count
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Total School Days</TableCell>
                            <TableCell align="center">{attendanceData.totalDays}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Days Present</TableCell>
                            <TableCell align="center">{attendanceData.attended}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Days Absent</TableCell>
                            <TableCell align="center">{attendanceData.absent}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Late Arrivals</TableCell>
                            <TableCell align="center">{attendanceData.lateArrivals}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Early Departures</TableCell>
                            <TableCell align="center">{attendanceData.earlyDepartures}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      Attendance Rate by Term
                    </Typography>
                    {attendanceData.attendanceByTerm.map((term, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2">{term.term}</Typography>
                          <Typography variant="body2">{term.percentage}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={term.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#4CAF50",
                            },
                          }}
                        />
                      </Box>
                    ))}
                    <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                      <Typography variant="body2">
                        <strong>Overall Attendance Rate:</strong>{" "}
                        {Math.round((attendanceData.attended / attendanceData.totalDays) * 100)}% - Excellent
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Sarah has maintained excellent attendance throughout the year, with a notable improvement in the
                        4th term.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Sports Performance */}
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#1a237e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mr: 2,
                    }}
                  >
                    <SportsScore sx={{ fontSize: 24, color: "white" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1a237e" }}>
                    Sports Performance
                  </Typography>
                </Box>

                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>Activity</TableCell>
                        <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>Role</TableCell>
                        <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          Achievements
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          Participation
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          Sportsmanship
                        </TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                          Teamwork
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sportsData.map((sport, index) => (
                        <TableRow key={index}>
                          <TableCell>{sport.activity}</TableCell>
                          <TableCell>{sport.role}</TableCell>
                          <TableCell>{sport.achievements}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <LinearProgress
                                variant="determinate"
                                value={sport.participation}
                                sx={{
                                  width: "100%",
                                  mr: 1,
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: "#e0e0e0",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: "#4CAF50",
                                  },
                                }}
                              />
                              <Typography variant="body2">{sport.participation}%</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <LinearProgress
                                variant="determinate"
                                value={sport.sportsmanship}
                                sx={{
                                  width: "100%",
                                  mr: 1,
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: "#e0e0e0",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: "#4CAF50",
                                  },
                                }}
                              />
                              <Typography variant="body2">{sport.sportsmanship}%</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <LinearProgress
                                variant="determinate"
                                value={sport.teamwork}
                                sx={{
                                  width: "100%",
                                  mr: 1,
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: "#e0e0e0",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: "#4CAF50",
                                  },
                                }}
                              />
                              <Typography variant="body2">{sport.teamwork}%</Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Coach&apos;s Comments:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Sarah demonstrates exceptional leadership qualities as the basketball team captain. Her dedication
                    to practice and ability to motivate teammates has contributed significantly to the team&apos;s success.
                    She shows great potential in athletics with her record-breaking sprint performance.
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Academic Progress */}
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#4CAF50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mr: 2,
                    }}
                  >
                    <School sx={{ fontSize: 24, color: "white" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1a237e" }}>
                    Academic Progress
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      Term Progress
                    </Typography>
                    {academicProgress.termProgress.map((term, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2">{term.term}</Typography>
                          <Typography variant="body2">{term.score}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={term.score}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#1a237e",
                            },
                          }}
                        />
                      </Box>
                    ))}

                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
                      Academic Achievements
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {academicProgress.achievements.map((achievement, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <EmojiEvents sx={{ color: "#FFD700", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{achievement}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      Academic Strengths
                    </Typography>
                    <Box sx={{ pl: 2, mb: 3 }}>
                      {academicProgress.strengths.map((strength, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "#4CAF50",
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2">{strength}</Typography>
                        </Box>
                      ))}
                    </Box>

                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                      Areas for Improvement
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {academicProgress.areasForImprovement.map((area, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "#1a237e",
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2">{area}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Academic Summary:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Sarah has shown consistent academic improvement throughout the year, with her strongest performance
                    in the 4th term. Her critical thinking and problem-solving skills are particularly noteworthy. She
                    would benefit from more participation in group discussions and oral presentations to further enhance
                    her communication skills.
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Social and Behavioral Skills */}
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#1a237e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mr: 2,
                    }}
                  >
                    <Groups sx={{ fontSize: 24, color: "white" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1a237e" }}>
                    Social and Behavioral Skills
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
                      Social Skills Assessment
                    </Typography>
                    {Object.entries(socialData)
                      .slice(0, 5)
                      .map(([skill, score]) => (
                        <Box key={skill} sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                              {skill}
                            </Typography>
                            <Typography variant="body2">80%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={Number(score)}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: "#e0e0e0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: "#4CAF50",
                              },
                            }}
                          />
                        </Box>
                      ))}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
                      Social Activities Participation
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                              Activity
                            </TableCell>
                            <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>Role</TableCell>
                            <TableCell sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
                              Performance
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {socialData.activities.map((activity, index) => (
                            <TableRow key={index}>
                              <TableCell>{activity.activity}</TableCell>
                              <TableCell>{activity.role}</TableCell>
                              <TableCell>
                                <Chip
                                  label={activity.performance}
                                  size="small"
                                  sx={{
                                    bgcolor:
                                      activity.performance === "Excellent"
                                        ? "#4CAF50"
                                        : activity.performance === "Outstanding"
                                          ? "#1a237e"
                                          : "#FF9800",
                                    color: "white",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Social Development Summary:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Sarah demonstrates excellent social skills, particularly in leadership and respect for others. Her
                    role as Class Representative in the Student Council has allowed her to develop strong communication
                    and organizational abilities. She actively participates in community service activities, showing
                    compassion and responsibility. Sarah works well with peers and is often sought out for group
                    projects.
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Overall Recommendations */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1a237e", mb: 2 }}>
                  Overall Recommendations
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" paragraph>
                  <strong>Academic:</strong> Sarah should continue her excellent work in STEM subjects while focusing on
                  improving her oral presentation skills. Consider enrolling in advanced placement courses for
                  Mathematics and Science in the next academic year.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Social Development:</strong> Encourage Sarah to continue her leadership role in the Student
                  Council and consider mentoring younger students. Her natural leadership abilities would benefit from
                  structured leadership training opportunities.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Sports:</strong> Sarah shows exceptional talent in athletics and basketball. Consider
                  specialized coaching to further develop her skills and explore competitive opportunities at the
                  regional level.
                </Typography>
                <Typography variant="body2">
                  <strong>Overall:</strong> Sarah is a well-rounded student with strong academic performance and
                  excellent social skills. With continued guidance and opportunities for growth, she has the potential
                  to excel in her areas of interest and develop into a confident, capable young adult.
                </Typography>
              </CardContent>
            </Card>

            {/* Footer */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "30%" }}>
                <Divider />
                <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                  Class Teacher&apos;s Signature
                </Typography>
              </Box>
              <Box sx={{ width: "30%" }}>
                <Divider />
                <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                  Principal&apos;s Signature
                </Typography>
              </Box>
              <Box sx={{ width: "30%" }}>
                <Divider />
                <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                  Parent&apos;s Signature
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default EditReportSheet
