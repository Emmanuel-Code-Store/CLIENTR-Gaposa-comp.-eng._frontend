"use client"

import type React from "react"
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material"
import { Add, Print, FileDownload, Search } from "@mui/icons-material"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`finance-tabpanel-${index}`}
      aria-labelledby={`finance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

// Sample data for demonstration
const initialStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    class: "Grade 10",
    section: "A",
    tuitionFee: 1500,
    booksFee: 200,
    uniformFee: 100,
    excursionFee: 150,
    otherFees: 50,
    totalFees: 2000,
    amountPaid: 1500,
    balance: 500,
    status: "Partial",
  },
  {
    id: 2,
    name: "Bob Williams",
    class: "Grade 9",
    section: "B",
    tuitionFee: 1500,
    booksFee: 200,
    uniformFee: 100,
    excursionFee: 150,
    otherFees: 50,
    totalFees: 2000,
    amountPaid: 2000,
    balance: 0,
    status: "Paid",
  },
  {
    id: 3,
    name: "Charlie Brown",
    class: "Grade 11",
    section: "A",
    tuitionFee: 1600,
    booksFee: 250,
    uniformFee: 100,
    excursionFee: 200,
    otherFees: 50,
    totalFees: 2200,
    amountPaid: 1000,
    balance: 1200,
    status: "Partial",
  },
  {
    id: 4,
    name: "Diana Miller",
    class: "Grade 10",
    section: "B",
    tuitionFee: 1500,
    booksFee: 200,
    uniformFee: 100,
    excursionFee: 150,
    otherFees: 50,
    totalFees: 2000,
    amountPaid: 0,
    balance: 2000,
    status: "Unpaid",
  },
  {
    id: 5,
    name: "Edward Davis",
    class: "Grade 9",
    section: "A",
    tuitionFee: 1500,
    booksFee: 200,
    uniformFee: 100,
    excursionFee: 150,
    otherFees: 50,
    totalFees: 2000,
    amountPaid: 2000,
    balance: 0,
    status: "Paid",
  },
]

// Sample fee structure
const feeStructure = [
  {
    grade: "Grade 9",
    tuitionFee: 1500,
    booksFee: 200,
    uniformFee: 100,
    excursionFee: 150,
    otherFees: 50,
    total: 2000,
  },
  {
    grade: "Grade 10",
    tuitionFee: 1500,
    booksFee: 200,
    uniformFee: 100,
    excursionFee: 150,
    otherFees: 50,
    total: 2000,
  },
  {
    grade: "Grade 11",
    tuitionFee: 1600,
    booksFee: 250,
    uniformFee: 100,
    excursionFee: 200,
    otherFees: 50,
    total: 2200,
  },
  {
    grade: "Grade 12",
    tuitionFee: 1700,
    booksFee: 300,
    uniformFee: 100,
    excursionFee: 250,
    otherFees: 50,
    total: 2400,
  },
]

export default function FinanceBroadsheet() {
  const [tabValue, setTabValue] = useState(0)
  const [students, setStudents] = useState(initialStudents)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    tuitionFee: 0,
    booksFee: 0,
    uniformFee: 0,
    excursionFee: 0,
    otherFees: 0,
    amountPaid: 0,
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewStudent({
      ...newStudent,
      [name]: ["tuitionFee", "booksFee", "uniformFee", "excursionFee", "otherFees", "amountPaid"].includes(name)
        ? Number(value)
        : value,
    })
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target

    // If class is changed, update fee structure based on selected grade
    if (name === "class") {
      const selectedFeeStructure = feeStructure.find((fee) => fee.grade === value)
      if (selectedFeeStructure) {
        setNewStudent({
          ...newStudent,
          class: value,
          tuitionFee: selectedFeeStructure.tuitionFee,
          booksFee: selectedFeeStructure.booksFee,
          uniformFee: selectedFeeStructure.uniformFee,
          excursionFee: selectedFeeStructure.excursionFee,
          otherFees: selectedFeeStructure.otherFees,
        })
        return
      }
    }

    setNewStudent({
      ...newStudent,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    const totalFees =
      newStudent.tuitionFee +
      newStudent.booksFee +
      newStudent.uniformFee +
      newStudent.excursionFee +
      newStudent.otherFees

    const balance = totalFees - newStudent.amountPaid
    let status = "Unpaid"

    if (balance === 0) {
      status = "Paid"
    } else if (newStudent.amountPaid > 0) {
      status = "Partial"
    }

    const newStudentRecord = {
      id: students.length + 1,
      ...newStudent,
      totalFees,
      balance,
      status,
    }

    setStudents([...students, newStudentRecord])
    setNewStudent({
      name: "",
      class: "",
      section: "",
      tuitionFee: 0,
      booksFee: 0,
      uniformFee: 0,
      excursionFee: 0,
      otherFees: 0,
      amountPaid: 0,
    })
    handleClose()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(0)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">School Finance Broadsheet</Typography>
        <Box>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen} sx={{ mr: 1 }}>
            Add Student
          </Button>
          <Button variant="outlined" startIcon={<Print />} sx={{ mr: 1 }}>
            Print
          </Button>
          <Button variant="outlined" startIcon={<FileDownload />}>
            Export
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="finance tabs">
          <Tab label="Student Fees" />
          <Tab label="Fee Structure" />
          <Tab label="Payment Summary" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, class, or payment status"
            InputProps={{
              startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
            }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="student fees table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell align="right">Tuition ($)</TableCell>
                  <TableCell align="right">Books ($)</TableCell>
                  <TableCell align="right">Uniform ($)</TableCell>
                  <TableCell align="right">Excursion ($)</TableCell>
                  <TableCell align="right">Other ($)</TableCell>
                  <TableCell align="right">Total ($)</TableCell>
                  <TableCell align="right">Paid ($)</TableCell>
                  <TableCell align="right">Balance ($)</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.class}</TableCell>
                    <TableCell>{row.section}</TableCell>
                    <TableCell align="right">{row.tuitionFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.booksFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.uniformFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.excursionFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.otherFees.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.totalFees.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.amountPaid.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.balance.toFixed(2)}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: row.status === "Paid" ? "green" : row.status === "Partial" ? "orange" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {row.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="fee structure table">
              <TableHead>
                <TableRow>
                  <TableCell>Grade</TableCell>
                  <TableCell align="right">Tuition Fee ($)</TableCell>
                  <TableCell align="right">Books Fee ($)</TableCell>
                  <TableCell align="right">Uniform Fee ($)</TableCell>
                  <TableCell align="right">Excursion Fee ($)</TableCell>
                  <TableCell align="right">Other Fees ($)</TableCell>
                  <TableCell align="right">Total ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feeStructure.map((row) => (
                  <TableRow key={row.grade} hover>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell align="right">{row.tuitionFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.booksFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.uniformFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.excursionFee.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.otherFees.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Summary
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Expected Revenue</TableCell>
                      <TableCell align="right">$10,200.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Collected</TableCell>
                      <TableCell align="right">$6,500.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Outstanding Balance</TableCell>
                      <TableCell align="right">$3,700.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Collection Rate</TableCell>
                      <TableCell align="right">63.7%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Status
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Fully Paid Students</TableCell>
                      <TableCell align="right">2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Partially Paid Students</TableCell>
                      <TableCell align="right">2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Unpaid Students</TableCell>
                      <TableCell align="right">1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Students</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Student Name"
                fullWidth
                value={newStudent.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Class/Grade</InputLabel>
                <Select name="class" value={newStudent.class} label="Class/Grade" onChange={handleSelectChange}>
                  <MenuItem value="Grade 9">Grade 9</MenuItem>
                  <MenuItem value="Grade 10">Grade 10</MenuItem>
                  <MenuItem value="Grade 11">Grade 11</MenuItem>
                  <MenuItem value="Grade 12">Grade 12</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Section</InputLabel>
                <Select name="section" value={newStudent.section} label="Section" onChange={handleSelectChange}>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Fee Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="tuitionFee"
                label="Tuition Fee"
                type="number"
                fullWidth
                value={newStudent.tuitionFee}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="booksFee"
                label="Books Fee"
                type="number"
                fullWidth
                value={newStudent.booksFee}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="uniformFee"
                label="Uniform Fee"
                type="number"
                fullWidth
                value={newStudent.uniformFee}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="excursionFee"
                label="Excursion Fee"
                type="number"
                fullWidth
                value={newStudent.excursionFee}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="otherFees"
                label="Other Fees"
                type="number"
                fullWidth
                value={newStudent.otherFees}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="amountPaid"
                label="Amount Paid"
                type="number"
                fullWidth
                value={newStudent.amountPaid}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Total Fee: $
                {(
                  newStudent.tuitionFee +
                  newStudent.booksFee +
                  newStudent.uniformFee +
                  newStudent.excursionFee +
                  newStudent.otherFees
                ).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Balance: $
                {(
                  newStudent.tuitionFee +
                  newStudent.booksFee +
                  newStudent.uniformFee +
                  newStudent.excursionFee +
                  newStudent.otherFees -
                  newStudent.amountPaid
                ).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}