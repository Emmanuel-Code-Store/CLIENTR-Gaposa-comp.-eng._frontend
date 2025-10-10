import React, { useState } from 'react';
import Link from "next/link";
import {
  Box, Button, Card, CardContent, FormControlLabel,
  Radio, RadioGroup, Typography, LinearProgress,
  IconButton, Grid, Paper, Divider, Stack, Chip
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function StartAssessment() {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [flagged, setFlagged] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer((event.target as HTMLInputElement).value);
  };

  return (
     <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" fontWeight="bold">Mathematics Examination</Typography>
            <Typography variant="subtitle2">Question 1 of 3</Typography>
            <LinearProgress variant="determinate" value={(1 / 3) * 100} sx={{ mt: 1 }} />
          </Grid>

          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={<AccessTimeIcon />}
                label="00:59:51"
                color="default"
                sx={{ fontWeight: 'bold' }}
              />
              <Link href="/dashboard/assessmentresult">
              <Button variant="contained" color="success">Submit Exam</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Question Panel */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Question 1</Typography>
                <IconButton onClick={() => setFlagged(!flagged)} color={flagged ? 'warning' : 'default'}>
                  <FlagIcon />
                </IconButton>
              </Grid>

              <Typography mt={2}>What is the derivative of x²?</Typography>

              <RadioGroup value={selectedAnswer} onChange={handleChange} sx={{ mt: 2 }}>
                <FormControlLabel value="2x" control={<Radio />} label="2x" />
                <FormControlLabel value="x^2" control={<Radio />} label="x²" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="x" control={<Radio />} label="x" />
              </RadioGroup>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" disabled>Previous</Button>
                <Button variant="contained" color="primary">Next</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Navigator */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Question Navigator</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>Answered: 0/3</Typography>

              <Stack direction="row" spacing={1} mb={2}>
                <Button variant="contained" color="primary">1</Button>
                <Button variant="outlined">2</Button>
                <Button variant="outlined">3</Button>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={1}>
                <Chip label="Answered" color="success" size="small" />
                <Chip label="Flagged" color="warning" size="small" />
                <Chip label="Not Answered" variant="outlined" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
