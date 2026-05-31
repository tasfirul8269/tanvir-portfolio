"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useAnimationControls, useSpring } from "framer-motion";

const SIZE = 105;
const MAX_FACE_OFFSET = 6;

// 6-lobe flower shape matching the reference frames:
// perfectly round lobes, symmetric, puffy cloud-flower
const BLOB_PATH = `
  M 65 12
  C 78 12, 88 20, 90 30
  C 98 27, 108 33, 108 44
  C 118 48, 120 60, 113 68
  C 120 76, 117 88, 107 91
  C 105 101, 96 108, 86 107
  C 82 116, 72 120, 65 116
  C 58 120, 48 116, 44 107
  C 34 108, 25 101, 23 91
  C 13 88, 10 76, 17 68
  C 10 60, 12 48, 22 44
  C 22 33, 32 27, 40 30
  C 42 20, 52 12, 65 12 Z
`;

export function BlobFace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isTickling, setIsTickling] = useState(false);
  const tickleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controls = useAnimationControls();

  const faceX = useSpring(0, { stiffness: 85, damping: 18 });
  const faceY = useSpring(0, { stiffness: 85, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const factor = Math.min(1, 200 / dist);
      faceX.set((dx / dist) * MAX_FACE_OFFSET * factor);
      faceY.set((dy / dist) * MAX_FACE_OFFSET * factor);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [faceX, faceY]);

  const handleClick = useCallback(() => {
    if (isTickling) return;
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setIsTickling(true);
      setClickCount(0);
      controls.start({
        rotate: [0, -13, 13, -10, 10, -6, 6, -2, 2, 0],
        scale: [1, 1.13, 0.91, 1.11, 0.94, 1.05, 0.98, 1.02, 1],
        transition: { duration: 0.75, ease: "easeInOut" },
      });
      if (tickleTimer.current) clearTimeout(tickleTimer.current);
      tickleTimer.current = setTimeout(() => setIsTickling(false), 1400);
    }
  }, [clickCount, isTickling, controls]);

  // Mouth paths — thin, small, cute like the reference
  // Resting: very subtle upward curve
  // Hover: clear small smile
  // Tickle: open happy mouth
  const mouthResting = "M 56 72 Q 65 77 74 72";
  const mouthSmile   = "M 54 71 Q 65 80 76 71";
  const mouthLaugh   = "M 50 70 Q 65 84 80 70";

  const mouthD = isTickling ? mouthLaugh : isHovered ? mouthSmile : mouthResting;

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        faceX.set(0);
        faceY.set(0);
      }}
      className="cursor-pointer select-none"
      style={{ width: SIZE, height: SIZE }}
      title="Click 3× to tickle!"
    >
      <svg
        viewBox="0 0 130 130"
        width={SIZE}
        height={SIZE}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="blobG" cx="40%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#a8dcf8" />
            <stop offset="45%"  stopColor="#55b4ec" />
            <stop offset="100%" stopColor="#2e8fd4" />
          </radialGradient>
          <filter id="blobDrop" x="-15%" y="-15%" width="130%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1a6aaa" floodOpacity="0.18" />
          </filter>
          <clipPath id="blobClip2">
            <path d={BLOB_PATH} />
          </clipPath>
        </defs>

        {/* Blob body — static */}
        <path d={BLOB_PATH} fill="url(#blobG)" filter="url(#blobDrop)" />

        {/* Face group — translates as one unit */}
        <motion.g clipPath="url(#blobClip2)" style={{ x: faceX, y: faceY }}>

          {/* Eyes — small filled dots like the reference */}
          {!isTickling ? (
            <>
              {/* Left eye */}
              <circle cx="50" cy="58" r="5" fill="#2c4e7a" />
              <circle cx="51.2" cy="56.8" r="1.8" fill="#162e4a" />
              <circle cx="52" cy="55.8" r="1" fill="white" opacity="0.5" />
              {/* Right eye */}
              <circle cx="80" cy="58" r="5" fill="#2c4e7a" />
              <circle cx="81.2" cy="56.8" r="1.8" fill="#162e4a" />
              <circle cx="82" cy="55.8" r="1" fill="white" opacity="0.5" />
            </>
          ) : (
            <>
              {/* ^_^ tickle eyes */}
              <path d="M 44 59 Q 50 51 56 59" stroke="#2c4e7a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 74 59 Q 80 51 86 59" stroke="#2c4e7a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Mouth — thin curved line, smooth morph */}
          <path
            d={mouthD}
            stroke="#2a7abf"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            style={{ transition: "d 0.5s cubic-bezier(0.34, 1.3, 0.64, 1)" }}
          />

          {/* Rosy cheeks */}
          <ellipse
            cx="38" cy="70" rx="9" ry="5"
            fill="#f08080"
            opacity={isHovered || isTickling ? 0.22 : 0}
            style={{ transition: "opacity 0.45s ease" }}
          />
          <ellipse
            cx="92" cy="70" rx="9" ry="5"
            fill="#f08080"
            opacity={isHovered || isTickling ? 0.22 : 0}
            style={{ transition: "opacity 0.45s ease" }}
          />

          {/* Tickle extras */}
          {isTickling && (
            <>
              <path d="M 28 62 Q 23 67 28 72" stroke="#2a7abf" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55" />
              <path d="M 102 62 Q 107 67 102 72" stroke="#2a7abf" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55" />
              <text x="16" y="50" fontSize="11" opacity="0.65">✦</text>
              <text x="98" y="47" fontSize="9"  opacity="0.6">✦</text>
              <text x="58" y="18" fontSize="8"  opacity="0.5">✦</text>
            </>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
