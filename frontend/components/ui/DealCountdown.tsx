'use client';

import { useState, useEffect } from 'react';

export default function DealCountdown({ expiryDate }: { expiryDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiryDate).getTime() - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [expiryDate]);

  if (expired) return <span className="text-xs font-body text-red-600 font-semibold">Deal expired</span>;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1 font-body">
      <span className="text-xs text-text-muted">Ends in:</span>
      {timeLeft.days > 0 && <span className="text-xs font-semibold text-primary">{timeLeft.days}d</span>}
      <span className="text-xs font-semibold text-accent">{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span>
    </div>
  );
}
