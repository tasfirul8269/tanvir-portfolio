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
      <footer id="contact" className="relative min-h-screen flex items-center py-24 md:py-40 px-6 md:px-24 bg-black text-white font-serif snap-start">
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
