'use client';

import { useEidiStore } from '../store/eidiStore';
import { Sparkles, Users } from 'lucide-react';

export default function EidiCounter() {
  const { totalCollected } = useEidiStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none z-10">
      <div className="max-w-md mx-auto glass-card-dark rounded-t-2xl px-6 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(74,29,109,0.5)]">
        <div>
          <p className="text-xs text-gold/60 uppercase tracking-wider mb-1">Eidi Collected</p>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold animate-pulse-glow" />
            <p className="text-2xl font-bold text-gradient-gold">₹{totalCollected.toLocaleString('en-IN')}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-cream/50 mb-1 flex items-center gap-1 justify-end">
            <Users className="w-3 h-3" /> Loved By
          </p>
          <p className="text-sm text-cream font-medium">Countless People ❤️</p>
        </div>
      </div>
    </div>
  );
}
