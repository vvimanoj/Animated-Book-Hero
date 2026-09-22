"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HeroProgress } from "./HeroProgress";

interface HeroNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  isTransitioning: boolean;
  autoplayDuration: number;
  isAutoplayPaused: boolean;
  onAutoplayTick: () => void;
  accentColor: string;
  bookNumber: string;
  totalBooks: number;
  onTogglePause?: () => void;
}

export const HeroNavigation: React.FC<HeroNavigationProps> = ({
  onPrev,
  onNext,
  isTransitioning,
  autoplayDuration,
  isAutoplayPaused,
  onAutoplayTick,
  accentColor,
  bookNumber,
  totalBooks,
  onTogglePause,
}) => {
  return (
    <div className="hero-nav-elem flex items-center justify-between gap-4 w-full z-20 pointer-events-auto">
      {/* Progress & Autoplay status */}
      <HeroProgress
        duration={autoplayDuration}
        isPaused={isAutoplayPaused || isTransitioning}
        onComplete={onAutoplayTick}
        accentColor={accentColor}
        bookNumber={bookNumber}
        totalBooks={totalBooks}
        onTogglePause={onTogglePause}
      />

      {/* Prev / Next Minimalist Directional Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isTransitioning}
          className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-[#111318]/70 backdrop-blur-md text-stone-300 hover:text-white hover:border-amber-400/50 hover:bg-white/[0.08] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous Featured Volume (Arrow Left)"
          title="Previous Volume (←)"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={onNext}
          disabled={isTransitioning}
          className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-[#111318]/70 backdrop-blur-md text-stone-300 hover:text-white hover:border-amber-400/50 hover:bg-white/[0.08] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next Featured Volume (Arrow Right)"
          title="Next Volume (→)"
        >
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
