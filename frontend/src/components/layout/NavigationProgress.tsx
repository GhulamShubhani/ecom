'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * A lightweight, dependency-free top progress bar that gives instant visual
 * feedback the moment a user clicks a link or triggers navigation, then
 * completes once the new route commits. Themed with the brand red/neon.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTrickle = () => {
    if (trickleRef.current) {
      clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (hideRef.current) clearTimeout(hideRef.current);
    stopTrickle();
    setVisible(true);
    setProgress(8);
    // Creep toward ~90% so the bar feels alive while the route loads.
    trickleRef.current = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.max(0.4, (90 - p) * 0.07) : p));
    }, 180);
  }, []);

  const finish = useCallback(() => {
    stopTrickle();
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
  }, []);

  // Complete the bar whenever a navigation commits (pathname changes).
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => finish(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, visible, finish]);

  // Start the bar the instant a same-origin link is clicked.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');
      if (!href || href.startsWith('#') || (target && target !== '_self')) return;

      try {
        const next = new URL(href, window.location.href);
        if (next.origin !== window.location.origin) return;
        if (
          next.pathname === window.location.pathname &&
          next.search === window.location.search
        ) {
          return;
        }
        start();
      } catch {
        /* ignore malformed hrefs */
      }
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      stopTrickle();
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, [start]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-[3px]"
      aria-hidden="true"
    >
      <div
        className="h-full rounded-r-full bg-linear-to-r from-brand-red via-brand-neon to-brand-red shadow-[0_0_12px_rgba(255,23,68,0.75)] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
