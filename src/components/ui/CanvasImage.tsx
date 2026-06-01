"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface CanvasImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CanvasImage = ({ src, alt, className }: CanvasImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    
    const handleLoad = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };

    img.onload = handleLoad;
    img.src = src;

    // Handle cached images
    if (img.complete) {
      handleLoad();
    }
  }, [src]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={className}
      aria-label={alt}
      role="img"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
};
