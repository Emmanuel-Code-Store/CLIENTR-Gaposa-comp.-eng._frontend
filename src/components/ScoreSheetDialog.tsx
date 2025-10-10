"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Button,
  IconButton,
  Box,
  Typography,
  FormControl,
  styled,
} from "@mui/material"
import { X } from "lucide-react"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: 600,
    borderRadius: theme.spacing(2),
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
  },
}))

// ✅ Export type so Storybook can import it
export interface ScoreSheetData {
  session: string
  term: string
  class: string
  subject: string
}

interface ScoreSheetDialogProps {
  open: boolean
  onClose: () => void
  onCheck: (data: ScoreSheetData) => void
}

export default function ScoreSheetDialog({ open, onClose, onCheck }: ScoreSheetDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose} aria-labelledby="score-sheet-dialog">
      <StyledDialogTitle>
        <Typography variant="h6">Score Sheet</Typography>
        <IconButton edge="end" onClick={onClose} aria-label="close" size="small">
          <X size={20} />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box component="form">
          <StyledFormControl fullWidth>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Session
            </Typography>
            <Select displayEmpty defaultValue="" size="small">
              <MenuItem disabled value="">
                Select a Session
              </MenuItem>
              <MenuItem value="2023/2024">2023/2024</MenuItem>
              <MenuItem value="2024/2025">2024/2025</MenuItem>
            </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Term
            </Typography>
            <Select displayEmpty defaultValue="" size="small">
              <MenuItem disabled value="">
                Select a Term
              </MenuItem>
              <MenuItem value="first">First Term</MenuItem>
              <MenuItem value="second">Second Term</MenuItem>
              <MenuItem value="third">Third Term</MenuItem>
            </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Class
            </Typography>
            <Select displayEmpty defaultValue="" size="small">
              <MenuItem disabled value="">
                Select a Class
              </MenuItem>
              <MenuItem value="jss1">JSS 1</MenuItem>
              <MenuItem value="jss2">JSS 2</MenuItem>
              <MenuItem value="jss3">JSS 3</MenuItem>
            </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Subject
            </Typography>
            <Select displayEmpty defaultValue="" size="small">
              <MenuItem disabled value="">
                Select a Subject
              </MenuItem>
              <MenuItem value="english">English Language</MenuItem>
              <MenuItem value="mathematics">Mathematics</MenuItem>
              <MenuItem value="science">Science</MenuItem>
            </Select>
          </StyledFormControl>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() =>
                onCheck({
                  session: "",
                  term: "",
                  class: "",
                  subject: "",
                })
              }
              sx={{
                bgcolor: "#0D0F29",
                "&:hover": {
                  bgcolor: "#1a1d4d",
                },
                px: 4,
              }}
            >
              Check
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  )
}
