import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PuzzlesSection } from './components/PuzzlesSection';
import { BooksSection } from './components/BooksSection';
import { PhilosophySection } from './components/PhilosophySection';
import { QuietClubSection } from './components/QuietClubSection';
import { Footer } from './components/Footer';
import { SudokuModal } from './components/SudokuModal';

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSudokuOpen, setIsSudokuOpen] = useState<boolean>(false);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    // Smooth scroll to featured books section
    const el = document.getElementById('featured-books');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreBooks = () => {
    const el = document.getElementById('featured-books');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2A922] text-[#131C24] font-sans relative selection:bg-[#131C24] selection:text-[#FFF8EC]">
      {/* 1. Header with Oufellia navigation and action */}
      <Header onExploreBooks={handleExploreBooks} />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero Section with animated mouse-scrubbed Character Video */}
        <HeroSection
          onPlaySudoku={() => setIsSudokuOpen(true)}
          onSelectCategory={handleCategorySelect}
        />

        {/* 3. Explore Our Puzzles Section */}
        <PuzzlesSection
          onPlaySudoku={() => setIsSudokuOpen(true)}
          onFilterCategory={handleCategorySelect}
        />

        {/* 4. Our Books Section */}
        <BooksSection activeCategory={activeCategory} />

        {/* 5. Story & Philosophy Section */}
        <PhilosophySection />

        {/* 6. Newsletter / Vision Section */}
        <QuietClubSection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Interactive Warmup Sudoku Modal */}
      <SudokuModal
        isOpen={isSudokuOpen}
        onClose={() => setIsSudokuOpen(false)}
      />
    </div>
  );
};

export default App;
