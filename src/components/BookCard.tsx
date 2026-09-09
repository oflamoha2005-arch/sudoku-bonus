"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Book } from "@/data/books";
import { ExternalLink } from "lucide-react";
import { assetPath } from "@/utils/paths";

interface BookCardProps {
  book: Book;
  categoryColor: string;
  index: number;
}

export default function BookCard({ book, categoryColor, index }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
        {/* Cover Image */}
        <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={assetPath(book.cover)}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="text-lg font-bold text-foreground mb-1 line-clamp-2"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {book.title}
          </h3>
          {book.description && (
            <p className="text-sm text-foreground/55 mb-4 line-clamp-2">
              {book.description}
            </p>
          )}

          {/* Buy Button */}
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-2xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}DD)`,
            }}
          >
            <span>Buy on Amazon</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
