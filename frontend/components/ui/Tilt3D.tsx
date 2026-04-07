'use client';

import { useState, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  glowIntensity?: number;
  scale?: number;
  borderGlow?: boolean;
}

export const Tilt3D = ({
  children,
  className = '',
  intensity = 15,
  glowColor = 'rgba(245,130,32,0.15)',
  glowIntensity = 0.3,
  scale = 1.02,
  borderGlow = true,
}: Tilt3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glow position
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Spring configuration for smooth animation
  const springConfig = { damping: 20, mass: 0.5, stiffness: 300 };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const glowSpringX = useSpring(glowX, { damping: 25, mass: 0.5, stiffness: 250 });
  const glowSpringY = useSpring(glowY, { damping: 25, mass: 0.5, stiffness: 250 });

  // Transform mouse coordinates to rotation angles
  const rotateX = useTransform(springY, [-1, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-1, 1], [-intensity, intensity]);

  // Shadow offset based on tilt
  const shadowOffsetX = useTransform(springX, [-1, 1], [-10, 10]);
  const shadowOffsetY = useTransform(springY, [-1, 1], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Normalize coordinates to -1 to 1 range
    const normalizedX = (x / (rect.width / 2)) * 0.5;
    const normalizedY = (y / (rect.height / 2)) * 0.5;

    // Clamp values to -1 to 1
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    mouseX.set(clampedX);
    mouseY.set(clampedY);

    // Set glow position (in percentage for radial-gradient)
    const glowPercentX = ((x + rect.width / 2) / rect.width) * 100;
    const glowPercentY = ((y + rect.height / 2) / rect.height) * 100;

    glowX.set(glowPercentX);
    glowY.set(glowPercentY);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative w-full h-full ${className}`}
      style={{
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Main tilt container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background with glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${glowSpringX}% ${glowSpringY}%, ${glowColor} 0%, rgba(245,130,32,0) 60%)`
              : 'radial-gradient(circle at 50% 50%, rgba(245,130,32,0) 0%, rgba(245,130,32,0) 100%)',
            opacity: isHovering ? glowIntensity : 0,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: isHovering
              ? `0 0 20px rgba(245,130,32,0.4), 0 0 40px rgba(245,130,32,0.2), inset 0 0 20px rgba(245,130,32,0.1)`
              : '0 0 0px rgba(245,130,32,0)',
            zIndex: 0,
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />

        {/* Content wrapper with scale animation */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovering ? `scale(${scale})` : 'scale(1)',
            zIndex: 2,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Enhanced shadow that responds to tilt */}
      <motion.div
        className="absolute -inset-8 rounded-lg bg-black/5 blur-2xl pointer-events-none"
        style={{
          x: shadowOffsetX,
          y: shadowOffsetY,
          zIndex: -1,
        }}
      />
    </motion.div>
  );
};

export default Tilt3D;
