import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestOptions = {
  method: HttpMethod;
  endpoint: string;
  headers?: Record<string, string>;
  body?: any;
  formData?: FormData;
  token?: string;
};

export interface Response<T> {
  status: number;
  data?: T | undefined;
  message?: string; // Opcional, por si deseas incluir un mensaje en la respuesta
  error?: string; // Opcional, por si deseas manejar errores
}

const mainRoute = "http://64.23.178.44";

export async function request<T>({
  method,
  endpoint,
  headers = {},
  body = null,
  formData,
  token
}: RequestOptions): Promise<Response<T>> {
  try {
    if (token) {
      headers = { Authorization: `Bearer ${token}`, ...headers };
    }

    const config: AxiosRequestConfig = {
      method,
      url: mainRoute + endpoint,
      headers: {
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers
      },
      data: formData || body
    };

    const response: AxiosResponse<T> = await axios(config);

    return {
      status: response.status,
      data: response.data
    };
  } catch (error: any) {
    console.error("Error during request:", error);
    return {
      status: error.response?.status || 500,
      error: error.message
    };
  }
}
