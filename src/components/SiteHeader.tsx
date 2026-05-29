import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navItems, studioName } from "../data/siteContent";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { MagneticButton } from "./MagneticButton";

interface SiteHeaderProps {
  isDesktopView?: boolean;
  setIsDesktopView?: (val: boolean) => void;
}

export function SiteHeader({ isDesktopView = false, setIsDesktopView }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
          isScrolled || isMobileMenuOpen ? "bg-black/76 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="page-grid grid grid-cols-12 items-center gap-4 py-5">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollTo(0, { immediate: true });
            }}
            className="col-span-8 flex min-w-0 flex-col items-start text-left md:col-span-4 z-50"
            aria-label="Вернуться к началу страницы"
            data-cursor="interactive"
          >
            <span className="text-[0.65rem] uppercase tracking-[0.42em] text-white/40">
              premium furniture atelier
            </span>
            <span className="mt-2 truncate font-display text-xl tracking-[-0.06em] text-white md:text-2xl">
              {studioName}
            </span>
          </button>

          <nav
            className={`col-span-4 items-center justify-center gap-8 md:col-span-5 md:flex xl:gap-10 ${
              isDesktopView
                ? "flex flex-wrap col-span-12 py-3 justify-center border-t border-white/5 mt-3 sm:border-0 sm:mt-0 sm:col-span-4 sm:flex"
                : "hidden"
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(`#${item.id}`, { offset: -80 })}
                className="relative text-[0.72rem] uppercase tracking-[0.34em] text-white/54 transition duration-300 ease-editorial hover:text-white"
                data-cursor="interactive"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="col-span-4 flex justify-end md:col-span-3 z-50">
            <div className="hidden md:flex">
              <MagneticButton
                type="button"
                onClick={() => scrollTo("#contact", { offset: -72 })}
                className="px-4 md:px-6"
              >
                Обсудить
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white md:hidden hover:border-white/30 transition-colors duration-300 active:scale-95"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              data-cursor="interactive"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.6} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-32 pb-8 md:hidden"
          >
            <div className="flex justify-between text-[9px] font-mono tracking-widest text-white/30 uppercase border-b border-white/5 pb-4">
              <span>55°45′N 37°37′E // MOSCOW</span>
              <span>MENU // REV_1.2</span>
            </div>

            <nav className="flex flex-col gap-5 my-auto">
              {navItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, ease: "easeOut" }}
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollTo(`#${item.id}`, { offset: -80 });
                  }}
                  className="text-left font-display text-3xl tracking-wide text-white/70 hover:text-white transition duration-300 flex items-center justify-between border-b border-white/5 pb-3 active:text-[var(--color-brass)]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-[var(--color-lime)] opacity-60">// 0{index + 1}</span>
                </motion.button>
              ))}
            </nav>

            <div className="space-y-6 pt-6 border-t border-white/5">
              {setIsDesktopView && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsDesktopView(!isDesktopView);
                  }}
                  className="w-full flex items-center justify-between border border-[var(--color-brass)]/20 bg-white/[0.02] px-4 py-3.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--color-brass)] hover:bg-white/[0.04] active:scale-98 transition-all duration-300"
                >
                  <span>РЕЖИМ ОТОБРАЖЕНИЯ: {isDesktopView ? "DESKTOP" : "MOBILE"}</span>
                  <span className="flex items-center gap-1">СМЕНИТЬ 🔄</span>
                </button>
              )}

              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono tracking-widest text-[var(--color-brass)] uppercase font-bold">
                  ПРЕМИАЛЬНОЕ МЕБЕЛЬНОЕ АТЕЛЬЕ
                </span>
                <span className="text-xs text-white/50 leading-relaxed uppercase tracking-wider">
                  Инженерия, производство, монтаж в одном контуре.
                </span>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollTo("#contact", { offset: -72 });
                }}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brass)] text-black px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest active:scale-97 transition duration-200"
              >
                Обсудить проект
                <ArrowUpRight className="h-4 w-4 text-black" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
