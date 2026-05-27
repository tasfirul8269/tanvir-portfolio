"use client";

import React from "react";
import { motion } from "framer-motion";

const learningItems = [
  {
    title: "Scalable Systems",
    description: "Deep diving into distributed architectures and high-availability patterns.",
  },
  {
    title: "AI-Assisted Dev",
    description: "Integrating LLMs and automation to accelerate engineering workflows.",
  },
  {
    title: "Product Thinking",
    description: "Bridging the gap between technical execution and user-centric value.",
  },
  {
    title: "Performance Eng.",
    description: "Mastering the art of millisecond-level optimizations across the stack.",
  },
];

export const Learning = () => {
  return (
    <section 
      id="learning" 
      className="relative min-h-screen bg-black text-white py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] flex flex-col justify-center snap-start"
    >
      <div className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-sans font-bold text-white/30 block mb-4">The Horizon</span>
          <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tighter uppercase leading-none">
            Currently <br /> Learning
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {learningItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group border-l border-white/10 pl-8 py-4 hover:border-white transition-colors duration-500"
            >
              <h3 className="text-2xl md:text-4xl font-sans font-bold uppercase tracking-tight mb-4 group-hover:italic transition-all duration-500">
                {item.title}
              </h3>
              <p className="text-lg font-serif leading-relaxed text-white/50 max-w-sm group-hover:text-white/90 transition-colors duration-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
        <span className="text-[40vh] font-sans font-black uppercase tracking-tighter rotate-90 inline-block">
          AMBITION
        </span>
      </div>
    </section>
  );
};
