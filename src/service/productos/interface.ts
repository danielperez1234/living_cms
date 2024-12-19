export interface Product {
  id: string;
  subcategoryId: string;
  subcategory: string;
  name: string;
  price: number;
  wholesalePrice: number;
  maxOrder: number;
  imageUrlOriginal: string;
  imageUrlSmall: string;
  productOptions: [];
}