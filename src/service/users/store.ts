import { create } from "zustand";
import { User, UpdateUserRequest } from "./interface";
import { GetAllUsers, UpdateUser, DeleteUser } from "./service";

interface UsersState {
  users?: User[];
  loading: boolean;
  updateResponse?: string;
  deleteResponse?: string;
  error?: string;

  getAllUsers: () => void;
  updateUser: (id: string, updateData: UpdateUserRequest) => void;
  deleteUser: (id: string) => void;
  clearResponses: () => void;
}

const useUsersStore = create<UsersState>()((set) => ({
  users: undefined,
  loading: false,
  updateResponse: undefined,
  deleteResponse: undefined,
  error: undefined,

  getAllUsers: async () => {
    set((state) => ({ ...state, loading: true, error: undefined }));
    const response = await GetAllUsers();

    if (response.status < 300 && response.data) {
      set((state) => ({
        ...state,
        loading: false,
        users: response.data,
        error: undefined
      }));
    } else {
      set((state) => ({
        ...state,
        loading: false,
        error: response.error || "Error al cargar usuarios"
      }));
    }
  },

  updateUser: async (id, updateData) => {
    set((state) => ({ ...state, loading: true, updateResponse: undefined, error: undefined }));
    const response = await UpdateUser(id, updateData);

    if (response.status < 300 && response.data) {
      set((state) => ({
        ...state,
        loading: false,
        updateResponse: response.data,
        error: undefined
      }));
    } else {
      set((state) => ({
        ...state,
        loading: false,
        error: response.error || "Error al actualizar usuario"
      }));
    }
  },

  deleteUser: async (id) => {
    set((state) => ({ ...state, loading: true, deleteResponse: undefined, error: undefined }));
    const response = await DeleteUser(id);

    if (response.status < 300 && response.data) {
      set((state) => ({
        ...state,
        loading: false,
        deleteResponse: response.data,
        error: undefined
      }));
    } else {
      set((state) => ({
        ...state,
        loading: false,
        error: response.error || "Error al eliminar usuario"
      }));
    }
  },

  clearResponses: () => set((state) => ({
    ...state,
    updateResponse: undefined,
    deleteResponse: undefined,
    error: undefined
  })),
}));

export default useUsersStore;
