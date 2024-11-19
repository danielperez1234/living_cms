export interface Categoria {
  id: string;
  categoryName: string;
  subcategories: Subcategoria[];
}

export interface Subcategoria {
  id: string;
  categoryId: string;
  name: string;
}
