"use client"

import type React from "react"

import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    Tooltip,
    LinearProgress,
    Avatar,
    ListItemIcon,
    Menu,
    ListItemText,
    Divider,
    ButtonGroup,
    InputAdornment,
    styled,
} from "@mui/material"
import {
    Add,
    ContentCopy,
    Delete,
    Edit,
    Visibility,
    VisibilityOff,
    MoreVert,
    Key,
    Security,
    Api,
    Code,
    Storage,
    CloudUpload,
    Analytics,
} from "@mui/icons-material"
import { useState } from "react"

import {
    Search,
    Copy,
    FileText,
    FileSpreadsheet,
    FileIcon as FilePdf,
    Printer,
} from "lucide-react"

interface ApiKey {
    id: string
    name: string
    key: string
    service: string
    permissions: string[]
    usage: number
    limit: number
    created: string
    lastUsed: string
    status: "active" | "inactive" | "expired"
}

const ActionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    textTransform: "none",
    "&:hover": {
        backgroundColor: theme.palette.grey[300],
    },
}))

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        {
            id: "1",
            name: "Production API",
            key: "sk_live_51H7...",
            service: "Stripe",
            permissions: ["read", "write"],
            usage: 1250,
            limit: 10000,
            created: "2024-01-15",
            lastUsed: "2024-01-20",
            status: "active",
        },
        {
            id: "2",
            name: "Analytics Key",
            key: "GA4_G-...",
            service: "Google Analytics",
            permissions: ["read"],
            usage: 850,
            limit: 5000,
            created: "2024-01-10",
            lastUsed: "2024-01-19",
            status: "active",
        },
        {
            id: "3",
            name: "Storage Access",
            key: "AKIA...",
            service: "AWS S3",
            permissions: ["read", "write", "delete"],
            usage: 3200,
            limit: 15000,
            created: "2024-01-05",
            lastUsed: "2024-01-18",
            status: "active",
        },
    ])

    const [openDialog, setOpenDialog] = useState(false)
    // const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null)
    const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({})
    const [snackbar, setSnackbar] = useState({ open: false, message: "" })
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [menuKeyId, setMenuKeyId] = useState<string | null>(null)

    const [newKey, setNewKey] = useState({
        name: "",
        service: "",
        permissions: [] as string[],
    })

    const services = [
        { name: "Stripe", icon: <Key />, color: "#635bff" },
        { name: "Google Analytics", icon: <Analytics />, color: "#4285f4" },
        { name: "AWS S3", icon: <Storage />, color: "#ff9900" },
        { name: "OpenAI", icon: <Api />, color: "#10a37f" },
        { name: "GitHub", icon: <Code />, color: "#24292e" },
        { name: "Vercel", icon: <CloudUpload />, color: "#000000" },
    ]

    const handleCreateKey = () => {
        const generatedKey = `sk_${newKey.service.toLowerCase()}_${Math.random().toString(36).substring(2, 15)}`
        const newApiKey: ApiKey = {
            id: Date.now().toString(),
            name: newKey.name,
            key: generatedKey,
            service: newKey.service,
            permissions: newKey.permissions,
            usage: 0,
            limit: 10000,
            created: new Date().toISOString().split("T")[0],
            lastUsed: "Never",
            status: "active",
        }

        setApiKeys([...apiKeys, newApiKey])
        setOpenDialog(false)
        setNewKey({ name: "", service: "", permissions: [] })
        setSnackbar({ open: true, message: "API key created successfully!" })
    }

    const handleCopyKey = (key: string) => {
        navigator.clipboard.writeText(key)
        setSnackbar({ open: true, message: "API key copied to clipboard!" })
    }

    const handleDeleteKey = (id: string) => {
        setApiKeys(apiKeys.filter((key) => key.id !== id))
        setSnackbar({ open: true, message: "API key deleted successfully!" })
        setAnchorEl(null)
    }

    const toggleKeyVisibility = (id: string) => {
        setShowKey((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const getServiceIcon = (service: string) => {
        const serviceConfig = services.find((s) => s.name === service)
        return serviceConfig ? serviceConfig.icon : <Api />
    }

    const getServiceColor = (service: string) => {
        const serviceConfig = services.find((s) => s.name === service)
        return serviceConfig ? serviceConfig.color : "#666"
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, keyId: string) => {
        setAnchorEl(event.currentTarget)
        setMenuKeyId(keyId)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setMenuKeyId(null)
    }

    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
            {/* Header */}
            <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                    API Keys Management
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Manage your API keys and monitor usage across services
                </Typography>
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
                            <InputAdornment position="start">
                                <Search size={20} color="gray" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 200 }}
                />
            </Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                        size="large"
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1.5,
                            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                        }}
                    >
                        Create New Key
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                        {apiKeys.length}
                                    </Typography>
                                    <Typography variant="body2">Total Keys</Typography>
                                </Box>
                                <Security sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                            color: "white",
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                        {apiKeys.filter((k) => k.status === "active").length}
                                    </Typography>
                                    <Typography variant="body2">Active Keys</Typography>
                                </Box>
                                <Key sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                            color: "white",
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                        {apiKeys.reduce((sum, key) => sum + key.usage, 0).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2">Total Requests</Typography>
                                </Box>
                                <Analytics sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                            color: "white",
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                        {new Set(apiKeys.map((k) => k.service)).size}
                                    </Typography>
                                    <Typography variant="body2">Services</Typography>
                                </Box>
                                <Api sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* API Keys Table */}
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "grey.50" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>Service</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>API Key</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Permissions</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Usage</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apiKeys.map((apiKey) => (
                                    <TableRow key={apiKey.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Avatar sx={{ bgcolor: getServiceColor(apiKey.service), width: 32, height: 32 }}>
                                                    {getServiceIcon(apiKey.service)}
                                                </Avatar>
                                                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                                                    {apiKey.service}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                                                {apiKey.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Created: {apiKey.created}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: "monospace",
                                                        bgcolor: "grey.100",
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        minWidth: 120,
                                                    }}
                                                >
                                                    {showKey[apiKey.id] ? apiKey.key : "••••••••••••••••"}
                                                </Typography>
                                                <Tooltip title={showKey[apiKey.id] ? "Hide key" : "Show key"}>
                                                    <IconButton size="small" onClick={() => toggleKeyVisibility(apiKey.id)}>
                                                        {showKey[apiKey.id] ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Copy to clipboard">
                                                    <IconButton size="small" onClick={() => handleCopyKey(apiKey.key)}>
                                                        <ContentCopy />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                                {apiKey.permissions.map((permission) => (
                                                    <Chip key={permission} label={permission} size="small" variant="outlined" color="primary" />
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ minWidth: 120 }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                    <Typography variant="body2">{apiKey.usage.toLocaleString()}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {apiKey.limit.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={(apiKey.usage / apiKey.limit) * 100}
                                                    sx={{ height: 6, borderRadius: 3 }}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={apiKey.status}
                                                color={apiKey.status === "active" ? "success" : "error"}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={(e) => handleMenuClick(e, apiKey.id)} size="small">
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Context Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Duplicate</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        if (menuKeyId) handleDeleteKey(menuKeyId)
                    }}
                    sx={{ color: "error.main" }}
                >
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            {/* Create API Key Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Create New API Key
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Key Name"
                                value={newKey.name}
                                onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                                placeholder="e.g., Production API Key"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Service</InputLabel>
                                <Select
                                    value={newKey.service}
                                    label="Service"
                                    onChange={(e) => setNewKey({ ...newKey, service: e.target.value })}
                                >
                                    {services.map((service) => (
                                        <MenuItem key={service.name} value={service.name}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                {service.icon}
                                                {service.name}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Permissions</InputLabel>
                                <Select
                                    multiple
                                    value={newKey.permissions}
                                    label="Permissions"
                                    onChange={(e) => setNewKey({ ...newKey, permissions: e.target.value as string[] })}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} size="small" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    <MenuItem value="read">Read</MenuItem>
                                    <MenuItem value="write">Write</MenuItem>
                                    <MenuItem value="delete">Delete</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateKey}
                        disabled={!newKey.name || !newKey.service}
                        sx={{ px: 3 }}
                    >
                        Create Key
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Box>
    )
}
