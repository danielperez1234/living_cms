import { Response, request } from "../service";
import "../service";
import { Product, ProductPost } from "./interface";

export async function GetAllProducts(): Promise<Response<Product[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: "/api/Products",
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function GetProduct(id: string): Promise<Response<Product>> {
  try {
    console.log("ID: ", id);
    return await request({
      method: "GET",
      endpoint: `/api/Products/${id}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function DeleteProduct(id: string): Promise<Response<Product[]>> {
  try {
    return await request({
      method: "DELETE",
      endpoint: `/api/Products/${id}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
export async function PostProduct(productPost: ProductPost) {
  try {
    const formData = new FormData();
    Object.keys(productPost).forEach((key) => {
      if (productPost[key as keyof ProductPost] != null)
        formData.append(key, productPost[key as keyof ProductPost]!);
    });
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "POST",
      endpoint: `/api/Product`,
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