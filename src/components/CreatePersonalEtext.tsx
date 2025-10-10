"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
  Chip,
} from "@mui/material"
import { Search as SearchIcon, FilterList, MoreVert, Star as StarIcon, Delete } from "@mui/icons-material"
import { format } from "date-fns"

interface ENote {
  id: string
  title: string
  excerpt: string
  createdAt: Date
  updatedAt: Date
  author: { id: string; name: string; avatar: string }
  category: string
  tags: string[]
  status: string
  priority: string
  isStarred: boolean
}

const mockENotes: ENote[] = [ /* … your data above … */ ]

const TAB_OPTIONS = ["all", "starred", "recent", "archived"] as const

export default function CreatePersonalEtext() {
  const router = useRouter()
  const [notes, setNotes] = useState<ENote[]>(mockENotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [tab, setTab] = useState<typeof TAB_OPTIONS[number]>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState({ title: "", content: "", category: "", tags: "" })

  // Filter notes based on tab & search
  const filtered = notes.filter((n) => {
    if (tab === "starred" && !n.isStarred) return false
    if (tab === "archived" && n.status !== "Archived") return false
    if (tab === "recent") {
      const sorted = [...notes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      return sorted.slice(0, 6).includes(n)
    }
    const q = searchQuery.toLowerCase()
    return [n.title, n.excerpt, n.category, ...n.tags].some((t) => t.toLowerCase().includes(q))
  })

  const handleCreate = () => {
    const id = `note-${Math.random().toString().slice(2)}`
    const note: ENote = {
      id,
      title: newNote.title,
      excerpt: newNote.content.slice(0, 100) + "...",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { id: "user-789", name: "Alex Johnson", avatar: "/" },
      category: newNote.category,
      tags: newNote.tags.split(",").map((s) => s.trim()).filter(Boolean),
      status: "Active",
      priority: "Medium",
      isStarred: false,
    }
    setNotes([note, ...notes])
    setDialogOpen(false)
    router.push(`/enotes/${id}`)
  }

  const toggleStar = (id: string) =>
    setNotes(notes.map((n) => (n.id === id ? { ...n, isStarred: !n.isStarred } : n)))

  const deleteNote = (id: string) => setNotes(notes.filter((n) => n.id !== id))

  // Menu handlers
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuNoteId, setMenuNoteId] = useState<string>("")

  const openMenu = (e: React.MouseEvent<HTMLElement>, noteId: string) => {
    setAnchorEl(e.currentTarget); setMenuNoteId(noteId)
  }
  const closeMenu = () => setAnchorEl(null)

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F9FAFB", p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Electronic Notes</Typography>
        <Button variant="contained" startIcon={<MoreVert />} onClick={() => setDialogOpen(true)}>
          Create Note
        </Button>
      </Box>

      {/* Search & Tabs */}
      <Box component="main" sx={{ flexGrow: 1, }}>
        <Tabs value={tab} onChange={(e, val) => setTab(val)} textColor="primary" indicatorColor="primary">
          {TAB_OPTIONS.map((opt) => <Tab key={opt} label={opt.charAt(0).toUpperCase() + opt.slice(1)} value={opt} />)}
        </Tabs>
        <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
          <Grid item>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <IconButton><FilterList /></IconButton>
          </Grid>
        </Grid>
      </Box>

      {/* Note Cards */}
      <Grid container spacing={2}>
        {filtered.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card>
              <CardHeader
                title={note.title}
                subheader={`${format(note.createdAt, "MMM d, yyyy")} / ${format(note.updatedAt, "MMM d, yyyy")}`}
                action={
                  <Box>
                    <IconButton onClick={() => toggleStar(note.id)}>
                      <StarIcon color={note.isStarred ? "warning" : "disabled"} />
                    </IconButton>
                    <IconButton onClick={(e) => openMenu(e, note.id)}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body2">{note.excerpt}</Typography>
              </CardContent>
              <CardActions>
                <Chip label={note.category} size="small" color="primary" />
                {note.tags.slice(0, 2).map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ ml: 0.5 }} />
                ))}
                {note.tags.length > 2 && <Chip label={`+${note.tags.length - 2} more`} size="small" variant="outlined" />}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Row menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={() => { router.push(`/enotes/${menuNoteId}`); closeMenu() }}>View</MenuItem>
        <MenuItem onClick={() => { router.push(`/enotes/edit/${menuNoteId}`); closeMenu() }}>Edit</MenuItem>
        <MenuItem onClick={() => { deleteNote(menuNoteId); closeMenu() }}><Delete /> Delete</MenuItem>
      </Menu>

      {/* Create dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Create New Note</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                fullWidth
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                fullWidth
                multiline
                minRows={6}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                fullWidth
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tags (comma separated)"
                fullWidth
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
