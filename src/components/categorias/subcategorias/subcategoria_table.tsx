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
    <Box>
      <AgregarSubCategoriaModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (subCategory) => {
          await postsubcategoria(subCategory, idCategory);
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
                <TableCell>
                  
                  <Button
                    variant="text"
                    onClick={() => {
                      handleClickTune(subcategoria)
                    }}
                  >
                    <TuneIcon />
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

export default SubcategoriaTable;
