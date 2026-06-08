import type { Metadata } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/*
 * Type pairing — honest substitution.
 * User picked PP Neue Montreal + PP Fraktion Mono (Pangram Pangram).
 * Path 2 ship-fast: PP Neue Montreal -> Onest (close geometric grotesque match, free).
 *                   Commit Mono -> JetBrains Mono (close minimal mono, free).
 * To swap in the real fonts later:
 *   1. Download PPNeueMontreal-{Regular,Medium,Bold}.woff2 to /public/fonts/
 *   2. Download CommitMono-{Regular,Bold}.woff2 to /public/fonts/
 *   3. Replace next/font/google with next/font/local pointing at those files.
 *   4. Keep the --font-display-sans and --font-mono variable names; nothing else changes.
 */

const displaySans = Onest({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anuj Patel — Founding engineer. Backend + AI.",
  description:
    "I build what decks promise. Backend systems and AI agents. Ship before polish. Open to founding roles and select freelance.",
  metadataBase: new URL("https://anujpatel.dev"),
  openGraph: {
    title: "Anuj Patel — I build what decks promise.",
    description: "Backend systems and AI agents. Ship before polish.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displaySans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg antialiased min-h-[100dvh]">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
