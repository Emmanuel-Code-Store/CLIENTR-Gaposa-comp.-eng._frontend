"use client";

import {
    Box,
    Typography,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    styled,
} from "@mui/material"
import {
    ChevronRight,
    Settings,
    User,
} from "lucide-react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    "&.header": {
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
        color: theme.palette.text.secondary,
    },
}))

const ScoreInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: theme.spacing(1),
        textAlign: "center",
        width: "60px",
    },
    "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
    },
}))


const students = Array(15).fill({
    name: "ADEOKUN OGUNAYO IYANUKRIWA",
    testScore: "",
    cbtScore: "",
})


export default function RecordExam() {
    // const formattedSection = section
    //     .split("-")
    //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //     .join(" ");

    return (
        <>
            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 0 }}>
                {/* Top bar */}
                <Box
                    sx={{
                        p: 2,
                        bgcolor: "white",
                        borderBottom: "1px solid #E5E7EB",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                    }}
                >
                    <IconButton>
                        <Settings size={20} />
                    </IconButton>
                    <IconButton>
                        <User size={20} />
                    </IconButton>
                </Box>

                
                <Box sx={{ p: 3 }}>
                    
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                            
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

                    {/* Table */}
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className="header">Add Student</StyledTableCell>
                                    <StyledTableCell className="header" align="center">
                                        Test/Exam
                                    </StyledTableCell>
                                    <StyledTableCell className="header" align="center">
                                        CBT Score
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell>{student.name}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                <ScoreInput
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{
                                                        "aria-label": "test score",
                                                        maxLength: 3,
                                                    }}
                                                />
                                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                    :
                                                </Typography>
                                                <ScoreInput
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{
                                                        "aria-label": "test score",
                                                        maxLength: 3,
                                                    }}
                                                />
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <ScoreInput
                                                variant="outlined"
                                                size="medium"
                                                inputProps={{
                                                    "aria-label": "cbt score",
                                                    maxLength: 10,
                                                }}
                                                className="custom-width-input"
                                            />

                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Save Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#A855F7",
                                "&:hover": {
                                    bgcolor: "#9333EA",
                                },
                                textTransform: "none",
                                px: 4,
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}