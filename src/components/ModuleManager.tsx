'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Settings, Delete, ClipboardPlus } from 'lucide-react';

interface Module {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}

const initialModules: Module[] = [
  { id: 1, name: 'User Management', description: 'Manage users and permissions.', enabled: true },
  { id: 2, name: 'Billing System', description: 'Handles invoices and payments.', enabled: false },
  { id: 3, name: 'Notification Service', description: 'Email & push notification module.', enabled: true },
];

export default function ModuleManager() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [open, setOpen] = useState(false);
  const [newModule, setNewModule] = useState({ name: '', description: '' });

  const toggleModule = (id: number) => {
    setModules(prev =>
      prev.map(mod =>
        mod.id === id ? { ...mod, enabled: !mod.enabled } : mod
      )
    );
  };

  const handleDelete = (id: number) => {
    setModules(prev => prev.filter(mod => mod.id !== id));
  };

  const handleAdd = () => {
    if (!newModule.name.trim()) return;
    setModules(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newModule.name,
        description: newModule.description,
        enabled: true,
      },
    ]);
    setNewModule({ name: '', description: '' });
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Manage Modules
        </Typography>
        <Button variant="contained" startIcon={<ClipboardPlus />} onClick={() => setOpen(true)}>
          Add Module
        </Button>
      </Box>

      <Grid container spacing={3}>
        {modules.map((mod) => (
          <Grid item xs={12} sm={6} md={4} key={mod.id}>
            <Card variant="outlined">
              <CardHeader
                title={mod.name}
                action={
                  <Switch
                    checked={mod.enabled}
                    onChange={() => toggleModule(mod.id)}
                    inputProps={{ 'aria-label': 'Enable module' }}
                  />
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {mod.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <IconButton size="small">
                    <Settings size={18} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(mod.id)}>
                    <Delete size={18} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Module Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Module</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            label="Module Name"
            fullWidth
            margin="dense"
            value={newModule.name}
            onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={newModule.description}
            onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
