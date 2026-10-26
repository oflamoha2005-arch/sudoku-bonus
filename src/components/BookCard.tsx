"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import type { Book } from "@/data/books";
import { ExternalLink } from "lucide-react";
import { assetPath } from "@/utils/paths";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { AmazonMarket, getBookDefaultMarket, isSafeAmazonUrl } from "@/utils/amazon";
import { translations, bookTranslationsDe } from "@/utils/translations";
import MarketSelector from "./MarketSelector";

interface BookCardProps {
  book: Book;
  categoryColor: string;
  index: number;
}

export default function BookCard({ book, categoryColor, index }: BookCardProps) {
  const { getBookUrl, language, isGerman } = useAmazonMarket();
  const t = translations[language];

  // Book default marketplace:
  // English books default to US (amazon.com)
  // German books default to DE (amazon.de)
  const defaultMarket = useMemo(() => getBookDefaultMarket(book), [book]);
  // The visitor's manual choice (if any) wins over the book's default marketplace
  const [marketOverride, setMarketOverride] = useState<AmazonMarket | null>(null);
  const selectedMarket = marketOverride ?? defaultMarket;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const localizedUrl = getBookUrl(book, selectedMarket);

  const hasValidAmazonUrl = isSafeAmazonUrl(localizedUrl);

  const cardRef = useRef<HTMLDivElement>(null);

  // Localized title, badge, description
  const deInfo = isGerman ? bookTranslationsDe[book.id] : null;
  const displayTitle = deInfo?.titleDe || book.title;
  const displayBadge = deInfo?.badgeDe || book.badge;
  const displayDesc = deInfo?.descDe || book.description;

  // Lightweight CSS-based scroll reveal (replaces framer-motion whileInView)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group h-full flex relative ${isDropdownOpen ? "z-30" : "z-10"}`}
    >
      <div
        className={`relative bg-white rounded-3xl ${
          isDropdownOpen ? "z-30 shadow-2xl" : "shadow-lg hover:shadow-2xl hover:-translate-y-2"
        } transition-all duration-500 border border-gray-100 flex flex-col w-full`}
      >
        {/* Cover Image Container */}
        <div className="relative h-80 sm:h-96 rounded-t-3xl overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-[#F3F4F6] to-[#E5E7EB]/50 flex items-center justify-center p-4 sm:p-5">
          <div className="relative w-full h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
            <Image
              src={assetPath(book.cover)}
              alt={displayTitle}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>

          {displayBadge && (
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}DD)`,
              }}
            >
              {displayBadge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white rounded-b-3xl">
          <div>
            <h3
              className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {displayTitle}
            </h3>
            {displayDesc && (
              <p className="text-sm text-foreground/60 mb-5 line-clamp-3 leading-relaxed">
                {displayDesc}
              </p>
            )}
          </div>

          {/* Action section */}
          <div>
            {hasValidAmazonUrl ? (
              <div className="space-y-2">
                <a
                  href={localizedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-5 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group/btn"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}DD)`,
                  }}
                >
                  <span className="text-base leading-none">{selectedMarket.flag}</span>
                  <span>{t.buyOnAmazon} {selectedMarket.domain}</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>

                {/* Market context hint & quick selector */}
                <div className="flex items-center justify-between text-[11px] text-foreground/55 px-1 pt-1">
                  <span className="flex items-center gap-1.5 truncate">
                    <span>{t.storeLabel}</span>
                    <span className="font-semibold text-foreground/80 truncate">
                      {selectedMarket.name}
                    </span>
                  </span>
                  <MarketSelector
                    compact
                    dropUp
                    selectedMarket={selectedMarket}
                    onSelectMarket={setMarketOverride}
                    onOpenChange={setIsDropdownOpen}
                  />
                </div>
              </div>
            ) : (
              <div className="inline-flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm border border-gray-200 bg-gray-50/80 text-foreground/75 w-full">
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: categoryColor }}
                  />
                  <span className="text-xs sm:text-sm">{t.availableOnAmazon}</span>
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-foreground/50 border border-gray-200 font-medium">
                  {t.linkSoon}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
