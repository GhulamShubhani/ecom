'use client';

import { useEffect, useState } from 'react';

/**
 * Slim editorial reading-progress indicator pinned to the very top of the
 * viewport. Purely presentational — reflects scroll position of the article.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-60 h-[3px] bg-transparent">
      <div
        className="h-full bg-linear-to-r from-brand-champagne via-brand-clay to-brand-burgundy transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
