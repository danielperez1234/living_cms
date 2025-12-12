"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import TuneIcon from '@mui/icons-material/Tune';

import AddIcon from "@mui/icons-material/Add";
const SubcategoriaTable = ({
  subcategorias: banners,
  idCategory
}: {
  subcategorias: Subcategoria;
  idCategory: string
}) => {
  // Router
  const router = useRouter();

  // Zustand Hooks
  const { selectSubcategoria, subcategoria, selectedSubcategoria, clearSelection } =
    useSubcategoriasStore((state) => ({

      selectSubcategoria: state.selectSubcategoria,
      subcategoria: state.subcategoriaProducts,
      selectedSubcategoria: state.selectedSubcategoria,
      clearSelection: state.clearSelection
    }));
  const postsubcategoria = useSubcategoriasStore((state) => state.addSubcategoria);
  const getSubcategorias = useSubcategoriasStore((state) => state.getSubcategorias);
  // Local Hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string | undefined>()
  const [clickOnProperties,setClickOnProperties]= useState(false);
  const filteredSubcategorias =
    banners?.subcategories?.filter((subcategoria) =>
      subcategoria.subcategoryName?.toLowerCase().includes(searchTerm)
    ) || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleClick = async (handleSubcategoria: Subcategory) => {
    //setClickOnProperties(false);
    selectSubcategoria(handleSubcategoria);
    setIdSelected(handleSubcategoria.id)
  };
  const handleClickTune = async (handleSubcategoria: Subcategory) => {
    setClickOnProperties(true);
    console.log('aqui')
    selectSubcategoria(handleSubcategoria);
    setIdSelected(handleSubcategoria.id)
  };
  useEffect(() => {
    clearSelection();
  }, [])
  useEffect(() => {
    console.log("Subcategoria: ", selectedSubcategoria);
    if (idSelected) {
      if (clickOnProperties) {
        router.push(`/categorias/${idCategory}/${idSelected}/properties`);
      } else {
        router.push(`/categorias/${idCategory}/${idSelected}`);
      }
    }
  }, [idSelected]);
  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', px: { xs: 0.5, sm: 1, md: 2 }, pb: 3, boxSizing: 'border-box' }}>
      <AgregarSubCategoriaModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (subCategory) => {
          await postsubcategoria(subCategory, idCategory);
          getSubcategorias(idCategory);
        }}
      />
      <Box sx={{ px: { xs: 0.5, sm: 0 } }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          margin="normal"
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      </Box>
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"end"}
        mb={2}
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
            minHeight: { xs: '36px', sm: '40px' }
          }}
        >
          <AddIcon sx={{ mr: { xs: 0.5, sm: 1 }, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
          Agregar
        </Fab>
      </Box>
      <Box sx={{ px: { xs: 0.5, sm: 0 }, width: '100%' }}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
          <Table sx={{ width: '100%' }} size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Subcategorías</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' } }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubcategorias.map((subcategoria) => (
              <TableRow
                key={subcategoria.id}
                onClick={() => handleClick(subcategoria)}
                style={{ cursor: "pointer" }}
                hover
              >
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  {subcategoria.subcategoryName ?? "Sin nombre"}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' } }}>{subcategoria.id ?? "Sin descripcion"}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleClickTune(subcategoria)
                    }}
                    size="small"
                    sx={{ minWidth: { xs: '32px', sm: '40px' }, p: { xs: 0.5, sm: 1 } }}
                  >
                    <TuneIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Box sx={{ mt: 2, px: { xs: 0.5, sm: 0 } }}>
        <SimplePagination />
      </Box>
    </Box>
  );
};

export default SubcategoriaTable;
