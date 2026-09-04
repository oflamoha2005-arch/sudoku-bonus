import { siteConfig } from '../config/siteConfig';
import {
  SearchPuzzleIcon,
  FillInPuzzleIcon,
  SudokuIcon,
  MazeIcon,
  ArrowRight,
  SparkleIcon,
} from './icons';

interface CategoriesProps {
  onSelectCategory?: (categoryId: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'word-search':
        return <SearchPuzzleIcon className="w-8 h-8 text-ochre" />;
      case 'word-fill-in':
        return <FillInPuzzleIcon className="w-8 h-8 text-terracotta" />;
      case 'sudoku':
        return <SudokuIcon className="w-8 h-8 text-sage-dark" />;
      case 'mazes':
        return <MazeIcon className="w-8 h-8 text-ochre-dark" />;
      default:
        return <SparkleIcon className="w-8 h-8 text-ochre" />;
    }
  };

  const categories = siteConfig.categories.filter((c) => c.id !== 'all');

  const handleCategoryClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const element = document.getElementById('books');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" aria-labelledby="categories-title" className="relative z-10 py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-sage-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <SparkleIcon className="w-3.5 h-3.5 text-sage-dark" />
            <span>Puzzle Universes</span>
          </div>
          <h2
            id="categories-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight leading-tight"
          >
            Distinct Pathways to Focus & Joy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa/75 leading-relaxed">
            Every category at Oufellia is engineered around a unique cognitive rhythm — whether you seek restful word finding, rigorous deductive logic, or spatial wandering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-cocoa/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center shadow-2xs">
                    {getIcon(cat.id)}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${cat.tagColor}`}>
                    {cat.shortDesc}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-cocoa mb-3">
                  {cat.name}
                </h3>
                <p className="text-base text-cocoa/75 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="pt-6 border-t border-cocoa/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-cocoa/60">
                  {
                    siteConfig.products.filter((p) => p.category === cat.id).length
                  }{' '}
                  Titles in Curation
                </span>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-ochre hover:text-ochre-dark group cursor-pointer focus:outline-none"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
