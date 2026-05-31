"use client";

import { create } from 'zustand';

interface SidebarStore {
  isHidden: boolean;
  setHidden: (hidden: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isHidden: false,
  setHidden: (hidden) => set({ isHidden: hidden }),
}));
