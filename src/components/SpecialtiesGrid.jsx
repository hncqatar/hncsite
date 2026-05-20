import React from "react";
import { motion } from "framer-motion";
import { Flame, Compass, Heart, Sparkles, UtensilsCrossed } from "lucide-react";
import FloatingFoodIcon from "./FloatingFoodIcon";

export default function SpecialtiesGrid() {
  const specialties = [
    {
      id: "rice",
      title: "Rice & Dum Biryani",
      tag: "Pure Authenticity",
      image: "/images/food/rice.png",
      description: "Fragrant basmati rice slow-cooked with custom spice blends. Home to our signature rich dum Biryani and authentic legacy rice meals.",
      accent: "#FBBF24", // Amber/Gold
      iconType: "rice"
    },
    {
      id: "grills",
      title: "Charcoal Grills & BBQ",
      tag: "Perfected Since 1991",
      image: "/images/food/grills.png",
      description: "Tender, hand-cut lamb chops, seekh kebabs, and shish taouk, marinated in our legacy spice mix and flame-grilled to order.",
      accent: "#EF233C", // Corporate Red
      iconType: "skewers"
    },
    {
      id: "pasta",
      title: "Gourmet Italian",
      tag: "Artisanal & Fresh",
      image: "/images/food/pasta.png",
      description: "Wood-fired artisanal pizzas and rich sauces crafted from organic vine tomatoes, fresh basil, and select premium mozzarella.",
      accent: "#EC4899", // Rose
      iconType: "pasta"
    },
    {
      id: "drinks",
      title: "Juices & Mojitos",
      tag: "100% Raw Freshness",
      image: "/images/food/drinks.png",
      description: "Chilled citrus mojitos, hand-shaken botanical mocktails, and pure, raw cold-pressed fruit elixirs served at peak vitality.",
      accent: "#10B981", // Emerald
      iconType: "drinks"
    }
  ];

  // Grid fade-in-up animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom ease-out
      }
    }
  };

  return (
    <section id="specialties" className="relative py-32 px-6 bg-[#050B1F] overflow-hidden">
      
      {/* Dynamic Backing Ambient Glows - Theme Compliant Navy/Red */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#EF233C]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[180px] pointer-events-none" />

      {/* Floating 3D Food SVGs in Background for deep parallax layering */}
      <div className="absolute top-20 left-12 w-20 h-20 opacity-20 pointer-events-none z-0 hidden lg:block">
        <FloatingFoodIcon type="rice" delay={0.5} duration={4.5} />
      </div>
      <div className="absolute top-1/2 right-16 w-24 h-24 opacity-25 pointer-events-none z-0 hidden lg:block">
        <FloatingFoodIcon type="skewers" delay={1.2} duration={5} />
      </div>
      <div className="absolute bottom-20 left-24 w-22 h-22 opacity-20 pointer-events-none z-0 hidden lg:block">
        <FloatingFoodIcon type="pasta" delay={2} duration={4} />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16 opacity-15 pointer-events-none z-0 hidden lg:block">
        <FloatingFoodIcon type="drinks" delay={0.2} duration={6} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#EF233C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">
              The Taste Revolution
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none uppercase"
          >
            Culinary <span className="bg-gradient-to-r from-orange-500 to-[#EF233C] bg-clip-text text-transparent">Specialties</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "96px" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-[#EF233C] rounded-full mt-6" 
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base md:text-lg text-white/45 max-w-xl font-medium leading-relaxed"
          >
            Explore our curated culinary domains, from fire-charred heritage grills to slow-cooked aromatic rice and fresh custom-squeezed juice lines.
          </motion.p>
        </div>

        {/* Dynamic Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {specialties.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 shadow-2xl flex flex-col p-6 h-[460px] justify-between cursor-pointer transition-all duration-500 hover:border-[#EF233C]/30 hover:shadow-[0_20px_50px_rgba(239,35,60,0.1)]"
            >
              
              {/* Premium Glow Highlight at top of card */}
              <div 
                className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{ backgroundColor: item.accent }}
              />

              {/* Levigating Specialty 3D Icon Overlay on card backdrop */}
              <div className="absolute -top-4 -right-4 w-28 h-28 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <FloatingFoodIcon type={item.iconType} delay={index * 0.3} duration={4} />
              </div>

              {/* Top Details */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black tracking-widest uppercase py-1 px-2.5 rounded-md bg-white/5 border border-white/5 text-white/50 group-hover:text-white group-hover:bg-[#EF233C]/10 transition-all">
                    {item.tag}
                  </span>
                  
                  {/* Subtle pulsing status dot */}
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: item.accent }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: item.accent }} />
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide group-hover:text-[#EF233C] transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Middle Image Showcase - Highly Cinematic Frame */}
              <div className="relative my-4 w-full h-[180px] rounded-2xl overflow-hidden bg-slate-950/60 border border-white/5 flex items-center justify-center group-hover:border-white/10 transition-all">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover scale-102 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />
                {/* Radial Shadow Vignette Mask to blend images elegantly */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
                
                {/* Micro-sparkle floating indicator */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-white/80 animate-spin-slow" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex flex-col gap-3">
                <p className="text-xs text-white/45 group-hover:text-white/60 transition-colors leading-relaxed font-semibold">
                  {item.description}
                </p>
                
                {/* Call-to-action line */}
                <div className="flex items-center gap-1 mt-2 text-[10px] font-black uppercase tracking-widest text-[#EF233C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500">
                  <span>Explore Menu</span>
                  <span className="text-xs">→</span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Global Stats bar below Specialties */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-8 rounded-3xl premium-glass border border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 shadow-2xl relative overflow-hidden"
        >
          {/* Inner ambient glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#EF233C]/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl md:text-5xl font-black text-white bg-gradient-to-r from-orange-400 to-[#EF233C] bg-clip-text text-transparent">60+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Restaurant Branches</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-4xl md:text-5xl font-black text-white bg-gradient-to-r from-orange-400 to-[#EF233C] bg-clip-text text-transparent">15+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Premium Kiosks</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-4xl md:text-5xl font-black text-white bg-gradient-to-r from-orange-400 to-[#EF233C] bg-clip-text text-transparent">2+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Countries (GCC & India)</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-4xl md:text-5xl font-black text-white bg-gradient-to-r from-orange-400 to-[#EF233C] bg-clip-text text-transparent">35+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Years of Heritage</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
