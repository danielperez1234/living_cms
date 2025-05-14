import { create } from "zustand";
import { ApiPurchaseHistory, GetPurchaseHistoryResponse, OrderStatus } from "./interface";
import { GetPurchaseHistory, PutPurchaseStatus } from "./service";

interface PurchasesState {
  getPurchaseHistoryResponse?: GetPurchaseHistoryResponse | undefined;
  putStatusResonse?: string | undefined;
  loading: boolean;
  getPurchasesHistory: (actualPage: number) => void;
  putPurchaseStatus: (idPurchase: string,status:OrderStatus) => void;
 
  clean: () => void;
}

const usePurchasesStore= create<PurchasesState>()((set) => ({
  errorMsg: undefined,
  loading: false,
  getPurchasesHistory: async (actualPage) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetPurchaseHistory(actualPage,10,);
    console.log(response)
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          getPurchaseHistoryResponse: response.data
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
  putPurchaseStatus: async (idPurchase,status) => {
    set((state) => ({
      ...state,
      loading: true,
      putStatusResonse:undefined
    }));
    const response = await PutPurchaseStatus(idPurchase,status);
    console.log(response)
    if (response.status < 300 && response.data) {
      
      set((state) => {
        return {
          ...state,
          loading: false,
          putStatusResonse:response.data
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
  

  clean: () => set((state) => ({ getPurchaseHistoryResponse: undefined, loading:false })),
  
}));
export default usePurchasesStore;