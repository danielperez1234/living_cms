"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, CircularProgress, Alert, Typography, Box, Chip, TablePagination, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/service/users/interface';
import useUsersStore from '@/service/users/store';
import { useSnackbar } from '../common/snackbar_provider';
import EditUserModal from './edit_user_modal';

const UsersTable: React.FC = () => {
  const {
    users,
    loading: isLoading,
    updateResponse,
    deleteResponse,
    error: storeError,
    getAllUsers,
    clearResponses
  } = useUsersStore();

  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateResponse) {
      showSnackbar(updateResponse, "success");
      getAllUsers();
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateResponse]);

  useEffect(() => {
    if (deleteResponse) {
      showSnackbar(deleteResponse, "success");
      getAllUsers();
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteResponse]);

  useEffect(() => {
    if (storeError) {
      showSnackbar(storeError, "error");
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeError]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users?.find(u => u.id === userId);
    if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${user?.userName || userId}?`)) {
      useUsersStore.getState().deleteUser(userId);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" component="div" sx={{ p: { xs: 1.5, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 'bold' }}>
        Gestión de Usuarios
      </Typography>
      <TableContainer sx={{ maxHeight: { xs: '70vh', sm: 600 }, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="tabla de usuarios" sx={{ minWidth: { xs: 450, sm: 650 } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>ID Usuario</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Nombre</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Email</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Rol</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Registrado</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Estado</TableCell>
              <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 'bold', py: { xs: 1, sm: 1.5 } }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 && !isLoading ? (
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1.5, sm: 2 } }}>No hay usuarios para mostrar.</TableCell>
                </TableRow>
            ) : (
                paginatedUsers.map((user) => (
                <TableRow hover key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>
                    {user.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>{user.userName}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>{user.email}</TableCell>
                    <TableCell sx={{ py: { xs: 0.75, sm: 1 } }}>
                    <Chip label={user.role} color={user.role === 'SuperAdmin' ? 'secondary' : 'default'} size="small" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }} />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ py: { xs: 0.75, sm: 1 } }}>
                    <Chip label={user.active ? 'Activo' : 'Inactivo'} color={user.active ? 'success' : 'default'} size="small" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }} />
                    </TableCell>
                    <TableCell align="center" sx={{ py: { xs: 0.75, sm: 1 } }}>
                    <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Tooltip title="Editar Usuario">
                        <IconButton onClick={() => handleEditUser(user)} color="primary" size="small" sx={{ p: { xs: 0.5, sm: 0.75 } }}>
                        <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Usuario">
                        <IconButton onClick={() => handleDeleteUser(user.id)} color="error" size="small" sx={{ p: { xs: 0.5, sm: 0.75 } }}>
                        <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                        </IconButton>
                    </Tooltip>
                    </Box>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Usuarios por página:"
        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
      />
      <EditUserModal
        open={isModalOpen}
        user={selectedUser}
        onClose={handleCloseModal}
      />
    </Paper>
  );
};

export default UsersTable;