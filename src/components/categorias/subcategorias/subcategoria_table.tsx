"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SimplePagination from "@/components/common/paginado";
import { Subcategoria } from "@/service/subcategorias/interface";

const SubcategoriaTable = ({
  subcategorias: banners,
}: {
  subcategorias: Subcategoria;
}) => {
  // Local Hooks
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSubcategorias = banners.subcategories.filter((subcategoria) =>
    subcategoria.subcategoryName?.toLowerCase().includes(searchTerm)
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleClick = (subcategoria: string) => {
    console.log(`Subcategoria clicked: ${subcategoria}`);
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
              <TableCell>Subcategorias</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubcategorias.map((subcategoria) => (
              <TableRow
                key={subcategoria.id}
                onClick={() => handleClick(subcategoria.subcategoryName)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  {subcategoria.subcategoryName ?? "Sin nombre"}
                </TableCell>
                <TableCell>{subcategoria.id ?? "Sin descripcion"}</TableCell>
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

export default SubcategoriaTable;
