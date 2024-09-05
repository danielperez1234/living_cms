'use client'
import BannerTable from "@/components/banner/banner_table";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useBannerStore from "@/service/banners/store";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";

export default function Page() {
  const banners = useBannerStore(state => state.banners);
  const loading = useBannerStore(state => state.loading);
  const getBanners = useBannerStore(state => state.getBanners);
  const clean = useBannerStore(state => state.clean);
  useEffect(()=>{
    getBanners("ofertas");
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
    <AppNavBar title={"Ofertas"}/>
    <BannerTable banners={banners} location={'ofertas'}/>
    
   </>
  );
}
