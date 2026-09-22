"use client";

import React from "react";
import { Book } from "@/data/books";
import { ExtractedColorTheme } from "@/lib/colorExtractor";

interface BookCoverViewProps {
  book: Book;
  theme?: ExtractedColorTheme;
  isThumbnail?: boolean;
}

export const BookCoverView: React.FC<BookCoverViewProps> = ({
  book,
  theme,
  isThumbnail = false,
}) => {
  const hasImage = Boolean(book.cover && book.cover.trim().length > 0);

  // 1. Photographic Artwork Cover
  if (hasImage && book.cover) {
    return (
      <div className="relative w-full h-full bg-[#111317] overflow-hidden select-none rounded-[4px]">
        <img
          src={book.cover}
          alt={`${book.title} cover by ${book.author}`}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Hardcover Spine Lighting Highlight */}
        <div className="absolute inset-0 pointer-events-none book-spine-highlight mix-blend-overlay" />

        {/* Tactile Texture Sheen */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/25 via-transparent to-white/10 opacity-70" />

        {/* Subtle Foil Edge Glow */}
        <div
          className="absolute inset-0 pointer-events-none border rounded-[3px] opacity-80"
          style={{
            borderColor: theme?.surfaceBorder || "rgba(255,255,255,0.15)",
          }}
        />
      </div>
    );
  }

  // 2. Prestigious Clothbound Typographic Hardcover (For books without image)
  const clothBg =
    book.clothbound?.bg ||
    `linear-gradient(145deg, ${book.accentColor}25 0%, #0d0f14 100%)`;
  const foilColor = book.clothbound?.foilColor || book.highlightColor;
  const borderColor = book.clothbound?.border || book.accentColor;

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none p-4 sm:p-7 text-center rounded-[4px]"
      style={{
        background: clothBg,
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.7)",
      }}
    >
      {/* Cloth/Linen Texture Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-20 editorial-grain" />

      {/* Double Foil Fillet Frame */}
      <div
        className="absolute inset-2 sm:inset-3.5 border-2 rounded-[2px] pointer-events-none opacity-60"
        style={{ borderColor }}
      />
      <div
        className="absolute inset-3 sm:inset-5 border border-dashed rounded-[1px] pointer-events-none opacity-40"
        style={{ borderColor: foilColor }}
      />

      {/* Header: Volume Number & Press Monogram */}
      <div className="relative z-10 flex flex-col items-center gap-1 mt-1">
        <span
          className="font-mono text-[9px] sm:text-[11px] tracking-[0.3em] uppercase opacity-75"
          style={{ color: foilColor }}
        >
          {book.clothbound?.motif || "MVVNX1 CLASSICS"}
        </span>
        <div
          className="w-5 sm:w-7 h-[1px] opacity-50"
          style={{ backgroundColor: foilColor }}
        />
      </div>

      {/* Center: Typographic Title & Author stamped in foil */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto px-1 sm:px-2">
        <h3
          className={`font-serif tracking-[0.14em] uppercase font-medium leading-tight mb-2 drop-shadow-sm ${
            isThumbnail ? "text-[8px] line-clamp-2" : "text-xl sm:text-2xl lg:text-3xl"
          }`}
          style={{ color: foilColor }}
        >
          {book.title}
        </h3>
        <p
          className={`font-serif italic tracking-wider opacity-85 ${
            isThumbnail ? "text-[7px]" : "text-xs sm:text-sm text-stone-300"
          }`}
        >
          {book.author}
        </p>
      </div>

      {/* Footer: Colophon Monogram */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-1">
        <span
          className="font-serif text-[11px] sm:text-sm font-semibold tracking-widest border border-amber-400/30 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-black/40"
          style={{ color: foilColor, borderColor }}
        >
          M
        </span>
        {!isThumbnail && (
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-stone-400 uppercase">
            FOLIO {book.number} • VVIMANOJ
          </span>
        )}
      </div>
    </div>
  );
};
