"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const interests = [
  {
    title: "Anime",
    description: "I enjoy anime storytelling and visual aesthetics. It influences how I think about creativity and world-building.",
    color: "#FF3E00", // A subtle accent color for the reveal
  },
  {
    title: "Building",
    description: "I enjoy turning ideas into real products. The transition from zero to one is where the magic happens.",
    color: "#3D43D1",
  },
  {
    title: "Problem Solving",
    description: "I like breaking complex systems into simple solutions. Finding the elegant path is my obsession.",
    color: "#000000",
  },
  {
    title: "Startups",
    description: "Deeply interested in business, growth, and product strategy. Engineering is the engine, business is the destination.",
    color: "#1DB954",
  },
];

export const BeyondCode = () => {
  const [activeInterest, setActiveInterest] = useState<number | null>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for the "Floating Lens"
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the floating element
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      id="beyond" 
      className="relative hidden md:flex min-h-[70vh] md:min-h-screen bg-[#F5F2ED] overflow-hidden flex-col justify-start pt-36 md:pt-44 snap-start cursor-none"
      onMouseEnter={() => setIsPointerInside(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setActiveInterest(null);
        setIsPointerInside(false);
      }}
    >
      {/* Background Section Header */}
      <div className="absolute top-24 left-8 md:left-16 xl:left-32 z-10">
        <span className="text-[10px] uppercase tracking-[0.6em] font-sans font-bold text-black/30 block mb-4">The Human Behind</span>
        <h2 className="text-2xl font-sans font-bold tracking-tighter uppercase text-black">
          Beyond Development
        </h2>
      </div>

      {/* Main Interactive List */}
      <div className="relative z-20 px-8 md:px-16 xl:pl-32">
        <div className="flex flex-col gap-2 md:gap-4">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              onMouseEnter={() => setActiveInterest(index)}
              className="relative group py-2"
            >
              <h3 
                className={`text-[12vw] md:text-[8vw] font-sans font-black uppercase leading-none tracking-tighter transition-all duration-700 select-none
                  ${activeInterest === index ? 'text-black opacity-100' : 'text-black/5 opacity-40'}
                  ${activeInterest !== null && activeInterest !== index ? 'blur-[2px]' : 'blur-0'}
                `}
              >
                {interest.title}
              </h3>
              
              {/* Desktop-only indicator line */}
              <motion.div 
                className="hidden md:block absolute left-0 bottom-0 h-px bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeInterest === index ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Floating "Lens" (Visible on Hover) */}
      <motion.div
        className="pointer-events-none fixed z-50 items-center justify-center"
        style={{
          display: isPointerInside ? 'flex' : 'none',
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
      >
        <AnimatePresence mode="wait">
          {activeInterest !== null && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="w-[300px] h-[300px] rounded-full bg-black flex items-center justify-center p-12 text-center text-white overflow-hidden relative shadow-2xl"
            >
              {/* Pulsing Accent Color */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{ 
                  backgroundColor: interests[activeInterest].color,
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10 flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-white/40">
                  {interests[activeInterest].title}
                </span>
                <p className="text-sm font-serif leading-relaxed">
                  {interests[activeInterest].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile-only fallback (since hover doesn't work well on touch) */}
      <div className="md:hidden px-8 mt-12 space-y-8">
        {interests.map((interest) => (
          <div key={interest.title} className="space-y-2">
            <h4 className="text-xs uppercase font-sans font-bold tracking-widest text-black/30">{interest.title}</h4>
            <p className="text-sm font-serif leading-relaxed text-black/60">{interest.description}</p>
          </div>
        ))}
      </div>

      {/* Custom Cursor Circle */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-black/20 z-[60] hidden md:block"
        style={{
          display: isPointerInside ? 'block' : 'none',
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
          scale: activeInterest !== null ? 0 : 1
        }}
      />
    </section>
  );
};
