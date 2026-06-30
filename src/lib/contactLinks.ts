import { studioContacts } from "../data/siteContent";
import type { ContactFormValues } from "../types/site";

const projectTypeLabels: Record<string, string> = {
  private: "Частный интерьер",
  horeca: "Рестораны и HoReCa",
  retail: "Retail и торговые зоны",
  office: "Офис / коммерческий объект",
  other: "Другое / сложные столярные изделия",
};

export function createWhatsAppBriefHref(values: ContactFormValues) {
  const fields = [
    ["Имя", values.name.trim()],
    ["Контакт", values.contact.trim()],
    ["Тип объекта", projectTypeLabels[values.projectType] ?? values.projectType],
    ["Что нужно изготовить", values.scope.trim()],
    ["Город / объект", values.location.trim()],
    ["Сроки", values.timeframe.trim()],
    ["Чертежи", values.hasDrawings ? "есть" : ""],
    ["Комментарий", values.message.trim()],
  ].filter(([, value]) => value);

  const message = [
    "Здравствуйте, Павел. Хочу обсудить проект для FORMALAB PRO.",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  return `${studioContacts.whatsappHref}?text=${encodeURIComponent(message)}`;
}
