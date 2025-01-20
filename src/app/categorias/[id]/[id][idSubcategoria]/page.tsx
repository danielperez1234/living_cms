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
  const subcategoria = useSubcategoriasStore((state) => state.selectedSubcategoria);
  const loading = useSubcategoriasStore((state) => state.loading);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );
  const getSubcategoriaProducts = useSubcategoriasStore(
    (state) => state.getSubcategoriaProducts
  );
  const clean = useSubcategoriasStore((state) => state.clean);

  useEffect(() => {
    // Fetch subcategories on mount
    getSubcategorias(id);
    getSubcategoriaProducts(id,1);
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
      <AppNavBar title={`${subcategoria?.subcategoryName}`} />
      <ProductsTable idSubcategory={idSubcategoria}/>
    </>
  );
}
