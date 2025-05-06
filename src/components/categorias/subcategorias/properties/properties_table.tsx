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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import useProductsStore from "@/service/productos/store";
import { Product } from "@/service/productos/interface";
import AgregarPropertyModal from "./add_property";
import UpdatePropertieModal from "./update_property";
import usePropertyStore from "@/service/properties/store";
import { Property } from "@/service/properties/interface";
import AgregarPropertyObjectModal from "./add_property_object";
const PropertiesTable = ({
  idSubcategory
}: {
  idSubcategory: string
}) => {
  // Router
  const router = useRouter();

  // Zustand Hooks
  const propeties = usePropertyStore(state => state.properties);
  const propertyOptions = usePropertyStore(state => state.options);
  const [property,setProperty] = useState<Property|undefined>();
  //Zustand functions
  const getSubcategoria = usePropertyStore(state => state.fetchSubcategoryProperties);
  const addProduct = usePropertyStore(state => state.createProperty);
  const addOption = usePropertyStore(state => state.addOption);
  
  const updateProducto = usePropertyStore(state => state.updateProperty);
  
  
  const fetchPropertyOptions = usePropertyStore(state => state.fetchPropertyOptions);
  const flushPropertyOptions = usePropertyStore(state => state.flushPropertyOptions);
  // const postProduct = useProductsStore((state) => state.);
  // Local Hooks
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddPropertyObjectModal, setOpenAddPropertyModal] = useState<string|undefined>(undefined);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageModal, setImageModal] = useState("");
  const [productSelected, setProductSelected] = useState<string | undefined>();

  const filteredSubcategorias =
    propeties?.filter((subcategoria) =>
      subcategoria.name?.toLowerCase().includes(searchTerm)
    ) || [];

  
  const handleEditProduct = (product: Property) => {
    
    setProperty(product);
  }
  const handleAddProperyOption = (product: Property) => {
    
    setOpenAddPropertyModal(product.id);
  }
  const handleClick = async (handleSubcategoria: Property) => {
    // await getSubcategoria(handleSubcategoria.id);
    // selectSubcategoria(handleSubcategoria);

  };
 
  
  useEffect(() => {
    if (property) {
      fetchPropertyOptions(property.id)

    }else{
      flushPropertyOptions()
    }
    setProperty(property);
  }, [property])

  useEffect(() => {
  getSubcategoria(idSubcategory)
  }, [])
  return (
    <Box>
      <AgregarPropertyModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={async (postProduct) => {
          await addProduct(idSubcategory,postProduct.name);
          getSubcategoria(idSubcategory);
        }} accept={"image/*"} subcategoryId={idSubcategory} />
      <AgregarPropertyObjectModal
        open={openAddPropertyObjectModal != undefined}
        onClose={() => setOpenAddPropertyModal(undefined)}
        onSubmit={async (data) => {
          await addOption(openAddPropertyObjectModal??'',data);
          getSubcategoria(idSubcategory);
        }} accept={"image/*"} subcategoryId={idSubcategory} />
      <UpdatePropertieModal
        onClose={() => {
          setOpenUpdateModal(false)
          setProperty(undefined);
        }}
        onSubmit={async (postProduct) => {
          await updateProducto(postProduct.id,{
            subcategoryId: postProduct.subcategoryId,
            name: postProduct.name
          });
          getSubcategoria(idSubcategory);
        }} accept={"image/*"} subcategoryId={idSubcategory} product={property} />
      
     
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
              <TableCell>Propiedades</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>acciones</TableCell>
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
                    onClick={() => handleAddProperyOption(product)}
                  >
                    <PlaylistAddIcon />
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => handleEditProduct(product)}
                  >
                    <RemoveRedEyeIcon />
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box height={"20px"} />
      

    </Box>
  );
};

export default PropertiesTable;
