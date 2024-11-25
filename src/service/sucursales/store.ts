import { create } from "zustand";
import {  Sucursal, SucursalPost } from "./interface";
import { DeleteSucursal, GetSucursales, PostSucursal } from "./service";

interface SucursalState {
  sucursales: Sucursal[];
  selectedSucursal? : Sucursal;
  errorMsg: string | undefined;
  loading: boolean;

  getSucursales: () => void;
  addSucursal: (sucursal: SucursalPost) => Promise<void>;
  deleteSucursal: (id: string) => Promise<void>;
  selectSucursal: (sucursal: Sucursal)=>void;
  clean: () => void;
}

const useSucursalesStore= create<SucursalState>()((set) => ({
  sucursales: [],
  errorMsg: undefined,
  loading: false,
  getSucursales: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetSucursales();
    console.log(response)
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          sucursales: response.data
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
  selectSucursal:(sucursal)=>{
    set((state)=>({
      ...state,
      selectedSucursal : sucursal
    }))
  },
  clean: () => set((state) => ({ sucursales: [] })),
  addSucursal: async (banner) => {
    set((state=>({...state,loading:true})));
    await PostSucursal(banner);
    set((state=>({...state,loading:false})));
    return;
  },
  deleteSucursal: async (id) => {
    set((state=>({...state,loading:true})));
    await DeleteSucursal(id);
    set((state=>({...state,loading:false})));
    return;
  }
}));
export default useSucursalesStore;