import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { GetPurchaseHistoryResponse as ApiResponsePurchaseHistory, OrderStatus } from "./interface";

export async function GetPurchaseHistory(
  page: number, pageSize: number
): Promise<Response<ApiResponsePurchaseHistory>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/PurchaseHistory/history?page=${page}&pageSize=${pageSize}`,
      headers:{
        'Authorization': `bearer ${token}`
      }
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
export async function PutPurchaseStatus(
  idPurchase: string, status: OrderStatus
): Promise<Response<string>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "PUT",
      endpoint: `/api/PurchaseHistory/update-status/${idPurchase}`,
      headers:{
        'Authorization': `bearer ${token}`
      },
      body:{
        "status": status
      }
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
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
