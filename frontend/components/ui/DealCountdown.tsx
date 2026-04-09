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
  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1;

  return (
    <div className={`inline-flex items-center gap-3 font-body rounded-xl px-4 py-3 ${isUrgent ? 'bg-destructive' : 'bg-navy-900'}`}>
      <span className="text-xs text-white">Ends in:</span>
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
            <span className="text-xs text-navy-300 ml-0.5">d</span>
          </div>
        )}
        {timeLeft.days > 0 && <span className="text-orange-400 text-2xl font-bold">:</span>}
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{pad(timeLeft.hours)}</span>
          <span className="text-xs text-navy-300 ml-0.5">h</span>
        </div>
        <span className="text-orange-400 text-2xl font-bold">:</span>
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{pad(timeLeft.minutes)}</span>
          <span className="text-xs text-navy-300 ml-0.5">m</span>
        </div>
        <span className="text-orange-400 text-2xl font-bold">:</span>
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{pad(timeLeft.seconds)}</span>
          <span className="text-xs text-navy-300 ml-0.5">s</span>
        </div>
      </div>
    </div>
  );
}
