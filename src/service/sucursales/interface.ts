export interface Sucursal {
  id: string;
  name: string;
  description: string;
  schedule: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SucursalPost {
  image: File | null;
  name: string;
  description: string;
  schedule: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
}
