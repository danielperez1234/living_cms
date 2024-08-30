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
import Image from 'next/image';

interface AddAssetModalProps {
  open: boolean;
  onClose: () => void;
  file:string;
}



const BannerImageModal: React.FC<AddAssetModalProps> = ({ open, onClose, file }) => {



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
            width:"60%",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display:'flex',
            objectFit:'contain',
            justifyContent:'center',
            alignContent:'center'
          }}
        >
          
          <img  src={file} alt={'banner_image'} style={{objectFit:'contain', maxWidth:"100%",alignSelf:'center'}}/>

          
        </Box>
      </Fade>
    </Modal>
  );
};

export default BannerImageModal;
