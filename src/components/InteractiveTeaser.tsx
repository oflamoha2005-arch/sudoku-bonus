"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface HiddenItem {
  id: string;
  emoji: string;
  label: string;
  top: string;
  left: string;
  found: boolean;
}

const initialItems: HiddenItem[] = [
  { id: "star", emoji: "⭐", label: "Star", top: "18%", left: "12%", found: false },
  { id: "butterfly", emoji: "🦋", label: "Butterfly", top: "35%", left: "72%", found: false },
  { id: "key", emoji: "🔑", label: "Key", top: "68%", left: "25%", found: false },
  { id: "heart", emoji: "❤️", label: "Heart", top: "52%", left: "85%", found: false },
  { id: "diamond", emoji: "💎", label: "Diamond", top: "78%", left: "60%", found: false },
  { id: "mushroom", emoji: "🍄", label: "Mushroom", top: "25%", left: "45%", found: false },
];

export default function InteractiveTeaser() {
  const [items, setItems] = useState<HiddenItem[]>(initialItems);
  const [showCelebration, setShowCelebration] = useState(false);

  const foundCount = items.filter((i) => i.found).length;
  const totalCount = items.length;
  const allFound = foundCount === totalCount;

  const handleFind = useCallback(
    (id: string) => {
      setItems((prev) => {
        const updated = prev.map((item) =>
          item.id === id ? { ...item, found: true } : item
        );
        const newFoundCount = updated.filter((i) => i.found).length;
        if (newFoundCount === totalCount) {
          setTimeout(() => setShowCelebration(true), 500);
        }
        return updated;
      });
    },
    [totalCount]
  );

  const handleReset = () => {
    setItems(initialItems);
    setShowCelebration(false);
  };

  return (
    <section id="teaser" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#EDE7FF]/30 to-white" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Can You{" "}
            <span className="text-accent-purple">Find Them</span>? 🔍
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-purple to-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Try our mini hidden-object challenge! Click on the hidden items in
            the scene below. How fast can you find them all?
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative bg-gradient-to-br from-[#E8F5E9] via-[#FFF9C4] to-[#E3F2FD] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
            {/* Game Scene */}
            <div className="relative w-full" style={{ paddingBottom: "60%" }}>
              {/* Decorative scene elements */}
              <div className="absolute inset-0">
                {/* Sky */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#87CEEB] to-[#E3F2FD]" />

                {/* Sun */}
                <div className="absolute top-[8%] right-[15%] w-12 h-12 bg-yellow-300 rounded-full shadow-lg shadow-yellow-200 animate-pulse" />

                {/* Clouds */}
                <div className="absolute top-[10%] left-[20%] w-20 h-8 bg-white rounded-full opacity-80 animate-float-slow" />
                <div className="absolute top-[15%] left-[60%] w-16 h-6 bg-white rounded-full opacity-60 animate-float" />

                {/* Ground/grass */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-b from-[#81C784] to-[#4CAF50]" />

                {/* Trees */}
                <div className="absolute bottom-[30%] left-[5%]">
                  <div className="w-16 h-20 bg-[#2E7D32] rounded-full" />
                  <div className="w-4 h-10 bg-[#5D4037] mx-auto -mt-2" />
                </div>
                <div className="absolute bottom-[35%] right-[8%]">
                  <div className="w-20 h-24 bg-[#388E3C] rounded-full" />
                  <div className="w-5 h-12 bg-[#5D4037] mx-auto -mt-2" />
                </div>

                {/* Flowers */}
                {["15%", "35%", "55%", "75%", "90%"].map((left, i) => (
                  <div
                    key={i}
                    className="absolute text-xl"
                    style={{
                      bottom: `${10 + (i % 3) * 5}%`,
                      left,
                    }}
                  >
                    {["🌸", "🌼", "🌺", "🌻", "🌷"][i]}
                  </div>
                ))}

                {/* House */}
                <div className="absolute bottom-[40%] left-[38%]">
                  <div className="w-20 h-16 bg-[#FFCC80]" />
                  <div
                    className="w-24 h-10 bg-[#E57373] -mt-1 -ml-2"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-[35%] w-6 h-8 bg-[#795548]" />
                  <div className="absolute bottom-[40%] left-[10%] w-5 h-5 bg-[#BBDEFB] border border-[#90CAF9]" />
                </div>
              </div>

              {/* Hidden Items */}
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => !item.found && handleFind(item.id)}
                  className={`absolute z-10 text-2xl sm:text-3xl cursor-pointer transition-all ${
                    item.found
                      ? "opacity-100 scale-125"
                      : "opacity-30 hover:opacity-70 scale-75 hover:scale-100"
                  }`}
                  style={{ top: item.top, left: item.left }}
                  whileHover={!item.found ? { scale: 1.3 } : {}}
                  whileTap={!item.found ? { scale: 0.9 } : {}}
                  aria-label={`Find the ${item.label}`}
                >
                  {item.emoji}
                  {item.found && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
                      className="absolute -inset-2 rounded-full border-2 border-accent-yellow"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Score Bar */}
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  Found:{" "}
                  <span className="text-accent-green">{foundCount}</span>
                  <span className="text-foreground/40">/{totalCount}</span>
                </div>

                {/* Progress bar */}
                <div className="hidden sm:block w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-green to-accent-yellow rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${(foundCount / totalCount) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Item checklist */}
              <div className="flex items-center gap-2">
                {items.map((item) => (
                  <span
                    key={item.id}
                    className={`text-lg transition-all ${
                      item.found ? "opacity-100 grayscale-0" : "opacity-30 grayscale"
                    }`}
                  >
                    {item.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Celebration Modal */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                onClick={() => setShowCelebration(false)}
              >
                <motion.div
                  initial={{ scale: 0.5, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.5, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl p-8 sm:p-10 text-center max-w-md shadow-2xl"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h3
                    className="text-3xl font-bold gradient-text mb-3"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Amazing Job!
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    You found all the hidden objects! You&apos;d love our Hidden
                    Pictures books — they&apos;re packed with even more fun!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/categories/hidden-pictures"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-purple to-primary text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                      See Our Books 📚
                    </a>
                    <button
                      onClick={handleReset}
                      className="flex-1 px-6 py-3 bg-gray-100 text-foreground rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                    >
                      Play Again 🔄
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>
      </div>
    </section>
  );
}
