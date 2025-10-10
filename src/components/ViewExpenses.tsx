"use client"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material"
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

interface Expense {
  id: string
  category: string
  expense: string
  quantity: string
  amount: string
  paymentDate: string
}

const expensesData: Expense[] = [
  {
    id: "EX01",
    category: "Laboratory",
    expense: "Chemicals",
    quantity: "100 units",
    amount: "$500",
    paymentDate: "04/10/2024",
  },
  {
    id: "EX02",
    category: "Maintenance",
    expense: "HVAC Repair",
    quantity: "1 service",
    amount: "$2000",
    paymentDate: "04/05/2024",
  },
  {
    id: "EX03",
    category: "Boarding Equipment",
    expense: "Bedding Sets",
    quantity: "50 sets",
    amount: "$2500",
    paymentDate: "04/15/2024",
  },
  {
    id: "EX04",
    category: "Library",
    expense: "Books Acquisition",
    quantity: "200 books",
    amount: "$3000",
    paymentDate: "04/20/2024",
  },
  {
    id: "EX05",
    category: "Sports",
    expense: "Basketball Gear",
    quantity: "30 items",
    amount: "$1500",
    paymentDate: "04/12/2024",
  },
  {
    id: "EX06",
    category: "IT Infrastructure",
    expense: "Computers Upgrade",
    quantity: "10 pcs",
    amount: "$10000",
    paymentDate: "04/25/2024",
  },
  {
    id: "EX07",
    category: "Transportation",
    expense: "Bus Maintenance",
    quantity: "3 buses",
    amount: "$4500",
    paymentDate: "04/08/2024",
  },
  {
    id: "EX08",
    category: "Cafeteria",
    expense: "Kitchen Equipment Upgrade",
    quantity: "5 items",
    amount: "$5000",
    paymentDate: "04/18/2024",
  },
  {
    id: "EX09",
    category: "Arts & Crafts",
    expense: "Supplies Purchase",
    quantity: "100 kits",
    amount: "$1000",
    paymentDate: "04/22/2024",
  },
  {
    id: "EX10",
    category: "Maintenance",
    expense: "Painting School Building",
    quantity: "1 service",
    amount: "$7000",
    paymentDate: "04/28/2024",
  },
]

export default function ViewExpenses() {
  const [month, setMonth] = useState("April 2024")
  const [category, setCategory] = useState("All Categories")

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value)
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          School Expenses
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            placeholder="Search by ID or Expense"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={month}
              label="Month"
              onChange={handleMonthChange}
            >
              <MenuItem value="April 2024">April 2024</MenuItem>
              <MenuItem value="March 2024">March 2024</MenuItem>
              <MenuItem value="February 2024">February 2024</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="All Categories">All Categories</MenuItem>
              <MenuItem value="Laboratory">Laboratory</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Library">Library</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Expense</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.expense}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.paymentDate}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  )
}
