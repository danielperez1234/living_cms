import { create } from "zustand";
import { Categoria } from "./interface";
import { GetCategorias } from "./service";
import { GetSubcategorias } from "../subcategorias/service";

interface CategoriaState {
  categorias: Categoria[];
  errorMsg: string | undefined;
  loading: boolean;
  selectedCategoria?: Categoria;
  selectCategoria: (categoria: Categoria) => void;
  getCategorias: () => void;
  getSubcategorias: (idCategoria: string) => void;
  clean: () => void;
}

const useCategoriasStore = create<CategoriaState>()((set) => ({
  categorias: [],
  errorMsg: undefined,
  loading: false,
  selectCategoria: (categoria) => {
    set((state) => ({
      ...state,
      selectedCategoria: categoria,
    }));
  },
  getCategorias: async () => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetCategorias();
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          categorias: response.data,
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
  getSubcategorias: async (idCategoria: string) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSubcategorias(idCategoria);
    console.log("Prueba: " + response);
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
  clean: () => set((state) => ({ categorias: [] })),
}));
export default useCategoriasStore;
