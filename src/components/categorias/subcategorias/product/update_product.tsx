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
import { Product, ProductPost, ProductPut } from "@/service/productos/interface";

interface UpdateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductPut) => void;
  product: Product | undefined;
  accept: string;
  subcategoryId: string;
}



const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  open,
  onClose,
  onSubmit,
  product,
  accept, subcategoryId
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [name, setAssetName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [wholesalePrice, setWholesalePrice] = useState<string>("0");
  const [maxOrder, setMaxOrder] = useState<string>("0");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const handleClosing = () => {

    onClose();
    setAssetName('');
    setDescription('');
    setPrice('0');
    setMaxOrder('0');
    setWholesalePrice('0');
    setFile(undefined);
  }
  const handleSubmit = () => {
    console.log("jijija")
    if (name != "" && price != "" && wholesalePrice != "" && maxOrder != "") {
      onSubmit({
        id: product?.id ?? '',
        image: file,
        name: name,
        price: price,
        maxOrder: maxOrder,
        subcategoryId: subcategoryId,
        wholesalePrice: wholesalePrice,
        description:description
      });
      handleClosing(); // Close the modal after submitting

    }
  };
  useEffect(() => {
    if (product) {
      setAssetName(product.name),
      setDescription(product.description??''),
        setPrice(product.price.toString())
      setMaxOrder(product.maxOrder.toString())
      setWholesalePrice(product.wholesalePrice.toString())
    }
  }, [product])
  return (
    <Modal
      open={open}
      onClose={handleClosing}
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
            Agregar banner
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={name}
            onChange={(e) => setAssetName(e.target.value)}
            margin="normal"
            variant="outlined"
            inputProps={{
              maxLength: 30
            }}
          />
          <TextField
            fullWidth
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            inputProps={{
              maxLength: 300
            }}
            rows={4}
          />
          <TextField
            fullWidth
            label="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{

              maxLength: 100
            }}
            rows={4}
          />
          <TextField
            fullWidth
            label="Precio de Mayoreo"
            value={wholesalePrice}
            onChange={(e) => setWholesalePrice(e.target.value)}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{

              maxLength: 100
            }}
            rows={4}
          />
          <TextField
            fullWidth
            label="Orden máxima"
            value={maxOrder}
            onChange={(e) => setMaxOrder(e.target.value)}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{

              maxLength: 100
            }}
            rows={4}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Seleccionar archivo {' (opcional)'}
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
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            Modificar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateProductModal;
