import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../../service";
import "../../service";
import { Property, PropertyOption } from "../interface";
export async function AddPropertyOption(
  propertyId: string,
  optionData: {
    text: string;
    imageFile?: File;
  }
): Promise<Response<PropertyOption>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    const formData = new FormData();

    formData.append('CategoryPropertyId', propertyId);
    formData.append('Text', optionData.text);
    
    if (optionData.imageFile) {
      formData.append('ImageFile', optionData.imageFile);
    } else {
      formData.append('ImageFile', 'undefined');
    }

    return await request<PropertyOption>({
      method: "POST",
      endpoint: `/properties/${propertyId}/options`,
      headers: {
        "accept": "*/*",
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
export async function GetPropertyOptions(
  propertyId: string
): Promise<Response<PropertyOption[]>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    return await request<PropertyOption[]>({
      method: "GET",
      endpoint: `/properties/${propertyId}/options`,
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
export async function GetOptionById(
  optionId: string
): Promise<Response<PropertyOption>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    return await request<PropertyOption>({
      method: "GET",
      endpoint: `/options/${optionId}`,
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
export async function UpdateOption(
  optionId: string,
  updateData: {
    categoryPropertyId: string;
    text: string;
    imageFile?: File | null;
  }
): Promise<Response<PropertyOption>> {
  try {
    const token = localStorage.getItem(storageKeys.token);
    const formData = new FormData();

    // Add required fields
    formData.append('CategoryPropertyId', updateData.categoryPropertyId);
    formData.append('Text', updateData.text);

    // Handle image file (optional)
    if (updateData.imageFile) {
      formData.append('ImageFile', updateData.imageFile);
    } else if (updateData.imageFile === null) {
      // Explicit null means remove existing image
      formData.append('ImageFile', 'null');
    }

    return await request<PropertyOption>({
      method: "PUT",
      endpoint: `/options/${optionId}`,
      headers: {
        "accept": "*/*",
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