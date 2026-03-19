'use client';

import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function TrackView({ productId }: { productId: string }) {
  useEffect(() => {
    fetch(`${API_URL}/analytics/view/${productId}`, { method: 'POST' }).catch(() => {});
  }, [productId]);

  return null;
}
