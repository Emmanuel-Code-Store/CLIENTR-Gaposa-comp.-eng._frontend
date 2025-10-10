"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Box,
  Button,
  Card,
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
  Divider,
} from "@mui/material"
import { Add, Print, FileDownload, Search, Receipt } from "@mui/icons-material"
import { SelectChangeEvent } from "@mui/material/Select"

interface Receipt {
  id: string
  studentId: number
  studentName: string
  class: string
  date: string
  amount: number
  paymentMethod: string
  description: string
  issuedBy: string
}

interface Student {
  id: number
  name: string
  class: string
  balance: number
}

const initialReceipts: Receipt[] = [
  {
    id: "REC-001",
    studentId: 1,
    studentName: "Alice Johnson",
    class: "Grade 10",
    date: "2023-05-15",
    amount: 1500,
    paymentMethod: "Cash",
    description: "Tuition Fee Payment",
    issuedBy: "John Admin",
  },
  {
    id: "REC-002",
    studentId: 2,
    studentName: "Bob Williams",
    class: "Grade 9",
    date: "2023-05-16",
    amount: 2000,
    paymentMethod: "Bank Transfer",
    description: "Full Fee Payment",
    issuedBy: "John Admin",
  },
  {
    id: "REC-003",
    studentId: 3,
    studentName: "Charlie Brown",
    class: "Grade 11",
    date: "2023-05-17",
    amount: 1000,
    paymentMethod: "Credit Card",
    description: "Partial Fee Payment",
    issuedBy: "Sarah Manager",
  },
  {
    id: "REC-004",
    studentId: 5,
    studentName: "Edward Davis",
    class: "Grade 9",
    date: "2023-05-18",
    amount: 2000,
    paymentMethod: "Cash",
    description: "Full Fee Payment",
    issuedBy: "Sarah Manager",
  },
]

const students: Student[] = [
  { id: 1, name: "Alice Johnson", class: "Grade 10", balance: 500 },
  { id: 2, name: "Bob Williams", class: "Grade 9", balance: 0 },
  { id: 3, name: "Charlie Brown", class: "Grade 11", balance: 1200 },
  { id: 4, name: "Diana Miller", class: "Grade 10", balance: 2000 },
  { id: 5, name: "Edward Davis", class: "Grade 9", balance: 0 },
]

export default function ViewReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts)
  const [open, setOpen] = useState(false)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)
  const [newReceipt, setNewReceipt] = useState({
    studentId: 0,
    amount: 0,
    paymentMethod: "",
    description: "",
  })
  const receiptRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReceipt({
      ...newReceipt,
      [name]: name === "amount" || name === "studentId" ? Number(value) : value,
    })
  }

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target

    if (name === "studentId") {
      const selectedStudent = students.find((student) => student.id === value)
      if (selectedStudent) {
        setNewReceipt({
          ...newReceipt,
          studentId: Number(value),
        })
      }
    } else {
      setNewReceipt({
        ...newReceipt,
        [name]: value,
      })
    }
  }

  const handleSubmit = () => {
    const selectedStudent = students.find((student) => student.id === newReceipt.studentId)

    if (!selectedStudent) return

    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]

    const newReceiptEntry: Receipt = {
      id: `REC-${String(receipts.length + 1).padStart(3, "0")}`,
      studentId: newReceipt.studentId,
      studentName: selectedStudent.name,
      class: selectedStudent.class,
      date: formattedDate,
      amount: newReceipt.amount,
      paymentMethod: newReceipt.paymentMethod,
      description: newReceipt.description,
      issuedBy: "Current User",
    }

    setReceipts([...receipts, newReceiptEntry])
    setNewReceipt({
      studentId: 0,
      amount: 0,
      paymentMethod: "",
      description: "",
    })
    handleClose()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(0)
  }

  const viewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt)
    setReceiptDialogOpen(true)
  }

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      const printContents = receiptRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents

      window.location.reload()
    }
  }

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">School Receipts</Typography>
        <Box>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen} sx={{ mr: 1 }}>
            New Receipt
          </Button>
          <Button variant="outlined" startIcon={<Print />} sx={{ mr: 1 }}>
            Print All
          </Button>
          <Button variant="outlined" startIcon={<FileDownload />}>
            Export
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by receipt ID, student name, or description"
          InputProps={{
            startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
          }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      <Box sx={{ width: "100%", mb: 2 }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="receipts table">
              <TableHead>
                <TableRow>
                  <TableCell>Receipt ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount ($)</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReceipts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.class}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" startIcon={<Receipt />} onClick={() => viewReceipt(row)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredReceipts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* New Receipt Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Issue New Receipt</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Student</InputLabel>
                <Select
                  name="studentId"
                  value={newReceipt.studentId || ""}
                  label="Student"
                  onChange={handleSelectChange}
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name} - {student.class} (Balance: ${student.balance})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                value={newReceipt.amount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={newReceipt.paymentMethod}
                  label="Payment Method"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Check">Check</MenuItem>
                  <MenuItem value="Mobile Payment">Mobile Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={newReceipt.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Issue Receipt
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onClose={() => setReceiptDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Receipt Details</Typography>
            <Button variant="contained" startIcon={<Print />} onClick={handlePrintReceipt}>
              Print Receipt
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReceipt && (
            <Box ref={receiptRef} sx={{ p: 2 }}>
              <Card sx={{ mb: 2, p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography variant="h5">SCHOOL NAME</Typography>
                    <Typography variant="body2">123 School Address, City</Typography>
                    <Typography variant="body2">Phone: (123) 456-7890</Typography>
                    <Typography variant="body2">Email: info@school.edu</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: "primary.main" }}>
                      RECEIPT
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {selectedReceipt.id}
                    </Typography>
                    <Typography variant="body2">Date: {selectedReceipt.date}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Student Information:
                  </Typography>
                  <Typography>Name: {selectedReceipt.studentName}</Typography>
                  <Typography>Class: {selectedReceipt.class}</Typography>
                  <Typography>Student ID: {selectedReceipt.studentId}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedReceipt.description}</TableCell>
                        <TableCell align="right">${selectedReceipt.amount.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          ${selectedReceipt.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Box>
                    <Typography variant="body2">Payment Method: {selectedReceipt.paymentMethod}</Typography>
                    <Typography variant="body2">Issued By: {selectedReceipt.issuedBy}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2">_________________________</Typography>
                    <Typography variant="body2">Authorized Signature</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Typography variant="body2">Thank you for your payment!</Typography>
                  <Typography variant="caption">
                    This is a computer-generated receipt and does not require a signature.
                  </Typography>
                </Box>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReceiptDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
