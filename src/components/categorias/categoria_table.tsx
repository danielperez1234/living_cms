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
import SimplePagination from "../common/paginado";
import { Categoria } from "@/service/categorias/interface";
import useCategoriasStore from "@/service/categorias/store";
import { useRouter } from "next/navigation";

const CategoriaTable = ({
  categorias: banners,
}: {
  categorias: Categoria[];
}) => {
  // Router
  const router = useRouter();

  // zustandHooks
  const getCategoria = useCategoriasStore((state) => state.getCategorias);
  const selectCategoria = useCategoriasStore((state) => state.selectCategoria);

  // local hooks
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredBanners = banners.filter((categoria) =>
    categoria.categoryName?.toLowerCase().includes(searchTerm)
  );

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
              <TableCell>Categorías</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((categoria) => (
              <TableRow
                key={categoria.id}
                onClick={() => {
                  selectCategoria(categoria);
                  router.push(`/categorias/${categoria.id}`);
                }}
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
