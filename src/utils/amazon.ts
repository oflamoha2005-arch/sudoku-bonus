export interface AmazonMarket {
  code: string;
  domain: string;
  name: string;
  flag: string;
  currency: string;
  matchedCountries: string[];
}

export const AMAZON_MARKETS: AmazonMarket[] = [
  {
    code: "US",
    domain: "amazon.com",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD ($)",
    matchedCountries: ["US"],
  },
  {
    code: "DE",
    domain: "amazon.de",
    name: "Germany (Deutschland)",
    flag: "🇩🇪",
    currency: "EUR (€)",
    matchedCountries: ["DE", "AT", "CH", "LI"],
  },
  {
    code: "UK",
    domain: "amazon.co.uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP (£)",
    matchedCountries: ["GB", "UK", "IE"],
  },
  {
    code: "FR",
    domain: "amazon.fr",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR (€)",
    matchedCountries: ["FR", "BE", "LU", "MC"],
  },
  {
    code: "ES",
    domain: "amazon.es",
    name: "Spain (España)",
    flag: "🇪🇸",
    currency: "EUR (€)",
    matchedCountries: ["ES", "AD", "PT"],
  },
  {
    code: "IT",
    domain: "amazon.it",
    name: "Italy (Italia)",
    flag: "🇮🇹",
    currency: "EUR (€)",
    matchedCountries: ["IT", "SM", "VA"],
  },
  {
    code: "CA",
    domain: "amazon.ca",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD ($)",
    matchedCountries: ["CA"],
  },
  {
    code: "AU",
    domain: "amazon.com.au",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD ($)",
    matchedCountries: ["AU", "NZ"],
  },
  {
    code: "NL",
    domain: "amazon.nl",
    name: "Netherlands",
    flag: "🇳🇱",
    currency: "EUR (€)",
    matchedCountries: ["NL"],
  },
  {
    code: "PL",
    domain: "amazon.pl",
    name: "Poland (Polska)",
    flag: "🇵🇱",
    currency: "PLN (zł)",
    matchedCountries: ["PL"],
  },
  {
    code: "SE",
    domain: "amazon.se",
    name: "Sweden (Sverige)",
    flag: "🇸🇪",
    currency: "SEK (kr)",
    matchedCountries: ["SE", "NO", "DK", "FI"],
  },
  {
    code: "JP",
    domain: "amazon.co.jp",
    name: "Japan (日本)",
    flag: "🇯🇵",
    currency: "JPY (¥)",
    matchedCountries: ["JP"],
  },
  {
    code: "MX",
    domain: "amazon.com.mx",
    name: "Mexico (México)",
    flag: "🇲🇽",
    currency: "MXN ($)",
    matchedCountries: ["MX"],
  },
  {
    code: "BR",
    domain: "amazon.com.br",
    name: "Brazil (Brasil)",
    flag: "🇧🇷",
    currency: "BRL (R$)",
    matchedCountries: ["BR"],
  },
];

export const DEFAULT_MARKET = AMAZON_MARKETS[0]; // US

/**
 * Extracts ASIN from Amazon URL or string
 */
