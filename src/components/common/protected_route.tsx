'use client'
import { storageKeys } from "@/const/storage_keys";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute(){
  const router = useRouter();
  useEffect(()=>{
    if(localStorage.getItem(storageKeys.token) == null){
        router.replace('/');
    }
  },[])
  return(<></>)
}