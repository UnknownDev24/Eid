'use client';

import { useState, useEffect } from 'react';

// Target date: 21st March 2026 midnight (kal raat 12 baje)
export const TARGET_DATE = new Date('2026-03-21T00:00:00+05:30').getTime();

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);
  const [isEid, setIsEid] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsEid(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return <div className="h-24" />; // Placeholder to prevent layout shift

  if (isEid) {
    return (
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-serif text-gradient-gold">Eid Mubarak! 🌙</h2>
        <p className="text-cream/80 mt-2 font-sans font-light">The moon has been sighted.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <p className="text-sm tracking-[0.2em] text-gold/80 uppercase">Eid begins in</p>
      <div className="flex gap-4 sm:gap-6">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds }
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="glass-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl mb-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
              <span className="text-2xl sm:text-3xl font-serif text-cream relative z-10">
                {item.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-cream/60 font-medium tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
