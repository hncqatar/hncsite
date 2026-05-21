import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Filter, ShieldAlert } from "lucide-react";

export default function MenuPage({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Delicacies" },
    { id: "rice", label: "Rice & Biryani" },
    { id: "grills", label: "Charcoal Grills" },
    { id: "pasta", label: "Gourmet Italian" },
    { id: "drinks", label: "Juices & Drinks" },
    { id: "Sandwiches", label: "Easy Bites" }
  ];

  const menuItems = [
    {
      id: "biryani",
      category: "rice",
      name: "Signature Dum Biryani",
      price: "18 to 20 QR",
      description: "Fragrant, jeera rice slow-cooked in a sealed heavy copper pot with tender marinated chicken and a premium spices blend.",
      image: "/images/food/biryani.png",
      tag: "Best Seller"
    },
    {
      id: "Sandwiches",
      category: "Easy Bites",
      name: "HNC Sandwiches",
      price: "5 to 20 QR",
      description: "Rich creamy and fresh meat vegetable with authentic sauce , with hot fresh wrapers.",
      image: "/images/food/Sandwiches.png",
      tag: "Chef Special"
    },
    {
      id: "Fried-Rice",
      category: "rice",
      name: "Fried-Rice",
      price: "16 to 20 QR",
      description: "Primal seasoned chicken,Vegetable,Prawns,Beef fried rices verieties.",
      image: "/images/food/rice.png",
      tag: "Heritage"
    },
    {
      id: "grill-mix",
      category: "grills",
      name: "HOTNCOOL Mix Grill Platter",
      price: "27 to 150 QR",
      description: "A combination of Shish Taouk, Lamb Kofta, Lamb Chop, and marinated Garlic Kebabs, flame-roasted over hot natural charcoal.",
      image: "/images/food/grills.png",
      tag: "Flame Grilled"
    },
    {
      id: "shish-taouk",
      category: "grills",
      name: "Premium Shish Taouk",
      price: "30 QR",
      description: "Boneless chicken cubes deeply marinated in yogurt, fresh lemon, olive oil, and original Lebanese spices, grilled on bamboo skewers.",
      image: "/images/food/shish.png",
      tag: "Popular"
    },
    {
      id: "seekh-kebab",
      category: "grills",
      name: "Grilled chicken",
      price: "35 QR",
      description: "Premium minced mutton mixed with finely chopped green chilies, coriander leaves, and custom spice blends, pressed onto charcoal iron rods.",
      image: "/images/food/Grilledchicken.png",
      tag: "Classic"
    },
    {
      id: "pizza-pep",
      category: "Pizza",
      name: "Pizza",
      price: "20 to 60 QR",
      description: "High-hydration wood-fired hand-tossed dough topped with original rich San Marzano tomato puree, whole-milk mozzarella, and spiced pepperoni.",
      image: "/images/food/pizza.png",
      tag: "Wood Fired"
    },
    {
      id: "pasta-alfredo",
      category: "pasta",
      name: "Creamy Penne Alfredo",
      price: "23 to 35 QR",
      description: "Imported Italian penne tossed in our custom rich butter-cream sauce, complete with minced garlic, organic parmesan, and grilled chicken strips.",
      image: "/images/food/pasta.png",
      tag: "Rich & Creamy"
    },
    
    {
      id: "juice-mango",
      category: "drinks",
      name: "Fresh Juices",
      price: "4 to 50 QR",
      description: "Signature cold-extracted pulp of hand-harvested Alphonso Mangoes, blended raw without any added sweeteners, thickeners, or preservatives.",
      image: "/images/food/FreshJuices.png",
      tag: "100% Raw"
    },
    {
      id: "drink-mojito",
      category: "drinks",
      name: "Classic Mint Mojito",
      price: "16 QR",
      description: "Primal refreshment combining muddled garden spearmint, organic lime wedges, pure cane syrup, and carbonated mountain spring water.",
      image: "/images/food/Mojito.png",
      tag: "Vitality"
    },
    {
      id: "drink-mojito-Energy",
      category: "drinks",
      name: "drink-mojito-Energy blend",
      price: "20 QR",
      description: "A combination of cold-pressed Energy drink, ruby-red grapefruit, fresh lemon, and botanical lemongrass served chilled over crushed ice.",
      image: "/images/food/drinks.png",
      tag: "Antioxidant"
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen text-white bg-[#050B1F] py-28 px-6 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full blur-[150px] opacity-10 bg-[#EF233C]" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full blur-[150px] opacity-10 bg-emerald-500" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#EF233C] hover:text-white bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">
              Fresh & Delicious Ingredients
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
            Signature <span className="bg-gradient-to-r from-orange-500 to-[#EF233C] bg-clip-text text-transparent">Menu</span>
          </h1>
          <div className="w-16 h-1 bg-[#EF233C] mt-6 rounded-full" />
          <p className="text-sm md:text-base text-white/50 max-w-xl mt-6 font-medium leading-relaxed">
            Explore our curated culinary options. Filter by categories to discover slow-cooked Biryanis, charcoal flame kebabs, homecrafted pasta, and cold-pressed elixirs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-3xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
                  isActive
                    ? "bg-[#EF233C] border-[#EF233C] text-white shadow-lg shadow-red-500/25 scale-102"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.id !== "all" && <Filter className="w-3.5 h-3.5 opacity-60" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-3xl premium-glass border border-white/5 flex flex-col justify-between min-h-[450px] shadow-xl hover:border-[#EF233C]/20 transition-all cursor-pointer"
              >
                <div>
                  {/* Image showcase */}
                  <div className="relative w-full h-[160px] rounded-2xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating category Tag */}
                    <span className="absolute top-3 left-3 text-[9px] font-black tracking-wider uppercase py-1 px-2.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-white/70">
                      {item.tag}
                    </span>
                  </div>

                  {/* Name and Price */}
                  <div className="flex justify-between items-start gap-4 mt-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-[#EF233C] transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-sm font-black text-[#EF233C] bg-[#EF233C]/10 border border-[#EF233C]/20 px-3 py-1.5 rounded-lg shrink-0">
                      {item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/50 leading-relaxed font-semibold mt-4">
                    {item.description}
                  </p>
                </div>

                {/* Buy Trigger simulation */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-[#EF233C] transition-colors">
                  <span>Available for Delivery</span>
                  <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <div className="mt-20 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/10 via-[#050B1F] to-[#050B1F] border border-white/5 flex gap-4 items-center justify-center max-w-xl mx-auto">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left text-xs font-semibold text-white/40 leading-relaxed">
            All dishes are prepared freshly using 100% Halal meats, organic oils, and locally farmed botanical fresh produce under top-tier sanitation frameworks.
          </div>
        </div>

      </div>
    </motion.div>
  );
}
