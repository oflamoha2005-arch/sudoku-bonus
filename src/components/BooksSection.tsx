import React, { useState } from 'react';

export interface Book {
  id: string;
  category: 'word-search' | 'sudoku' | 'mazes';
  vol: string;
  tag: string;
  title: string;
  coverTitle: string;
  series: string;
  details: string;
  puzzles: string;
  price: string;
  bgColor: string;
  textColor: string;
  description: string;
}

export const BOOKS_DATA: Book[] = [
  {
    id: 'wandering-lexicon',
    category: 'word-search',
    vol: 'Vol. 01',
    tag: 'Botanical Edition',
    title: 'The Wandering Lexicon: Botanical Edition',
    coverTitle: 'The Wandering Lexicon',
    series: 'Word Search Series',
    details: 'Hardcover • 160 Pages • Gentle to Medium',
    puzzles: '160 Mindful Puzzles',
    price: '$18.50',
    bgColor: '#223F38',
    textColor: 'text-amber-100',
    description:
      'Immerse in lush botanical taxonomy and literary vocabulary printed on anti-glare, heavy cream paper with lay-flat thread binding.',
  },
  {
    id: 'mindful-enigmas',
    category: 'sudoku',
    vol: 'Vol. 02',
    tag: 'Numerical Harmony',
    title: 'Mindful Enigmas: Zen Sudoku',
    coverTitle: 'Mindful Enigmas',
    series: 'Sudoku Volumes',
    details: 'Hardcover Linen • 200 Puzzles • Progressive',
    puzzles: '200 Progressive Grids',
    price: '$19.00',
    bgColor: '#162744',
    textColor: 'text-blue-100',
    description:
      'Harmoniously structured symmetrical numbers flowing from gentle meditative warmup puzzles through to challenging master tiers.',
  },
  {
    id: 'labyrinths-mind',
    category: 'mazes',
    vol: 'Master Tier',
    tag: 'Artisan Labyrinths',
    title: 'Labyrinths of the Mind: Mazes',
    coverTitle: 'Labyrinths of Mind',
    series: 'Master Mazes',
    details: 'Heavy Artisan Paper • 120 Mazes • Intricate',
    puzzles: '120 Hand-Drawn Mazes',
    price: '$22.00',
    bgColor: '#4C3024',
    textColor: 'text-amber-100',
    description:
      'Hand-drawn labyrinths and meandering geometric paths crafted to quiet overstimulated thoughts and restore deep spatial focus.',
  },
  {
    id: 'curious-deductions',
    category: 'word-search',
    vol: 'Omnibus',
    tag: 'Pure Deductive Flow',
    title: 'Curious Deductions: Omnibus',
    coverTitle: 'Curious Deductions',
    series: 'Fill-In Editions',
    details: 'Spiral Bound • 180 Grids • Highly Relaxing',
    puzzles: '180 Word Fill-in Grids',
    price: '$17.50',
    bgColor: '#344047',
    textColor: 'text-stone-100',
    description:
      'Satisfying deductive word placement with zero trivia anxiety. Lay-flat spiral binding allows effortless folding during travel or quiet coffee breaks.',
  },
];

