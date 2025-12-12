import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  Fade,
} from "@mui/material";

interface AddAssetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
}

const AgregarCategoriaModal: React.FC<AddAssetModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSubmit = () => {
    console.log("Category name: ", categoryName);
    if (categoryName != "") {
      onSubmit(categoryName);
      onClose(); // Close the modal after submitting
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
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
          <Typography variant="h6" component="h2">
            Agregar Categoria
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 30 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            Agregar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
export default AgregarCategoriaModal;
