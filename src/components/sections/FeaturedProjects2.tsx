"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/Skeleton";

interface ChangingImageProps {
  images: string[];
  alt: string;
}

const ChangingImage: React.FC<ChangingImageProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimeout = () => {
    const randomTime = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
    
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      startTimeout();
    }, randomTime);
  };

  useEffect(() => {
    const initialDelay = Math.floor(Math.random() * 2000);
    const initialTimeout = setTimeout(() => {
      startTimeout();
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={alt}
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface ProjectVideoProps {
  src: string;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div className="relative w-full h-full bg-black/10">
      {!isLoaded && <Skeleton className="absolute inset-0 z-10 w-full h-full" />}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

interface ProjectItemProps {
  project: any;
  index: number;
  aspectRatio?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, aspectRatio = "aspect-[4/3]" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
      className="relative group w-full flex flex-col cursor-pointer"
    >
      <div className={cn(
        "relative overflow-hidden rounded-sm transition-all duration-700 grayscale-0 group-hover:grayscale", 
        aspectRatio,
        "max-h-[70vh] md:max-h-[80vh]" // Ensure it doesn't exceed 100vh with text
      )}>
        {project.video ? (
          <ProjectVideo src={project.video} />
        ) : (
          <ChangingImage images={project.images} alt={project.name} />
        )}
        
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
      </div>

      <div className="mt-6 flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight uppercase text-white">
            {project.name}
          </h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans">
            {project.tags.join(" • ")}
          </p>
        </div>
        <span className="text-[10px] font-sans font-black text-white/20 tracking-widest">
          2024
        </span>
      </div>
    </motion.div>
  );
};

export const FeaturedProjects2 = () => {
  const projects = portfolioData.projects;
  const projectPairs = [];
  
  // Group projects into pairs for 100vh sections
  for (let i = 0; i < projects.length; i += 2) {
    projectPairs.push(projects.slice(i, i + 2));
  }

  const aspectRatios = [
    "aspect-[4/5]",    // Tall
    "aspect-[16/10]",  // Wide
    "aspect-square",   // Square
    "aspect-[4/3]",    // Standard
    "aspect-[3/4]",    // Portrait
    "aspect-[21/9]"    // Ultra-wide
  ];

  return (
    <section id="work" className="relative z-20 bg-black text-white">
      {projectPairs.map((pair, sectionIndex) => {
        const isOddSection = sectionIndex % 2 !== 0;
        
        return (
          <div 
            key={sectionIndex} 
            className="min-h-[70vh] md:min-h-screen flex items-center px-8 md:px-16 xl:pl-[160px] xl:pr-24 py-24 md:py-0"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-32 items-start">
              {pair.map((project, index) => {
                const isFirstInPair = index === 0;
                
                let colSpan = "md:col-span-5";
                if (!isOddSection && isFirstInPair) colSpan = "md:col-span-7";
                if (isOddSection && !isFirstInPair) colSpan = "md:col-span-7";

                // Pick an aspect ratio based on project index for stability across renders
                const ratioIndex = (sectionIndex * 2 + index) % aspectRatios.length;
                const aspectRatio = aspectRatios[ratioIndex];

                // Add some random vertical offset for organic feel
                const verticalOffset = isFirstInPair ? "md:mt-0" : "md:mt-24";

                return (
                  <div key={project.name} className={cn(colSpan, verticalOffset)}>
                    <ProjectItem 
                      project={project} 
                      index={sectionIndex * 2 + index} 
                      aspectRatio={aspectRatio}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};
