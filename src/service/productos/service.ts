import { Response, request } from "../service";
import "../service";
import { Product } from "./interface";

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