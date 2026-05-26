import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
  Clock,
  ShoppingBag,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Contact Us", href: "#contact" },
];

const contacts = [
  {
    icon: MapPin,
    label: "Furousiya Street, Al Rayyan, Doha, Qatar",
  },
  {
    icon: Phone,
    label: "+974 44502029 / +974 30838006",
  },
  {
    icon: Mail,
    label: "info@hnccafe.com",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030714] px-5 pt-20 pb-8 sm:px-6 lg:px-8">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,60,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,183,77,0.13),transparent_30%),linear-gradient(180deg,#050B1F_0%,#030714_100%)]" />

        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, -35, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-brand-red/15 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-brand-gold/10 blur-[130px]"
        />

        <div className="absolute inset-0 opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </div>

      <div className="container-hnc relative z-10">
        {/* Top CTA Bar */}
        

        {/* Footer Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-20 w-20 items-center justify-center overflow-visible"
              >
                <div className="absolute inset-0 rounded-full bg-brand-red/20 blur-2xl" />

                <img
                  src="/images/logo/logo.png"
                  alt="HOTNCOOL"
                  className="relative z-10 h-full w-full scale-[1.45] object-contain drop-shadow-[0_10px_30px_rgba(239,35,60,0.4)]"
                />
              </motion.div>

              <div>
                <p className="mt-1 text-2xl font-black tracking-[0.14em] text-white">
                  الحـــــــــار والبــــــارد
                </p>

                <h3 className="mt-1 text-2xl font-black tracking-[0.14em] text-white">
                  HOTNCOOL
                </h3>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              HOTNCOOL has been delivering authentic traditional flavors with
              modern dining experiences since 1991, driven by quality,
              innovation, and authenticity.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/50">
              <Clock size={14} className="text-brand-red" />
              Open 24 / 7
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white">
              Quick Links
            </h3>

            <div className="mt-5 grid gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-brand-gold"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red opacity-60 transition group-hover:scale-125" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16 }}
          >
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white">
              Contact
            </h3>

            <div className="mt-5 grid gap-4">
              {contacts.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 text-sm leading-6 text-white/55"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-red/15 text-brand-red">
                      <Icon size={16} />
                    </span>

                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">
            © {year} HNC GROUP WLL. All rights reserved.
          </p>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">
             <B>HOTNCOOL</B>
          </p>
        </div>
      </div>
    </footer>
  );
}