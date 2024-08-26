'use client'
// pages/offers/edit/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Simulación de obtener una oferta por ID
const getOfferById = (id: number) => ({
  id,
  title: `Oferta ${id}`,
  description: `Descripción de la oferta ${id}`,
});

const EditOfferPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const offer = getOfferById(parseInt(params.id as string, 10));


  
  
    

  const handleSave = () => {
    // Implementar lógica para guardar cambios
    console.log('Oferta guardada');
    router.push('/offers');
  };

  if (!offer) return <p>Cargando...</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Editar Oferta {params.id}</Typography>
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        margin="normal"
        value={offer.title}
      
        
      />
      <TextField
        label="Descripción"
        variant="outlined"
        fullWidth
        margin="normal"
        value={offer.description}
      />
      <Box sx={{ marginTop: 2 }}>
        <input
          accept="image/*"
          type="file"
          id="upload-image"
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-image">
          <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
            Subir Imagen
          </Button>
        </label>
      </Box>
      <Button variant="contained" onClick={handleSave} sx={{ marginTop: 2 }}>
        Guardar
      </Button>
    </Box>
  );
};

export default EditOfferPage;
