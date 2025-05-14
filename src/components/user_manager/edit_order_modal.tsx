"use client"; // Necesario para interactividad

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert, Box,
  Typography
} from '@mui/material';
import {  ApiPurchaseHistory, ORDER_STATUS_DESCRIPTIONS, ORDER_STATUSES, OrderStatus } from '@/service/user_manager/interface';

interface EditOrderModalProps {
  open: boolean;
  order: ApiPurchaseHistory | null;
  onClose: () => void;
  onSave: (orderId: string, newStatus: OrderStatus) => Promise<void>; // Hacerla async
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ open, order, onClose, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    } else {
      setSelectedStatus(''); // Resetear al cerrar/cambiar de orden
    }
  }, [order]);

  if (!order) return null;

  const handleSave = async () => {
    if (selectedStatus && order) {
      setIsLoading(true);
      setError(null);
      try {
        await onSave(order.purchaseHistoryId, selectedStatus as OrderStatus);
        onClose(); // Cerrar solo si el guardado fue exitoso
      } catch (err) {
        console.error("Error saving order status:", err);
        setError("Error al guardar el estado del pedido. Inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const currentStatusDescription = selectedStatus ? ORDER_STATUS_DESCRIPTIONS[selectedStatus as OrderStatus] : '';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Estado del Pedido - ID: {order.purchaseHistoryId}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Cliente: {order.purchaseDetail.email} <br />
          Monto Total: ${order.amount.toFixed(2)}
        </DialogContentText>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-select-label">Estado del Pedido</InputLabel>
          <Select
            labelId="status-select-label"
            value={selectedStatus}
            label="Estado del Pedido"
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
            disabled={isLoading}
          >
            {ORDER_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedStatus && (
          <Box sx={{ mt: 2, p: 2, border: '1px dashed grey', borderRadius: 1 }}>
            <Typography variant="subtitle2">Descripción del estado:</Typography>
            <Typography variant="body2">{currentStatusDescription}</Typography>
          </Box>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={isLoading || !selectedStatus}>
          {isLoading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderModal;