export interface Book {
  id: string;
  title: string;
  cover: string;
  amazonUrl: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  group: "puzzle-books" | "hidden-pictures";
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
    id: "sudoku",
    name: "Sudoku",
    group: "puzzle-books",
    description: "Fun number puzzles that boost logical thinking!",
    longDescription:
      "Our Sudoku books are specially designed for young minds! Starting from easy 4×4 grids and progressing to challenging 9×9 puzzles, each book is packed with colorful, engaging puzzles that make learning logic and numbers an absolute blast.",
    illustration: "/illustrations/sudoku.jpg",
    color: "#6EC6FF",
    gradientFrom: "#6EC6FF",
    gradientTo: "#3B82F6",
    books: [
      {
        id: "sudoku-easy-1",
        title: "Easy Sudoku for Kids Vol. 1",
        cover: "/covers/sudoku-easy-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "50+ exciting sudoku puzzles for beginners ages 6-10",
      },
      {
        id: "sudoku-easy-2",
        title: "Sudoku Fun: Brain Teasers",
        cover: "/covers/sudoku-easy-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Colorful sudoku challenges for clever kids",
      },
    ],
  },
  {
    id: "mazes",
    name: "Mazes",
    group: "puzzle-books",
    description: "Exciting adventures through twisting paths!",
    longDescription:
      "Get ready for an adventure! Our maze books take kids on incredible journeys through twisting, turning paths. From simple paths for beginners to mind-bending labyrinths for maze masters, every page is a new adventure waiting to be explored.",
    illustration: "/illustrations/mazes.jpg",
    color: "#FF6B6B",
    gradientFrom: "#FF6B6B",
    gradientTo: "#E55D5D",
    books: [
      {
        id: "mazes-adventure-1",
        title: "Amazing Mazes for Kids",
        cover: "/covers/mazes-adventure-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Over 50 exciting maze challenges for ages 4-8",
      },
      {
        id: "mazes-adventure-2",
        title: "Maze Master Challenge",
        cover: "/covers/mazes-adventure-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Advanced mazes for young puzzle champions",
      },
    ],
  },
  {
    id: "fill-in",
    name: "Fill-in Puzzles",
    group: "puzzle-books",
    description: "Word puzzles that expand vocabulary & spelling!",
    longDescription:
      "Fill-in puzzles are a fantastic way to boost vocabulary and spelling skills! Kids fit words into crossword-style grids, learning new words while having tons of fun. Each book includes puzzles of varying difficulty levels.",
    illustration: "/illustrations/fill-in.jpg",
    color: "#FFD93D",
    gradientFrom: "#FFD93D",
    gradientTo: "#F59E0B",
    books: [
      {
        id: "fillin-fun-1",
        title: "Fill-in Puzzles Fun",
        cover: "/covers/fillin-fun-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Criss-cross puzzles, word searches & more!",
      },
      {
        id: "fillin-fun-2",
        title: "Word Fill-in Adventures",
        cover: "/covers/fillin-fun-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Hours of word-fitting fun for young minds",
      },
    ],
  },
  {
    id: "word-search",
    name: "Word Search",
    group: "puzzle-books",
    description: "Find hidden words in a grid of letters!",
    longDescription:
      "Our word search books are perfect for budding word detectives! Each puzzle hides exciting words in a grid of letters, and kids need to find them all. With themes like animals, space, food, and more, there's something for every curious mind.",
    illustration: "/illustrations/word-search.jpg",
    color: "#4ECB71",
    gradientFrom: "#4ECB71",
    gradientTo: "#22C55E",
    books: [
      {
        id: "wordsearch-fun-1",
        title: "Word Search Adventures",
        cover: "/covers/wordsearch-fun-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Over 100 fun puzzles! Hours of word finding fun!",
      },
      {
        id: "wordsearch-fun-2",
        title: "Ultimate Word Hunt",
        cover: "/covers/wordsearch-fun-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Themed word searches for ages 6-9",
      },
    ],
  },
  {
    id: "hidden-pictures",
    name: "Hidden Pictures",
    group: "hidden-pictures",
    description: "Spot the hidden objects in colorful scenes!",
    longDescription:
      "Can you find them all? Our Hidden Pictures books feature beautifully illustrated scenes packed with cleverly concealed objects. Kids sharpen their observation skills while exploring vibrant, detailed illustrations. Over 100 objects to discover in every book!",
    illustration: "/illustrations/hidden-pictures.jpg",
    color: "#B388FF",
    gradientFrom: "#B388FF",
    gradientTo: "#8B5CF6",
    books: [
      {
        id: "hidden-pictures-1",
        title: "Hidden Pictures Challenge",
        cover: "/covers/hidden-pictures-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Search & find fun with over 100 objects to spot!",
      },
      {
        id: "hidden-pictures-2",
        title: "Spot It! Hidden Objects",
        cover: "/covers/hidden-pictures-1.jpg",
        amazonUrl: "https://amazon.com/dp/PLACEHOLDER",
        description: "Beautifully illustrated seek & find adventures",
      },
    ],
  },
];

export const categoryGroups = [
  {
    id: "puzzle-books",
    name: "Puzzle Books",
    description: "Brain-boosting puzzles for curious minds!",
  },
  {
    id: "hidden-pictures",
    name: "Hidden Pictures Books",
    description: "Find the hidden objects in every scene!",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoriesByGroup(group: string): Category[] {
  return categories.filter((cat) => cat.group === group);
}
