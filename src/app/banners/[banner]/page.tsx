'use client'
import BannerTable from "@/components/banner/banner_table";
import AppNavBar from "@/components/common/app_nav_bar/main";
import SimplePagination from "@/components/common/paginado";
import { storageKeys } from "@/const/storage_keys";
import Image from "next/image";

export default function Page({ params }: { params: { banner: string } }) {
  
  return (
   <>
    <AppNavBar title={params.banner.replace("_"," ")}/>
    <BannerTable/>
    
   </>
  );
}
