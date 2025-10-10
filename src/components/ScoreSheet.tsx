"use client"

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
  ButtonGroup,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  styled,
  Link,
} from "@mui/material"
import { Search, ChevronRight, Copy, FileText, FileSpreadsheet, FileIcon as FilePdf, Printer } from "lucide-react"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderColor: theme.palette.grey[200],
  "&.header": {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}))

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}))

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.875rem",
  padding: 0,
  minWidth: "auto",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}))

const EditLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "0.875rem",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}))

// Mock data
const rows = Array(15).fill({
  name: "--",
  test: "--",
  exam: "--",
  total: "--",
})
  
    export default function ScoreSheet() {
    
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
          Civic Score Sheet For SSS 2
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          <span>Session 2019/2020</span>
          <ChevronRight size={16} />
          <span>First</span>
          <ChevronRight size={16} />
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
          placeholder="Search"
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

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell className="header">Name</StyledTableCell>
              <StyledTableCell className="header" align="center">
                Test
              </StyledTableCell>
              <StyledTableCell className="header" align="center">
                Exam
              </StyledTableCell>
              <StyledTableCell className="header" align="center">
                Total
              </StyledTableCell>
              <StyledTableCell className="header" align="center">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.test}</StyledTableCell>
                <StyledTableCell align="center">{row.exam}</StyledTableCell>
                <StyledTableCell align="center">{row.total}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                    <DeleteButton>Delete</DeleteButton>/<EditLink>Edit</EditLink>
                  </Box>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          color: "text.secondary",
          fontSize: "0.875rem",
        }}
      >
        <Typography variant="body2">Showing 1-20 of 50 results</Typography>
        <Pagination count={3} shape="rounded" size="small" />
      </Box>
    </Box>
  )
}

