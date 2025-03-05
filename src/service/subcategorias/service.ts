import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { newSubcategory as NewSubcategory, Subcategoria, Subcategory, SubcategoryProducts } from "./interface";

export async function GetSubcategorias(
  idCategoria: string
): Promise<Response<Subcategoria>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/Categories/${idCategoria}`,
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function GetSubcategoria(
  id: string,page:number
): Promise<Response<SubcategoryProducts>> {
  try {
    console.log("ID de la subcategoria: ", id);
    return await request({
      method: "GET",
      endpoint: `/${id}?pageNumber=${page}&pageSize=25`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function DeleteSubcategoria(
  id: string
): Promise<Response<Subcategoria[]>> {
  try {
    return await request({
      method: "DELETE",
      endpoint: `/${id}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function PostSubcategoria(
  subcategoria: string,
  idCategoria: string
) {
  try {
    const subcategoriaPost: NewSubcategory = {
      Name: subcategoria,
      CategoryId: idCategoria
    };
    return await request({
      method: "POST",
      endpoint: `/subcategory?Name=${subcategoria}&CategoryId=${idCategoria}`,
      body: subcategoriaPost,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
