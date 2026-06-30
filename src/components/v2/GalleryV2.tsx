import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "../../data/siteContent";
import { requestContactIntent } from "../../hooks/useContactIntent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { ButtonV2 } from "./ButtonV2";
import { SectionReveal } from "../SectionReveal";
import { GalleryModal } from "../GalleryModal";
import type { GalleryItem } from "../../types/site";

const filters = [
  { id: "all", label: "Все" },
  { id: "private", label: "Частные интерьеры", category: "Private Interior" },
  { id: "horeca", label: "HoReCa", categories: ["HoReCa", "Hospitality"] },
  { id: "retail", label: "Retail", category: "Retail" },
  { id: "materials", label: "Детали / материалы", category: "Details / Materials" },
];

export function GalleryV2() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { scrollTo } = useSmoothScroll();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setScrollProgress(0);
    scrollRef.current?.scrollTo({ left: 0 });
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const cards = Array.from(el.children).filter(
      (child) => child instanceof HTMLElement
    ) as HTMLElement[];

    if (cards.length === 0) return;

    const currentScroll = el.scrollLeft;
    const containerWidth = el.clientWidth;
    let targetScroll = currentScroll;

    if (direction === "right") {
      const nextCard = cards.find((card) => card.offsetLeft > currentScroll + 10);
      if (nextCard) {
        targetScroll = nextCard.offsetLeft;
      } else {
        targetScroll = currentScroll + containerWidth * 0.85;
      }
    } else {
      const prevCard = [...cards]
        .reverse()
        .find((card) => card.offsetLeft < currentScroll - 10);
      if (prevCard) {
        targetScroll = prevCard.offsetLeft;
      } else {
        targetScroll = 0;
      }
    }

    const maxScroll = el.scrollWidth - containerWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative overflow-hidden">
      
      <div className="grid lg:grid-cols-2 border-b border-[#091423]">
        <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 04 // CASE STUDIES PORTFOLIO ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Реализованные объекты.
            </h2>
          </SectionReveal>
        </div>
        <div className="p-6 md:p-10 lg:p-14 flex items-end">
          <SectionReveal>
            <p className="text-sm md:text-base leading-[1.6] text-[#091423]/80 max-w-xl">
              Каждое изделие — это решенная инженерная задача. Показываем не просто красивые ракурсы готовых интерьеров, а детально описываем материалы, объемы работ и полученный результат.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="p-6 md:px-10 lg:px-14 border-b border-[#091423] flex flex-wrap items-center gap-3">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-2.5 rounded-[4px] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 border ${
                isActive
                  ? "bg-[#091423] text-white border-[#091423]"
                  : "bg-transparent text-[#091423]/60 border-[#091423]/10 hover:text-[#091423] hover:border-[#091423]/30"
              }`}
              data-cursor="interactive"
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="relative group/gallery">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-[4px] bg-[#F0F1F4] hover:bg-[#091423] border-[2px] border-[#091423] hidden md:flex items-center justify-center text-[#091423] hover:text-white transition-all duration-300 active:scale-90 shadow-xl opacity-100"
          data-cursor="interactive"
          aria-label="Листать назад"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={3} />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-[4px] bg-[#F0F1F4] hover:bg-[#091423] border-[2px] border-[#091423] hidden md:flex items-center justify-center text-[#091423] hover:text-white transition-all duration-300 active:scale-90 shadow-xl opacity-100"
          data-cursor="interactive"
          aria-label="Листать вперед"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={3} />
        </button>

        <motion.div
          layout
          ref={scrollRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                className="grid lg:grid-cols-2 w-[90vw] md:w-[80vw] lg:w-[85vw] flex-shrink-0 snap-start border-r border-[#091423]"
              >
                
                <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423] flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-[#091423]/10">
                      <span className="bg-[#091423]/10 px-3 py-1 rounded-[3px] text-[10px] font-bold uppercase tracking-wider text-[#091423]">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono opacity-40">
                      </span>
                    </div>

                    <h3 className="mt-8 font-display text-3xl md:text-4xl lg:text-5xl font-normal uppercase leading-tight tracking-tight text-[#091423]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-xs md:text-sm leading-6 text-[#091423]/60">
                      {item.description}
                    </p>

                    <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-5 text-xs">
                      <div className="border-l-2 border-[#091423]/25 pl-[1.125rem]">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                          цель проекта //
                        </span>
                        <p className="mt-1.5 text-[#091423] leading-5 font-semibold">
                          {item.task}
                        </p>
                      </div>

                      <div className="border-l-2 border-[#091423]/25 pl-[1.125rem]">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                          материалы //
                        </span>
                        <p className="mt-1.5 text-[#091423] leading-5 font-semibold">
                          {item.materials}
                        </p>
                      </div>

                      <div className="border-l-2 border-[#091423]/25 pl-[1.125rem]">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                          объем работ //
                        </span>
                        <p className="mt-1.5 text-[#091423] leading-5 font-semibold">
                          {item.scope}
                        </p>
                      </div>

                      <div className="border-l-2 border-[#091423]/25 pl-[1.125rem]">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                          результат //
                        </span>
                        <p className="mt-1.5 text-[#091423] leading-5 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-[#091423] inline" />
                          {item.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#091423]/10">
                    <ButtonV2
                      variant="secondary"
                      onClick={() => {
                        scrollTo("#contact", { offset: -50 });
                        window.setTimeout(() => {
                          requestContactIntent(`Здравствуйте! Хочу обсудить аналогичное решение для проекта: ${item.title}.\n`);
                        }, 450);
                      }}
                      className="w-full sm:w-auto"
                    >
                      Обсудить аналогичное изделие
                    </ButtonV2>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[16/10] lg:aspect-auto overflow-hidden group cursor-pointer"
                  aria-label={`Открыть кейс: ${item.title}`}
                  title="Кликните, чтобы открыть в полном цвете и спецификации"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover grayscale transition duration-700 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 42vw"
                  />
                  <div className="absolute inset-0 pointer-events-none border-t border-[#091423]/20" />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="h-[4px] w-full bg-[#091423]/10 relative border-t border-[#091423]">
        <div
          className="absolute h-full left-0 top-0 bg-[#091423] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <GalleryModal theme="v2" item={selectedItem} onClose={() => setSelectedItem(null)} />

    </section>
  );
}
