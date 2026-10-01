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
  const hasValidAmazonUrl =
    book.amazonUrl &&
    book.amazonUrl !== "#" &&
    book.amazonUrl.startsWith("http") &&
    !book.amazonUrl.includes("PLACEHOLDER");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full flex"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col w-full">
        {/* Cover Image Container */}
        <div className="relative h-80 sm:h-96 overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-[#F3F4F6] to-[#E5E7EB]/50 flex items-center justify-center p-4 sm:p-5">
          <div className="relative w-full h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
            <Image
              src={assetPath(book.cover)}
              alt={book.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>

          {book.badge && (
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}DD)`,
              }}
            >
              {book.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white">
          <div>
            <h3
              className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {book.title}
            </h3>
            {book.description && (
              <p className="text-sm text-foreground/60 mb-5 line-clamp-3 leading-relaxed">
                {book.description}
              </p>
            )}
          </div>

          {/* Buy Button or Link Coming Soon */}
          {hasValidAmazonUrl ? (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center px-5 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}DD)`,
              }}
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="inline-flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm border border-gray-200 bg-gray-50/80 text-foreground/75">
              <span className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: categoryColor }}
                />
                <span className="text-xs sm:text-sm">Available on Amazon</span>
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-foreground/50 border border-gray-200 font-medium">
                Link Soon
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
