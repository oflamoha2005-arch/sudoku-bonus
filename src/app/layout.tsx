import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Oufella — Fun Activity Books for Kids",
  description:
    "Discover Oufella's colorful collection of kids' activity books! Sudoku, mazes, word search, fill-in puzzles, and hidden pictures — all designed to make learning an adventure.",
  keywords: [
    "kids activity books",
    "children puzzles",
    "sudoku for kids",
    "maze books",
    "word search",
    "hidden pictures",
    "KDP books",
    "Oufella",
  ],
  openGraph: {
    title: "Oufella — Fun Activity Books for Kids",
    description:
      "Colorful puzzle & activity books that make learning fun! Browse our collection of sudoku, mazes, word search, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
