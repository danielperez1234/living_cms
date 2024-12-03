import { create } from "zustand";
import { Categoria, categoriaPut } from "./interface";
import {
  DeleteCategoria,
  GetCategorias,
  PostCategoria,
  UpdateCategoria,
} from "./service";
import { GetSubcategorias } from "../subcategorias/service";

interface CategoriaState {
  categorias: Categoria[];
  errorMsg: string | undefined;
  loading: boolean;
  selectedCategoria?: Categoria;
  selectCategoria: (categoria: Categoria) => void;
  getCategorias: () => void;
  getSubcategorias: (idCategoria: string) => void;
  deleteCategoria: (id: string) => Promise<void>;
  addCategoria: (categoria: string) => Promise<void>;
  updateCategoria: (categoria: categoriaPut) => Promise<void>;
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
  getSubcategorias: async (idCategoria) => {
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
  deleteCategoria: async (id) => {
    set((state) => ({ ...state, loading: true }));
    await DeleteCategoria(id);
    set((state) => ({ ...state, loading: false }));
    return;
  },
  addCategoria: async (categoria) => {
    set((state) => ({ ...state, loading: true }));
    await PostCategoria(categoria);
    set((state) => ({ ...state, loading: false }));
    return;
  },
  updateCategoria: async (categoria) => {
    set((state) => ({ ...state, loading: true }));
    await UpdateCategoria(categoria);
    set((state) => ({ ...state, loading: false }));
    return;
  },
  clean: () => set((state) => ({ categorias: [] })),
}));

export default useCategoriasStore;
