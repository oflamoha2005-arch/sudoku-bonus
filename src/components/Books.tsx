import { useState } from 'react';
import { siteConfig, Product } from '../config/siteConfig';
import { SparkleIcon, BookIcon } from './icons';

interface BooksProps {
  activeCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function Books({ activeCategory: externalCategory, onSelectCategory }: BooksProps) {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const selectedCategory = externalCategory !== undefined ? externalCategory : internalCategory;

  const handleFilterChange = (categoryId: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      setInternalCategory(categoryId);
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? siteConfig.products
      : siteConfig.products.filter((p) => p.category === selectedCategory);

  return (
    <section id="books" aria-labelledby="books-title" className="relative z-10 py-24 sm:py-32 bg-cream-card/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ochre/15 border border-ochre/30 text-ochre-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <BookIcon className="w-3.5 h-3.5 text-ochre" />
            <span>Publishing Catalog</span>
          </div>
          <h2
            id="books-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight leading-tight"
          >
            The Oufellia Collection
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa/75 leading-relaxed">
            Our inaugural series of immersive puzzle and activity publications, currently in final production.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16" role="tablist">
          {siteConfig.categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(cat.id)}
                className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-2xs focus:outline-none ${
                  isActive
                    ? 'bg-cocoa text-cream shadow-md scale-105'
                    : 'bg-white text-cocoa/80 hover:bg-cream hover:text-cocoa border border-cocoa/10'
                }`}
              >
                <span>{cat.name}</span>
                {cat.id !== 'all' && (
                  <span className="ml-2 opacity-60 text-xs font-normal">
                    (
                    {
                      siteConfig.products.filter((p) => p.category === cat.id).length
                    }
                    )
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/70 rounded-3xl border border-cocoa/10">
            <SparkleIcon className="w-8 h-8 text-ochre mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-cocoa">
              Upcoming Editions in Progress
            </h3>
            <p className="text-sm text-cocoa/60 mt-1 max-w-md mx-auto">
              More titles in this category are currently being curated by our editorial team.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-white rounded-3xl p-6 border border-cocoa/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col">
      {/* Square Book Cover Container with Artistic Storybook Pattern */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-cream to-cream-warm border border-cocoa/10 flex flex-col justify-between p-6 shadow-inner">
        {/* Cover Top Meta */}
        <div className="flex items-center justify-between z-10">
          <span className="text-[11px] font-bold tracking-wider uppercase text-cocoa/60 font-body">
            Oufellia Editions
          </span>
          {product.badge && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-cocoa border border-cocoa/10 shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Cover Center Artistry */}
        <div className="my-auto text-center py-4 z-10">
          <div
            className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: product.accentColor }}
          >
            <BookIcon className="w-7 h-7" />
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-cocoa leading-tight px-2">
            {product.title}
          </h4>
          <p className="text-xs text-cocoa/60 mt-1 font-medium">
            {product.categoryLabel}
          </p>
        </div>

        {/* Cover Bottom: Coming Soon Banner Badge */}
        <div className="z-10 flex items-center justify-between pt-3 border-t border-cocoa/10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ochre-dark bg-ochre/15 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-ochre animate-ping" />
            <span>Coming Soon</span>
          </span>
          {product.pages && (
            <span className="text-xs text-cocoa/60 font-medium">
              {product.pages} Pages
            </span>
          )}
        </div>

        {/* Decorative background grid ornament */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${product.accentColor} 1.5px, transparent 1.5px)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre-dark">
            {product.categoryLabel}
          </span>
          <span className="text-xs font-bold text-cocoa/50">
            Forthcoming
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-cocoa group-hover:text-ochre transition-colors leading-snug mb-2">
          {product.title}
        </h3>

        <p className="text-sm text-cocoa/70 leading-relaxed mb-6 flex-1">
          {product.description}
        </p>

        {/* Action Button: Coming Soon notification anchor */}
        <a
          href="#community"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-cream-card hover:bg-cocoa text-cocoa hover:text-white border border-cocoa/15 transition-all duration-200"
        >
          <span>Get Launch Updates</span>
          <SparkleIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
