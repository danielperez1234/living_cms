import { create } from "zustand";
import {
  DeleteProduct,
  DeleteProductImage,
  DeleteProductOption,
  GetAllProducts,
  GetProduct,
  GetProductImages,
  GetProductOptions,
  PostProduct,
  PostProductImage,
  PostProductOption,
  PutProduct
} from "./service";
import { GetProductOptionsResponse, Product, ProductOptionDelete, ProductOptionPost, ProductPost, ProductPut } from "./interface";

interface ProductState {
  productos: Product[];
  producto?: Product;
  productOptionsResponse?: GetProductOptionsResponse[];
  productImages?: string[];
  errorMsg: string | undefined;
  error: string | undefined;
  loading: boolean;
  createResponse: string | undefined;
  updateResponse: string | undefined;
  deleteResponse: string | undefined;
  getAllProducts: () => void;
  getProduct: (id: string) => void;
  getProductOptions: (id: string) => void;
  getProductImages: (id: string) => void;
  deleteProductImage: (id: string,position:number) => Promise<void>;
  deleteProduct: (id: string) => void;
  setProducts: (x: Product[]) => void;
  postProductOption: (x: ProductOptionPost) => void;
  deleteProductOption: (x: ProductOptionDelete) => void;
  postProduct: (x: ProductPost) => void;
  putProduct: (x: ProductPut) => void;
  postProductImage: (id: string,image:File) => Promise<void>;
  clearResponses: () => void;
  clean: () => void;
}

const useProductsStore = create<ProductState>()((set) => ({
  productos: [],
  errorMsg: undefined,
  error: undefined,
  loading: false,
  productImages:[],
  createResponse: undefined,
  updateResponse: undefined,
  deleteResponse: undefined,
  getAllProducts: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetAllProducts();
    console.log("Productos: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          productos: response.data
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
  getProduct: async (id) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetProduct(id);
    console.log("Prueba de producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          producto: response.data
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
  getProductOptions: async (id) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetProductOptions(id);
    console.log("Prueba de producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          productOptionsResponse: response.data
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
  getProductImages: async (id) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetProductImages(id);
    console.log("Prueba de producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          productImages:response.data?.map(e=>e)
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
  deleteProduct: async (id) => {
    set((state) => ({
      ...state,
      loading: true,
      deleteResponse: undefined,
      error: undefined
    }));
    const response = await DeleteProduct(id);
    if (response.status < 300) {
      set((state) => ({
        ...state,
        loading: false,
        deleteResponse: "Producto eliminado exitosamente"
      }));
    } else {
      set((state) => ({
        ...state,
        loading: false,
        error: response.error || "Error al eliminar producto"
      }));
    }
  },
  setProducts: (prods) => {
    set((state) => {
      return {
        ...state,
        loading: false,
        productos: prods
      };
    });
  },
  postProduct: async (prod) => {
    set((state) => ({
      ...state,
      loading: true,
      createResponse: undefined,
      error: undefined
    }));
    const response = await PostProduct(prod);
    console.log("Prueba de post producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          producto: response.data,
          createResponse: "Producto creado exitosamente"
        };
      });
      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false,
        error: response.error || "Error al crear producto"
      };
    });
  },
  postProductOption: async (prod) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await PostProductOption(prod);
    console.log("Prueba de post producto option: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
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
  deleteProductOption: async (prod) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await DeleteProductOption(prod);
    console.log("Prueba de delete+ producto option: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
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
  putProduct: async (prod) => {
    set((state) => ({
      ...state,
      loading: true,
      updateResponse: undefined,
      error: undefined
    }));
    const response = await PutProduct(prod);
    console.log("Prueba de put producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          updateResponse: "Producto actualizado exitosamente"
        };
      });
      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false,
        error: response.error || "Error al actualizar producto"
      };
    });
  },
  deleteProductImage: async (id,position) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await DeleteProductImage(id,position);
    console.log("Prueba de post producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          producto: response.data
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
  postProductImage: async (id,image) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await PostProductImage(id,image);
    console.log("Prueba de post producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false
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
  clearResponses: () => set({
    createResponse: undefined,
    updateResponse: undefined,
    deleteResponse: undefined,
    error: undefined
  }),
  clean: () =>
    set(() => ({
      errorMsg: undefined,
      loading: false,
      productos: []
    }))
}));

export default useProductsStore;
