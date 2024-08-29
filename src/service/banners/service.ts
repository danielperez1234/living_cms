import { Response, request } from "../service";
import '../service'
import { Banner, BannerPost } from "./interface";
export  async function GetBannersLocation(location:string):Promise<Response<Banner[]>>{
  
  try{
  return await request({
    method:"GET",
    endpoint:`/api/Assets/location/${location}`,
    
  })
}catch(err){
  return  {
    status: 500,
    error: `${err}`
  };;
}}
export  async function PostBannersLocation(banner:BannerPost){
  
  try{

        const formData = new FormData();
        formData.append('AssetName', banner.AssetName);
        formData.append('AssetDescription', banner.AssetDescription);
        formData.append('Location', banner.Location);
        formData.append('AssetFile', banner.AssetFile!);

        try {
            const response = await fetch('https://localhost:5015/api/Assets/upload-asset', {
              method:"POST",
              headers: {
                "Content-Type": `multipart/form-data;`,
                
              },
              body: formData
            });
        } catch (error) {
            console.error('Error uploading asset:', error);
           
        }
  
}catch(err){
  return  {
    status: 500,
    error: `${err}`
  };;
}}
// const formData = new FormData();
//     Object.keys(banner).forEach(key => {if(banner[key as keyof BannerPost] != null)formData.append(key, banner[key as keyof BannerPost]! )})
//     console.log(banner.AssetFile?.size)
//   return await request<Banner>({
//     method:"POST",
//     endpoint:`/api/Assets/upload-asset`,
//     headers:{
//       "Content-Type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,},
//     formData: formData