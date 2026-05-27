"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeadlineWithGif() {
  const [isHovered, setIsHovered] = useState(false);
  const [leftPx, setLeftPx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstLetterRef = useRef<HTMLSpanElement | null>(null);

  const updatePosition = () => {
    if (!containerRef.current || !firstLetterRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstRect = firstLetterRef.current.getBoundingClientRect();
    const left = firstRect.right - containerRect.left; // position just after 'T'
    setLeftPx(left);
  };

  // update on mount and resize
  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        onMouseEnter={() => { setIsHovered(true); updatePosition(); }}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-block"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[clamp(8rem,22vw,18rem)] leading-[0.82] font-sans font-black uppercase tracking-[-0.05em] text-white whitespace-nowrap"
        >
          <span ref={firstLetterRef}>T</span>
          <span>anvir</span>
        </motion.h1>
      </div>

      <AnimatePresence>
        {isHovered && leftPx !== null && (
            <motion.div
            key="gif"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="pointer-events-none absolute z-30"
                style={{ left: leftPx !== null ? leftPx - 94 : 0, transform: 'translateX(-50%)', bottom: -120 }}
          >
            <img src="/images/hello.gif" alt="hello" className="h-48 md:h-96 block" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Hero2 = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="hero2" className="relative min-h-screen bg-black text-white overflow-hidden snap-start">
      {/* Top bar intentionally removed — header will provide navigation */}

      <div className="relative flex min-h-screen items-center justify-center px-8 md:px-16">
        <div className="max-w-7xl w-full">
          {/* Headline with hover GIF */}
          <HeadlineWithGif />

          <div className="mt-14 max-w-3xl space-y-8">
            <div className="flex items-center gap-4">
              <span className="block h-px w-20 bg-white/40" />
              <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-sans">The Thoughts</span>
            </div>

            <p className="text-2xl md:text-4xl font-sans font-bold leading-[1.05] text-white/90 max-w-4xl">
              I bring ideas to life through sleek, innovative design, crafting experiences that go beyond visuals to captivate and engage.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsVideoOpen(true)}
        className="absolute bottom-10 right-10 z-20 w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 240 240" className="w-full h-full animate-spin" style={{ animationDuration: '18s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}>
            <defs>
              <path id="circlePath" d="M120,120 m0,-100 a100,100 0 1,1 0,200 a100,100 0 1,1 0,-200" />
            </defs>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text fontSize="12" letterSpacing="1.3" fill="white" stroke="none">
              <textPath href="#circlePath" startOffset="0">
                Check my intro video • Check my intro video • Check my intro video •Check my intro video • Check my intro video •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }} />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          >
            <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl">
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              >
                Close
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YEzSwRHli3A?autoplay=1"
                title="Intro Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
