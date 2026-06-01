"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const THLogo = () => (
  <svg width="45" height="30" viewBox="0 0 45 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
    {/* Handwritten 'T' */}
    <path 
      d="M6 10C8.5 9.5 14.5 8.5 19 9M12.5 9C12 12 11.5 18 12 23" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Handwritten 'A' */}
    <path 
      d="M23 23 L27 8 L31 23 M25 16 L29 16" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Dot */}
    <circle cx="37" cy="22" r="1.5" fill="currentColor" />
  </svg>
);

export const Header = () => {
  const scrollDirection = useScrollDirection("main-scroll-container");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInSnapshot, setIsInSnapshot] = useState(false);
  const [isInHero2, setIsInHero2] = useState(false);

  useEffect(() => {
    const container = document.getElementById("main-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
      
      const snapshotSection = document.getElementById('snapshot');
      if (snapshotSection) {
        const rect = snapshotSection.getBoundingClientRect();
        // Header is at top, so check if top of viewport is within snapshot
        setIsInSnapshot(rect.top <= 0 && rect.bottom >= 0);
      }

      const hero2Section = document.getElementById('hero2');
      if (hero2Section) {
        const rect = hero2Section.getBoundingClientRect();
        setIsInHero2(rect.top <= 0 && rect.bottom >= 0);
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact", hasDot: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: scrollDirection === "down" && !isMobileMenuOpen ? -100 : 0,
          backgroundColor: isScrolled 
            ? ((isInSnapshot || isInHero2) ? "rgba(0, 0, 0, 0.8)" : "rgba(245, 242, 237, 0.9)") 
            : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-16 transition-all duration-300",
          (isInSnapshot || isInHero2) ? "text-white" : "text-black"
        )}
      >
        <Link href="/" className="flex items-center">
          <THLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-14">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold hover:opacity-60 transition-all"
            >
              {link.name}
              {link.hasDot && (
                 <span className="w-1.5 h-1.5 rounded-full bg-[#3D43D1]" />
               )}
            </Link>
          ))}
          <a
            href="https://calendly.com/tanvir-almas/30min?month=2026-05"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-[11px] uppercase tracking-[0.2em] font-semibold px-5 py-2.5 border transition-colors duration-200",
              (isInSnapshot || isInHero2)
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            )}
          >
            Book a Call
          </a>
        </nav>
        
        <div className="flex items-center md:hidden">
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2"
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-bold tracking-tighter">
                {portfolioData.name.split(' ')[0][0]}.{portfolioData.name.split(' ')[1][0]}
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-5xl font-serif tracking-tighter hover:italic transition-all"
                  >
                    {link.name}
                    {link.hasDot && (
                      <span className="w-3 h-3 rounded-full bg-[#3D43D1]" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-black/5 dark:border-white/5">
              <p className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">Get in touch</p>
              <a href="mailto:tanvir.imon68@gmail.com" className="text-xl font-serif underline">
                tanvir.imon68@gmail.com
              </a>
              <a
                href="https://calendly.com/tanvir-almas/30min?month=2026-05"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3 bg-black text-white hover:bg-black/80 transition-colors duration-200"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
