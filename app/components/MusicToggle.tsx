'use client';

import { useState, useEffect, useRef } from 'react';
import { Music, Music4 } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full transition-all duration-500 hover:scale-110 
        ${isPlaying ? 'bg-gold text-purple-deep animate-pulse-glow hover:bg-gold-light' : 'glass-card text-gold hover:bg-white/10'}`}
      aria-label="Toggle music"
    >
      {isPlaying ? <Music className="w-6 h-6 animate-breathe" /> : <Music4 className="w-6 h-6" />}
    </button>
  );
}
