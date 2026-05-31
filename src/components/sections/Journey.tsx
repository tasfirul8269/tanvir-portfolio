"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Journey = () => {
  return (
    <section id="journey" className="relative min-h-[70vh] md:min-h-screen py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] xl:pr-24 bg-[#F5F2ED] border-t border-black/5 dark:border-white/5 font-serif">
      <div className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tighter uppercase text-black">THE JOURNEY</h2>
        </motion.div>
        
        <div className="flex flex-col">
          {portfolioData.journey.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group py-12 md:py-20 border-b border-black/5 flex flex-col md:flex-row gap-8 md:items-center"
            >
              <div className="md:w-1/4">
                <span className="text-4xl md:text-6xl font-sans font-bold text-black/10 group-hover:text-black transition-colors duration-500">
                  {item.year}
                </span>
              </div>
              
              <div className="md:w-2/4">
                <h3 className="text-2xl md:text-3xl font-sans font-bold mb-4 text-black">{item.title}</h3>
                <p className="text-black/50 leading-relaxed max-w-md font-serif">
                  {item.description}
                </p>
              </div>
              
              <div className="md:w-1/4 flex md:justify-end">
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-black transition-colors duration-500">
                  <div className="w-2 h-2 rounded-full bg-black scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
