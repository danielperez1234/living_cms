"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Fab,
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
import AgregarSubCategoriaModal from "./add_subcategory";
import useCategoriasStore from "@/service/categorias/store";

import AddIcon from "@mui/icons-material/Add";
const SubcategoriaTable = ({
  subcategorias: banners,
  idCategory
}: {
  subcategorias: Subcategoria;
  idCategory:string
}) => {
  // Router
  const router = useRouter();

  // Zustand Hooks
  const {  selectSubcategoria, subcategoria,selectedSubcategoria } =
    useSubcategoriasStore((state) => ({
      
      selectSubcategoria: state.selectSubcategoria,
      subcategoria: state.subcategoriaProducts,
      selectedSubcategoria: state.selectedSubcategoria
    }));
    const postsubcategoria = useSubcategoriasStore((state) => state.addSubcategoria);
    const getSubcategorias = useSubcategoriasStore((state) => state.getSubcategorias);
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
    
  };
  useEffect(()=>{
    console.log("Subcategoria: ", selectedSubcategoria);
    if (selectedSubcategoria) {
      router.push(`/categorias/${idCategory}/${selectedSubcategoria.id}`);
    }
  },[selectedSubcategoria]);
  return (
    <Box>
      <AgregarSubCategoriaModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (subCategory) => {
          await postsubcategoria(subCategory,idCategory);
          getSubcategorias(idCategory);
        }}
      />
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
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
