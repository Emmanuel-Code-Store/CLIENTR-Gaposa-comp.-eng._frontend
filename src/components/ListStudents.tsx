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
    Button,
    Link,
    styled,
} from "@mui/material"
import { ChevronRight } from "lucide-react"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderColor: theme.palette.grey[200],
    "&.header": {
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
        color: theme.palette.text.primary,
    },
}))

const ViewLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
        textDecoration: "underline",
    },
}))

const PrintButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.grey[100],
    textTransform: "none",
    "&:hover": {
        backgroundColor: theme.palette.grey[200],
    },
}))

// Mock data
const students = Array(15).fill({
    id: "--",
    terms: Array(4).fill("View"),
})

export default function ListStudent() {

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
                    Data Table
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
                    <span>SSS2</span>
                    <ChevronRight size={16} />
                </Box>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Student Data
            </Typography>

            {/* Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200", mb: 3 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {Array(4)
                                .fill("Third Term")
                                .map((term, index) => (
                                    <StyledTableCell key={index} className="header" align="center">
                                        {term}
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:nth-of-type(odd)": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    },
                                }}
                            >
                                <StyledTableCell>{student.id}</StyledTableCell>
                                {student.terms.map((_: unknown, termIndex: number) => (
                                    <StyledTableCell key={termIndex} align="center">
                                        <ViewLink>View</ViewLink>
                                    </StyledTableCell>
                                ))}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Print Actions */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                }}
            >
                <PrintButton variant="contained">Print All First Term</PrintButton>
                <PrintButton variant="contained">Print All Second Term</PrintButton>
                <PrintButton variant="contained">Print All Third Term</PrintButton>
            </Box>
        </Box>
    )
}

