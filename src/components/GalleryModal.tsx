import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";
import type { GalleryItem } from "../types/site";
import { requestContactIntent } from "../hooks/useContactIntent";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  theme: "v1" | "v2";
}

export function GalleryModal({ item, onClose, theme }: GalleryModalProps) {
  const { scrollTo } = useSmoothScroll();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useBodyScrollLock(Boolean(item));

  useEffect(() => {
    if (!item) {
      return;
    }

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [item]);

  if (!item) return null;

  const isV1 = theme === "v1";
  const titleId = `case-modal-title-${item.id}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto p-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] sm:items-center sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`absolute inset-0 transition-all duration-300 ${
            isV1 
              ? "bg-black/95 backdrop-blur-md" 
              : "bg-[#091423]/80 backdrop-blur-sm"
          }`}
        />

        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-md border shadow-2xl sm:max-h-[calc(100dvh-3rem)] md:h-[80dvh] md:flex-row ${
            isV1 
              ? "bg-[var(--color-graphite)] border-white/10 text-white" 
              : "bg-[#F0F1F4] border-[#091423] text-[#091423] border-[2px]"
          }`}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={`absolute top-4 right-4 z-50 p-2.5 rounded-full transition-all duration-300 active:scale-90 border ${
              isV1
                ? "bg-black/40 hover:bg-white/10 border-white/5 text-white"
                : "bg-white/80 hover:bg-[#091423] hover:text-white border-[#091423] text-[#091423]"
            }`}
            data-cursor="interactive"
            aria-label="Закрыть окно"
          >
            <X className="h-5 w-5" />
          </button>

          <div className={`relative flex h-[38dvh] max-h-[320px] items-center justify-center overflow-hidden bg-black md:h-full md:max-h-none md:w-3/5 ${
            !isV1 && "border-b md:border-b-0 md:border-r border-[#091423]"
          }`}>
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="eager"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            {isV1 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 pointer-events-none" />
            )}
          </div>

          <div className={`flex min-h-0 flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8 md:h-full md:w-2/5 md:p-10 ${
            isV1 ? "scrollbar-none" : "scrollbar-thin"
          }`}>
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className={`px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                  isV1 
                    ? "bg-white/5 text-[var(--color-brass)] border border-white/10" 
                    : "bg-[#091423]/10 text-[#091423]"
                }`}>
                  {item.category}
                </span>
                <span className="text-[10px] font-mono opacity-30">
                </span>
              </div>

              <h3 className={`mt-6 font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-tight tracking-tight ${
                isV1 ? "text-white" : "text-[#091423]"
              }`} id={titleId}>
                {item.title}
              </h3>

              <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                isV1 ? "text-white/60" : "text-[#091423]/70"
              }`}>
                {item.description}
              </p>

              <div className="mt-8 space-y-5 text-xs">
                {item.task && (
                  <div className={`border-l-2 pl-4 ${isV1 ? "border-[var(--color-brass)]/30" : "border-[#091423]/25"}`}>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                      isV1 ? "text-white/40" : "opacity-50"
                    }`}>
                      цель проекта //
                    </span>
                    <p className={`mt-1 font-semibold leading-relaxed ${isV1 ? "text-white/90" : "text-[#091423]"}`}>
                      {item.task}
                    </p>
                  </div>
                )}

                {item.materials && (
                  <div className={`border-l-2 pl-4 ${isV1 ? "border-[var(--color-brass)]/30" : "border-[#091423]/25"}`}>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                      isV1 ? "text-white/40" : "opacity-50"
                    }`}>
                      материалы //
                    </span>
                    <p className={`mt-1 leading-relaxed ${isV1 ? "text-white/90" : "text-[#091423]/80"}`}>
                      {item.materials}
                    </p>
                  </div>
                )}

                {item.scope && (
                  <div className={`border-l-2 pl-4 ${isV1 ? "border-[var(--color-brass)]/30" : "border-[#091423]/25"}`}>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                      isV1 ? "text-white/40" : "opacity-50"
                    }`}>
                      объем работ //
                    </span>
                    <p className={`mt-1 leading-relaxed ${isV1 ? "text-white/90" : "text-[#091423]/80"}`}>
                      {item.scope}
                    </p>
                  </div>
                )}

                {item.result && (
                  <div className={`border-l-2 pl-4 ${isV1 ? "border-[var(--color-brass)]/30" : "border-[#091423]/25"}`}>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                      isV1 ? "text-[var(--color-lime)]" : "text-[#091423] opacity-60"
                    }`}>
                      результат //
                    </span>
                    <p className={`mt-1 font-bold leading-relaxed flex items-start gap-1.5 ${
                      isV1 ? "text-[var(--color-lime)]" : "text-[#091423]"
                    }`}>
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {item.result}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={`mt-10 pt-6 border-t ${isV1 ? "border-white/5" : "border-[#091423]/10"}`}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  scrollTo("#contact", { offset: isV1 ? -72 : -50 });
                  window.setTimeout(() => {
                    requestContactIntent(`Здравствуйте! Хочу обсудить аналогичное решение для проекта: ${item.title}.\n`);
                  }, 450);
                }}
                className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] ${
                  isV1
                    ? "bg-[var(--color-brass)] hover:bg-white text-black hover:text-black border border-[var(--color-brass)]"
                    : "bg-[#091423] hover:bg-[#091423]/90 text-white border border-[#091423]"
                }`}
                data-cursor="interactive"
              >
                обсудить аналогичное изделие
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
