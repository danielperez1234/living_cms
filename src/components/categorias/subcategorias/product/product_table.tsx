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
import { Subcategoria, Subcategory, SubcategoryProducts } from "@/service/subcategorias/interface";
import { useRouter } from "next/navigation";
import useSubcategoriasStore from "@/service/subcategorias/store";
import useCategoriasStore from "@/service/categorias/store";

import AddIcon from "@mui/icons-material/Add";
import AgregarProductModal from "./add_product";
import useProductsStore from "@/service/productos/store";
import { Product } from "@/service/productos/interface";
const ProductsTable = ({
  idSubcategory
}: {
  idSubcategory:string
}) => {
  // Router
  const router = useRouter();

  // Zustand Hooks
  const banners = useSubcategoriasStore(state=>state.subcategoriaProducts);
  //Zustand functions
  const getSubcategoria = useSubcategoriasStore(state=>state.getSubcategoriaProducts);
    // const postProduct = useProductsStore((state) => state.);
  // Local Hooks
  const [page,setPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const filteredSubcategorias =
    banners?.datosPaginados.subcategoryProductDtos?.filter((subcategoria) =>
      subcategoria.name?.toLowerCase().includes(searchTerm)
    ) || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleClick = async (handleSubcategoria: Product) => {
    // await getSubcategoria(handleSubcategoria.id);
    // selectSubcategoria(handleSubcategoria);
    
  };
  const getPages = async ()=>{
    const newPage = await getSubcategoria(idSubcategory,page);
    setPage(newPage);
  }
  
  return (
    <Box>
      <AgregarProductModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (subCategory) => {
          //await postsubcategoria(subCategory,idCategory);
          getPages();
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
                  {subcategoria.name ?? "Sin nombre"}
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

export default ProductsTable;
