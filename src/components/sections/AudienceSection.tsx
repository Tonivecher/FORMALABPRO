import { ArrowUpRight } from "lucide-react";
import { audienceSegments } from "../../data/siteContent";
import { requestContactIntent } from "../../hooks/useContactIntent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { SectionReveal } from "../SectionReveal";

export function AudienceSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="audience" className="section-rule py-[var(--section-space)] bg-[var(--color-black)]">
      <div className="page-grid">
        <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-6 lg:items-end">
          <SectionReveal className="min-w-0">
            <p className="section-kicker">для кого мы производим</p>
            <h2 className="section-title max-w-full xl:max-w-[13ch]">
              Инженерия под ваши сценарии.
            </h2>
          </SectionReveal>

          <SectionReveal className="min-w-0">
            <p className="section-copy max-w-none text-[var(--color-muted)]">
              Мы не просто изготавливаем мебель — мы создаем архитектурные узлы, встроенные системы и износостойкое коммерческое наполнение. Позиционируем себя как надежного партнера, говорящего на языке чертежей и проектной дисциплины.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {audienceSegments.map((segment, index) => (
            <SectionReveal
              key={segment.id}
              delay={index * 0.08}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-white/5 bg-[var(--color-graphite)] p-6 md:p-8 transition-all duration-500 hover:border-white/15"
            >
              <div className="absolute top-6 right-6 font-display text-sm text-[var(--color-lime)] opacity-60">
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl tracking-tight text-white group-hover:text-[var(--color-brass)] transition-colors duration-300">
                  {segment.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/60 min-h-[4rem]">
                  {segment.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-white/5 pt-6">
                  {segment.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brass)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    scrollTo("#contact", { offset: -72 });
                    setTimeout(() => {
                      requestContactIntent({
                        projectType: segment.id === "architects" ? "other" : segment.id === "residential" ? "private" : segment.id,
                      });
                    }, 800);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brass)] hover:text-white transition duration-300"
                  data-cursor="interactive"
                >
                  Обсудить {segment.id === "architects" ? "проект" : segment.id === "residential" ? "частный объект" : segment.id === "horeca" ? "HoReCa заказ" : "ритейл"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,transparent_0%,rgba(197,164,109,0.3)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
