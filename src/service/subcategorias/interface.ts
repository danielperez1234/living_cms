export interface Subcategoria {
  id: string;
  categoryName: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  subcategoryName: string;
}
