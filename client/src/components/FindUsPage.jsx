import { useMemo, useState } from "react";
import { MapPin, Phone, MessageCircle, Search } from "lucide-react";
import { branches } from "../data/branches";

export default function LocationsSection() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return branches.filter((branch) =>
      [branch.name, branch.address, branch.type].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="locations" className="section-pad">
      <div className="container-hnc">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-brand-red">Locations</p>
          <h2 className="text-4xl font-black sm:text-5xl">Find your nearest branch</h2>
          <p className="mt-4 text-white/60">Search HOTNCOOL branches and contact directly.</p>
        </div>

        <div className="mx-auto mb-8 flex max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
          <Search className="text-white/40" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search branch, area or service..."
            className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((branch) => (
            <article key={branch.id} className="glass-card rounded-[2rem] p-6">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-brand-gold">{branch.type}</p>
              <h3 className="text-2xl font-black">{branch.name}</h3>
              <p className="mt-3 flex gap-3 text-white/60">
                <MapPin className="mt-1 shrink-0 text-brand-red" size={18} />
                {branch.address}
              </p>
              <p className="mt-3 text-sm font-bold text-white/45">Timing: {branch.timing}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${branch.phone}`} className="btn-outline-hnc">
                  <Phone size={16} /> Call
                </a>
                <a href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="btn-outline-hnc">
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a href={branch.map} target="_blank" rel="noreferrer" className="btn-primary-hnc">
                  Map
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
