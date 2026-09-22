"use client";

import React from "react";
import { Compass, Github, Instagram } from "lucide-react";

interface TopNavProps {
  onExploreClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onExploreClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-6 sm:px-10 lg:px-14 py-5 transition-all duration-300 backdrop-blur-md bg-[#08090b]/70 border-b border-white/[0.04]">
      <div className="w-full flex items-center justify-between">
        {/* Brand / Colophon Monogram */}
        <a
          href="https://instagram.com/mvvnx1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group cursor-pointer"
          title="mvvnx1 on Instagram"
        >
          <div className="w-8 h-8 rounded-sm border border-amber-500/30 flex items-center justify-center bg-amber-500/[0.06] text-amber-400 font-serif text-sm font-semibold tracking-wider transition-transform duration-500 group-hover:scale-105">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.22em] text-sm font-medium uppercase text-stone-100 group-hover:text-amber-300 transition-colors">
              mvvnx1
            </span>
            <span className="text-[9px] tracking-[0.24em] uppercase text-stone-400 font-mono">
              @vvimanoj
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 lg:gap-12" aria-label="Main Navigation">
          <a
            href="#books"
            className="text-[11px] tracking-[0.24em] font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200 relative py-1 group"
          >
            CATALOGUE
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400/70 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="https://instagram.com/mvvnx1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.24em] font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200 relative py-1 group flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5 text-amber-400/80" />
            <span>@MVVNX1</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400/70 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="https://github.com/vvimanoj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.24em] font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200 relative py-1 group flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5 text-stone-300" />
            <span>@VVIMANOJ</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400/70 transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-3 sm:gap-4 text-stone-300">
          <a
            href="https://github.com/vvimanoj"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-[11px] font-mono tracking-wider text-stone-300 hover:text-white hover:border-amber-400/40 hover:bg-white/[0.04] transition-all"
            title="GitHub: @vvimanoj"
          >
            <Github className="w-3.5 h-3.5 text-stone-300" />
            <span className="hidden sm:inline">vvimanoj</span>
          </a>

          <a
            href="https://instagram.com/mvvnx1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-[11px] font-mono tracking-wider text-stone-300 hover:text-white hover:border-amber-400/40 hover:bg-white/[0.04] transition-all"
            title="Instagram: @mvvnx1"
          >
            <Instagram className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">mvvnx1</span>
          </a>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <button
            onClick={onExploreClick}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 text-[10px] tracking-[0.16em] uppercase text-stone-300 hover:text-stone-100 hover:border-amber-400/40 hover:bg-white/[0.03] transition-all"
          >
            <Compass className="w-3 h-3 text-amber-400" />
            <span>EXPLORE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
