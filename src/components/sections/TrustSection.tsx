import { ShieldCheck, Layers, Eye, Users } from "lucide-react";
import { SectionReveal } from "../SectionReveal";

export function TrustSection() {
  // Real evidence value propositions
  const trustPoints = [
    {
      icon: <Layers className="h-6 w-6 text-[var(--color-brass)]" />,
      title: "Один контур ответственности",
      description: "Ведем проект от первой оценки чертежей до финишной регулировки петель на объекте. Никаких сторонних подрядчиков или разрывов коммуникации."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[var(--color-brass)]" />,
      title: "Конструкторский надзор",
      description: "Каждое изделие проходит детальную инженерную проработку КД. Наш конструктор координирует монтажные чертежи со строителями на вашей площадке."
    },
    {
      icon: <Eye className="h-6 w-6 text-[var(--color-brass)]" />,
      title: "Предварительная сборка в цеху",
      description: "Все сложные узлы, радиусные стыки и встроенные модули проходят сухую контрольную сборку на фабрике до финишной отделки."
    },
    {
      icon: <Users className="h-6 w-6 text-[var(--color-brass)]" />,
      title: "Согласование живых образцов",
      description: "Не работаем наугад. Перед раскроем подбираем листы шпона, согласовываем живые образцы тонировок, выкрасы эмалей и стыковочные швы."
    }
  ];

  return (
    <section id="trust" className="section-rule py-[var(--section-space)] bg-[var(--color-graphite)]/20 relative">
      <div className="page-grid">
        <div className="grid grid-cols-12 gap-y-6">
          <SectionReveal className="col-span-12 lg:col-span-6">
            <p className="section-kicker">почему нам доверяют</p>
            <h2 className="section-title max-w-[12ch] text-white">
              Культура точного исполнения.
            </h2>
          </SectionReveal>

          <SectionReveal className="col-span-12 lg:col-span-6 lg:self-end">
            <p className="section-copy max-w-xl text-[var(--color-muted)]">
              Мы строим прозрачные отношения с архитектурными студиями и частными заказчиками. Наш приоритет — отсутствие сюрпризов при сдаче объекта и долгий срок эксплуатации изделий.
            </p>
          </SectionReveal>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => (
            <SectionReveal
              key={index}
              delay={index * 0.08}
              className="flex flex-col justify-between p-6 rounded-md bg-[var(--color-graphite)] border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div>
                <div className="p-3 w-fit rounded bg-black/40 border border-white/5 mb-6">
                  {point.icon}
                </div>
                <h3 className="font-display text-lg text-white font-medium tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-4 text-xs md:text-sm leading-6 text-white/50">
                  {point.description}
                </p>
              </div>

              {/* Technical index indicator */}
              <div className="mt-8 text-[10px] font-mono text-white/10 tracking-widest">
                SYS_VERIFIED // 0{index + 1}
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* TODO: заменить на реальные цифры после уточнения у владельца бизнеса */}
        {/* Placeholder row for verified metrics if business owner provides them later */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-mono text-white/15 uppercase tracking-[0.3em]">
            // All manufacturing is fully certified and complies with architectural millwork standards.
          </p>
        </div>
      </div>
    </section>
  );
}
