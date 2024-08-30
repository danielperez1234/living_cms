import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  Fade,
} from '@mui/material';

interface AddAssetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AssetFormData) => void;
  accept:string;
}

interface AssetFormData {
  AssetFile: File | null;
  AssetName: string;
  AssetDescription: string;
  link: string;
}

const AgregarBannerModal: React.FC<AddAssetModalProps> = ({ open, onClose, onSubmit,accept }) => {
  const [file, setFile] = useState<File | null>(null);
  const [assetName, setAssetName] = useState<string>('');
  const [assetDescription, setAssetDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ AssetFile: file, AssetName: assetName, AssetDescription: assetDescription,link:link });
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{backdrop:{
        timeout: 500,
      }}}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Agregar banner
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={assetName}
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
            value={assetDescription}
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
            label="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
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

export default AgregarBannerModal;
