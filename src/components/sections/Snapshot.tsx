"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { KineticText } from "@/registry/magicui/kinetic-text";

// ---------------------------------------------------------------------------
// Snapshot
// ---------------------------------------------------------------------------
export const Snapshot = () => {
  return (
    <section
      id="snapshot"
      className="relative z-10 min-h-[70vh] md:h-screen flex items-center py-24 md:py-40 px-8 md:px-16 xl:pl-[160px] xl:pr-24 overflow-hidden bg-black text-white font-serif"
    >
      <div className="max-w-7xl w-full">
        <div className="flex flex-col gap-12">
          {/* Label */}
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
            {/* Heading with inline-anchored icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-sans font-[300] leading-tight text-white">

                {/* Line 1: My Prefered — selection box + cursor on "Prefered" */}
                <span className="block">
                  My{" "}
                  <span className="relative inline-block">
                    <KineticText text="Prefered" as="span" className="text-4xl md:text-6xl font-sans font-[300]" />
                    {/* Selection box around "Prefered" */}
                    <span className="absolute inset-[-4px] pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                        <rect x="2" y="2" width="96" height="96" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 3" />
                        <rect x="0" y="0" width="6" height="6" fill="#60A5FA" />
                        <rect x="94" y="0" width="6" height="6" fill="#60A5FA" />
                        <rect x="0" y="94" width="6" height="6" fill="#60A5FA" />
                        <rect x="94" y="94" width="6" height="6" fill="#60A5FA" />
                        <rect x="47" y="0" width="6" height="6" fill="#60A5FA" />
                        <rect x="47" y="94" width="6" height="6" fill="#60A5FA" />
                        <rect x="0" y="47" width="6" height="6" fill="#60A5FA" />
                        <rect x="94" y="47" width="6" height="6" fill="#60A5FA" />
                      </svg>
                    </span>
                    {/* Cursor — bottom-right of selection box */}
                    <span className="absolute bottom-[-14px] right-[-18px] pointer-events-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 1L17 10L10 12L7 19L3 1Z" fill="#FBBF24" />
                      </svg>
                    </span>
                  </span>
                </span>

                {/* Line 2: { Technologies */}
                <span className="block flex items-center gap-0">
                  <span
                    className="text-[#2DD4BF] font-mono font-[100] leading-none mr-1 self-stretch flex items-center"
                    style={{ fontSize: "1.1em" }}
                  >
                    {"{"}
                  </span>
                  <KineticText text="Technologies for" as="span" className="text-4xl md:text-6xl font-sans font-[300]" />
                </span>

                {/* Line 3: Developement } — inline-flex keeps } on same line */}
                <span className="inline-flex items-baseline gap-1">
                  <KineticText text="Developement" as="span" className="text-4xl md:text-6xl font-sans font-[300]" />
                  <span
                    className="text-[#F472B6] font-mono font-[100] leading-none"
                    style={{ fontSize: "1.1em" }}
                  >
                    {"}"}
                  </span>
                </span>

              </h2>
            </motion.div>

            {/* Tech list */}
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
