import React from "react";
import { motion, useTransform } from "framer-motion";
import { Sparkles, Trophy, ShieldAlert, Award } from "lucide-react";

export default function ProductTextOverlays({ product, scrollYProgress }) {
  // Section 1: Visible instantly at load, fades out between 0.16 and 0.22 scroll depth
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.16, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.16, 0.22], [0, 0, -80]);

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

  const getTitleGradient = (id) => {
    if (id === "mango") {
      return "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)";
    } else if (id === "banana") {
      return "linear-gradient(135deg, #ffff80 0%, #FFF176 100%)";
    } else {
      // strawberry
      return "linear-gradient(135deg, #ff9999 0%, #E57373 100%)";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0, rotate: 4 },
    visible: {
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
      {/* SECTION 1: Intro Hero */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 md:pt-32"
      >
        {/* Animated Badge */}
        <motion.div 
          key={`badge-${product.id}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/80 uppercase">
            Juice of the Year
          </span>
        </motion.div>

        {/* Modern Style Motion Title */}
        <motion.h1 
          key={`title-${product.id}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none text-white px-2 sm:px-4 uppercase flex flex-wrap justify-center text-center"
        >
          {product.section1.title.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1 sm:py-2">
              <motion.span
                variants={wordVariants}
                className="inline-block origin-left"
                style={{
                  background: i === 0 
                    ? "none" 
                    : getTitleGradient(product.id),
                  WebkitBackgroundClip: i === 0 ? "initial" : "text",
                  WebkitTextFillColor: i === 0 ? "initial" : "transparent",
                  color: i === 0 ? "#ffffff" : "transparent"
                }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle with motion */}
        <motion.p 
          key={`sub-${product.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl font-medium text-white/60 tracking-wider max-w-md sm:max-w-none"
        >
          {product.section1.subtitle}
        </motion.p>

        {/* Stats strip with stagger-in motion */}
        <motion.div 
          key={`stats-${product.id}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.55
              }
            }
          }}
          className="mt-8 md:mt-12 flex gap-6 sm:gap-10 md:gap-16"
        >
          {product.stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { y: 15, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{stat.val}</span>
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-white/40 mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* SECTION 2: Ingredient Burst (Responsive layout: Centered Glass on Mobile, Left-aligned on Desktop) */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-center md:justify-start px-4 sm:px-12 md:px-20"
      >
        <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left items-center md:items-start max-w-md sm:max-w-lg md:max-w-2xl p-6 sm:p-8 md:p-0 rounded-3xl bg-[#050B1F]/65 md:bg-transparent border border-white/10 md:border-transparent backdrop-blur-xl md:backdrop-blur-none shadow-[0_20px_50px_rgba(5,11,31,0.7)] md:shadow-none pointer-events-auto md:pointer-events-none">
          <div className="flex items-center gap-2 text-rose-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Premium Cultivation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase">
            {product.section2.title}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-medium">
            {product.section2.subtitle}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mt-2">
            {product.features.map((feat, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-white/80"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: Refreshment Boost (Responsive layout: Centered Glass on Mobile, Right-aligned on Desktop) */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-center md:justify-end px-4 sm:px-12 md:px-20"
      >
        <div className="flex flex-col gap-4 md:gap-6 text-center md:text-right items-center md:items-end max-w-md sm:max-w-lg md:max-w-2xl p-6 sm:p-8 md:p-0 rounded-3xl bg-[#050B1F]/65 md:bg-transparent border border-white/10 md:border-transparent backdrop-blur-xl md:backdrop-blur-none shadow-[0_20px_50px_rgba(5,11,31,0.7)] md:shadow-none pointer-events-auto md:pointer-events-none">
          <div className="flex items-center gap-2 text-orange-400 font-extrabold text-xs sm:text-sm uppercase tracking-widest">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Quality Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase">
            {product.section3.title}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-medium">
            {product.section3.subtitle}
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5 max-w-md text-left mt-2 md:mt-4 backdrop-blur-md">
            <div className="flex gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-rose-500/20 text-rose-500 shrink-0">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Zero Preservatives Added
                </h4>
                <p className="text-[10px] sm:text-xs text-white/40 mt-1 leading-relaxed">
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
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="relative p-6 sm:p-10 md:p-12 rounded-3xl luxury-card max-w-3xl border border-white/10 backdrop-blur-lg">
          <span className="text-rose-500 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-3 sm:mb-4 block">
            The Golden Promise
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase">
            Made from 100% fruit, never from concentrate.
          </h2>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed font-semibold">
            No synthetic sweeteners, no coloring agents, no chemical water dilution. Every bottle represents absolute premium honesty inside and out.
          </p>

          {/* Premium Logo seal inside overlay */}
          <div className="mt-6 sm:mt-8 flex justify-center items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="text-left">
              <h5 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider leading-none">
                HOTNCOOL GROUP
              </h5>
              <span className="text-[8px] sm:text-[10px] text-white/30 tracking-widest font-semibold uppercase leading-none mt-1 block">
                Since 1991 • gcc & india
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
