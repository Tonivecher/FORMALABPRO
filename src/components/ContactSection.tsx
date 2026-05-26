import { ArrowUpRight } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { studioContacts } from "../data/siteContent";
import type { ContactFormValues } from "../types/site";
import { MagneticButton } from "./MagneticButton";
import { SectionReveal } from "./SectionReveal";

type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  contact: "",
  projectType: "",
  scope: "",
  location: "",
  timeframe: "",
  hasDrawings: false,
  message: "",
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const nextValue =
        event.target.type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : event.target.value;

      setValues((current) => ({
        ...current,
        [field]: nextValue,
      }));

      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
      setIsSubmitted(false);
    };

  const validate = () => {
    const nextErrors: ContactErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Укажите ваше имя.";
    }

    const contactValue = values.contact.trim();
    if (contactValue.length < 5 || !(/@/.test(contactValue) || /\d{5,}/.test(contactValue))) {
      nextErrors.contact = "Нужен email или телефон для обратной связи.";
    }

    if (values.projectType === "") {
      nextErrors.projectType = "Выберите тип объекта.";
    }

    if (values.scope.trim().length < 5) {
      nextErrors.scope = "Опишите кратко, что необходимо изготовить.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="section-rule py-[var(--section-space)] bg-[var(--color-black)]">
      <div className="page-grid grid grid-cols-12 gap-y-12 lg:gap-x-10">
        
        {/* Left Column info */}
        <SectionReveal className="col-span-12 lg:col-span-5">
          <p className="section-kicker">оценка проекта</p>
          <h2 className="section-title max-w-[12ch] text-white">
            Давайте обсудим ваш проект.
          </h2>
          <p className="section-copy mt-8 max-w-xl text-[var(--color-muted)]">
            Заполните проектный бриф справа. Мы проанализируем тип объекта, чертежи, материалы и вернемся с предварительной оценкой, конструкторскими решениями и сроками производства.
          </p>

          <div className="mt-12 space-y-8">
            <div className="border-t border-white/10 pt-5">
              <p className="section-kicker">Прямая связь (Email)</p>
              {studioContacts.emailHref ? (
                <a
                  href={studioContacts.emailHref}
                  className="mt-4 inline-block font-display text-xl md:text-2xl tracking-[-0.05em] text-white/90 hover:text-[var(--color-brass)] transition duration-300"
                  data-cursor="interactive"
                >
                  {studioContacts.email}
                </a>
              ) : (
                <span className="mt-4 inline-block font-display text-xl md:text-2xl tracking-[-0.05em] text-white/90">
                  {studioContacts.email}
                </span>
              )}
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="section-kicker">Телефон ателье</p>
              {studioContacts.phoneHref ? (
                <a
                  href={studioContacts.phoneHref}
                  className="mt-4 inline-block font-display text-xl md:text-2xl tracking-[-0.05em] text-white/90 hover:text-[var(--color-brass)] transition duration-300"
                  data-cursor="interactive"
                >
                  {studioContacts.phone}
                </a>
              ) : (
                <span className="mt-4 inline-block font-display text-xl md:text-2xl tracking-[-0.05em] text-white/90">
                  {studioContacts.phone}
                </span>
              )}
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="section-kicker">Локация</p>
              <p className="mt-4 text-sm md:text-base text-white/60 leading-6">
                {studioContacts.location}
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Right Column: RETHINK COMPREHENSIVE BRIEF FORM */}
        <SectionReveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.08}>
          <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--color-graphite)] p-6 md:p-8 rounded-md border border-white/5 relative">
            <div className="absolute top-6 right-6 font-mono text-[9px] text-white/20">
              SYS_BRIEF_FORM // REV_2.4
            </div>

            <h3 className="font-display text-xl text-white border-b border-white/5 pb-4 mb-6">
              Интерактивный опросник проекта
            </h3>

            <div className="space-y-6">
              
              {/* 1. Name Input */}
              <div>
                <span className="section-kicker block mb-2">Ваше имя *</span>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  placeholder="Представьтесь, пожалуйста"
                  data-cursor="interactive"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                />
                {errors.name ? <p className="field-error text-[var(--color-lime)]">{errors.name}</p> : null}
              </div>

              {/* 2. Contact Input */}
              <div>
                <span className="section-kicker block mb-2">Email или телефон *</span>
                <input
                  type="text"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange("contact")}
                  placeholder="Для отправки расчетов и вопросов"
                  data-cursor="interactive"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                />
                {errors.contact ? <p className="field-error text-[var(--color-lime)]">{errors.contact}</p> : null}
              </div>

              {/* 3. Project Type Dropdown Selection */}
              <div>
                <span className="section-kicker block mb-2">Направление проекта *</span>
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={handleChange("projectType")}
                  data-cursor="interactive"
                  className="w-full bg-[var(--color-black)] border border-white/10 rounded px-3 py-3 text-sm text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                >
                  <option value="">Выберите категорию объекта</option>
                  <option value="private">Частный интерьер (кухни, гардеробные, панели)</option>
                  <option value="horeca">Рестораны и HoReCa (модули посадки, барные стойки)</option>
                  <option value="retail">Retail и торговые зоны (острова, витрины)</option>
                  <option value="office">Офис / Коммерческий объект</option>
                  <option value="other">Другое / Сложные столярные изделия</option>
                </select>
                {errors.projectType ? <p className="field-error text-[var(--color-lime)]">{errors.projectType}</p> : null}
              </div>

              {/* 2-column sub-fields for location & timeframe */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* 4. Location */}
                <div>
                  <span className="section-kicker block mb-2">Город / Объект</span>
                  <input
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={handleChange("location")}
                    placeholder="Например: Москва"
                    data-cursor="interactive"
                    className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                  />
                </div>

                {/* 5. Timeframe */}
                <div>
                  <span className="section-kicker block mb-2">Желаемые сроки</span>
                  <input
                    type="text"
                    name="timeframe"
                    value={values.timeframe}
                    onChange={handleChange("timeframe")}
                    placeholder="Например: сентябрь 2026"
                    data-cursor="interactive"
                    className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                  />
                </div>
              </div>

              {/* 6. Scope Input */}
              <div>
                <span className="section-kicker block mb-2">Что нужно изготовить? *</span>
                <input
                  type="text"
                  name="scope"
                  value={values.scope}
                  onChange={handleChange("scope")}
                  placeholder="Например: встроенный шкаф, барная стойка"
                  data-cursor="interactive"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                />
                {errors.scope ? <p className="field-error text-[var(--color-lime)]">{errors.scope}</p> : null}
              </div>

              {/* 7. Drawings checklist (custom toggle) */}
              <div className="pt-2">
                <label className="flex items-center gap-3 select-none" data-cursor="interactive">
                  <input
                    type="checkbox"
                    id="hasDrawings"
                    name="hasDrawings"
                    checked={values.hasDrawings}
                    onChange={handleChange("hasDrawings")}
                    className="h-4.5 w-4.5 rounded border-white/10 bg-transparent text-[var(--color-brass)] focus:ring-[var(--color-brass)]"
                  />
                  <span className="text-xs md:text-sm text-white/70">
                    У меня есть чертежи, спецификации или визуализации
                  </span>
                </label>
              </div>

              {/* 8. Additional Comments text field */}
              <div>
                <span className="section-kicker block mb-2">Дополнительный комментарий</span>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange("message")}
                  placeholder="Опишите особенности проекта, требования к материалам или стыкам..."
                  data-cursor="interactive"
                  className="w-full bg-transparent border border-white/10 rounded p-3 text-sm text-white outline-none focus:border-[var(--color-brass)] transition duration-200 min-h-[6rem] resize-y"
                />
              </div>
            </div>

            {/* Submit Block */}
            <div className="flex flex-col items-start gap-4 pt-4">
              <MagneticButton type="submit" className="w-full justify-center">
                Отправить бриф на оценку
                <ArrowUpRight className="h-4 w-4 text-[var(--color-lime)]" strokeWidth={2} />
              </MagneticButton>
              
              <p className="max-w-md text-xs leading-5 text-white/40">
                Бриф проверит обязательные поля и сохранит введенные данные в текущей сессии сайта.
              </p>
              
              {isSubmitted ? (
                <div className="p-3 bg-[var(--color-brass)]/10 border border-[var(--color-brass)]/20 rounded-md w-full">
                  <p className="text-xs leading-5 text-[var(--color-brass)]">
                    Бриф подготовлен. Рабочие каналы связи будут подключены после уточнения контактов ателье.
                  </p>
                </div>
              ) : null}
            </div>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
