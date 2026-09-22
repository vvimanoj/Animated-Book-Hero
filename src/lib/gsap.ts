"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";

// Register plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export const prefersReducedMotion = (): boolean => {
  return false;
};

export { gsap, Flip };
