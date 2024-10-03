'use client'
import BannerTable from "@/components/banner/banner_table";
import AppNavBar from "@/components/common/app_nav_bar/main";
import SimplePagination from "@/components/common/paginado";
import { storageKeys } from "@/const/storage_keys";
import useBannerStore from "@/service/banners/store";
import { Backdrop, CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";

export default function Page({ params }: { params: { banner: string } }) {
  const banners = useBannerStore(state => state.banners);
  const loading = useBannerStore(state => state.loading);
  const getBanners = useBannerStore(state => state.getBanners);
  const clean = useBannerStore(state => state.clean);
  useEffect(()=>{
    getBanners(params.banner);
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
    <AppNavBar title={params.banner.replaceAll("_"," ")}/>
    <BannerTable banners={banners} location={params.banner}/>
   </>
  );
}
