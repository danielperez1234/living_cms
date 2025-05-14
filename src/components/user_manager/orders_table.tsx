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





const OrdersTable: React.FC = () => {
  const {getPurchaseHistoryResponse, getPurchasesHistory,putPurchaseStatus, loading: isLoading,putStatusResonse} = usePurchasesStore(state=>state);
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
    if(putStatusResonse == "Status actualizado correctamente.")
    fetchAndSetOrders(page);
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
    <Box>
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom:'20px' }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Pedidos Recientes
      </Typography>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="tabla de pedidos recientes">
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>ID Usuario</TableCell>
              <TableCell>Email Cliente</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getPurchaseHistoryResponse?.purchaseHistories.length === 0 && !isLoading ? (
                <TableRow>
                    <TableCell colSpan={7} align="center">No hay pedidos para mostrar.</TableCell>
                </TableRow>
            ) : (
              getPurchaseHistoryResponse?.purchaseHistories.map((purchase) => (
                <TableRow hover key={purchase.purchaseHistoryId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    {purchase.purchaseHistoryId.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell> 
                    {/* //purchase.createdAt */}
                    <TableCell>{purchase.userId.substring(0,8)}...</TableCell>
                    <TableCell>{purchase.purchaseDetail.email}</TableCell>
                    <TableCell align="right">${purchase.amount.toFixed(2)}</TableCell>
                    <TableCell>
                    <Chip label={purchase.status} color={getStatusChipColor(purchase.status)} size="small" />
                    </TableCell>
                    <TableCell align="center">
                    <Button
                        variant="text"
                        onClick={() => handleOpenModal(purchase)}
                    >
                        <EditIcon />
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