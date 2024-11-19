import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Categoria } from "./interface";

export async function GetCategorias(): Promise<Response<Categoria[]>> {
    try{
        var token = localStorage.getItem(storageKeys.token);
        return await request({
            method: "GET",
            endpoint: `/api/Categories`,
            headers: {
                authorization: `bearer ${token}`
            }
        });
    } catch (err) {
        return {
            status: 500,
            error: `${err}`
        }
    }
}