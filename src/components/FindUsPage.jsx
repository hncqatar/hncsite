import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageSquare, ArrowLeft, ShieldCheck, Search, HelpCircle, X } from "lucide-react";

export default function FindUsPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all"); // "all" | "Qatar" | "India"

  const branches = [
    {
      id: "al-rayyan",
      name: "HOTNCOOL Al Rayyan",
      type: "Full Dining & Delivery Hub",
      address: "Umm al dome St., Al Rayyan, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44443341",
      whatsapp: "+974 33773341",
      mapLink: "https://share.google/dCOcj0U7DJCx3oRiW",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "Furousiya",
      name: "HOTNCOOL Furousiya",
      type: "Family Restaurant & Takeaway",
      address: "Furousiya Street, Al Rayyan, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44442944",
      whatsapp: "+97450144429",
      mapLink: "https://share.google/0eljvPILbYe3M577S",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "ainkhalid",
      name: "HOTNCOOL Ain Khalid",
      type: "Multi-Cuisine Dining Center",
      address: "Ain khalid -Ain khalid souq, Doha, Qatar",
      city: "Ain Khalid",
      country: "Qatar",
      phone: "+974 44444026",
      whatsapp: "+97450544426",
      mapLink: "https://share.google/a0yA2rtYKTDoNlw4o",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "salwa",
      name: "HOTNCOOL Salwa Road",
      type: "Multi-Cuisine Dining Center",
      address: "Salwa road, Mamoura, Doha-Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44324444",
      whatsapp: "+97433744432",
      mapLink: "https://share.google/7YL9mNtw6i4mqU2vz",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "abuhamour",
      name: "HOTNCOOL Abu Hamour",
      type: "Express & Family Dining",
      address: "Abu hamour,Gold plazza, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44445044",
      whatsapp: "+974 59995044",
      mapLink: "https://share.google/KRHF6WL22sclxWHoD",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "west-bay",
      name: "West Bay Lounge",
      type: "Premium Business Lounge",
      address: "Diplomatic Area, West Bay, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44773311",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+West+Bay+Doha",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "al-gharrafa",
      name: "Al Gharrafa Express",
      type: "Takeaway & Fast Delivery",
      address: "Shamal Road, Al Gharrafa, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44998877",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Al+Gharrafa+Doha",
      timings: "08:00 AM - 03:00 AM"
    },
    {
      id: "pearl-qatar",
      name: "Pearl Yacht View",
      type: "Fine Dining Lounge",
      address: "Porto Arabia, The Pearl, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44883344",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+The+Pearl+Doha",
      timings: "11:00 AM - 01:00 AM"
    },
    {
      id: "lusail",
      name: "Lusail Boulevard Hub",
      type: "Street Dining & Mocktail Bar",
      address: "Lusail Commercial Boulevard, Lusail, Qatar",
      city: "Lusail",
      country: "Qatar",
      phone: "+974 44558899",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Lusail+Boulevard",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "abu-hamour",
      name: "Abu Hamour Central",
      type: "Family & Drive-In Hub",
      address: "Haloul Street, Abu Hamour, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44229988",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Abu+Hamour+Doha",
      timings: "09:00 AM - 02:00 AM"
    },
    {
      id: "old-al-ghanim",
      name: "Old Al Ghanim Branch",
      type: "Traditional Heritage Diner",
      address: "Grand Hamad Street, Old Al Ghanim, Doha, Qatar",
      city: "Doha",
      country: "Qatar",
      phone: "+974 44331122",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Old+Al+Ghanim+Doha",
      timings: "24 Hours (7 Days)"
    },
    {
      id: "mall-of-qatar",
      name: "Mall of Qatar Kiosk",
      type: "Food Court Express",
      address: "Food Court, Mall of Qatar, Al Rayyan, Qatar",
      city: "Al Rayyan",
      country: "Qatar",
      phone: "+974 44887755",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Mall+of+Qatar",
      timings: "10:00 AM - Midnight"
    },
    {
      id: "muaither",
      name: "Muaither Commercial Hub",
      type: "Family Dining & Delivery",
      address: "Muaither Commercial Street, Al Rayyan, Qatar",
      city: "Al Rayyan",
      country: "Qatar",
      phone: "+974 44990022",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Muaither+Doha",
      timings: "08:00 AM - 02:00 AM"
    },
    {
      id: "wathnan-mall",
      name: "Wathnan Mall Kiosk",
      type: "Express Refreshment Bar",
      address: "Ground Floor, Wathnan Mall, Muaither, Qatar",
      city: "Al Rayyan",
      country: "Qatar",
      phone: "+974 44881144",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Wathnan+Mall+Muaither",
      timings: "09:00 AM - 11:00 PM"
    },
    {
      id: "mesaieed",
      name: "Mesaieed Central",
      type: "Industrial Area Express",
      address: "Central Market Road, Mesaieed, Qatar",
      city: "Mesaieed",
      country: "Qatar",
      phone: "+974 44991199",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Mesaieed",
      timings: "08:00 AM - 01:00 AM"
    },
    // India Locations
    {
      id: "clt-beach",
      name: "Kozhikode Beach Road",
      type: "Premium Seaview Restaurant",
      address: "Beach Road, Near Gandhi Park, Kozhikode, Kerala, India",
      city: "Kozhikode",
      country: "India",
      phone: "+91 495 2761001",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Beach+Road+Kozhikode",
      timings: "11:00 AM - Midnight"
    },
    {
      id: "clt-bypass",
      name: "Calicut Bypass Hub",
      type: "Multi-Cuisine Garden Lounge",
      address: "Cyberpark Junction, Hilite Mall Road, Kozhikode, India",
      city: "Kozhikode",
      country: "India",
      phone: "+91 495 2439900",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Bypass+Kozhikode",
      timings: "10:00 AM - 02:00 AM"
    },
    {
      id: "cok-marine",
      name: "Kochi Marine Drive",
      type: "Premium Waterside Dining",
      address: "Marine Drive, Ernakulam, Kochi, Kerala, India",
      city: "Kochi",
      country: "India",
      phone: "+91 484 2358811",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Marine+Drive+Kochi",
      timings: "11:00 AM - Midnight"
    },
    {
      id: "cok-infopark",
      name: "Kochi Infopark Express",
      type: "Tech-Park Kiosk & Delivery",
      address: "Food Court, Infopark Phase 1, Kakkanad, Kochi, India",
      city: "Kochi",
      country: "India",
      phone: "+91 484 2901122",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Infopark+Kakkanad+Kochi",
      timings: "08:00 AM - 10:00 PM"
    },
    {
      id: "blr-indiranagar",
      name: "Bangalore Indiranagar",
      type: "Trendy Dining & Mojito Lounge",
      address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka, India",
      city: "Bengaluru",
      country: "India",
      phone: "+91 80 44771122",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=HOTNCOOL+Indiranagar+Bangalore",
      timings: "11:00 AM - Midnight"
    },
    {
      id: "blr-whitefield",
      name: "Whitefield Corporate Hub",
      type: "Tech-Park Dine & Delivery",
      address: "ITPL Main Road, Opposite Prestige Tech Park, Bengaluru, India",
      city: "Bengaluru",
      country: "India",
      phone: "+91 80 44883399",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=ITPL+Whitefield+Bangalore",
      timings: "10:00 AM - 11:00 PM"
    },
    {
      id: "bom-bandra",
      name: "Mumbai Bandra West",
      type: "Sunset Coastal Lounge",
      address: "Carter Road Promenade, Bandra West, Mumbai, India",
      city: "Mumbai",
      country: "India",
      phone: "+91 22 26401122",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Carter+Road+Bandra+Mumbai",
      timings: "12:00 PM - 01:00 AM"
    },
    {
      id: "maa-omr",
      name: "Chennai OMR Tech Park",
      type: "Fast Dining Express Kiosk",
      address: "OMR IT Corridor, Sholinganallur, Chennai, India",
      city: "Chennai",
      country: "India",
      phone: "+91 44 24501199",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=OMR+Sholinganallur+Chennai",
      timings: "08:00 AM - 11:00 PM"
    },
    {
      id: "trv-technopark",
      name: "Trivandrum Technopark",
      type: "Executive Tech Lounge",
      address: "Technopark Phase 3 Campus, Trivandrum, Kerala, India",
      city: "Trivandrum",
      country: "India",
      phone: "+91 471 2701100",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Technopark+Trivandrum",
      timings: "09:00 AM - 10:00 PM"
    },
    {
      id: "tcr-round",
      name: "Thrissur Round East",
      type: "Cultural Heritage Center",
      address: "Round East, Near Vadakkechira, Thrissur, Kerala, India",
      city: "Thrissur",
      country: "India",
      phone: "+91 487 2321155",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Round+East+Thrissur",
      timings: "10:00 AM - 11:00 PM"
    },
    {
      id: "ixe-balmatta",
      name: "Mangalore Balmatta",
      type: "Spicy Coastal Grills Diner",
      address: "Balmatta Main Road, Mangaluru, Karnataka, India",
      city: "Mangaluru",
      country: "India",
      phone: "+91 824 2421188",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Balmatta+Mangalore",
      timings: "11:00 AM - 11:30 PM"
    },
    {
      id: "cnn-fort",
      name: "Kannur Fort Road",
      type: "Malabar Heritage Kitchen",
      address: "Fort Road, Opp. Police Station, Kannur, Kerala, India",
      city: "Kannur",
      country: "India",
      phone: "+91 497 2705566",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Fort+Road+Kannur",
      timings: "10:00 AM - 11:00 PM"
    },
    {
      id: "blr-koramangala",
      name: "Bangalore Koramangala",
      type: "Youth Cafe & Fresh Juices",
      address: "80 Feet Road, 4th Block, Koramangala, Bengaluru, India",
      city: "Bengaluru",
      country: "India",
      phone: "+91 80 44990088",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Koramangala+Bangalore",
      timings: "11:00 AM - Midnight"
    },
    {
      id: "hyd-hitech",
      name: "Hyderabad Hitech City",
      type: "Nizam Biryani & Grill House",
      address: "Madhapur Main Road, Hitech City, Hyderabad, India",
      city: "Hyderabad",
      country: "India",
      phone: "+91 40 44669911",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Madhapur+Hitech+City+Hyderabad",
      timings: "11:00 AM - 01:00 AM"
    },
    {
      id: "clt-mavoor",
      name: "Kozhikode Mavoor Road",
      type: "Traditional Malabar Diner",
      address: "Mavoor Road, Near KSRTC Stand, Kozhikode, India",
      city: "Kozhikode",
      country: "India",
      phone: "+91 495 2728899",
      whatsapp: "+974 30838006",
      mapLink: "https://maps.google.com/?q=Mavoor+Road+Kozhikode",
      timings: "24 Hours (7 Days)"
    }
  ];

  // Live filter engine logic
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.type.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCountry = selectedCountry === "all" || branch.country === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen text-white bg-[#050B1F] py-28 px-6 relative overflow-hidden"
    >
      {/* Cinematic Glowing Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#EF233C]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
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

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#EF233C] mb-4">
            Established Network • GCC & INDIA PRESENCE
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
            Find Our <span className="bg-gradient-to-r from-orange-500 to-[#EF233C] bg-clip-text text-transparent">Branches</span>
          </h1>
          <div className="w-20 h-1 bg-[#EF233C] mt-6 rounded-full" />
          <p className="text-sm md:text-base text-white/50 max-w-xl mt-6 font-medium leading-relaxed">
            Explore our international presence across Qatar and India. Locate your nearest branch for signature slow-cooked meals, direct call routing, and fast WhatsApp coordinates.
          </p>
        </div>

        {/* Search and Country Filters */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto mb-16 relative">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            
            {/* Search Bar Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
              <input
                type="text"
                placeholder="Search by branch name, city, address, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#EF233C] focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Country Filters */}
            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 gap-1.5 shrink-0 self-stretch sm:self-auto">
              <button
                onClick={() => setSelectedCountry("all")}
                className={`flex-1 sm:flex-none py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCountry === "all"
                    ? "bg-[#EF233C] text-white shadow-md shadow-red-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                All ({branches.length})
              </button>
              <button
                onClick={() => setSelectedCountry("Qatar")}
                className={`flex-1 sm:flex-none py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCountry === "Qatar"
                    ? "bg-[#EF233C] text-white shadow-md shadow-red-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Qatar ({branches.filter(b => b.country === "Qatar").length})
              </button>
              <button
                onClick={() => setSelectedCountry("India")}
                className={`flex-1 sm:flex-none py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCountry === "India"
                    ? "bg-[#EF233C] text-white shadow-md shadow-red-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                India ({branches.filter(b => b.country === "India").length})
              </button>
            </div>

          </div>

          {/* Results Counters */}
          <div className="flex justify-between items-center text-xs font-semibold text-white/40 px-2">
            <span>
              {filteredBranches.length === branches.length
                ? `Showing all ${branches.length} branches`
                : `Found ${filteredBranches.length} branch${filteredBranches.length === 1 ? "" : "es"} matching filter`}
            </span>
            {(searchQuery || selectedCountry !== "all") && (
              <button
                onClick={() => { setSearchQuery(""); setSelectedCountry("all"); }}
                className="text-[#EF233C] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-black"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Branches Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredBranches.map((branch) => (
              <motion.div
                layout
                key={branch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="p-5 xs:p-6 rounded-3xl premium-glass border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px] group hover:border-[#EF233C]/20 transition-colors cursor-pointer"
              >
                {/* Inner ambient glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#EF233C]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  {/* Header Tag */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-[10px] font-bold py-1 px-3 rounded-md bg-white/5 border border-white/5 text-white/40 uppercase">
                      {branch.type}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{branch.country}</span>
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-black text-white uppercase tracking-wide group-hover:text-[#EF233C] transition-colors duration-300">
                    {branch.name}
                  </h3>
                  
                  {/* Timings */}
                  <span className="text-[10px] text-white/30 font-semibold block mt-1 uppercase tracking-widest">
                    Hours: {branch.timings}
                  </span>

                  {/* Address */}
                  <div className="flex items-start gap-3 mt-6 text-sm text-white/60 font-medium">
                    <MapPin className="w-5 h-5 text-[#EF233C] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                </div>

                {/* Communication & Maps Channels */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-8 pt-6 border-t border-white/5 font-bold text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wider z-10">
                  
                  {/* Google Map Link */}
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-2 xs:p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#EF233C]/10 hover:border-[#EF233C]/20 hover:text-white transition-all text-center text-white/80"
                  >
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EF233C] group-hover:scale-110 transition-transform" />
                    <span>Directions</span>
                  </a>

                  {/* Direct Calling */}
                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                    className="flex flex-col items-center justify-center gap-2 p-2 xs:p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/20 hover:text-white transition-all text-center text-white/80"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                    <span>Call Us</span>
                  </a>

                  {/* WhatsApp Chat */}
                  <a
                    href={`https://wa.me/${branch.whatsapp.replace(/\+/g, "").replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-2 xs:p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-white transition-all text-center text-white/80"
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Fallback */}
        {filteredBranches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 rounded-3xl premium-glass border border-white/5 text-center flex flex-col items-center justify-center gap-6 max-w-xl mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-wide">No Branches Found</h3>
              <p className="text-xs text-white/40 mt-2 max-w-xs mx-auto leading-relaxed">
                We couldn't find any branches matching "{searchQuery}" in {selectedCountry === "all" ? "our network" : selectedCountry}.
              </p>
            </div>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCountry("all"); }}
              className="py-3 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-[#EF233C] hover:border-[#EF233C] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md active:scale-95"
            >
              Clear Search Filter
            </button>
          </motion.div>
        )}

        {/* Global SLA Details */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-red-950/10 to-[#050B1F] border border-white/5 text-center text-xs text-white/40 leading-relaxed font-semibold">
          For executive dining configurations, campus food operations, large scale corporate catering, or general suggestions, feel free to call our Al Rayyan headquarters dynamically or send a detailed direct enquiry using the Contact Us form!
        </div>

      </div>
    </motion.div>
  );
}
