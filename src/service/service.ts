type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestOptions = {
  method: HttpMethod;
  endpoint: string;
  headers?: Record<string, string>;
  body?: any;
  formData?:FormData;
  token?: string;
};
export interface Response<T> {
  status: number;
  data?: T | undefined;
  message?: string; // Opcional, por si deseas incluir un mensaje en la respuesta
  error?: string; // Opcional, por si deseas manejar errores
}
const mainRoute = "http://localhost:5015";
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
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body ? JSON.stringify(body) : formData
    };

    const response = await fetch(mainRoute + endpoint, options);

    if (!response.ok) {
      if (response.status == 401) {
        return { status: response.status };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      status: response.status,

      data: data
    };
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
}
