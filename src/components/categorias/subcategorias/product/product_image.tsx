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
import Image from "next/image";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import useProductsStore from "@/service/productos/store";
interface AddAssetModalProps {
  open: boolean;
  onClose: () => void;
  file: string;
  images: string[],
  id:string
}

const ProductImageModal: React.FC<AddAssetModalProps> = ({
  open,
  onClose,
  file,
  images,
  id
}) => {
  const [newFile, setNewFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewFile(event.target.files[0]);
    }
  };

  const 
  imageList:string[]= []
  //Zustand Functions
  const postProductImage = useProductsStore(state=>state.postProductImage);
  const getProductImages = useProductsStore(state=>state.getProductImages);
  const handlePostProduct = async ()=>{
    if(newFile){
      await postProductImage(id,newFile);
      getProductImages(id);
      setNewFile(null);
    } 
  }
  useEffect(()=>{
    handlePostProduct()
  },[newFile])
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
            width: "60%",
            height: "80%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            objectFit: "contain",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Box
            sx={{
              height: "60%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              src={file}
              alt={"banner_image"}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                alignSelf: "center"
              }}
            />
          </Box>
          <Box
            sx={{
              height: "40%",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {[0,1,2].map((e,i)=>(<Box
            key={`imagen_deProducto_${i}`}
              sx={{
                height: "100%",
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}  
            >
              {images[e] ? <img
                src={images[e]}
                alt={"banner_image"}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  alignSelf: "center"
                }}
              />:
              <Button
            variant="text"
            component="label"
            sx={{ mt: 2 }}
          >
            <AddPhotoAlternateIcon fontSize="large"/>
            <input
              type={"file"}
              hidden
              accept={"image/*"}
              onChange={handleFileChange}
            />
          </Button>}
            </Box>)) 
            }
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductImageModal;
