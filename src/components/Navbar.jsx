import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ currentView, setCurrentView }) {
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

  const handleNavLink = (e, targetView, anchorId) => {
    e.preventDefault();
    setCurrentView(targetView);
    closeMenu();
    if (targetView === "landing" && anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
          <a href="#" onClick={(e) => handleNavLink(e, "landing")} className="flex items-center gap-3 group">
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
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-amber-500 to-[#EF233C] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                HOTNCOOL
              </span>
              <span className="text-[9px] font-semibold text-[#EF233C] tracking-[0.25em] leading-none uppercase">
                RESTAURANT GROUP • SINCE 1991
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a 
              href="#specialties" 
              onClick={(e) => handleNavLink(e, "landing", "specialties")}
              className={`hover:text-white transition-all duration-300 hover:scale-105 ${
                currentView === "landing" ? "text-white" : ""
              }`}
            >
              SPECIALITIES
            </a>
            <button 
              onClick={(e) => handleNavLink(e, "menu")}
              className={`hover:text-white transition-all duration-300 hover:scale-105 uppercase text-xs tracking-wider font-bold ${
                currentView === "menu" ? "text-[#EF233C] font-black" : ""
              }`}
            >
              Menu
            </button>
            <button 
              onClick={(e) => handleNavLink(e, "find-us")}
              className={`hover:text-white transition-all duration-300 hover:scale-105 uppercase text-xs tracking-wider font-bold flex items-center gap-1.5 ${
                currentView === "find-us" ? "text-[#EF233C] font-black" : ""
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EF233C] animate-pulse" />
              Find Us
            </button>
            <button 
              onClick={(e) => handleNavLink(e, "contact-us")}
              className={`hover:text-white transition-all duration-300 hover:scale-105 uppercase text-xs tracking-wider font-bold ${
                currentView === "contact-us" ? "text-[#EF233C] font-black" : ""
              }`}
            >
              Contact Us
            </button>
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
                onClick={(e) => handleNavLink(e, "landing", "specialties")}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all"
              >
                Specialties
              </a>
              <button 
                onClick={(e) => handleNavLink(e, "menu")}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all flex items-center justify-center gap-1.5"
              >
                Menu
              </button>
              <button 
                onClick={(e) => handleNavLink(e, "find-us")}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all flex items-center justify-center gap-1.5"
              >
                Find Us
              </button>
              <button 
                onClick={(e) => handleNavLink(e, "contact-us")}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all flex items-center justify-center gap-1.5"
              >
                Contact Us
              </button>
              <a 
                href="https://hotncool.qa" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 hover:text-white hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 transition-all flex items-center justify-center gap-1.5 text-white"
                style={{
                  background: "linear-gradient(to right, #EF233C, #F97316)"
                }}
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}