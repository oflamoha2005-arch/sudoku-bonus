"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assetPath } from "@/utils/paths";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-4 sm:pb-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5E6] via-[#FFEEF0] to-[#EDE7FF]" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-dots" />

      {/* Floating Elements */}
      <FloatingShape
        className="top-24 left-[5%] w-16 h-16"
        color="#FFD93D"
        shape="star"
        delay={0}
      />
      <FloatingShape
        className="top-32 right-[10%] w-12 h-12"
        color="#6EC6FF"
        shape="circle"
        delay={1}
      />
      <FloatingShape
        className="bottom-32 left-[8%] w-14 h-14"
        color="#B388FF"
        shape="square"
        delay={2}
      />
      <FloatingShape
        className="bottom-40 right-[5%] w-10 h-10"
        color="#4ECB71"
        shape="triangle"
        delay={0.5}
      />
      <FloatingShape
        className="top-[50%] left-[15%] w-8 h-8"
        color="#FF6B6B"
        shape="circle"
        delay={1.5}
      />
      <FloatingShape
        className="top-40 left-[40%] w-6 h-6"
        color="#FF9F43"
        shape="star"
        delay={3}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/60 backdrop-blur-sm rounded-full border border-accent-purple/20 mb-3 sm:mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-foreground/70">
                ✨ Meet Oufella — Activity Books for Curious Kids
              </span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.15] mb-3 sm:mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Where Learning Feels Like{" "}
              <span className="gradient-text">Pure Play!</span>{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                🎨
              </motion.span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-foreground/70 leading-relaxed mb-5 sm:mb-6 max-w-xl">
              Welcome to <strong>Oufella</strong>! We craft a vibrant, screen-free world of
              activity books — packed with brain-boosting puzzles, winding mazes, word searches,
              fill-ins, and hidden pictures designed to spark joy and make learning an absolute blast.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/#categories"
                className="group inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-primary to-accent-purple text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all"
              >
                Explore The Collection
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="/#teaser"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-white/70 backdrop-blur-sm text-foreground rounded-full font-bold text-base sm:text-lg border-2 border-accent-yellow/30 hover:border-accent-yellow hover:bg-accent-yellow/10 transition-all"
              >
                Play a Mini Game 🎯
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-8 mt-5 sm:mt-6">
              <Stat number="50+" label="Activity Books" />
              <Stat number="100%" label="Screen-Free Fun" />
              <Stat number="⭐ 5-Star" label="Kid & Parent Loved" />
            </div>
          </motion.div>

          {/* Hero Visual Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 relative mb-4 lg:mb-0 w-full max-w-[480px] lg:max-w-[500px] xl:max-w-[530px] ml-auto z-10"
          >
            {/* Ambient soft pastel glow behind card */}
            <div
              className="absolute -inset-4 bg-gradient-to-tr from-[#FF8FAB]/25 via-[#FFD93D]/20 to-[#B388FF]/25 rounded-[2.5rem] blur-2xl -z-10"
              aria-hidden="true"
            />

            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-accent-purple/20 border-4 border-white/75 bg-gradient-to-br from-[#FFF5E6] via-[#FFEEF0] to-[#EDE7FF]">
              <video
                src={assetPath("/video/Boy_waving_hello_animation.mp4")}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
                className="w-full h-full object-cover object-[82%_center] scale-[1.06] origin-[82%_center] select-none pointer-events-none"
              />

              {/* Animated Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 18,
                  delay: 1.3,
                }}
                className="absolute top-[14%] left-[10%] sm:top-[16%] sm:left-[14%] z-20 select-none pointer-events-none"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="relative px-3.5 py-1.5 sm:px-5 sm:py-2.5 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl shadow-accent-purple/15 border-2 border-accent-yellow flex items-center gap-1.5"
                >
                  <span
                    className="text-xs sm:text-base md:text-lg font-extrabold text-foreground tracking-wide whitespace-nowrap"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Hello Friend!
                  </span>
                  <motion.span
                    className="inline-block text-sm sm:text-xl"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                  >
                    🌼
                  </motion.span>

                  {/* Speech bubble pointer tail directed at the boy */}
                  <div className="absolute -bottom-1.5 right-4 sm:right-6 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white border-r-2 border-b-2 border-accent-yellow rotate-45" />
                </motion.div>
              </motion.div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 px-5 py-3 bg-white rounded-2xl shadow-xl border border-accent-yellow/20"
            >
              <span className="text-sm font-bold text-foreground">
                📚 Available on Amazon
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-4 -right-4 px-4 py-2 bg-accent-yellow rounded-2xl shadow-xl"
            >
              <span className="text-sm font-bold text-[#2D1B4E]">
                ✨ New Releases!
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p
        className="text-2xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        {number}
      </p>
      <p className="text-sm text-foreground/50">{label}</p>
    </div>
  );
}

function FloatingShape({
  className,
  color,
  shape,
  delay,
}: {
  className: string;
  color: string;
  shape: "star" | "circle" | "square" | "triangle";
  delay: number;
}) {
  const shapes = {
    star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    circle: "circle(50%)",
    square: "inset(10% round 20%)",
    triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
  };

  return (
    <motion.div
      className={`absolute ${className} opacity-20`}
      style={{
        backgroundColor: color,
        clipPath: shapes[shape],
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
