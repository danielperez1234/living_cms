import { create } from "zustand";
import { Banner, BannerPost } from "./interface";
import { GetBannersLocation, PostBannersLocation } from "./service";

interface BannerState {
  banners: Banner[];
  errorMsg: string | undefined;
  loading: boolean;
  getBanners: (location: string) => void;
  addBanner: (banner: BannerPost) => void;
  clean: () => void;
}

const useBannerStore= create<BannerState>()((set) => ({
  banners: [],
  errorMsg: undefined,
  loading: false,
  getBanners: async (location) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetBannersLocation(location);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          banners: response.data
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
  clean: () => set((state) => ({ banners: [] })),
  addBanner: async (banner) => {
    set((state=>({...state,loading:true})));
    await PostBannersLocation(banner);
    set((state=>({...state,loading:false})));
  }
}));
export default useBannerStore;