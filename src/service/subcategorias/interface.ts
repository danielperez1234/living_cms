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
export interface SubcategoryProducts {
  elementos:      number;
  datosPaginados: DatosPaginados;
}

export interface DatosPaginados {
  id:                     string;
  subcategoryName:        string;
  subcategoryProductDtos: Product[];
}

export interface newSubcategory {
  Name: string;
CategoryId: string;
}