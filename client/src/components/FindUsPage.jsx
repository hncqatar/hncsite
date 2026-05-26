import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Search, ChevronDown, ChevronUp, Navigation } from "lucide-react";
import { branches } from "../data/branches";

const INITIAL_VISIBLE_COUNT = 3;

export default function LocationsSection() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return branches;
    return branches.filter((b) =>
      [b.name, b.address, b.type, b.timing].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const visibleBranches = useMemo(() => {
    if (showAll || query.trim()) return filtered;
    return filtered.slice(0, INITIAL_VISIBLE_COUNT);
  }, [filtered, showAll, query]);

  const hasMoreBranches = filtered.length > INITIAL_VISIBLE_COUNT && !query.trim();

  function clearQuery() {
    setQuery("");
    setShowAll(false);
  }

  return (
    <section
      id="locations"
      className="relative overflow-hidden bg-[#060D22] px-4 py-20 sm:px-6 sm:py-28 lg:px-16 lg:py-36"
    >
      {/* ── Background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-24 h-[520px] w-[520px] rounded-full bg-brand-red/[0.18] blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 0.96, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -right-28 bottom-[-80px] h-[440px] w-[440px] rounded-full bg-brand-gold/[0.12] blur-[110px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/[0.09] blur-[110px]"
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container-hnc relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
        >
          <span className="mb-5 inline-block rounded-full border border-brand-red/30 bg-brand-red/[0.08] px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-brand-red">
            Locations
          </span>

          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[62px]">
            Find your nearest
            <span className="brand-gradient block">HOTNCOOL branch</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[520px] text-sm leading-7 text-white/50 sm:text-base">
            Search branches, call directly, open WhatsApp, or get directions via
            Google Maps.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mb-8 max-w-[580px]"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.05] px-5 py-3.5 shadow-xl backdrop-blur-xl transition focus-within:border-brand-red/40 focus-within:ring-2 focus-within:ring-brand-red/10">
            <Search className="shrink-0 text-white/35" size={18} />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowAll(false); }}
              placeholder="Search branch, area or service…"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 sm:text-base"
            />
            {query && (
              <button
                onClick={clearQuery}
                className="shrink-0 text-white/40 transition hover:text-white"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Meta row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="text-sm font-medium text-white/45">
            Showing{" "}
            <span className="font-semibold text-white">{visibleBranches.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-white">{filtered.length}</span>{" "}
            branches
          </p>
          {query && (
            <button
              onClick={clearQuery}
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence>
            {visibleBranches.map((branch, index) => (
              <BranchCard key={branch.id} branch={branch} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {visibleBranches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-16 text-center"
          >
            <p className="font-display text-xl font-bold text-white">
              No branches found
            </p>
            <p className="mt-2 text-sm text-white/45">
              Try a different branch name or area.
            </p>
          </motion.div>
        )}

        {/* Show More */}
        {hasMoreBranches && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              {showAll ? (
                <>View Less <ChevronUp size={16} /></>
              ) : (
                <>View All Branches <ChevronDown size={16} /></>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Branch Card
───────────────────────────────────────── */
function BranchCard({ branch, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0B1430] shadow-2xl transition-[border-color,box-shadow] hover:border-brand-red/30 hover:shadow-[0_32px_64px_rgba(0,0,0,0.45),0_0_0_1px_rgba(239,35,60,0.15)_inset]"
    >
      {/* Hero */}
      <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0E1A3A] to-[#060D22]">
        {/* Radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_110%,rgba(239,35,60,0.35)_0%,transparent_55%),radial-gradient(ellipse_at_-10%_0%,rgba(247,183,49,0.2)_0%,transparent_50%)]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Icon box */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-[22px] border border-white/12 bg-[#060D22]/70 shadow-[0_20px_50px_rgba(239,35,60,0.3)] backdrop-blur-xl"
        >
          <MapPin size={38} className="text-brand-gold" />
        </motion.div>
        {/* Type badge */}
        <span className="absolute left-3.5 top-3.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.12] px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold backdrop-blur-md">
          {branch.type}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-0 p-6">
        <h3 className="font-display text-[22px] font-extrabold leading-snug tracking-tight text-white">
          {branch.name}
        </h3>

        <p className="mt-3 flex gap-2.5 text-[13.5px] leading-relaxed text-white/65">
          <MapPin className="mt-0.5 shrink-0 text-brand-red" size={16} />
          {branch.address}
        </p>

        <span className="mt-3.5 inline-flex items-center gap-1.5 self-start rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/45">
          🕒 {branch.timing}
        </span>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          <a
            href={`tel:${branch.phone}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#060D22] transition hover:scale-105 hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <Phone size={13} />
            Call
          </a>
          <a
            href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.07] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:scale-105 hover:bg-white/[0.14] active:scale-95"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
          <a
            href={branch.map}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-red px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:scale-105 hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,35,60,0.35)] active:scale-95"
          >
            <Navigation size={13} />
            Map
          </a>
        </div>
      </div>
    </motion.article>
  );
}