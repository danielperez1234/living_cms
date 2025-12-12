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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import useProductsStore from "@/service/productos/store";
import { Product } from "@/service/productos/interface";
import AgregarPropertyModal from "./add_property";
import UpdatePropertieModal from "./update_property";
import usePropertyStore from "@/service/properties/store";
import { Property } from "@/service/properties/interface";
import AgregarPropertyObjectModal from "./add_property_object";
import { useSnackbar } from "@/components/common/snackbar_provider";
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
  const createResponse = usePropertyStore(state => state.createResponse);
  const updateResponse = usePropertyStore(state => state.updateResponse);
  const deleteResponse = usePropertyStore(state => state.deleteResponse);
  const addOptionResponse = usePropertyStore(state => state.addOptionResponse);
  const error = usePropertyStore(state => state.error);
  const [property,setProperty] = useState<Property|undefined>();
  //Zustand functions
  const getSubcategoria = usePropertyStore(state => state.fetchSubcategoryProperties);
  const deletePropertyFunc = usePropertyStore(state => state.deleteProperty);
  const fetchPropertyOptions = usePropertyStore(state => state.fetchPropertyOptions);
  const flushPropertyOptions = usePropertyStore(state => state.flushPropertyOptions);
  const clearResponses = usePropertyStore(state => state.clearResponses);

  // Snackbar
  const { showSnackbar } = useSnackbar();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle create response
  useEffect(() => {
    if (createResponse) {
      showSnackbar(createResponse, "success");
      getSubcategoria(idSubcategory);
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createResponse]);

  // Handle update response
  useEffect(() => {
    if (updateResponse) {
      showSnackbar(updateResponse, "success");
      getSubcategoria(idSubcategory);
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

  // Handle add option response
  useEffect(() => {
    if (addOptionResponse) {
      showSnackbar(addOptionResponse, "success");
      getSubcategoria(idSubcategory);
      clearResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOptionResponse]);

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
      <AgregarPropertyModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        subcategoryId={idSubcategory} />
      <AgregarPropertyObjectModal
        open={openAddPropertyObjectModal != undefined}
        onClose={() => setOpenAddPropertyModal(undefined)}
        propertyId={openAddPropertyObjectModal ?? ''} />
      <UpdatePropertieModal
        onClose={() => {
          setOpenUpdateModal(false)
          setProperty(undefined);
        }}
        product={property} />
      
     
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
              <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Propiedades</TableCell>
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
                    <Tooltip title="Agregar opción">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddProperyOption(product);
                        }}
                        color="success"
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 0.75 } }}
                      >
                        <PlaylistAddIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver detalles">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product);
                        }}
                        color="info"
                        size="small"
                        sx={{ p: { xs: 0.5, sm: 0.75 } }}
                      >
                        <RemoveRedEyeIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (window.confirm(`¿Estás seguro de eliminar la propiedad "${product.name}"?`)) {
                            await deletePropertyFunc(product.id);
                            getSubcategoria(idSubcategory);
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
    </Box>
  );
};

export default PropertiesTable;
