import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Award, Utensils } from "lucide-react";


/* ─────────────────────────── CONSTANTS ────────────────────────── */

const EXPO = [0.16, 1, 0.3, 1];

const STATS = [
  { num: "33",  sup: "+",  label: "Years"      },
  { num: "24",  sup: "/7", label: "Service"    },
  { num: "50",  sup: "+",  label: "Menu items" },
  { num: "1",   sup: "st", label: "In Qatar"   },
];

const PILLARS = [
  {
    Icon:  ShieldCheck,
    title: "Premium Quality",
    body:  "Sourced fresh daily. Every dish held to the same exacting standard across every location.",
  },
  {
    Icon:  Award,
    title: "Legacy Taste",
    body:  "Three decades of perfected recipes — unchanged because our regulars won't allow it.",
  },
  {
    Icon:  Utensils,
    title: "Wide Menu",
    body:  "Grills, biryani, pizza, juices. One kitchen built for every craving, every hour.",
  },
];

const TICKER_ITEMS = [
  "Est. 1991",
  "Doha · Qatar",
  "Authentic Taste",
  "Modern Delivery",
  "Open 24 / 7",
  "Fresh Ingredients",
];

/* ─────────────────────────── SUB-COMPONENTS ──────────────────── */

function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] py-2.5 sm:py-3">
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex min-w-max"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 pr-4 text-[10px] font-black uppercase tracking-[0.25em] text-white/25 sm:gap-5 sm:pr-5 sm:text-[11px] sm:tracking-[0.3em]"
          >
            {item}
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-red/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StatBlock({ num, sup, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: EXPO, delay }}
      className="flex flex-col border-l border-white/[0.08] pl-4 first:border-l-0 first:pl-0 sm:pl-6"
    >
      <p className="text-[1.75rem] font-black leading-none tracking-tight text-white sm:text-[2.25rem] lg:text-[clamp(2rem,3.5vw,3rem)]">
        {num}
        <sup className="text-[0.42em] text-brand-red">{sup}</sup>
      </p>
      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 sm:text-[10px]">
        {label}
      </p>
    </motion.div>
  );
}

function PillarRow({ Icon, title, body, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, ease: EXPO, delay: index * 0.1 }}
      className="group relative flex items-start gap-4 py-5 sm:gap-5 sm:py-6"
    >
      {/* Hover accent line */}
      <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-brand-red transition-transform duration-300 group-hover:scale-y-100" />

      <div className="min-w-0 flex-1 pl-4 sm:pl-6">
        <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-red/20 bg-brand-red/10 sm:h-8 sm:w-8">
            <Icon size={13} className="text-brand-red" strokeWidth={2} />
          </div>
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white sm:text-[13px] sm:tracking-[0.2em]">
            {title}
          </h3>
        </div>
        <p className="text-[12px] leading-[1.7] text-white/40 transition-colors group-hover:text-white/60 sm:text-[13px] sm:leading-[1.75]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════ MAIN ═════════════════════════════ */

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const imgInView  = useInView(imgRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#060C20]"
    >
      {/* Ambient glows — sized to not overflow on small screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[8%] h-[400px] w-[400px] rounded-full bg-brand-red/[0.06] blur-[120px] sm:-right-60 sm:h-[600px] sm:w-[600px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[350px] w-[350px] rounded-full bg-brand-gold/[0.04] blur-[100px] sm:h-[500px] sm:w-[500px]"
      />

      {/* Ticker */}
      <Ticker />

      {/* ── MOBILE / TABLET: single column stacked layout ── */}
      {/* ── DESKTOP: two-column split layout ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">

        {/* Section eyebrow — always full width */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EXPO }}
          className="mb-8 flex items-center gap-3 sm:mb-10"
        >
          <span className="h-px w-6 bg-brand-red sm:w-8" />
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-red sm:text-[11px] sm:tracking-[0.3em]">
            About HOTNCOOL
          </span>
        </motion.div>

        {/* ── DESKTOP GRID ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0 xl:grid-cols-[1fr_1px_1fr]">

          {/* ────── LEFT: Headline + copy + stats ────── */}
          <div className="flex flex-col lg:pr-12 xl:pr-16">

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.04 }}
              className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[0.98] tracking-[-0.025em] text-white"
            >
              Quality,
              <br />
              innovation
              <br />
              &amp;{" "}
              <span className="bg-gradient-to-r from-[#FFB74D] via-[#EF233C] to-[#EF233C] bg-clip-text text-transparent">
                authenticity.
              </span>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EXPO, delay: 0.13 }}
              className="mt-5 text-[14px] leading-[1.8] text-white/45 sm:mt-6 sm:max-w-md sm:text-[15px] lg:max-w-sm"
            >
              We combine legacy recipes, fresh ingredients, fast service, and
              technology-enabled operations to serve customers across Qatar with
              consistent taste and reliable delivery.
            </motion.p>

            {/* CTA link */}
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.22 }}
              href="#menu"
              className="group mt-6 inline-flex w-fit items-center gap-2 border-b border-brand-red/40 pb-0.5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-brand-red transition-all hover:border-brand-red hover:gap-3 sm:text-[13px] sm:tracking-[0.2em]"
            >
              Explore the menu
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>

            {/* Stats — 2×2 on mobile, row on sm+ */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-6 lg:mt-14">
              {STATS.map((s, i) => (
                <StatBlock key={s.label} {...s} delay={0.28 + i * 0.07} />
              ))}
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          <div className="hidden w-px bg-white/[0.06] lg:block" />

          {/* ────── RIGHT: Image + pillars ────── */}
          <div className="flex flex-col lg:pl-12 xl:pl-16">

            {/* Image with parallax */}
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={imgInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.95, ease: EXPO }}
              className="relative overflow-hidden rounded-2xl sm:rounded-[1.5rem] lg:rounded-[1.75rem]"
              style={{ height: "clamp(220px, 45vw, 360px)" }}
            >
              <motion.img
                src="/images/restaurant/restaurant.jpg"
                alt="HOTNCOOL restaurant interior"
                loading="lazy"
                style={{ y: imgY }}
                className="h-[115%] w-full object-cover"
              />

              {/* Badge */}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md sm:left-4 sm:top-4 sm:px-3.5">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-brand-red sm:h-2 sm:w-2" />
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/70 sm:text-[10px]">
                  Est. 1991 · Doha
                </span>
              </div>

              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#060C20] to-transparent" />
            </motion.div>

            {/* Divider */}
            <div className="my-6 h-px bg-white/[0.06] sm:my-8" />

            {/* Pillars */}
            <div className="divide-y divide-white/[0.05]">
              {PILLARS.map((p, i) => (
                <PillarRow key={p.title} {...p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}