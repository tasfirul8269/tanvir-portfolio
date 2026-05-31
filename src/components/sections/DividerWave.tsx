"use client";

import React from "react";
import { motion } from "framer-motion";

export const DividerWave = () => {
  return (
    <section className="relative w-full py-4 bg-[#F5F2ED] overflow-hidden">
      <motion.svg
        width="100%"
        height="4"
        viewBox="0 0 1200 4"
        preserveAspectRatio="none"
        className="block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        {/* Straight divider line that spreads and waves */}
        <motion.line
          x1="50%"
          y1="2"
          x2="50%"
          y2="2"
          stroke="black"
          strokeWidth="1"
          initial={{ x1: "50%", x2: "50%" }}
          whileInView={{
            x1: ["50%", "50%", "10%", "10%"],
            x2: ["50%", "50%", "90%", "90%"],
            transition: {
              duration: 1.6,
              times: [0, 0.3, 0.65, 1],
              ease: "easeInOut",
            },
          }}
          viewport={{ once: false, amount: 0.5 }}
        />

        {/* Wave animation path - appears and disappears */}
        <motion.path
          d="M 10% 2 Q 20% 0 30% 2 T 50% 2 T 70% 2 T 90% 2"
          stroke="black"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{
            opacity: [0, 0, 1, 1, 0],
            pathLength: [0, 0, 1, 1, 1],
            transition: {
              duration: 1.6,
              times: [0, 0.3, 0.5, 0.65, 1],
              ease: "easeInOut",
            },
          }}
          viewport={{ once: false, amount: 0.5 }}
        />
      </motion.svg>
    </section>
  );
};
