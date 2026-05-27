"use client";

import { useState, useEffect, useRef } from "react";

export type ScrollDirection = "up" | "down" | null;

/**
 * Hook to detect scroll direction
 * Uses passive event listeners and requestAnimationFrame for performance
 */
export const useScrollDirection = (containerId?: string, threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : window;
    if (!container) return;

    const getScrollY = () => {
      if (container instanceof Window) {
        return container.scrollY;
      }
      return container.scrollTop;
    };

    lastScrollY.current = getScrollY();

    const updateScrollDirection = () => {
      const scrollY = getScrollY();

      if (Math.abs(scrollY - lastScrollY.current) < threshold) {
        ticking.current = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => container.removeEventListener("scroll", onScroll);
  }, [containerId, threshold]);

  return scrollDirection;
};
