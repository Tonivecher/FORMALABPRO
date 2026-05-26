import { SectionReveal } from "../SectionReveal";

export function SeoTextSection() {
  return (
    <section id="seo-text" className="section-rule py-16 md:py-24 bg-[var(--color-black)] relative overflow-hidden">
      <div className="page-grid">
        <div className="max-w-4xl mx-auto border-l border-white/10 pl-6 md:pl-10">
          <SectionReveal>
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[var(--color-brass)] font-semibold">
              промышленный контекст
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl lg:text-4xl tracking-tight text-white leading-snug">
              Мебель на заказ для архитектурных интерьеров в Москве
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-8 space-y-6 text-sm md:text-base leading-8 text-white/50">
            <p>
              Производственная лаборатория «Инженерия формы» осуществляет комплексное{" "}
              <strong className="text-white/80 font-medium">изготовление мебели на заказ</strong>{" "}
              для сложных частных и общественных пространств. Мы создаем изделия, которые работают как полноценная часть архитектуры интерьера: с учетом точных пропорций, световых сценариев, нагрузок и монтажной дисциплины. Наше{" "}
              <strong className="text-white/80 font-medium">столярное производство в Москве</strong>{" "}
              оснащено ЧПУ-оборудованием нового поколения, что позволяет нам выпускать детали любой сложности с жесткими размерными допусками.
            </p>
            
            <p>
              Для архитекторов и студий дизайна интерьера мы являемся надежным техническим партнером. Наш конструкторский отдел детально прорабатывает узлы, подбирает стыковочные швы и помогает реализовать сложную{" "}
              <strong className="text-white/80 font-medium">мебель по чертежам дизайнера</strong>{" "}
              без упрощения исходной эстетики проекта. Мы производим{" "}
              <strong className="text-white/80 font-medium">встроенную мебель на заказ</strong> (включая скрытые шкафы, стеллажи, ниши), кухни по индивидуальным размерам, а также{" "}
              <strong className="text-white/80 font-medium">стеновые панели на заказ</strong> со сложным рисунчатым подбором натурального шпона или покрытием износостойкой эмалью.
            </p>
            
            <p>
              Важным вектором нашей деятельности является контрактный B2B-сегмент. Мы производим специализированную{" "}
              <strong className="text-white/80 font-medium">мебель для HoReCa</strong> (дизайнерские обеденные группы, мягкие кабины с глубокой посадкой, барные стойки из массива и камня) и выпускаем износостойкую{" "}
              <strong className="text-white/80 font-medium">мебель для ресторанов на заказ</strong>, рассчитанную на интенсивную эксплуатацию. Также мы проектируем торговое оборудование, презентационные стенды и мебель для бутиков, шоурумов и премиальных офисов в Москве и по всей России.
            </p>
          </SectionReveal>

          {/* Technical list of terms for SEO semantic crawlers, formatted beautifully */}
          <SectionReveal delay={0.16} className="mt-10 pt-8 border-t border-white/5">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
              <span>#архитектурная_мебель</span>
              <span>#премиальная_мебель_на_заказ</span>
              <span>#мебель_по_индивидуальным_размерам</span>
              <span>#корпусная_мебель_на_заказ</span>
              <span>#ресепшн_на_заказ</span>
              <span>#витрины_на_заказ</span>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
