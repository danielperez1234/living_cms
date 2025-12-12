"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, CircularProgress, Alert, Typography, Box, Chip, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {  ApiPurchaseHistory, OrderStatus } from '@/service/user_manager/interface';
import EditOrderModal from './edit_order_modal';
import SimplePagination from '../common/paginado';
import usePurchasesStore from '@/service/user_manager/store';
import { useSnackbar } from '../common/snackbar_provider';





const OrdersTable: React.FC = () => {
  const {getPurchaseHistoryResponse, getPurchasesHistory,putPurchaseStatus, loading: isLoading,putStatusResonse} = usePurchasesStore(state=>state);
  const { showSnackbar } = useSnackbar();
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ApiPurchaseHistory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);

  const fetchAndSetOrders = async (page? : number | undefined) => {
    setError(null);
    try {
       getPurchasesHistory(page ?? 1);
      
    } catch (err) {
      setError('Error al cargar los pedidos.');
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchAndSetOrders();
  }, []);
  useEffect(() => {
    if(putStatusResonse == "Status actualizado correctamente.") {
      showSnackbar(putStatusResonse, "success");
      fetchAndSetOrders(page);
    }
  }, [putStatusResonse]);

  const handleOpenModal = (order: ApiPurchaseHistory) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveOrderStatus = async (purchaseId: string, newStatus: OrderStatus) => {
    // Aquí llamarías a tu API real
    await putPurchaseStatus(purchaseId, newStatus);
   
  };

  const getStatusChipColor = (status: OrderStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case "Pedido Recibido": return "info";
      case "Pago Confirmado": return "primary";
      case "En Preparación": return "warning";
      case "Enviado": return "secondary";
      case "Entregado": return "success";
      case "Cancelado": return "error";
      case "Reembolso en Proceso": return "default";
      default: return "default";
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };




  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom:'20px' }}>
      <Typography variant="h6" component="div" sx={{ p: { xs: 1.5, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 'bold' }}>
        Pedidos Recientes
      </Typography>
      <TableContainer sx={{ maxHeight: { xs: '70vh', sm: 600 }, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="tabla de pedidos recientes" sx={{ minWidth: { xs: 500, sm: 650 } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>ID Pedido</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Fecha</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>ID Usuario</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Email Cliente</TableCell>
              <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Monto</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Estado</TableCell>
              <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getPurchaseHistoryResponse?.purchaseHistories.length === 0 && !isLoading ? (
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1.5, sm: 2 } }}>No hay pedidos para mostrar.</TableCell>
                </TableRow>
            ) : (
              getPurchaseHistoryResponse?.purchaseHistories.map((purchase) => (
                <TableRow hover key={purchase.purchaseHistoryId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>
                    {purchase.purchaseHistoryId.substring(0, 8)}...
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>{new Date().toLocaleDateString()}</TableCell> 
                    {/* //purchase.createdAt */}
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>{purchase.userId.substring(0,8)}...</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>{purchase.purchaseDetail.email}</TableCell>
                    <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>${purchase.amount.toFixed(2)}</TableCell>
                    <TableCell sx={{ py: { xs: 0.75, sm: 1 } }}>
                    <Chip label={purchase.status} color={getStatusChipColor(purchase.status)} size="small" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }} />
                    </TableCell>
                    <TableCell align="center" sx={{ py: { xs: 0.75, sm: 1 } }}>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => handleOpenModal(purchase)}
                        sx={{ minWidth: { xs: 32, sm: 40 }, p: { xs: 0.5, sm: 1 } }}
                    >
                        <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditOrderModal
        open={isModalOpen}
        order={selectedOrder}
        onClose={handleCloseModal}
        onSave={handleSaveOrderStatus}
      />
    </Paper>
    <SimplePagination totalPages={Math.ceil((getPurchaseHistoryResponse?.elementos ?? 10) /10) } onChange={(i)=>{
      setPage(i);
      getPurchasesHistory(i)
    }} />
    </Box>
  );
};

export default OrdersTable;