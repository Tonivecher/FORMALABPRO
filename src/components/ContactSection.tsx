import { ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { studioContacts } from "../data/siteContent";
import { useContactIntent, type ContactIntentDetail } from "../hooks/useContactIntent";
import { createEmailBriefHref } from "../lib/contactLinks";
import type { ContactFormValues } from "../types/site";
import { ContactChannelLinks } from "./ContactActions";
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
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const projectTypeRef = useRef<HTMLSelectElement>(null);
  const drawingsRef = useRef<HTMLInputElement>(null);

  const applyContactIntent = useCallback((intent: ContactIntentDetail) => {
    setValues((current) => ({
      ...current,
      ...intent,
    }));
    setIsSubmitted(false);

    window.setTimeout(() => {
      if (intent.hasDrawings) {
        drawingsRef.current?.focus();
        return;
      }

      if (intent.projectType) {
        projectTypeRef.current?.focus();
        return;
      }

      messageRef.current?.focus();
    }, 0);
  }, []);

  useContactIntent(applyContactIntent);

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
    window.location.assign(createEmailBriefHref(values));
  };

  return (
    <section id="contact" className="section-rule py-[var(--section-space)] bg-[var(--color-black)]">
      <div className="page-grid grid grid-cols-12 gap-y-12 lg:gap-x-10">
        
        <SectionReveal className="col-span-12 lg:col-span-5">
          <p className="section-kicker">оценка проекта</p>
          <h2 className="section-title max-w-[12ch] text-white">
            Давайте обсудим ваш проект.
          </h2>
          <p className="section-copy mt-8 max-w-xl text-[var(--color-muted)]">
            Заполните проектный бриф справа или свяжитесь напрямую с Павлом Нижегородевым. Для ТЗ, чертежей и смет предпочтительнее email; телефон и мессенджеры остаются для быстрых уточнений.
          </p>

          <div className="mt-12 space-y-8">
            <div className="border-t border-white/10 pt-5">
              <p className="section-kicker">Предпочтительная связь (Email)</p>
              {studioContacts.emailHref ? (
                <a
                  href={studioContacts.emailHref}
                  className="mt-4 inline-block font-sans text-xl font-semibold tracking-normal text-white/90 hover:text-[var(--color-brass)] transition duration-300 md:text-2xl"
                  data-cursor="interactive"
                >
                  {studioContacts.email}
                </a>
              ) : (
                <span className="mt-4 inline-block font-sans text-xl font-semibold tracking-normal text-white/90 md:text-2xl">
                  {studioContacts.email}
                </span>
              )}
              <p className="mt-3 max-w-sm text-xs leading-5 text-white/42">
                Удобно для чертежей, ведомостей, смет и проектной переписки.
              </p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="section-kicker">Руководитель проекта</p>
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
                {studioContacts.address}
              </p>
            </div>

            <ContactChannelLinks tone="dark" />
          </div>
        </SectionReveal>

        <SectionReveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.08}>
          <form noValidate onSubmit={handleSubmit} className="space-y-8 bg-[var(--color-graphite)] p-6 md:p-8 rounded-md border border-white/5 relative">
            <div className="absolute top-6 right-6 font-mono text-[9px] text-white/20">
              BRIEF FORM
            </div>

            <h3 className="font-display text-xl text-white border-b border-white/5 pb-4 mb-6">
              Интерактивный опросник проекта
            </h3>

            <div className="space-y-6">
              
              <div>
                <label htmlFor="contact-name" className="section-kicker block mb-2">Ваше имя *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-errormessage={errors.name ? "contact-name-error" : undefined}
                  value={values.name}
                  onChange={handleChange("name")}
                  placeholder="Представьтесь, пожалуйста"
                  data-cursor="interactive"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                />
                {errors.name ? <p id="contact-name-error" className="field-error text-[var(--color-lime)]">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-contact" className="section-kicker block mb-2">Email или телефон *</label>
                <input
                  id="contact-contact"
                  type="text"
                  name="contact"
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(errors.contact)}
                  aria-errormessage={errors.contact ? "contact-contact-error" : undefined}
                  value={values.contact}
                  onChange={handleChange("contact")}
                  placeholder="Для отправки расчетов и вопросов"
                  data-cursor="interactive"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                />
                {errors.contact ? <p id="contact-contact-error" className="field-error text-[var(--color-lime)]">{errors.contact}</p> : null}
              </div>

              <div>
                <label htmlFor="projectType" className="section-kicker block mb-2">Направление проекта *</label>
                <select
                  id="projectType"
                  ref={projectTypeRef}
                  name="projectType"
                  required
                  aria-invalid={Boolean(errors.projectType)}
                  aria-errormessage={errors.projectType ? "contact-project-type-error" : undefined}
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
                {errors.projectType ? <p id="contact-project-type-error" className="field-error text-[var(--color-lime)]">{errors.projectType}</p> : null}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-location" className="section-kicker block mb-2">Город / Объект</label>
                  <input
                    id="contact-location"
                    type="text"
                    name="location"
                    autoComplete="address-level2"
                    value={values.location}
                    onChange={handleChange("location")}
                    placeholder="Например: Москва"
                    data-cursor="interactive"
                    className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="contact-timeframe" className="section-kicker block mb-2">Желаемые сроки</label>
                  <input
                    id="contact-timeframe"
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

              <div>
                <label htmlFor="contact-scope" className="section-kicker block mb-2">Что нужно изготовить? *</label>
                <input
                  id="contact-scope"
                  type="text"
                  name="scope"
                  required
                  aria-invalid={Boolean(errors.scope)}
                  aria-errormessage={errors.scope ? "contact-scope-error" : undefined}
                  value={values.scope}
                  onChange={handleChange("scope")}
                  placeholder="Например: встроенный шкаф, барная стойка"
                  data-cursor="interactive"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white outline-none focus:border-[var(--color-brass)] transition duration-200"
                />
                {errors.scope ? <p id="contact-scope-error" className="field-error text-[var(--color-lime)]">{errors.scope}</p> : null}
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 select-none" data-cursor="interactive">
                  <input
                    ref={drawingsRef}
                    type="checkbox"
                    id="hasDrawings"
                    name="hasDrawings"
                    checked={values.hasDrawings}
                    onChange={handleChange("hasDrawings")}
                    className="h-[1.125rem] w-[1.125rem] rounded border-white/10 bg-transparent text-[var(--color-brass)] focus:ring-[var(--color-brass)]"
                  />
                  <span className="text-xs md:text-sm text-white/70">
                    У меня есть чертежи, спецификации или визуализации
                  </span>
                </label>
              </div>

              <div>
                <label htmlFor="contact-message" className="section-kicker block mb-2">Дополнительный комментарий</label>
                <textarea
                  id="contact-message"
                  ref={messageRef}
                  name="message"
                  value={values.message}
                  onChange={handleChange("message")}
                  placeholder="Опишите особенности проекта, требования к материалам или стыкам..."
                  data-cursor="interactive"
                  className="w-full bg-transparent border border-white/10 rounded p-3 text-sm text-white outline-none focus:border-[var(--color-brass)] transition duration-200 min-h-[6rem] resize-y"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 pt-4">
              <MagneticButton type="submit" className="w-full justify-center">
                Отправить бриф на оценку
                <ArrowUpRight className="h-4 w-4 text-[var(--color-lime)]" strokeWidth={2} />
              </MagneticButton>
              
              <p className="max-w-md text-xs leading-5 text-white/40">
                После проверки обязательных полей сайт откроет письмо на {studioContacts.email} с заполненным текстом брифа.
              </p>
              
              {isSubmitted ? (
                <div className="p-3 bg-[var(--color-brass)]/10 border border-[var(--color-brass)]/20 rounded-md w-full" role="status" aria-live="polite">
                  <p className="text-xs leading-5 text-[var(--color-brass)]">
                    Бриф подготовлен в письме. Если почтовый клиент не открылся, напишите на {studioContacts.email} или позвоните по номеру {studioContacts.phone}.
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
