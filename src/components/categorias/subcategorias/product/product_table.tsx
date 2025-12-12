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
  IconButton,
  Tooltip,
} from "@mui/material";
import SimplePagination from "@/components/common/paginado";
import { useRouter } from "next/navigation";
import useSubcategoriasStore from "@/service/subcategorias/store";

import ImageIcon from "@mui/icons-material/Image";
import TuneIcon from '@mui/icons-material/Tune';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useProductsStore from "@/service/productos/store";
import { Product } from "@/service/productos/interface";
import AgregarProductModal from "./add_product";
import ProductImageModal from "./product_image";
import UpdateProductModal from "./update_product";
import AddPropertyToProductModal from "./add_property_to_product";
import usePropertyStore from "@/service/properties/store";
import { useSnackbar } from "@/components/common/snackbar_provider";

const ProductsTable = ({
  idSubcategory
}: {
  idSubcategory: string
}) => {
  // Router
  const router = useRouter();

  // Zustand Hooks
  const banners = useSubcategoriasStore(state => state.subcategoriaProducts);
  const productImages = useProductsStore(state => state.productImages);
  const producto = useProductsStore(state => state.producto);
  const productOptionsResponse = useProductsStore(state => state.productOptionsResponse);
  const propeties = usePropertyStore(state => state.properties);
  const createResponse = useProductsStore(state => state.createResponse);
  const updateResponse = useProductsStore(state => state.updateResponse);
  const deleteResponse = useProductsStore(state => state.deleteResponse);
  const error = useProductsStore(state => state.error);

  //Zustand functions
  const getSubcategoria = useSubcategoriasStore(state => state.getSubcategoriaProducts);
  const addProduct = useProductsStore(state => state.postProduct);
  const getProduct = useProductsStore(state => state.getProduct);
  const getProductOptions = useProductsStore(state => state.getProductOptions);
  const updateProducto = useProductsStore(state => state.putProduct);
  const deleteProductFunc = useProductsStore(state => state.deleteProduct);
  const getProductImages = useProductsStore(state => state.getProductImages);
  const clearResponses = useProductsStore(state => state.clearResponses);

  // Snackbar
  const { showSnackbar } = useSnackbar();
  // const postProduct = useProductsStore((state) => state.);
  // Local Hooks
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddPropertyToProductModal, setOpenAddPropertyToProductModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageModal, setImageModal] = useState("");
  const [productSelected, setProductSelected] = useState<string | undefined>();

  const filteredSubcategorias =
    banners?.datosPaginados.subcategoryProductDtos?.filter((subcategoria) =>
      subcategoria.name?.toLowerCase().includes(searchTerm)
    ) || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const handleEditProduct = (product: Product) => {

    getProduct(product.id);
  }
  const handleClickTune = (product: Product) => {
    setSelectedProduct(product)
    getProductOptions(product.id);
  }
  
  const handleClick = async (handleSubcategoria: Product) => {
    // await getSubcategoria(handleSubcategoria.id);
    // selectSubcategoria(handleSubcategoria);

  };
  const getPages = async () => {
    const newPage = await getSubcategoria(idSubcategory, page);

  }
  useEffect(() => {
    getPages();
  }, [page])
  useEffect(() => {
    if (producto) {
      setOpenUpdateModal(true);

    }
    setSelectedProduct(producto);
  }, [producto])
  useEffect(() => {
    if (productOptionsResponse) {
      setOpenAddPropertyToProductModal(true);

    }
  }, [productOptionsResponse])

  // Handle create response
  useEffect(() => {
    if (createResponse) {
      showSnackbar(createResponse, "success");
      getSubcategoria(idSubcategory, page);
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createResponse]);

  // Handle update response
  useEffect(() => {
    if (updateResponse) {
      showSnackbar(updateResponse, "success");
      getSubcategoria(idSubcategory, page);
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateResponse]);

  // Handle delete response
  useEffect(() => {
    if (deleteResponse) {
      showSnackbar(deleteResponse, "success");
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteResponse]);

  // Handle errors
  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', px: { xs: 0.5, sm: 1, md: 2 }, pb: 3, boxSizing: 'border-box' }}>
      <AddPropertyToProductModal
        open={openAddPropertyToProductModal && selectedProduct != undefined}
        onClose={() => setOpenAddPropertyToProductModal(false)} onSubmit={function (): void {} } productOptions={productOptionsResponse ?? []} options={propeties} producto={selectedProduct}         />
      <AgregarProductModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        subcategoryId={idSubcategory} />
      <UpdateProductModal
        open={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false)
          setSelectedProduct(undefined);
        }}
        subcategoryId={idSubcategory}
        product={selectedProduct} />
      <ProductImageModal
        id={productSelected ?? ''}
        images={productImages ?? []}
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        file={imageModal}
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
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Productos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' } }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubcategorias.map((product) => (
              <TableRow
                key={product.id}
                onClick={() => handleClick(product)}
                style={{ cursor: "pointer" }}
                hover
              >
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  {product.name ?? "Sin nombre"}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' } }}>{product.id ?? "Sin descripcion"}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, justifyContent: 'center', flexWrap: 'nowrap' }}>
                    <Tooltip title="Ver imágenes">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageModal(product.imageUrlOriginal ?? "");
                          setOpenImageModal(true);
                          setProductSelected(product.id)
                          getProductImages(product.id);
                        }}
                        color="info"
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 0.75 } }}
                      >
                        <ImageIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product);
                        }}
                        color="primary"
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 0.75 } }}
                      >
                        <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Propiedades">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickTune(product);
                        }}
                        color="secondary"
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 0.75 } }}
                      >
                        <TuneIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (window.confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`)) {
                            await deleteProductFunc(product.id);
                            getSubcategoria(idSubcategory, page);
                          }
                        }}
                        color="error"
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 0.75 } }}
                      >
                        <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Box sx={{ mt: 2, px: { xs: 0.5, sm: 0 } }}>
        <SimplePagination onChange={(page) => setPage(page)} />
      </Box>
    </Box>
  );
};

export default ProductsTable;