export function extractAsin(input?: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Direct ASIN string (10 alphanumeric characters starting with B or numbers)
  if (/^[A-Z0-9]{10}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  // URL pattern: /dp/B0XXXXX or /gp/product/B0XXXXX
  const dpMatch = trimmed.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
  if (dpMatch && dpMatch[1]) {
    return dpMatch[1].toUpperCase();
  }
  return null;
}

/**
 * Resolves AmazonMarket from an ISO-2 country code (e.g. "DE", "FR", "US")
 */
export function resolveMarketFromCountryCode(countryCode?: string): AmazonMarket {
  if (!countryCode) return DEFAULT_MARKET;
  const upper = countryCode.toUpperCase();
  const found = AMAZON_MARKETS.find((m) => m.matchedCountries.includes(upper));
  return found || DEFAULT_MARKET;
}

/**
 * Fallback browser heuristics: Timezone + Navigator language
 */
export function detectBrowserFallbackMarket(): AmazonMarket {
  if (typeof window === "undefined") return DEFAULT_MARKET;

  try {
    // 1. Timezone detection
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Berlin") || tz.includes("Vienna") || tz.includes("Zurich")) {
      return AMAZON_MARKETS.find((m) => m.code === "DE") || DEFAULT_MARKET;
    }
    if (tz.includes("London") || tz.includes("Dublin")) {
      return AMAZON_MARKETS.find((m) => m.code === "UK") || DEFAULT_MARKET;
    }
    if (tz.includes("Paris") || tz.includes("Brussels")) {
      return AMAZON_MARKETS.find((m) => m.code === "FR") || DEFAULT_MARKET;
    }
    if (tz.includes("Madrid")) {
      return AMAZON_MARKETS.find((m) => m.code === "ES") || DEFAULT_MARKET;
    }
    if (tz.includes("Rome")) {
      return AMAZON_MARKETS.find((m) => m.code === "IT") || DEFAULT_MARKET;
    }
    if (tz.includes("Amsterdam")) {
      return AMAZON_MARKETS.find((m) => m.code === "NL") || DEFAULT_MARKET;
    }
    if (tz.includes("Warsaw")) {
      return AMAZON_MARKETS.find((m) => m.code === "PL") || DEFAULT_MARKET;
    }
    if (tz.includes("Stockholm") || tz.includes("Oslo") || tz.includes("Helsinki") || tz.includes("Copenhagen")) {
      return AMAZON_MARKETS.find((m) => m.code === "SE") || DEFAULT_MARKET;
    }
    if (tz.startsWith("Canada/") || tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal")) {
      return AMAZON_MARKETS.find((m) => m.code === "CA") || DEFAULT_MARKET;
    }
    if (tz.startsWith("Australia/") || tz.includes("Sydney") || tz.includes("Melbourne")) {
      return AMAZON_MARKETS.find((m) => m.code === "AU") || DEFAULT_MARKET;
    }
    if (tz.includes("Tokyo")) {
      return AMAZON_MARKETS.find((m) => m.code === "JP") || DEFAULT_MARKET;
    }
  } catch {
    // ignore
  }

  try {
    // 2. Language detection
    const lang = (navigator.language || "").toLowerCase();
    if (lang.startsWith("de")) return AMAZON_MARKETS.find((m) => m.code === "DE") || DEFAULT_MARKET;
    if (lang === "en-gb" || lang === "en-ie") return AMAZON_MARKETS.find((m) => m.code === "UK") || DEFAULT_MARKET;
    if (lang.startsWith("fr")) return AMAZON_MARKETS.find((m) => m.code === "FR") || DEFAULT_MARKET;
    if (lang.startsWith("es")) return AMAZON_MARKETS.find((m) => m.code === "ES") || DEFAULT_MARKET;
    if (lang.startsWith("it")) return AMAZON_MARKETS.find((m) => m.code === "IT") || DEFAULT_MARKET;
    if (lang.startsWith("nl")) return AMAZON_MARKETS.find((m) => m.code === "NL") || DEFAULT_MARKET;
    if (lang.startsWith("pl")) return AMAZON_MARKETS.find((m) => m.code === "PL") || DEFAULT_MARKET;
    if (lang.startsWith("sv") || lang.startsWith("da") || lang.startsWith("nb") || lang.startsWith("nn")) {
      return AMAZON_MARKETS.find((m) => m.code === "SE") || DEFAULT_MARKET;
    }
    if (lang === "en-ca" || lang === "fr-ca") return AMAZON_MARKETS.find((m) => m.code === "CA") || DEFAULT_MARKET;
    if (lang === "en-au" || lang === "en-nz") return AMAZON_MARKETS.find((m) => m.code === "AU") || DEFAULT_MARKET;
    if (lang.startsWith("ja")) return AMAZON_MARKETS.find((m) => m.code === "JP") || DEFAULT_MARKET;
  } catch {
    // ignore
  }

  return DEFAULT_MARKET;
}

/**
 * Generates localized Amazon link for an ASIN
 */
export function buildAmazonUrl(asin: string, domain: string = "amazon.com"): string {
  const cleanAsin = asin.trim().toUpperCase();
  return `https://www.${domain}/dp/${cleanAsin}`;
}

/**
 * Only allow https links that point to an official Amazon storefront.
 * Protects the "Buy" buttons from javascript:/data:/phishing URLs.
 */
export function isSafeAmazonUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    return (
      AMAZON_MARKETS.some((m) => host === m.domain || host === `www.${m.domain}`) ||
      host === "amzn.to" ||
      host === "a.co" ||
      host === "amzn.eu"
    );
  } catch {
    return false;
  }
}

/**
 * Localizes an existing Amazon URL or ASIN to target domain
 */
export function localizeAmazonUrl(
  inputUrlOrAsin: string,
  targetMarketDomain: string = "amazon.com"
): string {
  const asin = extractAsin(inputUrlOrAsin);
  if (asin) {
    return buildAmazonUrl(asin, targetMarketDomain);
  }
  // If it's a URL but no clean ASIN could be extracted, try domain swap
  if (inputUrlOrAsin.startsWith("http")) {
    return inputUrlOrAsin.replace(/amazon\.[a-z.]+/i, targetMarketDomain);
  }
  return inputUrlOrAsin;
}

/**
 * Resolves the default Amazon marketplace for a book based on language or settings:
 * - English ("en") -> US (amazon.com)
 * - German ("de") -> DE (amazon.de)
 */
export function getBookDefaultMarket(book?: {
  language?: string;
  defaultMarket?: string;
  title?: string;
  amazonUrl?: string;
}): AmazonMarket {
  if (!book) return DEFAULT_MARKET;

  // 1. Explicit defaultMarket
  if (book.defaultMarket) {
    const market = AMAZON_MARKETS.find(
      (m) => m.code === book.defaultMarket?.toUpperCase()
    );
    if (market) return market;
  }

  // 2. Language check (German -> DE, English -> US)
  if (book.language) {
    const lang = book.language.toLowerCase();
    if (lang === "de" || lang.startsWith("de") || lang === "german" || lang === "germany") {
      return AMAZON_MARKETS.find((m) => m.code === "DE") || DEFAULT_MARKET;
    }
    if (lang === "en" || lang.startsWith("en") || lang === "english") {
      return AMAZON_MARKETS.find((m) => m.code === "US") || DEFAULT_MARKET;
    }
  }

  // 3. Check amazonUrl domain
  if (book.amazonUrl && /amazon\.de/i.test(book.amazonUrl)) {
    return AMAZON_MARKETS.find((m) => m.code === "DE") || DEFAULT_MARKET;
  }

  // 4. Keyword heuristic in title
  if (
    book.title &&
    /rätselbuch|raetselbuch|erwachsene|für|fuer|deutsch/i.test(book.title)
  ) {
    return AMAZON_MARKETS.find((m) => m.code === "DE") || DEFAULT_MARKET;
  }

  return DEFAULT_MARKET;
}

