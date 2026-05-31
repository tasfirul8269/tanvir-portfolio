"use client";

import React from "react";
import { motion } from "framer-motion";

const principles = [
  {
    id: "01",
    title: "Business Impact",
    description: "I don't just write code. I think about business impact. Every line should contribute to the bottom line.",
  },
  {
    id: "02",
    title: "Performance",
    description: "Performance matters. A slow website loses users. Speed is a feature, not an afterthought.",
  },
  {
    id: "03",
    title: "Invisible Design",
    description: "Design should feel invisible. Good UX feels natural. If the user has to think, we've failed.",
  },
  {
    id: "04",
    title: "Relentless Shipping",
    description: "I care about shipping. Ideas matter only when delivered. Done is better than perfect but never shipped.",
  },
];

export const Mindset = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-[70vh] md:min-h-screen bg-[#F5F2ED] py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] xl:pr-24 flex flex-col justify-center"
    >
      <div className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tighter uppercase text-black leading-none">
            My <br /> Mindset
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 md:gap-y-32">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col gap-6 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-sans font-black text-black/20 tracking-widest group-hover:text-black transition-colors duration-500">
                  {principle.id}
                </span>
                <div className="h-px w-8 bg-black/10 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight text-black">
                  {principle.title}
                </h3>
                <p className="text-lg md:text-xl font-serif leading-relaxed text-black/60 max-w-md group-hover:text-black transition-colors duration-500">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute bottom-0 right-0 p-8 md:p-16 pointer-events-none select-none overflow-hidden hidden lg:block">
        <span className="text-[20vh] font-sans font-black text-black/[0.02] leading-none uppercase tracking-tighter whitespace-nowrap translate-y-1/4 inline-block">
          What I Believe
        </span>
      </div>
    </section>
  );
};
