import React from 'react';
import { CharacterVideo } from './CharacterVideo';

interface HeroSectionProps {
  onPlaySudoku?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlaySudoku,
  onSelectCategory,
}) => {
  return (
    <section
      className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto min-h-[85vh] flex flex-col justify-between overflow-hidden"
      id="hero"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-auto">
        {/* Left Editorial Column (Monumental Typography) */}
        <div className="lg:col-span-5 flex flex-col justify-center z-20 space-y-6 lg:pr-4">
          {/* Category Chip */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-[#131C24]/30 bg-white/10 backdrop-blur-sm">
            <span className="text-xs font-black tracking-wider uppercase text-[#131C24]">
              ✦ CREATIVE PUBLISHING
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[84px] font-black tracking-tight text-[#131C24] leading-[1.02]">
            Discover Worlds
            <br />
            Made to Explore
          </h1>

          {/* Body Description */}
          <p className="text-lg sm:text-xl text-[#131C24]/90 font-medium max-w-md leading-relaxed">
            Oufellia creates books, puzzles and creative experiences designed to
            inspire curiosity, relaxation and discovery.
          </p>

          {/* Primary CTA Action */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              className="pill-press inline-flex items-center gap-3 bg-[#D95C14] hover:bg-[#C5500F] text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg shadow-pill hover:shadow-pill-hover transition-all cursor-pointer"
              href="#featured-books"
            >
              <span>Explore Books</span>
              <span className="text-lg font-bold">→</span>
            </a>
          </div>

          {/* Value Pill Tags */}
          <div className="pt-3 flex flex-wrap gap-2.5 items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#A8E6CF] text-[#131C24] border border-white/40 shadow-sm select-none">
              <span>☆</span> Story
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#FF7654] text-white border border-white/30 shadow-sm select-none">
              <span>👁</span> Vision
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#C5B4FA] text-[#131C24] border border-white/40 shadow-sm select-none">
              <span>📖</span> Mindful
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#8AE0F2] text-[#131C24] border border-white/40 shadow-sm select-none">
              <span>💡</span> Curiosity
            </span>
          </div>

          {/* Interactive Scrub Hint Badge */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/20 border border-white/35 backdrop-blur-sm text-xs sm:text-[13px] text-[#131C24]/90 font-medium select-none">
              <span className="text-base leading-none">⏱</span>
              <span>Move cursor or swipe horizontally to scrub animation</span>
            </div>
          </div>
        </div>

        {/* Center: Seamless HERO Cutout Character (NO Box, NO Border, True Massive Visual) */}
        <div className="lg:col-span-5 relative flex items-end justify-center z-10 -my-6 lg:my-0">
          <CharacterVideo />
        </div>

        {/* Right Column: Clean Floating White Tactile Pills Stack */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col justify-center lg:justify-center items-center lg:items-end gap-3 flex-wrap z-20">
          <a
            className="pill-press w-full sm:w-[210px] flex items-center justify-between px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#131C24] font-bold shadow-pill hover:shadow-pill-hover text-sm sm:text-base border border-white/50 transition cursor-pointer"
            href="#featured-books"
            onClick={() => onSelectCategory && onSelectCategory('word-search')}
          >
            <span>Word Search</span>
            <span className="text-base">→</span>
          </a>
          <a
            className="pill-press w-full sm:w-[210px] flex items-center justify-between px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#131C24] font-bold shadow-pill hover:shadow-pill-hover text-sm sm:text-base border border-white/50 transition cursor-pointer"
            href="#featured-books"
            onClick={() => onSelectCategory && onSelectCategory('sudoku')}
          >
            <span>Sudoku</span>
            <span className="text-base">→</span>
          </a>
          <a
            className="pill-press w-full sm:w-[210px] flex items-center justify-between px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#131C24] font-bold shadow-pill hover:shadow-pill-hover text-sm sm:text-base border border-white/50 transition cursor-pointer"
            href="#featured-books"
            onClick={() => onSelectCategory && onSelectCategory('mazes')}
          >
            <span>Mazes</span>
            <span className="text-base">→</span>
          </a>
          <a
            className="pill-press w-full sm:w-[210px] flex items-center justify-between px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#131C24] font-bold shadow-pill hover:shadow-pill-hover text-sm sm:text-base border border-white/50 transition cursor-pointer"
            href="#featured-books"
          >
            <span>Puzzle Books</span>
            <span className="text-base">→</span>
          </a>
          <button
            type="button"
            className="pill-press w-full sm:w-[210px] flex items-center justify-between px-6 py-3.5 rounded-full bg-[#131C24] hover:bg-black text-white font-bold shadow-pill hover:shadow-pill-hover text-sm sm:text-base transition cursor-pointer"
            onClick={onPlaySudoku}
          >
            <span>Play Sudoku</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
