import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

import {
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Bike,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const SLIDES = [
  {
    id: 1,
    image: "/images/food/grills.png",
    tag: "Chef Special",
    title: "Flame Grilled\nFavorites",
  },

  {
    id: 2,
    image: "/images/food/biryani.png",
    tag: "Signature Taste",
    title: "Authentic Dum\nBiryani",
  },

  {
    id: 3,
    image: "/images/food/drinks.png",
    tag: "Fresh & Cool",
    title: "Juices &\nMojitos",
  },

  {
    id: 4,
    image: "/images/food/pizza.png",
    tag: "Family Favourite",
    title: "Pizza &\nPasta",
  },

  {
    id: 5,
    image: "/images/food/burgers.png",
    tag: "Street Favorite",
    title: "Burgers &\nSandwiches",
  },
];

const STATS = [
  {
    icon: Star,
    label: "Since",
    value: "1991",
  },

  {
    icon: Clock,
    label: "Service",
    value: "24/7",
  },

  {
    icon: Bike,
    label: "Delivery",
    value: "Fast",
  },
];

/* ─────────────────────── EASE ───────────────────────────── */

const EXPO = [0.22, 1, 0.36, 1];

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);

  const intervalRef = useRef(null);

  /* ───────────────── AUTO SLIDE ───────────────── */

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setDir(1);

      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();

    return () => clearInterval(intervalRef.current);
  }, [paused, startTimer]);

  /* ───────────────── NAVIGATION ───────────────── */

  const go = (index) => {
    clearInterval(intervalRef.current);

    setDir(index > active ? 1 : -1);

    setActive(index);

    if (!paused) startTimer();
  };

  const prev = () =>
    go((active - 1 + SLIDES.length) % SLIDES.length);

  const next = () =>
    go((active + 1) % SLIDES.length);

  const slide = SLIDES[active];

  /* ───────────────── CURSOR GLOW ───────────────── */

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const glowX = useSpring(
    useTransform(mx, [0, 1], ["-15%", "15%"]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const glowY = useSpring(
    useTransform(my, [0, 1], ["-10%", "10%"]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mx.set((e.clientX - rect.left) / rect.width);

    my.set((e.clientY - rect.top) / rect.height);
  };

  /* ───────────────── IMAGE ANIMATION ───────────────── */

  const imgVariants = {
    enter: (d) => ({
      opacity: 0,
      scale: 1.12,
      x: d > 0 ? 120 : -120,
    }),

    center: {
      opacity: 1,
      scale: 1,
      x: 0,

      transition: {
        duration: 1,
        ease: EXPO,
      },
    },

    exit: (d) => ({
      opacity: 0,
      scale: 1.05,
      x: d > 0 ? -100 : 100,

      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    }),
  };

  /* ───────────────── TEXT ANIMATION ───────────────── */

  const captionVariants = {
    enter: {
      opacity: 0,
      y: 30,
    },

    center: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        ease: EXPO,
        delay: 0.2,
      },
    },

    exit: {
      opacity: 0,
      y: -20,

      transition: {
        duration: 0.3,
      },
    },
  };

  /* ═══════════════════════════ JSX ═══════════════════════════ */

  return (
    <section
      id="home"
      onPointerMove={onMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative min-h-screen overflow-hidden bg-[#050B1F]"
    >
      {/* ═════════════ BACKGROUND IMAGES ═════════════ */}

      <div className="absolute inset-0">

        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={slide.id}
            src={slide.image}
            alt=""
            custom={dir}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full object-cover motion-gpu"
          />
        </AnimatePresence>

        {/* overlays */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#050B1F] via-[#050B1F]/70 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/90 via-transparent to-[#050B1F]/40" />

        {/* cursor glow */}

        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          className="pointer-events-none absolute left-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#EF233C]/20 blur-[140px]"
        />
      </div>

      {/* ═════════════ TOP PROGRESS BAR ═════════════ */}

      {!paused && (
        <motion.div
          key={active}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 4.5,
            ease: "linear",
          }}
          className="absolute top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[#EF233C]"
        />
      )}

      {/* ═════════════ MAIN CONTENT ═════════════ */}

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* ═════════ LEFT CONTENT ═════════ */}

        <div>

          {/* top tag */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#EF233C]" />

            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#EF233C]">
              Est. 1991 · Doha Qatar
            </span>
          </motion.div>

          {/* title */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.1,
              duration: 0.9,
              ease: EXPO,
            }}
            className="font-display text-[clamp(3rem,7vw,6rem)] font-black leading-[0.92] tracking-tight text-white"
          >
            Traditional
            <br />

            <span className="bg-gradient-to-r from-[#FFB74D] via-[#EF233C] to-white bg-clip-text text-transparent">
              flavors.
            </span>

            <br />

            Modern
            <br />

            experience.
          </motion.h1>

          {/* description */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="mt-7 max-w-md text-[15px] leading-[1.8] text-white/60"
          >
            Authentic traditional flavours paired with modern dining and
            lightning-fast 24×7 delivery — serving Doha since 1991.
          </motion.p>

          {/* buttons */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-2xl bg-[#EF233C] px-6 py-4 text-[13px] font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#c91f36]"
            >
              Explore Menu

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#locations"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 text-[13px] font-extrabold uppercase tracking-widest text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:text-white"
            >
              <MapPin size={16} />

              Find Branch
            </a>
          </motion.div>

          {/* stats */}

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5,
                },
              },
            }}
            className="mt-10 flex gap-px overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            {STATS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },

                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                className={`flex flex-1 flex-col items-center gap-1 bg-white/[0.04] px-4 py-4 backdrop-blur-xl ${
                  i < STATS.length - 1
                    ? "border-r border-white/[0.08]"
                    : ""
                }`}
              >
                <Icon
                  size={18}
                  className="text-[#EF233C]"
                />

                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                  {label}
                </span>

                <span className="text-lg font-black text-white">
                  {value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ═════════ RIGHT CARD ═════════ */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.93,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.3,
            duration: 1,
            ease: EXPO,
          }}
          className="relative flex flex-col items-center"
        >
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">

            <div className="relative h-[540px] bg-black">

              <AnimatePresence initial={false} custom={dir}>
                <motion.img
                  key={slide.id + "-card"}
                  src={slide.image}
                  alt={slide.title}
                  custom={dir}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 h-full w-full object-cover motion-gpu"
                />
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050B1F] via-[#050B1F]/50 to-transparent" />

              {/* caption */}

              <div className="absolute inset-x-0 bottom-0 p-7">

                <AnimatePresence mode="wait">

                  <motion.div
                    key={slide.id + "-caption"}
                    variants={captionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB74D]">
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

          {/* controls */}

          <div className="mt-5 flex w-full max-w-[460px] items-center justify-between px-1">

            {/* dots */}

            <div className="flex items-center gap-1.5">

              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? "h-2 w-8 bg-[#EF233C]"
                      : "h-2 w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* buttons */}

            <div className="flex gap-2">

              <button
                onClick={prev}
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.12] hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.12] hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═════════ MOBILE DOTS ═════════ */}

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 lg:hidden">

        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              active === i
                ? "h-2 w-7 bg-[#EF233C]"
                : "h-2 w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}