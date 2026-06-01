"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { useSidebarStore } from "@/store/sidebarStore";
import { Skeleton } from "@/components/ui/Skeleton";

interface Project {
  name: string;
  tags: string[];
  images: string[];
  video?: string;
}

// ---------------------------------------------------------------------------
// ProjectVideo
// ---------------------------------------------------------------------------
const ProjectVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.1 });

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
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  );
};

// ---------------------------------------------------------------------------
// Per-column config
// direction  1 → column moves UP   as user scrolls down
// direction -1 → column moves DOWN as user scrolls down
// speed: total px travel across the full scroll range of the section
// startOffset: initial translateY so column is already partially visible (no top gap)
// ---------------------------------------------------------------------------
const COLUMN_CONFIGS: {
  aspect: string;
  direction: 1 | -1;
  speed: number;
}[] = [
  { aspect: "aspect-[9/16]",  direction:  1, speed: 150 },
  { aspect: "aspect-[4/3]",   direction: -1, speed: 120 },
  { aspect: "aspect-[2/1]",   direction:  1, speed: 180 },
  { aspect: "aspect-[9/16]",  direction: -1, speed: 140 },
  { aspect: "aspect-[16/10]", direction:  1, speed: 160 },
];

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------
const ProjectCard: React.FC<{ project: Project; aspect: string }> = ({
  project,
  aspect,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`relative w-full shrink-0 overflow-hidden rounded-lg ${aspect} group bg-white/5`}>
      {!isLoaded && <Skeleton className="absolute inset-0 z-10 w-full h-full" />}
      {project.video ? (
        <ProjectVideo src={project.video} />
      ) : (
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          className={`object-cover transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 20vw, 20vw"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
    </div>
  );
};

// ---------------------------------------------------------------------------
// ParallaxColumn
// The column content is tripled so there's always imagery above and below
// the visible window. The initial translateY is set to -33.33% (one copy height)
// so the middle copy is centred in view at scroll=0 — no blank edges.
// ---------------------------------------------------------------------------
const ParallaxColumn: React.FC<{
  projects: Project[];
  aspect: string;
  direction: 1 | -1;
  speed: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}> = ({ projects, aspect, direction, speed, sectionRef, scrollContainerRef }) => {
  // Triple the cards: top buffer + visible + bottom buffer
  const cards = [...projects, ...projects, ...projects];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  // At scroll=0 (section entering from bottom): start offset
  // At scroll=1 (section leaving at top): end offset
  // We centre on the middle copy by starting at -33.33% base,
  // then add the parallax delta on top.
  const halfSpeed = speed / 2;
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [direction * halfSpeed, direction * -halfSpeed]
  );
  const y = useSpring(rawY, { stiffness: 55, damping: 20, mass: 0.5 });

  return (
    <div className="overflow-hidden h-full">
      <motion.div
        // translateY(-33.33%) centres the middle copy; parallax shifts on top
        style={{ y, translateY: "-33.33%" }}
        className="flex flex-col gap-[6px] will-change-transform"
      >
        {cards.map((project, i) => (
          <ProjectCard
            key={`${project.name}-${i}`}
            project={project}
            aspect={aspect}
          />
        ))}
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// FeaturedProjects4
// ---------------------------------------------------------------------------
export const FeaturedProjects4: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const { setHidden } = useSidebarStore();
  const isInView = useInView(sectionRef, { amount: 0.1 });

  useEffect(() => {
    scrollContainerRef.current = document.getElementById(
      "main-scroll-container"
    ) as HTMLElement | null;
  }, []);

  // Hide sidebar when this section is visible
  useEffect(() => {
    setHidden(isInView);
    return () => setHidden(false);
  }, [isInView, setHidden]);

  const projects = portfolioData.projects;
  const NUM_COLUMNS = 5;
  const CARDS_PER_COLUMN = 5;

  const columns: Project[][] = Array.from({ length: NUM_COLUMNS }, (_, col) =>
    Array.from({ length: CARDS_PER_COLUMN }, (_, row) =>
      projects[(col * 2 + row) % projects.length]
    )
  );

  return (
    <section
      ref={sectionRef}
      id="work-4"
      aria-label="Featured Projects"
      className="relative z-20 bg-black flex flex-col snap-start"
    >
      {/* ── Header — sits above columns, centered ── */}
      <div className="flex flex-col items-center text-center pt-10 pb-8 px-6">
        <h2 className="text-3xl md:text-5xl font-sans font-bold leading-tight tracking-tight text-white max-w-sm">
          Work that speaks.
        </h2>
        <p className="mt-4 text-sm text-white/50 font-sans max-w-xs leading-relaxed">
          A curated selection of projects — each built with precision,
          performance, and a sharp eye for design.
        </p>
      </div>

      {/* ── Columns ── */}
      <div
        className="w-full overflow-hidden grid grid-cols-5 gap-[6px] px-[6px] h-[50vh] md:h-[75vh]"
      >
        {columns.map((colProjects, colIndex) => {
          const { aspect, direction, speed } = COLUMN_CONFIGS[colIndex];
          return (
            <ParallaxColumn
              key={colIndex}
              projects={colProjects}
              aspect={aspect}
              direction={direction}
              speed={speed}
              sectionRef={sectionRef}
              scrollContainerRef={scrollContainerRef}
            />
          );
        })}
      </div>
    </section>
  );
};
