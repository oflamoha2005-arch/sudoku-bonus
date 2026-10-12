import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

const CategoriesPreview = dynamic(() => import("@/components/CategoriesPreview"), {
  loading: () => (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-gray-100 animate-pulse h-[480px]" />
          ))}
        </div>
      </div>
    </section>
  ),
});

const InteractiveTeaser = dynamic(() => import("@/components/InteractiveTeaser"), {
  loading: () => <div className="py-24" />,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CategoriesPreview />
      <InteractiveTeaser />
    </>
  );
}
