import { motion } from "framer-motion";
import { Flame, CupSoda, Pizza, UtensilsCrossed } from "lucide-react";

const items = [
  {
    title: "Rice & Dum Biryani",
    text: "Fragrant rice, rich spices and authentic slow-cooked flavor.",
    image: "/images/food/rice.png",
    icon: UtensilsCrossed,
  },
  {
    title: "Charcoal Grills",
    text: "Freshly marinated grills, kebabs and BBQ favorites.",
    image: "/images/food/grills.png",
    icon: Flame,
  },
  {
    title: "Pizza & Pasta",
    text: "Creamy sauces, fresh toppings and family-friendly comfort meals.",
    image: "/images/food/pasta.png",
    icon: Pizza,
  },
  {
    title: "Juices & Mojitos",
    text: "Fresh fruit drinks, mojitos and refreshing coolers.",
    image: "/images/food/drinks.png",
    icon: CupSoda,
  },
];

export default function SpecialtiesGrid() {
  return (
    <section className="section-pad">
      <div className="container-hnc">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-brand-red">Our Specialities</p>
          <h2 className="text-4xl font-black sm:text-5xl">Crafted for every craving</h2>
          <p className="mt-4 text-white/60">A premium menu experience designed with taste, speed and consistency.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group glass-card overflow-hidden rounded-[2rem]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 rounded-2xl bg-brand-red p-3">
                    <Icon size={22} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{item.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
