'use client'
// pages/offers.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { off } from 'process';
import AppNavBar from '@/components/common/app_nav_bar/main';

// Tipo para una oferta
type Offer = {
  id: number;
  title: string;
  description: string;
  image: string;
};

// Datos de ejemplo
const initialOffers: Offer[] = [
  { id: 1, title: 'Oferta 1', description: 'Descripción de la oferta 1', image: '/path/to/image1.jpg' },
  { id: 2, title: 'Oferta 2', description: 'Descripción de la oferta 2', image: '/path/to/image2.jpg' },
  { id: 3, title: 'Oferta 3', description: 'Descripción de la oferta 3', image: '/path/to/image3.jpg' },
  { id: 4, title: 'Oferta 4', description: 'Descripción de la oferta 4', image: '/path/to/image4.jpg' },
  { id: 5, title: 'Oferta 5', description: 'Descripción de la oferta 5', image: '/path/to/image5.jpg' },
  { id: 6, title: 'Oferta 6', description: 'Descripción de la oferta 6', image: '/path/to/image6.jpg' },
];

const OffersPage = () => {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>(initialOffers);

  const handleEdit = (id: number) => {
    router.push(`/ofertas/${id}`);
  };

  const handleDelete = (id: number) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const handleViewImage = (id: number) => {
    router.push(`/ofertas/${id}`);
  };

  return (
    <>
    <AppNavBar title={'Ofertas'}/>
    <Box display={'flex'} justifyContent={'center'}  sx={{ padding: 2 }}>
      
      <TableContainer sx={{maxWidth:'1000px'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewImage(offer.id)} color="primary">
                    {offer.image}
                  </IconButton>
                  <IconButton onClick={() => handleEdit(offer.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
};

export default OffersPage;
