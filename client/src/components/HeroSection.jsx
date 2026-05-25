import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, Star, Clock, Bike } from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const SLIDES = [
  {
    id: 1,
    image: "/images/food/grills.png",
    tag: "Chef Special",
    title: "Flame Grilled\nFavorites",
    accent: "#EF233C",
  },
  {
    id: 2,
    image: "/images/food/biryani.png",
    tag: "Signature Taste",
    title: "Authentic Dum\nBiryani",
    accent: "#FFB74D",
  },
  {
    id: 3,
    image: "/images/food/drinks.png",
    tag: "Fresh & Cool",
    title: "Juices &\nMojitos",
    accent: "#4ECDC4",
  },
  {
    id: 4,
    image: "/images/food/pizza.png",
    tag: "Family Favourite",
    title: "Pizza &\nPasta",
  },
];

const STATS = [
  { icon: Star,  label: "Since",    value: "1991" },
  { icon: Clock, label: "Service",  value: "24/7" },
  { icon: Bike,  label: "Delivery", value: "Fast" },
];

/* ─────────────────────── EASE CONSTANTS ───────────────────────────── */

const EXPO = [0.16, 1, 0.3, 1];

/* ═══════════════════════════ MAIN COMPONENT ═══════════════════════════ */

export default function HeroSection() {
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [dir, setDir]           = useState(1); // 1 = forward, -1 = backward
  const intervalRef             = useRef(null);

  /* ── auto-advance ── */
  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setDir(1);
      setActive((p) => (p + 1) % SLIDES.length);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => clearInterval(intervalRef.current);
  }, [paused, startTimer]);

  const go = (idx) => {
    clearInterval(intervalRef.current);
    setDir(idx > active ? 1 : -1);
    setActive(idx);
    if (!paused) startTimer();
  };

  const prev = () => go((active - 1 + SLIDES.length) % SLIDES.length);
  const next = () => go((active + 1) % SLIDES.length);

  const slide = SLIDES[active];

  /* ── parallax cursor glow ── */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mx, [0, 1], ["-15%", "15%"]), { stiffness: 60, damping: 20 });
  const glowY = useSpring(useTransform(my, [0, 1], ["-10%", "10%"]), { stiffness: 60, damping: 20 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top)  / r.height);
  };

  /* ── slide variants ── */
  const imgVariants = {
    enter: (d) => ({ opacity: 0, scale: 1.08, x: d > 0 ? 80 : -80 }),
    center:       { opacity: 1, scale: 1,    x: 0, transition: { duration: 1.1, ease: EXPO } },
    exit:  (d) => ({ opacity: 0, scale: 1.02, x: d > 0 ? -60 : 60, transition: { duration: 0.55, ease: "easeIn" } }),
  };

  const captionVariants = {
    enter:  { opacity: 0, y: 24 },
    center: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: EXPO, delay: 0.2 } },
    exit:   { opacity: 0, y: -16, transition: { duration: 0.3 } },
  };

  /* ─────────────────────────────── JSX ──────────────────────────────── */
  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative min-h-screen overflow-hidden bg-[#060C20]"
    >

      {/* ════════ FULL-BLEED BACKGROUND ════════ */}
      <div className="absolute inset-0">
        {/* Slide images */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={slide.id}
            src={slide.image}
            alt=""
            aria-hidden="true"
            custom={dir}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Layered overlays — left-heavy so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060C20] via-[#060C20]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060C20]/90 via-transparent to-[#060C20]/40" />

        {/* Cursor-tracking glow */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute left-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-brand-red/20 blur-[140px]"
        />
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={active}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute top-0 left-0 right-0 z-50 h-[2px] origin-left bg-brand-red"
        />
      )}

      {/* ════════ MAIN GRID ════════ */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-0 px-4 pt-24 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-28">

        {/* ───── LEFT — COPY ───── */}
        <div className="flex flex-col">

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-brand-red" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-red">
              Est. 1991 · Doha, Qatar
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
            transition={{ delay: 0.1, duration: 0.9, ease: EXPO }}
            className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[0.92] tracking-tight text-white"
          >
            Traditional
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#FFB74D] via-[#EF233C] to-white bg-clip-text text-transparent">
                flavors.
              </span>
            </span>
            <br />
            Modern
            <br />
            experience.
          </motion.h1>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-7 max-w-md text-[15px] leading-[1.75] text-white/55 sm:text-base"
          >
            Authentic traditional flavours paired with modern dining and
            lightning-fast 24×7 delivery — serving Doha since 1991.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand-red px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#C81D33] hover:shadow-[0_12px_32px_rgba(239,35,60,0.4)]"
            >
              Explore Menu
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#locations"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:text-white"
            >
              <MapPin size={16} />
              Find Branch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
            }}
            className="mt-10 flex gap-px overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            {STATS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: EXPO } },
                }}
                className={[
                  "flex flex-1 flex-col items-center gap-1 px-4 py-4 backdrop-blur-xl transition-colors hover:bg-white/[0.05]",
                  "bg-white/[0.04]",
                  i < STATS.length - 1 ? "border-r border-white/[0.08]" : "",
                ].join(" ")}
              >
                <Icon size={18} className="text-brand-red" strokeWidth={2.5} />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">{label}</span>
                <span className="text-lg font-black text-white">{value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ───── RIGHT — SLIDE CARD ───── */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.93 }}
          animate={{ opacity: 1, x: 0,  scale: 1    }}
          transition={{ delay: 0.3, duration: 1.0, ease: EXPO }}
          className="relative hidden lg:flex lg:flex-col lg:items-center"
        >
          {/* Card */}
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">

            {/* Slide image */}
            <div className="relative h-[540px] bg-black">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={slide.id + "-card"}
                  src={slide.image}
                  alt={slide.title}
                  custom={dir}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#060C20] via-[#060C20]/50 to-transparent" />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id + "-caption"}
                    variants={captionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
                      {slide.tag}
                    </p>
                    <h3 className="whitespace-pre-line text-[2rem] font-black leading-[1.05] text-white">
                      {slide.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controls row — sits below the card */}
          <div className="mt-5 flex w-full max-w-[460px] items-center justify-between px-1">

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => go(i)}
                  className={[
                    "rounded-full transition-all duration-300",
                    active === i
                      ? "h-2 w-8 bg-brand-red"
                      : "h-2 w-2 bg-white/25 hover:bg-white/50",
                  ].join(" ")}
                  aria-label={`Slide ${i + 1}: ${s.title.replace("\n", " ")}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              {[["Previous", prev, ChevronLeft], ["Next", next, ChevronRight]].map(
                ([label, handler, Icon]) => (
                  <button
                    key={label}
                    onClick={handler}
                    aria-label={`${label} slide`}
                    className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.12] hover:text-white"
                  >
                    <Icon size={18} />
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════ MOBILE DOT INDICATORS ════════ */}
      <div
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 lg:hidden"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => go(i)}
            className={[
              "rounded-full transition-all duration-300",
              active === i ? "h-2 w-7 bg-brand-red" : "h-2 w-2 bg-white/30",
            ].join(" ")}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}