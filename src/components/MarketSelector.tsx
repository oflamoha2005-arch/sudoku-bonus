"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { AmazonMarket } from "@/utils/amazon";

// The 2 specific languages requested by user: English & Germany (Deutsch)
export const SUPPORTED_LANGUAGES = [
  {
    code: "US",
    langName: "English",
    langNameDe: "Englisch (US)",
    subName: "amazon.com",
    flag: "🇺🇸",
    locale: "en",
  },
  {
    code: "DE",
    langName: "Germany (Deutsch)",
    langNameDe: "Deutschland (Deutsch)",
    subName: "amazon.de",
    flag: "🇩🇪",
    locale: "de",
  },
];

interface MarketSelectorProps {
  compact?: boolean;
  className?: string;
  dropUp?: boolean;
  selectedMarket?: AmazonMarket;
  onSelectMarket?: (market: AmazonMarket) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function MarketSelector({
  compact = false,
  className = "",
  dropUp = false,
  selectedMarket,
  onSelectMarket,
  onOpenChange,
}: MarketSelectorProps) {
  const { currentMarket: globalMarket, setMarket, allMarkets, isGerman } = useAmazonMarket();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMarket = selectedMarket || globalMarket;
  const isCardGerman = activeMarket.code === "DE";
  const currentLang = isCardGerman ? SUPPORTED_LANGUAGES[1] : SUPPORTED_LANGUAGES[0];

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const selectLanguage = (langCode: string) => {
    const market = allMarkets.find((m) => m.code === langCode);
    if (market) {
      if (onSelectMarket) {
        onSelectMarket(market);
      } else {
        setMarket(market.code);
      }
    }
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const displayName = isGerman ? currentLang.langNameDe : currentLang.langName;

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isGerman ? "Sprache wählen (Englisch / Deutsch)" : "Select Language (English / Germany)"}
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all ${
          compact
            ? "px-2.5 py-1 text-xs bg-gray-100/90 hover:bg-gray-200/80 text-foreground/80 border border-gray-200/80 active:scale-95 cursor-pointer"
            : "px-3.5 py-1.5 text-xs sm:text-sm bg-white/90 hover:bg-white text-foreground/85 border border-accent-purple/20 shadow-sm hover:shadow-md cursor-pointer"
        }`}
      >
        {!compact && <Globe className="w-3.5 h-3.5 text-primary shrink-0" />}
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-bold tracking-tight text-xs sm:text-sm">
          {compact ? currentLang.subName.replace("amazon.", "") : displayName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-foreground/50 transition-transform duration-200 ${
            isOpen ? (dropUp ? "" : "rotate-180") : dropUp ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu (English & Germany) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute right-0 z-50 ${
              dropUp ? "bottom-full mb-2 origin-bottom-right" : "top-full mt-2 origin-top-right"
            } w-56 rounded-2xl bg-white p-2 border border-gray-200/90 shadow-2xl focus:outline-none divide-y divide-gray-100`}
          >
            <div className="px-3 py-2 text-[11px] font-bold text-foreground/50 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                {isGerman ? "Sprache wählen" : "Language / Sprache"}
              </span>
              <span className="text-[10px] text-purple-600 font-semibold">
                {isGerman ? "2 Sprachen" : "2 Languages"}
              </span>
            </div>

            <div className="py-1 space-y-1">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = isCardGerman ? lang.code === "DE" : lang.code === "US";
                const itemLabel = isGerman ? lang.langNameDe : lang.langName;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => selectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? "bg-purple-50 text-purple-700 font-bold border border-purple-100"
                        : "hover:bg-accent-yellow/15 text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <div>
                        <div className="font-semibold leading-tight">{itemLabel}</div>
                        <div className="text-[10px] text-foreground/50 font-mono">{lang.subName}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
