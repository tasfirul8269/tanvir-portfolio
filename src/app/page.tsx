import { MainLayout } from "@/components/layout/MainLayout";
import { Hero2 } from "@/components/sections/Hero2";
import { Stats } from "@/components/sections/Stats";
import { Snapshot } from "@/components/sections/Snapshot";
import { Journey } from "@/components/sections/Journey";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { DividerWave } from "@/components/sections/DividerWave";
import { Mindset } from "@/components/sections/Mindset";
import { Learning } from "@/components/sections/Learning";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <MainLayout>
      <Hero2 />
      <FeaturedProjects />
      <Stats />
      <Snapshot />
      <DividerWave />
      <Testimonials />
      <Journey />
      <Mindset />
      <Learning />
      <BeyondCode />
      
      
      {/* Footer Section */}
      <footer id="contact" className="relative h-screen flex items-center py-24 md:py-40 px-6 md:px-24 bg-black text-white font-serif snap-start">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-12">
          <h2 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter uppercase">LET'S CREATE</h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl">
            Currently accepting new projects and collaborations. Reach out to discuss your next big idea.
          </p>
          <a
            href="mailto:tanvir@frooxigroup.com"
            className="text-2xl md:text-4xl font-sans font-bold border-b-2 border-white/20 hover:border-white transition-colors py-2"
          >
            tanvir@frooxigroup.com
          </a>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#"
              className="flex items-center gap-2 px-8 py-4 bg-white text-black font-sans font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download My CV
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-sans font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Meeting
            </a>
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              © 2024 TANVIR ALMAS. ALL RIGHTS RESERVED.
            </span>
            <div className="flex gap-8">
              {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </MainLayout>
  );
}
