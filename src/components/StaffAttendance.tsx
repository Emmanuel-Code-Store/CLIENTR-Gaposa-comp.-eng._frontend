"use client"

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
    ButtonGroup,
    Button,
    TextField,
    Select,
    MenuItem,
    InputAdornment,
    styled,
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
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    textTransform: "none",
    padding: theme.spacing(0.5, 2),
    "&:hover": {
        backgroundColor: theme.palette.grey[200],
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
}))

// Mock data
const students = Array(15).fill({
    name: "ADEMUYIWA FAITH Taiwo",
    attendance: "",
    remarks: Array(5).fill(""),
})

const remarkOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"]


export default function Attendance() { 

    return (
        <Box component="main" className="scrollable-content" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
            <Box className="scrollable-content" sx={{
                overflowY: "auto",
                maxHeight: "90vh",
                marginBottom: 1,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" }
            }}>
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
                         Teachers Attendance 
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
                        <span>SS2</span>
                        <ChevronRight size={16} />
                    </Box>
                </Box>
                <Box className="scrollable-content" sx={{
                    overflowY: "auto",
                    maxHeight: "90vh",
                    marginBottom: 3,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" }
                }}>
                    {/* Table */}
                    <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "grey.200", mb: 3 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className="header">Student Name</StyledTableCell>
                                    <StyledTableCell className="header">Attendance /Comment</StyledTableCell>
                                    {Array(5)
                                        .fill("Remark")
                                        .map((header, index) => (
                                            <StyledTableCell key={index} className="header">
                                                {header}
                                            </StyledTableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:nth-of-type(even)": {
                                                backgroundColor: "rgba(0, 0, 0, 0.02)",
                                            },
                                        }}
                                    >
                                        <StyledTableCell>{student.name}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                                <TextField size="small" sx={{ width: 60 }} inputProps={{ style: { textAlign: "center" } }} />
                                                :
                                                <TextField size="small" sx={{ width: 60 }} inputProps={{ style: { textAlign: "center" } }} />
                                            </Box>
                                        </StyledTableCell>
                                        {student.remarks.map((_: string, remarkIndex: number) => (
                                            <StyledTableCell key={remarkIndex}>
                                                <StyledSelect fullWidth size="small" displayEmpty defaultValue="">
                                                    <MenuItem disabled value="">
                                                        Select an Option
                                                    </MenuItem>
                                                    {remarkOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </StyledSelect>
                                            </StyledTableCell>
                                        ))}

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                
            </Box>
            {/* Footer Actions */}
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

                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                            sx={{
                                width: 200,
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#0D0F29",
                                "&:hover": {
                                    bgcolor: "#1a1d4d",
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
        </Box>
    )
}