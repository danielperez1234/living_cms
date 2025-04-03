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
import { useRouter } from "next/navigation";
import useSubcategoriasStore from "@/service/subcategorias/store";

import ImageIcon from "@mui/icons-material/Image";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import useProductsStore from "@/service/productos/store";
import { Product } from "@/service/productos/interface";
import AgregarProductModal from "./add_product";
import ProductImageModal from "./product_image";
import UpdateProductModal from "./update_product";
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
  //Zustand functions
  const getSubcategoria = useSubcategoriasStore(state => state.getSubcategoriaProducts);
  const addProduct = useProductsStore(state => state.postProduct);
  const getProduct = useProductsStore(state => state.getProduct);
  const updateProducto = useProductsStore(state => state.putProduct);
  const getProductImages = useProductsStore(state => state.getProductImages);
  // const postProduct = useProductsStore((state) => state.);
  // Local Hooks
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
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
    setOpenUpdateModal(true);
    setSelectedProduct(producto);
  }, [producto])
  return (
    <Box>
      <AgregarProductModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (postProduct) => {
          await addProduct(postProduct);
          getSubcategoria(idSubcategory, page);
        }} accept={"image/*"} subcategoryId={idSubcategory} />
      <UpdateProductModal
        open={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false)
          setSelectedProduct(undefined);
        }}
        onSubmit={async (postProduct) => {
          await updateProducto(postProduct);
          getSubcategoria(idSubcategory, page);
        }} accept={"image/*"} subcategoryId={idSubcategory} product={selectedProduct} />
      <ProductImageModal
        id={productSelected ?? ''}
        images={productImages ?? []}
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        file={imageModal}
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
            {filteredSubcategorias.map((product) => (
              <TableRow
                key={product.id}
                onClick={() => handleClick(product)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  {product.name ?? "Sin nombre"}
                </TableCell>
                <TableCell>{product.id ?? "Sin descripcion"}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      setImageModal(product.imageUrlOriginal ?? "");
                      setOpenImageModal(true);
                      setProductSelected(product.id)
                      getProductImages(product.id);
                    }}
                  >
                    <ImageIcon />
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => handleEditProduct(product)}
                  >
                    <EditIcon />
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box height={"20px"} />
      <SimplePagination onChange={(page) => setPage(page)} />

    </Box>
  );
};

export default ProductsTable;
