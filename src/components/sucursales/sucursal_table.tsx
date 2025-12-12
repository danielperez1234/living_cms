"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Fab,
  IconButton,
  Tooltip,
  Typography,
  Chip
} from "@mui/material";
//Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import SimplePagination from "../common/paginado";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Sucursal } from "@/service/sucursales/interface";
import useSucursalesStore from "@/service/sucursales/store";
import AgregarSucursalBanner from "./add_sucursale";
import SucursalImageModal from "./sucursal_image";
import UpdateSucursalesBanner from "./update_sucursales";
import { updateSucursal } from "@/service/sucursales/service";

const SucursalTable = ({ sucursales: banners }: { sucursales: Sucursal[] }) => {
  // zustandHooks
  const postSucursal = useSucursalesStore((state) => state.addSucursal);
  const deleteSucursal = useSucursalesStore((state) => state.deleteSucursal);
  const getSucursal = useSucursalesStore((state) => state.getSucursales);
  const selectSucursal = useSucursalesStore((state) => state.selectSucursal);

  //local hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageModal, setImageModal] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBanners = banners.filter((sucursal) =>
    sucursal.name?.toLowerCase().includes(searchTerm)
  );
  const handleClick = (sucursal: Sucursal) => {
    console.log(`Banner clickeado: ${sucursal.name}`);
    // Aquí puedes hacer cualquier otra cosa, como redirigir a una página, abrir un modal, etc.
  };
  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', px: { xs: 0.5, sm: 1, md: 2 }, pb: 3, boxSizing: 'border-box' }}>
      <AgregarSucursalBanner
        accept={"image/*"}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (asset) => {
          await postSucursal({ ...asset });
          getSucursal();
        }}
      />
      <UpdateSucursalesBanner
        accept={"image/*"}
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onSubmit={async (sucursal, image) => {
          await updateSucursal(sucursal, image);
          getSucursal();
        }}
      />
      <SucursalImageModal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        file={imageModal}
      />
      <Box
        display={"flex"}
        width={"-webkit-fill-available"}
        justifyContent={"end"}
        mb={2}
        mt={{ xs: 1, sm: 2 }}
        px={{ xs: 0.5, sm: 0 }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setOpenAddModal(true)}
          size="medium"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            px: { xs: 1.5, sm: 2, md: 3 },
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: 36, sm: 40 }
          }}
        >
          <AddIcon sx={{ mr: { xs: 0.5, sm: 1 }, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
          Agregar
        </Fab>
      </Box>
      <Box sx={{ px: { xs: 0.5, sm: 0 } }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearchChange}
          size="small"
          sx={{ mb: 2, width: '100%' }}
        />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            p: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 'bold',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          Lista de Sucursales
        </Typography>
        <TableContainer sx={{ maxHeight: { xs: '70vh', sm: 600 }, overflowX: 'auto' }}>
          <Table stickyHeader aria-label="tabla de sucursales" sx={{ minWidth: { xs: 600, sm: 750, md: 900 } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                  Nombre
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 }, minWidth: 200 }}>
                  Descripción
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ScheduleIcon fontSize="small" />
                    Horario
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon fontSize="small" />
                    Teléfono
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon fontSize="small" />
                    Ubicación
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBanners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No se encontraron sucursales
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBanners.map((sucursal) => (
                  <TableRow
                    key={sucursal.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>
                      <Typography variant="body2" fontWeight="medium">
                        {sucursal.name ?? "Sin nombre"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 }, maxWidth: 250 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {sucursal.description ?? "Sin descripción"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>
                      {sucursal.schedule && sucursal.schedule !== "" ? (
                        <Chip label={sucursal.schedule} size="small" variant="outlined" />
                      ) : (
                        <Typography variant="body2" color="text.secondary">Sin horario</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>
                      <Typography variant="body2">
                        {sucursal.phoneNumber || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: { xs: 0.75, sm: 1 } }}>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        Lat: {sucursal.latitude?.toFixed(4) || "N/A"}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        Lng: {sucursal.longitude?.toFixed(4) || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ py: { xs: 0.75, sm: 1 } }}>
                      <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, justifyContent: 'center', flexWrap: 'nowrap' }}>
                        <Tooltip title="Ver imagen">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageModal(sucursal.image ?? "");
                              setOpenImageModal(true);
                            }}
                            color="info"
                            size="small"
                            sx={{ p: { xs: 0.5, sm: 0.75 } }}
                          >
                            <ImageIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              selectSucursal(sucursal);
                              setOpenUpdateModal(true);
                            }}
                            color="primary"
                            size="small"
                            sx={{ p: { xs: 0.5, sm: 0.75 } }}
                          >
                            <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (window.confirm(`¿Estás seguro de eliminar la sucursal "${sucursal.name}"?`)) {
                                await deleteSucursal(sucursal.id);
                                getSucursal();
                              }
                            }}
                            color="error"
                            size="small"
                            sx={{ p: { xs: 0.5, sm: 0.75 } }}
                          >
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
      </Paper>
      <Box sx={{ mt: 2, px: { xs: 0.5, sm: 0 } }}>
        <SimplePagination />
      </Box>
    </Box>
  );
};

export default SucursalTable;
