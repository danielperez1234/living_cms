"use client";

import { useEffect } from "react";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useSubcategoriasStore from "@/service/subcategorias/store";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

interface SubcategoriesProps {
  params: {
    id: string;
    idSubcategpria: string;
  };
}

export default function Page({
  params: { id, idSubcategpria },
}: SubcategoriesProps) {
  const subcategorias = useSubcategoriasStore((state) => state.subcategorias);
  const loading = useSubcategoriasStore((state) => state.loading);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );
  const clean = useSubcategoriasStore((state) => state.clean);

  useEffect(() => {
    // Fetch subcategories on mount
    getSubcategorias(id);

    return () => clean();
  }, []);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <>
      <AppNavBar title={`${subcategorias.categoryName}`} />
      <Typography variant="h1">on work</Typography>
    </>
  );
}
