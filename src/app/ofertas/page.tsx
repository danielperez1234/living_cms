"use client";
import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useBannerStore from "@/service/banners/store";
const banners = [
  { id: 1, title: "Ofertas", route: "/ofertas/ofertas" },
  {
    id: 2,
    title: "Square banner ofertas",
    route: "/ofertas/square_banner_ofertas",
  },
  { id: 3, title: "Quarter one banner", route: "/ofertas/quarter_one_banner" },
  { id: 4, title: "Quarter two banner", route: "/banners/quarter_two_banner" },
  // Agrega más tipos de banners según sea necesario
];

const BannersList = () => {
  //zustand Hooks
  const cleanBanners = useBannerStore((state) => state.clean);
  const router = useRouter();

  const handleRedirect = (route: string) => {
    router.push(route);
  };
  useEffect(() => {
    cleanBanners();
  }, []);
  return (
    <>
      <AppNavBar title="Ofertas" />
      <Box display={"flex"} justifyContent={"center"} sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }} maxWidth={"1000px"}>
          {banners.map((banner) => (
            <Grid item xs={12} sm={6} md={4} key={banner.id}>
              <Card elevation={2}>
                <CardActionArea onClick={() => handleRedirect(banner.route)} sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography variant="h5" component="div" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 'bold' }}>
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
