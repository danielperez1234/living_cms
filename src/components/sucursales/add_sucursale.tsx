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

interface addSucursalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SucursalFormData) => void;
  accept: string;
}

interface SucursalFormData {
  image: File | null;
  name: string;
  description: string;
  schedule: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
}

const AgregarSucursalBanner: React.FC<addSucursalModalProps> = ({
  open,
  onClose,
  onSubmit,
  accept
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setAssetName] = useState<string>("");
  const [description, setAssetDescription] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [phoneNumber, setphoneNumber] = useState<string>("");
  const [latitude, setlatitude] = useState<number>(0);
  const [longitude, setlongitude] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (
      image &&
      name != "" &&
      description != "" &&
      schedule != "" &&
      phoneNumber != "" &&
      latitude != 0 &&
      longitude != 0
    ) {
      onSubmit({
        image: image,
        name: name,
        schedule: schedule,
        description: description,
        phoneNumber: phoneNumber,
        latitude: latitude,
        longitude: longitude
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
            onChange={(e) => setAssetDescription(e.target.value)}
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
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
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
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            margin="normal"
            variant="outlined"
            inputProps={{
              maxLength: 200
            }}
          />
          <TextField
            fullWidth
            label="Latitud"
            value={latitude}
            onChange={(e) => {
              if(e.target.value == '-') return;
              if(e.target.value == '0'){
                setlatitude(0);
              }
              const newLat = Number.parseFloat(e.target.value) ?? 0;
              setlatitude(newLat);
            }}
            margin="normal"
            variant="outlined"
            inputProps={{
              maxLength: 200
            }}
          />
          <TextField
            fullWidth
            label="Longitud"
            value={longitude}
            onChange={(e) => {
              if(e.target.value == '-') return;
              if(e.target.value == '0'){
                setlongitude(0);
              }
              const newLong = Number.parseFloat(e.target.value) ?? 0;
              setlongitude(newLong);
            }}
            margin="normal"
            variant="outlined"
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

export default AgregarSucursalBanner;
