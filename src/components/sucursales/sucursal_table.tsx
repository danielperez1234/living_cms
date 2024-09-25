"use cliente";
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
  Button
} from "@mui/material";
import Link from "next/link";
//Icons
import AddIcon from "@mui/icons-material/Add";
import SimplePagination from "../common/paginado";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { Sucursal } from "@/service/sucursales/interface";
import useSucursalesStore from "@/service/sucursales/store";
import AgregarSucursalBanner from "./add_sucursale";
import SucursalImageModal from "./sucursal_image";

const SucursalTable = ({ sucursales: banners }: { sucursales: Sucursal[] }) => {
  // zustandHooks
  const postSucursal = useSucursalesStore((state) => state.addSucursal);
  const deleteSucursal = useSucursalesStore((state) => state.deleteSucursal);
  const getSucursal = useSucursalesStore((state) => state.getSucursales);

  //local hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
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
    <Box>
      <AgregarSucursalBanner
        accept={"image/*"}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (asset) => {
          await postSucursal({ ...asset });
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
        width={"96%"}
        marginX={"2%"}
        justifyContent={"end"}
        bottom={100}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setOpenAddModal(true)}
        >
          <AddIcon sx={{ mr: 1 }} />
          Agregar
        </Fab>
        <Box width={"10px"} />
      </Box>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Número de teléfono</TableCell>
              <TableCell>Latitud/Longitud</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((sucursal) => (
              <TableRow
                key={sucursal.id}
                onClick={() => handleClick(sucursal)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{sucursal.name ?? "Sin nombre"}</TableCell>
                <TableCell>
                  {sucursal.description ?? "Sin descripcion"}
                </TableCell>
                <TableCell>
                  {sucursal.schedule && sucursal.schedule != ""
                    ? sucursal.schedule
                    : "Sin horario"}
                </TableCell>
                <TableCell>
                  {sucursal.phoneNumber}
                </TableCell>
                <TableCell>
                  {sucursal.latitude + "/" + sucursal.longitude}
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      setImageModal(sucursal.image ?? "");
                      setOpenImageModal(true);
                    }}
                  >
                    <ImageIcon />
                  </Button>
                  <Button
                    variant="text"
                    onClick={async () => {
                      await deleteSucursal(sucursal.id);
                      getSucursal();
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box height={"20px"} />
      <SimplePagination />
    </Box>
  );
};

export default SucursalTable;
