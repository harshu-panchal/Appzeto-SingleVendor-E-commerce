import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const MAX_COMPARE_ITEMS = 4;

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to comparison
      addItem: (item) =>
        set((state) => {
          // Check if item already exists
          if (state.items.some((i) => i.id === item.id)) {
            return state; // Item already in comparison
          }

          // Check if limit reached
          if (state.items.length >= MAX_COMPARE_ITEMS) {
            return state; // Limit reached
          }

          return {
            items: [...state.items, { ...item }],
          };
        }),

      // Remove item from comparison
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // Check if item is in comparison
      isInCompare: (id) => {
        const state = get();
        return state.items.some((item) => item.id === id);
      },

      // Check if can add more items
      canAddMore: () => {
        const state = get();
        return state.items.length < MAX_COMPARE_ITEMS;
      },

      // Clear comparison
      clearCompare: () => set({ items: [] }),

      // Get item count
      getItemCount: () => {
        const state = get();
        return state.items.length;
      },
    }),
    {
      name: 'compare-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

