"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { TextReveal } from "@/registry/magicui/text-reveal";

// ---------------------------------------------------------------------------
// parseStatValue
// ---------------------------------------------------------------------------
function parseStatValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

// ---------------------------------------------------------------------------
// AnimatedNumber
// ---------------------------------------------------------------------------
function AnimatedNumber({ value, duration = 1.8, className }: {
  value: string; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { num, prefix, suffix } = parseStatValue(value);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, num, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        const padded = value.match(/^0\d/) ? String(rounded).padStart(2, "0") : String(rounded);
        setDisplay(padded);
      },
    });
    return () => controls.stop();
  }, [isInView, num, duration]);

  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>;
}

// ---------------------------------------------------------------------------
// Eye — a single eye that tracks the cursor
// ---------------------------------------------------------------------------
function Eye({ cx, cy, size = 28, pupilSize = 11 }: {
  cx: number; cy: number; size?: number; pupilSize?: number;
}) {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<SVGCircleElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!eyeRef.current) return;
    const rect = eyeRef.current.closest("svg")!.getBoundingClientRect();
    // cursor position relative to SVG centre
    const svgCx = rect.left + rect.width / 2;
    const svgCy = rect.top + rect.height / 2;
    const dx = e.clientX - (rect.left + (cx / 200) * rect.width);
    const dy = e.clientY - (rect.top + (cy / 200) * rect.height);
    const angle = Math.atan2(dy, dx);
    const maxTravel = size * 0.22;
    setPupil({ x: Math.cos(angle) * maxTravel, y: Math.sin(angle) * maxTravel });
  }, [cx, cy, size]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <g>
      {/* White sclera */}
      <circle ref={eyeRef} cx={cx} cy={cy} r={size} fill="white" />
      {/* Black pupil — tracks cursor */}
      <motion.circle
        cx={cx + pupil.x}
        cy={cy + pupil.y}
        r={pupilSize}
        fill="black"
        animate={{ cx: cx + pupil.x, cy: cy + pupil.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </g>
  );
}

// ---------------------------------------------------------------------------
// CharacterWidget — the illustrated element for bottom-right
// ---------------------------------------------------------------------------
function CharacterWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-64 h-64 md:w-80 md:h-80 select-none"
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

        {/* ── Top-left: blue squircle tile — stacked above pink, both bottom-aligned to ghost ── */}
        <rect x="44" y="84" width="58" height="58" rx="14" fill="#4FC3F7" />

        {/* ── Top-right: orange 4-petal flower — left edge touches blue tile right edge (x=102) ── */}
        {/* flower centre at (142, 113) — leftmost point of left petal = 142-20-20 = 102 */}
        <circle cx="142" cy="133" r="20" fill="#F97316" />
        <circle cx="142" cy="93"  r="20" fill="#F97316" />
        <circle cx="122" cy="113" r="20" fill="#F97316" />
        <circle cx="162" cy="113" r="20" fill="#F97316" />
        {/* Centre diamond */}
        <rect x="135" y="106" width="14" height="14" rx="2" fill="#FCD34D" transform="rotate(45 142 113)" />
        {/* Sparkle */}
        <path d="M162 84 L164 89 L169 91 L164 93 L162 98 L160 93 L155 91 L160 89 Z" fill="white" />
        <circle cx="172" cy="82" r="3" fill="white" />

        {/* ── Bottom-left: pink tile — bottom-aligned with ghost (y=142→200) ── */}
        <rect x="44" y="142" width="58" height="58" rx="14" fill="#F472B6" />
        {/* 4-pointed star */}
        <path d="M73 150 L76 164 L90 167 L76 170 L73 184 L70 170 L56 167 L70 164 Z" fill="#FCD34D" />

        {/* ── Yellow ghost — bottom-right, unchanged ── */}
        <path
          d="M102 200 L102 150 Q102 108 152 108 Q200 108 200 150 L200 200 Z"
          fill="#FCD34D"
        />
        <Eye cx={132} cy={158} size={16} pupilSize={7} />
        <Eye cx={168} cy={158} size={16} pupilSize={7} />
      </svg>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export const Stats = () => {
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollContainerRef.current = document.getElementById(
      "main-scroll-container"
    ) as HTMLElement | null;
  }, []);
  return (
    <section className="relative min-h-[70vh] md:h-screen flex items-center py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] xl:pr-24 bg-[#F5F2ED] text-black font-serif overflow-hidden">

      {/* Character — absolutely pinned to bottom-right of section, behind content */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none md:pointer-events-auto">
        <CharacterWidget />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
          {portfolioData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-2"
            >
              <AnimatedNumber
                value={stat.value}
                duration={1.6 + index * 0.15}
                className="text-4xl md:text-6xl font-sans font-bold"
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 md:mt-48 flex flex-col md:flex-row items-start gap-12"
        >
          <div className="flex-1">
            <TextReveal
              scrollContainer={scrollContainerRef}
              className="text-3xl md:text-5xl font-sans font-bold leading-tight"
            >
              {`Co-Founder of ${portfolioData.founderOf}. Understand Industry, Make Profitable Solutions.`}
            </TextReveal>
          </div>
          <div className="flex-1 text-black/60 text-lg leading-relaxed max-w-xl font-serif">
            <p>
              I always follow a simple philosophy, deeply understand the industry and user needs,
              then craft solutions that are not only innovative but also profitable. My approach
              combines strategic thinking with hands-on execution to deliver real business value.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
