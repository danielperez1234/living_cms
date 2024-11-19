"use client";
import React from "react";
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
} from "@mui/material";
//Icons
import AddIcon from "@mui/icons-material/Add";
import SimplePagination from "../common/paginado";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { Categoria } from "@/service/categorias/interface";
import useCategoriasStore from "@/service/categorias/store";

const CategoriaTable = ({
  categorias: banners,
}: {
  categorias: Categoria[];
}) => {
  // zustandHooks
  const getCategoria = useCategoriasStore((state) => state.getCategorias);

  // local hooks
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredBanners = banners.filter((categoria) =>
    categoria.categoryName?.toLowerCase().includes(searchTerm)
  );
  const handleClick = (categoria: Categoria) => {
    console.log(`Banner clickeadi: ${categoria.categoryName}`);
  };

  return (
    <Box>
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
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((categoria) => (
              <TableRow
                key={categoria.id}
                onClick={() => handleClick(categoria)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{categoria.categoryName ?? "Sin nombre"}</TableCell>
                <TableCell>{categoria.id ?? "Sin descripcion"}</TableCell>
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

export default CategoriaTable;
