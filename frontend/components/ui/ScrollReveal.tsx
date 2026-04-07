'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'scale' | 'blur';
  duration?: number;
  staggerIndex?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  staggerIndex = 0,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Expo out easing curve for more dramatic reveals
  const easeOutExpo = [0.16, 1, 0.3, 1];

  // Calculate staggered delay based on index
  const totalDelay = delay + (staggerIndex * 0.1);

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
    scale: { scale: 0.92 },
    blur: { filter: 'blur(8px)' },
  };

  const initialState: Record<string, any> = {
    opacity: 0,
    ...directionMap[direction],
  };

  // Add scale to initial state for scale direction
  if (direction === 'scale') {
    initialState.scale = 0.92;
  }

  // Add blur to initial state for blur direction
  if (direction === 'blur') {
    initialState.filter = 'blur(8px)';
  }

  const animateState: Record<string, any> = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  // Add scale to animate state for scale direction
  if (direction === 'scale') {
    animateState.scale = 1;
  }

  // Add blur to animate state for blur direction
  if (direction === 'blur') {
    animateState.filter = 'blur(0px)';
  }

  return (
    <motion.div
      ref={ref}
      initial={initialState}
      animate={isInView ? animateState : {}}
      transition={{
        duration,
        delay: totalDelay,
        ease: easeOutExpo,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
