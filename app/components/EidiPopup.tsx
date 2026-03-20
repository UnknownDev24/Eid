'use client';

import { EidiItem } from '../data/eidiItems';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ExternalLink, Lock } from 'lucide-react';
import { useEidiStore } from '../store/eidiStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  item: EidiItem | null;
  onClose: () => void;
}

export default function EidiPopup({ item, onClose }: Props) {
  const { addToWishlist, collectCash, unlockSurprise, unlockedSurprises, totalCollected } = useEidiStore();
  const [password, setPassword] = useState('');
  const [errorShake, setErrorShake] = useState(false);

  if (!item) return null;

  const isLocked = item.isLocked && !unlockedSurprises.includes(item.id);

  const handleUnlock = () => {
    if (password === item.password) {
      unlockSurprise(item.id);
      toast.success('Unlocked! 🔓', { iconTheme: { primary: '#FFD700', secondary: '#4A1D6D' } });
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      toast.error('Galat password! Try our anniversary date.');
    }
  };

  const renderContent = () => {
    if (item.type === 'cash') {
      return (
        <div className="text-center py-6">
          <h3 className="text-2xl font-serif text-gold mb-2">{item.title}</h3>
          <p className="text-5xl font-bold text-gradient-gold my-6 drop-shadow-lg">₹{item.amount?.toLocaleString('en-IN')}</p>
          <p className="text-cream/80 italic mb-6">"{item.personalMessage}"</p>
          <button 
            onClick={() => {
              collectCash(item.amount || 0);
              toast.success('Eidi Added to Wallet! 💸', {
                style: { background: '#4A1D6D', color: '#FFD700', border: '1px solid #FFD700' }
              });
              onClose();
            }}
            className="w-full py-3 bg-gold text-purple-deep font-bold rounded-xl hover:bg-gold-light transition-colors"
          >
            MashaAllah! Accept Eidi
          </button>
        </div>
      );
    }

    if (item.type === 'surprise' && isLocked) {
      return (
        <div className="text-center py-6">
          <Lock className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="text-2xl font-serif text-gold mb-2">{item.title}</h3>
          <p className="text-cream/80 mb-6">{item.personalMessage}</p>
          
          <div className={`flex gap-2 justify-center mb-6 ${errorShake ? 'animate-[pulse_0.5s_ease-in-out]' : ''}`}>
            {/* Tailwind v4 animation placeholder instead of shake to keep it simple */}
            <input 
              type="password"
              maxLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              className="bg-purple-darker/50 border border-gold/30 rounded-lg text-center text-2xl tracking-widest text-cream py-3 w-32 focus:outline-none focus:border-gold"
            />
          </div>
          
          <button 
            onClick={handleUnlock}
            className="w-full py-3 bg-gold text-purple-deep font-bold rounded-xl hover:bg-gold-light transition-colors"
          >
            Unlock Surprise
          </button>
        </div>
      );
    }

    if (item.type === 'surprise' && !isLocked) {
      return (
        <div className="text-center py-6">
          <h3 className="text-2xl font-serif text-gold mb-4">{item.title}</h3>
          <div className="bg-purple-darker/50 p-6 rounded-xl border border-gold/20">
            <p className="text-lg text-cream leading-relaxed">{item.surpriseContent}</p>
          </div>
        </div>
      );
    }

    // Gift
    return (
      <div className="flex flex-col">
        {item.imageUrl && (
          <div className="w-full h-48 rounded-xl overflow-hidden mb-4 relative">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-darker to-transparent opacity-60" />
            <div className="absolute bottom-3 left-3 text-gold text-lg font-bold">₹{item.price?.toLocaleString('en-IN')}</div>
          </div>
        )}
        <h3 className="text-2xl font-serif text-gold mb-1">{item.title}</h3>
        <p className="text-sm text-gold-light/60 uppercase tracking-widest mb-4">{item.brand}</p>
        
        <p className="text-cream/90 italic border-l-2 border-gold/50 pl-3 py-1 bg-white/5 rounded-r-lg mb-6">
          "{item.personalMessage}"
        </p>

        <div className="flex gap-3 mt-auto">
          <button 
            onClick={() => {
              addToWishlist(item);
              toast.success('Added to your Wishlist! 💖', {
                style: { background: '#4A1D6D', color: '#FFF8E7', border: '1px solid #FFD700' }
              });
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 text-cream hover:bg-white/20 hover:text-rose-soft border border-white/20 rounded-xl transition-all"
          >
            <Heart className="w-5 h-5" /> Wishlist
          </button>
          
          {item.productUrl && (
            <a 
              href={item.productUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-purple-deep font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              Shop <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-darker/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-md bg-purple-deep/90 rounded-2xl p-6 relative shadow-2xl overflow-hidden"
        >
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-soft/10 rounded-full blur-2xl pointer-events-none" />

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-cream/50 hover:text-cream hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {renderContent()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
