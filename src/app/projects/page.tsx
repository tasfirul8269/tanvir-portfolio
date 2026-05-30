import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectCard } from "@/components/sections/FeaturedProjects";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <MainLayout>
      <section className="relative z-20 bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col gap-4">
            <Link href="/" className="text-xs uppercase tracking-[0.4em] font-sans font-bold text-black/40 hover:text-black/80 transition-colors w-fit">
              ← Back to Home
            </Link>
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-bold text-black/40">All Work</span>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-black">All Projects</h1>
          </div>

          <div className="flex flex-col">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
