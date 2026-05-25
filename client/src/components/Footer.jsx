import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 px-5 py-12 sm:px-6 lg:px-8">
      <div className="container-hnc grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1">
              <img src="/images/logo/HNC LOGO.jpg" alt="HOTNCOOL" className="h-full w-full rounded-xl object-contain" />
            </span>
            <span className="text-2xl font-black brand-gradient">HOTNCOOL</span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            HOTNCOOL has been delivering authentic traditional flavors with modern dining experiences since 1991.
          </p>
        </div>

        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/50">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#locations">Locations</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>

        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/50">
            <p className="flex gap-2"><MapPin size={16} /> Doha, Qatar</p>
            <p className="flex gap-2"><Phone size={16} /> +974 44502029</p>
            <p className="flex gap-2"><Mail size={16} /> info@hnccafe.com</p>
          </div>
        </div>
      </div>

      <div className="container-hnc mt-10 border-t border-white/10 pt-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-white/35">
        HNC Group Copyright Reserved
      </div>
    </footer>
  );
}
