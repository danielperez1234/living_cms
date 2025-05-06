"use client";

import { useEffect } from "react";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useSubcategoriasStore from "@/service/subcategorias/store";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import PropertiesTable from "@/components/categorias/subcategorias/properties/properties_table";

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

  useEffect(()=>{
    console.log(subcategoria)
  },[])
  useEffect(()=>{
    console.log(subcategoria)
  },[subcategoria])
  return (
    <>
    {loading && <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>}
      <AppNavBar title={`${subcategoria?.datosPaginados.subcategoryName}`} />
      <PropertiesTable idSubcategory={idSubcategoria}/>
    </>
  );
}
