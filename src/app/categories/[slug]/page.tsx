import { notFound } from "next/navigation";
import { categories, getCategoryById } from "@/data/books";
import CategoryDetailContent from "@/components/CategoryDetailContent";
import type { Metadata } from "next";

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

  return <CategoryDetailContent category={category} />;
}
