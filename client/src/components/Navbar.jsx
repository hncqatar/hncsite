import { useEffect, useState } from "react";
import { Menu, X, Sparkles, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#050B1F]/95 py-2 shadow-2xl backdrop-blur-xl"
          : "bg-transparent py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          onClick={() => goTo("#home")}
          className="group flex min-w-0 items-center gap-3 sm:gap-4"
        >
          {/* Logo */}
          <motion.div
            animate={{ y: [0, -2.5, 0] }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-visible bg-transparent sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
          >
            <div className="absolute inset-0 rounded-full bg-brand-red/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

            <img
              src="/images/logo/logo.png"
              alt="HOTNCOOL"
              className="relative z-10 h-full w-full scale-[1.4] object-contain drop-shadow-[0_10px_30px_rgba(239,35,60,0.4)] transition duration-500 group-hover:scale-[1.52]"
            />
          </motion.div>

          {/* Text */}
          <span className="flex min-w-0 flex-col items-start justify-center gap-[3px]">
            <span className="block whitespace-nowrap text-[12px] font-bold leading-none tracking-[0.08em] text-white/90 sm:text-sm md:text-base lg:text-lg">
              الحـــــــــار والبــــــارد
            </span>

            <span className="block whitespace-nowrap text-[12px] font-black leading-none tracking-[0.12em] text-white sm:text-sm md:text-base lg:text-lg">
              HOTNCOOL
            </span>
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item.href)}
              className="rounded-full px-4 py-2.5 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white 2xl:px-5"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 xl:flex">
          <motion.a
            href="https://hotncool.qa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_15px_40px_rgba(239,35,60,0.35)] transition hover:bg-red-600 2xl:px-6"
          >
            <ShoppingBag size={15} />
            Order Now
          </motion.a>

          <motion.button
            onClick={() => goTo("#contact")}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-wider text-white backdrop-blur-xl transition hover:bg-white/10 2xl:px-6"
          >
            <Sparkles size={16} />
            Enquire
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen((value) => !value)}
          className="ml-auto rounded-full border border-white/10 bg-white/5 p-3 text-white backdrop-blur-xl xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-3 rounded-3xl border border-white/10 bg-[#050B1F]/95 p-3 shadow-2xl backdrop-blur-2xl xl:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => goTo(item.href)}
                className="block w-full rounded-2xl px-4 py-4 text-left text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}

            <a
              href="https://hotncool.qa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red px-4 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:scale-[1.02] hover:bg-red-600"
            >
              <ShoppingBag size={16} />
              Order Now
            </a>

            <button
              onClick={() => goTo("#contact")}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-black uppercase tracking-wider text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              <Sparkles size={16} />
              Enquire
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}