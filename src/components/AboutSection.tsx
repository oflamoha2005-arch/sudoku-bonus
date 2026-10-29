"use client";

import Link from "next/link";
import { BookOpen, Puzzle, Pencil, Sparkles, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { translations } from "@/utils/translations";

export default function AboutSection() {
  const { language } = useAmazonMarket();
  const t = translations[language];

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-yellow/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {t.aboutTitlePrefix}{" "}
            <span className="gradient-text">{t.aboutTitleHighlight}</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-yellow to-primary rounded-full mx-auto mb-6" />

          {/* Custom Book Demands Announcement */}
          <p className="text-lg sm:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
            {t.aboutSubtitle}
          </p>

          <div className="flex justify-center">
            <Link
              href="/demand-us"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-primary via-[#FF8FAB] to-accent-purple text-white rounded-full font-bold text-sm sm:text-base shadow-xl shadow-pink-200/70 hover:shadow-2xl hover:scale-105 transition-all group"
            >
              <Send className="w-4 h-4" />
              <span>{t.aboutCtaButton}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Puzzle className="w-7 h-7" />}
            title={t.featureBrainTitle}
            description={t.featureBrainDesc}
            color="#6EC6FF"
            delay={0}
          />
          <FeatureCard
            icon={<BookOpen className="w-7 h-7" />}
            title={t.featureScreenTitle}
            description={t.featureScreenDesc}
            color="#FF6B6B"
            delay={0.1}
          />
          <FeatureCard
            icon={<Pencil className="w-7 h-7" />}
            title={t.featureKidTitle}
            description={t.featureKidDesc}
            color="#FFD93D"
            delay={0.2}
          />
          <FeatureCard
            icon={<Sparkles className="w-7 h-7" />}
            title={t.featureDemandTitle}
            description={t.featureDemandDesc}
            color="#B388FF"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group relative p-6 bg-white rounded-3xl border-2 border-transparent hover:border-current/10 shadow-lg shadow-card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {title}
        </h3>
        <p className="text-sm text-foreground/55 leading-relaxed">
          {description}
        </p>
      </div>
    </AnimatedSection>
  );
}
