"use client";

import React, { useRef, useEffect } from "react";
import { useInView, useScroll, useTransform, motion } from "framer-motion";
import { useSidebarStore } from "@/store/sidebarStore";

// ---------------------------------------------------------------------------
// SpinningAsterisk — 6-blade asterisk that rotates on scroll
// ---------------------------------------------------------------------------
function SpinningAsterisk({ sectionRef, scrollContainerRef }: {
  sectionRef: React.RefObject<HTMLElement | null>;
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // 6 blades, each rotated 60° apart
  const blades = Array.from({ length: 6 }, (_, i) => i * 60);

  return (
    <motion.div
      style={{ rotate }}
      className="w-48 h-48 md:w-64 md:h-64 will-change-transform"
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {blades.map((angle) => (
          <rect
            key={angle}
            x="44"
            y="8"
            width="12"
            height="38"
            rx="3"
            fill="#1D3BB3"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Stars — 5 actual star characters
// ---------------------------------------------------------------------------
function Stars() {
  return (
    <div className="flex gap-[2px] items-center">
      {[0,1,2,3,4].map(i => (
        <span key={i} className="text-black text-[11px] leading-none">★</span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuoteText — matches reference: large, medium weight, first-line indent
// ---------------------------------------------------------------------------
function QuoteText({ children, pushDown = false }: { children: string; pushDown?: boolean }) {
  return (
    <p
      className={`text-[1.35rem] font-sans font-medium text-black leading-[1.4] ${pushDown ? "mt-auto" : ""}`}
      style={{ textIndent: "2.2em" }}
    >
      {children}
    </p>
  );
}
export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const { setHidden } = useSidebarStore();
  const isInView = useInView(sectionRef, { amount: 0.1 });

  useEffect(() => {
    scrollContainerRef.current = document.getElementById("main-scroll-container") as HTMLElement | null;
  }, []);

  useEffect(() => {
    setHidden(isInView);
    return () => setHidden(false);
  }, [isInView, setHidden]);

  // Fixed column height so all 4 columns are equal
  const COL_H = "h-[520px]";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-[#F5F2ED] py-14 px-6 md:px-14 xl:px-20 overflow-hidden"
    >
      {/* ── Spinning asterisk — top right, behind columns ── */}
      <div className="absolute top-24 right-4 md:top-32 md:right-8 z-0 opacity-60 pointer-events-none">
        <SpinningAsterisk sectionRef={sectionRef} scrollContainerRef={scrollContainerRef} />
      </div>

      {/* ── Header ── */}
      <div className="mb-10">
        {/* Top-left label */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-[7px] h-[7px] rounded-full bg-black" />
          <span className="text-[11px] font-sans font-medium text-black tracking-wide">
            Testimonials
          </span>
        </div>

        {/* Centred heading */}
        <div className="text-center">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-sans font-black text-black tracking-[-0.03em] leading-none">
            Experiences.
          </h2>
          <p className="text-[13px] font-sans text-black/50 mt-2 tracking-wide">©2025</p>
        </div>
      </div>

      {/* ── 4-column grid — all same height ── */}
      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-4 gap-1 ${COL_H}`}>

        {/* ── Col 1: Rating card ── */}
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full">
          {/* Top: rating */}
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-[2.8rem] font-sans font-black text-black leading-none">4.9</span>
              <span className="text-[13px] font-sans text-black/40">/5</span>
            </div>
            <p className="text-[12px] font-sans text-black/50 leading-[1.6]">
              We've delivered{" "}
              <span className="font-bold text-black">56+ projects</span>{" "}
              that help companies generate real results.
            </p>
          </div>

          <div className="flex flex-col gap-3">
          {/* Middle: brand + avatars */}
          <div>
            <p className="text-[13px] font-sans font-bold text-black mb-3">fabrica®</p>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex -space-x-2">
                {[11,32,47,68,15].map(id => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/28?img=${id}`}
                    alt=""
                    className="w-7 h-7 rounded-[6px] ring-2 ring-white object-cover"
                  />
                ))}
              </div>
              <div className="w-7 h-7 rounded-[6px] bg-black flex items-center justify-center -ml-6">
                <span className="text-white text-[9px] font-bold">56+</span>
              </div>
              <div className="flex flex-col gap-1 ml-3">
              <Stars />
              <p className="text-[10px] font-sans text-black/40 mt-1">
              Trusted by <span className="font-semibold text-black/60">clients worldwide</span>
            </p>
            </div>
            </div>
            
          </div>

          {/* Bottom: CTA */}
          <button className="w-full bg-black text-white font-sans font-semibold text-[13px] py-3 rounded-full hover:bg-black/80 transition-colors">
            Leave a review
          </button>
          </div>
        </div>

        {/* ── Col 2: Single card — profile top, stars, quote bottom ── */}
        <div className="flex flex-col gap-1 h-full">
          {/* Bottom card: profile only */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="Emily Davis"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-[14px] font-sans font-semibold text-black leading-tight">Emily Davis</p>
              <p className="text-[12px] font-sans text-black/40 font-normal">StartUp Hub</p>
            </div>
          </div>
          {/* Top card: quote only, stars+plus at top */}
          <div className="bg-white rounded-2xl p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <Stars />
              <span className="text-black/30 text-xl font-sans font-light leading-none">+</span>
            </div>
            <QuoteText pushDown>A smooth process from start to finish. Highly professional team!</QuoteText>
          </div>
        </div>

        {/* ── Col 3: Review card top + profile card bottom ── */}
        <div className="flex flex-col gap-1 h-full">
          {/* Top card: quote at top, stars+plus at bottom */}
          <div className="bg-white rounded-2xl p-5 flex flex-col flex-1">
            <QuoteText>A smooth process from start to finish. Highly professional team!</QuoteText>
            <div className="flex items-center justify-between mt-auto pt-4">
              <Stars />
              <span className="text-black/30 text-xl font-sans font-light leading-none">+</span>
            </div>
          </div>

          {/* Bottom card: profile only */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="Emily Davis"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-[14px] font-sans font-semibold text-black leading-tight">Emily Davis</p>
              <p className="text-[12px] font-sans text-black/40 font-normal">StartUp Hub</p>
            </div>
          </div>
        </div>

        {/* ── Col 4: Single card — profile top, stars, quote bottom ── */}
        <div className="flex flex-col gap-1 h-full">
          {/* Bottom card: profile only */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="Emily Davis"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-[14px] font-sans font-semibold text-black leading-tight">Emily Davis</p>
              <p className="text-[12px] font-sans text-black/40 font-normal">StartUp Hub</p>
            </div>
          </div>
          {/* Quote card: quote only, stars+plus at top */}
          <div className="bg-white rounded-2xl p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <Stars />
              <span className="text-black/30 text-xl font-sans font-light leading-none">+</span>
            </div>
            <QuoteText pushDown>A smooth process from start to finish. Highly professional team!</QuoteText>
          </div>
        </div>

      </div>
    </section>
  );
};
