import React from 'react';

interface PuzzlesSectionProps {
  onPlaySudoku?: () => void;
  onFilterCategory?: (category: string) => void;
}

export const PuzzlesSection: React.FC<PuzzlesSectionProps> = ({
  onPlaySudoku,
  onFilterCategory,
}) => {
  return (
    <section
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative"
      id="puzzles"
    >
      {/* Section Header with wide breathing room */}
      <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#131C24]/30 bg-white/10 backdrop-blur-sm mb-4">
          <span className="text-xs font-black tracking-wider uppercase text-[#131C24]">
            ✦ CURATED FORMATS
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#131C24]">
          Explore Our Puzzles
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#131C24]/85 font-medium leading-relaxed">
          Handcrafted mental journeys designed to awaken focus, calm the spirit,
          and inspire deliberate play.
        </p>
      </div>

      {/* Symmetrical 3-Column Layout: Left Cards (2), Center Character Anchor, Right Cards (2) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column (Word Search & Word Fill In) */}
        <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8">
          {/* Card 1: Word Search */}
          <div className="glass-card glass-card-hover rounded-[32px] p-7 lg:p-9 shadow-glass">
            <div className="w-12 h-12 rounded-2xl bg-white/95 flex items-center justify-center mb-6 text-[#131C24] text-xl shadow-sm">
              🔍
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-[#131C24] mb-2.5">
              Word Search
            </h3>
            <p className="text-[#131C24]/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Themed journeys &amp; hidden discoveries curated with rich
              botanical, literary, and geographic vocabulary.
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#131C24] hover:underline cursor-pointer"
              href="#featured-books"
              onClick={() => onFilterCategory && onFilterCategory('word-search')}
            >
              <span>View Editions</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Word Fill In */}
          <div className="glass-card glass-card-hover rounded-[32px] p-7 lg:p-9 shadow-glass">
            <div className="w-12 h-12 rounded-2xl bg-white/95 flex items-center justify-center mb-6 text-[#131C24] text-xl shadow-sm">
              ⊞
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-[#131C24] mb-2.5">
              Word Fill In
            </h3>
            <p className="text-[#131C24]/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Pure deductive word placement offering satisfying rhythmic flow
              without crossword trivia pressure.
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#131C24] hover:underline cursor-pointer"
              href="#featured-books"
              onClick={() => onFilterCategory && onFilterCategory('word-search')}
            >
              <span>Explore Grids</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Center Column: Character Anchor Visual */}
        <div className="md:col-span-4 flex flex-col items-center justify-center py-4">
          <div className="relative w-full max-w-[380px] flex flex-col items-center">
            {/* Cutout Character Anchor */}
            <img
              alt="Oufellia Character Puzzle Companion"
              className="w-full h-auto object-contain character-blend select-none drop-shadow-md"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChbl4Ud_L-CInsYlcCU_VfMi_teu5ES3b0FBfJIQltsoXsT4vi7KxTnSVzowYapRjKS2x9X6Lre1bc5kRKA9N7TUuaW7YfXKtt63dFCkzt6VHF23TZ8ar56E9sFG1i22j93iWIei346_vb1I5IyMf58mfjtcd15dQDmYZN-zVAutPTTQlgqu1v9gGSA4qb497lpoylVckxRyg5Fkr80CidkvLGRDb8DhB-jH1qH7-y2x3N33eILCILSvOW1CSJRrvXMAw"
            />
            {/* Challenge floating badge */}
            <div
              className="mt-2 w-full glass-card rounded-2xl p-4 text-center border border-white/50 shadow-glass cursor-pointer hover:bg-white/30 transition-colors"
              onClick={onPlaySudoku}
            >
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#131C24] block">
                Daily Interactive Challenge
              </span>
              <p className="text-xs text-[#131C24]/80 mt-1 font-medium">
                Solve a 5-minute warm-up puzzle right in browser
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Sudoku & Mazes) */}
        <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8">
          {/* Card 3: Sudoku */}
          <div className="glass-card glass-card-hover rounded-[32px] p-7 lg:p-9 shadow-glass">
            <div className="w-12 h-12 rounded-2xl bg-white/95 flex items-center justify-center mb-6 text-[#131C24] text-xl shadow-sm">
              ▦
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-[#131C24] mb-2.5">
              Sudoku
            </h3>
            <p className="text-[#131C24]/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Elegant numerical harmony constructed symmetrically from gentle
              mindful warmups to master tiers.
            </p>
            <button
              type="button"
              className="pill-press inline-flex items-center gap-2 text-sm font-bold text-[#131C24] bg-white/80 hover:bg-white px-5 py-2.5 rounded-full transition shadow-sm cursor-pointer"
              onClick={onPlaySudoku}
            >
              <span>Play Sudoku</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 4: Mazes */}
          <div className="glass-card glass-card-hover rounded-[32px] p-7 lg:p-9 shadow-glass">
            <div className="w-12 h-12 rounded-2xl bg-white/95 flex items-center justify-center mb-6 text-[#131C24] text-xl shadow-sm">
              𖣯
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-[#131C24] mb-2.5">
              Mazes
            </h3>
            <p className="text-[#131C24]/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Spatial labyrinths &amp; intricate organic pathways drawn with
              artistic precision for profound mental calm.
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#131C24] hover:underline cursor-pointer"
              href="#featured-books"
              onClick={() => onFilterCategory && onFilterCategory('mazes')}
            >
              <span>Browse Labyrinths</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
