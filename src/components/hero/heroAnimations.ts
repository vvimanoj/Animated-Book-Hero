"use client";

import { gsap, Flip, prefersReducedMotion } from "@/lib/gsap";

/**
 * Initial page load landing animation sequence
 */
export const animateInitialLanding = (
  containerRef: HTMLElement | null,
  options?: { onComplete?: () => void }
) => {
  if (!containerRef) return;

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      // Clear props on animated elements so subsequent interactive tweens have clean baseline
      gsap.set([".hero-content-elem", ".hero-thumb-elem", ".hero-nav-elem"], {
        clearProps: "transform,opacity",
      });
      options?.onComplete?.();
    },
  });

  // Set initial states
  tl.set(".hero-ambient-glow", { opacity: 0, scale: 0.85 })
    .set(".hero-content-elem", { opacity: 0, y: 25 })
    .set(".hero-book-stage", { opacity: 0, y: 50, scale: 0.9, rotateY: -15, rotateX: 10 })
    .set(".hero-thumb-elem", { opacity: 0, y: 30 })
    .set(".hero-nav-elem", { opacity: 0, y: 15 });

  // Orchestrated entrance
  tl.to(
    ".hero-ambient-glow",
    {
      opacity: 1,
      scale: 1,
      duration: 1.8,
      ease: "power2.out",
    },
    0.1
  )
    .to(
      ".hero-book-stage",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: -8,
        rotateX: 4,
        duration: 1.4,
        ease: "power3.out",
      },
      0.3
    )
    .to(
      ".hero-content-elem",
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
      },
      0.45
    )
    .to(
      ".hero-thumb-elem",
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power2.out",
      },
      0.65
    )
    .to(
      ".hero-nav-elem",
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.6,
      },
      0.8
    );

  return tl;
};

/**
 * Text content exit animation (when switching books)
 */
export const animateTextOut = (container: HTMLElement | null): Promise<void> => {
  return new Promise((resolve) => {
    if (!container) {
      resolve();
      return;
    }

    gsap.to(".hero-text-animate", {
      y: -18,
      opacity: 0,
      stagger: 0.04,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => resolve(),
    });
  });
};

/**
 * Text content entrance animation (after new book data binds)
 */
export const animateTextIn = (container: HTMLElement | null) => {
  if (!container) return;

  gsap.fromTo(
    ".hero-text-animate",
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.07,
      duration: 0.75,
      ease: "power3.out",
      clearProps: "transform",
    }
  );
};

/**
 * Background glow color interpolation
 */
export const animateBackground = (
  targetRgba: string,
  targetAccent: string,
  element: HTMLElement | null
) => {
  if (!element) return;

  gsap.to(element, {
    "--ambient-color": targetRgba,
    "--accent-color": targetAccent,
    duration: 1.1,
    ease: "power2.inOut",
  });
};
