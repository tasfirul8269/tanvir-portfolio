# Tanvir Almas - Personal Portfolio

A highly polished, "Awwwards-level" personal portfolio built for **Tanvir Almas** (Full Stack Web Developer & Founder of Frooxi). This project embodies a "Luxury Minimalism" aesthetic, featuring monochrome palettes, editorial typography, and cinematic motion.

## 🌟 Key Features

- **Luxury Minimalist UI**: A clean, monochrome design (`#F5F2ED` background) with editorial-grade typography.
- **Snap-Scroll Layout**: Seamless section-to-section navigation using `snap-y snap-mandatory`.
- **Infinite Marquee Portfolio**: Dual-row auto-scrolling project showcase with "Slide-to-Detail" hover effects.
- **Interactive "Mindset" Section**: Showcasing engineering philosophy beyond just code.
- **Dynamic Sidebar**: Social navigation with `mix-blend-difference` icons that automatically invert colors based on the section background.
- **Asset Protection**: Critical artwork rendered via HTML5 Canvas to prevent simple inspection and image saving.
- **Performance Optimized**: Built with Next.js 15, Tailwind CSS v4, and Framer Motion for buttery-smooth animations.
- **Mobile Responsive**: Fully optimized for all device sizes with custom mobile-only fallbacks for complex interactions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Typography**: Poppins (Headings) & Roboto Serif (Body/Editorial)
- **Icons**: Lucide React
- **Icons Logic**: Custom CSS Mix-Blend-Difference inversion

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/components/sections`: Individual page sections (Hero, Stats, FeaturedProjects, Mindset, etc.)
- `src/components/layout`: Global layout components (Header, Sidebar, MainLayout)
- `src/components/ui`: Reusable UI primitives (CanvasImage, etc.)
- `src/data/portfolio.ts`: Centralized data store for all portfolio content.
- `src/hooks`: Custom hooks for scroll tracking and UI logic.

## 📄 License

This project is personal property. All rights reserved.

---

Built with ❤️ by Tanvir Almas.
