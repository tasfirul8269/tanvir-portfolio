"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  project: any;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 w-[320px] md:w-[450px] aspect-video group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        {/* Front Side: Image / Graphic */}
        <div className="absolute inset-0 z-0">
          {project.image ? (
            <Image 
              src={project.image} 
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-12 bg-[#fafafa]">
               <span className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase text-black/5 select-none text-center leading-none">
                 {project.name.split(' ')[0]} <br />
                 {project.name.split(' ')[1] || ''}
               </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Labels Layer (Always Visible) */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20 transition-opacity duration-300 group-hover:opacity-0">
           <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-sans font-bold text-black/30 tracking-widest uppercase">0{index + 1}</span>
              <span className="text-xs font-sans font-bold text-black uppercase tracking-tight">{project.name}</span>
           </div>
           <div className="flex gap-1">
              {project.tags.slice(0, 1).map((tag: string) => (
                <span key={tag} className="text-[8px] bg-black/5 px-2 py-0.5 rounded-full uppercase font-bold text-black/40">
                  {tag}
                </span>
              ))}
           </div>
        </div>

        {/* Detail Overlay: Slide-to-Detail */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-30 bg-black p-6 md:p-8 flex flex-col justify-between text-white"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-sans font-bold uppercase tracking-tight">{project.name}</h3>
                <div className="flex gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-[8px] border border-white/20 px-2 py-0.5 rounded-full uppercase font-bold text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1 font-sans">Problem</h4>
                  <p className="text-[10px] font-serif leading-relaxed text-white/70 line-clamp-2">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em] mb-1 font-sans">Outcome</h4>
                  <p className="text-[10px] font-serif leading-relaxed text-white/70 line-clamp-2">{project.outcome}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                 <div className="flex flex-col">
                    <span className="text-[8px] uppercase font-bold text-white/20 tracking-widest font-sans">Engineering</span>
                    <span className="text-[9px] font-mono text-white/60">{project.tech.split(',').slice(0, 2).join(',')}</span>
                 </div>
                 <ArrowRight size={16} className="text-white/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MarqueeRow = ({ projects, direction = "left", speed = 40 }: { projects: any[], direction?: "left" | "right", speed?: number }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate projects to ensure a seamless loop
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div 
      className="flex overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-8 md:gap-12 py-4"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          playState: isPaused ? "paused" : "running"
        } as any}
      >
        {duplicatedProjects.map((project, i) => (
          <ProjectCard 
            key={`${project.name}-${i}`} 
            project={project} 
            index={(i % projects.length)} 
          />
        ))}
      </motion.div>
    </div>
  );
};

export const FeaturedProjects = () => {
  const row1 = portfolioData.projects?.slice(0, 3) || [];
  const row2 = portfolioData.projects?.slice(3, 6) || [];

  return (
    <section 
      id="work" 
      className="relative z-20 h-screen bg-[#F5F2ED] py-24 md:py-32 overflow-hidden flex flex-col justify-center snap-start xl:pl-[80px] pb-15"
    >
      <div className="px-8 md:px-16 mb-12 md:mb-16 pt-12 md:pt-60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-sans font-bold text-black/30">Proof of Concept</span>
          <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tighter uppercase text-black">
            Featured <br /> Projects
          </h2>
        </motion.div>
      </div>

      {/* Infinite Marquee Rows */}
      <div className="flex flex-col gap-4 md:gap-8">
        <MarqueeRow projects={row1} direction="left" speed={30} />
        <MarqueeRow projects={row2} direction="right" speed={35} />
      </div>

      {/* Interactive Cue */}
      <div className="absolute bottom-12 right-8 md:right-16 flex items-center gap-4 opacity-30">
         <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black">Hover to Pause</span>
         <MoveRight size={20} className="animate-pulse" />
      </div>
    </section>
  );
};
