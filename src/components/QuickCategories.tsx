import { siteConfig } from '../config/siteConfig';
import { SearchPuzzleIcon, FillInPuzzleIcon, SudokuIcon, MazeIcon, ArrowRight } from './icons';

interface QuickCategoriesProps {
  onSelectCategory?: (categoryId: string) => void;
}

export default function QuickCategories({ onSelectCategory }: QuickCategoriesProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'word-search':
        return <SearchPuzzleIcon className="w-6 h-6 text-ochre" />;
      case 'word-fill-in':
        return <FillInPuzzleIcon className="w-6 h-6 text-terracotta" />;
      case 'sudoku':
        return <SudokuIcon className="w-6 h-6 text-sage-dark" />;
      case 'mazes':
        return <MazeIcon className="w-6 h-6 text-ochre-dark" />;
      default:
        return <SearchPuzzleIcon className="w-6 h-6 text-ochre" />;
    }
  };

  const categories = siteConfig.categories.filter((c) => c.id !== 'all');

  const handleClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const element = document.getElementById('books');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-10 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-5 sm:px-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-cocoa">
              Explore Puzzle Genres
            </h2>
            <p className="text-sm text-cocoa/70">
              Discover unique puzzle formats designed for calm, focus, and playful challenge.
            </p>
          </div>
          <a
            href="#categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ochre hover:text-ochre-dark transition-colors self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleClick(cat.id)}
              className="group text-left p-5 rounded-2xl bg-cream/70 hover:bg-cream-warm border border-cocoa/5 hover:border-ochre/30 transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-md focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                {getIcon(cat.id)}
              </div>
              <h3 className="font-display text-lg font-bold text-cocoa group-hover:text-ochre transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-cocoa/70 mt-1 leading-relaxed">
                {cat.shortDesc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-ochre mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Browse {cat.name}</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
