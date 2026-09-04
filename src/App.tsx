import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickCategories from './components/QuickCategories';
import OurStory from './components/OurStory';
import About from './components/About';
import Vision from './components/Vision';
import WhyOufellia from './components/WhyOufellia';
import Books from './components/Books';
import Categories from './components/Categories';
import FutureCollection from './components/FutureCollection';
import Community from './components/Community';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
  };

  return (
    <div className="min-h-screen bg-cream font-body text-cocoa selection:bg-ochre/20 selection:text-cocoa flex flex-col">
      {/* 1. Fixed Navigation */}
      <Navbar />

      <main>
        {/* 2. Interactive Hero (Full Screen, Mouse/Touch Scrubbed Video) */}
        <Hero />

        {/* 3. Quick Category Navigation */}
        <QuickCategories onSelectCategory={handleSelectCategory} />

        {/* 4. Our Story Section */}
        <OurStory />

        {/* 5. About Oufellia */}
        <About />

        {/* 6. Our Vision */}
        <Vision />

        {/* 7. Why Oufellia */}
        <WhyOufellia />

        {/* 8. Books Section */}
        <Books
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* 9. Categories Section */}
        <Categories onSelectCategory={handleSelectCategory} />

        {/* 10. Coming Soon Collection */}
        <FutureCollection />

        {/* 11. Social Media Community */}
        <Community />

        {/* 12. Final CTA */}
        <FinalCTA />
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
