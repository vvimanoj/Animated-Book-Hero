"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Book } from "@/data/books";
import { ExtractedColorTheme } from "@/lib/colorExtractor";
import { BookCoverView } from "./BookCoverView";
import { Layers } from "lucide-react";

interface BookCatalogListProps {
  books: Book[];
  activeIndex: number;
  theme: ExtractedColorTheme;
  onSelect: (index: number) => void;
  isTransitioning: boolean;
  registerThumbRef: (index: number, el: HTMLDivElement | null) => void;
}

const ITEM_HEIGHT = 76; // Exact height of each book card in desktop ledger
const OVERSCAN = 8; // Number of items to render above and below viewport

interface CatalogItemProps {
  book: Book;
  index: number;
  isActive: boolean;
  theme: ExtractedColorTheme;
  onSelect: (index: number) => void;
  isTransitioning: boolean;
  registerThumbRef: (index: number, el: HTMLDivElement | null) => void;
  topOffset: number;
}

// Desktop Full Ledger Item (with volume number, title, author, category)
const CatalogItem = memo(function CatalogItem({
  book,
  index,
  isActive,
  theme,
  onSelect,
  isTransitioning,
  registerThumbRef,
  topOffset,
}: CatalogItemProps) {
  const thumbRefCallback = useCallback(
    (el: HTMLDivElement | null) => {
      registerThumbRef(index, el);
    },
    [index, registerThumbRef]
  );

  return (
    <button
      onClick={() => {
        if (!isTransitioning && !isActive) {
          onSelect(index);
        }
      }}
      disabled={isTransitioning}
      className={`hero-thumb-elem group relative flex items-center gap-3 p-2 rounded transition-colors duration-150 text-left cursor-pointer focus:outline-none w-full h-[72px] select-none ${
        isActive
          ? "bg-white/[0.08] shadow-sm"
          : "opacity-65 hover:opacity-100 hover:bg-white/[0.03]"
      }`}
      style={{
        position: "absolute",
        top: `${topOffset}px`,
        left: 0,
        right: 0,
        boxShadow: isActive ? `0 0 0 1px ${theme.surfaceBorder}` : undefined,
      }}
      aria-label={`Select Volume ${book.number}: ${book.title} by ${book.author}`}
      aria-current={isActive ? "true" : "false"}
    >
      {/* Volume Number */}
      <span
        className="font-mono text-xs tracking-wider w-6 flex-shrink-0 text-center"
        style={{
          color: isActive ? theme.highlightColor : undefined,
          fontWeight: isActive ? 700 : 400,
        }}
      >
        {book.number}
      </span>

      {/* Mini Book Cover - ZERO HOVER ZOOM */}
      <div
        ref={thumbRefCallback}
        className="relative w-10 h-[56px] rounded-[2px] overflow-hidden bg-[#16181d] flex-shrink-0 book-thumb-shadow"
        style={{
          boxShadow: isActive
            ? `0 0 0 2px ${theme.highlightColor}, 0 6px 16px -4px ${theme.glowColor}`
            : undefined,
        }}
      >
        <BookCoverView book={book} theme={theme} isThumbnail={true} />
      </div>

      {/* Typography Details (Desktop only) */}
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden pr-2">
        <span
          className={`font-serif text-xs font-medium truncate ${
            isActive ? "text-[#F4EFEA]" : "text-stone-300 group-hover:text-white"
          }`}
        >
          {book.title}
        </span>
        <span className="text-[10px] text-stone-400 truncate font-sans">
          {book.author}
        </span>
        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider mt-0.5 truncate">
          {book.category}
        </span>
      </div>

      {/* Active Indicator Left Pill */}
      {isActive && (
        <div
          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full"
          style={{ backgroundColor: theme.highlightColor }}
        />
      )}
    </button>
  );
});

// Mobile Cover-Only Item (JUST the book cover, no titles, no author, no details)
interface MobileCoverItemProps {
  book: Book;
  index: number;
  isActive: boolean;
  theme: ExtractedColorTheme;
  onSelect: (index: number) => void;
  isTransitioning: boolean;
}

const MobileCoverItem = memo(function MobileCoverItem({
  book,
  index,
  isActive,
  theme,
  onSelect,
  isTransitioning,
}: MobileCoverItemProps) {
  return (
    <button
      onClick={() => {
        if (!isTransitioning && !isActive) {
          onSelect(index);
        }
      }}
      disabled={isTransitioning}
      className={`relative flex-shrink-0 w-11 h-[62px] sm:w-12 sm:h-[68px] rounded-[3px] overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none ${
        isActive
          ? "scale-105 opacity-100 z-10"
          : "opacity-55 hover:opacity-90 active:scale-95"
      }`}
      style={{
        boxShadow: isActive
          ? `0 0 0 2px ${theme.highlightColor}, 0 4px 14px -2px ${theme.glowColor}`
          : "0 2px 6px rgba(0,0,0,0.6)",
      }}
      aria-label={`Select Volume ${book.number}`}
      aria-current={isActive ? "true" : "false"}
    >
      <BookCoverView book={book} theme={theme} isThumbnail={true} />
    </button>
  );
});

