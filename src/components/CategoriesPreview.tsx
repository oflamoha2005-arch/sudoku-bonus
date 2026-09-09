"use client";

import { categories, categoryGroups } from "@/data/books";
import CategoryCard from "./CategoryCard";
import AnimatedSection from "./AnimatedSection";

export default function CategoriesPreview() {
  return (
    <section id="categories" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF5E6] to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Explore Our{" "}
            <span className="text-accent-yellow">Books</span> 📚
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-accent-green rounded-full mx-auto mb-6" />
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            From brain-teasing sudoku to exciting hidden pictures — find the
            perfect activity book for your little explorer!
          </p>
        </AnimatedSection>

        {categoryGroups.map((group) => {
          const groupCategories = categories.filter(
            (c) => c.group === group.id
          );
          if (groupCategories.length === 0) return null;

          return (
            <div key={group.id} className="mb-14 last:mb-0">
              <AnimatedSection className="mb-8">
                <h3
                  className="text-2xl font-bold text-foreground/80 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  <span className="w-8 h-1 bg-gradient-to-r from-primary to-accent-purple rounded-full" />
                  {group.name}
                </h3>
                <p className="text-sm text-foreground/50 mt-1 ml-11">
                  {group.description}
                </p>
              </AnimatedSection>

              <div
                className={`grid gap-6 ${
                  groupCategories.length === 1
                    ? "grid-cols-1 max-w-md"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
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
