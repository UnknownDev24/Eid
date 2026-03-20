'use client';

import { useState } from 'react';
import AntiGravityScene from '../components/AntiGravityScene';
import EidiPopup from '../components/EidiPopup';
import WishlistDrawer from '../components/WishlistDrawer';
import WishlistButton from '../components/WishlistButton';
import EidiCounter from '../components/EidiCounter';
import { eidiItems, EidiItem } from '../data/eidiItems';
import MusicToggle from '../components/MusicToggle';
import { Toaster } from 'react-hot-toast';

export default function EidiPage() {
  const [selectedItem, setSelectedItem] = useState<EidiItem | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-darker to-purple-deep">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* 3D Canvas */}
      <AntiGravityScene items={eidiItems} onItemClick={setSelectedItem} />

      {/* UI Overlay */}
      <div className="relative z-10 pointer-events-none h-screen flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <div className="pointer-events-auto mt-2">
            <h1 className="text-3xl font-serif font-bold text-gradient-gold drop-shadow-lg">
              Catch Your Eidi! ✨
            </h1>
            <p className="text-cream/80 text-sm mt-1 max-w-xs">
              Tap the floating notes and boxes to reveal your gifts.
            </p>
          </div>
          
          <div className="pointer-events-auto">
            <WishlistButton onClick={() => setIsWishlistOpen(true)} />
          </div>
        </div>
      </div>

      <div className="pointer-events-auto">
        <EidiCounter />
        <MusicToggle />
      </div>

      {/* Modals & Drawers */}
      <div className="pointer-events-auto">
        {selectedItem && (
          <EidiPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
        <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      </div>
    </main>
  );
}
