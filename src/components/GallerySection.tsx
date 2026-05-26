import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryItems } from "../data/siteContent";
import { GalleryCard } from "./GalleryCard";
import { SectionReveal } from "./SectionReveal";

// Technical category filter definitions
const filters = [
  { id: "all", label: "Все" },
  { id: "private", label: "Частные интерьеры", category: "Private Interior" },
  { id: "horeca", label: "HoReCa", categories: ["HoReCa", "Hospitality"] },
  { id: "retail", label: "Retail", category: "Retail" },
  { id: "materials", label: "Детали / материалы", category: "Details / Materials" },
];

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Determine if a gallery item matches the active filter
  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === "all") return true;
    const filterConfig = filters.find((f) => f.id === activeFilter);
    if (!filterConfig) return true;

    if (filterConfig.categories) {
      return filterConfig.categories.includes(item.category);
    }
    return item.category === filterConfig.category;
  });

  return (
    <section id="gallery" className="section-rule py-[var(--section-space)] bg-[var(--color-black)]">
      <div className="page-grid">
        <div className="grid grid-cols-12 gap-y-8">
          <SectionReveal className="col-span-12 lg:col-span-6">
            <p className="section-kicker">кейсы и объекты</p>
            <h2 className="section-title max-w-[12ch] text-white">
              Реализованные объекты.
            </h2>
          </SectionReveal>

          <SectionReveal className="col-span-12 lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="section-copy max-w-xl text-[var(--color-muted)]">
              Каждое изделие — это решенная инженерная задача. Показываем не просто красивые ракурсы готовых интерьеров, а детально описываем материалы, объемы работ и полученный результат.
            </p>
          </SectionReveal>
        </div>

        {/* ACCESSIBLE FILTER BUTTONS BAR */}
        <SectionReveal className="mt-12 flex flex-wrap items-center gap-3 border-b border-white/5 pb-6">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 border ${
                  isActive
                    ? "bg-[var(--color-brass)] text-black border-[var(--color-brass)]"
                    : "bg-[var(--color-graphite)] text-white/60 border-white/5 hover:text-white hover:border-white/20"
                }`}
                data-cursor="interactive"
              >
                {filter.label}
              </button>
            );
          })}
        </SectionReveal>

        {/* GALLERY GRID */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[7.5rem]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
