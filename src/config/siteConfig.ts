export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'word-search' | 'word-fill-in' | 'sudoku' | 'mazes' | 'activity-books';
  categoryLabel: string;
  price?: string;
  amazonUrl?: string;
  comingSoon: boolean;
  accentColor: string;
  pages?: number;
  badge?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  iconName: string;
  tagColor: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  enabled: boolean;
  handle?: string;
}

export const siteConfig = {
  brand: {
    name: 'Oufellia',
    tagline: 'Creative Publishing & Interactive Discovery',
    symbol: '✦',
    copyrightYear: new Date().getFullYear(),
    description:
      'A growing creative publishing universe crafting thoughtful books, puzzles, and printable experiences for curious minds across all generations.',
  },

  hero: {
    heroVideo: '/video/video.mp4',
    heroPoster: '',
    heroEyebrow: 'Creative Publishing',
    heroTitle: 'Discover Worlds Made to Explore',
    heroDescription:
      'Oufellia creates books, puzzles and creative experiences designed to inspire curiosity, relaxation and discovery.',
    heroCTA: {
      primary: {
        label: 'Explore Books',
        href: '#books',
      },
      secondary: {
        label: 'Discover Categories',
        href: '#categories',
      },
    },
    pillTags: ['Word Search', 'Sudoku', 'Mazes', 'Puzzle Books'],
  },

  navLinks: [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Books', href: '#books' },
    { label: 'Categories', href: '#categories' },
    { label: 'About', href: '#about' },
    { label: 'Vision', href: '#vision' },
  ],

  story: {
    eyebrow: 'The Story of Oufellia',
    title: 'More Than Paper. Meaningful Moments.',
    lead:
      'Oufellia started from a simple belief: books and puzzles can create genuine moments of discovery, calm relaxation, and sparks of imagination in our fast-moving lives.',
    paragraphs: [
      'In a world driven by fleeting notifications, we craft tactile, contemplative journeys. Each book is envisioned as an intimate gateway — a pocket sanctuary where solvers of every age can unwind, focus, and reconnect with their inherent curiosity.',
      'We do not view books as mere commercial products on a conveyor belt. They are mindful experiences, thoughtfully designed from the cadence of typography to the balance of paper and whitespace.',
    ],
    quote:
      '“A great puzzle book does not rush you to the finish line; it invites you to savor the quiet joy of discovery.”',
  },

  about: {
    eyebrow: 'About Oufellia',
    title: 'A Growing Publishing Universe for Curious Minds',
    description:
      'Oufellia is an evolving creative publishing house dedicated to crafting thoughtful puzzle books, interactive formats, and printable experiences. We build for everyone who loves to explore — from children uncovering their first maze, to teenagers challenging their logic with word fill-ins, to adults enjoying evening serenity over a sudoku grid.',
    pillars: [
      {
        title: 'Thoughtful Design',
        text: 'Every grid, clue, and illustration is meticulously balanced for visual clarity and delightful problem-solving.',
      },
      {
        title: 'Multi-Generational',
        text: 'Crafted without age confines — designed for kids, teens, adults, and families to share and enjoy.',
      },
      {
        title: 'Ever-Expanding Universe',
        text: 'From physical puzzle books to digital printables and story experiences, our library is always expanding.',
      },
    ],
  },

  vision: {
    eyebrow: 'Our Vision',
    title: 'Inspiring Curiosity, Exploration, and Mindful Entertainment',
    description:
      'We envision a world where creative entertainment is accessible, enriching, and beautifully crafted. A future where tactile publishing and digital interactivity harmoniously inspire lifelong curiosity.',
    coreValues: [
      {
        symbol: '✳',
        title: 'Creativity & Imagination',
        description:
          'We craft puzzles and stories that ignite active imagination rather than passive consumption.',
      },
      {
        symbol: '★',
        title: 'Accessible Entertainment',
        description:
          'Engaging intellectual fun made welcoming and enjoyable for solvers at any skill level.',
      },
      {
        symbol: '✦',
        title: 'Thoughtful Artistry',
        description:
          'Prioritizing generous margins, crisp layouts, and harmonious palettes so every page feels like art.',
      },
      {
        symbol: '✏',
        title: 'Meaningful Experiences',
        description:
          'Offering restorative moments of mental recharge, calm focus, and triumphant discovery.',
      },
    ],
  },

  benefits: [
    {
      title: 'Designed With Care',
      description:
        'Every puzzle, layout, and visual detail is crafted with human intention, ergonomic fonts, and high contrast for effortless solving.',
      icon: 'design',
    },
    {
      title: 'Created For Curious Minds',
      description:
        'Engaging challenges calibrated to stimulate critical thinking, language enrichment, and spatial curiosity for all ages.',
      icon: 'brain',
    },
    {
      title: 'Creative Experiences',
      description:
        'Far beyond standard grids — each collection presents a distinct themed adventure with artistic world-building.',
      icon: 'sparkle',
    },
    {
      title: 'A Growing Collection',
      description:
        'An active roadmap including word searches, sudoku, mazes, word fill-ins, digital books, and printable activity packs.',
      icon: 'library',
    },
  ],

  categories: [
    {
      id: 'all',
      name: 'All Collections',
      slug: 'all',
      shortDesc: 'Complete publishing catalog',
      description: 'Explore the full spectrum of Oufellia puzzle titles and forthcoming releases.',
      iconName: 'all',
      tagColor: 'bg-ochre/15 text-ochre-dark border-ochre/30',
    },
    {
      id: 'word-search',
      name: 'Word Search',
      slug: 'word-search',
      shortDesc: 'Themed journeys & hidden discoveries',
      description:
        'Lushly themed word searches exploring vocabulary, natural wonders, folklore, and literature with multi-directional grids.',
      iconName: 'search',
      tagColor: 'bg-ochre/15 text-ochre-dark border-ochre/30',
    },
    {
      id: 'word-fill-in',
      name: 'Word Fill In',
      slug: 'word-fill-in',
      shortDesc: 'Pure deductive word placement',
      description:
        'Satisfying deductive word placement puzzles that merge crossword aesthetics with pure deductive logic.',
      iconName: 'fill-in',
      tagColor: 'bg-terracotta/15 text-terracotta-dark border-terracotta/30',
    },
    {
      id: 'sudoku',
      name: 'Sudoku',
      slug: 'sudoku',
      shortDesc: 'Elegant numerical harmony',
      description:
        'Precision-crafted logic puzzles offering serene progression from gentle warm-ups to master level brain teasers.',
      iconName: 'grid',
      tagColor: 'bg-sage/15 text-sage-dark border-sage/30',
    },
    {
      id: 'mazes',
      name: 'Mazes',
      slug: 'mazes',
      shortDesc: 'Spatial labyrinths & pathways',
      description:
        'Artistic labyrinths with winding organic paths, geometric illusions, and rewarding navigation challenges.',
      iconName: 'maze',
      tagColor: 'bg-ochre/15 text-ochre-dark border-ochre/30',
    },
  ] as CategoryItem[],

  products: [
    {
      id: 'ws-vol1',
      title: 'Botanical Wanderlust: Word Search Vol. 1',
      description:
        'Journey through 100 sprawling botanical and wildwood word search landscapes designed for peaceful evening relaxation.',
      image: '',
      category: 'word-search',
      categoryLabel: 'Word Search',
      comingSoon: true,
      accentColor: '#D97724',
      pages: 128,
      badge: 'Debut Series',
    },
    {
      id: 'wfi-vol1',
      title: 'The Lexicon Vault: Word Fill-In Odyssey',
      description:
        'Deductive crossword-style fill-in puzzles that test spatial reasoning without clue ambiguity. Pure logical satisfaction.',
      image: '',
      category: 'word-fill-in',
      categoryLabel: 'Word Fill In',
      comingSoon: true,
      accentColor: '#C85A32',
      pages: 140,
      badge: 'Logic Collection',
    },
    {
      id: 'sdk-vol1',
      title: 'Zenith Sudoku: Mindful Number Patterns',
      description:
        'Hand-verified classic 9x9 grids graded smoothly from calming gentle flows to master challenges.',
      image: '',
      category: 'sudoku',
      categoryLabel: 'Sudoku',
      comingSoon: true,
      accentColor: '#768A76',
      pages: 120,
      badge: 'Mindfulness',
    },
    {
      id: 'mz-vol1',
      title: 'Labyrinthine Dreams: Architectural Mazes',
      description:
        'Immersive thematic labyrinths inspired by mythic palaces, enchanted groves, and geometric wonders.',
      image: '',
      category: 'mazes',
      categoryLabel: 'Mazes',
      comingSoon: true,
      accentColor: '#D97724',
      pages: 110,
      badge: 'Visual Quest',
    },
    {
      id: 'ws-vol2',
      title: 'Celestial Maps: Deep Space Word Search',
      description:
        'Discover stellar constellations, astrophysics lore, and ancient star navigation through intricate word matrices.',
      image: '',
      category: 'word-search',
      categoryLabel: 'Word Search',
      comingSoon: true,
      accentColor: '#768A76',
      pages: 132,
      badge: 'Explorer Series',
    },
    {
      id: 'wfi-vol2',
      title: 'Grand Archive: Advanced Word Fill-In',
      description:
        'Multi-length vocabulary matrices for experienced word puzzle enthusiasts seeking deeper deduction.',
      image: '',
      category: 'word-fill-in',
      categoryLabel: 'Word Fill In',
      comingSoon: true,
      accentColor: '#C85A32',
      pages: 144,
      badge: 'Advanced',
    },
  ] as Product[],

  futureCollections: [
    {
      title: 'Printable Activity Kits',
      description:
        'Instant-download weekend activity bundles for family game nights, classrooms, and rainy afternoons.',
      format: 'Instant Digital PDF',
      availability: 'Coming Soon',
      symbol: '✏',
    },
    {
      title: 'Interactive Digital Puzzle Books',
      description:
        'Stylus-optimized interactive story puzzles designed for tablets and touch screens with adaptive hints.',
      format: 'Tablet & Web App',
      availability: 'In Development',
      symbol: '✦',
    },
    {
      title: 'Deluxe Hardcover Collector Editions',
      description:
        'Heirloom cloth-bound editions with gold-foil stamping, premium archival paper, and ribbon bookmarks.',
      format: 'Hardcover Print',
      availability: 'Upcoming Roadmap',
      symbol: '★',
    },
  ],

  socialLinks: [
    {
      platform: 'Pinterest',
      url: 'https://www.pinterest.com/MiniBunny2',
      enabled: true,
      handle: '@MiniBunny2',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/oufellia',
      enabled: false,
      handle: '@oufellia',
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/oufellia',
      enabled: false,
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@oufellia',
      enabled: false,
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@oufellia',
      enabled: false,
    },
    {
      platform: 'X',
      url: 'https://x.com/oufellia',
      enabled: false,
    },
    {
      platform: 'Telegram',
      url: 'https://t.me/oufellia',
      enabled: false,
    },
    {
      platform: 'Discord',
      url: 'https://discord.gg/oufellia',
      enabled: false,
    },
  ] as SocialLink[],
};
