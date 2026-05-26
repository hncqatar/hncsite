import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Award, Utensils } from "lucide-react";

/* ─────────────────────── CONSTANTS ─────────────────────── */

const EXPO = [0.16, 1, 0.3, 1];

const STATS = [
  { num: "33", sup: "+",  label: "Years of Legacy" },
  { num: "24", sup: "/7", label: "Always Open"     },
  { num: "50", sup: "+",  label: "Menu Items"      },
  { num: "1",  sup: "st", label: "In Qatar"        },
];

const PILLARS = [
  {
    Icon:  ShieldCheck,
    title: "Premium Quality",
    body:  "Sourced fresh daily. Every dish held to the same exacting standard across every location.",
    accent: "#EF233C",
  },
  {
    Icon:  Award,
    title: "Legacy Taste",
    body:  "Three decades of perfected recipes — unchanged because our regulars won't allow it.",
    accent: "#F7B731",
  },
  {
    Icon:  Utensils,
    title: "Wide Menu",
    body:  "Grills, biryani, pizza, juices. One kitchen built for every craving, every hour.",
    accent: "#EF233C",
  },
];

const TICKER_ITEMS = [
  "Est. 1991",
  "Doha · Qatar",
  "Authentic Taste",
  "Modern Delivery",
  "Open 24 / 7",
  "Fresh Ingredients",
  "33 Years Strong",
  "Trusted by Thousands",
];

/* ─────────────────────── TICKER ─────────────────────── */

function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-3">
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex min-w-max"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 pr-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 sm:text-[11px]"
          >
            {item}
            <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-brand-red/50" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────── STAT BLOCK ─────────────────────── */

function StatBlock({ num, sup, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EXPO, delay }}
      className="group relative"
    >
      {/* Hover underline accent */}
      <div className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-red to-brand-gold transition-all duration-500 group-hover:w-full" />

      <p className="font-display text-[2.25rem] font-black leading-none tracking-tight text-white sm:text-[2.75rem] lg:text-[3.25rem]">
        {num}
        <sup className="text-[0.38em] font-black text-brand-red">{sup}</sup>
      </p>
      <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35 sm:text-[10px]">
        {label}
      </p>
    </motion.div>
  );
}

/* ─────────────────────── PILLAR ROW ─────────────────────── */

