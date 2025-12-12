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
    <Box sx={{ width: '100%', maxWidth: '100vw', px: { xs: 0.5, sm: 1, md: 2 }, pb: 3, boxSizing: 'border-box' }}>
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
      <Box sx={{ px: { xs: 0.5, sm: 0 } }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearchChange}
          size="small"
          sx={{ mb: 2, width: '100%' }}
        />
      </Box>
      <Box
        display={"flex"}
        width={"-webkit-fill-available"}
        justifyContent={"end"}
        mb={2}
        mt={{ xs: 1, sm: 2 }}
        px={{ xs: 0.5, sm: 0 }}
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
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Categorías</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' } }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Acciones</TableCell>
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
                hover
              >
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{categoria.categoryName ?? "Sin nombre"}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' } }}>{categoria.id ?? "Sin descripcion"}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
                    <Button
                      variant="text"
                      onClick={async (event) => {
                        event.stopPropagation();
                        selectCategoria(categoria);
                        setOpenUpdateModal(true);
                      }}
                      size="small"
                      sx={{ minWidth: { xs: '32px', sm: '40px' }, p: { xs: 0.5, sm: 1 } }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button 
                      variant="text" 
                      onClick={async (event) => {
                        event.stopPropagation();
                        await deleteCategoria(categoria.id);
                        getCategorias();
                      }}
                      size="small"
                      sx={{ minWidth: { xs: '32px', sm: '40px' }, p: { xs: 0.5, sm: 1 } }}
                    >
                      <DeleteIcon color="error" fontSize="small" />
                    </Button>
                  </Box>
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

export default CategoriaTable;
