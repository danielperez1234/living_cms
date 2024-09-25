'use client'
import BannerTable from "@/components/banner/banner_table";
import AppNavBar from "@/components/common/app_nav_bar/main";
import SimplePagination from "@/components/common/paginado";
import SucursalTable from "@/components/sucursales/sucursal_table";
import { storageKeys } from "@/const/storage_keys";
import useSucursalesStore from "@/service/sucursales/store";
import { Backdrop, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

export default function Page() {
  const sucursales = useSucursalesStore(state => state.sucursales);
  const loading = useSucursalesStore(state => state.loading);
  const getSucursales = useSucursalesStore(state => state.getSucursales);
  const clean = useSucursalesStore(state => state.clean);
  useEffect(()=>{
    getSucursales();
  },[])
  if(loading){
    return(<Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>)
  }
  return (
   <>
    <AppNavBar title={'Sucursales'}/>
    <SucursalTable sucursales={sucursales} />
    
   </>
  );
}
