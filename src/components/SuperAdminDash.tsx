"use client"

import { useState } from "react"
import Image from "next/image";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from "@mui/material"
import { LayoutDashboard, FileText, Receipt, Clock, Settings, MoreVertical } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

// Styled components
const StyledDrawer = styled(Drawer)(() => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    backgroundColor: "#0A1E46",
    color: "white",
    borderRight: "none",
  },
}))

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}))

// Mock data
const stats = [
  { title: "BILLS RECEIVED", amount: "1,600,000", count: "20 Bills" },
  { title: "UNPAID BILLS", amount: "600,000", count: "8 Bills" },
  { title: "NEW INVOICES", amount: "800,000", count: "25 Invoices" },
  { title: "UNPAID INVOICES", amount: "200,000", count: "5 Invoices" },
]

const billStatus = [
  { name: "Paid", value: 60, color: "#1E3A8A" },
  { name: "Unpaid", value: 40, color: "#93C5FD" },
]

const invoiceStatus = [
  { name: "Approved", value: 45, color: "#059669" },
  { name: "Pending", value: 35, color: "#FBBF24" },
  { name: "Validation Required", value: 20, color: "#DC2626" },
]

const invoices = [
  { id: "#120845", client: "Kalu E. Kalu", status: "Approved", payment: "Paid", date: "01/08/22" },
  { id: "#120845", client: "Kalu E. Kalu", status: "Approved", payment: "Unpaid", date: "01/08/22" },
  { id: "#120845", client: "Kalu E. Kalu", status: "Approved", payment: "Paid", date: "01/08/22" },
]

const barData = [
  { name: "Mon", received: 400, paid: 240 },
  { name: "Tue", received: 300, paid: 500 },
  { name: "Wed", received: 200, paid: 100 },
  { name: "Thurs", received: 150, paid: 80 },
  { name: "Fri", received: 280, paid: 150 },
  { name: "Sat", received: 180, paid: 90 },
  { name: "Sun", received: 120, paid: 60 },
]

const reminders = [
  { day: "Monday", items: ["Rent/Hire Invoice", "Salary Invoice", "Training Invoice"] },
  { day: "Tuesday", items: ["Rent/Hire Invoice", "Salary Invoice", "Training Invoice"] },
  { day: "Thursday", items: ["Rent/Hire Invoice", "Salary Invoice", "Training Invoice"] },
]


export default function SuperAdminDash() {
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3, display: "flex" }}>
      {/* Sidebar */}
      <StyledDrawer variant="permanent">
        <Box sx={{ p: 3 }}>
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={120}
            height={60}
            style={{ height: "auto" }}
          />

        </Box>
        <List>
          {[
            { text: "Dashboard", icon: LayoutDashboard, active: true },
            { text: "Invoices", icon: FileText },
            { text: "Bills", icon: FileText },
            { text: "Receipts", icon: Receipt },
            { text: "Proforma", icon: FileText },
            { text: "Reminders", icon: Clock },
            { text: "Settings", icon: Settings },
          ].map((item) => (
            <ListItem
              key={item.text}
              sx={{
                color: item.active ? "#60A5FA" : "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#F3F4F6" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Welcome Charity,
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Let&apos;s handle your invoicing needs hassle-free!
          </Typography>

        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatCard>
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ my: 1 }}>
                  {stat.amount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.count}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1">Bill Status</Typography>
                <IconButton size="small">
                  <MoreVertical size={20} />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={billStatus} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {billStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1">Invoice Status</Typography>
                <IconButton size="small">
                  <MoreVertical size={20} />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={invoiceStatus} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {invoiceStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Invoices Table */}
        <Card sx={{ mb: 4 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Invoices
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Monitor the progress of your invoice
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>Invoice No</TableCell>
                    <TableCell>Client name</TableCell>
                    <TableCell>Invoice status</TableCell>
                    <TableCell>Payment status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell padding="checkbox">
                        <input type="checkbox" />
                      </TableCell>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          size="small"
                          color={invoice.status === "Approved" ? "success" : "warning"}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.payment}
                          size="small"
                          color={invoice.payment === "Paid" ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertical size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>

        {/* Bar Chart */}
        <Card>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Paid Invoice vs received Bills</Typography>
              <ToggleButtonGroup
                size="small"
                value={timeframe}
                exclusive
                onChange={(_, value) => value && setTimeframe(value)}
              >
                <ToggleButton value="weekly">Weekly</ToggleButton>
                <ToggleButton value="monthly">Monthly</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="received" fill="#60A5FA" />
                <Bar dataKey="paid" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>

      {/* Right Sidebar - Reminders */}
      <Paper
        sx={{
          width: 280,
          p: 3,
          borderLeft: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Reminders</Typography>
          <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
            View
          </Typography>
        </Box>
        {reminders.map((day) => (
          <Box key={day.day} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {day.day}
            </Typography>
            {day.items.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  mb: 1,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2">{item}</Typography>
              </Paper>
            ))}
          </Box>
        ))}
      </Paper>
    </Box>
  )
}

