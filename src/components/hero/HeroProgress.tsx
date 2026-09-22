"use client";

import React, { useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface HeroProgressProps {
  duration: number;
  isPaused: boolean;
  onComplete: () => void;
  accentColor: string;
  bookNumber: string;
  totalBooks: number;
  onTogglePause?: () => void;
}

export const HeroProgress: React.FC<HeroProgressProps> = ({
  duration,
  isPaused,
  onComplete,
  accentColor,
  bookNumber,
  onTogglePause,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!barRef.current) return;

    // Reset bar to 0 on book change
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });
    tweenRef.current?.kill();

    // Hardware-accelerated progress tween (0 React re-renders)
    tweenRef.current = gsap.to(barRef.current, {
      scaleX: 1,
      duration: duration / 1000,
      ease: "none",
      onComplete: () => {
        onCompleteRef.current?.();
      },
    });

    if (isPaused) {
      tweenRef.current.pause();
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [bookNumber, duration]);

  useEffect(() => {
    if (!tweenRef.current) return;
    if (isPaused) {
      tweenRef.current.pause();
    } else {
      tweenRef.current.resume();
    }
  }, [isPaused]);

  return (
    <div className="hero-nav-elem flex items-center gap-3 bg-[#111318]/70 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 select-none gpu-layer">
      <button
        onClick={onTogglePause}
        className="text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center p-0.5"
        title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
        aria-label={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
      >
        {isPaused ? (
          <Pause className="w-3 h-3 text-amber-400 animate-pulse" />
        ) : (
          <Play className="w-3 h-3 fill-current text-stone-400" />
        )}
      </button>

      {/* Hardware-accelerated Progress Track */}
      <div className="relative w-20 sm:w-28 h-[3px] bg-white/15 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 rounded-full gpu-layer"
          style={{
            backgroundColor: accentColor,
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      <span className="text-[10px] font-mono tracking-wider text-stone-400">
        {isPaused ? "PAUSED" : `${Math.round(duration / 1000)}s`}
      </span>
    </div>
  );
};
