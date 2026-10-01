export interface Book {
  id: string;
  title: string;
  cover: string;
  amazonUrl: string;
  description: string;
  badge?: string;
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

export const categories: Category[] = [
  {
    id: "coloring-books",
    name: "Coloring Books",
    group: "coloring-books",
    description: "Heartwarming, cozy coloring adventures designed to inspire creativity!",
    longDescription:
      "Immerse yourself in delightful, stress-free coloring adventures! Packed with cute characters, imaginative worlds, and charming scenes crafted to bring relaxation, mindfulness, and creative fun.",
    illustration: "/covers/capybara-axolotl-coloring.jpg",
    color: "#FF8FAB",
    gradientFrom: "#FF8FAB",
    gradientTo: "#FF6B8B",
    books: [
      {
        id: "cozy-capybara-axolotl-coloring",
        title: "Cozy Capybara and Axolotl Coloring Book",
        cover: "/covers/capybara-axolotl-coloring.jpg",
        amazonUrl: "#",
        badge: "Coloring Book",
        description:
          "A cozy and adorable space-themed coloring adventure featuring capybara and axolotl friends exploring the cosmos. Dream, explore, and color!",
      },
    ],
  },
  {
    id: "word-search",
    name: "Word Search",
    group: "puzzle-books",
    description: "Relaxing large-print word search collections to unwind and recharge!",
    longDescription:
      "Our word search books offer a soothing, brain-refreshing escape! Featuring clear large-print text, enchanting seasonal themes, and engaging puzzles crafted to help you relax, unwind, and enjoy.",
    illustration: "/covers/winter-word-search.jpg",
    color: "#4ECB71",
    gradientFrom: "#4ECB71",
    gradientTo: "#22C55E",
    books: [
      {
        id: "winter-word-search-adults",
        title: "Winter Word Search Book for Adults",
        cover: "/covers/winter-word-search.jpg",
        amazonUrl: "#",
        badge: "Large Print",
        description:
          "Winter-themed large print word search puzzles for adults to relax, puzzle, unwind, and enjoy.",
      },
      {
        id: "cat-breeds-word-search",
        title: "Cat Breeds Word Search Puzzle Book",
        cover: "/covers/cat-breeds-word-search.jpg",
        amazonUrl: "#",
        badge: "Cat Edition",
        description:
          "An adorable cat breeds word search puzzle book packed with feline-themed puzzles for cat lovers of all ages.",
      },
    ],
  },
  {
    id: "crosswords",
    name: "Crossword Puzzles",
    group: "puzzle-books",
    description: "Relaxing large-print crossword puzzles to sharpen your mind!",
    longDescription:
      "Stimulate your mind and unwind with our collection of crossword puzzle books! Featuring clear, large-print grids and entertaining seasonal themes crafted for relaxing, screen-free enjoyment.",
    illustration: "/covers/winter-crossword.png",
    color: "#0EA5E9",
    gradientFrom: "#38BDF8",
    gradientTo: "#0284C7",
    books: [
      {
        id: "winter-crossword-adults",
        title: "Large Print Winter Crossword Books for Adults",
        cover: "/covers/winter-crossword.png",
        amazonUrl: "#",
        badge: "Large Print",
        description:
          "Winter-themed large print crossword puzzles for adults to relax, unwind, and keep the mind sharp.",
      },
    ],
  },
  {
    id: "sudoku",
    name: "Sudoku & Puzzle Books",
    group: "puzzle-books",
    description: "Engaging brain teasers, sudoku, and multi-puzzle challenges!",
    longDescription:
      "From mind-sharpening sudoku grids to intricate labyrinths and thematic puzzles, our puzzle books are crafted to challenge clever minds and provide hours of satisfying, screen-free entertainment.",
    illustration: "/covers/halloween-raetselbuch.jpg",
    color: "#FF9F43",
    gradientFrom: "#FF9F43",
    gradientTo: "#E55D5D",
    books: [
      {
        id: "halloween-raetselbuch-erwachsene",
        title: "Halloween Rätselbuch Für Erwachsene",
        cover: "/covers/halloween-raetselbuch.jpg",
        amazonUrl: "#",
        badge: "Sudoku & Puzzles",
        description:
          "Knifflige Rätsel für kluge Köpfe: Sudoku, Wortsuche und Labyrinthe im atmosphärischen Halloween-Design.",
      },
    ],
  },
];

export const categoryGroups = [
  {
    id: "coloring-books",
    name: "Coloring & Creativity",
    description: "Relaxing and joyful coloring adventures!",
  },
  {
    id: "puzzle-books",
    name: "Puzzle & Brain Books",
    description: "Word search, crosswords, sudoku, and multi-puzzle challenges!",
  },
];

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
