import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { categories, getCategoryById } from "@/data/books";
import BookCard from "@/components/BookCard";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { assetPath } from "@/utils/paths";

// Generate static params for all categories
export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.id }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryById(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Books — Oufella`,
    description: category.longDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    notFound();
  }

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
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href="/#categories"
                className="hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{category.name}</span>
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
                  {category.group === "puzzle-books"
                    ? "Puzzle Books"
                    : "Hidden Pictures"}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {category.name}
              </h1>

              <p className="text-lg text-foreground/60 leading-relaxed mb-8 max-w-lg">
                {category.longDescription}
              </p>

              <div className="flex items-center gap-4">
                <span
                  className="px-5 py-2.5 rounded-full text-white font-bold text-sm shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})`,
                  }}
                >
                  {category.books.length} Books Available
                </span>
                <Link
                  href="/#categories"
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  ← All Categories
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60">
                <Image
                  src={assetPath(category.illustration)}
                  alt={`${category.name} illustration`}
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
              Our {category.name} Books
            </h2>
            <p className="text-foreground/50 mt-2">
              Click any book to buy it on Amazon — all books ship worldwide!
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
              ← Explore More Categories
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
