"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Book, FULL_CATALOG_500 } from "@/data/books";
import { HeroContent } from "./HeroContent";
import { HeroBook } from "./HeroBook";
import { BookCatalogList } from "./BookCatalogList";
import { HeroNavigation } from "./HeroNavigation";
import { BookDetailModal } from "./BookDetailModal";
import { animateInitialLanding } from "./heroAnimations";
import { BOOK_THEMES, getBookTheme, ExtractedColorTheme } from "@/lib/colorExtractor";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export const BookHero: React.FC = () => {
  // Production catalog dataset of 500+ books
  const books = FULL_CATALOG_500;
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ExtractedColorTheme>(
    getBookTheme(books[0])
  );
  const [incomingTheme, setIncomingTheme] = useState<ExtractedColorTheme | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const ambientBgRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const currentCardRef = useRef<HTMLDivElement>(null);
  const incomingCardRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const touchStartXRef = useRef<number | null>(null);

  const activeBook = books[activeIndex];
  const incomingBook = incomingIndex !== null ? books[incomingIndex] : null;
  const displayBook = incomingBook || activeBook;
  const displayTheme = incomingTheme || activeTheme;
  const totalBooks = books.length;
  // 10-second autoplay interval
  const AUTOPLAY_DURATION = 10000;

  // 1. Sliding Window Preloading: only active ± 2 books
  useEffect(() => {
    const indices = [
      (activeIndex - 1 + totalBooks) % totalBooks,
      activeIndex,
      (activeIndex + 1) % totalBooks,
    ];
    indices.forEach((idx) => {
      const b = books[idx];
      if (b && b.cover) {
        const img = new window.Image();
        img.src = b.cover;
      }
    });
  }, [activeIndex, totalBooks, books]);

  // 2. Initial landing animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateInitialLanding(containerRef.current);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Ultra-Smooth 60fps/120fps Book Flight Transition
  const transitionToBook = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || isTransitioning || incomingIndex !== null) return;

      const nextBook = books[targetIndex];
      const nextTheme = getBookTheme(nextBook);

      setIsTransitioning(true);
      setIncomingIndex(targetIndex);
      setIncomingTheme(nextTheme);
    },
    [activeIndex, isTransitioning, incomingIndex, books]
  );

  // 4. Orchestrated GPU Flight Execution once incoming card is mounted
  useEffect(() => {
    if (incomingIndex === null || !incomingTheme) return;

    const targetIndex = incomingIndex;
    const stageEl = stageRef.current;
    const currentCard = currentCardRef.current;
    const incomingCard = incomingCardRef.current;

    if (!stageEl || !currentCard || !incomingCard) {
      setActiveIndex(targetIndex);
      setActiveTheme(incomingTheme);
      setIncomingIndex(null);
      setIncomingTheme(null);
      setIsTransitioning(false);
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    const stageRect = stageEl.getBoundingClientRect();
    const targetThumbEl = thumbRefs.current[targetIndex];
    const sourceThumbEl = thumbRefs.current[activeIndex];

    // Smooth background color interpolation
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: incomingTheme.bgAtmosphere,
        duration: isMobile ? 0.45 : 0.65,
        ease: "power2.out",
      });
    }

    // Editorial text exit
    gsap.to(".hero-text-animate", {
      y: -10,
      opacity: 0,
      stagger: 0.015,
      duration: isMobile ? 0.14 : 0.18,
      ease: "power2.in",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setActiveIndex(targetIndex);
        setActiveTheme(incomingTheme);
        setIncomingIndex(null);
        setIncomingTheme(null);
        setIsTransitioning(false);

        // Cleanly position resting active card with exact resting 3D perspective
        gsap.set(currentCard, {
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotateY: -8,
          rotateX: 4,
          opacity: 1,
        });
      },
    });

    // Make incoming card visible for flight
    gsap.set(incomingCard, { visibility: "visible" });

    if (isMobile) {
      // 📱 MOBILE TRANSITION: GLIDE FROM SIDE (pure horizontal 60/120fps GPU transform)
      const isForward =
        targetIndex > activeIndex ||
        (activeIndex === totalBooks - 1 && targetIndex === 0);
      const direction = isForward ? 1 : -1;

      // Incoming Book glides in from the side (Right if forward, Left if backward)
      tl.fromTo(
        incomingCard,
        {
          x: direction * 280,
          y: 0,
          z: 30,
          scale: 0.9,
          rotateY: direction * 15,
          rotateX: 2,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotateY: -8,
          rotateX: 4,
          opacity: 1,
          duration: 0.48,
          ease: "power2.out",
        },
        0
      );

      // Outgoing Book glides out to the opposite side
      tl.to(
        currentCard,
        {
          x: -direction * 280,
          y: 0,
          z: -30,
          scale: 0.9,
          rotateY: -direction * 15,
          rotateX: 2,
          opacity: 0,
          transformOrigin: "center center",
          duration: 0.44,
          ease: "power2.in",
        },
        0
      );
    } else {
      // 🖥️ DESKTOP TRANSITION: Apple-style flight from right rail thumbnail
      if (targetThumbEl) {
        const targetRect = targetThumbEl.getBoundingClientRect();
        const dx = targetRect.left - stageRect.left;
        const dy = targetRect.top - stageRect.top;
        const scale = targetRect.width / stageRect.width;

        tl.fromTo(
          incomingCard,
          {
            x: dx,
            y: dy,
            z: 35,
            scale,
            rotateY: 12,
            rotateX: 0,
            opacity: 0.95,
            transformOrigin: "top left",
          },
          {
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            rotateY: -8,
            rotateX: 4,
            opacity: 1,
            duration: 0.65,
          },
          0
        );
      } else {
        tl.fromTo(
          incomingCard,
          {
            x: 260,
            y: 20,
            z: 35,
            scale: 0.8,
            rotateY: 20,
            rotateX: 4,
            opacity: 0,
            transformOrigin: "center center",
          },
          {
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            rotateY: -8,
            rotateX: 4,
            opacity: 1,
            duration: 0.65,
          },
          0
        );
      }

      // Outgoing Book Flight Arc (submerged back in Z so it never cuts into incoming card)
      if (sourceThumbEl) {
        const sourceRect = sourceThumbEl.getBoundingClientRect();
        const dxOut = sourceRect.left - stageRect.left;
        const dyOut = sourceRect.top - stageRect.top;
        const scaleOut = sourceRect.width / stageRect.width;

        tl.to(
          currentCard,
          {
            x: dxOut,
            y: dyOut,
            z: -30,
            scale: scaleOut,
            rotateY: 0,
            rotateX: 0,
            opacity: 0,
            transformOrigin: "top left",
            duration: 0.55,
            ease: "power2.inOut",
          },
          0
        );
      } else {
        tl.to(
          currentCard,
          {
            x: -80,
            y: -20,
            z: -30,
            scale: 0.85,
            rotateY: -20,
            rotateX: 4,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0
        );
      }
    }

    // Synchronized Staggered Text Reveal
    tl.call(
      () => {
        gsap.fromTo(
          ".hero-text-animate",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.025,
            duration: isMobile ? 0.35 : 0.42,
            ease: "power3.out",
          }
        );
      },
      [],
      isMobile ? 0.22 : 0.26
    );
  }, [incomingIndex, incomingTheme, activeIndex]);

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % totalBooks;
    transitionToBook(nextIndex);
  }, [activeIndex, totalBooks, transitionToBook]);

  const handlePrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + totalBooks) % totalBooks;
    transitionToBook(prevIndex);
  }, [activeIndex, totalBooks, transitionToBook]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isModalOpen]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-[#f4efea] editorial-grain pt-24 pb-6 select-none"
      style={{
        backgroundColor: activeTheme.bgAtmosphere,
      }}
      aria-roledescription="carousel"
      aria-label="Featured Publications Showcase"
    >
      {/* Dynamic Ambient Radial Glow */}
      <div
        ref={ambientBgRef}
        className="hero-ambient-glow absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 45% 42%, ${displayTheme.ambientRgba} 0%, rgba(11, 13, 17, 0.4) 50%, rgba(8, 9, 11, 0.98) 85%),
            radial-gradient(circle at 75% 25%, ${displayTheme.accentColor}18 0%, transparent 45%)
          `,
          transition: "background 650ms ease-out",
        }}
      />

      {/* Architectural Edge Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 flex items-center justify-between px-8 sm:px-16">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* Main Edge-to-Edge Container: Left/Center Hero + Right Book Catalog */}
      <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 xl:gap-16 z-10 py-4">
        {/* MAIN HERO STAGE (Content + 3D Book Showcase) on the LEFT / CENTER */}
        <div className="flex-1 w-full flex flex-col justify-center order-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              <HeroContent
                book={displayBook}
                theme={displayTheme}
                onDiscoverClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* 3D Floating Dual-Card Book Stage (ZERO HOVER ZOOM) */}
            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 my-2 lg:my-0">
              <HeroBook
                currentBook={activeBook}
                currentTheme={activeTheme}
                incomingBook={incomingBook}
                incomingTheme={incomingTheme}
                stageRef={stageRef}
                currentCardRef={currentCardRef}
                incomingCardRef={incomingCardRef}
                onBookClick={() => setIsModalOpen(true)}
                isTransitioning={isTransitioning}
              />
            </div>
          </div>

          {/* Directional Navigation & 10-Second Countdown Progress Bar */}
          <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <HeroNavigation
              onPrev={handlePrev}
              onNext={handleNext}
              isTransitioning={isTransitioning}
              autoplayDuration={AUTOPLAY_DURATION}
              isAutoplayPaused={isAutoplayPaused}
              onAutoplayTick={handleNext}
              accentColor={displayTheme.highlightColor}
              bookNumber={displayBook.number}
              totalBooks={totalBooks}
              onTogglePause={() => setIsAutoplayPaused((p) => !p)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Books Catalog Ledger (Virtual windowing for 500+ books) */}
        <div className="order-2 w-full lg:w-auto">
          <BookCatalogList
            books={books}
            activeIndex={activeIndex}
            theme={activeTheme}
            onSelect={(index) => transitionToBook(index)}
            isTransitioning={isTransitioning}
            registerThumbRef={(index, el) => {
              thumbRefs.current[index] = el;
            }}
          />
        </div>
      </div>

      {/* Expanded Reading Room Modal */}
      <BookDetailModal
        book={activeBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
