import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { galleryItems } from "../../data/siteContent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { ButtonV2 } from "./ButtonV2";
import { SectionReveal } from "../SectionReveal";

// Technical category filter definitions
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
    <section id="gallery" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative">
      
      {/* Title block grid */}
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

      {/* ACCESSIBLE FILTER BUTTONS BAR (Atoll style: dark navy/light gray) */}
      <div className="p-6 md:px-10 lg:px-14 border-b border-[#091423] flex flex-wrap items-center gap-3">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
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

      {/* PORTFOLIO GRID: Horizontally bordered row panels */}
      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              className="grid lg:grid-cols-2 border-b border-[#091423] last:border-b-0"
            >
              
              {/* Left Column: Rich case study text details */}
              <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423] flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#091423]/10">
                    <span className="bg-[#091423]/10 px-3 py-1 rounded-[3px] text-[10px] font-bold uppercase tracking-wider text-[#091423]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono opacity-40">
                      // SPEC_REF_{item.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-3xl md:text-4xl lg:text-5xl font-normal uppercase leading-tight tracking-tight text-[#091423]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-xs md:text-sm leading-6 text-[#091423]/60">
                    {item.description}
                  </p>

                  {/* Blueprint Specifications Grid */}
                  <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-5 text-xs">
                    <div className="border-l-2 border-[#091423]/25 pl-4.5">
                      <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                        цель проекта //
                      </span>
                      <p className="mt-1.5 text-[#091423] leading-5 font-semibold">
                        {item.task}
                      </p>
                    </div>

                    <div className="border-l-2 border-[#091423]/25 pl-4.5">
                      <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                        материалы //
                      </span>
                      <p className="mt-1.5 text-[#091423] leading-5 font-semibold">
                        {item.materials}
                      </p>
                    </div>

                    <div className="border-l-2 border-[#091423]/25 pl-4.5">
                      <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block">
                        объем работ //
                      </span>
                      <p className="mt-1.5 text-[#091423] leading-5 font-semibold">
                        {item.scope}
                      </p>
                    </div>

                    <div className="border-l-2 border-[#091423]/25 pl-4.5">
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
                      setTimeout(() => {
                        const messageTextarea = document.getElementsByName("message")[0] as HTMLTextAreaElement;
                        if (messageTextarea) {
                          messageTextarea.value = `Здравствуйте! Хочу обсудить аналогичное решение для проекта: ${item.title}.\n`;
                          messageTextarea.focus();
                        }
                      }, 800);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Обсудить аналогичное изделие
                  </ButtonV2>
                </div>

              </div>

              {/* Right Column: Full-size project image */}
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover grayscale transition duration-700 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 pointer-events-none border-t border-[#091423]/20" />
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
