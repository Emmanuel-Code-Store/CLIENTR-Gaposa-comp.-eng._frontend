"use client"

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Paper,
  Switch,
  FormControlLabel,
  ButtonGroup,
  InputAdornment,
  styled
} from "@mui/material"
import { TrendingUp, Language, Add, Visibility, Speed, Share } from "@mui/icons-material"
import { useState } from "react"
import {
  ChevronRight,
  Copy,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Printer,
  Search,
} from "lucide-react"


const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}))

export default function SEO() {
  const [metaTitle, setMetaTitle] = useState("Your Website Title")
  const [metaDescription, setMetaDescription] = useState("Your website description for search engines")
  const [keywords, setKeywords] = useState(["nextjs", "react", "seo", "web development"])
  const [newKeyword, setNewKeyword] = useState("")
  const [sitemapEnabled, setSitemapEnabled] = useState(true)
  const [robotsEnabled, setRobotsEnabled] = useState(true)

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()])
      setNewKeyword("")
    }
  }

  const handleDeleteKeyword = (keywordToDelete: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToDelete))
  }

  const seoMetrics = [
    { label: "Page Speed Score", value: "92/100", icon: <Speed />, color: "success" },
    { label: "SEO Score", value: "88/100", icon: <TrendingUp />, color: "success" },
    { label: "Accessibility", value: "95/100", icon: <Visibility />, color: "success" },
    { label: "Social Shares", value: "1.2K", icon: <Share />, color: "info" },
  ]

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
          SEO Managment
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
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{color: "gray"}}>
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
      </Box>

      {/* SEO Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {seoMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{ height: "100%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>{metric.icon}</Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                  {metric.value}
                </Typography>
                <Typography variant="body2">{metric.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Meta Tags Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ mr: 2, color: "primary.main", display: "flex", alignItems: "center", mb: 3 }}>
                <Search />
                <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
                  Meta Tags Configuration
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    helperText={`${metaTitle.length}/60 characters`}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    multiline
                    rows={3}
                    helperText={`${metaDescription.length}/160 characters`}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Keywords Section */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Keywords Management
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Add Keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
                  variant="outlined"
                  size="small"
                />
                <Button variant="contained" onClick={handleAddKeyword} startIcon={<Add />} sx={{ minWidth: 120 }}>
                  Add
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {keywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    onDelete={() => handleDeleteKeyword(keyword)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                SEO Settings
              </Typography>

              <List>
                <ListItem>
                  <ListItemText primary="XML Sitemap" secondary="Generate and submit sitemap to search engines" />
                  <ListItemSecondaryAction>
                    <FormControlLabel
                      control={
                        <Switch checked={sitemapEnabled} onChange={(e) => setSitemapEnabled(e.target.checked)} />
                      }
                      label=""
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Robots.txt" secondary="Control search engine crawling behavior" />
                  <ListItemSecondaryAction>
                    <FormControlLabel
                      control={<Switch checked={robotsEnabled} onChange={(e) => setRobotsEnabled(e.target.checked)} />}
                      label=""
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                SEO Preview
              </Typography>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="body1" color="primary" sx={{ fontWeight: "bold", mb: 1 }}>
                  {metaTitle}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                  https://yourwebsite.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metaDescription}
                </Typography>
              </Paper>
            </CardContent>
          </Card>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Keep your meta title under 60 characters and description under 160 characters for optimal display in
              search results.
            </Typography>
          </Alert>

          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="contained" fullWidth startIcon={<TrendingUp />}>
                  Analyze SEO
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Language />}>
                  Generate Sitemap
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Speed />}>
                  Test Page Speed
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" size="large" sx={{ px: 6, py: 2, borderRadius: 3 }}>
          Save SEO Settings
        </Button>
      </Box>
    </Box>
  )
}
