"use client";

import React from "react";
import { Book } from "@/data/books";
import { ExtractedColorTheme } from "@/lib/colorExtractor";

interface HeroThumbnailsProps {
  books: Book[];
  activeIndex: number;
  theme: ExtractedColorTheme;
  onSelect: (index: number) => void;
  isTransitioning: boolean;
  registerThumbRef: (index: number, el: HTMLDivElement | null) => void;
  flightHiddenIndex?: number | null;
}

export const HeroThumbnails: React.FC<HeroThumbnailsProps> = ({
  books,
  activeIndex,
  theme,
  onSelect,
  isTransitioning,
  registerThumbRef,
  flightHiddenIndex = null,
}) => {
  return (
    <div
      className="hero-thumb-container w-full py-4 border-t border-white/[0.06] bg-[#08090b]/85 backdrop-blur-md z-30 transition-colors duration-700"
      aria-label="Featured Books Carousel Thumbnails"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 sm:gap-6 min-w-max mx-auto md:mx-0">
          {books.map((book, index) => {
            const isActive = index === activeIndex;
            const isHiddenInFlight = flightHiddenIndex === index;

            return (
              <button
                key={book.id}
                onClick={() => {
                  if (!isTransitioning && !isActive) {
                    onSelect(index);
                  }
                }}
                disabled={isTransitioning}
                className={`hero-thumb-elem group relative flex items-center gap-3.5 p-2 rounded transition-all duration-200 text-left cursor-pointer focus:outline-none ${
                  isActive
                    ? "bg-white/[0.08] shadow-inner"
                    : "opacity-65 hover:opacity-100 hover:bg-white/[0.03]"
                }`}
                style={{
                  boxShadow: isActive ? `0 0 0 1px ${theme.surfaceBorder}` : undefined,
                }}
                aria-label={`Select Book ${book.number}: ${book.title} by ${book.author}`}
                aria-current={isActive ? "true" : "false"}
              >
                {/* Book Index Number */}
                <span
                  className="font-mono text-xs tracking-wider transition-colors duration-200"
                  style={{
                    color: isActive ? theme.highlightColor : undefined,
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {book.number}
                </span>

                {/* Thumbnail Book Miniature & Ref Target */}
                <div
                  ref={(el) => registerThumbRef(index, el)}
                  className={`relative w-9 h-[54px] sm:w-11 sm:h-[66px] rounded-[2px] overflow-hidden bg-[#16181d] flex-shrink-0 transition-transform duration-200 book-thumb-shadow gpu-layer ${
                    isHiddenInFlight ? "opacity-0" : "opacity-100"
                  } ${
                    isActive
                      ? "scale-105 ring-2"
                      : "group-hover:scale-105 group-hover:ring-1 group-hover:ring-white/20"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 0 2px ${theme.highlightColor}` : undefined,
                  }}
                >
                  <img
                    src={book.cover}
                    alt=""
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {/* Subtle Spine Line on Thumbnail */}
                  <div className="absolute top-0 bottom-0 left-[2px] w-[1px] bg-black/50" />
                </div>

                {/* Typography Metadata */}
                <div className="hidden lg:flex flex-col max-w-[130px] xl:max-w-[150px]">
                  <span
                    className={`font-serif text-xs font-medium truncate transition-colors duration-200 ${
                      isActive ? "text-[#F4EFEA]" : "text-stone-300 group-hover:text-white"
                    }`}
                  >
                    {book.title}
                  </span>
                  <span className="text-[10px] text-stone-400 truncate font-sans">
                    {book.author}
                  </span>
                </div>

                {/* Active Underline Pill */}
                {isActive && (
                  <div
                    className="absolute -bottom-2 left-2 right-2 h-[2px] rounded-full transition-all duration-300"
                    style={{ backgroundColor: theme.highlightColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Catalog Count Indicator */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-stone-400 tracking-widest pl-4">
          <span className="font-bold" style={{ color: theme.highlightColor }}>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span>/</span>
          <span>{String(books.length).padStart(2, "0")} VOLUMES</span>
        </div>
      </div>
    </div>
  );
};
