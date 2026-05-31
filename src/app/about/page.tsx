"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { useSidebarStore } from "@/store/sidebarStore";
import tanvirImg from "@/assets/images/tanvir.png";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const skills = [
  "Next.js", "Node.js", "TypeScript", "Tailwind CSS",
  "React", "PostgreSQL", "MongoDB", "Redis",
  "PHP / Laravel", "Python", "AWS S3", "Framer Motion",
];

const experience = [
  {
    id: "01",
    org: "Frooxi",
    role: "Co-Founder",
    period: "Nov 2024 — Present",
    description:
      "Co-founding and leading Frooxi — a growing software company building modern digital solutions for startups and B2B businesses. Responsible for client communication, project planning, technical execution, and team coordination across a 4-member team.",
    tags: ["MERN", "Next.js", "AI Workflows", "B2B"],
  },
  {
    id: "02",
    org: "Dhaka College Photography Club",
    role: "Secretary General",
    period: "Feb 2026 — Present",
    description:
      "Leading a 60+ member photography community. Managing weekly executive meetings, cross-club collaborations with DCMUN and Debating Society, and organizing photowalks and practical learning sessions.",
    tags: ["Leadership", "Event Planning", "Team Coordination"],
  },
  {
    id: "03",
    org: "Bangladesh Scouts",
    role: "Rover Scout",
    period: "Feb 2016 — Present",
    description:
      "Active member since 2016. Achieved the prestigious Shapla Cub Award in 2017 — the highest recognition for Cub Scouts in Bangladesh. Represented Bangladesh at the 32nd Asia-Pacific Regional Scout Jamboree in 2023.",
    tags: ["Leadership", "Community Service", "International"],
  },
];

const philosophy = [
  { label: "Build clear, useful, practical systems." },
  { label: "Constantly learn by working." },
  { label: "Avoid unnecessary complexity." },
];

/* ─── Fade-in wrapper ────────────────────────────────────────────────────── */
const FadeUp = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Section label ──────────────────────────────────────────────────────── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-6 md:mb-8">
    <span className="block h-px w-10 bg-black/20" />
    <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40">
      {children}
    </span>
  </div>
);

/* ─── About Page ─────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const { setHidden } = useSidebarStore();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  return (
    <MainLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-10 px-8 md:px-16 xl:pl-[160px] xl:pr-24"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <Link
          href="/"
          className="inline-block text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40 hover:text-black/80 transition-colors mb-6"
        >
          ← Back
        </Link>

        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          {/* Name + tagline */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40 mb-3"
            >
              About
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="text-5xl md:text-8xl font-sans font-bold tracking-tighter text-black uppercase leading-[0.9]"
            >
              Tanvir<br />Almas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-4 text-black/40 text-sm font-sans uppercase tracking-widest"
            >
              Founder @Frooxi · Full Stack Developer · Dhaka, Bangladesh
            </motion.p>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-40 h-40 md:w-52 md:h-52 shrink-0 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
          >
            <Image
              src={tanvirImg}
              alt="Tanvir Almas"
              fill={false}
              width={208}
              height={208}
              className="w-full h-full object-cover object-top"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Summary ──────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <SectionLabel>Summary</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <FadeUp>
              <p className="text-xl md:text-2xl font-sans font-bold leading-[1.2] tracking-tight text-black">
                Developing practical digital solutions for startups and small businesses that
                increase efficiency, improve communication, and scalability without adding
                unnecessary complexity.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="space-y-4 text-black/60 font-serif text-base leading-relaxed">
                <p>
                  I started by learning through building — creating simple web pages and studying
                  design and logic in practice. Over time, this evolved into systematic learning of
                  web development, system design, and understanding the impact of technical choices
                  on business processes.
                </p>
                <p>
                  Most software fails not due to a lack of functions, but due to the inability to
                  understand the workflow when the system becomes more complex. That is what I focus
                  on.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <SectionLabel>Philosophy</SectionLabel>
          <div className="flex flex-col">
            {philosophy.map((item, index) => (
              <FadeUp key={item.label} delay={index * 0.06}>
                <div className="group py-5 md:py-6 border-b border-black/5 flex items-center gap-6">
                  <span className="text-[10px] font-sans font-black text-black/20 tracking-widest group-hover:text-black transition-colors duration-500 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg md:text-2xl font-sans font-bold text-black/50 group-hover:text-black transition-colors duration-500 tracking-tight">
                    {item.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Currently Working On ─────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <SectionLabel>Currently Working On</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Web Development",
              "Software Systems Thinking",
              "System Design Fundamentals",
              "AI-assisted Development Workflows",
              "Product Logic & Workflow Design",
              "Business Research Before Execution",
              "Team Coordination & Project Management",
            ].map((item, index) => (
              <FadeUp key={item} delay={index * 0.05}>
                <div className="group border border-black/8 px-5 py-4 hover:border-black/30 hover:bg-black hover:text-white transition-all duration-500 cursor-default">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-black group-hover:text-white transition-colors duration-500">
                    {item}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <FadeUp key={skill} delay={index * 0.03}>
                <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-black/50 border border-black/10 px-3 py-1.5 hover:text-black hover:border-black transition-all duration-300 cursor-default">
                  {skill}
                </span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <SectionLabel>Experience</SectionLabel>
          <div className="flex flex-col">
            {experience.map((item, index) => (
              <FadeUp key={item.id} delay={index * 0.08}>
                <div className="group py-8 border-b border-black/5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="text-[10px] font-sans font-black text-black/20 tracking-widest group-hover:text-black transition-colors duration-500">
                      {item.id}
                    </span>
                  </div>

                  {/* Org + role */}
                  <div className="md:col-span-3">
                    <h3 className="text-base font-sans font-bold uppercase tracking-tight text-black">
                      {item.org}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-black/40 font-sans mt-1">
                      {item.role}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-6">
                    <p className="text-black/60 font-serif text-base leading-relaxed group-hover:text-black/80 transition-colors duration-500">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-black/30 border border-black/10 px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Period */}
                  <div className="md:col-span-2 md:text-right">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-black/30">
                      {item.period}
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <SectionLabel>Education</SectionLabel>
          <FadeUp>
            <div className="group py-8 border-b border-black/5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4">
                <h3 className="text-base font-sans font-bold uppercase tracking-tight text-black">
                  Dhaka College
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/40 font-sans mt-1">
                  Higher Secondary Certificate · Science
                </p>
              </div>
              <div className="md:col-span-6">
                <p className="text-black/60 font-serif text-base leading-relaxed">
                  Currently pursuing HSC in the Science Department, balancing academics with
                  active involvement in the Photography Club and ongoing professional work at Frooxi.
                </p>
              </div>
              <div className="md:col-span-2 md:text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-black/30">
                  Aug 2024 — Aug 2026
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl">
          <FadeUp>
            <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40 mb-4">
              Let's Connect
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl md:text-6xl font-sans font-bold tracking-tighter text-black uppercase leading-[0.9] mb-8">
              Looking forward<br />to meeting you.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:tanvir.imon68@gmail.com"
                className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-black/80 transition-colors"
              >
                tanvir.imon68@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/tanvir-almas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-black text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/dev-tanvu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-black text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </MainLayout>
  );
}