export const BookCatalogList: React.FC<BookCatalogListProps> = ({
  books,
  activeIndex,
  theme,
  onSelect,
  isTransitioning,
  registerThumbRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileStripRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(580);
  const [range, setRange] = useState({ start: 0, end: 20 });
  const isScrollingRef = useRef(false);
  const totalCount = books.length;
  const totalVirtualHeight = totalCount * ITEM_HEIGHT;

  // Measure desktop container height once and on resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateHeight = () => {
      setContainerHeight(el.clientHeight || 580);
    };
    updateHeight();

    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Desktop Virtual Window scroll handler
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;

    requestAnimationFrame(() => {
      isScrollingRef.current = false;
      const el = containerRef.current;
      if (!el) return;

      const top = el.scrollTop;
      const newStart = Math.max(0, Math.floor(top / ITEM_HEIGHT) - OVERSCAN);
      const newEnd = Math.min(
        totalCount,
        Math.ceil((top + containerHeight) / ITEM_HEIGHT) + OVERSCAN
      );

      setRange((prev) => {
        if (Math.abs(prev.start - newStart) < 2 && Math.abs(prev.end - newEnd) < 2) {
          return prev;
        }
        return { start: newStart, end: newEnd };
      });
    });
  }, [totalCount, containerHeight]);

  // Desktop Auto-scroll to center active book
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targetTop = Math.max(
      0,
      activeIndex * ITEM_HEIGHT - containerHeight / 2 + ITEM_HEIGHT / 2
    );

    el.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  }, [activeIndex, containerHeight]);

  // Mobile Horizontal Auto-scroll to keep active cover centered
  useEffect(() => {
    const strip = mobileStripRef.current;
    if (!strip) return;

    const itemWidth = 54; // Width of mobile cover + gap
    const targetLeft = Math.max(
      0,
      activeIndex * itemWidth - strip.clientWidth / 2 + itemWidth / 2
    );

    strip.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  const visibleBooks = books.slice(range.start, range.end);
  // On mobile, render a window of covers around activeIndex for maximum performance
  const mobileStart = Math.max(0, activeIndex - 18);
  const mobileEnd = Math.min(totalCount, activeIndex + 19);
  const mobileCovers = books.slice(mobileStart, mobileEnd);

  return (
    <aside
      className="hero-thumb-container flex flex-col w-full lg:w-[310px] xl:w-[350px] 2xl:w-[390px] flex-shrink-0 z-30"
      aria-label="Catalogue Ledger of Featured Volumes"
    >
      {/* 📱 MOBILE VIEW: SLEEK HORIZONTAL COVER-ONLY SHELF (No titles, no details) */}
      <div className="flex lg:hidden flex-col w-full mt-2 mb-2 select-none">
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold text-stone-300">
              COLLECTION COVERS
            </span>
          </div>
          <span
            className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]"
            style={{ color: theme.highlightColor }}
          >
            {String(activeIndex + 1).padStart(3, "0")} / {String(books.length).padStart(3, "0")}
          </span>
        </div>

        {/* Horizontal Cover Strip */}
        <div
          ref={mobileStripRef}
          className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth touch-pan-x"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {mobileCovers.map((book, idx) => {
            const actualIndex = mobileStart + idx;
            return (
              <MobileCoverItem
                key={book.id}
                book={book}
                index={actualIndex}
                isActive={actualIndex === activeIndex}
                theme={theme}
                onSelect={onSelect}
                isTransitioning={isTransitioning}
              />
            );
          })}
        </div>
      </div>

      {/* 🖥️ DESKTOP VIEW: FULL EDITORIAL ARCHIVE LEDGER */}
      <div className="hidden lg:flex flex-col w-full">
        {/* Ledger Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] select-none">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold text-stone-300">
              COLLECTION ARCHIVE
            </span>
          </div>
          <span
            className="font-mono text-[10px] tracking-widest px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]"
            style={{ color: theme.highlightColor }}
          >
            {String(activeIndex + 1).padStart(3, "0")} / {String(books.length).padStart(3, "0")}
          </span>
        </div>

        {/* High-speed Virtual Scroll Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative overflow-y-auto max-h-[550px] xl:max-h-[620px] pr-1.5 select-none custom-scrollbar"
          style={{
            height: `${containerHeight}px`,
          }}
        >
          <div
            style={{
              height: `${totalVirtualHeight}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {visibleBooks.map((book, idx) => {
              const actualIndex = range.start + idx;
              const topOffset = actualIndex * ITEM_HEIGHT;

              return (
                <CatalogItem
                  key={book.id}
                  book={book}
                  index={actualIndex}
                  isActive={actualIndex === activeIndex}
                  theme={theme}
                  onSelect={onSelect}
                  isTransitioning={isTransitioning}
                  registerThumbRef={registerThumbRef}
                  topOffset={topOffset}
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
