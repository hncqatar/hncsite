import React from "react";
import { motion, useTransform } from "framer-motion";
import { Sparkles, Trophy, ShieldAlert, Award } from "lucide-react";

export default function ProductTextOverlays({ product, scrollYProgress }) {
  // Section 1: 0.0 - 0.22 (Peak at 0.05 - 0.15)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.04, 0.16, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.04, 0.16, 0.22], [80, 0, 0, -80]);

  // Section 2: 0.22 - 0.45 (Peak at 0.28 - 0.38) - Left-aligned text
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.27, 0.39, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.27, 0.39, 0.45], [60, 0, 0, -60]);

  // Section 3: 0.45 - 0.68 (Peak at 0.51 - 0.61) - Right-aligned text
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.5, 0.62, 0.68], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.5, 0.62, 0.68], [60, 0, 0, -60]);

  // Section 4: 0.68 - 0.95 (Peak at 0.74 - 0.88) - Center-aligned raw facts
  const opacity4 = useTransform(scrollYProgress, [0.68, 0.73, 0.89, 0.95], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.68, 0.73, 0.89, 0.95], [60, 0, 0, -60]);

  // Dynamic values based on active product colors
  const themeColor = product.themeColor;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
      {/* SECTION 1: Intro Hero */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-white/80 uppercase">
            Juice of the Year
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none text-white px-4">
          {product.section1.title.split(" ").map((word, i) => (
            <span
              key={i}
              className={i === 0 ? "text-white" : "text-gradient-mango block md:inline ml-0 md:ml-3"}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-medium text-white/60 tracking-wider">
          {product.section1.subtitle}
        </p>

        {/* Stats strip for Section 1 */}
        <div className="mt-12 flex gap-8 md:gap-16">
          {product.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-extrabold text-white">{stat.val}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SECTION 2: Ingredient Burst (Left-aligned) */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 md:px-20 max-w-4xl"
      >
        <div className="flex flex-col gap-6 text-left">
          <div className="flex items-center gap-2 text-rose-500 font-extrabold text-sm uppercase tracking-widest">
            <Trophy className="w-5 h-5" />
            <span>Premium Cultivation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            {product.section2.title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg font-medium">
            {product.section2.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {product.features.map((feat, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-white/80"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: Refreshment Boost (Right-aligned) */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 md:px-20"
      >
        <div className="flex flex-col gap-6 text-right items-end max-w-2xl">
          <div className="flex items-center gap-2 text-orange-400 font-extrabold text-sm uppercase tracking-widest">
            <Award className="w-5 h-5" />
            <span>Quality Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            {product.section3.title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg font-medium">
            {product.section3.subtitle}
          </p>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 max-w-md text-left mt-4 backdrop-blur-md">
            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-500/20 text-rose-500 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Zero Preservatives Added
                </h4>
                <p className="text-xs text-white/40 mt-1 leading-relaxed">
                  We use High Pressure Processing (HPP) which neutralizes pathogens using hyperbaric pressure instead of flavor-killing high heat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: Pure Fruit (Center-aligned) */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="relative p-6 sm:p-10 md:p-12 rounded-3xl luxury-card max-w-3xl border border-white/10 backdrop-blur-lg">
          <span className="text-rose-500 text-xs font-black tracking-[0.3em] uppercase mb-4 block">
            The Golden Promise
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Made from 100% fruit, never from concentrate.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
            No synthetic sweeteners, no coloring agents, no chemical water dilution. Every bottle represents absolute premium honesty inside and out.
          </p>

          {/* Premium Logo seal inside overlay */}
          <div className="mt-8 flex justify-center items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
              <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="text-left">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider leading-none">
                HOTNCOOL GROUP
              </h5>
              <span className="text-[10px] text-white/30 tracking-widest font-semibold uppercase leading-none mt-1 block">
                Since 1991 • gcc & india
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
