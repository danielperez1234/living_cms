export interface User {
  id: string;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
  active: boolean;
}

export interface UpdateUserRequest {
  userName?: string;
  email?: string;
  role?: string;
  active?: boolean;
}
