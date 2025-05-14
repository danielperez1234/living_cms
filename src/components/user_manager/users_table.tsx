"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, CircularProgress, Alert, Typography, Box, Chip, TablePagination, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
 interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: string; // Fecha de registro
  lastLogin?: string; // Opcional: último inicio de sesión
}
// Mock de datos de usuarios
const MOCK_USERS: User[] = [
  { id: "498327ca-853e-4c71-8e97-e8ffb3e082ff", name: "Daniel Najera", email: "dn2@g.com", role: "admin", createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), lastLogin: new Date().toISOString() },
  { id: "user002", name: "Jane Doe", email: "jane.doe@example.com", role: "customer", createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "user003", name: "John Smith", email: "john.smith@example.com", role: "customer", createdAt: new Date(Date.now() - 86400000 * 20).toISOString(), lastLogin: new Date(Date.now() - 86400000 * 1).toISOString() },
  // ... más usuarios
];

// Simulación de llamada API
const fetchUsersAPI = (): Promise<User[]> => {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_USERS), 800));
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchUsersAPI();
        setUsers(data);
      } catch (err) {
        setError('Error al cargar los usuarios.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (userId: string) => {
    console.log(`Editar usuario: ${userId}`);
    // Aquí abrirías un modal o navegarías a una página de edición de usuario
    alert(`FUNCIONALIDAD PENDIENTE: Editar usuario ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${userId}?`)) {
      console.log(`Eliminar usuario: ${userId}`);
      // Lógica de eliminación y actualización del estado
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      alert(`FUNCIONALIDAD PENDIENTE (simulado): Usuario ${userId} eliminado`);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Gestión de Usuarios
      </Typography>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="tabla de usuarios">
          <TableHead>
            <TableRow>
              <TableCell>ID Usuario</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Registrado</TableCell>
              <TableCell>Último Acceso</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 && !isLoading ? (
                <TableRow>
                    <TableCell colSpan={7} align="center">No hay usuarios para mostrar.</TableCell>
                </TableRow>
            ) : (
                paginatedUsers.map((user) => (
                <TableRow hover key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    {user.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                    <Chip label={user.role} color={user.role === 'admin' ? 'secondary' : 'default'} size="small" />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</TableCell>
                    <TableCell align="center">
                    <Tooltip title="Editar Usuario">
                        <IconButton onClick={() => handleEditUser(user.id)} color="primary" size="small">
                        <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Usuario">
                        <IconButton onClick={() => handleDeleteUser(user.id)} color="error" size="small">
                        <DeleteIcon />
                        </IconButton>
                    </Tooltip>
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Usuarios por página:"
      />
    </Paper>
  );
};

export default UsersTable;