import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, studioName } from "../../data/siteContent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { ButtonV2 } from "./ButtonV2";

interface SiteHeaderV2Props {
  currentVersion: "v1" | "v2";
  onToggleVersion: () => void;
}

export function SiteHeaderV2({ currentVersion, onToggleVersion }: SiteHeaderV2Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#F0F1F4]/95 backdrop-blur-md border-b border-[#091423]"
            : "bg-[#F0F1F4] border-b border-[#091423]/25"
        } text-[#091423]`}
      >
        <div className="page-grid grid grid-cols-12 items-center gap-4 py-4.5">
          
          {/* LOGO */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollTo(0, { immediate: true });
            }}
            className="col-span-8 flex flex-col items-start text-left md:col-span-4 z-50"
            aria-label="Вернуться к началу"
            data-cursor="interactive"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40 font-bold">
              PREMIUM MILLWORK LAB
            </span>
            <span className="mt-1 font-display text-lg md:text-xl font-semibold uppercase tracking-tight leading-none text-[#091423]">
              {studioName}
            </span>
          </button>

          {/* NAVIGATION LINKS (desktop navigation) */}
          <nav className="col-span-4 hidden items-center justify-center gap-6 md:col-span-5 md:flex xl:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(`#${item.id}`, { offset: -60 })}
                className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-[#091423]/70 hover:text-[#091423] transition duration-300"
                data-cursor="interactive"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="col-span-4 flex justify-end items-center gap-4 md:col-span-3 z-50">
            {/* Desktop Version Switcher */}
            <button
              type="button"
              onClick={onToggleVersion}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[#091423]/20 bg-[#091423]/5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#091423] hover:bg-[#091423]/10 transition-colors duration-300"
              data-cursor="interactive"
              title="Переключить версию дизайна страницы"
            >
              VER: {currentVersion.toUpperCase()} 🔄
            </button>

            <div className="hidden md:flex">
              <ButtonV2
                variant="primary"
                onClick={() => scrollTo("#contact", { offset: -50 })}
                className="px-4 py-2 min-h-[38px] !text-[10px] tracking-widest"
              >
                БРИФ
              </ButtonV2>
            </div>

            {/* Mobile Hamburger toggle button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center border border-[#091423] bg-[#091423]/5 text-[#091423] md:hidden hover:bg-[#091423]/10 active:scale-95 transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              data-cursor="interactive"
            >
              {isMobileMenuOpen ? (
                <X className="h-4.5 w-4.5" strokeWidth={1.8} />
              ) : (
                <Menu className="h-4.5 w-4.5" strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* TECHNICAL MONOSPACE MOBILE SLIDE-DOWN MENU (V2 Light Theme) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-40 bg-[#F0F1F4] border-b border-[#091423] pt-24 pb-8 px-6 flex flex-col justify-between md:hidden min-h-[75vh]"
          >
            {/* Top coordinate stats banner */}
            <div className="flex justify-between border-b border-[#091423]/10 pb-3 text-[9px] font-mono text-[#091423]/50 tracking-[0.2em] font-bold uppercase mt-4">
              <span>EF // MILLWORK LAB</span>
              <span>GRID_MOBILE // V2.0</span>
            </div>

            {/* Structured Monospace Numbered Links */}
            <nav className="flex flex-col border-b border-[#091423]/10 my-6">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollTo(`#${item.id}`, { offset: -60 });
                  }}
                  className="w-full text-left py-3.5 border-t border-[#091423]/10 flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-widest text-[#091423]/70 active:text-[#091423] active:bg-[#091423]/5 transition duration-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="opacity-45">0{index + 1} //</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="opacity-35">➔</span>
                </button>
              ))}
            </nav>

            {/* Bottom Actions & Switcher */}
            <div className="space-y-4 pt-2">
              {/* Monospace Interactive Version Toggle Control */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onToggleVersion();
                }}
                className="w-full flex items-center justify-between border border-[#091423] bg-[#091423]/5 px-4 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#091423] hover:bg-[#091423]/10 active:scale-98 transition-all duration-300"
              >
                <span>СМЕНИТЬ КОНЦЕПЦИЮ (ТЕКУЩАЯ: V2)</span>
                <span className="flex items-center gap-1">V1 🔄</span>
              </button>

              <ButtonV2
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollTo("#contact", { offset: -50 });
                }}
                className="w-full py-4 !text-[11px] font-bold tracking-widest min-h-[48px]"
              >
                ЗАПОЛНИТЬ ПРОЕКТНЫЙ БРИФ ➔
              </ButtonV2>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
