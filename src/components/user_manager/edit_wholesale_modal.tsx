"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { WholesaleRequest, UpdateStatusRequest } from "@/service/contact/interface";
import useContactStore from "@/service/contact/store";

interface EditWholesaleModalProps {
  open: boolean;
  request: WholesaleRequest | null;
  onClose: () => void;
}

// Backend statuses (English)
const WHOLESALE_STATUSES = ["Pending", "Contacted", "Approved", "Rejected"];

// Display labels in Spanish
const STATUS_LABELS: { [key: string]: string } = {
  Pending: "Pendiente",
  Contacted: "Contactado",
  Approved: "Aprobado",
  Rejected: "Rechazado",
};

const STATUS_DESCRIPTIONS: { [key: string]: string } = {
  Pending: "La solicitud ha sido recibida y está pendiente de revisión.",
  Contacted: "Se ha contactado al cliente para más información.",
  Approved: "La solicitud ha sido aprobada y procesada exitosamente.",
  Rejected: "La solicitud no cumple con los requisitos.",
};

const EditWholesaleModal: React.FC<EditWholesaleModalProps> = ({ open, request, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateWholesaleStatus } = useContactStore((state) => state);

  useEffect(() => {
    if (request) {
      setSelectedStatus(request.status);
      setAdminNotes(request.adminNotes || "");
    } else {
      setSelectedStatus("");
      setAdminNotes("");
    }
  }, [request]);

  if (!request) return null;

  const handleSave = async () => {
    if (selectedStatus && request) {
      setIsLoading(true);
      setError(null);
      try {
        const updateData: UpdateStatusRequest = {
          status: selectedStatus,
          adminNotes: adminNotes.trim() || undefined,
        };
        await updateWholesaleStatus(request.id, updateData);
        onClose();
      } catch (err) {
        console.error("Error saving wholesale status:", err);
        setError("Error al guardar el estado. Inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const currentStatusDescription = selectedStatus ? STATUS_DESCRIPTIONS[selectedStatus] : "";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: { xs: "95vw", sm: "500px", md: "600px" },
          maxHeight: { xs: "90vh", sm: "95vh" },
          m: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, fontWeight: "bold", p: { xs: 2, sm: 2.5 } }}
      >
        Editar Solicitud de Mayorista
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <DialogContentText sx={{ mb: 2, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
          <strong>Nombre:</strong> {request.name} <br />
          <strong>Email:</strong> {request.email} <br />
          <strong>Teléfono:</strong> {request.phone} <br />
          <strong>Fecha:</strong> {new Date(request.createdAt).toLocaleDateString()}
        </DialogContentText>
        {error && (
          <Alert severity="error" sx={{ mb: 2, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
            {error}
          </Alert>
        )}
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id="status-select-label" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Estado de la Solicitud
          </InputLabel>
          <Select
            labelId="status-select-label"
            value={selectedStatus}
            label="Estado de la Solicitud"
            onChange={(e) => setSelectedStatus(e.target.value)}
            disabled={isLoading}
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {WHOLESALE_STATUSES.map((status) => (
              <MenuItem key={status} value={status} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                {STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedStatus && (
          <Box sx={{ mt: 2, p: { xs: 1.5, sm: 2 }, border: "1px dashed grey", borderRadius: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, fontWeight: "bold" }}
            >
              Descripción del estado:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
              {currentStatusDescription}
            </Typography>
          </Box>
        )}
        <TextField
          fullWidth
          multiline
          rows={3}
          margin="normal"
          label="Notas del administrador"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          disabled={isLoading}
          placeholder="Escribe notas adicionales sobre esta solicitud..."
          sx={{ mt: 2, fontSize: { xs: "0.875rem", sm: "1rem" } }}
        />
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 2.5 }, gap: { xs: 1, sm: 1.5 } }}>
        <Button
          onClick={onClose}
          color="secondary"
          disabled={isLoading}
          size="small"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, px: { xs: 2, sm: 3 } }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isLoading || !selectedStatus}
          size="small"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, px: { xs: 2, sm: 3 } }}
        >
          {isLoading ? <CircularProgress size={20} /> : "Guardar Cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWholesaleModal;
