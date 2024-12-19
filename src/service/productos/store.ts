import { create } from "zustand";
import { DeleteProduct, GetAllProducts, GetProduct } from "./service";
import { Product } from "./interface";

interface ProductState {
  productos: Product[];
  producto?: Product;
  errorMsg: string | undefined;
  loading: boolean;
  getAllProducts: () => void;
  getProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  setProducts: (x: Product[]) => void;
  clean: () => void;
}

const useProductsStore = create<ProductState>()((set) => ({
  productos: [],
  errorMsg: undefined,
  loading: false,
  getAllProducts: async () => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetAllProducts();
    console.log("Productos: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          productos: response.data,
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
  getProduct: async (id) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetProduct(id);
    console.log("Prueba de producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          producto: response.data,
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
  deleteProduct: async (id) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    await DeleteProduct(id);
    set((state) => ({
      ...state,
      loading: false,
    }));
  },
  setProducts: (prods) => {
    set((state) => {
      return {
        ...state,
        loading: false,
        productos: prods,
      };
    });
  },
  clean: () =>
    set(() => ({
      errorMsg: undefined,
      loading: false,
      productos: [],
    })),
}));

export default useProductsStore;
