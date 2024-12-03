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
import { Subcategoria, Subcategory } from "@/service/subcategorias/interface";
import { useRouter } from "next/navigation";
import useSubcategoriasStore from "@/service/subcategorias/store";

const SubcategoriaTable = ({
  subcategorias: banners,
}: {
  subcategorias: Subcategoria;
}) => {
  // Router
  const router = useRouter();

  // Zustand Hooks
  const { getSubcategoria, selectSubcategoria, subcategoria } =
    useSubcategoriasStore((state) => ({
      getSubcategoria: state.getSubcategoria,
      selectSubcategoria: state.selectSubcategoria,
      subcategoria: state.subcategoria,
    }));

  // Local Hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const filteredSubcategorias =
    banners?.subcategories?.filter((subcategoria) =>
      subcategoria.subcategoryName?.toLowerCase().includes(searchTerm)
    ) || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleClick = async (handleSubcategoria: Subcategory) => {
    await getSubcategoria(handleSubcategoria.id);
    selectSubcategoria(handleSubcategoria);
    console.log("Subcategoria: ", subcategoria);
    if (subcategoria) {
      router.push(`/categorias/${subcategoria.categoryId}/${subcategoria.id}`);
    }
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
                onClick={() => handleClick(subcategoria)}
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
