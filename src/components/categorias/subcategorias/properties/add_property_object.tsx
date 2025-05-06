import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  Fade
} from "@mui/material";
import { PropertyPost } from "@/service/properties/interface";

interface AddPropertyObjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { text: string; imageFile?: File }) => void;
  accept: string;
  subcategoryId: string;
}



const AgregarPropertyObjectModal: React.FC<AddPropertyObjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  accept, subcategoryId
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [name, setAssetName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (  name != "" ) {
      onSubmit({
        text: name,
        imageFile: file,
      });
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
            Agregar Propiedad
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
          

          <Button
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
          )}
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

export default AgregarPropertyObjectModal;
