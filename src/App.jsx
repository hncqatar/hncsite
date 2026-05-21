import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Sparkles,
  ChevronRight,
  Star,
  Zap,
  Globe,
  Utensils
} from "lucide-react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductBottleScroll from "./components/ProductBottleScroll.jsx";
import SpecialtiesGrid from "./components/SpecialtiesGrid.jsx";
import FloatingFoodIcon from "./components/FloatingFoodIcon.jsx";
import { products } from "./data/products.js";

// Sub-pages state-routing imports
import FindUsPage from "./components/FindUsPage.jsx";
import MenuPage from "./components/MenuPage.jsx";
import ContactUsPage from "./components/ContactUsPage.jsx";

export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProduct = products[activeIdx];
  const [currentView, setCurrentView] = useState("landing"); // "landing" | "find-us" | "menu" | "contact-us"

  // Global theme settings
  useEffect(() => {
    document.documentElement.style.setProperty("--product-gradient", activeProduct.gradient);
    document.documentElement.style.setProperty("--selection-bg", "#EF233C"); // Rebranded selection to HOTNCOOL red
    document.documentElement.style.setProperty("--selection-text", "#ffffff");
  }, [activeIdx, activeProduct]);

  // Selector controls
  const handleFlavorChange = (index) => {
    setActiveIdx(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Stats / Details Tabs
  const [activeDetailsTab, setActiveDetailsTab] = useState("profile"); // "profile" | "services" | "vision"

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#EF233C] selection:text-white transition-colors duration-1000 bg-[#050B1F]">
      
      {/* Floating Transparent Glass Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Dynamic Sub-page View rendering */}
      <AnimatePresence mode="wait">
        {currentView === "landing" && (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Floating Active Flavor Selector Desk (Juice Campaign Engine Selector) */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-none">
              <div className="premium-glass p-2.5 rounded-full flex items-center justify-between gap-1 shadow-[0_15px_50px_rgba(5,11,31,0.5)] border border-white/10 pointer-events-auto">
                {products.map((prod, index) => {
                  const isActive = activeIdx === index;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleFlavorChange(index)}
                      className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-1.5 ${
                        isActive 
                          ? "text-white shadow-lg hover:scale-102"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                      style={{
                        backgroundColor: isActive ? "#EF233C" : "transparent",
                        color: "#ffffff"
                      }}
                    >
                      {isActive && <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-white" />}
                      {prod.name.split(" ")[1] || prod.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SECTION 1: Canvas Scrollytelling Campaign */}
            {/* ------------------------------------------------------------- */}
            <ProductBottleScroll product={activeProduct} />

            {/* ------------------------------------------------------------- */}
            {/* SECTION 1.5: Signature Specialties Showcase Grid */}
            {/* ------------------------------------------------------------- */}
            <SpecialtiesGrid />

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: Detailed Corporate profile & Stats */}
      {/* ------------------------------------------------------------- */}
      <section id="details" className="relative py-28 px-6 bg-gradient-to-b from-[#050B1F]/30 to-black/85 overflow-hidden">
        
        {/* Decorative slashes and glow elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#EF233C]/20 to-transparent" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full blur-[150px] opacity-15 pointer-events-none bg-[#EF233C]" />
        
        <div className="max-w-7xl mx-auto">
          
          {/* Header Title */}
          <div className="flex flex-col items-center text-center mb-16 relative">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#EF233C]">
              Established 1991 • Heritage & Integrity
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mt-4 max-w-3xl leading-none uppercase">
              A Culinary Legacy of Excellence
            </h2>
            <div className="w-24 h-1 rounded-full mt-6 bg-[#EF233C]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12 overflow-hidden">
            
            {/* Left Card: Legacy Brand Identity */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px", amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <div className="p-5 xs:p-8 md:p-10 rounded-3xl luxury-card border border-white/5 relative overflow-hidden flex flex-col gap-6">
                
                {/* 3D Steering coffee cup in background */}
                <div className="absolute -top-6 -right-6 w-28 h-28 opacity-10 pointer-events-none">
                  <FloatingFoodIcon type="coffee" />
                </div>
                
                <span className="text-[10px] font-bold text-[#EF233C] tracking-[0.25em] uppercase">
                  Our Corporate Identity
                </span>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-wide">
                  Traditional Flavors, Modern Experiences
                </h3>

                <p className="text-base text-white/70 leading-relaxed font-medium">
                  HOTNCOOL is a premium restaurant group known for combining traditional culinary techniques with modern dining innovation. From a single boutique outlet in 1991, we have expanded into a celebrated multi-branch dining ecosystem. We focus on premium ingredients, kitchen innovation, and absolute hospitality.
                </p>

                <p className="text-xs text-white/45 leading-relaxed">
                  Our brand concentrates heavily on sourcing premium ingredients, investing in cutting-edge kitchen engineering, and ensuring strict hygiene protocols to sustain large-scale culinary operations seamlessly.
                </p>
                
                <div className="border-t border-white/5 pt-6 flex flex-col gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">100% Certified Kitchens</span>
                      <span className="text-xs text-white/45">Strict HACCP compliance and regular microbiological testing.</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Global Supply Integration</span>
                      <span className="text-xs text-white/45">Direct imports of premium meats and original culinary spices.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Standards SLA banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/20 to-orange-950/10 border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-[#EF233C] shrink-0">
                  <Zap className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Uncompromising Purity</h4>
                  <p className="text-xs text-white/45 mt-0.5 leading-relaxed">
                    Every mocktail is flash-chilled to 2.4°C and every grill is flame-kissed dynamically to seal in vital juices.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Card: Dynamic Information Panels */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px", amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <div className="p-5 xs:p-8 rounded-3xl premium-glass border border-white/10 shadow-2xl">
                
                {/* Navigation Tab links inside card */}
                <div className="flex border-b border-white/5 pb-4 gap-2 mb-6">
                  <button
                    onClick={() => setActiveDetailsTab("profile")}
                    className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 ${
                      activeDetailsTab === "profile"
                        ? "text-white"
                        : "text-white/40 border-transparent hover:text-white/70"
                    }`}
                    style={{ borderBottomColor: activeDetailsTab === "profile" ? "#EF233C" : "transparent" }}
                  >
                    Legacy Info
                  </button>
                  <button
                    onClick={() => setActiveDetailsTab("services")}
                    className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 ${
                      activeDetailsTab === "services"
                        ? "text-white"
                        : "text-white/40 border-transparent hover:text-white/70"
                    }`}
                    style={{ borderBottomColor: activeDetailsTab === "services" ? "#EF233C" : "transparent" }}
                  >
                    Core Services
                  </button>
                  <button
                    onClick={() => setActiveDetailsTab("vision")}
                    className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 ${
                      activeDetailsTab === "vision"
                        ? "text-white"
                        : "text-white/40 border-transparent hover:text-white/70"
                    }`}
                    style={{ borderBottomColor: activeDetailsTab === "vision" ? "#EF233C" : "transparent" }}
                  >
                    Vision & Mission
                  </button>
                </div>

                {/* Tab content renderer */}
                <AnimatePresence mode="wait">
                  {activeDetailsTab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      <h4 className="text-white text-sm font-extrabold uppercase tracking-wider mb-2">
                        Corporate Footprint Specifications
                      </h4>
                      <div className="flex flex-col gap-3 font-semibold text-xs sm:text-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 sm:py-2 gap-1 sm:gap-4 border-b border-white/5 text-left">
                          <span className="text-white/50">Industry Segment</span>
                          <span className="text-white">Restaurant, Hospitality & Food Services</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 sm:py-2 gap-1 sm:gap-4 border-b border-white/5 text-left">
                          <span className="text-white/50">Business Architecture</span>
                          <span className="text-white">Multi-Branch International Chain</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 sm:py-2 gap-1 sm:gap-4 border-b border-white/5 text-left">
                          <span className="text-white/50">Network Coverage</span>
                          <span className="text-white">60+ Full-Scale Restaurants, 15+ Express Kiosks</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 sm:py-2 gap-1 sm:gap-4 border-b border-white/5 text-left">
                          <span className="text-white/50">Target Demographics</span>
                          <span className="text-white">Families, Students, Professionals & Corporates</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 sm:py-2 gap-1 sm:gap-4 text-left">
                          <span className="text-white/50">Presence Boundaries</span>
                          <span className="text-[#EF233C]">
                            GCC Nations (Qatar Hub) & India
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDetailsTab === "services" && (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4 text-sm"
                    >
                      <h4 className="text-white text-sm font-extrabold uppercase tracking-wider mb-2">
                        Our Operational Capabilities
                      </h4>
                      <p className="text-white/60 leading-relaxed mb-2">
                        HOTNCOOL Group offers five distinct channels of food delivery and dining service, all operating under the highest quality guidelines.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 text-xs uppercase tracking-wider font-bold">
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF233C]" />
                          <span>Dine-In Restaurants</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF233C]" />
                          <span>Express Takeaway</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF233C]" />
                          <span>Online Delivery Integration</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF233C]" />
                          <span>Executive Event Catering</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 col-span-1 md:col-span-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF233C]" />
                          <span>School & Campus Food Operations</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDetailsTab === "vision" && (
                    <motion.div
                      key="vision"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4 text-sm"
                    >
                      <h4 className="text-white text-sm font-extrabold uppercase tracking-wider mb-2">
                        Our Vision & Mission Outline
                      </h4>
                      
                      <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Company Vision</span>
                        <p className="text-xs text-white/80 italic leading-relaxed">
                          "To become a globally recognized food and beverage brand delivering exceptional culinary experiences with innovation, hospitality, and authenticity."
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Our Strategic Missions</span>
                        <ul className="flex flex-col gap-2 text-xs font-semibold text-white/70 pl-2">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>Deliver uncompromising premium quality culinary dishes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>Maintain strict hygiene and hospitality standards globally</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>Innovate menus and digital integration to build customer trust</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: Operations & Quality Timeline */}
      {/* ------------------------------------------------------------- */}
      <section id="freshness" className="py-24 px-6 bg-black text-white overflow-hidden relative">
        {/* Background Restaurant Image with Dark Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/restaurant/abci.jpg"
            alt="Operational Standards Background"
            className="w-full h-full object-cover opacity-25 filter brightness-[0.25] contrast-125"
          />
          {/* Multi-gradient overlay to blend cleanly with surrounding sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B1F] via-black/40 to-[#050B1F]" />
        </div>

        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-[120px] pointer-events-none z-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#EF233C]">
              The Path of Uncompromising Quality
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mt-4 max-w-2xl leading-none uppercase">
              Our Operational Standards
            </h2>
            <div className="w-16 h-1 bg-[#EF233C] mt-6" />
          </div>

          {/* Timeline Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px", amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
          >
            
            {/* Step 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
              className="flex flex-col items-center text-center group p-6 rounded-3xl transition-all duration-300 hover:bg-white/[0.02] border border-transparent hover:border-white/5 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF233C] font-black text-xl shadow-inner group-hover:scale-110 group-hover:border-[#EF233C]/30 transition-all duration-500">
                01
              </div>
              <h4 className="text-base font-bold uppercase tracking-wider text-white mt-6 group-hover:text-[#EF233C] transition-colors">
                Premium Sourcing
              </h4>
              <p className="text-xs text-white/45 leading-relaxed mt-2.5 max-w-xs font-semibold">
                Meats, spices, and fresh produce hand-selected and approved daily by expert culinary buyers.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
              className="flex flex-col items-center text-center group p-6 rounded-3xl transition-all duration-300 hover:bg-white/[0.02] border border-transparent hover:border-white/5 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF233C] font-black text-xl shadow-inner group-hover:scale-110 group-hover:border-[#EF233C]/30 transition-all duration-500">
                02
              </div>
              <h4 className="text-base font-bold uppercase tracking-wider text-white mt-6 group-hover:text-[#EF233C] transition-colors">
                Hygienic Prep
              </h4>
              <p className="text-xs text-white/45 leading-relaxed mt-2.5 max-w-xs font-semibold">
                Rigorous temperature control and sanitized workspaces to preserve organic food properties.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
              className="flex flex-col items-center text-center group p-6 rounded-3xl transition-all duration-300 hover:bg-white/[0.02] border border-transparent hover:border-white/5 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF233C] font-black text-xl shadow-inner group-hover:scale-110 group-hover:border-[#EF233C]/30 transition-all duration-500">
                03
              </div>
              <h4 className="text-base font-bold uppercase tracking-wider text-white mt-6 group-hover:text-[#EF233C] transition-colors">
                Express Cooking
              </h4>
              <p className="text-xs text-white/45 leading-relaxed mt-2.5 max-w-xs font-semibold">
                Traditional recipes cooked dynamically at custom temperatures to seal in natural aromas.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
              className="flex flex-col items-center text-center group p-6 rounded-3xl transition-all duration-300 hover:bg-white/[0.02] border border-transparent hover:border-white/5 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF233C] font-black text-xl shadow-inner group-hover:scale-110 group-hover:border-[#EF233C]/30 transition-all duration-500">
                04
              </div>
              <h4 className="text-base font-bold uppercase tracking-wider text-white mt-6 group-hover:text-[#EF233C] transition-colors">
                Thermal Dispatch
              </h4>
              <p className="text-xs text-white/45 leading-relaxed mt-2.5 max-w-xs font-semibold">
                Packed in custom thermal pods to deliver fresh beverages or steaming meals perfectly chilled/hot.
              </p>
            </motion.div>

          </motion.div>

          <div className="mt-16 text-center text-sm font-semibold max-w-xl mx-auto text-white/40 leading-relaxed border-t border-white/5 pt-10">
            We operate in perfect synchronization, ensuring that whether dining in or ordering at your doorstep, the taste profiles represent the legendary standards that have defined us since 1991.
          </div>
          </div>
        </section>
      </motion.div>
    )}
  </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === "find-us" && (
          <FindUsPage onBack={() => { setCurrentView("landing"); window.scrollTo(0,0); }} />
        )}
        {currentView === "menu" && (
          <MenuPage onBack={() => { setCurrentView("landing"); window.scrollTo(0,0); }} />
        )}
        {currentView === "contact-us" && (
          <ContactUsPage onBack={() => { setCurrentView("landing"); window.scrollTo(0,0); }} />
        )}
      </AnimatePresence>

      {/* Elegant Footer Details */}
      <Footer setCurrentView={setCurrentView} />

    </div>
  );
}
