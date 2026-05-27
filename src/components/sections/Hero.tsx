"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { CanvasImage } from "../ui/CanvasImage";

export const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center bg-[#F5F2ED] overflow-hidden snap-start">
      <div className="w-full flex flex-col lg:flex-row items-center">
        {/* Left Side: Typography - Contained within standard padding */}
        <div className="flex-1 w-full px-8 md:px-16 lg:pl-32 lg:pr-12 pt-32 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 max-w-2xl"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-[clamp(4rem,12vw,9rem)] font-sans font-bold leading-[0.85] tracking-[-0.04em] text-black">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="block"
                >
                  Tanvir
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="block"
                >
                  Almas
                </motion.span>
              </h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-md text-base md:text-lg text-black/50 font-serif leading-relaxed"
            >
              full stack web developer, worked with 8+ real clients and have more than 30 personal projects
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4"
            >
              <button className="relative group flex items-center gap-6 px-10 py-5 bg-black text-white rounded-none hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300">
                {/* Button Shadow Effect */}
                <div className="absolute inset-0 bg-black/20 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
                
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Who Am I?</span>
                
                <div className="relative w-6 h-6 overflow-hidden">
                  <Image 
                    src="/icons/arrow-right.svg" 
                    alt="Arrow" 
                    width={20} 
                    height={20} 
                    className="invert brightness-200 group-hover:translate-x-full transition-transform duration-500"
                  />
                  <Image 
                    src="/icons/arrow-right.svg" 
                    alt="Arrow" 
                    width={20} 
                    height={20} 
                    className="absolute top-0 -left-full invert brightness-200 group-hover:left-0 transition-all duration-500"
                  />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Artistic Illustration (Canvas) - Flush to right edge, vertically centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full flex items-center justify-end h-screen"
        >
          <div className="w-full h-full max-w-[800px] lg:max-w-none relative flex items-center">
            <CanvasImage 
              src="/images/tanvir.png" 
              alt="Tanvir Almas Illustration" 
              className="w-full max-h-[85vh] object-contain object-right pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
