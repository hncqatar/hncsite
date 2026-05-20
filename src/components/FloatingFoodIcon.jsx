import React from "react";
import { motion } from "framer-motion";

export default function FloatingFoodIcon({ type, className = "", delay = 0, duration = 4 }) {
  // Common levitation parameters using Framer Motion
  const floatAnimation = {
    y: [0, -15, 0],
    rotate: [0, 3, -3, 0],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }
  };

  // Render highly-detailed, beautiful 3D-style SVGs with linearGradients for volume
  const renderSVG = () => {
    switch (type) {
      case "skewers":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_15px_rgba(239,35,60,0.25)]">
            <defs>
              <linearGradient id="skewerMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="grillMeat" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="40%" stopColor="#b91c1c" />
                <stop offset="70%" stopColor="#7f1d1d" />
                <stop offset="100%" stopColor="#450a0a" />
              </linearGradient>
              <linearGradient id="pepperGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
              <linearGradient id="onionPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#581c87" />
              </linearGradient>
              <linearGradient id="tomatoOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              <linearGradient id="fireSpark" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Rising Hot Smoke / Flame Sparks */}
            <path d="M35 15 Q30 5 35 0 Q40 5 35 15" fill="url(#fireSpark)" opacity="0.4" />
            <path d="M50 10 Q55 0 50 -5 Q45 0 50 10" fill="url(#fireSpark)" opacity="0.6" />
            <path d="M65 18 Q60 8 65 3 Q70 8 65 18" fill="url(#fireSpark)" opacity="0.3" />

            {/* Skewer Metal Needle */}
            <rect x="47" y="10" width="6" height="85" rx="3" fill="url(#skewerMetal)" />
            <path d="M47 10 L50 2 L53 10 Z" fill="#cbd5e1" />
            {/* Handle at bottom */}
            <circle cx="50" cy="92" r="6" fill="#1e293b" />
            <rect x="44" y="82" width="12" height="10" rx="2" fill="#334155" />

            {/* Top Meat Chunk (3D rounded block) */}
            <rect x="28" y="20" width="44" height="14" rx="6" fill="url(#grillMeat)" />
            <ellipse cx="50" cy="27" rx="22" ry="7" fill="#dc2626" opacity="0.3" />
            <path d="M32 24 C38 22, 62 22, 68 24" stroke="#fca5a5" strokeWidth="1" fill="none" opacity="0.6" />

            {/* Green Bell Pepper Cube */}
            <rect x="32" y="37" width="36" height="10" rx="3" fill="url(#pepperGreen)" />
            {/* Pepper Highlight lines */}
            <line x1="36" y1="40" x2="64" y2="40" stroke="#86efac" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

            {/* Purple Onion */}
            <rect x="26" y="50" width="48" height="12" rx="6" fill="url(#onionPurple)" />
            {/* Onion layers */}
            <path d="M32 50 C40 54, 60 54, 68 50" stroke="#f3e8ff" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M28 56 C38 60, 62 60, 72 56" stroke="#c084fc" strokeWidth="1.5" fill="none" opacity="0.6" />

            {/* Tomato */}
            <circle cx="50" cy="69" r="17" fill="url(#tomatoOrange)" />
            <ellipse cx="44" cy="63" rx="4" ry="2" fill="#fecaca" opacity="0.7" />
            {/* Herb seasoning specks */}
            <circle cx="42" cy="74" r="1.5" fill="#15803d" />
            <circle cx="58" cy="66" r="1" fill="#15803d" />
            <circle cx="52" cy="78" r="1.2" fill="#15803d" />
          </svg>
        );

      case "rice":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_15px_rgba(251,191,36,0.25)]">
            <defs>
              <linearGradient id="woodBowl" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="ricePile" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
              <linearGradient id="spiceLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
              <linearGradient id="steamWave" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Heat Steam rising from bowl */}
            <path d="M40 25 Q35 15 45 10 T38 -5" fill="none" stroke="url(#steamWave)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M60 27 Q65 17 55 12 T63 -3" fill="none" stroke="url(#steamWave)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />

            {/* Rich Pile (Steaming White Grains) */}
            <ellipse cx="50" cy="46" rx="36" ry="16" fill="url(#ricePile)" />
            
            {/* Spices on top (Bay Leaf & Cinnamon Stick) */}
            {/* Cinnamon Stick */}
            <rect x="42" y="36" width="22" height="6" rx="2" transform="rotate(-15 50 40)" fill="#92400e" />
            <rect x="44" y="38" width="18" height="2" transform="rotate(-15 50 40)" fill="#78350f" />
            
            {/* Leaf */}
            <path d="M30 46 C34 38, 48 38, 52 44 C46 48, 34 50, 30 46" fill="url(#spiceLeaf)" transform="rotate(10 38 43)" />
            <path d="M30 46 L46 43" stroke="#166534" strokeWidth="0.8" transform="rotate(10 38 43)" />
            
            {/* Star Anise */}
            <path d="M58 48 L63 45 L61 48 L65 51 L60 51 L62 55 L58 52 L55 55 L56 51 L52 51 L55 48 L53 45 Z" fill="#78350f" />

            {/* Individual rice grain details for high visual fidelity */}
            <ellipse cx="28" cy="48" rx="3" ry="1.2" fill="#ffffff" transform="rotate(15 28 48)" stroke="#cbd5e1" strokeWidth="0.3" />
            <ellipse cx="38" cy="45" rx="3.5" ry="1.4" fill="#ffffff" transform="rotate(-5 38 45)" stroke="#cbd5e1" strokeWidth="0.3" />
            <ellipse cx="48" cy="47" rx="3.2" ry="1.3" fill="#ffffff" transform="rotate(25 48 47)" stroke="#cbd5e1" strokeWidth="0.3" />
            <ellipse cx="64" cy="48" rx="3.5" ry="1.3" fill="#ffffff" transform="rotate(-30 64 48)" stroke="#cbd5e1" strokeWidth="0.3" />
            <ellipse cx="72" cy="46" rx="3" ry="1.1" fill="#ffffff" transform="rotate(10 72 46)" stroke="#cbd5e1" strokeWidth="0.3" />

            {/* Outer Wooden Bowl Structure */}
            <path d="M12 46 C12 68, 88 68, 88 46 C88 46, 88 48, 88 48 C88 72, 12 72, 12 48 Z" fill="url(#woodBowl)" />
            <ellipse cx="50" cy="47" rx="38" ry="8" fill="url(#woodBowl)" />
            
            {/* Glowing Golden Rim */}
            <ellipse cx="50" cy="46" rx="38" ry="3" fill="none" stroke="url(#goldRim)" strokeWidth="1.5" />
            
            {/* Bowl Stand Base */}
            <path d="M32 70 C32 76, 68 76, 68 70 Z" fill="#2d0f00" />
          </svg>
        );

      case "pasta":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_15px_rgba(244,63,94,0.25)]">
            <defs>
              <linearGradient id="slatePlate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="spaghettiColor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="sauceRed" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="basilLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>

            {/* Steaming heat waves */}
            <path d="M42 20 Q48 10 38 5 T46 -5" fill="none" stroke="url(#steamWave)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <path d="M56 18 Q50 8 60 3 T52 -7" fill="none" stroke="url(#steamWave)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

            {/* Slate Plate Bottom base */}
            <ellipse cx="50" cy="54" rx="42" ry="18" fill="#020617" />
            <ellipse cx="50" cy="52" rx="42" ry="16" fill="url(#slatePlate)" />
            <ellipse cx="50" cy="52" rx="34" ry="11" fill="#1e293b" opacity="0.6" />

            {/* Spaghetti Heap (Detailed interlacing curves) */}
            <g opacity="0.95">
              {/* Swirl base */}
              <ellipse cx="50" cy="50" rx="26" ry="12" fill="#fef08a" opacity="0.3" />
              
              {/* Entangled spaghetti path curves */}
              <path d="M30 52 Q45 42 60 52 Q68 46 54 40 Q40 44 32 48" fill="none" stroke="url(#spaghettiColor)" strokeWidth="3" strokeLinecap="round" />
              <path d="M34 46 Q50 56 66 48 Q70 42 50 36 Q36 40 44 48" fill="none" stroke="url(#spaghettiColor)" strokeWidth="3" strokeLinecap="round" />
              <path d="M40 54 Q55 46 62 42 Q50 34 38 44 Q44 52 58 48" fill="none" stroke="url(#spaghettiColor)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 50 C40 58, 60 58, 68 50" fill="none" stroke="url(#spaghettiColor)" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M38 42 C45 35, 55 35, 62 42" fill="none" stroke="url(#spaghettiColor)" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Gourmet Tomato Sauce Ladle */}
            <path d="M42 42 C44 38, 56 38, 58 42 C54 46, 46 46, 42 42" fill="url(#sauceRed)" />
            <circle cx="50" cy="43" r="6" fill="url(#sauceRed)" />
            <circle cx="46" cy="45" r="4" fill="url(#sauceRed)" />
            <circle cx="54" cy="44" r="4.5" fill="url(#sauceRed)" />

            {/* Cherry Tomato on Top */}
            <circle cx="50" cy="38" r="5" fill="url(#tomatoOrange)" />
            <circle cx="48" cy="36" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Fresh Basil Leaves */}
            <path d="M50 38 C54 34, 58 35, 58 38 C54 40, 51 40, 50 38" fill="url(#basilLeaf)" transform="rotate(-20 50 38)" />
            <path d="M50 38 C46 34, 42 35, 42 38 C46 40, 49 40, 50 38" fill="url(#basilLeaf)" transform="rotate(35 50 38)" />

            {/* Shaved Parmesan Cheese details */}
            <path d="M36 48 L40 47 M44 51 L48 50 M56 46 L60 45 M62 50 L66 49 M48 43 L52 42" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case "drinks":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_15px_rgba(16,185,129,0.25)]">
            <defs>
              <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="10%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="90%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="mojitoLiquid" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="40%" stopColor="#059669" />
                <stop offset="80%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="citrusYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
              <linearGradient id="strawColor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>

            {/* Back rim of glass */}
            <ellipse cx="50" cy="18" rx="20" ry="4" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

            {/* Straw (placed inside liquid) */}
            <line x1="42" y1="5" x2="55" y2="75" stroke="url(#strawColor)" strokeWidth="3" strokeLinecap="round" />
            <path d="M42 5 L43 12 M45 26 L47 40" stroke="#ffffff" strokeWidth="1" opacity="0.5" />

            {/* Mint Leaves floating inside */}
            <path d="M38 52 C34 48, 32 54, 38 58 C42 54, 40 50, 38 52" fill="#047857" transform="rotate(-15 38 52)" />
            <path d="M60 42 C64 38, 66 44, 60 48 C56 44, 58 40, 60 42" fill="#059669" transform="rotate(25 60 42)" />
            
            {/* Chilled Ice Cubes inside */}
            <rect x="36" y="38" width="12" height="12" rx="2" fill="#ffffff" opacity="0.25" transform="rotate(15 42 44)" />
            <rect x="52" y="48" width="10" height="10" rx="1.5" fill="#ffffff" opacity="0.3" transform="rotate(-25 57 53)" />

            {/* Glowing Citrus Lime Wheel */}
            <circle cx="48" cy="30" r="11" fill="url(#citrusYellow)" />
            <circle cx="48" cy="30" r="9" fill="none" stroke="#bef264" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="48" cy="30" r="2" fill="#ffffff" />
            {/* Lime Segment Divider Lines */}
            <line x1="48" y1="19" x2="48" y2="41" stroke="#4d7c0f" strokeWidth="0.8" opacity="0.6" />
            <line x1="37" y1="30" x2="59" y2="30" stroke="#4d7c0f" strokeWidth="0.8" opacity="0.6" />

            {/* Liquid Mass in Glass */}
            <path d="M32.5 28 L37.5 82 C37.5 84.5, 62.5 84.5, 62.5 82 L67.5 28 C67.5 28, 50 32, 32.5 28 Z" fill="url(#mojitoLiquid)" />
            
            {/* Liquid Top surface ellipse */}
            <ellipse cx="50" cy="29" rx="17.2" ry="3.5" fill="#6ee7b7" opacity="0.5" />

            {/* Glass Cylinder Outer Shell */}
            <path d="M30 18 L36 82 C36.5 87, 63.5 87, 64 82 L70 18 Z" fill="url(#glassBody)" />
            
            {/* Front rim of glass */}
            <ellipse cx="50" cy="18" rx="20" ry="4" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />

            {/* Effervescent Mocktail Bubbles rising */}
            <circle cx="40" cy="38" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="43" cy="56" r="2.2" fill="#ffffff" opacity="0.6" />
            <circle cx="58" cy="46" r="1.2" fill="#ffffff" opacity="0.9" />
            <circle cx="48" cy="68" r="2.5" fill="#ffffff" opacity="0.5" />
            <circle cx="52" cy="34" r="1.8" fill="#ffffff" opacity="0.7" />
            <circle cx="62" cy="58" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Specular Light Reflection highlight running down the glass */}
            <path d="M33.5 22 L37.5 76" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
            <path d="M66.5 22 L62.5 76" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
          </svg>
        );

      case "coffee":
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_15px_rgba(245,158,11,0.25)]">
            <defs>
              <linearGradient id="ceramicCup" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="coffeeDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="50%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#270c00" />
              </linearGradient>
              <linearGradient id="coffeeSaucer" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>

            {/* Steam trails curving up */}
            <path d="M42 30 Q34 18 45 10 T40 -8" fill="none" stroke="url(#steamWave)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M58 28 Q64 16 53 11 T60 -5" fill="none" stroke="url(#steamWave)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

            {/* Saucer plate under the cup */}
            <ellipse cx="50" cy="74" rx="40" ry="12" fill="#1e293b" opacity="0.4" />
            <ellipse cx="50" cy="72" rx="40" ry="10" fill="url(#coffeeSaucer)" />
            <ellipse cx="50" cy="72" rx="28" ry="6" fill="#64748b" opacity="0.5" />

            {/* Cup Handle */}
            <path d="M68 40 C78 40, 78 58, 68 58" fill="none" stroke="url(#ceramicCup)" strokeWidth="7" strokeLinecap="round" />
            <path d="M68 40 C75 40, 75 58, 68 58" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

            {/* Ceramic Cup Base Structure */}
            <path d="M22 36 L28 64 C28 72, 72 72, 72 64 L78 36 Z" fill="url(#ceramicCup)" />
            <ellipse cx="50" cy="36" rx="28" ry="7" fill="url(#ceramicCup)" />

            {/* Rich Liquid Coffee inside */}
            <ellipse cx="50" cy="36" rx="25" ry="5.5" fill="url(#coffeeDark)" />
            
            {/* Latte Art Foam Swirl */}
            <path d="M46 36 Q50 32 54 36 T48 38 T52 35" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <circle cx="45" cy="34" r="1.2" fill="#fef3c7" opacity="0.8" />
            <circle cx="56" cy="37" r="0.8" fill="#fef3c7" opacity="0.6" />

            {/* Cup specular glow reflection */}
            <path d="M26 40 L31 60" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      variants={{ float: floatAnimation }}
      animate="float"
      className={`${className}`}
    >
      {renderSVG()}
    </motion.div>
  );
}
