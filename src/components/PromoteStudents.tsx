"use client"

import { useState } from "react"
import type React from "react"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Select,
  MenuItem,
  Button,
  styled,
} from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderColor: theme.palette.grey[200],
  "&.header": {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[300],
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}))

// Mock data
const students = Array(15).fill({
  pin: "Pin",
  name: "Name",
})

export default function PromoteStudents() { 

  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [session, setSession] = useState("")
  const [targetClass, setTargetClass] = useState("")

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked)
    setSelectedStudents(event.target.checked ? students.map((_, index) => index) : [])
  }

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSelected = [...selectedStudents]
    if (event.target.checked) {
      newSelected.push(index)
    } else {
      const selectedIndex = newSelected.indexOf(index)
      if (selectedIndex !== -1) {
        newSelected.splice(selectedIndex, 1)
      }
    }
    setSelectedStudents(newSelected)
    setSelectAll(newSelected.length === students.length)
  }


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
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          JSS2 2 Student
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Session 2019/2020
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Student Data
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200", mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Pin</StyledTableCell>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header" align="right" padding="checkbox">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Select All
                  </Typography>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} color="primary" />
                </Box>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(244, 114, 182, 0.1)", // Light pink for odd rows
                  },
                }}
              >
                <StyledTableCell
                  sx={{
                    color: index % 2 === 0 ? "pink.500" : "success.main",
                  }}
                >
                  {student.pin}
                </StyledTableCell>
                <StyledTableCell>{student.name}</StyledTableCell>
                <StyledTableCell align="right" padding="checkbox">
                  <Checkbox
                    checked={selectedStudents.includes(index)}
                    onChange={(e) => handleSelectOne(e, index)}
                    color="primary"
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledSelect
          value={session}
          onChange={(e) => setSession(e.target.value as string)}
          displayEmpty
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem disabled value="">
            Select a Session
          </MenuItem>
          <MenuItem value="2020/2021">2020/2021</MenuItem>
          <MenuItem value="2021/2022">2021/2022</MenuItem>
        </StyledSelect>

        <StyledSelect
          value={targetClass}
          onChange={(e) => setTargetClass(e.target.value as string)}
          displayEmpty
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem disabled value="">
            Select a Class
          </MenuItem>
          <MenuItem value="JSS3">JSS3</MenuItem>
          <MenuItem value="SS1">SS1</MenuItem>
        </StyledSelect>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0D0F29",
            px: 4,
            "&:hover": {
              bgcolor: "#1a1d4d",
            },
          }}
        >
          Promote
        </Button>
      </Box>
    </Box>
  )
}

