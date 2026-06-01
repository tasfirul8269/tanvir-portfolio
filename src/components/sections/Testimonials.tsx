"use client";

import React, { useRef, useEffect, useState } from "react";
import { useInView, useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSidebarStore } from "@/store/sidebarStore";
import { portfolioData } from "@/data/portfolio";
import { X, Star, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-[2px] items-center">
      {Array.from({ length: count }).map((_, i) => (
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
      className={`text-[1.35rem] font-sans font-normal md:font-medium text-black leading-[1.4] ${pushDown ? "mt-auto" : ""}`}
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

  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof portfolioData.testimonials[number] | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [rating, setRating] = useState(5);

  // Carousel state
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    scrollContainerRef.current = document.getElementById("main-scroll-container") as HTMLElement | null;
  }, []);

  useEffect(() => {
    setHidden(isInView);
    return () => setHidden(false);
  }, [isInView, setHidden]);

  // Auto-play logic
  useEffect(() => {
    if (!isInView || isHovered || isReviewModalOpen || selectedTestimonial) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = carouselRef.current;
        const maxScroll = scrollWidth - offsetWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to the next item
          carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isHovered, isReviewModalOpen, selectedTestimonial]);

  const handleLeaveReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      role: formData.get('role'),
      rating: rating,
      content: formData.get('content'),
    };

    try {
      // We still try to send it, but we'll show success even if it fails for now as requested
      await fetch('/api/send-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("Email sending failed (likely due to missing credentials), but showing success as requested.");
    }
    
    setReviewStatus('success');
    
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewStatus('idle');
    }, 2500);
  };

  const testimonials = portfolioData.testimonials;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-[#F5F2ED] py-14 md:py-20 px-6 md:px-14 xl:px-20 overflow-hidden snap-start"
    >
      {/* ── Spinning asterisk — top right, behind columns ── */}
      <div className="absolute top-24 right-4 md:top-32 md:right-8 z-0 opacity-60 pointer-events-none">
        <SpinningAsterisk sectionRef={sectionRef} scrollContainerRef={scrollContainerRef} />
      </div>

      {/* ── Header ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-[7px] h-[7px] rounded-full bg-black" />
          <span className="text-[11px] font-sans font-medium text-black tracking-wide">
            Testimonials
          </span>
        </div>

        <div className="text-center">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-sans font-black text-black tracking-[-0.03em] leading-none">
            Experiences.
          </h2>
          <p className="text-[13px] font-sans text-black/50 mt-2 tracking-wide">©2025</p>
        </div>
      </div>

      {/* ── Carousel Container ── */}
      <div 
        className="relative z-10 flex gap-4 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Rating card - Fixed width in carousel */}
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-[480px] w-[300px] md:w-[350px] shrink-0 snap-start">
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-[2.8rem] font-sans font-black text-black leading-none">5.0</span>
              <span className="text-[13px] font-sans text-black/40">/5</span>
            </div>
            <p className="text-[12px] font-sans text-black/50 leading-[1.6]">
              We&apos;ve delivered{" "}
              <span className="font-bold text-black">20+ projects</span>{" "}
              with 100% client satisfaction.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[13px] font-sans font-bold text-black mb-3">frooxi®</p>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 5).map((t, i) => (
                    <Image
                      key={i}
                      src={t.image}
                      alt={t.name}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-[6px] ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1 ml-3">
                  <Stars />
                  <p className="text-[10px] font-sans text-black/40 mt-1">
                    Trusted by <span className="font-semibold text-black/60">clients worldwide</span>
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full bg-black text-white font-sans font-semibold text-[13px] py-3 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
            >
              Leave a review
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        {testimonials.map((t, i) => {
          const isEven = i % 2 === 0;
          
          const ProfileCard = (
            <motion.div 
              whileHover={{ y: isEven ? -5 : 5 }}
              onClick={() => setSelectedTestimonial(t)}
              className="bg-white rounded-2xl p-5 flex items-center gap-3 cursor-pointer group"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-[14px] font-sans font-semibold text-black leading-tight group-hover:underline truncate">{t.name}</p>
                <p className="text-[11px] font-sans text-black/40 font-normal truncate">{t.role}</p>
              </div>
            </motion.div>
          );

          const QuoteCard = (
            <div 
              onClick={() => setSelectedTestimonial(t)}
              className="bg-white rounded-2xl p-5 flex flex-col flex-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.stars} />
                <span className="text-black/30 text-xl font-sans font-light leading-none group-hover:text-black transition-colors">+</span>
              </div>
              <QuoteText pushDown={isEven}>{t.shortContent}</QuoteText>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-black/20 font-sans group-hover:text-black/40 transition-colors">Click to read full story</p>
            </div>
          );

          return (
            <div key={i} className="flex flex-col gap-1 h-[480px] w-[300px] md:w-[350px] shrink-0 snap-start">
              {isEven ? (
                <>
                  {ProfileCard}
                  {QuoteCard}
                </>
              ) : (
                <>
                  {QuoteCard}
                  {ProfileCard}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Testimonial Detail Modal ── */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-[80px]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white/90 backdrop-blur-md w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
              >
                <X size={20} className="text-black" />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-sans font-bold text-black">{selectedTestimonial.name}</h3>
                    <p className="text-sm font-sans text-black/50">{selectedTestimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: selectedTestimonial.stars }).map((_, i) => (
                    <Star key={i} size={16} className="fill-black text-black" />
                  ))}
                  <span className="ml-4 text-xs font-sans text-black/30 uppercase tracking-widest">{selectedTestimonial.date}</span>
                </div>

                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-8xl font-serif text-black/5 pointer-events-none">“</span>
                  <p className="text-lg md:text-xl font-sans text-black/80 leading-relaxed italic">
                    {selectedTestimonial.content}
                  </p>
                </div>
              </div>

              <div className="bg-black/5 p-6 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold">Verified Review</span>
                <div className="flex gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold">{selectedTestimonial.company}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Leave a Review Modal ── */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !reviewStatus && setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            >
              {reviewStatus !== 'success' && (
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
                >
                  <X size={20} className="text-black" />
                </button>
              )}

              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {reviewStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-10"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                      </div>
                      <h3 className="text-2xl font-sans font-bold text-black mb-2">Review Sent!</h3>
                      <p className="text-black/50">Your review has been sent to Tanvir for approval.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <h3 className="text-3xl font-sans font-bold text-black mb-2">Share your experience</h3>
                      <p className="text-black/50 mb-8">We value your feedback and appreciate your support.</p>

                      <form onSubmit={handleLeaveReview} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Name</label>
                            <input name="name" required className="w-full bg-[#F5F2ED] border-none rounded-xl px-4 py-3 text-sm text-black focus:ring-2 focus:ring-black transition-all" placeholder="John Doe" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Role</label>
                            <input name="role" required className="w-full bg-[#F5F2ED] border-none rounded-xl px-4 py-3 text-sm text-black focus:ring-2 focus:ring-black transition-all" placeholder="CEO at TechCo" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Rating</label>
                          <div className="flex gap-2 bg-[#F5F2ED] p-3 rounded-xl">
                            {[1,2,3,4,5].map(star => (
                              <button 
                                key={star} 
                                type="button" 
                                onClick={() => setRating(star)}
                                className={cn(
                                  "transition-all cursor-pointer",
                                  rating >= star ? "text-black scale-110" : "text-black/20"
                                )}
                              >
                                <Star size={20} className={rating >= star ? "fill-black" : ""} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Your Review</label>
                          <textarea name="content" required rows={4} className="w-full bg-[#F5F2ED] border-none rounded-xl px-4 py-3 text-sm text-black focus:ring-2 focus:ring-black transition-all resize-none" placeholder="How was your experience working with Tanvir?" />
                        </div>

                        <button 
                          disabled={reviewStatus === 'sending'}
                          className="w-full bg-black text-white font-sans font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black/90 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          {reviewStatus === 'sending' ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Send Review</span>
                              <Send size={16} />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
