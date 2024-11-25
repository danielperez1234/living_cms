import { create } from "zustand";
import { Subcategoria } from "./interface";
import { GetSubcategorias } from "./service";

interface SubcategoriaState {
  subcategorias: Subcategoria;
  errorMsg: string | undefined;
  loading: boolean;
  getSubcategorias: (idCategoria: string) => void;
  clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
  subcategorias: { id: "", categoryName: "", subcategories: [] },
  errorMsg: undefined,
  loading: false,
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
  clean: () =>
    set((state) => ({
      subcategorias: { id: "", categoryName: "", subcategories: [] },
    })),
}));

export default useSubcategoriasStore;
