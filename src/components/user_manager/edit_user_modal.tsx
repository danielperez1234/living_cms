"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { User, UpdateUserRequest } from "@/service/users/interface";
import useUsersStore from "@/service/users/store";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const USER_ROLES = ["User", "SuperAdmin"];

const ROLE_LABELS: { [key: string]: string } = {
  User: "Usuario",
  SuperAdmin: "Super Administrador",
};

const ROLE_DESCRIPTIONS: { [key: string]: string } = {
  User: "Usuario estándar con acceso a la tienda y compras.",
  SuperAdmin: "Administrador con acceso completo al sistema CMS.",
};

const EditUserModal: React.FC<EditUserModalProps> = ({ open, user, onClose }) => {
  const { updateUser, loading, updateResponse, error: storeError } = useUsersStore();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setSelectedRole(user.role || "User");
      setIsActive(user.active ?? true);
      setError(null);
    }
  }, [user]);

  // Close modal when update is successful
  useEffect(() => {
    if (updateResponse && open) {
      onClose();
    }
  }, [updateResponse, open, onClose]);

  // Show backend errors
  useEffect(() => {
    if (storeError && open) {
      setError(storeError);
    }
  }, [storeError, open]);

  const handleSave = () => {
    if (!user) return;

    // Validaciones
    if (!userName.trim()) {
      setError("El nombre de usuario es obligatorio.");
      return;
    }

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El correo electrónico no tiene un formato válido.");
      return;
    }

    if (!selectedRole) {
      setError("Debes seleccionar un rol.");
      return;
    }

    setError(null);

    const updateData: UpdateUserRequest = {
      userName: userName !== user.userName ? userName : undefined,
      email: email !== user.email ? email : undefined,
      role: selectedRole !== user.role ? selectedRole : undefined,
      active: isActive !== user.active ? isActive : undefined,
    };

    // Solo enviar si hay cambios
    if (Object.values(updateData).some(v => v !== undefined)) {
      updateUser(user.id, updateData);
      // El modal se cerrará automáticamente cuando updateResponse cambie
    } else {
      setError("No hay cambios para guardar.");
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <TextField
            label="ID de Usuario"
            value={user.id}
            disabled
            fullWidth
            size="small"
            helperText="El ID no se puede modificar"
          />

          <TextField
            label="Nombre de Usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />

          <TextField
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            type="email"
            disabled={loading}
          />

          <FormControl fullWidth required>
            <InputLabel>Rol</InputLabel>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              label="Rol"
              disabled={loading}
            >
              {USER_ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  {ROLE_LABELS[role]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedRole && (
            <Alert severity="info" sx={{ mt: 1 }}>
              <Typography variant="body2">{ROLE_DESCRIPTIONS[selectedRole]}</Typography>
            </Alert>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={loading}
              />
            }
            label={isActive ? "Usuario Activo" : "Usuario Inactivo"}
          />

          <Typography variant="caption" color="text.secondary">
            Fecha de registro: {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
