"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  /** Optional scroll container ref (e.g. a custom overflow-y-auto div) */
  scrollContainer?: React.RefObject<HTMLElement | null>;
}

export function TextReveal({ children, className, scrollContainer }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer as React.RefObject<HTMLElement> | undefined,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap gap-x-[0.25em] gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
          );
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
}
