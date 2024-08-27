type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestOptions = {
    method: HttpMethod;
    endpoint: string;
    headers?: Record<string, string>;
    body?: any;
};
const mainRoute = "http://localhost:5020"
export async function request({ method, endpoint, headers = {}, body = null }: RequestOptions): Promise<any> {
        try {
            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            };

            const response = await fetch(mainRoute+ endpoint, options);

            if (!response.ok) {
              if(response.status == 401){
                return response.status
              }
              throw new Error(`HTTP error! status: ${response.status}`);
              
              }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error during request:", error);
            throw error;
        }
    }
