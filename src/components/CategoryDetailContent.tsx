"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/data/books";
import { categoryGroups } from "@/data/books";
import BookCard from "@/components/BookCard";
import AnimatedSection from "@/components/AnimatedSection";
import { assetPath } from "@/utils/paths";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { translations, categoryTranslations } from "@/utils/translations";

interface CategoryDetailContentProps {
  category: Category;
}

export default function CategoryDetailContent({ category }: CategoryDetailContentProps) {
  const { language, isGerman } = useAmazonMarket();
  const t = translations[language];

  const catInfo = isGerman ? categoryTranslations[category.id] : null;
  const catName = catInfo?.nameDe || category.name;
  const catLongDesc = catInfo?.longDescDe || category.longDescription;

  const rawGroup = categoryGroups.find((g) => g.id === category.group);
  const groupName = isGerman
    ? rawGroup?.id === "coloring"
      ? "Malen & Kreativität"
      : "Rätsel- & Denksport"
    : rawGroup?.name || "Activity Books";

  return (
    <div className="pt-20">
      {/* Category Hero */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.gradientFrom}15, ${category.gradientTo}20)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-foreground/40 mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.catBreadcrumbHome}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href="/#categories"
                className="hover:text-foreground transition-colors"
              >
                {t.catBreadcrumbCategories}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{catName}</span>
            </nav>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-5 h-5 rounded-full shadow-lg"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-foreground/50 uppercase tracking-wider">
                  {groupName}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {catName}
              </h1>

              <p className="text-lg text-foreground/60 leading-relaxed mb-8 max-w-lg">
                {catLongDesc}
              </p>

              <div className="flex items-center gap-4">
                <span
                  className="px-5 py-2.5 rounded-full text-white font-bold text-sm shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})`,
                  }}
                >
                  {category.books.length}{" "}
                  {category.books.length === 1
                    ? isGerman
                      ? "Buch verfügbar"
                      : "Book Available"
                    : isGerman
                    ? "Bücher verfügbar"
                    : "Books Available"}
                </span>
                <Link
                  href="/#categories"
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  {t.catBackToAll}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60">
                <Image
                  src={assetPath(category.illustration)}
                  alt={`${catName} illustration`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {isGerman
                ? `Bücher in der Kategorie „${catName}“`
                : category.name.endsWith("Books")
                ? `Our ${category.name}`
                : `Our ${category.name} Books`}
            </h2>
            <p className="text-foreground/50 mt-2">
              {t.catBooksSubheading}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.books.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                categoryColor={category.color}
                index={index}
              />
            ))}
          </div>

          {/* Back to all categories */}
          <AnimatedSection className="mt-16 text-center">
            <Link
              href="/#categories"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-purple/10 to-primary/10 text-foreground rounded-full font-bold text-lg border-2 border-accent-purple/20 hover:border-accent-purple/40 transition-all hover:scale-105"
            >
              {t.catBackToAll}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
