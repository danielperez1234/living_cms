import { create } from "zustand";
import { Property, PropertyOption } from "./interface";
import { GetSubcategoryProperties, PostSubcategoryProperty, UpdateProperty } from "./services/properties";
import { AddPropertyOption, GetOptionById, GetPropertyOptions, UpdateOption } from "./services/options";
interface PropertyStore {
  // State
  properties: Property[];
  options: PropertyOption[] | undefined;
  loading: boolean;
  error: string | null;

  // Property Actions
  fetchSubcategoryProperties: (subcategoryId: string) => Promise<void>;
  createProperty: (subcategoryId: string, name: string) => Promise<void>;
  updateProperty: (propertyId: string, data: { subcategoryId: string; name: string }) => Promise<void>;

  // Option Actions
  fetchPropertyOptions: (propertyId: string) => Promise<void>;
  flushPropertyOptions: () => void;
  getOptionDetails: (optionId: string) => Promise<PropertyOption | null>;
  addOption: (propertyId: string, data: { text: string; imageFile?: File }) => Promise<void>;
  updateOption: (
    optionId: string,
    data: { categoryPropertyId: string; text: string; imageFile?: File | null }
  ) => Promise<void>;

  // Utility
  resetError: () => void;
}
export const usePropertyStore = create<PropertyStore>((set, get) => ({
  // Initial state
  properties: [],
  options: undefined,
  loading: false,
  error: null,

  // Property actions
  fetchSubcategoryProperties: async (subcategoryId) => {
    set({ loading: true, error: null });
    try {
      const response = await GetSubcategoryProperties(subcategoryId);
      if (response.data) {
        set((state) => ({
          properties: response.data,
          loading: false
        }));
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  createProperty: async (subcategoryId, name) => {
    set({ loading: true, error: null });
    try {
      const response = await PostSubcategoryProperty(subcategoryId, name);
      if (response.data) {
        set((state) => ({
          ...state,
          properties: [...state.properties, response.data!],
          loading: false
        }));
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  updateProperty: async (propertyId, data) => {
    set({ loading: true, error: null });
    try {
      const response = await UpdateProperty(propertyId, data);
      if (response.data) {
        set((state) => ({
          properties: state.properties.map(prop =>
            prop.id === propertyId ? { ...prop, ...response.data } : prop
          ),
          loading: false
        }));
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  // Option actions
  fetchPropertyOptions: async (propertyId) => {
    set({ loading: true, error: null });
    try {
      const response = await GetPropertyOptions(propertyId);
      if (response.data) {
        set((state) => ({
          options: response.data,
          loading: false
        }));
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },
  flushPropertyOptions:  () => {
    set({ loading: true, error: null });
    try {
     
      
        set((state) => ({
          options: undefined,
          loading: false
        }));
      
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  getOptionDetails: async (optionId) => {
    set({ loading: true, error: null });
    try {
      const response = await GetOptionById(optionId);
      if (response.data) {
        set({ loading: false });
        return response.data;
      }
      return null;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
      return null;
    }
  },

  addOption: async (propertyId, data) => {
    set({ loading: true, error: null });
    try {
      const response = await AddPropertyOption(propertyId, data);
      if (response.data) {
        set((state) => ({
          ...state,
          options: [...(state.options??[]), response.data!],
          loading: false
        }));
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  updateOption: async (optionId, data) => {
    set({ loading: true, error: null });
    try {
      const response = await UpdateOption(optionId, data);
      if (response.data) {
        set((state) => ({
          options: (state.options??[]).map(opt =>
            opt.id === optionId ? { ...opt, ...response.data } : opt
          ),
          loading: false
        }));
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  // Utility
  resetError: () => set({ error: null })
}));
export default usePropertyStore;
