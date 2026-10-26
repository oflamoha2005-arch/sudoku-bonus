import rawBooksData from "./books.json";

export interface Book {
  id: string;
  title: string;
  cover: string;
  amazonUrl: string;
  asin?: string;
  description: string;
  badge?: string;
  language?: "en" | "de" | string;
  defaultMarket?: string;
}

export interface Category {
  id: string;
  name: string;
  group: "puzzle-books" | "coloring-books" | string;
  description: string;
  longDescription: string;
  illustration: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  books: Book[];
}

export const categories: Category[] = rawBooksData.categories as Category[];
export const categoryGroups = rawBooksData.categoryGroups;

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoriesByGroup(group: string): Category[] {
  return categories.filter((cat) => cat.group === group);
}

export function getAllBooks(): { book: Book; categoryColor: string; categoryName: string }[] {
  return categories.flatMap((cat) =>
    cat.books.map((b) => ({
      book: b,
      categoryColor: cat.color,
      categoryName: cat.name,
    }))
  );
}

