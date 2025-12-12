import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import { User, UpdateUserRequest } from "./interface";

export async function GetAllUsers(): Promise<Response<User[]>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/account/users`,
      headers: { Authorization: `bearer ${token}` },
    });
  } catch (err) {
    return { status: 500, error: `${err}` };
  }
}

export async function UpdateUser(id: string, updateData: UpdateUserRequest): Promise<Response<string>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "PUT",
      endpoint: `/api/account/users/${id}`,
      headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: updateData,
    });
  } catch (err) {
    return { status: 500, error: `${err}` };
  }
}

export async function DeleteUser(id: string): Promise<Response<string>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "DELETE",
      endpoint: `/api/account/users/${id}`,
      headers: { Authorization: `bearer ${token}` },
    });
  } catch (err) {
    return { status: 500, error: `${err}` };
  }
}
