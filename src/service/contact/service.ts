import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import { WholesaleRequest, ContactMessage, UpdateStatusRequest } from "./interface";

// ========== Wholesale Requests ==========

export async function GetWholesaleRequests(
  page: number,
  pageSize: number
): Promise<Response<WholesaleRequest[]>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/WholesaleRequest`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function UpdateWholesaleStatus(
  id: string,
  updateData: UpdateStatusRequest
): Promise<Response<string>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    const statusParam = encodeURIComponent(updateData.status);
    const notesParam = updateData.adminNotes ? `&adminNotes=${encodeURIComponent(updateData.adminNotes)}` : '';

    return await request({
      method: "PUT",
      endpoint: `/api/WholesaleRequest/${id}/status?status=${statusParam}${notesParam}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: undefined, // Explicitly set to undefined to prevent axios from sending null
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

// ========== Contact Messages ==========

export async function GetContactMessages(
  page: number,
  pageSize: number
): Promise<Response<ContactMessage[]>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/ContactMessage`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function UpdateContactMessageStatus(
  id: string,
  updateData: UpdateStatusRequest
): Promise<Response<string>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    const statusParam = encodeURIComponent(updateData.status);
    const notesParam = updateData.adminNotes ? `&adminNotes=${encodeURIComponent(updateData.adminNotes)}` : '';

    return await request({
      method: "PUT",
      endpoint: `/api/ContactMessage/${id}/status?status=${statusParam}${notesParam}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: undefined, // Explicitly set to undefined to prevent axios from sending null
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
