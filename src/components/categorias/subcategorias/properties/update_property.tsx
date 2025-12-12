import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  Fade
} from "@mui/material";
import { Property } from "@/service/properties/interface";
import usePropertyStore from "@/service/properties/store";
import Image from "next/image";

interface UpdatePropertieModalProps {
  onClose: () => void;
  product: Property | undefined;
}

const UpdatePropertieModal: React.FC<UpdatePropertieModalProps> = ({
  onClose,
  product
}) => {
  //zustand
  const { options: propertyOptions } = usePropertyStore(state => state)
  const [name, setAssetName] = useState<string>("");

  useEffect(() => {
    if (product) {
      setAssetName(product.name)
    }
  }, [product])
  return (
    <Modal
      open={propertyOptions != undefined}
      onClose={onClose}
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
            width: { xs: '90vw', sm: '500px', md: '600px' },
            maxWidth: '95vw',
            maxHeight: { xs: '90vh', sm: '95vh' },
            overflow: 'auto',
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Opciones de: {name}
          </Typography>
          {propertyOptions && propertyOptions.length > 0 ? (
            propertyOptions.map((element, key) =>
              <Box key={`propertyOption_${key}`} sx={{flexDirection:'row', padding:'10px',display:'flex' ,alignItems:'center',justifyContent:'start'}}>
                {element.image ? (
                  <Image src={element.image} alt={`propertyOption_${key}`} width={50} height={50} style={{objectFit:'cover', borderRadius:25}}/>
                ) : (
                  <Box width={50} height={50} sx={{ bgcolor: 'grey.200', borderRadius: '25px' }}/>
                )}
                <Typography  variant="body1" sx={{marginLeft:'20px'}}>
                  {element.text}
                </Typography>
              </Box>
            )
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              No hay opciones disponibles
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdatePropertieModal;
