import { ArrowUpRight } from "lucide-react";
import { capabilityItems } from "../../data/siteContent";
import { requestContactIntent } from "../../hooks/useContactIntent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { SectionReveal } from "../SectionReveal";

export function CapabilitiesV2() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="capabilities" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative">
      
      <div className="grid lg:grid-cols-2 border-b border-[#091423]">
        <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 03 // MILLWORK CAPABILITIES ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Архитектурная столярка & millwork
            </h2>
          </SectionReveal>
        </div>
        <div className="p-6 md:p-10 lg:p-14 flex items-end">
          <SectionReveal>
            <p className="text-sm md:text-base leading-[1.6] text-[#091423]/80 max-w-xl">
              Интегрируем дерево с металлом, стеклом, камнем и композитными материалами. Выполняем полный комплекс работ от чертежей КД до шеф-монтажа на объекте в Москве и по всей России.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {capabilityItems.map((item, index) => {
          const borderRight = (index + 1) % 4 !== 0 ? "lg:border-r border-[#091423]" : "";
          const borderRightSm = (index + 1) % 2 !== 0 ? "sm:border-r border-[#091423]" : "";
          const borderBottomReset = index >= 6 ? "sm:border-b-0" : "";
          const borderBottomResetLg = index >= 4 ? "lg:border-b-0" : "";

          return (
            <div
              key={item.id}
              className={`p-6 md:p-8 flex flex-col justify-between min-h-[300px] border-b border-[#091423] last:border-b-0 ${borderRight} ${borderRightSm} ${borderBottomReset} ${borderBottomResetLg}`}
            >
              <SectionReveal delay={index * 0.04}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono opacity-50 block font-bold">
                  </span>
                  <span className="text-[9px] font-mono text-[#091423] opacity-40">
                    ID: {item.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg md:text-xl font-semibold uppercase leading-tight text-[#091423]">
                  {item.title}
                </h3>
                
                <p className="mt-3 text-xs md:text-sm leading-6 text-[#091423]/60">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-[#091423]/10">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#091423]/40 block">
                    материалы:
                  </span>
                  <p className="mt-1 text-xs text-[#091423]/70 font-semibold italic">
                    {item.materials}
                  </p>
                </div>
              </SectionReveal>

              <div className="mt-8 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    scrollTo("#contact", { offset: -50 });
                    window.setTimeout(() => {
                      requestContactIntent(`Здравствуйте! Интересует производство: ${item.title}.\n`);
                    }, 450);
                  }}
                  className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#091423] hover:text-[#091423]/60 transition duration-300 border-b border-[#091423] pb-0.5"
                  data-cursor="interactive"
                >
                  оценить проект
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
