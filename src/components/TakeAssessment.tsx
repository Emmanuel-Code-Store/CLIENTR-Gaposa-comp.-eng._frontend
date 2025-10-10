"use client";

import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Container,
    Grid,
    Typography,
    Stack,
    Divider,
    ButtonGroup,
    TextField,
    InputAdornment,
    styled,
} from "@mui/material"
import Link from "next/link"
import {
    BookOpen, Clock, Users, Search,
    ChevronRight,
    Copy,
    FileText,
    FileSpreadsheet,
    FileIcon as FilePdf,
    Printer,
} from "lucide-react"

const ActionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    textTransform: "none",
    "&:hover": {
        backgroundColor: theme.palette.grey[300],
    },
}));
const subjects = [
    {
        id: 1,
        name: "Mathematics",
        description: "Algebra, Geometry, Calculus",
        duration: 60,
        questions: 25,
        difficulty: "Medium",
    },
    {
        id: 2,
        name: "Physics",
        description: "Mechanics, Thermodynamics, Optics",
        duration: 90,
        questions: 30,
        difficulty: "Hard",
    },
    {
        id: 3,
        name: "Chemistry",
        description: "Organic, Inorganic, Physical Chemistry",
        duration: 75,
        questions: 28,
        difficulty: "Medium",
    },
    {
        id: 4,
        name: "Biology",
        description: "Cell Biology, Genetics, Ecology",
        duration: 60,
        questions: 25,
        difficulty: "Easy",
    },
    {
        id: 5,
        name: "Computer Science",
        description: "Programming, Data Structures, Algorithms",
        duration: 120,
        questions: 40,
        difficulty: "Hard",
    },
    {
        id: 6,
        name: "English Literature",
        description: "Poetry, Prose, Drama Analysis",
        duration: 90,
        questions: 20,
        difficulty: "Medium",
    },
]

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "Easy":
            return "success"
        case "Medium":
            return "warning"
        case "Hard":
            return "error"
        default:
            return "default"
    }
}

export default function TakeAssessment() {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
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
                    Take Assessment
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
                    <span>Session 2025/2026</span>
                    <ChevronRight size={16} />
                    <span>Staff</span>
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
                    placeholder="Search staff"
                    value={searchTerm}
                    onChange={handleSearchChange}
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
            <Container maxWidth="lg">
                {/* Header */}
                <Box textAlign="center" mb={4}>
                    <Typography variant="subtitle1" color="text.secondary">
                        Select a subject to begin your examination
                    </Typography>
                </Box>

                {/* Subject Cards */}
                <Grid container spacing={3} mb={5}>
                    {subjects.map((subject) => (
                        <Grid item xs={12} sm={6} md={4} key={subject.id}>
                            <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardHeader
                                    title={
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h6">{subject.name}</Typography>
                                            <Chip
                                                label={subject.difficulty}
                                                color={getDifficultyColor(subject.difficulty)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    }
                                    subheader={subject.description}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1} color="text.secondary">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Clock size={16} />
                                            <Typography variant="body2">{subject.duration} minutes</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <BookOpen size={16} />
                                            <Typography variant="body2">{subject.questions} questions</Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Link href="/dashboard/startassessment" passHref>
                                        <Button fullWidth variant="contained" color="primary">
                                            Start Examination
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Instructions */}
                <Card variant="outlined" sx={{ maxWidth: 800, mx: "auto" }}>
                    <CardHeader
                        avatar={<Users size={20} />}
                        title={
                            <Typography variant="h6" fontWeight={600}>
                                Examination Instructions
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Stack spacing={1} component="ul" sx={{ pl: 2, color: "text.secondary" }}>
                            <li>Ensure you have a stable internet connection before starting</li>
                            <li>Read each question carefully before selecting your answer</li>
                            <li>You can navigate between questions using the navigation panel</li>
                            <li>Your progress is automatically saved</li>
                            <li>Submit your exam before the time expires</li>
                            <li>Once submitted, you cannot modify your answers</li>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}
