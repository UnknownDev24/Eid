'use client';

import { useEidiStore } from '../store/eidiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Share2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: Props) {
  const { wishlist, removeFromWishlist } = useEidiStore();

  const totalValue = wishlist.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleShare = () => {
    const text = `Hey! ❤️ Check out what I collected for my Eidi:\n\n` +
      wishlist.map(w => `- ${w.title} (₹${w.price})`).join('\n') +
      `\n\nTotal Wishlist Value: ₹${totalValue}\n\nCan't wait! ✨`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    toast.success('Opening WhatsApp... 💬');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-purple-darker/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-purple-deep border-l border-gold/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-white/5">
              <h2 className="text-2xl font-serif text-gold">My Eidi Wishlist 💖</h2>
              <button 
                onClick={onClose}
                className="p-2 text-cream/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-10 opacity-60">
                  <p className="text-lg">No gifts collected yet.</p>
                  <p className="text-sm mt-2">Catch some floating Eidi boxes! 🎁</p>
                </div>
              ) : (
                wishlist.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="glass-card p-3 rounded-xl flex gap-4 items-center"
                  >
                    {item.imageUrl && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-cream truncate">{item.title}</h4>
                      <p className="text-gold text-sm font-bold">₹{item.price?.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {item.productUrl && (
                        <a 
                          href={item.productUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-cream/70 hover:text-gold hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-cream/70 hover:text-rose-soft hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="p-6 border-t border-gold/20 bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-cream/80 uppercase tracking-widest text-xs">Total Value</span>
                  <span className="text-2xl font-bold text-gradient-gold">₹{totalValue.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  onClick={handleShare}
                  className="w-full py-4 bg-gold text-purple-deep font-bold rounded-xl hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" /> Share with Bae 💕
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
