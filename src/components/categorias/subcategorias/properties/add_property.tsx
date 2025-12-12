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

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  subcategoryId: string;
}

const AgregarPropertyModal: React.FC<AddPropertyModalProps> = ({
  open,
  onClose,
  subcategoryId
}) => {
  const { createProperty, loading, createResponse, error: storeError } = usePropertyStore();

  const [name, setAssetName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Close modal when create is successful
  useEffect(() => {
    if (createResponse && open) {
      setAssetName("");
      onClose();
    }
  }, [createResponse, open, onClose]);

  // Show backend errors
  useEffect(() => {
    if (storeError && open) {
      setError(storeError);
    }
  }, [storeError, open]);

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError("El nombre de la propiedad es obligatorio");
      return;
    }

    setError(null);
    createProperty(subcategoryId, name);
    // El modal se cerrará automáticamente cuando createResponse cambie
  };

  const handleClose = () => {
    if (!loading) {
      setAssetName("");
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
            Agregar Propiedad
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

export default AgregarPropertyModal;
