'use client'

import AppNavBar from "@/components/common/app_nav_bar/main";
import SucursalTable from "@/components/sucursales/sucursal_table";
import useSucursalesStore from "@/service/sucursales/store";
import { Backdrop, CircularProgress } from "@mui/material";
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
