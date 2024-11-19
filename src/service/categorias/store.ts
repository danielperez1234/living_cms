import { create } from "zustand";
import { Categoria } from "./interface";
import { GetCategorias } from "./service";

interface CategoriaState {
  categorias: Categoria[];
  errorMsg: string | undefined;
  loading: boolean;
  getCategorias: () => void;
  clean: () => void;
}

const useCategoriasStore = create<CategoriaState>()((set) => ({
  categorias: [],
  errorMsg: undefined,
  loading: false,
  getCategorias: async () => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetCategorias();
    console.log("Prueba: " + response);
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
  clean: () => set((state) => ({ categorias: [] })),
}));
export default useCategoriasStore;
