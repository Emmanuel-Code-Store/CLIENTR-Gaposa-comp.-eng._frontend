"use client"

import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material"
import { School, Payments, Receipt, TrendingUp } from "@mui/icons-material"

export default function ViewPayment() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboards
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
              bgcolor: "#bbdefb",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Total Students
              </Typography>
              <School />
            </Box>
            <Typography component="p" variant="h4">
              520
            </Typography>
            <Typography variant="body2">As of today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
              bgcolor: "#c8e6c9",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Fee Collection
              </Typography>
              <TrendingUp />
            </Box>
            <Typography component="p" variant="h4">
              $24,300
            </Typography>
            <Typography variant="body2">This month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
              bgcolor: "#ffecb3",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Payroll
              </Typography>
              <Payments />
            </Box>
            <Typography component="p" variant="h4">
              $18,500
            </Typography>
            <Typography variant="body2">Last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
              bgcolor: "#ffcdd2",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Receipts Issued
              </Typography>
              <Receipt />
            </Box>
            <Typography component="p" variant="h4">
              142
            </Typography>
            <Typography variant="body2">This month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Welcome to School Financial Management System
              </Typography>
              <Typography variant="body1">
                This system helps you manage school finances including payroll, student fees, and receipts. Use the
                navigation menu on the left to access different modules.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
