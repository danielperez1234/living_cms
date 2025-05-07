import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Chip,
  useTheme,
  Theme // Importa Theme para usarlo en getStyles
} from "@mui/material";
import { Property, PropertyOption } from "@/service/properties/interface"; // Asumo que PropertyOption tiene { id: string; text: string; ... }
import { GetProductOptionsResponse, Product } from "@/service/productos/interface";
import useProductsStore from "@/service/productos/store";

interface AddPropertyToProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void; // Esta función se llama desde handleSubmit pero no se usa su retorno.
  productOptions: GetProductOptionsResponse[]; // Opciones actualmente asociadas al producto
  options: Property[]; // Todas las propiedades disponibles y sus opciones
  producto: Product | undefined;
}

// Helper function para los estilos del MenuItem
function getStyles(
  optionId: string, // Ahora recibe el ID de la opción
  selectedIdsInCurrentCategory: readonly string[], // IDs seleccionados para la categoría actual
  theme: Theme
) {
  return {
    fontWeight: selectedIdsInCurrentCategory.includes(optionId)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const AddPropertyToProductModal: React.FC<AddPropertyToProductModalProps> = ({
  open,
  onClose,
  onSubmit: onSubmitProp, // Renombrar para evitar confusión con el handleSubmit local
  productOptions,
  options,
  producto
}) => {
  const theme = useTheme();
  // localProductOptions almacenará los IDs de las PropertyOption seleccionadas
  const [localProductOptions, setLocalProductOptions] = useState<string[]>(() =>
    productOptions.map(el => el.propertyOptionId)
  );

  const postProductOption = useProductsStore(state => state.postProductOption);
  const deleteProductOption = useProductsStore(state => state.deleteProductOption);

  useEffect(() => {
    // Sincroniza localProductOptions si productOptions cambia desde fuera
    setLocalProductOptions(productOptions.map(el => el.propertyOptionId));
  }, [productOptions]);

  const handleChange = (
    event: SelectChangeEvent<string[]>, // El valor será un array de strings (IDs)
    categoryPropertyId: string // El ID de la Property (categoría) que cambió
  ) => {
    const {
      target: { value: newlySelectedIdsInThisCategory }, // IDs seleccionados AHORA para ESTA categoría
    } = event;

    setLocalProductOptions(currentOverallSelectedIds => {
      // 1. Filtra los IDs que NO pertenecen a la categoría que acaba de cambiar.
      // Estos son los IDs seleccionados de OTRAS categorías, que deben conservarse.
      const idsFromOtherCategories = currentOverallSelectedIds.filter(id => {
        const currentCategory = options.find(prop => prop.id === categoryPropertyId);
        if (currentCategory && currentCategory.options.some(opt => opt.id === id)) {
          return false; // Pertenece a la categoría actual, se gestionará con `newlySelectedIdsInThisCategory`
        }
        return true; // Pertenece a otra categoría o no es una opción válida (debería conservarse si ya estaba)
      });

      // 2. Combina los IDs conservados de otras categorías con los NUEVOS IDs seleccionados de la categoría actual.
      const updatedOverallSelectedIds = [
        ...idsFromOtherCategories,
         ...(typeof newlySelectedIdsInThisCategory == "string"? [newlySelectedIdsInThisCategory]:newlySelectedIdsInThisCategory),
      ];
      
      // Devuelve el nuevo array de todos los IDs seleccionados, sin duplicados.
      return [...updatedOverallSelectedIds];
    });
  };

  const handleSubmit = () => {
    if (producto?.id) {
      const initialSelectedOptionIds = productOptions.map(po => po.propertyOptionId);
      const currentSelectedOptionIds = localProductOptions;

      // Opciones a eliminar: estaban inicialmente pero ya no están
      productOptions.forEach(originalProductOption => {
        if (!currentSelectedOptionIds.includes(originalProductOption.propertyOptionId)) {
          deleteProductOption({
            productId: producto.id,
            optionId: originalProductOption.id, // ID de la relación ProductOption
          });
        }
      });

      // Opciones a agregar: no estaban inicialmente pero ahora sí
      currentSelectedOptionIds.forEach(localOptionId => {
        if (!initialSelectedOptionIds.includes(localOptionId)) {
          postProductOption({
            productId: producto.id,
            propertyOptionId: localOptionId, // ID de PropertyOption
          });
        }
      });
      onSubmitProp(); // Llama a la prop onSubmit original
      onClose(); // Cierra el modal
    } else {
      console.error("Producto no definido, no se pueden guardar los cambios.");
      // Opcionalmente, mostrar un error al usuario
      onClose(); // Cierra incluso si hay error para no dejar el modal abierto
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh', // Para evitar que el modal sea muy largo
            overflowY: 'auto'  // Scroll si el contenido excede
          }}
        >
          <Typography variant="h6" component="h2">
            Propiedades de {producto?.name ?? 'producto no seleccionado'}
          </Typography>

          {options.map((propertyElement) => { // Renombrado 'element' a 'propertyElement' para claridad
            // IDs seleccionados específicamente para ESTA categoría (propertyElement)
            // a partir del estado general localProductOptions.
            const selectedIdsForThisCategory = localProductOptions.filter(selectedId =>
              propertyElement.options.some(opt => opt.id === selectedId)
            );

            return (
              <FormControl key={`MultiPropsSelector_${propertyElement.id}`} sx={{ m: 1, width: '90%' /* Ajustado para mejor layout */ }}>
                <InputLabel id={`label-${propertyElement.id}`}>{propertyElement.name}</InputLabel>
                <Select
                  labelId={`label-${propertyElement.id}`}
                  id={`select-${propertyElement.id}`}
                  multiple
                  value={selectedIdsForThisCategory} // CORRECTO: Array de IDs (strings)
                  onChange={(event) => {
                    // El event.target.value ya será string[]
                    // Hacemos un cast para asegurar el tipo con TypeScript
                    const castEvent = event as SelectChangeEvent<string[]>;
                    if (propertyElement.options.length > 0) {
                      handleChange(castEvent, propertyElement.id);
                    }
                  }}
                  input={<OutlinedInput id={`outlined-input-${propertyElement.id}`} label={propertyElement.name} />}
                  renderValue={(selected) => ( // `selected` es string[] (los selectedIdsForThisCategory)
                    <Box key={`renderValueChips_${propertyElement.id}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => { // `id` es un string
                        const optionObject = propertyElement.options.find(opt => opt.id === id);
                        return optionObject ? <Chip key={id} label={optionObject.text} /> : null;
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {propertyElement.options.map((option) => ( // `option` es una PropertyOption
                    <MenuItem
                      key={option.id}
                      value={option.id} // CORRECTO: Se pasa el ID (string/number) de la opción
                      style={getStyles(option.id, selectedIdsForThisCategory, theme)}
                    >
                      {option.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          })}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddPropertyToProductModal;