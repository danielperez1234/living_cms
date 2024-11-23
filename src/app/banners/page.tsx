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
  { id: 1, title: "Mega banner", route: "/banners/mega_banner" },
  { id: 2, title: "Flat banner", route: "/banners/flat_banner" },
  { id: 3, title: "Square one banner", route: "/banners/square_one_banner" },
  { id: 4, title: "Square two banner", route: "/banners/square_two_banner" },
  { id: 5, title: "Sandbox Catalogo", route: "/banners/sandbox_catalogo" },
  { id: 6, title: "Quienes somos", route: "/banners/quienes_somos" },
  { id: 7, title: "Fondo web", route: "/banners/fondo_web" }
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
      <AppNavBar title="Banners" />
      <Box display={"flex"} justifyContent={"center"} sx={{ padding: 2 }}>
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
