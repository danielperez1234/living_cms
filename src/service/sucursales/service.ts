import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Sucursal, SucursalPost } from "./interface";

export async function GetSucursales(): Promise<Response<Sucursal[]>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/Branches`,
      headers: {
        authorization: `bearer ${token}`
      }
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function DeleteSucursal(
  id: string
): Promise<Response<Sucursal[]>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "DELETE",
      endpoint: `/api/Branches/${id}`,
      headers: {
        "authorization": `bearer ${token}`
      }
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function PostSucursal(sucurusal: SucursalPost) {
  try {
    var token = localStorage.getItem(storageKeys.token);
    const formData = new FormData();
    Object.keys(sucurusal).forEach((key) => {
      if (sucurusal[key as keyof SucursalPost] != null) {
        var valueToAppend = sucurusal[key as keyof SucursalPost];
        if (typeof valueToAppend == "number") {
          valueToAppend = valueToAppend.toString();
        }
        formData.append(key, valueToAppend ?? "");
      }
    });
    return await request<Sucursal>({
      method: "POST",
      endpoint: `/api/Branches`,
      headers: {
        "Content-Type": `multipart/form-data;`,
        "authorization": `bearer ${token}`
      },
      formData: formData
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function updateSucursal(sucurusal: Sucursal, image: File | undefined) {
  try {
    var token = localStorage.getItem(storageKeys.token);
    const formData = new FormData();
    Object.keys(sucurusal).forEach((key) => {
      if (sucurusal[key as keyof SucursalPost] != null) {
        var valueToAppend = sucurusal[key as keyof SucursalPost];
        if (typeof valueToAppend == "number") {
          valueToAppend = valueToAppend.toString();
        }
        formData.append(key, valueToAppend ?? "");
      }
    });
    
    formData.append("Image", image ?? '');
    return await request<Sucursal>({
      method: "PUT",
      endpoint: `/api/Branches/${sucurusal.id}`,
      headers: {
        "Content-Type": `multipart/form-data;`,
        "authorization": `bearer ${token}`
      },
      formData: formData
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
// const formData = new FormData();
//     Object.keys(banner).forEach(key => {if(banner[key as keyof BannerPost] != null)formData.append(key, banner[key as keyof BannerPost]! )})
//     console.log(banner.AssetFile?.size)
//   return await request<Banner>({
//     method:"POST",
//     endpoint:`/api/Assets/upload-asset`,
//     headers:{
//       "Content-Type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,},
//     formData: formData
