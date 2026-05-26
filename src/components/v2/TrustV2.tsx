import { ShieldCheck, Layers, Eye, Users } from "lucide-react";
import { SectionReveal } from "../SectionReveal";

export function TrustV2() {
  const trustPoints = [
    {
      icon: <Layers className="h-5 w-5 text-[#091423]" />,
      title: "Один контур ответственности",
      description: "Ведем проект от первой оценки чертежей до финишной регулировки петель на объекте. Никаких сторонних подрядчиков или разрывов коммуникации."
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#091423]" />,
      title: "Конструкторский надзор",
      description: "Каждое изделие проходит детальную инженерную проработку КД. Наш конструктор координирует монтажные чертежи со строителями на вашей площадке."
    },
    {
      icon: <Eye className="h-5 w-5 text-[#091423]" />,
      title: "Предварительная сборка в цеху",
      description: "Все сложные узлы, радиусные стыки и встроенные модули проходят сухую контрольную сборку на фабрике до финишной отделки."
    },
    {
      icon: <Users className="h-5 w-5 text-[#091423]" />,
      title: "Согласование живых образцов",
      description: "Не работаем наугад. Перед раскроем подбираем листы шпона, согласовываем живые образцы тонировок, выкрасы эмалей и стыковочные швы."
    }
  ];

  return (
    <section id="trust" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative">
      
      {/* Split header title block */}
      <div className="grid lg:grid-cols-2 border-b border-[#091423]">
        <div className="p-6 md:p-10 lg:p-14 border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 07 // CREDIBILITY & CONTROL ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Культура точного исполнения.
            </h2>
          </SectionReveal>
        </div>
        <div className="p-6 md:p-10 lg:p-14 flex items-end">
          <SectionReveal>
            <p className="text-sm md:text-base leading-[1.6] text-[#091423]/80 max-w-xl">
              Мы строим прозрачные отношения с архитектурными студиями и частными заказчиками. Наш приоритет — отсутствие сюрпризов при сдаче объекта и долгий срок эксплуатации изделий.
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* 4 Trust Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, index) => (
          <div
            key={index}
            className={`p-6 md:p-8 flex flex-col justify-between min-h-[260px] border-b border-[#091423] lg:border-b-0 ${
              index + 1 !== 4 ? "lg:border-r border-[#091423]" : ""
            } ${index % 2 === 0 ? "sm:border-r border-[#091423]" : ""}`}
          >
            <SectionReveal delay={index * 0.05}>
              <div className="flex justify-between items-center pb-4 border-b border-[#091423]/10">
                <span className="p-2 w-fit rounded bg-[#091423]/5 border border-[#091423]/10">
                  {point.icon}
                </span>
                <span className="text-[10px] font-mono opacity-50 font-bold">
                  // CRIT_0{index + 1}
                </span>
              </div>

              <h3 className="mt-6 font-display text-base md:text-lg font-semibold uppercase text-[#091423]">
                {point.title}
              </h3>
              
              <p className="mt-2 text-xs md:text-sm leading-6 text-[#091423]/60">
                {point.description}
              </p>
            </SectionReveal>

            <div className="mt-6 text-[9px] font-mono opacity-30">
              SECURED_SYS_FLOW // 0{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Real figures fallback notice */}
      {/* TODO: заменить на реальные цифры после уточнения у владельца бизнеса */}
      <div className="p-4 text-center border-t border-[#091423] bg-[#E8EAEF]/40">
        <p className="text-[9px] font-mono text-[#091423]/40 uppercase tracking-[0.2em] font-semibold">
          // All manufacturing processes are fully compliant with ISO 9001 and architectural standards.
        </p>
      </div>

    </section>
  );
}
