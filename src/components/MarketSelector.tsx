"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { AmazonMarket } from "@/utils/amazon";

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
  const { currentMarket: globalMarket, setMarket, allMarkets, isAutoDetected } = useAmazonMarket();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMarket = selectedMarket || globalMarket;

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

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Select Amazon Marketplace"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-all ${
          compact
            ? "px-2.5 py-1 text-xs bg-gray-100/90 hover:bg-gray-200/80 text-foreground/80 border border-gray-200/80 active:scale-95 cursor-pointer"
            : "px-3.5 py-1.5 text-xs sm:text-sm bg-white/80 hover:bg-white text-foreground/85 border border-accent-purple/15 shadow-sm hover:shadow cursor-pointer"
        }`}
      >
        <span className="text-sm leading-none">{activeMarket.flag}</span>
        <span className="font-bold tracking-tight">
          {compact ? activeMarket.domain.replace("amazon.", "") : activeMarket.domain}
        </span>
        {isAutoDetected && !compact && !selectedMarket && (
          <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-accent-green/20 text-accent-green">
            Auto
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-foreground/50 transition-transform duration-200 ${
            isOpen ? (dropUp ? "" : "rotate-180") : dropUp ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute right-0 z-50 ${
              dropUp ? "bottom-full mb-2 origin-bottom-right" : "top-full mt-2 origin-top-right"
            } w-64 max-h-72 overflow-y-auto rounded-2xl bg-white p-2 border border-gray-200/90 divide-y divide-gray-100 focus:outline-none`}
            style={{
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="px-3 py-2 text-[11px] font-bold text-foreground/50 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                Amazon Marketplace
              </span>
              <span>{allMarkets.length} Stores</span>
            </div>

            <div className="py-1">
              {allMarkets.map((m) => {
                const isSelected = m.code === activeMarket.code;
                return (
                  <button
                    key={m.code}
                    type="button"
                    onClick={() => {
                      if (onSelectMarket) {
                        onSelectMarket(m);
                      } else {
                        setMarket(m.code);
                      }
                      setIsOpen(false);
                      onOpenChange?.(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 text-primary font-bold"
                        : "hover:bg-accent-yellow/15 text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none">{m.flag}</span>
                      <div className="truncate">
                        <div className="truncate font-medium">{m.name}</div>
                        <div className="text-[10px] text-foreground/50 font-mono">{m.domain}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
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
