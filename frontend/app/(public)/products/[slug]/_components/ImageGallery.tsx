'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main image */}
      <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-warm-200 mb-4">
        {images?.[activeImage] ? (
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[activeImage]}
            alt={title}
            className="w-full h-full object-contain p-8"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl font-display text-border">C</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1} of ${images.length} for ${title}`}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                activeImage === i
                  ? 'border-accent'
                  : 'border-warm-200 hover:border-warm-300'
              }`}
            >
              <img
                src={img}
                alt={`${title} — image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
