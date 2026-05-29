import { ArrowUpRight } from "lucide-react";
import { audienceSegments } from "../../data/siteContent";
import { requestContactIntent } from "../../hooks/useContactIntent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { SectionReveal } from "../SectionReveal";

export function AudienceV2() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="audience" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative">
      
      <div className="grid lg:grid-cols-2 border-b border-[#091423]">
        <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 02 // SECTORS & CLIENTS ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Инженерия под ваши сценарии.
            </h2>
          </SectionReveal>
        </div>
        <div className="p-6 md:p-10 lg:p-14 flex items-end">
          <SectionReveal>
            <p className="text-sm md:text-base leading-[1.6] text-[#091423]/80 max-w-xl">
              Мы не просто изготавливаем мебель — мы создаем архитектурные узлы, встроенные системы и износостойкое коммерческое наполнение. Позиционируем себя как надежного партнера, говорящего на языке чертежей и проектной дисциплины.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {audienceSegments.map((segment, index) => (
          <div
            key={segment.id}
            className={`p-6 md:p-10 lg:p-14 flex flex-col justify-between min-h-[360px] border-b border-[#091423] ${
              index % 2 === 0 ? "md:border-r" : ""
            } ${
              index >= 2 ? "md:border-b-0" : ""
            } ${
              index === 3 ? "border-b-0" : ""
            }`}
          >
            <SectionReveal delay={index * 0.05}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono opacity-50 font-bold block">
                </span>
                <span className="text-[10px] font-mono text-[var(--color-lime)] bg-[#091423] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  {segment.id}
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl md:text-3xl font-normal uppercase tracking-tight leading-none text-[#091423]">
                {segment.title}
              </h3>
              
              <p className="mt-4 text-xs md:text-sm leading-[1.6] text-[#091423]/70 max-w-xl">
                {segment.description}
              </p>

              <ul className="mt-6 space-y-3.5 border-t border-[#091423]/10 pt-6">
                {segment.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-semibold text-[#091423]/80 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 bg-[#091423]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <div className="mt-10 pt-4">
              <button
                type="button"
                onClick={() => {
                  scrollTo("#contact", { offset: -50 });
                  setTimeout(() => {
                    requestContactIntent({
                      projectType: segment.id === "architects" ? "other" : segment.id === "residential" ? "private" : segment.id,
                    });
                  }, 800);
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#091423] hover:text-[#091423]/60 transition duration-300 border-b border-[#091423] pb-1"
                data-cursor="interactive"
              >
                Обсудить проект
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
