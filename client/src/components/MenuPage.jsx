import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { menuItems } from "../data/menuItems";

const categories = ["All", "Rice", "Grills", "Sandwiches", "Pizza", "Juices", "Pasta"];

export default function MenuSection() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    if (category === "All") return menuItems;
    return menuItems.filter((item) => item.category === category);
  }, [category]);

  return (
    <section id="menu" className="section-pad">
      <div className="container-hnc">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-brand-red">Menu</p>
            <h2 className="text-4xl font-black sm:text-5xl">Popular HOTNCOOL items</h2>
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
                  category === cat ? "bg-brand-red text-white" : "bg-white/10 text-white/60 hover:bg-white/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, index) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="glass-card group overflow-hidden rounded-[2rem]"
            >
              <div className="relative h-60 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute left-4 top-4 rounded-full bg-brand-red px-4 py-2 text-xs font-black">{item.category}</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{item.name}</h3>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm font-black text-brand-gold">{item.price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/55">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
