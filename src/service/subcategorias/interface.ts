import { Product } from "../productos/interface";

export interface Subcategoria {
  id: string;
  categoryName: string;
  subcategories: Subcategory[];
  products?: Product[];
}

export interface Subcategory {
  id: string;
  subcategoryName: string;
}

// 12/02/2024
export interface SubcategoryPost {
  id: string;
  categoryId: string;
  category: object;
  name: string;
  products: Product[];
}

// export interface SubcategoryPut {
//   id: "string";
//   categoryId: string;
//   categoryName: string;

// }
