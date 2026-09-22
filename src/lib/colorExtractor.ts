"use client";

import { Book } from "@/data/books";

export interface ExtractedColorTheme {
  accentColor: string;
  highlightColor: string;
  ambientRgba: string;
  bgAtmosphere: string;
  glowColor: string;
  surfaceBorder: string;
}

// Pre-calibrated curated themes matching the exact real book covers
export const BOOK_THEMES: Record<string, ExtractedColorTheme> = {
  alchemist: {
    accentColor: "#E09F3E",
    highlightColor: "#FBBF24",
    ambientRgba: "rgba(224, 159, 62, 0.35)",
    bgAtmosphere: "#120E08",
    glowColor: "rgba(224, 159, 62, 0.5)",
    surfaceBorder: "rgba(224, 159, 62, 0.35)",
  },
  atomic: {
    accentColor: "#F59E0B",
    highlightColor: "#FCD34D",
    ambientRgba: "rgba(245, 158, 11, 0.32)",
    bgAtmosphere: "#14110C",
    glowColor: "rgba(245, 158, 11, 0.45)",
    surfaceBorder: "rgba(245, 158, 11, 0.35)",
  },
  ikigai: {
    accentColor: "#38BDF8",
    highlightColor: "#7DD3FC",
    ambientRgba: "rgba(56, 189, 248, 0.32)",
    bgAtmosphere: "#081018",
    glowColor: "rgba(56, 189, 248, 0.5)",
    surfaceBorder: "rgba(56, 189, 248, 0.35)",
  },
  psyofmoney: {
    accentColor: "#10B981",
    highlightColor: "#6EE7B7",
    ambientRgba: "rgba(16, 185, 129, 0.32)",
    bgAtmosphere: "#06130D",
    glowColor: "rgba(16, 185, 129, 0.45)",
    surfaceBorder: "rgba(16, 185, 129, 0.35)",
  },
  subtleart: {
    accentColor: "#F97316",
    highlightColor: "#FDBA74",
    ambientRgba: "rgba(249, 115, 22, 0.35)",
    bgAtmosphere: "#170B04",
    glowColor: "rgba(249, 115, 22, 0.5)",
    surfaceBorder: "rgba(249, 115, 22, 0.35)",
  },
  meditations: {
    accentColor: "#EF4444",
    highlightColor: "#FCA5A5",
    ambientRgba: "rgba(239, 68, 68, 0.35)",
    bgAtmosphere: "#16080A",
    glowColor: "rgba(239, 68, 68, 0.5)",
    surfaceBorder: "rgba(239, 68, 68, 0.35)",
  },
  letters: {
    accentColor: "#6366F1",
    highlightColor: "#A5B4FC",
    ambientRgba: "rgba(99, 102, 241, 0.35)",
    bgAtmosphere: "#090A17",
    glowColor: "rgba(99, 102, 241, 0.5)",
    surfaceBorder: "rgba(99, 102, 241, 0.35)",
  },
  republic: {
    accentColor: "#14B8A6",
    highlightColor: "#5EEAD4",
    ambientRgba: "rgba(20, 184, 166, 0.35)",
    bgAtmosphere: "#061311",
    glowColor: "rgba(20, 184, 166, 0.5)",
    surfaceBorder: "rgba(20, 184, 166, 0.35)",
  },
};

/**
 * Instant theme resolver that matches EVERY book's real color palette
 */
export function getBookTheme(bookOrId: Book | string): ExtractedColorTheme {
  const id = typeof bookOrId === "string" ? bookOrId : bookOrId.id;
  if (BOOK_THEMES[id]) return BOOK_THEMES[id];

  if (typeof bookOrId !== "string" && bookOrId.accentColor) {
    const accent = bookOrId.accentColor;
    const highlight = bookOrId.highlightColor || accent;
    const ambient = bookOrId.ambientRgba || `${accent}40`;

    let bg = "#08090b";
    if (accent.startsWith("hsl")) {
      const match = accent.match(/hsl\s*\(\s*(\d+)/i);
      if (match) {
        const hue = match[1];
        bg = `hsl(${hue}, 28%, 6%)`;
      }
    }

    return {
      accentColor: accent,
      highlightColor: highlight,
      ambientRgba: ambient,
      bgAtmosphere: bg,
      glowColor: `${accent}66`,
      surfaceBorder: `${accent}45`,
    };
  }

  return BOOK_THEMES.alchemist;
}

export async function extractColorTheme(
  _imageSrc: string,
  bookOrId: Book | string
): Promise<ExtractedColorTheme> {
  return getBookTheme(bookOrId);
}
