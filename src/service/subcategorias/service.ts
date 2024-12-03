import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Subcategoria, Subcategory, SubcategoryPost } from "./interface";

export async function GetSubcategorias(
  idCategoria: string
): Promise<Response<Subcategoria>> {
  try {
    console.log("Id de la categoría recibido: ", idCategoria);
    var token = localStorage.getItem(storageKeys.token);
    console.log("Id de la categoria: ", idCategoria);
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
  id: string
): Promise<Response<SubcategoryPost>> {
  try {
    console.log("ID de la subcategoria: ", id);
    return await request({
      method: "GET",
      endpoint: `/${id}`,
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
    const subcategoriaPost: Subcategory = {
      subcategoryName: subcategoria,
      id: idCategoria,
    };
    return await request({
      method: "POST",
      endpoint: `/subcategory`,
      body: subcategoriaPost,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

// export async function UpdateSubcategoria(subcategoria: SubcategoryPost)
