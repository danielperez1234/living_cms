import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Subcategoria } from "./interface";

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
