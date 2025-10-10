"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent,
  Fab,
  Tooltip,
  Alert,
  Snackbar,
  TablePagination,
  InputAdornment,
  ButtonGroup,
  styled,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Class as ClassIcon,
} from "@mui/icons-material"
import {
  Search,
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
} from "lucide-react";


interface Staff {
  id: string
  name: string
  email: string
  department: string
  qualification: string
  experience: number
}

interface Subject {
  id: string
  name: string
  code: string
  department: string
  credits: number
}

interface Class {
  id: string
  name: string
  grade: string
  section: string
  strength: number
}

interface Allocation {
  id: string
  staffId: string
  subjectId: string
  classId: string
  academicYear: string
  semester: string
  hoursPerWeek: number
  createdAt: string
}

// Mock Data
const mockStaff: Staff[] = [
  {
    id: "STF001",
    name: "Dr. Sarah Williams",
    email: "sarah.w@school.edu",
    department: "Mathematics",
    qualification: "Ph.D. Mathematics",
    experience: 8,
  },
  {
    id: "STF002",
    name: "Prof. John Smith",
    email: "john.s@school.edu",
    department: "Physics",
    qualification: "M.Sc. Physics",
    experience: 12,
  },
  {
    id: "STF003",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    department: "Chemistry",
    qualification: "M.Sc. Chemistry",
    experience: 6,
  },
  {
    id: "STF004",
    name: "Mr. Michael Brown",
    email: "michael.b@school.edu",
    department: "English",
    qualification: "M.A. English",
    experience: 10,
  },
  {
    id: "STF005",
    name: "Dr. Lisa Johnson",
    email: "lisa.j@school.edu",
    department: "Biology",
    qualification: "Ph.D. Biology",
    experience: 15,
  },
]

const mockSubjects: Subject[] = [
  { id: "SUB001", name: "Advanced Mathematics", code: "MATH301", department: "Mathematics", credits: 4 },
  { id: "SUB002", name: "Physics Fundamentals", code: "PHY201", department: "Physics", credits: 3 },
  { id: "SUB003", name: "Organic Chemistry", code: "CHEM301", department: "Chemistry", credits: 4 },
  { id: "SUB004", name: "English Literature", code: "ENG201", department: "English", credits: 3 },
  { id: "SUB005", name: "Cell Biology", code: "BIO301", department: "Biology", credits: 4 },
  { id: "SUB006", name: "Algebra", code: "MATH201", department: "Mathematics", credits: 3 },
  { id: "SUB007", name: "Modern Physics", code: "PHY301", department: "Physics", credits: 4 },
]

const mockClasses: Class[] = [
  { id: "CLS001", name: "10th Grade A", grade: "10", section: "A", strength: 35 },
  { id: "CLS002", name: "10th Grade B", grade: "10", section: "B", strength: 32 },
  { id: "CLS003", name: "11th Grade A", grade: "11", section: "A", strength: 28 },
  { id: "CLS004", name: "11th Grade B", grade: "11", section: "B", strength: 30 },
  { id: "CLS005", name: "12th Grade A", grade: "12", section: "A", strength: 25 },
  { id: "CLS006", name: "12th Grade B", grade: "12", section: "B", strength: 27 },
]

const mockAllocations: Allocation[] = [
  {
    id: "ALL001",
    staffId: "STF001",
    subjectId: "SUB001",
    classId: "CLS003",
    academicYear: "2024-25",
    semester: "Fall",
    hoursPerWeek: 5,
    createdAt: "2024-01-15",
  },
  {
    id: "ALL002",
    staffId: "STF002",
    subjectId: "SUB002",
    classId: "CLS001",
    academicYear: "2024-25",
    semester: "Fall",
    hoursPerWeek: 4,
    createdAt: "2024-01-16",
  },
  {
    id: "ALL003",
    staffId: "STF003",
    subjectId: "SUB003",
    classId: "CLS005",
    academicYear: "2024-25",
    semester: "Fall",
    hoursPerWeek: 6,
    createdAt: "2024-01-17",
  },
  {
    id: "ALL004",
    staffId: "STF004",
    subjectId: "SUB004",
    classId: "CLS002",
    academicYear: "2024-25",
    semester: "Fall",
    hoursPerWeek: 3,
    createdAt: "2024-01-18",
  },
]

