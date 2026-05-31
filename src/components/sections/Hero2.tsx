"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

function HeadlineWithGif() {
  const [isHovered, setIsHovered] = useState(false);
  const [leftPx, setLeftPx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstLetterRef = useRef<HTMLSpanElement | null>(null);

  const updatePosition = () => {
    if (!containerRef.current || !firstLetterRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstRect = firstLetterRef.current.getBoundingClientRect();
    const left = firstRect.right - containerRect.left;
    setLeftPx(left);
  };

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
          className="text-[clamp(3.5rem,20vw,18rem)] leading-[0.82] font-sans font-black uppercase tracking-[-0.05em] text-white whitespace-nowrap"
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

// ---------------------------------------------------------------------------
// ScrollBlurLayer — wraps a child and applies scroll-driven translateY + blur
// speed controls how fast it moves (higher = more parallax)
// blurMax controls max blur in px at full scroll
// ---------------------------------------------------------------------------
function ScrollBlurLayer({
  children,
  speed = 120,
  blurMax = 12,
  sectionRef,
  scrollContainerRef,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  blurMax?: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // As user scrolls hero out: move up + blur
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -speed]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  // blur: 0px at scroll=0, blurMax at scroll=0.6 (fully gone before section ends)
  const blur = useTransform(scrollYProgress, [0, 0.6], [0, blurMax]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        filter: blur ? undefined : undefined,
        WebkitFilter: undefined,
      }}
      className={className}
    >
      {/* Inner div handles blur separately so it doesn't fight with opacity */}
      <motion.div
        style={{
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          WebkitFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export const Hero2 = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollContainerRef.current = document.getElementById(
      "main-scroll-container"
    ) as HTMLElement | null;
  }, []);

  const sharedProps = { sectionRef, scrollContainerRef };

  return (
    <section
      ref={sectionRef}
      id="hero2"
      className="relative min-h-[70vh] md:min-h-screen bg-black text-white overflow-hidden snap-start"
    >
      {/* Radial blur overlay when text is hovered */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTextHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter: isTextHovered ? 'blur(3px)' : 'blur(0px)',
          WebkitBackdropFilter: isTextHovered ? 'blur(3px)' : 'blur(0px)',
          maskImage: 'radial-gradient(circle at 30% 60%, transparent 25%, black 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 30% 60%, transparent 25%, black 60%)',
        }}
      />

      <div className="relative flex min-h-[70vh] md:min-h-screen items-center px-8 md:px-16 xl:pl-[160px] xl:pr-24">
        <div className="max-w-7xl w-full">

          {/* Headline — fastest, most blur */}
          <ScrollBlurLayer speed={160} blurMax={16} {...sharedProps}>
            <motion.div
              animate={{
                opacity: isTextHovered ? 0.5 : 1,
                scale: isTextHovered ? 0.98 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <HeadlineWithGif />
            </motion.div>
          </ScrollBlurLayer>

          <div className="mt-14 max-w-3xl space-y-8">
            {/* Divider line — medium speed */}
            <ScrollBlurLayer speed={100} blurMax={8} {...sharedProps}>
              <motion.div
                className="flex items-center gap-4"
                animate={{
                  opacity: isTextHovered ? 0.5 : 1,
                  scale: isTextHovered ? 0.98 : 1
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="block h-px w-20 bg-white/40" />
                <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-sans">The Thoughts</span>
              </motion.div>
            </ScrollBlurLayer>

            {/* Body text — slowest, least blur */}
            <ScrollBlurLayer speed={60} blurMax={6} {...sharedProps}>
              <motion.p
                onMouseEnter={() => setIsTextHovered(true)}
                onMouseLeave={() => setIsTextHovered(false)}
                animate={{
                  scale: isTextHovered ? 1.03 : 1,
                  y: isTextHovered ? -4 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                className="text-2xl md:text-4xl font-sans font-bold leading-[1.05] text-white/90 max-w-4xl cursor-pointer relative z-10"
                style={{ willChange: 'transform' }}
              >
                I bring ideas to life through sleek, innovative design, crafting experiences that go beyond visuals to captivate and engage.
              </motion.p>
            </ScrollBlurLayer>
          </div>
        </div>
      </div>

      {/* Circular video button — drifts up slightly */}
      <ScrollBlurLayer speed={80} blurMax={6} {...sharedProps} className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
        <motion.button
          type="button"
          onClick={() => setIsVideoOpen(true)}
          animate={{
            opacity: isTextHovered ? 0.5 : 1,
            scale: isTextHovered ? 0.95 : 1
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 h-32 md:w-60 md:h-60 rounded-full overflow-hidden cursor-pointer"
          style={{ willChange: 'transform, opacity' }}
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
        </motion.button>
      </ScrollBlurLayer>

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
