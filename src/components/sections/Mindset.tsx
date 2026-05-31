"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import packman from "@/assets/images/packman.webp";
import marioRun from "@/assets/images/mario_run_nobg.gif";
import ufo from "@/assets/images/ufo.webp";
import { BlobFace } from "@/components/ui/BlobFace";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isPerfHovered, setIsPerfHovered] = useState(false);
  const [isDesignHovered, setIsDesignHovered] = useState(false);
  const [isShipHovered, setIsShipHovered] = useState(false);

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
          {/* De Hallen–style heading: vertical shape column + text */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* De Hallen exact shape */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 360"
              className="w-[28px] md:w-[40px] shrink-0"
              style={{ height: "auto" }}
            >
              <defs>
                <clipPath id="topClip">
                  <rect x="0" y="0" width="100" height="120" />
                </clipPath>
              </defs>
              <rect x="0" y="0" width="100" height="120" fill="#b8d8f0" />
              <rect x="0" y="8" width="55" height="104" fill="#1414e0" clipPath="url(#topClip)" />
              <ellipse cx="55" cy="60" rx="52" ry="52" fill="#1414e0" clipPath="url(#topClip)" />
              <rect x="0" y="120" width="100" height="110" fill="#0e4a38" />
              <rect x="12" y="120" width="26" height="110" fill="#1a9966" />
              <rect x="38" y="120" width="16" height="110" fill="#b8e800" />
              <rect x="0" y="230" width="100" height="130" fill="#f0b0b0" />
              <polygon points="50,230 100,360 0,360" fill="#e81818" />
            </svg>

            <h2 className="text-4xl md:text-7xl font-sans font-[300] tracking-tight text-black leading-[1.05]">
              My<br />Mindset
            </h2>
          </div>
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
              onMouseEnter={principle.id === "01" ? () => setIsHovered(true) : principle.id === "02" ? () => setIsPerfHovered(true) : principle.id === "03" ? () => setIsDesignHovered(true) : principle.id === "04" ? () => setIsShipHovered(true) : undefined}
              onMouseLeave={principle.id === "01" ? () => setIsHovered(false) : principle.id === "02" ? () => setIsPerfHovered(false) : principle.id === "03" ? () => setIsDesignHovered(false) : principle.id === "04" ? () => setIsShipHovered(false) : undefined}
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-sans font-black text-black/20 tracking-widest group-hover:text-black transition-colors duration-500">
                  {principle.id}
                </span>
                <div className="h-px w-8 bg-black/10 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
              </div>

              {/* Card body: text left, visual right */}
              <div className={`flex items-end gap-4 ${principle.id !== "04" ? "justify-between" : "justify-between"}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight text-black">
                    {principle.title}
                  </h3>
                  <p className="text-lg md:text-xl font-serif leading-relaxed text-black/60 max-w-md group-hover:text-black transition-colors duration-500">
                    {principle.description}
                  </p>
                </div>

                {principle.id === "01" && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="shrink-0 pointer-events-none"
                      >
                        <Image
                          src={packman}
                          alt="Packman"
                          width={100}
                          height={100}
                          className="object-contain drop-shadow-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {principle.id === "02" && (
                  <AnimatePresence>
                    {isPerfHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="shrink-0 pointer-events-none"
                      >
                        <Image
                          src={marioRun}
                          alt="Mario running"
                          width={100}
                          height={100}
                          className="object-contain"
                          unoptimized
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {principle.id === "03" && (
                  <AnimatePresence>
                    {isDesignHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="shrink-0"
                      >
                        <BlobFace />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {principle.id === "04" && (
                  <AnimatePresence>
                    {isShipHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="shrink-0 pointer-events-none"
                      >
                        <Image
                          src={ufo}
                          alt="UFO"
                          width={110}
                          height={80}
                          className="object-contain drop-shadow-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}              </div>
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
