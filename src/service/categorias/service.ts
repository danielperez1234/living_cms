import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Categoria, CategoriaPost, categoriaPut } from "./interface";

export async function GetCategorias(): Promise<Response<Categoria[]>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/Categories`,
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

export async function DeleteCategoria(
  id: string
): Promise<Response<Categoria[]>> {
  try {
    return await request({
      method: "DELETE",
      endpoint: `/api/Categories/${id}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function PostCategoria(categoria: string) {
  try {
    const categoriaPost: CategoriaPost = {
      name: categoria,
      subcategories: [],
    };
    return await request({
      method: "POST",
      endpoint: `/api/Categories`,
      body: categoriaPost,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function UpdateCategoria(categoria: categoriaPut) {
  try {
    return await request({
      method: "PUT",
      endpoint: `/api/Categories/${categoria.id}`,
      body: categoria,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
