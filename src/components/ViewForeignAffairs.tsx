import React from 'react';
import { Button, Card, CardContent, CardHeader, Typography, TextField, Box, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Grid, Paper, type ChipProps } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function ViewForeignAffairs() {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Foreign Affairs</Typography>
        <Button variant="contained" startIcon={<Add />}>Add New Partnership</Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value="partnerships">
          <Tab label="Partnerships" value="partnerships" />
          <Tab label="Exchange Programs" value="exchange" />
          <Tab label="Delegations" value="delegations" />
          <Tab label="Agreements" value="agreements" />
        </Tabs>
      </Box>
      <Tabs defaultValue="partnerships">

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'partnerships' }}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">International Partnerships</Typography>}
                subheader="Manage partnerships with international institutions"
              />
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, maxWidth: '400px' }}>
                  <TextField fullWidth placeholder="Search partnerships..." size="small" />
                  <Button variant="outlined">Search</Button>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Institution</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { institution: 'University of Cambridge', country: 'United Kingdom', type: 'Academic', startDate: 'January 15, 2022', status: 'Active' },
                        { institution: 'University of Tokyo', country: 'Japan', type: 'Research', startDate: 'March 10, 2022', status: 'Active' },
                        { institution: 'ETH Zurich', country: 'Switzerland', type: 'Academic & Research', startDate: 'May 22, 2022', status: 'Active' },
                        { institution: 'University of Melbourne', country: 'Australia', type: 'Student Exchange', startDate: 'September 5, 2022', status: 'Pending' },
                      ].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontWeight: 'medium' }}>{row.institution}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>{row.startDate}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={row.status === 'Active' ? 'success' : 'warning'}
                              size="small"
                              sx={{ fontWeight: 'medium' }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                              <IconButton size="small"><Edit fontSize="small" /></IconButton>
                              <IconButton size="small"><Delete fontSize="small" /></IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="body2" color="text.secondary">Showing 4 of 12 partnerships</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small">Previous</Button>
                  <Button variant="outlined" size="small">Next</Button>
                </Box>
              </Box>
            </Card>
          </Box>

          <Box sx={{ display: 'exchange' }}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">Exchange Programs</Typography>}
                subheader="Manage student and faculty exchange programs"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader
                        title={<Typography variant="h6">Outgoing Exchange</Typography>}
                        subheader="Students and faculty going abroad"
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {[
                            { title: 'Cambridge Exchange Program', desc: '10 students, 2 faculty' },
                            { title: 'Tokyo Research Program', desc: '5 students, 3 faculty' },
                            { title: 'ETH Zurich Summer Program', desc: '8 students, 1 faculty' },
                          ].map((program, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', p: 1, border: 1, borderRadius: 1, borderColor: 'divider' }}>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{program.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{program.desc}</Typography>
                              </Box>
                              <Button variant="outlined" size="small">View</Button>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button variant="contained" size="small" startIcon={<Add />}>Add Outgoing Program</Button>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader
                        title={<Typography variant="h6">Incoming Exchange</Typography>}
                        subheader="International students and faculty visiting"
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {[
                            { title: 'International Summer School', desc: '15 students from 5 countries' },
                            { title: 'Visiting Faculty Program', desc: '7 faculty from 4 countries' },
                            { title: 'Research Collaboration', desc: '12 researchers from 3 countries' },
                          ].map((program, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', p: 1, border: 1, borderRadius: 1, borderColor: 'divider' }}>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{program.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{program.desc}</Typography>
                              </Box>
                              <Button variant="outlined" size="small">View</Button>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button variant="contained" size="small" startIcon={<Add />}>Add Incoming Program</Button>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained">Generate Exchange Report</Button>
              </Box>
            </Card>
          </Box>

          <Box sx={{ display: 'delegations' }}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">Delegations</Typography>}
                subheader="Manage incoming and outgoing delegations"
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Upcoming Delegations</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Institution/Country</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Participants</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[
                            { institution: 'Ministry of Education, Singapore', type: 'Incoming', date: 'October 15, 2023', participants: 5, status: 'Confirmed', statusColor: 'info' },
                            { institution: ' Üniversitesi of Toronto, Canada', type: 'Outgoing', date: 'November 5, 2023', participants: 3, status: 'Planning', statusColor: 'warning' },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ fontWeight: 'medium' }}>{row.institution}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell>{row.date}</TableCell>
                              <TableCell>{row.participants}</TableCell>
                              <TableCell>
                                <Chip
                                  label={row.status}
                                  color={row.statusColor as ChipProps["color"]}
                                  size="small"
                                  sx={{ fontWeight: "medium" }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Button variant="text" size="small">View Details</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Past Delegations</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Institution/Country</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Participants</TableCell>
                            <TableCell>Outcome</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[
                            { institution: 'University of Oxford, UK', type: 'Incoming', date: 'May 10, 2023', participants: 4, outcome: 'MOU Signed' },
                            { institution: 'Tsinghua University, China', type: 'Outgoing', date: 'March 22, 2023', participants: 6, outcome: 'Partnership Established' },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ fontWeight: 'medium' }}>{row.institution}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell>{row.date}</TableCell>
                              <TableCell>{row.participants}</TableCell>
                              <TableCell>
                                <Chip label={row.outcome} color="success" size="small" sx={{ fontWeight: 'medium' }} />
                              </TableCell>
                              <TableCell align="right">
                                <Button variant="text" size="small">View Report</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" startIcon={<Add />}>Schedule New Delegation</Button>
              </Box>
            </Card>
          </Box>

          <Box sx={{ display: 'agreements' }}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">International Agreements</Typography>}
                subheader="Manage MOUs, agreements, and contracts"
              />
              <CardContent>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {[
                    { title: 'Active', value: 18, desc: 'Current agreements' },
                    { title: 'Pending', value: 5, desc: 'Awaiting signatures' },
                    { title: 'Expiring Soon', value: 3, desc: 'Within 90 days' },
                  ].map((stat, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card>
                        <CardHeader sx={{ pb: 0 }}>
                          <Typography variant="h6">{stat.title}</Typography>
                        </CardHeader>
                        <CardContent>
                          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                          <Typography variant="body2" color="text.secondary">{stat.desc}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Agreement List</Typography>
                  <FormControl sx={{ minWidth: 180 }} size="small">
                    <InputLabel>Filter by type</InputLabel>
                    <Select defaultValue="all" label="Filter by type">
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="mou">MOU</MenuItem>
                      <MenuItem value="exchange">Exchange</MenuItem>
                      <MenuItem value="research">Research</MenuItem>
                      <MenuItem value="academic">Academic</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Agreement Title</TableCell>
                        <TableCell>Partner</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { title: 'Memorandum of Understanding', partner: 'University of Cambridge', type: 'MOU', startDate: 'Jan 15, 2022', endDate: 'Jan 14, 2025', status: 'Active', statusColor: 'success' },
                        { title: 'Student Exchange Agreement', partner: 'University of Tokyo', type: 'Exchange', startDate: 'Mar 10, 2022', endDate: 'Mar 9, 2024', status: 'Expiring Soon', statusColor: 'warning' },
                        { title: 'Research Collaboration Agreement', partner: 'ETH Zurich', type: 'Research', startDate: 'May 22, 2022', endDate: 'May 21, 2025', status: 'Active', statusColor: 'success' },
                        { title: 'Academic Cooperation Agreement', partner: 'University of Melbourne', type: 'Academic', startDate: 'Pending', endDate: 'Pending', status: 'Pending', statusColor: 'warning' },
                      ].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontWeight: 'medium' }}>{row.title}</TableCell>
                          <TableCell>{row.partner}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>{row.startDate}</TableCell>
                          <TableCell>{row.endDate}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={row.statusColor as ChipProps["color"]}
                              size="small"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button variant="text" size="small">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" startIcon={<Add />}>Create New Agreement</Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
}

export default ViewForeignAffairs;