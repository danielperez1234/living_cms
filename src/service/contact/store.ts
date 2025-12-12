import { create } from "zustand";
import { WholesaleRequest, ContactMessage, UpdateStatusRequest } from "./interface";
import {
  GetWholesaleRequests,
  UpdateWholesaleStatus,
  GetContactMessages,
  UpdateContactMessageStatus,
} from "./service";

interface ContactState {
  // Wholesale Requests
  wholesaleRequests?: WholesaleRequest[];
  wholesaleTotalCount: number;
  wholesaleTotalPages: number;
  wholesaleCurrentPage: number;

  // Contact Messages
  contactMessages?: ContactMessage[];
  contactTotalCount: number;
  contactTotalPages: number;
  contactCurrentPage: number;

  // Loading states
  wholesaleLoading: boolean;
  contactLoading: boolean;

  // Response messages
  updateResponse?: string;

  // Actions
  getWholesaleRequests: (page: number) => void;
  updateWholesaleStatus: (id: string, updateData: UpdateStatusRequest) => void;
  getContactMessages: (page: number) => void;
  updateContactMessageStatus: (id: string, updateData: UpdateStatusRequest) => void;
  clean: () => void;
}

const useContactStore = create<ContactState>()((set) => ({
  // Initial state
  wholesaleRequests: undefined,
  wholesaleTotalCount: 0,
  wholesaleTotalPages: 0,
  wholesaleCurrentPage: 1,

  contactMessages: undefined,
  contactTotalCount: 0,
  contactTotalPages: 0,
  contactCurrentPage: 1,

  wholesaleLoading: false,
  contactLoading: false,
  updateResponse: undefined,

  // Get wholesale requests
  getWholesaleRequests: async (page) => {
    set((state) => ({
      ...state,
      wholesaleLoading: true,
    }));

    const response = await GetWholesaleRequests(page, 10);
    console.log("Wholesale requests:", response);

    if (response.status < 300 && response.data) {
      const data = Array.isArray(response.data) ? response.data : [];
      const totalCount = data.length;
      const totalPages = Math.ceil(totalCount / 10);

      set((state) => ({
        ...state,
        wholesaleLoading: false,
        wholesaleRequests: data,
        wholesaleTotalCount: totalCount,
        wholesaleTotalPages: totalPages,
        wholesaleCurrentPage: page,
      }));
      return;
    }

    set((state) => ({
      ...state,
      wholesaleLoading: false,
    }));
  },

  // Update wholesale status
  updateWholesaleStatus: async (id, updateData) => {
    set((state) => ({
      ...state,
      wholesaleLoading: true,
      updateResponse: undefined,
    }));

    const response = await UpdateWholesaleStatus(id, updateData);
    console.log("Update wholesale status:", response);

    if (response.status < 300 && response.data) {
      set((state) => ({
        ...state,
        wholesaleLoading: false,
        updateResponse: response.data,
      }));
      return;
    }

    set((state) => ({
      ...state,
      wholesaleLoading: false,
    }));
  },

  // Get contact messages
  getContactMessages: async (page) => {
    set((state) => ({
      ...state,
      contactLoading: true,
    }));

    const response = await GetContactMessages(page, 10);
    console.log("Contact messages:", response);

    if (response.status < 300 && response.data) {
      const data = Array.isArray(response.data) ? response.data : [];
      const totalCount = data.length;
      const totalPages = Math.ceil(totalCount / 10);

      set((state) => ({
        ...state,
        contactLoading: false,
        contactMessages: data,
        contactTotalCount: totalCount,
        contactTotalPages: totalPages,
        contactCurrentPage: page,
      }));
      return;
    }

    set((state) => ({
      ...state,
      contactLoading: false,
    }));
  },

  // Update contact message status
  updateContactMessageStatus: async (id, updateData) => {
    set((state) => ({
      ...state,
      contactLoading: true,
      updateResponse: undefined,
    }));

    const response = await UpdateContactMessageStatus(id, updateData);
    console.log("Update contact message status:", response);

    if (response.status < 300 && response.data) {
      set((state) => ({
        ...state,
        contactLoading: false,
        updateResponse: response.data,
      }));
      return;
    }

    set((state) => ({
      ...state,
      contactLoading: false,
    }));
  },

  // Clean state
  clean: () =>
    set((state) => ({
      wholesaleRequests: undefined,
      wholesaleTotalCount: 0,
      wholesaleTotalPages: 0,
      wholesaleCurrentPage: 1,
      contactMessages: undefined,
      contactTotalCount: 0,
      contactTotalPages: 0,
      contactCurrentPage: 1,
      wholesaleLoading: false,
      contactLoading: false,
      updateResponse: undefined,
    })),
}));

export default useContactStore;
