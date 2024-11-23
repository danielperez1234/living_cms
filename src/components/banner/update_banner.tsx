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
import { Banner } from "@/service/banners/interface";
import useBannerStore from "@/service/banners/store";

interface PutAssetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Banner | undefined) => void;
}

const UpdateBannerModal: React.FC<PutAssetModalProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const selectedBanner = useBannerStore((state) => state.selectedBanner);
  const selectBanner = useBannerStore((state) => state.selectBanner);

  const handleSubmit = () => {
    if (
      (selectedBanner?.assetName ?? "") != "" &&
      (selectedBanner?.assetDescription ?? "") != ""
    ) {
      onSubmit(selectedBanner);
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
            value={selectedBanner?.assetName}
            onChange={(e) => {
              if (selectedBanner) {
                selectBanner({ ...selectedBanner, assetName: e.target.value });
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
            value={selectedBanner?.assetDescription}
            onChange={(e) => {
              if (selectedBanner) {
                selectBanner({ ...selectedBanner, assetDescription: e.target.value });
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
            label="Link"
            value={selectedBanner?.link}
            onChange={(e) => {
              if (selectedBanner) {
                selectBanner({ ...selectedBanner, link: e.target.value });
              }
            }}
            margin="normal"
            variant="outlined"
            inputProps={{
              maxLength: 200
            }}
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

export default UpdateBannerModal;
