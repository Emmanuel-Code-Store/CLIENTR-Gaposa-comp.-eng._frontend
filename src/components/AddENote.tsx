"use client"

import {
    Box,
    Typography,
    Paper,
    Grid,
    Select,
    MenuItem,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
} from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1.5),
    "&.header": {
        backgroundColor: theme.palette.grey[100],
        fontWeight: 500,
    },
}))

const UploadButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    textTransform: "none",
    "&:hover": {
        backgroundColor: theme.palette.grey[100],
    },
}))

export default function AddENote() { 

    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
            {/* Header */}
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 4 }}>
                E-note
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                    Add Note
                </Typography>

                <Grid container spacing={3}>
                    {/* First Row */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Term
                        </Typography>
                        <Select fullWidth displayEmpty size="small" defaultValue="">
                            <MenuItem disabled value="">
                                Select a Term
                            </MenuItem>
                            <MenuItem value="first">First Term</MenuItem>
                            <MenuItem value="second">Second Term</MenuItem>
                            <MenuItem value="third">Third Term</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Class
                        </Typography>
                        <Select fullWidth displayEmpty size="small" defaultValue="">
                            <MenuItem disabled value="">
                                Select a Class
                            </MenuItem>
                            <MenuItem value="sss1">SSS 1</MenuItem>
                            <MenuItem value="sss2">SSS 2</MenuItem>
                            <MenuItem value="sss3">SSS 3</MenuItem>
                        </Select>
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Subject
                        </Typography>
                        <Select fullWidth displayEmpty size="small" defaultValue="">
                            <MenuItem disabled value="">
                                Select a Subject
                            </MenuItem>
                            <MenuItem value="english">English Language</MenuItem>
                            <MenuItem value="mathematics">Mathematics</MenuItem>
                            <MenuItem value="physics">Physics</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Topic
                        </Typography>
                        <TextField fullWidth size="small" placeholder="Input Text" />
                    </Grid>

                    {/* File Upload */}
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Upload PDF
                                </Typography>
                                <UploadButton sx={{ mr: 2 }}>
                                    <label style={{ cursor: "pointer" }}>
                                        Choose File
                                        <input type="file" hidden accept="application/pdf" />
                                    </label>
                                </UploadButton>

                                <Typography variant="body2" color="text.secondary" component="span">
                                    No File Chosen
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    alignSelf: "flex-end",
                                    bgcolor: "#0D0F29",
                                    "&:hover": {
                                        bgcolor: "#1a1d4d",
                                    },
                                }}
                            >
                                Upload
                            </Button>
                        </Box>
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
                    </Grid>
                </Grid>
            </Paper>

            {/* Table Section */}
            <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className="header">Pin</StyledTableCell>
                            <StyledTableCell className="header">Name</StyledTableCell>
                            <StyledTableCell className="header">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>
                                <TextField fullWidth size="small" placeholder="Input Text" />
                            </StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#0D0F29",
                        "&:hover": {
                            bgcolor: "#1a1d4d",
                        },
                    }}
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: "divider",
                        color: "text.primary",
                        "&:hover": {
                            borderColor: "text.primary",
                            backgroundColor: "action.hover",
                        },
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}