"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Snapshot = () => {
  return (
    <section id="snapshot" className="relative z-10 min-h-[70vh] md:h-screen flex items-center py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] xl:pr-24 overflow-hidden bg-black text-white font-serif snap-start">
      <div className="max-w-7xl">
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <div className="w-12 h-px bg-white" />
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-bold text-white">
              {portfolioData.snapshot.title}
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-sans font-bold leading-tight text-white"
            >
              My Prefered <br />
              Technologies <br />
              for Developement
            </motion.h2>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              {portfolioData.snapshot.tech.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col gap-4 group"
                >
                  <span className="text-2xl font-serif group-hover:italic transition-all duration-300 text-white/50 group-hover:text-white">
                    {tech}
                  </span>
                  <div className="w-full h-px bg-white/10 group-hover:bg-white transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
