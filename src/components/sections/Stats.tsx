"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Stats = () => {
  return (
    <section className="relative min-h-[70vh] md:h-screen flex items-center py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] xl:pr-24 bg-[#F5F2ED] text-black font-serif">
      <div className="max-w-7xl">
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
              <span className="text-4xl md:text-6xl font-sans font-bold">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 md:mt-48 flex flex-col md:flex-row items-start gap-12"
        >
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-sans font-bold leading-tight">
              Co-Founder of {portfolioData.founderOf}. <br />
              Understand Industry, <br />
              Make Profitable Solutions.
            </h2>
          </div>
          <div className="flex-1 text-black/60 text-lg leading-relaxed max-w-xl font-serif">
            <p>
              I always follow a simple philosophy, deeply understand the industry and user needs, then craft solutions that are not only innovative but also profitable. My approach combines strategic thinking with hands-on execution to deliver real business value.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
