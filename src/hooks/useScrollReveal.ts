"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Reveals an element once it scrolls into view.
 * Usage: const { ref, visible } = useScrollReveal(); <section ref={ref} className={visible ? "visible" : ""}>
 * Uses a callback ref (not a ref object) so it is safe to read during render.
 */
export function useScrollReveal(threshold = 0.15) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const ref = useCallback((el: HTMLElement | null) => setNode(el), []);

  useEffect(() => {
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, visible]);

  return { revealRef: ref, visible };
}
