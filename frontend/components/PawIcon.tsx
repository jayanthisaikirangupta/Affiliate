import { useId } from "react";

export function PawIcon({
  className,
  accentColor = "#D4763C",
}: {
  className?: string;
  accentColor?: string;
}) {
  const id = useId();
  const clipId = `paw-upper-clip-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* Clip that keeps only the upper portion of the main pad */}
        <clipPath id={clipId}>
          <path d="M4 0h16v14.8c0 0-2.5 1.2-8 1.2s-8-1.2-8-1.2z" />
        </clipPath>
      </defs>

      {/* Toe pads — 4 ellipses arranged in an arc */}
      <ellipse cx="6.2" cy="7.5" rx="1.8" ry="2.2" transform="rotate(-15 6.2 7.5)" fill="currentColor" />
      <ellipse cx="9" cy="5.8" rx="1.6" ry="2" transform="rotate(-5 9 5.8)" fill="currentColor" />
      <ellipse cx="15" cy="5.8" rx="1.6" ry="2" transform="rotate(5 15 5.8)" fill="currentColor" />
      <ellipse cx="17.8" cy="7.5" rx="1.8" ry="2.2" transform="rotate(15 17.8 7.5)" fill="currentColor" />

      {/* Main pad — full shape in accent color (lower portion visible) */}
      <path
        d="M12 17.5c-2.5 0-4.5-1.2-5.2-3.1-.4-1 .1-2.2.8-3.1.9-1.1 2.2-1.8 3.2-2.4.5-.3 1-.4 1.2-.4s.7.1 1.2.4c1 .6 2.3 1.3 3.2 2.4.7.9 1.2 2.1.8 3.1-.7 1.9-2.7 3.1-5.2 3.1z"
        fill={accentColor}
      />

      {/* Main pad — upper portion clipped to currentColor */}
      <path
        d="M12 17.5c-2.5 0-4.5-1.2-5.2-3.1-.4-1 .1-2.2.8-3.1.9-1.1 2.2-1.8 3.2-2.4.5-.3 1-.4 1.2-.4s.7.1 1.2.4c1 .6 2.3 1.3 3.2 2.4.7.9 1.2 2.1.8 3.1-.7 1.9-2.7 3.1-5.2 3.1z"
        fill="currentColor"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}
