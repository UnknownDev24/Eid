'use client';

import { Heart } from 'lucide-react';
import { useEidiStore } from '../store/eidiStore';

interface Props {
  onClick: () => void;
}

export default function WishlistButton({ onClick }: Props) {
  const { wishlist } = useEidiStore();

  return (
    <button
      onClick={onClick}
      className="fixed top-6 right-6 z-40 p-4 glass-card rounded-full text-gold hover:bg-white/10 hover:scale-105 transition-all shadow-lg group"
    >
      <Heart className="w-6 h-6 group-hover:fill-rose-soft group-hover:text-rose-soft transition-colors" />
      {wishlist.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-rose-soft text-purple-deep text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-fade-in">
          {wishlist.length}
        </span>
      )}
    </button>
  );
}
