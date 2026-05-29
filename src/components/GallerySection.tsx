import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "../data/siteContent";
import { GalleryCard } from "./GalleryCard";
import { SectionReveal } from "./SectionReveal";
import { GalleryModal } from "./GalleryModal";
import type { GalleryItem } from "../types/site";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const pct = (el.scrollLeft / maxScroll) * 100;
    setScrollProgress(pct);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // Get all card elements
    const cards = Array.from(el.children).filter(
      (child) => child instanceof HTMLElement
    ) as HTMLElement[];

    if (cards.length === 0) return;

    const currentScroll = el.scrollLeft;
    const containerWidth = el.clientWidth;
    let targetScroll = currentScroll;

    // Determine padding offset based on screen width
    const padding = window.innerWidth >= 640 ? 32 : 16;

    if (direction === "right") {
      // Find the first card that is currently to the right of the visible viewport start
      const nextCard = cards.find((card) => card.offsetLeft > currentScroll + padding + 10);
      if (nextCard) {
        targetScroll = nextCard.offsetLeft - padding;
      } else {
        targetScroll = currentScroll + containerWidth * 0.75;
      }
    } else {
      // Find the first card to the left of the visible viewport start
      const prevCard = [...cards]
        .reverse()
        .find((card) => card.offsetLeft < currentScroll - padding - 10);
      if (prevCard) {
        targetScroll = prevCard.offsetLeft - padding;
      } else {
        targetScroll = 0;
      }
    }

    // Clamp scroll bounds
    const maxScroll = el.scrollWidth - containerWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Reset scroll and progress bar on filter change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setScrollProgress(0);
    }
  }, [activeFilter]);

  return (
    <section id="gallery" className="section-rule py-[var(--section-space)] bg-[var(--color-black)] overflow-hidden">
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
        <SectionReveal className="mt-12 flex items-center justify-between border-b border-white/5 pb-6">
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </SectionReveal>

        {/* HORIZONTAL SNAP SCROLL VIEWPORT WITH OVERLAY ARROWS */}
        <div className="relative mt-12 group/gallery">
          
          {/* OVERLAY NAVIGATION - LEFT ARROW */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/85 hover:bg-black backdrop-blur-md border border-white/20 hidden md:flex items-center justify-center text-white hover:text-[var(--color-brass)] transition-all duration-300 active:scale-90 shadow-[0_8px_32px_rgba(0,0,0,0.8)] opacity-95 hover:opacity-100"
            data-cursor="interactive"
            aria-label="Листать назад"
          >
            <ChevronLeft className="h-6 w-6 text-white" strokeWidth={2.5} />
          </button>

          {/* OVERLAY NAVIGATION - RIGHT ARROW */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/85 hover:bg-black backdrop-blur-md border border-white/20 hidden md:flex items-center justify-center text-white hover:text-[var(--color-brass)] transition-all duration-300 active:scale-90 shadow-[0_8px_32px_rgba(0,0,0,0.8)] opacity-95 hover:opacity-100"
            data-cursor="interactive"
            aria-label="Листать вперед"
          >
            <ChevronRight className="h-6 w-6 text-white" strokeWidth={2.5} />
          </button>

          {/* HORIZONTAL SNAP SCROLL CONTAINER */}
          <motion.div
            layout
            ref={scrollRef}
            onScroll={handleScroll}
            data-lenis-prevent
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-thin select-none"
            style={{
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none", // For IE
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} onOpen={setSelectedItem} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* HORIZONTAL PROGRESS BAR INDICATOR */}
        <div className="mt-6 h-[2px] w-full bg-white/5 rounded overflow-hidden relative">
          <div
            className="absolute h-full left-0 top-0 bg-[var(--color-brass)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* CASE DETAIL OVERLAY MODAL */}
      <GalleryModal theme="v1" item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
