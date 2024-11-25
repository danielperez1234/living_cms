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
import { Sucursal } from "@/service/sucursales/interface";
import useSucursalesStore from "@/service/sucursales/store";
import { useRouter } from "next/router";

interface updateSucursalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Sucursal, image: File | undefined) => void;
  accept: string;
}

const UpdateSucursalesBanner: React.FC<updateSucursalModalProps> = ({
  open,
  onClose,
  onSubmit,
  accept
}) => {
  const [image, setImage] = useState<File | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };
  const resetinitState = () => {
    setImage(undefined);
  };
  const selectedSucursal = useSucursalesStore(
    (state) => state.selectedSucursal
  );
  const selecteSucursal = useSucursalesStore((state) => state.selectSucursal);
  const handleSubmit = () => {
    if (selectedSucursal) {
      onSubmit(selectedSucursal, image);
    }
    resetinitState();
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetinitState();
        onClose();
      }}
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
            Agregar sucursal
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={selectedSucursal?.name}
            onChange={(e) => {
              if (selectedSucursal) {
                selecteSucursal({ ...selectedSucursal, name: e.target.value });
              }
            }}
            margin="normal"
            variant="outlined"
            inputProps={{
              maxLength: 30
            }}
          />
          <TextField
            fullWidth
            label="Descripción"
            value={selectedSucursal?.description}
            onChange={(e) => {
              if (selectedSucursal) {
                selecteSucursal({ ...selectedSucursal, description: e.target.value });
              }
            }}
            margin="normal"
            variant="outlined"
            multiline
            inputProps={{
              maxLength: 100
            }}
            rows={4}
          />
          <TextField
            fullWidth
            label="Horario"
            value={selectedSucursal?.schedule}
            onChange={(e) => {
              if (selectedSucursal) {
                selecteSucursal({ ...selectedSucursal, schedule: e.target.value });
              }
            }}
            margin="normal"
            variant="outlined"
            multiline
            inputProps={{
              maxLength: 100
            }}
            rows={4}
          />
          <TextField
            fullWidth
            label="Número de teléfono"
            value={selectedSucursal?.phoneNumber}
            onChange={(e) => {
              if (selectedSucursal) {
                selecteSucursal({ ...selectedSucursal, phoneNumber: e.target.value });
              }
            }}
            margin="normal"
            variant="outlined"
            inputProps={{
              maxLength: 200
            }}
          />
          <TextField
            fullWidth
            label="Latitud"
            value={selectedSucursal?.latitude}
            onChange={(e) => {
              if (selectedSucursal) {
                selecteSucursal({ ...selectedSucursal, latitude: parseInt(e.target.value) });
              }
            }}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{
              maxLength: 200
            }}
          />
          <TextField
            fullWidth
            label="Longitud"
            value={selectedSucursal?.longitude}
            onChange={(e) => {
              if (selectedSucursal) {
                selecteSucursal({ ...selectedSucursal, longitude: parseInt(e.target.value) });
              }
            }}
            margin="normal"
            variant="outlined"
            type="number"
            inputProps={{
              maxLength: 200
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
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {image.name}
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

export default UpdateSucursalesBanner;