export default function AllocatePosition() {
  const [staff] = useState<Staff[]>(mockStaff)
  const [subjects] = useState<Subject[]>(mockSubjects)
  const [classes] = useState<Class[]>(mockClasses)
  const [allocations, setAllocations] = useState<Allocation[]>(mockAllocations)

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false)
  const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    staffId: "",
    subjectId: "",
    classId: "",
    academicYear: "2024-25",
    semester: "Fall",
    hoursPerWeek: 1,
  })

  // UI states
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

  // Statistics
  const [stats, setStats] = useState({
    totalAllocations: 0,
    totalStaff: 0,
    totalSubjects: 0,
    totalClasses: 0,
  })

  useEffect(() => {
    setStats({
      totalAllocations: allocations.length,
      totalStaff: staff.length,
      totalSubjects: subjects.length,
      totalClasses: classes.length,
    })
  }, [allocations, staff, subjects, classes])

  // Helper functions
  const getStaffName = (staffId: string) => staff.find((s) => s.id === staffId)?.name || "Unknown"
  const getSubjectName = (subjectId: string) => subjects.find((s) => s.id === subjectId)?.name || "Unknown"
  const getClassName = (classId: string) => classes.find((c) => c.id === classId)?.name || "Unknown"
  const getSubjectCode = (subjectId: string) => subjects.find((s) => s.id === subjectId)?.code || "Unknown"

  // Filter allocations based on search
  const filteredAllocations = allocations.filter((allocation) => {
    const staffName = getStaffName(allocation.staffId).toLowerCase()
    const subjectName = getSubjectName(allocation.subjectId).toLowerCase()
    const className = getClassName(allocation.classId).toLowerCase()
    const searchLower = searchTerm.toLowerCase()

    return staffName.includes(searchLower) || subjectName.includes(searchLower) || className.includes(searchLower)
  })

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.staffId || !formData.subjectId || !formData.classId) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" })
      return
    }

    // Check for duplicate allocation
    const duplicate = allocations.find(
      (a) =>
        a.staffId === formData.staffId &&
        a.subjectId === formData.subjectId &&
        a.classId === formData.classId &&
        a.academicYear === formData.academicYear &&
        a.semester === formData.semester &&
        (!editingAllocation || a.id !== editingAllocation.id),
    )

    if (duplicate) {
      setSnackbar({ open: true, message: "This allocation already exists", severity: "error" })
      return
    }

    if (editingAllocation) {
      // Update existing allocation
      setAllocations((prev) => prev.map((a) => (a.id === editingAllocation.id ? { ...a, ...formData } : a)))
      setSnackbar({ open: true, message: "Allocation updated successfully", severity: "success" })
    } else {
      // Create new allocation
      const newAllocation: Allocation = {
        id: `ALL${String(allocations.length + 1).padStart(3, "0")}`,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setAllocations((prev) => [...prev, newAllocation])
      setSnackbar({ open: true, message: "Allocation created successfully", severity: "success" })
    }

    handleCloseDialog()
  }

  // Handle edit
  const handleEdit = (allocation: Allocation) => {
    setEditingAllocation(allocation)
    setFormData({
      staffId: allocation.staffId,
      subjectId: allocation.subjectId,
      classId: allocation.classId,
      academicYear: allocation.academicYear,
      semester: allocation.semester,
      hoursPerWeek: allocation.hoursPerWeek,
    })
    setOpenDialog(true)
  }

  // Handle delete
  const handleDelete = (id: string) => {
    setAllocations((prev) => prev.filter((a) => a.id !== id))
    setSnackbar({ open: true, message: "Allocation deleted successfully", severity: "success" })
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingAllocation(null)
    setFormData({
      staffId: "",
      subjectId: "",
      classId: "",
      academicYear: "2024-25",
      semester: "Fall",
      hoursPerWeek: 1,
    })
  }

  const ActionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

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
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 500 }} component="h1" gutterBottom>
            Position Allocation Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage staff assignments to position for the academic year
          </Typography>
        </Box>
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
          <span>Staff</span>
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

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PersonIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalStaff}
                  </Typography>
                  <Typography color="text.secondary">Total Staff</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="secondary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalSubjects}
                  </Typography>
                  <Typography color="text.secondary">Total Subjects</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ClassIcon color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalClasses}
                  </Typography>
                  <Typography color="text.secondary">Total Classes</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AddIcon color="warning" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalAllocations}
                  </Typography>
                  <Typography color="text.secondary">Active Allocations</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Add Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <TextField
          placeholder="Search allocations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} size="large">
          New Allocation
        </Button>
      </Box>

      {/* Allocations Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Staff Member</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell align="center">Hours/Week</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllocations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((allocation) => (
                <TableRow key={allocation.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {getStaffName(allocation.staffId)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {allocation.staffId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {getSubjectName(allocation.subjectId)}
                      </Typography>
                      <Chip label={getSubjectCode(allocation.subjectId)} size="small" variant="outlined" />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {getClassName(allocation.classId)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={allocation.academicYear} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={allocation.semester} color="secondary" size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="bold">
                      {allocation.hoursPerWeek}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Allocation">
                      <IconButton color="primary" onClick={() => handleEdit(allocation)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Allocation">
                      <IconButton color="error" onClick={() => handleDelete(allocation.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAllocations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number.parseInt(e.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingAllocation ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Staff Member</InputLabel>
                  <Select
                    value={formData.staffId}
                    label="Staff Member"
                    onChange={(e) => setFormData((prev) => ({ ...prev, staffId: e.target.value }))}
                  >
                    {staff.map((member) => (
                      <MenuItem key={member.id} value={member.id}>
                        <Box>
                          <Typography variant="body2">{member.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.department} • {member.qualification}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    value={formData.subjectId}
                    label="Subject"
                    onChange={(e) => setFormData((prev) => ({ ...prev, subjectId: e.target.value }))}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        <Box>
                          <Typography variant="body2">{subject.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {subject.code} • {subject.credits} Credits
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={formData.classId}
                    label="Class"
                    onChange={(e) => setFormData((prev) => ({ ...prev, classId: e.target.value }))}
                  >
                    {classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        <Box>
                          <Typography variant="body2">{cls.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Strength: {cls.strength} students
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hours per Week"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, hoursPerWeek: Number.parseInt(e.target.value) || 1 }))
                  }
                  inputProps={{ min: 1, max: 40 }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Academic Year</InputLabel>
                  <Select
                    value={formData.academicYear}
                    label="Academic Year"
                    onChange={(e) => setFormData((prev) => ({ ...prev, academicYear: e.target.value }))}
                  >
                    <MenuItem value="2023-24">2023-24</MenuItem>
                    <MenuItem value="2024-25">2024-25</MenuItem>
                    <MenuItem value="2025-26">2025-26</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>
                  <Select
                    value={formData.semester}
                    label="Semester"
                    onChange={(e) => setFormData((prev) => ({ ...prev, semester: e.target.value }))}
                  >
                    <MenuItem value="Fall">Fall</MenuItem>
                    <MenuItem value="Spring">Spring</MenuItem>
                    <MenuItem value="Summer">Summer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAllocation ? "Update" : "Create"} Allocation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Fab>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
