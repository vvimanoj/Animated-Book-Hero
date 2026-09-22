"use client";

import React, { useEffect, useRef } from "react";
import { Book } from "@/data/books";
import { ExtractedColorTheme } from "@/lib/colorExtractor";
import { BookCoverView } from "./BookCoverView";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface HeroBookProps {
  currentBook: Book;
  currentTheme: ExtractedColorTheme;
  incomingBook?: Book | null;
  incomingTheme?: ExtractedColorTheme | null;
  onBookClick?: () => void;
  isTransitioning?: boolean;
  stageRef: React.RefObject<HTMLDivElement>;
  currentCardRef: React.RefObject<HTMLDivElement>;
  incomingCardRef: React.RefObject<HTMLDivElement>;
}

export const HeroBook: React.FC<HeroBookProps> = ({
  currentBook,
  currentTheme,
  incomingBook = null,
  incomingTheme = null,
  onBookClick,
  isTransitioning = false,
  stageRef,
  currentCardRef,
  incomingCardRef,
}) => {
  const floatWrapperRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  // Parallax tracking isolated strictly to the Hero Stage area (desktop pointer only)
  useEffect(() => {
    if (!currentCardRef.current || !stageRef.current) return;
    const isTouchOnly = typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isTouchOnly) return;

    const card = currentCardRef.current;
    const stage = stageRef.current;
    const shadow = shadowRef.current;

    const setRotateY = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power2.out" });
    const setRotateX = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power2.out" });
    const setShadowX = shadow
      ? gsap.quickTo(shadow, "x", { duration: 0.5, ease: "power2.out" })
      : null;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTransitioning) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        // Mouse position normalized relative to stage
        const deltaX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const deltaY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Bounded subtle physical tilt
        setRotateY(-8 + deltaX * 8);
        setRotateX(4 - deltaY * 6);

        if (setShadowX) {
          setShadowX(deltaX * 12);
        }
      });
    };

    const handleMouseLeave = () => {
      setRotateY(-8);
      setRotateX(4);
      if (setShadowX) setShadowX(0);
    };

    stage.addEventListener("mousemove", handleMouseMove, { passive: true });
    stage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      stage.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTransitioning, currentCardRef, stageRef]);

  // Gentle Physical Hover Floating Animation on wrapper
  useEffect(() => {
    if (!floatWrapperRef.current) return;

    floatTweenRef.current = gsap.to(floatWrapperRef.current, {
      y: "-=8",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      floatTweenRef.current?.kill();
    };
  }, []);

  // Pause floating during transitions to eliminate transform conflicts
  useEffect(() => {
    if (!floatTweenRef.current) return;
    if (isTransitioning) {
      floatTweenRef.current.pause();
    } else {
      floatTweenRef.current.resume();
    }
  }, [isTransitioning]);

  return (
    <div
      ref={stageRef}
      className="hero-book-stage relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px] 2xl:max-w-[490px] h-auto aspect-[1/1.5] z-30 perspective-[1400px] select-none"
    >
      {/* Dynamic Ambient Ground Shadow */}
      <div
        ref={shadowRef}
        className="absolute -bottom-8 sm:-bottom-10 w-[82%] h-10 sm:h-14 rounded-full blur-xl sm:blur-2xl opacity-60 sm:opacity-75 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${currentTheme.glowColor} 0%, rgba(0,0,0,0.85) 60%, transparent 100%)`,
        }}
      />

      {/* Floating Isolation Wrapper (No transform conflict with book cards) */}
      <div ref={floatWrapperRef} className="w-full h-full relative">
        
        {/* CURRENT ACTIVE 3D HARDCOVER (Full Fidelity) */}
        <div
          ref={currentCardRef}
          onClick={onBookClick}
          className="hero-active-book absolute inset-0 w-full h-full rounded-[4px] cursor-pointer book-card-preserve-3d group origin-top-left z-10"
          style={{
            transform: "rotateY(-8deg) rotateX(4deg)",
          }}
          title={`Click to inspect ${currentBook.title}`}
        >
          {/* Physical Book Cover Artwork (No Hover Zoom) */}
          <div className="relative w-full h-full rounded-[4px] overflow-hidden book-shadow-3d">
            <BookCoverView book={currentBook} theme={currentTheme} isThumbnail={false} />
          </div>

          {/* 3D Pages Thickness (Gilded Munken Cream) - only shown when resting to prevent dark edge slivers during flight */}
          {!isTransitioning && (
            <>
              <div className="absolute top-1 bottom-1 -right-[7px] w-[8px] bg-gradient-to-r from-[#d9cfbe] via-[#f7f2e7] to-[#baa990] rounded-r-[1px] transform rotate-y-[85deg] origin-left shadow-inner pointer-events-none opacity-90" />
              <div className="absolute -bottom-[7px] left-2 right-1 h-[8px] bg-gradient-to-b from-[#d9cfbe] via-[#f7f2e7] to-[#baa990] rounded-b-[1px] transform rotate-x-[85deg] origin-top shadow-inner pointer-events-none opacity-85" />
            </>
          )}
        </div>

        {/* INCOMING 3D HARDCOVER (Pre-mounted with Full Fidelity during transition) */}
        {incomingBook && (
          <div
            ref={incomingCardRef}
            className="hero-incoming-book absolute inset-0 w-full h-full rounded-[4px] pointer-events-none book-card-preserve-3d origin-top-left z-20"
            style={{
              opacity: 0,
              visibility: "hidden",
            }}
          >
            <div className="relative w-full h-full rounded-[4px] overflow-hidden book-shadow-3d">
              <BookCoverView
                book={incomingBook}
                theme={incomingTheme || currentTheme}
                isThumbnail={false}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
