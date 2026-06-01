"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { useSidebarStore } from "@/store/sidebarStore";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const contactLinks = [
  {
    label: "Email",
    value: "tanvir.imon68@gmail.com",
    href: "mailto:tanvir.imon68@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tanvir-almas",
    href: "https://linkedin.com/in/tanvir-almas",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/dev-tanvu",
    href: "https://github.com/dev-tanvu",
    external: true,
  },
  {
    label: "Company",
    value: "frooxi.com",
    href: "https://frooxi.com",
    external: true,
  },
];

const services = [
  "Web Application Development",
  "B2B Software Solutions",
  "AI-assisted Workflows",
  "System Design & Architecture",
  "UI/UX Implementation",
  "Technical Consulting",
];

/* ─── FadeUp ─────────────────────────────────────────────────────────────── */
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
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Contact Form ───────────────────────────────────────────────────────── */
type FormState = "idle" | "sending" | "sent";

function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate async send — wire up to your preferred service (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("sent");
  };

  const inputBase =
    "w-full bg-transparent border-b border-black/20 py-3 text-sm font-sans text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors duration-300";

  return (
    <AnimatePresence mode="wait">
      {formState === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 py-8"
        >
          <span className="text-3xl md:text-4xl font-sans font-bold tracking-tighter text-black uppercase">
            Message sent.
          </span>
          <p className="text-black/50 font-serif text-base">
            Thanks for reaching out — I&apos;ll get back to you shortly.
          </p>
          <button
            onClick={() => { setFormState("idle"); setFields({ name: "", email: "", message: "" }); }}
            className="mt-4 self-start text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-black/40 hover:text-black transition-colors"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-black/40">
                Name
              </label>
              <input
                name="name"
                value={fields.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className={inputBase}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-black/40">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className={inputBase}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-black/40">
              Message
            </label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me about your project..."
              className={`${inputBase} resize-none`}
            />
          </div>

          <div className="flex items-center gap-6">
            <button
              type="submit"
              disabled={formState === "sending"}
              className="group flex items-center gap-3 px-8 py-3.5 bg-black text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-black/80 disabled:opacity-50 transition-colors"
            >
              {formState === "sending" ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </>
              )}
            </button>
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-black/30">
              or book a call below
            </span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ─── Contact Page ───────────────────────────────────────────────────────── */
export default function ContactPage() {
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

        <FadeUp delay={0.05}>
          <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40 mb-3">
            Contact
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter text-black uppercase leading-[0.9]">
            Let&apos;s<br />Create
          </h1>
        </FadeUp>
        <FadeUp delay={0.18}>
          <p className="mt-4 text-black/50 font-serif text-base max-w-md leading-relaxed">
            Currently accepting new projects and collaborations. Reach out to discuss your next idea.
          </p>
        </FadeUp>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-10 bg-black/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40">
                Send a Message
              </span>
            </div>
            <ContactForm />
          </motion.div>

          {/* Right — links + services */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-12"
          >
            {/* Direct links */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="block h-px w-10 bg-black/20" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40">
                  Direct Links
                </span>
              </div>
              <div className="flex flex-col">
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + index * 0.07 }}
                    className="group py-4 border-b border-black/5 flex items-center justify-between hover:border-black/20 transition-colors duration-300"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-black/30">
                        {link.label}
                      </span>
                      <span className="text-sm font-sans font-bold text-black group-hover:text-black/60 transition-colors duration-300">
                        {link.value}
                      </span>
                    </div>
                    <span className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300 text-lg">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            
          </motion.div>
        </div>
      </section>

      {/* ── Book a call ──────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-black/40 mb-2">
              Prefer a call?
            </p>
            <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-tighter text-black uppercase">
              Book a 30-min meeting
            </h2>
          </div>
          <a
            href="https://calendly.com/tanvir-almas/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-black text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300 shrink-0"
          >
            Open Calendly
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </section>

      {/* ── Footer strip ─────────────────────────────────────────────────── */}
      <section
        className="py-8 px-8 md:px-16 xl:pl-[160px] xl:pr-24 border-t border-black/5"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <div className="max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-sans">
            © 2024 Tanvir Almas. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["LinkedIn", "GitHub", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-black/30 hover:text-black transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
