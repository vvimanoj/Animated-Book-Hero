"use client";

import React, { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { BookHero } from "@/components/hero/BookHero";

export default function Home() {
  const [showCatalogOverview, setShowCatalogOverview] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#08090b] text-[#f4efea] overflow-x-hidden">
      {/* Editorial Header */}
      <TopNav onExploreClick={() => {
        const btn = document.getElementById("discover-book-btn");
        if (btn) btn.click();
      }} />

      {/* Cinematic Book Hero */}
      <BookHero />
    </main>
  );
}
