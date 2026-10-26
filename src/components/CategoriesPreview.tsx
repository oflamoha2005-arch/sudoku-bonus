"use client";

import { categories, categoryGroups, getAllBooks } from "@/data/books";
import CategoryCard from "./CategoryCard";
import BookCard from "./BookCard";
import AnimatedSection from "./AnimatedSection";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { translations } from "@/utils/translations";

export default function CategoriesPreview() {
  const allBooksList = getAllBooks();
  const { language, isGerman } = useAmazonMarket();
  const t = translations[language];

  return (
    <section id="categories" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF8EF] to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Books Section Header */}
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-yellow/20 rounded-full text-xs sm:text-sm font-bold text-[#8A5B00] mb-4">
            {t.booksSectionBadge}
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {t.booksSectionTitle} <span className="text-primary">{t.booksSectionTitleHighlight}</span> ✨
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-accent-green rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            {t.booksSectionSubtitle}
          </p>
        </AnimatedSection>

        {/* Real Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {allBooksList.map((item, index) => (
            <BookCard
              key={item.book.id}
              book={item.book}
              categoryColor={item.categoryColor}
              index={index}
            />
          ))}
        </div>

        {/* Categories Section Header */}
        <AnimatedSection className="text-center mb-14">
          <h3
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {t.categoriesSectionTitle} <span className="text-accent-yellow">{t.categoriesSectionTitleHighlight}</span> 🎨
          </h3>
          <p className="text-sm sm:text-base text-foreground/50 max-w-xl mx-auto">
            {t.categoriesSectionSubtitle}
          </p>
        </AnimatedSection>

        {/* Categories Grid by Group */}
        {categoryGroups.map((group) => {
          const groupCategories = categories.filter(
            (c) => c.group === group.id
          );
          if (groupCategories.length === 0) return null;

          const groupName = isGerman
            ? group.id === "coloring"
              ? "Malen & Kreativität"
              : "Rätsel- & Denksport"
            : group.name;

          const groupDesc = isGerman
            ? group.id === "coloring"
              ? "Zauberhafte Malwelten für Entspannung und Fantasie"
              : "Großdruck-Rätsel, Sudokus & Denksportaufgaben für kluge Köpfe"
            : group.description;

          return (
            <div key={group.id} className="mb-14 last:mb-0">
              <AnimatedSection className="mb-8">
                <h4
                  className="text-2xl font-bold text-foreground/80 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  <span className="w-8 h-1 bg-gradient-to-r from-primary to-accent-purple rounded-full" />
                  {groupName}
                </h4>
                <p className="text-sm text-foreground/50 mt-1 ml-11">
                  {groupDesc}
                </p>
              </AnimatedSection>

              <div
                className={`grid gap-6 ${
                  groupCategories.length === 1
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {groupCategories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
