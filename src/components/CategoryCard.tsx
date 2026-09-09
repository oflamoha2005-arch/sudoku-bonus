"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/data/books";
import { assetPath } from "@/utils/paths";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.id}`} className="group block">
        <div
          className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-white/50"
          style={{
            background: `linear-gradient(135deg, ${category.gradientFrom}15, ${category.gradientTo}25)`,
          }}
        >
          {/* Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <Image
              src={assetPath(category.illustration)}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />

            {/* Books count badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold shadow-lg"
              style={{ color: category.color }}
            >
              {category.books.length} books
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: category.color }}
              />
              <h3
                className="text-xl font-bold text-foreground group-hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {category.name}
              </h3>
            </div>
            <p className="text-sm text-foreground/55 leading-relaxed">
              {category.description}
            </p>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold"
              style={{ color: category.color }}
            >
              <span>Browse Books</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
