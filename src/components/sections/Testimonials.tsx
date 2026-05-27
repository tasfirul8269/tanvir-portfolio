"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Delivered beyond expectations and communicated professionally throughout the entire project.",
    author: "James Wilson",
    role: "CEO, TechStream",
    year: "2024",
    media: "/images/testimonial-1.webp", // Placeholder path
    type: "image"
  },
  {
    quote: "Tanvir's ability to translate complex business requirements into elegant technical solutions is rare.",
    author: "Sarah Chen",
    role: "Product Manager, Innovate HQ",
    year: "2023",
    media: "/images/testimonial-2.webp", // Placeholder path
    type: "image"
  },
  {
    quote: "The fastest developer I've worked with. Performance and design quality are top-notch.",
    author: "Marcus Thorne",
    role: "Founder, Frooxi Digital",
    year: "2024",
    media: "/images/testimonial-3.webp", // Placeholder path
    type: "image"
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay control with reset on manual navigation
  const intervalRef = useRef<number | null>(null);
  const AUTOPLAY_DELAY = 5000;

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_DELAY) as unknown as number;
  }, [stopAutoplay]);

  // Start/stop autoplay based on pause state
  useEffect(() => {
    if (isPaused) {
      stopAutoplay();
      return;
    }
    startAutoplay();
    return () => stopAutoplay();
  }, [isPaused, startAutoplay, stopAutoplay]);

  // Reset autoplay after manual navigation. If paused (hovering), defer restart
  const resetAutoplay = useCallback(() => {
    stopAutoplay();
    if (isPaused) {
      // don't start while hovered — autoplay will restart on mouse leave
      return;
    }
    startAutoplay();
  }, [startAutoplay, stopAutoplay, isPaused]);

  // Swipe handling
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      prevTestimonial();
      resetAutoplay();
    } else if (info.offset.x < -100) {
      nextTestimonial();
      resetAutoplay();
    }
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-[70vh] md:min-h-screen bg-[#F5F2ED] py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] flex flex-col justify-center snap-start overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-sans font-bold text-black/30 block mb-4">Social Proof</span>
          <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tighter uppercase text-black leading-none">
            Trusted <br /> by Clients
          </h2>
        </motion.div>

        <div className="relative min-h-[400px] flex flex-col justify-center cursor-grab active:cursor-grabbing">
          {/* Animated Media Reveal on Hover */}
          <AnimatePresence>
            {isHovered && testimonials[activeIndex].media && (
              <motion.div
                initial={{ opacity: 0, y: 40, x: 40, rotate: 0 }}
                animate={{ opacity: 1, y: -120, x: 100, rotate: -8 }}
                exit={{ opacity: 0, y: 40, x: 40, rotate: 0 }}
                className="absolute top-0 right-0 z-30 hidden lg:block pointer-events-none"
              >
                <div className="relative w-64 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <div className="absolute inset-0 bg-black/10 z-10" />
                  {/* Using a colored div as fallback if image isn't found */}
                  <div className="absolute inset-0 bg-[#3D43D1]/20" /> 
                  <Image 
                    src={testimonials[activeIndex].media} 
                    alt={testimonials[activeIndex].author}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                     <span className="text-[10px] text-white uppercase font-bold tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm">Verified Client</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex flex-col gap-8 md:gap-12 select-none"
            >
              <Quote size={40} className="text-black/10" strokeWidth={1.5} />
              
              <blockquote className="text-2xl md:text-5xl font-serif italic leading-[1.2] text-black tracking-tight max-w-4xl">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 border-t border-black/5">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-sans font-bold uppercase tracking-tight text-black">
                    {testimonials[activeIndex].author}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
                    {testimonials[activeIndex].role}
                  </span>
                </div>
                
                <span className="text-[10px] font-sans font-black text-black/10 tracking-widest">
                  EST. {testimonials[activeIndex].year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-4 mt-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => { setActiveIndex(index); resetAutoplay(); }}
              className="group relative py-4"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div 
                className={`h-0.5 transition-all duration-500 bg-black ${activeIndex === index ? 'w-12' : 'w-4 opacity-20 group-hover:opacity-40'}`} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Large background quote mark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] pointer-events-none translate-x-1/4 hidden lg:block">
        <Quote size={600} className="text-black" strokeWidth={1} />
      </div>
    </section>
  );
};
