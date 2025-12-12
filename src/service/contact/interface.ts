export interface WholesaleRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  status: string;
  adminNotes?: string | null;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  status: string;
  adminNotes?: string | null;
}

export interface UpdateStatusRequest {
  status: string;
  adminNotes?: string;
}
