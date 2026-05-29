import { ArrowUpRight } from "lucide-react";
import { capabilityItems } from "../../data/siteContent";
import { requestContactIntent } from "../../hooks/useContactIntent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { SectionReveal } from "../SectionReveal";

export function CapabilitiesSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="capabilities" className="section-rule py-[var(--section-space)] bg-[var(--color-graphite)]/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-y-0 left-[20%] w-px bg-white" />
        <div className="absolute inset-y-0 left-[40%] w-px bg-white" />
        <div className="absolute inset-y-0 left-[60%] w-px bg-white" />
        <div className="absolute inset-y-0 left-[80%] w-px bg-white" />
        <div className="absolute inset-x-0 top-[33%] h-px bg-white" />
        <div className="absolute inset-x-0 top-[66%] h-px bg-white" />
      </div>

      <div className="page-grid relative z-10">
        <div className="grid grid-cols-12 gap-y-6">
          <SectionReveal className="col-span-12 lg:col-span-6">
            <p className="section-kicker">производственные возможности</p>
            <h2 className="section-title max-w-[12ch]">
              Архитектурная столярка & millwork
            </h2>
          </SectionReveal>

          <SectionReveal className="col-span-12 lg:col-span-6 lg:self-end">
            <p className="section-copy max-w-xl text-[var(--color-muted)]">
              Интегрируем дерево с металлом, стеклом, камнем и композитными материалами. Выполняем полный комплекс работ от чертежей КД до шеф-монтажа на объекте в Москве и по всей России.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityItems.map((item, index) => (
            <SectionReveal
              key={item.id}
              delay={index * 0.06}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-white/5 bg-[var(--color-graphite)] p-5 md:p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
            >
              <div>
                <span className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-lime)] opacity-80 block">
                </span>

                <h3 className="mt-4 font-display text-lg md:text-xl tracking-tight text-white leading-tight min-h-[2.8rem]">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs md:text-sm leading-6 text-white/50">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-brass)] font-semibold">
                    базовые материалы:
                  </p>
                  <p className="mt-1 text-[11px] text-white/70 italic">
                    {item.materials}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    scrollTo("#contact", { offset: -72 });
                    window.setTimeout(() => {
                      requestContactIntent(`Здравствуйте! Интересует производство: ${item.title}.\n`);
                    }, 450);
                  }}
                  className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-white transition duration-300"
                  data-cursor="interactive"
                >
                  оценить проект
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

              <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/10 tracking-widest uppercase">
                {item.tasks[0]}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
