export interface  Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  maxOrder: number;
  imageUrlOriginal: string;
  imageUrlSmall: string;
  description?: string | undefined;
}
export interface ProductPost {
  image: File | null;
  name: string;
  price: string;
  wholesalePrice: string;
  maxOrder: string;
  subcategoryId: string;
  description?: string | undefined;
}
export interface ProductPut {
  id: string;
  image: File | undefined;
  name: string;
  price: string;
  wholesalePrice: string;
  maxOrder: string;
  subcategoryId: string;
  description?: string | undefined;
}
export interface GetProductOptionsResponse {
  id:               string;
  productId:        string;
  propertyOptionId: string;
}
export interface ProductOptionPost {
  productId:        string;
  propertyOptionId: string;
}
export interface ProductOptionDelete {
  productId:        string;
  optionId: string;
}