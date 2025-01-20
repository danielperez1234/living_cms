import { create } from "zustand";
import { Subcategoria, Subcategory, SubcategoryProducts } from "./interface";
import {
  DeleteSubcategoria,
  GetSubcategoria,
  GetSubcategorias,
  PostSubcategoria
} from "./service";

interface SubcategoriaState {
  subcategorias: Subcategoria;
  subcategoriaProducts?: SubcategoryProducts;
  errorMsg: string | undefined;
  loading: boolean;
  selectedSubcategoria?: Subcategory;
  selectSubcategoria: (Subcategoria: Subcategory) => void;
  getSubcategorias: (idCategoria: string) => void;
  getSubcategoriaProducts: (id: string,page:number) => Promise<number>;
  deleteSubcategoria: (id: string) => Promise<void>;
  addSubcategoria: (subcategoria: string, idCategoria: string) => Promise<void>;
  clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
  subcategorias: { id: "", categoryName: "", subcategories: [] },
  errorMsg: undefined,
  loading: false,
  selectSubcategoria: (subcategoria) => {
    set((state) => ({
      ...state,
      selectedSubcategoria: subcategoria
    }));
  },
  getSubcategorias: async (idCategoria) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetSubcategorias(idCategoria);
    console.log("Prueba subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          subcategorias: response.data
        };
      });

      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false
      };
    });
  },
  getSubcategoriaProducts: async (id,page) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetSubcategoria(id,page);
    console.log("Prueba get subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          subcategoriaProducts: response.data
        };
      });
      const newpage = page *10 >= response.data.elementos? page:page+1;
      return newpage;
    }
    set((state) => {
      return {
        ...state,
        loading: false
      };
    });
    return page;
  },
  deleteSubcategoria: async (id) => {
    set((state) => ({ ...state, loading: true }));
    await DeleteSubcategoria(id);
    set((state) => ({ ...state, loading: false }));
    return;
  },
  addSubcategoria: async (subcategoria, idCategoria) => {
    set((state) => ({ ...state, loading: true }));
    await PostSubcategoria(subcategoria, idCategoria);
    set((state) => ({ ...state, loading: false }));
    return;
  },
  clean: () =>
    set((state) => ({
      subcategorias: { id: "", categoryName: "", subcategories: [] }
    }))
}));

export default useSubcategoriasStore;
