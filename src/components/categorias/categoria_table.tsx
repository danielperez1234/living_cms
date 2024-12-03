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
  Button,
  Fab,
} from "@mui/material";
//Icons
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SimplePagination from "../common/paginado";
import { Categoria } from "@/service/categorias/interface";
import useCategoriasStore from "@/service/categorias/store";
import { useRouter } from "next/navigation";
import AgregarCategoriaModal from "./add_category";
import UpdateCategoriaModal from "./update_categoria";
import { UpdateCategoria } from "@/service/categorias/service";

const CategoriaTable = ({
  categorias: banners,
}: {
  categorias: Categoria[];
}) => {
  // Router
  const router = useRouter();

  // zustandHooks
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const selectCategoria = useCategoriasStore((state) => state.selectCategoria);
  const postcategoria = useCategoriasStore((state) => state.addCategoria);
  const deleteCategoria = useCategoriasStore((state) => state.deleteCategoria);

  // local hooks
  const [searchTerm, setSearchTerm] = React.useState("");
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredBanners = banners.filter((categoria) =>
    categoria.categoryName?.toLowerCase().includes(searchTerm)
  );
  const handleClick = (categoria: Categoria) => {
    selectCategoria(categoria);
    router.push(`/categorias/${categoria.id}`);
  };

  return (
    <Box>
      <AgregarCategoriaModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (category) => {
          await postcategoria(category);
          getCategorias();
        }}
      />
      <UpdateCategoriaModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onSubmit={async (asset) => {
          if (asset) {
            await UpdateCategoria({
              name: asset.categoryName,
              ...asset,
            });
          }
          getCategorias();
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
              <TableCell>Categorías</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanners.map((categoria) => (
              <TableRow
                key={categoria.id}
                onClick={() => {
                  handleClick(categoria);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{categoria.categoryName ?? "Sin nombre"}</TableCell>
                <TableCell>{categoria.id ?? "Sin descripcion"}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={async (event) => {
                      event.stopPropagation();
                      selectCategoria(categoria);
                      setOpenUpdateModal(true);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button variant="text" onClick={async (event) => {
                    event.stopPropagation();
                    await deleteCategoria(categoria.id);
                    getCategorias();
                  }}>
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

export default CategoriaTable;
