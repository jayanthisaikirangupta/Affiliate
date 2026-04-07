'use client';

import { useEffect, useState, useRef } from 'react';

type PetItem = {
  id: number;
  type: 'paw' | 'bone' | 'fish' | 'star';
  x: number;
  y: number;
  size: number;
  opacity: number;
  animClass: number; // 0,1,2
  duration: number;
  delay: number;
  initialRotate: number;
};

function PawSVG() {
  return (
    <>
      {/* Main pad */}
      <ellipse cx="50" cy="67" rx="20" ry="24" />
      {/* Top left toe */}
      <ellipse cx="25" cy="40" rx="9" ry="12" transform="rotate(-20 25 40)" />
      {/* Top mid-left toe */}
      <ellipse cx="39" cy="29" rx="8" ry="11" transform="rotate(-8 39 29)" />
      {/* Top mid-right toe */}
      <ellipse cx="61" cy="29" rx="8" ry="11" transform="rotate(8 61 29)" />
      {/* Top right toe */}
      <ellipse cx="75" cy="40" rx="9" ry="12" transform="rotate(20 75 40)" />
    </>
  );
}

function BoneSVG() {
  return (
    <>
      <circle cx="20" cy="25" r="12" />
      <circle cx="80" cy="25" r="12" />
      <circle cx="20" cy="75" r="12" />
      <circle cx="80" cy="75" r="12" />
      <rect x="15" y="35" width="70" height="30" rx="8" />
    </>
  );
}

function FishSVG() {
  return (
    <>
      <ellipse cx="52" cy="50" rx="32" ry="18" />
      <path d="M20 50 L2 30 L2 70 Z" />
      <circle cx="66" cy="43" r="4" fill="rgba(255,255,255,0.6)" />
    </>
  );
}

function StarSVG() {
  return (
    <path d="M50 5 L61 35 L94 35 L68 57 L79 91 L50 70 L21 91 L32 57 L6 35 L39 35 Z" />
  );
}

export default function FloatingPets() {
  const [items, setItems] = useState<PetItem[]>([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const types: PetItem['type'][] = ['paw', 'paw', 'paw', 'bone', 'fish', 'paw', 'paw', 'star', 'paw', 'bone', 'fish', 'paw', 'paw', 'paw'];

    const generated: PetItem[] = types.map((type, i) => ({
      id: i,
      type,
      x: (i * 7.3 + 3) % 92,
      y: (i * 11.7 + 5) % 88,
      size: 20 + (i % 5) * 6,
      opacity: 0.025 + (i % 4) * 0.008,
      animClass: i % 3,
      duration: 12 + (i % 6) * 2.5,
      delay: (i * 1.3) % 8,
      initialRotate: (i * 27) % 60 - 30,
    }));

    setItems(generated);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            opacity: item.opacity,
            color: '#D4763C',
            transform: `rotate(${item.initialRotate}deg)`,
            animation: `fp-float-${item.animClass} ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
            {item.type === 'paw' && <PawSVG />}
            {item.type === 'bone' && <BoneSVG />}
            {item.type === 'fish' && <FishSVG />}
            {item.type === 'star' && <StarSVG />}
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes fp-float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(6deg); }
        }
        @keyframes fp-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-10px) rotate(-5deg); }
          70% { transform: translateY(10px) rotate(5deg); }
        }
        @keyframes fp-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(12px) rotate(-7deg); }
          80% { transform: translateY(-8px) rotate(4deg); }
        }
      `}</style>
    </div>
  );
}
