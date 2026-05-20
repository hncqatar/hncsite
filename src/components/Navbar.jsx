import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isOpen
            ? "py-4 bg-[#050B1F]/80 border-b border-white/5 backdrop-blur-xl shadow-lg"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Branding Logo */}
          <a href="#" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              {/* Outer pulsing color glow */}
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#EF233C] opacity-40 blur-[3px] group-hover:opacity-100 group-hover:blur-[5px] transition duration-500" />
              {/* Logo Frame */}
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white p-0.5 shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo/HNC LOGO.jpg"
                  alt="HOTNCOOL Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#EF233C] rounded-full border border-white animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-500 to-[#EF233C] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                HOTNCOOL
              </span>
              <span className="text-[9px] font-semibold text-[#EF233C] tracking-[0.25em] leading-none uppercase">
                RESTAURANT GROUP • SINCE 1991
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#specialties" className="hover:text-white transition-colors duration-300 hover:scale-105">
              Specialties
            </a>
            <a href="#details" className="hover:text-white transition-colors duration-300 hover:scale-105">
              Core Profile
            </a>
            <a href="#freshness" className="hover:text-white transition-colors duration-300 hover:scale-105">
              Purity Standards
            </a>
            <a href="#footer" className="hover:text-white transition-colors duration-300 hover:scale-105 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EF233C] animate-pulse" />
              Find Us
            </a>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="https://hotncool.qa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#EF233C] to-orange-500 hover:shadow-[0_0_25px_rgba(239,35,60,0.5)] transition-all duration-300 glowing-btn-red hover:scale-105 active:scale-95"
            >
              Order Now
            </a>
            
            {/* Mobile Toggle Button */}
            <button 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/80 hover:text-white active:scale-95 transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Glassmorphic Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[73px] left-0 w-full z-45 md:hidden border-b border-white/5 premium-glass shadow-[0_15px_30px_rgba(5,11,31,0.5)]"
          >
            <div className="flex flex-col p-6 gap-5 text-sm font-black uppercase tracking-widest text-center">
              <a 
                href="#specialties" 
                onClick={closeMenu}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all"
              >
                Specialties
              </a>
              <a 
                href="#details" 
                onClick={closeMenu}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all"
              >
                Core Profile
              </a>
              <a 
                href="#freshness" 
                onClick={closeMenu}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all"
              >
                Purity Standards
              </a>
              <a 
                href="https://hotncool.qa" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#EF233C] animate-pulse" />
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}