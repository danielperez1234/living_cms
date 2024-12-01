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

export interface CategoriaPost {
  name: string;
  subcategories: Subcategoria[];
}

export interface categoriaPut {
  id: string;
  name: string;
  subcategories: Subcategoria[];
}
