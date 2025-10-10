"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Button,
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
import { SelectChangeEvent } from "@mui/material"
import { Add, Print, FileDownload } from "@mui/icons-material"

const initialStaff = [
  {
    id: 1,
    name: "John Smith",
    position: "Teacher",
    department: "Science",
    basicSalary: 3500,
    allowances: 500,
    deductions: 200,
    netSalary: 3800,
    paymentStatus: "Paid",
    paymentDate: "2023-05-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Administrator",
    department: "Admin",
    basicSalary: 4000,
    allowances: 600,
    deductions: 300,
    netSalary: 4300,
    paymentStatus: "Paid",
    paymentDate: "2023-05-15",
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "Teacher",
    department: "Mathematics",
    basicSalary: 3600,
    allowances: 450,
    deductions: 250,
    netSalary: 3800,
    paymentStatus: "Pending",
    paymentDate: "",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Teacher",
    department: "English",
    basicSalary: 3500,
    allowances: 500,
    deductions: 200,
    netSalary: 3800,
    paymentStatus: "Paid",
    paymentDate: "2023-05-14",
  },
  {
    id: 5,
    name: "Robert Wilson",
    position: "Librarian",
    department: "Library",
    basicSalary: 3200,
    allowances: 400,
    deductions: 150,
    netSalary: 3450,
    paymentStatus: "Paid",
    paymentDate: "2023-05-15",
  },
]

export default function Payroll() {
  const [staff, setStaff] = useState(initialStaff)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    department: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewStaff({
      ...newStaff,
      [name]: name === "basicSalary" || name === "allowances" || name === "deductions" ? Number(value) : value,
    })
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    setNewStaff({
      ...newStaff,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    const netSalary = newStaff.basicSalary + newStaff.allowances - newStaff.deductions
    const newStaffMember = {
      id: staff.length + 1,
      ...newStaff,
      netSalary,
      paymentStatus: "Pending",
      paymentDate: "",
    }
    setStaff([...staff, newStaffMember])
    setNewStaff({
      name: "",
      position: "",
      department: "",
      basicSalary: 0,
      allowances: 0,
      deductions: 0,
    })
    handleClose()
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Staff Payroll Management</Typography>
        <Box>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen} sx={{ mr: 1 }}>
            Add Staff
          </Button>
          <Button variant="outlined" startIcon={<Print />} sx={{ mr: 1 }}>
            Print
          </Button>
          <Button variant="outlined" startIcon={<FileDownload />}>
            Export
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="payroll table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell align="right">Basic Salary ($)</TableCell>
                <TableCell align="right">Allowances ($)</TableCell>
                <TableCell align="right">Deductions ($)</TableCell>
                <TableCell align="right">Net Salary ($)</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Payment Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell align="right">{row.basicSalary.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.allowances.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.deductions.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.netSalary.toFixed(2)}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: row.paymentStatus === "Paid" ? "green" : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {row.paymentStatus}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.paymentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={staff.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField name="name" label="Full Name" fullWidth value={newStaff.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select name="position" value={newStaff.position} label="Position" onChange={handleSelectChange}>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Librarian">Librarian</MenuItem>
                  <MenuItem value="Counselor">Counselor</MenuItem>
                  <MenuItem value="Support Staff">Support Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select name="department" value={newStaff.department} label="Department" onChange={handleSelectChange}>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Library">Library</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="basicSalary"
                label="Basic Salary"
                type="number"
                fullWidth
                value={newStaff.basicSalary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="allowances"
                label="Allowances"
                type="number"
                fullWidth
                value={newStaff.allowances}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="deductions"
                label="Deductions"
                type="number"
                fullWidth
                value={newStaff.deductions}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Staff
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}