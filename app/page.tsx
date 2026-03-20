'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CountdownTimer, { TARGET_DATE } from './components/CountdownTimer';
import MusicToggle from './components/MusicToggle';
import { Sparkles, Gift, Lock, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const HER_NAME = "Arfiya";
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenEidi = () => {
    const now = new Date().getTime();
    if (now < TARGET_DATE) {
      toast.error('Sabar kijiye Arfiya! Eidi raat 12 baje khulegi 🌙', {
        style: { background: '#4A1D6D', color: '#FFD700', border: '1px solid #FFD700' }
      });
      return;
    }
    setShowAuthModal(true);
  };

  const verifyPassword = async () => {
    if (!password) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        toast.success('Access Granted! ✨', { iconTheme: { primary: '#FFD700', secondary: '#4A1D6D' }});
        setTimeout(() => {
          router.push('/eidi');
        }, 1000);
      } else {
        toast.error('Galat password! Wapas try karo.');
        setIsLoading(false);
      }
    } catch (err) {
      toast.error('Ek error aayi, please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      <Toaster position="top-center" />
      <MusicToggle />

      <div className="absolute inset-0 bg-gradient-to-b from-purple-darker to-purple-deep z-0" />
      
      {/* Decorative sparkles in background */}
      <div className="absolute top-1/4 left-1/4 animate-sparkle" style={{ animationDelay: '0.1s' }}>
        <Sparkles className="text-gold/30 w-8 h-8" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-sparkle" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="text-gold/40 w-12 h-12" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-sparkle" style={{ animationDelay: '1.2s' }}>
        <Sparkles className="text-gold/20 w-6 h-6" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-10">
        <div className="animate-slide-up">
          <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-4 drop-shadow-2xl text-cream tracking-tight">
            Eid Mubarak, <br />
            <span className="text-gradient-gold animate-pulse-glow inline-block">{HER_NAME} ❤️</span>
          </h1>
          <p className="text-lg sm:text-xl text-cream/90 font-light max-w-lg mx-auto">
            A small virtual token of my love for you. May this Eid bring you all the happiness in the world! ✨
          </p>
        </div>

        <CountdownTimer />

        {isClient && (
          <div className="animate-fade-in w-full flex justify-center mt-6" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={handleOpenEidi}
              className="group relative px-8 py-4 bg-gold text-purple-deep rounded-full font-bold text-lg 
                       shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.8)] 
                       transition-all duration-300 hover:scale-105 flex items-center gap-3 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Gift className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Open Your Eidi</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-darker/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-md bg-purple-deep/90 rounded-2xl p-6 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 text-cream/50 hover:text-cream hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center py-6">
                <Lock className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-gold mb-2">Secret Code 🔐</h3>
                <p className="text-cream/80 mb-6">Arfiya, please enter the special password to open your Eidi.</p>
                
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                  placeholder="Enter Password"
                  // Tailwind styles for input
                  className="bg-purple-darker/50 border border-gold/30 rounded-lg text-center text-xl text-cream py-3 px-4 w-full focus:outline-none focus:border-gold mb-6"
                />
                
                <button 
                  onClick={verifyPassword}
                  disabled={isLoading}
                  className="w-full py-3 bg-gold text-purple-deep font-bold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Checking...' : 'Enter'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
