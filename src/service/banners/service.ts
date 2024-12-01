import { Response, request } from "../service";
import "../service";
import { Banner, BannerPost } from "./interface";

export async function GetBannersLocation(
  location: string
): Promise<Response<Banner[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Assets/location/${location}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
export async function DeleteBanner(id: string): Promise<Response<Banner[]>> {
  try {
    return await request({
      method: "DELETE",
      endpoint: `/api/Assets/${id}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
export async function PostBannersLocation(banner: BannerPost) {
  try {
    const formData = new FormData();
    Object.keys(banner).forEach((key) => {
      if (banner[key as keyof BannerPost] != null)
        formData.append(key, banner[key as keyof BannerPost]!);
    });
    return await request<Banner>({
      method: "POST",
      endpoint: `/api/Assets/upload-asset`,
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
      formData: formData,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
export async function UpdateBannersLocation(banner: Banner) {
  try {
    return await request<Banner>({
      method: "PUT",
      endpoint: `/api/Assets/${banner.id}`,
      body: banner,
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
