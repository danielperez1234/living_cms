'use client'
import React from 'react';
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import AppNavBar from '@/components/common/app_nav_bar/main';
const banners = [
  { id: 1, title: 'Mega banner', route: '/banners/mega_banner' },
  { id: 2, title: 'Flat banner', route: '/banners/flat_banner' },
  { id: 3, title: 'Cuadrado 1', route: '/banners/cuadrado_1' },
  { id: 4, title: 'Cuadrado 2', route: '/banners/cuadrado_2' },
  // Agrega más tipos de banners según sea necesario
];

const BannersList = () => {
  const router = useRouter();

  const handleRedirect = (route: string) => {
    router.push(route);
  };

  return (
    <>
    <AppNavBar title='Banners' />
    <Box display={'flex'} justifyContent={'center'} sx={{ padding: 2 }}>
      <Grid container spacing={2} maxWidth={"1000px"}>
        {banners.map((banner) => (
          <Grid item xs={12} sm={6} md={4} key={banner.id}>
            <Card>
              <CardActionArea onClick={() => handleRedirect(banner.route)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {banner.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default BannersList;
