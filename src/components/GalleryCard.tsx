import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText, ChevronDown } from "lucide-react";
import type { GalleryItem } from "../types/site";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
}

const spanClassMap: Record<GalleryItem["span"], string> = {
  feature: "md:col-span-2 xl:col-span-7 xl:row-span-5",
  portrait: "xl:col-span-5 xl:row-span-5",
  landscape: "xl:col-span-5 xl:row-span-4",
  square: "xl:col-span-4 xl:row-span-4",
};

const aspectClassMap: Record<GalleryItem["span"], string> = {
  feature: "aspect-[5/4] xl:aspect-auto",
  portrait: "aspect-[3/4] xl:aspect-auto",
  landscape: "aspect-[16/10] xl:aspect-auto",
  square: "aspect-square xl:aspect-auto",
};

const minHeightMap: Record<GalleryItem["span"], string> = {
  feature: "min-h-[30rem] xl:h-full",
  portrait: "min-h-[30rem] xl:h-full",
  landscape: "min-h-[22rem] xl:h-full",
  square: "min-h-[22rem] xl:h-full",
};

export function GalleryCard({ item, index }: GalleryCardProps) {
  const [showMobileSpecs, setShowMobileSpecs] = useState(false);
  const { scrollTo } = useSmoothScroll();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.05, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative isolate overflow-hidden rounded-md border border-white/5 bg-[var(--color-graphite)] ${spanClassMap[item.span]}`}
    >
      <div
        className={`media-surface relative h-full w-full flex flex-col justify-between ${aspectClassMap[item.span]} ${minHeightMap[item.span]}`}
      >
        {/* Main Case Image (monochrome by default, colors on hover) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.alt}
            className="image-monochrome h-full w-full object-cover transition duration-700 ease-editorial group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,0.1)_0%,rgba(7,7,6,0.48)_50%,rgba(7,7,6,0.96)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        </div>

        {/* TOP BADGE */}
        <div className="relative z-10 p-5 md:p-6 flex justify-between items-start pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[var(--color-brass)] border border-white/5">
            {item.category}
          </span>
          <span className="text-[10px] font-mono text-white/30 hidden xl:block">
            SYS_REF // {item.id.toUpperCase()}
          </span>
        </div>

        {/* BOTTOM METADATA (visible initially) */}
        <div className="relative z-10 p-5 md:p-7 mt-auto">
          <h3 className="font-display text-2xl md:text-3xl leading-[1.05] tracking-display text-white max-w-[15ch]">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xl text-xs md:text-sm leading-6 text-white/60">
            {item.description}
          </p>

          {/* Mobile specs toggle button */}
          <button
            type="button"
            onClick={() => setShowMobileSpecs(!showMobileSpecs)}
            className="mt-4 flex xl:hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-brass)] py-1.5"
            data-cursor="interactive"
          >
            <FileText className="h-3.5 w-3.5" />
            {showMobileSpecs ? "Скрыть спецификацию" : "Спецификация кейса"}
            <ChevronDown className={`h-3.5 w-3.5 transform transition-transform ${showMobileSpecs ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* DESKTOP HOVER SPEC OVERLAY (sleek, technical, blueprint theme) */}
        <div className="absolute inset-0 z-20 bg-black/92 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 ease-editorial border border-[var(--color-brass)]/20 rounded-md hidden xl:flex">
          <div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-brass)]">
                  {item.category}
                </span>
                <h4 className="font-display text-xl text-white mt-1">
                  {item.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-white/30">
                // SPEC_CARD_{item.id.toUpperCase()}
              </span>
            </div>

            {/* Technical case details grid */}
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
              <div className="border-l border-[var(--color-brass)]/30 pl-3">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  цель проекта //
                </span>
                <p className="mt-1 text-white/80 leading-5">
                  {item.task}
                </p>
              </div>

              <div className="border-l border-[var(--color-brass)]/30 pl-3">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  материалы //
                </span>
                <p className="mt-1 text-white/80 leading-5">
                  {item.materials}
                </p>
              </div>

              <div className="border-l border-[var(--color-brass)]/30 pl-3">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  объем работ //
                </span>
                <p className="mt-1 text-white/80 leading-5">
                  {item.scope}
                </p>
              </div>

              <div className="border-l border-[var(--color-brass)]/30 pl-3">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  результат //
                </span>
                <p className="mt-1 text-[var(--color-lime)] font-medium leading-5">
                  {item.result}
                </p>
              </div>
            </div>
          </div>

          {/* CTA discussed matching objects */}
          <div className="border-t border-white/5 pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                scrollTo("#contact", { offset: -72 });
                setTimeout(() => {
                  const messageTextarea = document.getElementsByName("message")[0] as HTMLTextAreaElement;
                  if (messageTextarea) {
                    messageTextarea.value = `Здравствуйте! Хочу обсудить аналогичное решение для проекта: ${item.title}.\n`;
                    messageTextarea.focus();
                  }
                }, 800);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brass)] hover:text-white transition-colors duration-300"
              data-cursor="interactive"
            >
              обсудить аналогичное изделие
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* MOBILE SPEC ACCORDION DRAWER (renders inline inside the layout) */}
        <AnimatePresence>
          {showMobileSpecs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.3, 1] }}
              className="relative z-20 bg-black/95 p-5 border-t border-[var(--color-brass)]/30 w-full xl:hidden overflow-hidden"
            >
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-brass)] uppercase tracking-wider block">
                    ЦЕЛЬ ПРОЕКТА
                  </span>
                  <p className="mt-1 text-white/70 leading-5">{item.task}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-brass)] uppercase tracking-wider block">
                    МАТЕРИАЛЫ
                  </span>
                  <p className="mt-1 text-white/70 leading-5">{item.materials}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-brass)] uppercase tracking-wider block">
                    ОБЪЕМ РАБОТ
                  </span>
                  <p className="mt-1 text-white/70 leading-5">{item.scope}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-lime)] uppercase tracking-wider block">
                    РЕЗУЛЬТАТ
                  </span>
                  <p className="mt-1 text-[var(--color-lime)] leading-5">{item.result}</p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      scrollTo("#contact", { offset: -72 });
                      setShowMobileSpecs(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[var(--color-brass)]/20 px-3 py-2 rounded border border-[var(--color-brass)]/30 w-full justify-center"
                  >
                    Заказать такое же
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
