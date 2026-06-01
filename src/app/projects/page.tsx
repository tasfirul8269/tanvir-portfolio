"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { MainLayout } from "@/components/layout/MainLayout";
import { useSidebarStore } from "@/store/sidebarStore";

/* ─── ChangingImage ─────────────────────────────────────────────────────── */
interface ChangingImageProps {
  images: string[];
  alt: string;
}

const ChangingImage: React.FC<ChangingImageProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTimeout = () => {
      const randomTime = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        startTimeout();
      }, randomTime);
    };

    const initialDelay = Math.floor(Math.random() * 2000);
    const initialTimeout = setTimeout(() => { startTimeout(); }, initialDelay);
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─── ProjectVideo ───────────────────────────────────────────────────────── */
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

/* ─── ProjectItem ────────────────────────────────────────────────────────── */
interface ProjectItemProps {
  project: (typeof portfolioData.projects)[number] & { video?: string };
  index: number;
  heightClass: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, heightClass }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group w-full flex flex-col cursor-pointer"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm transition-all duration-700",
          "aspect-[16/9] md:aspect-auto",
          "md:" + heightClass
        )}
      >
        {"video" in project && project.video ? (
          <ProjectVideo src={project.video as string} />
        ) : (
          <ChangingImage images={project.images} alt={project.name} />
        )}
        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-colors duration-500 z-10" />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-lg md:text-xl font-sans font-bold tracking-tight uppercase text-black">
            {project.name}
          </h3>
          <AnimatePresence>
            {isHovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="hidden md:block text-[9px] uppercase tracking-[0.2em] text-black/40 font-sans overflow-hidden"
              >
                {project.tags.join(" • ")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <span className="text-[11px] font-sans font-bold text-black/30 tracking-widest">2024</span>
      </div>
    </motion.div>
  );
};

/* ─── Work Page ──────────────────────────────────────────────────────────── */
export default function WorkPage() {
  const projects = portfolioData.projects;
  const { setHidden } = useSidebarStore();

  // Hide sidebar for the entire work page
  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  return (
    <MainLayout>
      {/* Page header */}
      <section className="pt-36 pb-12 px-[5px] md:px-8" style={{ backgroundColor: "#F5F2ED" }}>
        <div className="px-4 md:px-8">
          <Link
            href="/"
            className="inline-block text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40 hover:text-black/80 transition-colors mb-8"
          >
            ← Back
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-8xl font-sans font-bold tracking-tighter text-black uppercase"
          >
            All Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-black/40 text-sm font-sans uppercase tracking-widest"
          >
            {projects.length} Projects
          </motion.p>
        </div>
      </section>

      {/* Projects grid — same layout as FeaturedProjects3 */}
      <section className="relative z-20 pb-32 px-[5px]" style={{ backgroundColor: "#F5F2ED" }}>
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-[10px] items-start">
          {projects.map((project, index) => {
            const position = index % 4;
            let colSpan = "md:col-span-5";
            let heightClass = "h-[40vh] md:h-[50vh]";

            if (position === 0 || position === 3) {
              colSpan = "md:col-span-7";
              heightClass = "h-[60vh] md:h-[80vh]";
            }

            return (
              <div key={project.name} className={cn(colSpan, "w-full")}>
                <ProjectItem project={project} index={index} heightClass={heightClass} />
              </div>
            );
          })}
        </div>
      </section>
    </MainLayout>
  );
}
