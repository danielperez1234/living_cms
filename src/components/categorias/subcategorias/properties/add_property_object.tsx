import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  Fade,
  Alert,
  CircularProgress
} from "@mui/material";
import usePropertyStore from "@/service/properties/store";

interface AddPropertyObjectModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: string;
}

const AgregarPropertyObjectModal: React.FC<AddPropertyObjectModalProps> = ({
  open,
  onClose,
  propertyId
}) => {
  const { addOption, loading, addOptionResponse, error: storeError } = usePropertyStore();

  const [file, setFile] = useState<File | undefined>();
  const [name, setAssetName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Close modal when add option is successful
  useEffect(() => {
    if (addOptionResponse && open) {
      setAssetName("");
      setFile(undefined);
      onClose();
    }
  }, [addOptionResponse, open, onClose]);

  // Show backend errors
  useEffect(() => {
    if (storeError && open) {
      setError(storeError);
    }
  }, [storeError, open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError("El nombre de la opción es obligatorio");
      return;
    }

    setError(null);
    addOption(propertyId, {
      text: name,
      imageFile: file,
    });
    // El modal se cerrará automáticamente cuando addOptionResponse cambie
  };

  const handleClose = () => {
    if (!loading) {
      setAssetName("");
      setFile(undefined);
      setError(null);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            Agregar Opción
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Nombre"
            value={name}
            onChange={(e) => setAssetName(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            disabled={loading}
            inputProps={{
              maxLength: 30
            }}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Seleccionar imagen (opcional)
            <input
              type={"file"}
              hidden
              accept={"image/*"}
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Archivo seleccionado: {file.name}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{ mt: 2 }}
          >
            {loading ? "Guardando..." : "Agregar"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AgregarPropertyObjectModal;
