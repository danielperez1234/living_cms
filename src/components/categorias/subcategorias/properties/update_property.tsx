import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  Fade
} from "@mui/material";
import { Property, PropertyPut } from "@/service/properties/interface";
import { ProductPut } from "@/service/productos/interface";
import usePropertyStore from "@/service/properties/store";
import Image from "next/image";

interface UpdatePropertieModalProps {
  onClose: () => void;
  onSubmit: (data: PropertyPut) => void;
  product: Property | undefined;
  accept: string;
  subcategoryId: string;
}



const UpdatePropertieModal: React.FC<UpdatePropertieModalProps> = ({
  onClose,
  onSubmit,
  product,
  accept, subcategoryId
}) => {
  //zustand
  const { options: propertyOptions } = usePropertyStore(state => state)
  const [name, setAssetName] = useState<string>("");


  const handleClosing = () => {

    onClose();
  }

  useEffect(() => {
    if (product) {
      setAssetName(product.name)
    }
  }, [product])
  return (
    <Modal
      open={propertyOptions != undefined}
      onClose={handleClosing}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={propertyOptions != undefined}>
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
            Modificar Propiedad {name}
          </Typography>
          {propertyOptions?.map((element, key) =>
          <Box key={`propertyOption_${key}`} sx={{flexDirection:'row', padding:'10px',display:'flex' ,alignItems:'center',justifyContent:'start'}}>
            {element.image != undefined ?
              <Image src={element.image} alt={`propertyOption_${key}`} width={50} height={50} style={{objectFit:'cover', borderRadius:25}}/>
              : <Box width={50} height={50}/>
            }
            <Typography  variant="body1" sx={{marginLeft:'20px'}}>
              {element.text}
            </Typography>
          </Box>
          )}

          
{/*           
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            Modificar
          </Button> */}
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdatePropertieModal;
