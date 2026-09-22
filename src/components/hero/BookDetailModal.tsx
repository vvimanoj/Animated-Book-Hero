"use client";

import React, { useEffect, useRef } from "react";
import { X, Feather, BookOpen, Star, ShieldCheck, ArrowRight, Share2 } from "lucide-react";
import { Book } from "@/data/books";
import { BookCoverView } from "./BookCoverView";
import { gsap } from "@/lib/gsap";

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(modalRef.current, { display: "flex", opacity: 0 })
        .set(coverRef.current, { scale: 0.9, y: 25, opacity: 0 })
        .set(".modal-reveal-elem", { opacity: 0, y: 15 })
        .to(modalRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(
          coverRef.current,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "expo.out",
          },
          0.1
        )
        .to(
          ".modal-reveal-elem",
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.5,
          },
          0.2
        );
    } else {
      document.body.style.overflow = "unset";

      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (modalRef.current) {
            modalRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isOpen]);

  if (!book) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
      className="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto"
    >
      {/* Click outside backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-transparent cursor-pointer"
        aria-hidden="true"
      />

      {/* Main Reading Room Container */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl bg-[#0d0f14] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-10 my-auto text-left"
        style={{
          boxShadow: `0 30px 100px -20px ${book.accentColor}33, 0 0 1px 1px rgba(255,255,255,0.1) inset`,
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0a0c10]/90">
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm tracking-widest text-stone-300 uppercase">
              MVVNX1 ARCHIVES • FOLIO {book.number}
            </span>
            <span className="text-stone-500">|</span>
            <span className="text-xs font-mono text-amber-400">
              {book.stats.isbn}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Book Details (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Grid */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-h-[82vh] overflow-y-auto">
          {/* Left Column: Expanded Hardcover Artwork & Specs */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={coverRef}
              className="relative w-full max-w-[320px] aspect-[1/1.5] rounded-[4px] overflow-hidden book-shadow-3d bg-[#151820]"
            >
              <BookCoverView book={book} isThumbnail={false} />
            </div>

            {/* Quick Actions underneath book cover */}
            <div className="w-full max-w-[320px] mt-6 flex flex-col gap-3">
              <button
                className="w-full py-3.5 px-4 rounded font-sans text-xs tracking-[0.2em] uppercase font-bold text-stone-900 transition-all hover:brightness-110 flex items-center justify-center gap-2"
                style={{ backgroundColor: book.highlightColor }}
              >
                <span>ACQUIRE HARDCOVER EDITION • $48</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* Right Column: Editorial Dossier & Excerpt */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category & Year */}
            <div className="modal-reveal-elem flex items-center gap-3 mb-2">
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase font-semibold">
                {book.category}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs font-mono text-stone-400">First Issued {book.year}</span>
            </div>

            {/* Book Title */}
            <h2
              id="modal-book-title"
              className="modal-reveal-elem font-serif text-3xl sm:text-4xl text-white font-normal mb-2 leading-tight"
            >
              {book.title}
            </h2>

            {/* Subtitle & Author */}
            <p className="modal-reveal-elem font-serif text-lg italic text-stone-300 mb-4">
              {book.subtitle}
            </p>

            <div className="modal-reveal-elem flex items-center gap-2 mb-6 pb-6 border-b border-white/[0.08]">
              <span className="text-xs font-sans tracking-widest text-stone-400 uppercase">
                AUTHOR:
              </span>
              <span className="font-serif text-base text-amber-300 font-medium">
                {book.author}
              </span>
              <span className="text-xs text-stone-500">({book.authorRole})</span>
            </div>

            {/* Critical Accolades */}
            <div className="modal-reveal-elem mb-6 p-4 rounded bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[11px] font-mono text-stone-400 ml-2">
                  CRITICAL ACCLAIM
                </span>
              </div>
              <p className="font-serif italic text-sm text-stone-200 leading-relaxed mb-2">
                "{book.reviews[0].quote}"
              </p>
              <div className="text-[11px] font-mono text-stone-400 flex items-center justify-between">
                <span>— {book.reviews[0].publication}</span>
                <span className="text-amber-400/80">{book.reviews[0].critic}</span>
              </div>
            </div>

            {/* Curatorial Note */}
            <div className="modal-reveal-elem mb-6">
              <h4 className="text-xs font-mono tracking-[0.2em] text-stone-400 uppercase mb-2">
                THE CURATOR'S NOTE
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                {book.curatorNote}
              </p>
            </div>

            {/* First Pages Excerpt */}
            <div className="modal-reveal-elem mb-6 p-5 rounded bg-[#07080b] border border-white/[0.08] relative">
              <div className="flex items-center gap-2 mb-3 text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-mono tracking-[0.2em] uppercase font-semibold">
                  CHAPTER I • OPENING FOLIO
                </span>
              </div>
              <p className="font-serif text-base sm:text-lg italic text-stone-300 leading-relaxed pl-3 border-l-2 border-amber-400/40">
                {book.excerpt}
              </p>
            </div>

            {/* Manufacturing & Craftsmanship Specs */}
            <div className="modal-reveal-elem pt-4 border-t border-white/[0.08]">
              <h4 className="text-xs font-mono tracking-[0.2em] text-stone-400 uppercase mb-3 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ARCHIVAL CRAFTSMANSHIP SPECIFICATIONS</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-stone-400">
                <div>
                  <span className="text-stone-500 block">BINDING:</span>
                  <span className="text-stone-200">{book.stats.binding}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">EXTENT:</span>
                  <span className="text-stone-200">{book.stats.pages}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">PAPER:</span>
                  <span className="text-stone-200">120gsm Munken Pure Cream</span>
                </div>
                <div>
                  <span className="text-stone-500 block">IMPRINT:</span>
                  <span className="text-stone-200">{book.stats.imprint}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
