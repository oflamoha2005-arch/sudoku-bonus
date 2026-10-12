"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import type { Book } from "@/data/books";
import {
  AmazonMarket,
  AMAZON_MARKETS,
  DEFAULT_MARKET,
  resolveMarketFromCountryCode,
  detectBrowserFallbackMarket,
  buildAmazonUrl,
  localizeAmazonUrl,
  getBookDefaultMarket,
} from "@/utils/amazon";

interface AmazonMarketContextValue {
  currentMarket: AmazonMarket;
  setMarket: (marketCode: string) => void;
  getBookUrl: (book: Book, marketOverride?: AmazonMarket) => string;
  allMarkets: AmazonMarket[];
  isAutoDetected: boolean;
  detectedCountryCode: string | null;
}

const AmazonMarketContext = createContext<AmazonMarketContextValue | null>(null);

const STORAGE_KEY = "oufella_amazon_market_code";

export function AmazonMarketProvider({ children }: { children: React.ReactNode }) {
  const [currentMarket, setCurrentMarket] = useState<AmazonMarket>(DEFAULT_MARKET);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(false);
  const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check user manual override in localStorage
    try {
      const savedCode = localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        const found = AMAZON_MARKETS.find((m) => m.code === savedCode.toUpperCase());
        if (found) {
          setCurrentMarket(found);
          setIsAutoDetected(false);
          return;
        }
      }
    } catch {
      // localStorage disabled or error
    }

    // 2. Set instant fallback from browser (timezone + language)
    const browserFallback = detectBrowserFallbackMarket();
    setCurrentMarket(browserFallback);

    // 3. Attempt geolocation via fast country.is API
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    fetch("https://api.country.is/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Geo lookup error");
        return res.json();
      })
      .then((data: { country?: string }) => {
        if (data && data.country) {
          setDetectedCountryCode(data.country);
          const market = resolveMarketFromCountryCode(data.country);
          setCurrentMarket(market);
          setIsAutoDetected(true);
        }
      })
      .catch(() => {
        // Fallback already active, nothing to do
      })
      .finally(() => {
        clearTimeout(timer);
      });

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const handleSetMarket = useCallback((code: string) => {
    const market = AMAZON_MARKETS.find((m) => m.code === code.toUpperCase());
    if (market) {
      setCurrentMarket(market);
      setIsAutoDetected(false);
      try {
        localStorage.setItem(STORAGE_KEY, market.code);
      } catch {
        // ignore
      }
    }
  }, []);

  const getBookUrl = useCallback(
    (book: Book, marketOverride?: AmazonMarket) => {
      const targetDomain = marketOverride
        ? marketOverride.domain
        : getBookDefaultMarket(book).domain;

      if (book.asin) {
        return buildAmazonUrl(book.asin, targetDomain);
      }
      if (book.amazonUrl && book.amazonUrl !== "#") {
        return localizeAmazonUrl(book.amazonUrl, targetDomain);
      }
      return "#";
    },
    []
  );

  const value = useMemo(
    () => ({
      currentMarket,
      setMarket: handleSetMarket,
      getBookUrl,
      allMarkets: AMAZON_MARKETS,
      isAutoDetected,
      detectedCountryCode,
    }),
    [currentMarket, handleSetMarket, getBookUrl, isAutoDetected, detectedCountryCode]
  );

  return <AmazonMarketContext.Provider value={value}>{children}</AmazonMarketContext.Provider>;
}

export function useAmazonMarket() {
  const context = useContext(AmazonMarketContext);
  if (!context) {
    throw new Error("useAmazonMarket must be used within an AmazonMarketProvider");
  }
  return context;
}
