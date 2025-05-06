import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
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
  useTheme
} from "@mui/material";
import { Property, PropertyOption, PropertyPost } from "@/service/properties/interface";
import { GetProductOptionsResponse, Product } from "@/service/productos/interface";

interface AddPropertyToProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  productOptions: GetProductOptionsResponse[];
  options: Property[];
  producto: Product | undefined;
}



const AddPropertyToProductModal: React.FC<AddPropertyToProductModalProps> = ({
  open,
  onClose,
  onSubmit,
  productOptions,
  options,
  producto
}) => {
  //const [file, setFile] = useState<File | null>(null);
  const [localProductOptions, setLocalProductOpcion] = useState(productOptions.map(elselement=>elselement.propertyOptionId));
  const theme = useTheme()
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  const handleSubmit = () => {
    if (  true) {
      
      onClose(); // Close the modal after submitting
    }
  };
  useEffect(()=>{
    setLocalProductOpcion(productOptions.map(elselement=>elselement.propertyOptionId))
  },[
    productOptions
  ])
  const handleChange = (event: SelectChangeEvent<PropertyOption[]>, categoryPropertyId: string) => {
    const {
      target: { value: values },

    } = event;
    if(typeof values != "string"){
    setLocalProductOpcion(
      // On autofill we get a stringified value.
      state => {
      var aux = [...state]
      console.log(values)
      values.forEach(element=>{
        if(!aux.includes(element.id)){
          console.log("hi " + element.id)
          aux.push(element.id)
        }
      })
      aux = aux.filter(element => values.some(value => {
        return value.id == element  })|| options.filter(property=>property.id != categoryPropertyId )?.some(property=>property.options.some(option=>option.id == element)))
      console.log(aux)
      return aux
      }
    );}else{
      
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
function getStyles(name: PropertyOption, personName: readonly PropertyOption[]) {
  
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
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
            p: 4
          }}
        >
          <Typography variant="h6" component="h2">
            Propiedades de {producto?.name ?? 'not selected'}
          </Typography>
          {options.map((element,index)=>(
            <FormControl key={`MultiPropsSelector_${element.id}`} sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">{element.name}</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={element.options.filter((option)=>localProductOptions.some((productOption)=>productOption == option.id))}
              onChange={event =>{
              if(element.options.length >0)
                handleChange(event,element.id)
              }}
              
              input={<OutlinedInput id="select-multiple-chip" label={element.name} />}
              renderValue={(selected) => (
                <Box key={`renderValue${element.id}`}  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip  key={value.id} label={value.text} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {element.options.map((name) => (
                <MenuItem
                
                  key={name.id}
                  value={name}
                  style={getStyles(name, element.options.filter((option)=>localProductOptions.some((productOption)=>productOption == option.id)))}
                >
                  {name.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          ))}
          

          {/* <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Seleccionar archivo
            <input
              type={"file"}
              hidden
              accept={accept}
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {file.name}
            </Typography>
          )} */}
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
