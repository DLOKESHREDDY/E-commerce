import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistStore, Product } from '../types';

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        set((state) => ({
          items: [...state.items, product]
        }));
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },

      hasItem: (productId: string) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);