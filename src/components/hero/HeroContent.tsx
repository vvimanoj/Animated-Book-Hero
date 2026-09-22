"use client";

import React from "react";
import { ArrowRight, Bookmark, Sparkles, Feather } from "lucide-react";
import { Book } from "@/data/books";
import { ExtractedColorTheme } from "@/lib/colorExtractor";

interface HeroContentProps {
  book: Book;
  theme: ExtractedColorTheme;
  onDiscoverClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  book,
  theme,
  onDiscoverClick,
}) => {
  return (
    <div className="flex flex-col justify-center max-w-2xl xl:max-w-3xl z-20 text-left pointer-events-auto">
      {/* Category Eyebrow & Index */}
      <div className="hero-content-elem hero-text-animate flex items-center gap-3 mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono tracking-[0.25em] uppercase font-semibold border transition-colors duration-500"
          style={{
            borderColor: theme.surfaceBorder,
            backgroundColor: `${theme.accentColor}18`,
            color: theme.highlightColor,
          }}
        >
          <Sparkles className="w-3 h-3" style={{ color: theme.highlightColor }} />
          {book.eyebrow}
        </span>
        <span className="text-[11px] font-mono tracking-widest text-stone-400">
          VOL. {book.number} / 08
        </span>
      </div>

      {/* Book Title */}
      <h1 className="hero-content-elem hero-text-animate font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.06] text-[#F4EFEA] mb-3">
        {book.title}
      </h1>

      {/* Author & Role */}
      <div className="hero-content-elem hero-text-animate flex items-center gap-2.5 mb-6 text-stone-300">
        <span className="text-[13px] tracking-widest uppercase font-sans text-stone-400">
          BY
        </span>
        <span
          className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal italic tracking-wide transition-colors duration-500"
          style={{ color: theme.highlightColor }}
        >
          {book.author}
        </span>
        <span className="text-stone-500">•</span>
        <span className="text-[11px] font-mono tracking-wider text-stone-400">
          {book.year}
        </span>
      </div>

      {/* Short Description */}
      <p className="hero-content-elem hero-text-animate text-stone-300 font-sans text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide font-light mb-8 max-w-xl xl:max-w-2xl">
        {book.description}
      </p>

      {/* Quick Specs Pill Row */}
      <div className="hero-content-elem hero-text-animate flex flex-wrap items-center gap-3 mb-8 text-[11px] font-mono text-stone-300">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08]">
          <Feather className="w-3.5 h-3.5 text-stone-400" />
          <span>{book.stats.binding.split(" ")[0]} Edition</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08]">
          <Bookmark className="w-3.5 h-3.5 text-stone-400" />
          <span>{book.stats.pages}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08]">
          <span>{book.category}</span>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="hero-content-elem hero-text-animate flex items-center gap-4">
        <button
          onClick={onDiscoverClick}
          id="discover-book-btn"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-sm overflow-hidden font-sans text-xs tracking-[0.22em] uppercase font-bold text-stone-950 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]"
          style={{
            backgroundColor: theme.highlightColor,
            boxShadow: `0 10px 30px -10px ${theme.glowColor}`,
          }}
          aria-label={`Discover full edition details for ${book.title}`}
        >
          <span className="relative z-10">DISCOVER BOOK</span>
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <button
          onClick={onDiscoverClick}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm text-xs font-sans tracking-[0.2em] uppercase text-stone-300 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all duration-200"
        >
          READ EXCERPT
        </button>
      </div>
    </div>
  );
};
