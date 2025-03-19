import { create } from 'zustand';
import { CartStore, Product } from '../types';

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + product.price
        };
      }
      
      return {
        items: [...state.items, { product, quantity: 1 }],
        total: state.total + product.price
      };
    });
  },
  
  removeItem: (productId: string) => {
    set((state) => {
      const item = state.items.find(item => item.product.id === productId);
      return {
        items: state.items.filter(item => item.product.id !== productId),
        total: state.total - (item ? item.product.price * item.quantity : 0)
      };
    });
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      const item = state.items.find(item => item.product.id === productId);
      if (!item) return state;
      
      const quantityDiff = quantity - item.quantity;
      
      return {
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
        total: state.total + (item.product.price * quantityDiff)
      };
    });
  },
  
  clearCart: () => {
    set({ items: [], total: 0 });
  },
}));