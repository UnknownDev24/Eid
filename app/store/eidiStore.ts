import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EidiItem } from '../data/eidiItems';

interface EidiState {
  wishlist: EidiItem[];
  totalCollected: number;
  unlockedSurprises: string[];
  addToWishlist: (item: EidiItem) => void;
  removeFromWishlist: (id: string) => void;
  collectCash: (amount: number) => void;
  unlockSurprise: (id: string) => void;
}

export const useEidiStore = create<EidiState>()(
  persist(
    (set) => ({
      wishlist: [],
      totalCollected: 0,
      unlockedSurprises: [],
      addToWishlist: (item) => set((state) => ({
        wishlist: state.wishlist.some(w => w.id === item.id) 
          ? state.wishlist 
          : [...state.wishlist, item]
      })),
      removeFromWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.filter(w => w.id !== id)
      })),
      collectCash: (amount) => set((state) => ({
        totalCollected: state.totalCollected + amount
      })),
      unlockSurprise: (id) => set((state) => ({
        unlockedSurprises: state.unlockedSurprises.includes(id) 
          ? state.unlockedSurprises 
          : [...state.unlockedSurprises, id]
      }))
    }),
    {
      name: 'eidi-storage',
    }
  )
);
