import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mvvnx1 • vvimanoj | Curated Literary Folio",
  description:
    "Curated collection and digital library showcase by mvvnx1 (@mvvnx1) and vvimanoj (@vvimanoj).",
  keywords: ["mvvnx1", "vvimanoj", "publishing house", "literary editions", "rare books", "clothbound classics", "philosophy"],
  authors: [
    { name: "mvvnx1", url: "https://instagram.com/mvvnx1" },
    { name: "vvimanoj", url: "https://github.com/vvimanoj" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        {/* Instant Image Preload Links */}
        <link rel="preload" as="image" href="/books/alchemist.jpg" />
        <link rel="preload" as="image" href="/books/atomic.jpg" />
        <link rel="preload" as="image" href="/books/ikigai.jpg" />
        <link rel="preload" as="image" href="/books/psyofmoney.jpg" />
        <link rel="preload" as="image" href="/books/subtleart.jpg" />
      </head>
      <body className="bg-[#08090b] text-[#f4efea] font-sans antialiased selection:bg-amber-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
