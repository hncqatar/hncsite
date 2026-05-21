import React, { useState } from "react";
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer({ setCurrentView }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleNavLink = (e, targetView, anchorId) => {
    e.preventDefault();
    if (setCurrentView) {
      setCurrentView(targetView);
    }
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
    <footer className="relative bg-gradient-to-b from-[#050B1F] to-black text-white/60 border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#EF233C]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-[#FFB74D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">

              {/* Logo */}
              <div 
                onClick={(e) => handleNavLink(e, "landing")}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white p-0.5 shadow-md overflow-hidden relative group/footerlogo transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src="/images/logo/HNC LOGO.jpg"
                  alt="HOTNCOOL Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <span 
                onClick={(e) => handleNavLink(e, "landing")}
                className="text-lg font-black tracking-tight bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent cursor-pointer"
              >
                HOTNCOOL
              </span>
            </div>

            <p className="text-sm text-white/40 leading-relaxed">
              HOTNCOOL has been delivering authentic traditional flavors with
              modern dining experiences since 1991, driven by quality,
              innovation, and authenticity — now powered by the latest
              technology-enabled 24×7 delivery application for seamless
              customer convenience.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-white/50 font-medium">

              {/* Address */}
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EF233C]" />
                <span>Furousiya Street, Al Rayyan, Doha, Qatar</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <a
                  href="tel:+97444502029"
                  className="hover:text-white transition-colors duration-300"
                >
                  +974 44502029
                </a>

                <span>/</span>

                <a
                  href="tel:+97430838006"
                  className="hover:text-white transition-colors duration-300"
                >
                  +974 30838006
                </a>
              </div>

              {/* Email Clickable */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-500" />

                <a
                  href="mailto:info@hnccafe.com?subject=HOTNCOOL%20Enquiry&body=Hello%20HOTNCOOL%20Team,"
                  className="hover:text-white transition-colors duration-300"
                >
                  info@hnccafe.com
                </a>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6">
              Our Specialties
            </h3>

            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <a
                  href="#specialties"
                  onClick={(e) => handleNavLink(e, "landing", "specialties")}
                  className="hover:text-white transition-colors duration-300"
                >
                  Rice Meals & Biryani
                </a>
              </li>

              <li>
                <a
                  href="#specialties"
                  onClick={(e) => handleNavLink(e, "landing", "specialties")}
                  className="hover:text-white transition-colors duration-300"
                >
                  Grills & BBQ Skewers
                </a>
              </li>

              <li>
                <a
                  href="#specialties"
                  onClick={(e) => handleNavLink(e, "landing", "specialties")}
                  className="hover:text-white transition-colors duration-300"
                >
                  Italian & Indo-Chinese
                </a>
              </li>

              <li>
                <a
                  href="#specialties"
                  onClick={(e) => handleNavLink(e, "landing", "specialties")}
                  className="hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span>Fresh Juices & Mojitos</span>

                  <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Raw
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Info */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6">
              Corporate Info
            </h3>

            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <a
                  href="#find-us"
                  onClick={(e) => handleNavLink(e, "find-us")}
                  className="hover:text-white transition-colors duration-300 font-semibold text-[#EF233C]"
                >
                  60+ Branches & 15+ Kiosks
                </a>
              </li>

              <li>
                <a
                  href="#details"
                  onClick={(e) => handleNavLink(e, "landing", "details")}
                  className="hover:text-white transition-colors duration-300"
                >
                  Multi-cuisine Restaurant Chain
                </a>
              </li>

              <li>
                <a
                  href="#details"
                  onClick={(e) => handleNavLink(e, "landing", "details")}
                  className="hover:text-white transition-colors duration-300"
                >
                  Online Delivery Integration
                </a>
              </li>

              <li>
                <a
                  href="#details"
                  onClick={(e) => handleNavLink(e, "landing", "details")}
                  className="hover:text-white transition-colors duration-300"
                >
                  Catering & Campus Services
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-sm font-bold tracking-widest uppercase">
              Join the Taste Revolution
            </h3>

            <p className="text-sm text-white/40 leading-relaxed">
              For more enquiries, partnership opportunities, or to explore our
              menu and services, please contact us.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold transition-all duration-500">
                <ShieldCheck className="w-5 h-5" />
                <span>You're in! Welcome to the Circle.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="relative flex items-center"
              >
                <input
                  type="email"
                  placeholder="Enter your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#EF233C] focus:bg-white/10 transition-all duration-300"
                />

                <button
                  type="submit"
                  className="absolute right-2 p-2 bg-gradient-to-r from-[#EF233C] to-orange-500 text-white rounded-lg hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/30 font-medium">

          <p>© HNC GROUP WLL. All rights reserved.</p>

          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>

            <div className="flex items-center gap-1.5 text-white/40">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>GCC • INDIA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}