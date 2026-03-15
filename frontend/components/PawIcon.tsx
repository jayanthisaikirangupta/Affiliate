export function PawIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 17.5c-2.5 0-4.5-1.2-5.2-3.1-.4-1 .1-2.2.8-3.1.9-1.1 2.2-1.8 3.2-2.4.5-.3 1-.4 1.2-.4s.7.1 1.2.4c1 .6 2.3 1.3 3.2 2.4.7.9 1.2 2.1.8 3.1-.7 1.9-2.7 3.1-5.2 3.1z"/>
      <ellipse cx="6.2" cy="7.5" rx="1.8" ry="2.2" transform="rotate(-15 6.2 7.5)"/>
      <ellipse cx="17.8" cy="7.5" rx="1.8" ry="2.2" transform="rotate(15 17.8 7.5)"/>
      <ellipse cx="9" cy="5.8" rx="1.6" ry="2" transform="rotate(-5 9 5.8)"/>
      <ellipse cx="15" cy="5.8" rx="1.6" ry="2" transform="rotate(5 15 5.8)"/>
    </svg>
  );
}