function PillarRow({ Icon, title, body, accent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.65, ease: EXPO, delay: index * 0.1 }}
      className="group relative flex gap-5 py-5 sm:gap-6 sm:py-6"
    >
      {/* Animated left accent */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EXPO, delay: 0.2 + index * 0.1 }}
        className="absolute left-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-brand-red/80 to-brand-red/10"
      />

      {/* Icon */}
      <div className="shrink-0 pl-5 sm:pl-6">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm transition-all duration-300 group-hover:border-brand-red/30 group-hover:bg-brand-red/10 sm:h-11 sm:w-11 sm:rounded-[14px]"
        >
          <Icon size={16} className="text-brand-red transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
        </div>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 pr-3">
        <h3 className="mb-2 font-display text-[12px] font-extrabold uppercase tracking-[0.22em] text-white/90 transition-colors duration-200 group-hover:text-white sm:text-[13px]">
          {title}
        </h3>
        <p className="text-[12.5px] leading-[1.75] text-white/38 transition-colors duration-300 group-hover:text-white/58 sm:text-[13.5px]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════ MAIN SECTION ══════════════════════ */

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const imgInView  = useInView(imgRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax helpers */
  const imgY      = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const bgBlobY   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleY    = useTransform(scrollYProgress, [0, 0.6], ["0%", "-4%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#060C20]"
    >
      {/* ── Ambient glows ── */}
      <motion.div
        aria-hidden
        style={{ y: bgBlobY }}
        className="pointer-events-none absolute -right-48 top-0 h-[600px] w-[600px] rounded-full bg-brand-red/[0.07] blur-[130px]"
      />
      <motion.div
        aria-hidden
        style={{ y: bgBlobY }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-gold/[0.05] blur-[110px]"
      />

      {/* Subtle noise texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Main body ── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32 xl:px-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EXPO }}
          className="mb-10 flex items-center gap-3 sm:mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-5 bg-brand-red sm:w-7" />
            <span className="h-[2px] w-2 bg-brand-red/40" />
          </div>
          <span className="font-display text-[10px] font-black uppercase tracking-[0.32em] text-brand-red sm:text-[11px]">
            About HOTNCOOL
          </span>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col">

            {/* Headline with parallax */}
            <motion.div style={{ y: titleY }}>
              <motion.h2
                initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EXPO, delay: 0.05 }}
                className="font-display text-[clamp(2.6rem,7vw,4.5rem)] font-black leading-[0.94] tracking-[-0.03em] text-white"
              >
                Quality,
                <br />
                <span className="relative inline-block">
                  innovation
                  {/* Underline flourish */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EXPO, delay: 0.5 }}
                    className="absolute -bottom-1 left-0 block h-[3px] w-full origin-left bg-gradient-to-r from-brand-red/60 to-transparent"
                  />
                </span>
                <br />
                &amp;{" "}
                <span className="bg-gradient-to-r from-brand-gold via-brand-red to-brand-red bg-clip-text text-transparent">
                  authenticity.
                </span>
              </motion.h2>
            </motion.div>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EXPO, delay: 0.16 }}
              className="mt-7 max-w-md text-[14px] leading-[1.85] text-white/42 sm:mt-8 sm:text-[15px]"
            >
              We combine legacy recipes, fresh ingredients, fast service, and
              technology-enabled operations to serve customers across Qatar with
              consistent taste and reliable delivery — since 1991.
            </motion.p>

            {/* CTA */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EXPO, delay: 0.26 }}
              href="#menu"
              className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-brand-red/25 bg-brand-red/[0.08] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-brand-red transition-all duration-300 hover:border-brand-red/60 hover:bg-brand-red/15 hover:gap-3.5 sm:text-[12px]"
            >
              Explore the menu
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:mt-14 sm:grid-cols-4 sm:gap-x-0 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label} className="relative">
                  {/* Divider — hide on first col */}
                  {i % 2 !== 0 && (
                    <div className="absolute -left-4 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/[0.07] sm:block" />
                  )}
                  <StatBlock {...s} delay={0.3 + i * 0.08} />
                </div>
              ))}
            </div>

            {/* Decorative rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.6 }}
              className="mt-12 h-px origin-left bg-gradient-to-r from-white/10 via-brand-red/20 to-transparent lg:mt-16"
            />
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-0">

            {/* ── Image card ── */}
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              animate={imgInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EXPO }}
              className="relative overflow-hidden rounded-2xl sm:rounded-[22px]"
              style={{ height: "clamp(230px, 42vw, 380px)" }}
            >
              {/* Parallax image */}
              <motion.img
                src="/images/restaurant/restaurant.jpg"
                alt="HOTNCOOL restaurant interior"
                loading="lazy"
                style={{ y: imgY }}
                className="h-[118%] w-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060C20]/70 via-transparent to-black/20" />

              {/* Corner grain */}
              <div className="absolute inset-0 mix-blend-overlay opacity-30"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundSize: "180px 180px",
                }}
              />

              {/* Live badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/55 px-3.5 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-70" />
                  <span className="relative h-2 w-2 rounded-full bg-brand-red" />
                </span>
                <span className="font-display text-[9px] font-black uppercase tracking-[0.28em] text-white/75 sm:text-[10px]">
                  Est. 1991 · Doha
                </span>
              </div>

              {/* Bottom caption strip */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Our flagship kitchen
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Pillars ── */}
            <div className="mt-2 divide-y divide-white/[0.05]">
              {PILLARS.map((p, i) => (
                <PillarRow key={p.title} {...p} index={i} />
              ))}
            </div>

            {/* ── Trust micro-strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO, delay: 0.4 }}
              className="mt-6 flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 sm:gap-5"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {["#EF233C", "#F7B731", "#ffffff22", "#EF233C88"].map((c, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-[#060C20]"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${c}, ${c}66)` }}
                  />
                ))}
              </div>
              <div>
                <p className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-white/80">
                  Trusted by thousands
                </p>
                <p className="mt-0.5 text-[11px] text-white/32">
                  of loyal customers across Qatar
                </p>
              </div>
              <div className="ml-auto shrink-0 rounded-full bg-brand-red/10 px-3 py-1.5">
                <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-red">
                  ★ 4.9
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}