import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../../service";
import "../../service";
import { Property } from "../interface";

export async function PostSubcategoryProperty(
  subcategoryId: string,
  propertyName: string
): Promise<Response<Property>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    return await request<Property>({
      method: "POST",
      endpoint: `/subcategories/${subcategoryId}/properties`,
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        subcategoryId: subcategoryId,
        name: propertyName
      })
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function GetSubcategoryProperties(
  subcategoryId: string
): Promise<Response<Property[]>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    return await request<Property[]>({
      method: "GET",
      endpoint: `/subcategories/${subcategoryId}/properties`,
      headers: {
        "accept": "*/*",
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
export async function GetPropertyById(
  propertyId: string
): Promise<Response<Property>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    return await request<Property>({
      method: "GET",
      endpoint: `/properties/${propertyId}`,
      headers: {
        "accept": "*/*",
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
interface UpdatePropertyDto {
  subcategoryId: string;
  name: string;
}

export async function UpdateProperty(
  propertyId: string,
  updateData: UpdatePropertyDto
): Promise<Response<Property>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    return await request<Property>({
      method: "PUT",
      endpoint: `/properties/${propertyId}`,
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "authorization": `bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}