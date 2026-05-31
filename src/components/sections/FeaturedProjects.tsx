"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: any;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="py-16 md:py-20 border-t border-black/10 cursor-pointer"
    >
      <div className="grid grid-cols-12 gap-0">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-7 pr-4 md:pr-8">
          {/* Top row: 2 images */}
          <div className="flex gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="relative flex-shrink-0 w-[45%] aspect-[2/3] bg-black/5">
              {project.images && project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#fafafa]">
                  <span className="text-2xl font-sans font-black tracking-tighter uppercase text-black/5">
                    {project.name.split(' ')[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="relative flex-1 aspect-square bg-black/5 mt-8 md:mt-12">
              {project.images && project.images[1] ? (
                <Image
                  src={project.images[1]}
                  alt={project.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#fafafa]">
                  <span className="text-2xl font-sans font-black tracking-tighter uppercase text-black/5">
                    {project.name.split(' ')[1] || ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom: Large project title */}
          <h3 className="text-6xl md:text-[10rem] font-sans font-black tracking-tighter uppercase leading-none text-black">
            {project.name}
          </h3>
        </div>

        {/* Right Section */}
        <div className="col-span-12 md:col-span-5 pl-4 md:pl-8 mt-12 md:mt-0">
          {/* Top: Small text */}
          <p className="text-xl md:text-3xl font-sans font-normal mb-4 md:mb-6 text-black">
            {project.tags.slice(0, 2).join(' ')}
          </p>

          {/* Bottom: Large image */}
          <div className="relative aspect-[4/5] bg-black/5">
            {project.images && project.images[2] ? (
              <Image
                src={project.images[2]}
                alt={project.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#fafafa]">
                <span className="text-5xl font-sans font-black tracking-tighter uppercase text-black/5">
                  {project.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedProjects = () => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 500, damping: 30 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      x.set(e.clientX - rect.left - 75);
      y.set(e.clientY - rect.top - 75);
    }
  };

  const featuredProjects = portfolioData.projects.slice(0, 3);
  return (
    <section 
      id="work" 
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={() => router.push('/projects')}
      className="relative z-20 bg-[#F5F2ED] py-24 md:py-32 px-8 md:px-16 xl:pl-[160px] xl:pr-24 cursor-none"
    >
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-50 w-[150px] h-[150px] rounded-full bg-black flex items-center justify-center text-white text-sm font-bold uppercase tracking-wider"
          style={{
            left: mouseX,
            top: mouseY,
            position: 'absolute',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          View All
        </motion.div>
      )}
      <div className="max-w-7xl">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-bold text-black/40">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-black">Featured Projects</h2>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
