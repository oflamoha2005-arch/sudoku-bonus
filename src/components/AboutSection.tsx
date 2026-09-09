"use client";

import { BookOpen, Puzzle, Pencil, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-yellow/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            About{" "}
            <span className="gradient-text">Oufella</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-yellow to-primary rounded-full mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            We&apos;re a passionate team of creators who believe every child deserves
            to have fun while learning. Our activity books combine vibrant
            illustrations with brain-boosting puzzles that keep kids engaged
            for hours!
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Puzzle className="w-7 h-7" />}
            title="Brain Boosting"
            description="Every puzzle is designed to develop critical thinking, logic, and problem-solving skills."
            color="#6EC6FF"
            delay={0}
          />
          <FeatureCard
            icon={<BookOpen className="w-7 h-7" />}
            title="Screen-Free Fun"
            description="Real books for real fun! No batteries needed — just a pencil and a curious mind."
            color="#FF6B6B"
            delay={0.1}
          />
          <FeatureCard
            icon={<Pencil className="w-7 h-7" />}
            title="Kid-Designed"
            description="Every page is tested with real kids to make sure it's the perfect mix of fun and challenge."
            color="#FFD93D"
            delay={0.2}
          />
          <FeatureCard
            icon={<Sparkles className="w-7 h-7" />}
            title="Colorful & Fun"
            description="Bright, beautiful illustrations that make every page a joy to explore and complete."
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
