"use client";

import { useEffect } from "react";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useSubcategoriasStore from "@/service/subcategorias/store";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import ProductsTable from "@/components/categorias/subcategorias/product/product_table";

interface SubcategoriesProps {
  params: {
    id: string;
    idSubcategoria: string;
  };
}

export default function Page({
  params: { id, idSubcategoria },
}: SubcategoriesProps) {
  const subcategoria = useSubcategoriasStore(state=>state.subcategoriaProducts);
  const loading = useSubcategoriasStore((state) => state.loading);


  return (
    <>
    {loading && <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>}
      <AppNavBar title={`${subcategoria?.datosPaginados.subcategoryName}`} />
      <ProductsTable idSubcategory={idSubcategoria}/>
    </>
  );
}
