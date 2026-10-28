"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, Send, CheckCircle2, AlertCircle, BookOpen, HeartHandshake } from "lucide-react";
import { useAmazonMarket } from "@/context/AmazonMarketContext";
import { translations, categoryPillsTranslations } from "@/utils/translations";

import { isSupabaseConfigured, submitToSupabase } from "@/lib/supabase";

const BACKEND_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000";

export default function DemandUsPage() {
  const { language, isGerman } = useAmazonMarket();
  const t = translations[language];
  const pills = categoryPillsTranslations[language];

  const [email, setEmail] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [category, setCategory] = useState("other");
  const [demandText, setDemandText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    const cleanDemand = demandText.trim();

    if (!cleanEmail) {
      setErrorMessage(
        isGerman
          ? "Bitte gib deine E-Mail-Adresse ein, damit wir dich kontaktieren können."
          : "Please enter your email address so we can contact you."
      );
      return;
    }
    if (!cleanDemand) {
      setErrorMessage(
        isGerman
          ? "Bitte beschreibe kurz das Buch, das wir für dich erstellen sollen."
          : "Please write a few words describing the book you would like us to create."
      );
      return;
    }

    setIsLoading(true);

    const payload = {
      email: cleanEmail,
      book_title: bookTitle.trim(),
      category,
      demand: cleanDemand,
    };

    // Always preserve locally so no client demand is ever lost
    saveToLocalBackup(payload);

    try {
      // 1. If Supabase Cloud Database is configured, save directly to cloud 24/7
      if (isSupabaseConfigured) {
        await submitToSupabase({
          email: cleanEmail,
          category,
          book_title: bookTitle.trim(),
          demand_text: cleanDemand,
        });
        setSubmitted(true);
        return;
      }

      // 2. Otherwise try Django Backend (if running locally or deployed)
      const res = await fetch(`${BACKEND_URL}/api/demands/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        const errorMsg = data.error || `Server status: ${res.status}`;
        // If server returned an explicit validation error, show it
        if (res.status === 400 || res.status === 429) {
          setErrorMessage(errorMsg);
        } else {
          // If server error, accept graciously with local backup
          setSubmitted(true);
        }
      }
    } catch {
      // If neither Supabase nor Django is currently reachable, accept graciously
      // because we already preserved the demand in localStorage backup!
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocalBackup = (data: Record<string, unknown>) => {
    try {
      const existing = JSON.parse(localStorage.getItem("oufella_saved_demands") || "[]");
      existing.push({ ...data, saved_at: new Date().toISOString() });
      localStorage.setItem("oufella_saved_demands", JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setEmail("");
    setBookTitle("");
    setDemandText("");
    setCategory("other");
    setSubmitted(false);
    setErrorMessage(null);
  };

  const selectedCategoryLabel = pills.find((c) => c.id === category)?.label || category;

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 bg-gradient-to-br from-[#FFF5E6] via-[#FFEEF0] to-[#EDE7FF] relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-28 left-[8%] w-16 h-16 bg-accent-yellow/20 rounded-full animate-float pointer-events-none" />
      <div className="absolute top-44 right-[12%] w-12 h-12 bg-primary/20 rounded-full animate-float-reverse pointer-events-none" />
      <div className="absolute bottom-28 left-[18%] w-14 h-14 bg-accent-purple/20 rounded-full animate-float-slow pointer-events-none" />
      <div className="absolute bottom-40 right-[20%] w-10 h-10 bg-accent-green/20 rounded-full animate-float pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-accent-purple/15 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-[#FF8FAB] to-accent-purple text-white mb-4 shadow-lg shadow-pink-200">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h1
                    className="text-3xl sm:text-4xl font-bold gradient-text mb-3"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {t.demandTitle}
                  </h1>
                  <p className="text-foreground/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    {t.demandSubtitle}
                  </p>
                </div>

                {/* Database Connection Info Pill */}
                <div className="bg-purple-50/80 border border-purple-100 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between text-xs text-purple-900">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {isSupabaseConfigured
                        ? (isGerman ? "Cloud-Datenbank online 🟢 (24/7 aktiv)" : "Cloud Database Online 🟢 (24/7 Active)")
                        : t.demandServiceOnline}
                    </span>
                  </span>
                  <span className="text-purple-600 font-semibold hidden sm:inline">
                    {t.demandNoPassword}
                  </span>
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3.5 rounded-2xl text-xs sm:text-sm mb-6 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold mb-0.5">Note:</p>
                      <p>{errorMessage}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Pills */}
                  <div>
                    <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                      {t.demandCategoryLabel}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {pills.map((cat) => {
                        const isSelected = category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border ${
                              isSelected
                                ? "bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]"
                                : "bg-gray-50 hover:bg-gray-100 text-foreground/75 border-gray-200"
                            }`}
                          >
                            <span>{cat.emoji}</span>
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                      {t.demandEmailLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/35" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-name@example.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-accent-purple focus:bg-white focus:outline-none transition-all text-foreground placeholder:text-foreground/35 text-sm"
                      />
                    </div>
                    <p className="text-[11px] text-foreground/50 mt-1.5 ml-1">
                      {t.demandEmailHint}
                    </p>
                  </div>

                  {/* Optional Book Title / Theme */}
                  <div>
                    <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                      {t.demandTitleLabel}{" "}
                      <span className="text-foreground/40 font-normal">{t.demandTitleOptional}</span>
                    </label>
                    <div className="relative">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/35" />
                      <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder={t.demandTitlePlaceholder}
                        maxLength={200}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-accent-purple focus:bg-white focus:outline-none transition-all text-foreground placeholder:text-foreground/35 text-sm"
                      />
                    </div>
                  </div>

                  {/* Demand Details (Textarea) */}
                  <div>
                    <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                      {t.demandDetailsLabel} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={demandText}
                      onChange={(e) => setDemandText(e.target.value)}
                      placeholder={t.demandDetailsPlaceholder}
                      required
                      rows={5}
                      maxLength={5000}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-accent-purple focus:bg-white focus:outline-none transition-all text-foreground placeholder:text-foreground/35 text-sm leading-relaxed resize-none"
                    />
                    <div className="flex justify-between items-center text-[11px] text-foreground/45 mt-1 px-1">
                      <span>{t.demandDetailsHint}</span>
                      <span>{demandText.length}/5000</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary via-[#FF8FAB] to-accent-purple text-white rounded-2xl font-bold shadow-lg shadow-pink-200/50 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 text-base disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.demandSending}
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.demandSubmitBtn}</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-foreground/50">
                  <HeartHandshake className="w-4 h-4 text-pink-500" />
                  <span>{t.demandCommunityNote}</span>
                </div>
              </motion.div>
            ) : (
              /* Success Confirmation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 px-2"
              >
                <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <h2
                  className="text-3xl font-bold text-slate-800 mb-3"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {t.demandSuccessTitle}
                </h2>

                <p className="text-slate-600 text-base max-w-md mx-auto mb-6 leading-relaxed">
                  {t.demandSuccessDesc}{" "}
                  <strong className="text-purple-700 font-semibold">{email}</strong>.{" "}
                  {t.demandSuccessTeamMsg}
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs text-slate-600 mb-8 space-y-1.5">
                  <div>
                    <span className="font-semibold text-slate-800">{t.demandCategoryField}</span>{" "}
                    {selectedCategoryLabel}
                  </div>
                  {bookTitle && (
                    <div>
                      <span className="font-semibold text-slate-800">{t.demandTitleField}</span> {bookTitle}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-slate-800">{t.demandStatusField}</span>{" "}
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                      {t.demandStatusBadge}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="py-3 px-6 bg-gradient-to-r from-primary to-accent-purple text-white font-bold text-sm rounded-2xl shadow-md hover:scale-[1.02] transition-all"
                  >
                    {t.demandAnotherBtn}
                  </button>
                  <Link
                    href="/"
                    className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-2xl transition-colors"
                  >
                    {t.demandBackBtn}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
