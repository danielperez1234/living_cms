import { create } from "zustand";
import { Subcategoria, Subcategory, SubcategoryPost } from "./interface";
import {
  DeleteSubcategoria,
  GetSubcategoria,
  GetSubcategorias,
  PostSubcategoria,
} from "./service";

interface SubcategoriaState {
  subcategorias: Subcategoria;
  subcategoria?: SubcategoryPost;
  errorMsg: string | undefined;
  loading: boolean;
  selectedSubcategoria?: Subcategoria;
  selectSubcategoria: (Subcategoria: Subcategory) => void;
  getSubcategorias: (idCategoria: string) => void;
  getSubcategoria: (id: string) => void;
  deleteSubcategoria: (id: string) => Promise<void>;
  addSubcategoria: (subcategoria: string, idCategoria: string) => Promise<void>;
  clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
  subcategorias: { id: "", categoryName: "", subcategories: [] },
  errorMsg: undefined,
  loading: false,
  selectSubcategoria: () => {
    set((state) => ({
      ...state,
      selectedSubcategoria: state.subcategorias,
    }));
  },
  getSubcategorias: async (idCategoria) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSubcategorias(idCategoria);
    console.log("Prueba subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          subcategorias: response.data,
        };
      });

      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
  getSubcategoria: async (id) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSubcategoria(id);
    console.log("Prueba get subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          subcategoria: response.data,
        };
      });

      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false,
      };
    });
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
      subcategorias: { id: "", categoryName: "", subcategories: [] },
    })),
}));

export default useSubcategoriasStore;
