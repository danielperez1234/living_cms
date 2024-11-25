"use client";

import { useEffect } from "react";
import AppNavBar from "@/components/common/app_nav_bar/main";
import CategoriaTable from "@/components/categorias/categoria_table";
import useCategoriasStore from "@/service/categorias/store";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Page() {
  const categorias = useCategoriasStore((state) => state.categorias);
  const loading = useCategoriasStore((state) => state.loading);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const clean = useCategoriasStore((state) => state.clean);
  useEffect(() => {
    getCategorias();
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
      <AppNavBar title={"Categorias"} />
      <CategoriaTable categorias={categorias} />
    </>
  );
}