interface BooksSectionProps {
  activeCategory?: string;
  onSelectBook?: (book: Book) => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  activeCategory = 'all',
  onSelectBook,
}) => {
  const [filter, setFilter] = useState<string>(activeCategory);
  const [selectedBookModal, setSelectedBookModal] = useState<Book | null>(null);

  // Sync prop changes if parent updates it
  React.useEffect(() => {
    if (activeCategory) {
      setFilter(activeCategory);
    }
  }, [activeCategory]);

  const filteredBooks =
    filter === 'all'
      ? BOOKS_DATA
      : BOOKS_DATA.filter((b) => b.category === filter);

  const handleBookClick = (book: Book) => {
    setSelectedBookModal(book);
    if (onSelectBook) onSelectBook(book);
  };

  return (
    <section
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-white/20"
      id="featured-books"
    >
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#131C24]/30 bg-white/10 backdrop-blur-sm mb-3">
            <span className="text-xs font-black tracking-wider uppercase text-[#131C24]">
              ✦ PHYSICAL EDITIONS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#131C24]">
            Our Books
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#131C24]/85 font-medium max-w-xl">
            Heirloom paper, lay-flat bindings, and anti-glare puzzle grids made
            for hours of relaxation.
          </p>
        </div>

        {/* Filter Pill Chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Books', key: 'all' },
            { label: 'Word Search', key: 'word-search' },
            { label: 'Sudoku', key: 'sudoku' },
            { label: 'Mazes', key: 'mazes' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition shadow-sm cursor-pointer ${
                filter === tab.key
                  ? 'bg-[#131C24] text-white'
                  : 'bg-white/20 hover:bg-white/40 text-[#131C24]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid (4 Tall Heirloom Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="glass-card rounded-[32px] p-6 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 shadow-glass"
          >
            <div>
              {/* Stylized Book Cover */}
              <div
                className="w-full aspect-[3/4] rounded-2xl mb-5 relative overflow-hidden shadow-book flex flex-col justify-between p-6 border border-white/25 transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundColor: book.bgColor }}
              >
                <div className="flex justify-between items-start text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-black/40 px-2.5 py-0.5 rounded">
                    {book.vol}
                  </span>
                  <span className="text-sm">✦</span>
                </div>
                <div className="my-auto text-center">
                  <p className="text-[11px] uppercase tracking-widest text-amber-200/80 font-bold">
                    {book.tag}
                  </p>
                  <h4 className="text-2xl font-bold font-serif leading-snug mt-1.5 text-white">
                    {book.coverTitle}
                  </h4>
                </div>
                <div className="text-[11px] text-center text-white/80 font-medium">
                  {book.puzzles}
                </div>
              </div>

              {/* Book Metadata */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-[#131C24]/70 uppercase tracking-wider">
                  {book.series}
                </span>
                <h3 className="text-xl font-bold text-[#131C24] leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-[#131C24]/75 font-medium">
                  {book.details}
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-6 pt-4 border-t border-white/25 flex items-center justify-between">
              <span className="text-2xl font-black text-[#131C24]">
                {book.price}
              </span>
              <button
                type="button"
                onClick={() => handleBookClick(book)}
                className="pill-press px-5 py-2.5 rounded-full bg-white hover:bg-[#FFF8EC] text-[#131C24] font-bold text-xs shadow-pill flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Book</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Detail Modal */}
      {selectedBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card bg-[#F2A922]/95 border-2 border-white/60 max-w-lg w-full rounded-[36px] p-8 shadow-2xl relative text-[#131C24]">
            <button
              type="button"
              onClick={() => setSelectedBookModal(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/40 hover:bg-white/70 flex items-center justify-center text-xl font-bold text-[#131C24] transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black tracking-widest uppercase bg-[#131C24] text-white px-3 py-1 rounded-full">
                {selectedBookModal.vol}
              </span>
              <span className="text-xs font-bold text-[#131C24]/80">
                {selectedBookModal.series}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black mt-2 leading-tight">
              {selectedBookModal.title}
            </h3>

            <p className="text-sm sm:text-base text-[#131C24]/90 mt-4 leading-relaxed font-medium">
              {selectedBookModal.description}
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/40 border border-white/40 space-y-1.5 text-xs sm:text-sm font-semibold">
              <div className="flex justify-between">
                <span>Binding &amp; Paper:</span>
                <span className="text-[#131C24]/80">{selectedBookModal.details}</span>
              </div>
              <div className="flex justify-between">
                <span>Puzzle Count:</span>
                <span className="text-[#131C24]/80">{selectedBookModal.puzzles}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-[#131C24]/80">Worldwide Carbon-Neutral</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/40">
              <span className="text-3xl font-black">{selectedBookModal.price}</span>
              <button
                type="button"
                onClick={() => {
                  alert(`Thank you! "${selectedBookModal.title}" has been added to your bag.`);
                  setSelectedBookModal(null);
                }}
                className="pill-press px-8 py-3.5 rounded-full bg-[#131C24] hover:bg-black text-white font-bold text-sm sm:text-base shadow-pill cursor-pointer"
              >
                Order Edition →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
