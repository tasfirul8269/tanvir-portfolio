"use client";

import React, { useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Force a scroll to top on every refresh
    const container = document.getElementById("main-scroll-container");
    if (container) {
      // Use a small timeout to ensure the DOM is ready and override browser scroll restoration
      const timer = setTimeout(() => {
        container.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div 
      id="main-scroll-container"
      className="relative h-screen bg-[#F5F2ED] dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-y-auto snap-y snap-proximity no-scrollbar"
      style={{ scrollPaddingTop: '6rem' }}
    >
      <Header />
      <Sidebar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
