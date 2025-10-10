"use client";

import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Download } from "@mui/icons-material";
import { Eye, FileUp, Plus, Award } from "lucide-react";
import { Dayjs } from "dayjs";

export default function CreateCertificate() {
  const [tab, setTab] = useState("create");
  const handleTab = (e: React.SyntheticEvent, val: string) => setTab(val);

  // Form state
  const [selectedProgram, setProgram] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [completionDate, setCompletionDate] = useState<Dayjs | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };

  return (
    <Box flex={1} p={3} pt={2} display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4" fontWeight="bold">
        Create Student Certificate
      </Typography>

      <Tabs value={tab} onChange={handleTab} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab label="Create Certificate" value="create" />
        <Tab label="Certificate Templates" value="templates" />
        <Tab label="Certificate History" value="history" />
      </Tabs>

      {tab === "create" && (
        <Box>
          <Grid container spacing={2}>
            {/* Student Info Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Student Information"
                  subheader="Enter the student details for the certificate"
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField label="Student Full Name" fullWidth />
                  <TextField label="Student ID" fullWidth />
                  <InputLabel>Program/Course</InputLabel>
                  <Select
                    value={selectedProgram}
                    onChange={(e: SelectChangeEvent) => setProgram(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="computer-science">Computer Science</MenuItem>
                    <MenuItem value="business-admin">Business Administration</MenuItem>
                  </Select>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newVal) => setStartDate(newVal as Dayjs | null)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />

                    <DatePicker
                      label="Completion Date"
                      value={completionDate}
                      onChange={(newVal) => setCompletionDate(newVal as Dayjs | null)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>


                  <TextField label="Grade/GPA" fullWidth />
                </CardContent>
              </Card>
            </Grid>

            {/* Certificate Details Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Certificate Details"
                  subheader="Configure the certificate content and appearance"
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <InputLabel>Certificate Type</InputLabel>
                  <Select
                    value={certificateType}
                    onChange={(e: SelectChangeEvent) => setCertificateType(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="completion">Course Completion</MenuItem>
                    <MenuItem value="achievement">Achievement</MenuItem>
                  </Select>

                  <TextField label="Certificate Title" defaultValue="Certificate of Completion" fullWidth />
                  <TextField
                    label="Certificate Description"
                    multiline
                    rows={4}
                    defaultValue="This is to certify..."
                    fullWidth
                  />

                  <InputLabel>Signatories</InputLabel>
                  <Select fullWidth defaultValue="">
                    <MenuItem value="dean">Dean</MenuItem>
                    <MenuItem value="principal">Principal</MenuItem>
                  </Select>

                  <InputLabel>Template</InputLabel>
                  <Select fullWidth defaultValue="">
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="modern">Modern</MenuItem>
                  </Select>

                  <Box
                    sx={{
                      border: 2,
                      borderStyle: "dashed",
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => document.getElementById("logo-upload")?.click()}
                  >
                    <IconButton>
                      <FileUp fontSize="large" />
                    </IconButton>
                    <Typography variant="body2">
                      Click or drag to upload logo (SVG, PNG or JPG)
                    </Typography>
                    <input id="logo-upload" type="file" hidden onChange={handleFileUpload} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Preview Card */}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Certificate Preview" subheader="Preview will appear here" />
            <CardContent sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <Box textAlign="center">
                <Box sx={{ fontSize: 60, color: "grey.300" }}>
                  <Award />
                </Box>
                <Typography variant="body1" color="text.secondary">
                  Fill in the required info to preview
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button variant="outlined" startIcon={<Eye />}>
                Preview
              </Button>
              <Box display="flex" gap={1}>
                <Button variant="outlined" startIcon={<Download />}>
                  Download
                </Button>
                <Button variant="contained" startIcon={<Plus />}>
                  Generate
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}

      {tab === "templates" && (
        <Card>
          <CardHeader title="Certificate Templates" subheader="Manage certificate templates" />
          <CardContent>
            <Grid container spacing={2}>
              {["Standard", "Professional", "Modern", "Classic"].map((tpl) => (
                <Grid item xs={12} md={4} key={tpl}>
                  <Card sx={{ height: "100%", position: "relative" }}>
                    <Box sx={{ width: "100%", paddingTop: "150%", background: "grey.100" }} />
                    <CardActions sx={{ position: "absolute", top: 8, right: 8 }}>
                      <Button size="small" variant="outlined">
                        Select
                      </Button>
                    </CardActions>
                    <CardContent>
                      <Typography fontWeight="medium">{tpl}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tpl} template
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    borderStyle: "dashed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    p: 2,
                  }}
                >
                  <Button startIcon={<Plus />} variant="outlined">
                    Create New Template
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button>Upload New Template</Button>
          </CardActions>
        </Card>
      )}

      {tab === "history" && (
        <Card>
          <CardHeader title="Certificate History" subheader="Manage generated certificates" />
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <TextField placeholder="Search certificates..." size="small" />
              <Button variant="outlined">Search</Button>
            </Box>
            <Box overflow="auto">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["ID", "Student", "Type", "Date", "Status", "Actions"].map((h) => (
                      <th key={h} style={{ padding: 8, textAlign: "left", borderBottom: "1px solid #ddd" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "CERT-001", name: "Alice", type: "Degree", date: "2025-06-08", status: "Issued" },
                    { id: "CERT-002", name: "Bob", type: "Achievement", date: "2023-12-10", status: "Draft" },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td style={{ padding: 8 }}>{row.id}</td>
                      <td style={{ padding: 8 }}>{row.name}</td>
                      <td style={{ padding: 8 }}>{row.type}</td>
                      <td style={{ padding: 8 }}>{row.date}</td>
                      <td style={{ padding: 8 }}>
                        <Typography
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            background: row.status === "Issued" ? "green" : "orange",
                            color: "white",
                            fontSize: "0.75rem",
                          }}
                        >
                          {row.status}
                        </Typography>
                      </td>
                      <td style={{ padding: 8 }}>
                        <Button variant="text" size="small">
                          View
                        </Button>
                        <Button variant="text" size="small">
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Typography variant="body2">Showing 2 of many certificates</Typography>
            <Box display="flex" gap={1}>
              <Button variant="outlined" size="small">
                Previous
              </Button>
              <Button variant="outlined" size="small">
                Next
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}
