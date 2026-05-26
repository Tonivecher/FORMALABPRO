import { useState, type ChangeEvent, type FormEvent } from "react";

import { studioContacts } from "../../data/siteContent";
import type { ContactFormValues } from "../../types/site";
import { ButtonV2 } from "./ButtonV2";
import { SectionReveal } from "../SectionReveal";

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

export function ContactV2() {
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
    <section id="contact" className="bg-[#F0F1F4] text-[#091423] relative">
      <div className="grid lg:grid-cols-12">
        
        {/* Left Column Info */}
        <div className="col-span-12 lg:col-span-5 p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 10 // CONTACTS & GEO ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Давайте обсудим ваш проект.
            </h2>
            <p className="mt-6 text-xs md:text-sm leading-6 text-[#091423]/70 max-w-sm">
              Заполните проектный бриф справа. Мы проанализируем чертежи, материалы и вернемся с предварительной оценкой, конструкторскими решениями и сроками производства.
            </p>
          </SectionReveal>

          <div className="mt-12 space-y-8">
            <div className="border-t border-[#091423]/10 pt-5">
              <span className="text-[10px] font-mono uppercase opacity-50 block font-bold">EMAIL //</span>
              {studioContacts.emailHref ? (
                <a
                  href={studioContacts.emailHref}
                  className="mt-3 inline-block font-display text-xl md:text-2xl font-semibold uppercase tracking-tight text-[#091423] hover:opacity-70 transition duration-300"
                  data-cursor="interactive"
                >
                  {studioContacts.email}
                </a>
              ) : (
                <span className="mt-3 inline-block font-display text-xl md:text-2xl font-semibold uppercase tracking-tight text-[#091423]">
                  {studioContacts.email}
                </span>
              )}
            </div>

            <div className="border-t border-[#091423]/10 pt-5">
              <span className="text-[10px] font-mono uppercase opacity-50 block font-bold">TELEPHONE //</span>
              {studioContacts.phoneHref ? (
                <a
                  href={studioContacts.phoneHref}
                  className="mt-3 inline-block font-display text-xl md:text-2xl font-semibold uppercase tracking-tight text-[#091423] hover:opacity-70 transition duration-300"
                  data-cursor="interactive"
                >
                  {studioContacts.phone}
                </a>
              ) : (
                <span className="mt-3 inline-block font-display text-xl md:text-2xl font-semibold uppercase tracking-tight text-[#091423]">
                  {studioContacts.phone}
                </span>
              )}
            </div>

            <div className="border-t border-[#091423]/10 pt-5">
              <span className="text-[10px] font-mono uppercase opacity-50 block font-bold">GEOGRAPHY //</span>
              <p className="mt-3 text-xs md:text-sm text-[#091423]/70 leading-6 font-semibold uppercase tracking-wider">
                {studioContacts.location}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form */}
        <div className="col-span-12 lg:col-span-7 p-6 md:p-10 lg:p-14 bg-[#E8EAEF]/60 flex flex-col justify-center h-full">
          <SectionReveal className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto relative">
              <div className="absolute top-0 right-0 font-mono text-[9px] text-[#091423]/30">
                BRIEF_FORM // REV_2.4
              </div>

              <h3 className="font-display text-lg md:text-xl font-semibold uppercase tracking-widest text-[#091423] pb-4 border-b border-[#091423]/10">
                Интерактивный опросник проекта
              </h3>

              <div className="space-y-6 pt-4">
                
                {/* 1. Name */}
                <div>
                  <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Ваше имя *</span>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                    placeholder="Представьтесь, пожалуйста"
                    data-cursor="interactive"
                    className="w-full bg-transparent border-b border-[#091423]/20 py-2.5 text-[#091423] outline-none focus:border-[#091423] transition duration-200"
                  />
                  {errors.name ? <p className="text-[11px] text-red-600 font-semibold mt-1.5">{errors.name}</p> : null}
                </div>

                {/* 2. Contact */}
                <div>
                  <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Email или телефон *</span>
                  <input
                    type="text"
                    name="contact"
                    value={values.contact}
                    onChange={handleChange("contact")}
                    placeholder="Для отправки расчетов и вопросов"
                    data-cursor="interactive"
                    className="w-full bg-transparent border-b border-[#091423]/20 py-2.5 text-[#091423] outline-none focus:border-[#091423] transition duration-200"
                  />
                  {errors.contact ? <p className="text-[11px] text-red-600 font-semibold mt-1.5">{errors.contact}</p> : null}
                </div>

                {/* 3. Project Type Dropdown */}
                <div>
                  <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Направление проекта *</span>
                  <select
                    id="projectType"
                    name="projectType"
                    value={values.projectType}
                    onChange={handleChange("projectType")}
                    data-cursor="interactive"
                    className="w-full bg-[#F0F1F4] border border-[#091423]/20 rounded px-3 py-3 text-xs md:text-sm text-[#091423] outline-none focus:border-[#091423] transition duration-200"
                  >
                    <option value="">Выберите категорию объекта</option>
                    <option value="private">Частный интерьер (кухни, гардеробные, панели)</option>
                    <option value="horeca">Рестораны и HoReCa (модули посадки, барные стойки)</option>
                    <option value="retail">Retail и торговые зоны (острова, витрины)</option>
                    <option value="office">Офис / Коммерческий объект</option>
                    <option value="other">Другое / Сложные столярные изделия</option>
                  </select>
                  {errors.projectType ? <p className="text-[11px] text-red-600 font-semibold mt-1.5">{errors.projectType}</p> : null}
                </div>

                {/* 2-column fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* 4. Location */}
                  <div>
                    <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Город / Объект</span>
                    <input
                      type="text"
                      name="location"
                      value={values.location}
                      onChange={handleChange("location")}
                      placeholder="Например: Москва"
                      data-cursor="interactive"
                      className="w-full bg-transparent border-b border-[#091423]/20 py-2.5 text-[#091423] outline-none focus:border-[#091423] transition duration-200"
                    />
                  </div>

                  {/* 5. Timeframe */}
                  <div>
                    <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Желаемые сроки</span>
                    <input
                      type="text"
                      name="timeframe"
                      value={values.timeframe}
                      onChange={handleChange("timeframe")}
                      placeholder="Например: сентябрь 2026"
                      data-cursor="interactive"
                      className="w-full bg-transparent border-b border-[#091423]/20 py-2.5 text-[#091423] outline-none focus:border-[#091423] transition duration-200"
                    />
                  </div>
                </div>

                {/* 6. Scope */}
                <div>
                  <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Что нужно изготовить? *</span>
                  <input
                    type="text"
                    name="scope"
                    value={values.scope}
                    onChange={handleChange("scope")}
                    placeholder="Например: встроенный шкаф, барная стойка"
                    data-cursor="interactive"
                    className="w-full bg-transparent border-b border-[#091423]/20 py-2.5 text-[#091423] outline-none focus:border-[#091423] transition duration-200"
                  />
                  {errors.scope ? <p className="text-[11px] text-red-600 font-semibold mt-1.5">{errors.scope}</p> : null}
                </div>

                {/* 7. Drawings checkbox */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 select-none" data-cursor="interactive">
                    <input
                      type="checkbox"
                      id="hasDrawings"
                      name="hasDrawings"
                      checked={values.hasDrawings}
                      onChange={handleChange("hasDrawings")}
                      className="h-4.5 w-4.5 rounded border-[#091423]/20 bg-transparent text-[#091423] focus:ring-[#091423]"
                    />
                    <span className="text-xs md:text-sm text-[#091423]/80 font-semibold">
                      У меня есть готовые чертежи, спецификации или визуализации
                    </span>
                  </label>
                </div>

                {/* 8. Additional Comments */}
                <div>
                  <span className="text-[9px] font-mono uppercase opacity-50 block font-bold mb-2">Дополнительный комментарий</span>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange("message")}
                    placeholder="Опишите особенности проекта, требования к материалам или стыкам..."
                    data-cursor="interactive"
                    className="w-full bg-transparent border border-[#091423]/20 rounded p-3 text-xs md:text-sm text-[#091423] outline-none focus:border-[#091423] transition duration-200 min-h-[6rem] resize-y"
                  />
                </div>

              </div>

              {/* Submit Block */}
              <div className="flex flex-col gap-4 pt-4">
                <ButtonV2 type="submit" variant="primary" className="w-full">
                  Отправить бриф на оценку
                </ButtonV2>
                
                <p className="max-w-md text-[10px] leading-5 text-[#091423]/50">
                  Бриф проверит обязательные поля и сохранит введенные данные в текущей сессии сайта.
                </p>
                
                {isSubmitted ? (
                  <div className="p-3 bg-[#091423]/5 border border-[#091423]/10 rounded-md w-full">
                    <p className="text-xs leading-5 text-[#091423]">
                      Бриф подготовлен. Рабочие каналы связи будут подключены после уточнения контактов ателье.
                    </p>
                  </div>
                ) : null}
              </div>

            </form>
          </SectionReveal>
        </div>

      </div>
    </section>
  );
}
