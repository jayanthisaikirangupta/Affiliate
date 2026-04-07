'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type AllowedTag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';

interface WordRevealProps {
  /** Plain text to animate word-by-word */
  text: string;
  className?: string;
  /** Extra delay before the animation starts (seconds) */
  delay?: number;
  /** Stagger gap between words (seconds) */
  stagger?: number;
  /** Wrapper element tag */
  as?: AllowedTag;
  /** Forwarded id (for aria-labelledby targets) */
  id?: string;
}

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
  as: Tag = 'h2',
  id,
}: WordRevealProps) {
  // Sentinel div detects when the component enters the viewport —
  // avoids polymorphic ref type conflicts on the Tag element itself.
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, {
    once: true,
    margin: '-8% 0px',
  });

  const words = text.split(' ');

  return (
    <div style={{ position: 'relative' }}>
      {/* Invisible sentinel used purely for scroll detection */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, pointerEvents: 'none' }}
      />
      {/* The actual heading / text element */}
      <Tag
        id={id}
        className={className}
        style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.32em', rowGap: 0 }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 'inherit' }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.55,
                delay: delay + i * stagger,
                ease: easeExpo,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
