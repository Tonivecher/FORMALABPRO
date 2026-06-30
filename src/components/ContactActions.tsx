import { Mail } from "lucide-react";

import { studioContacts } from "../data/siteContent";

type ContactTone = "dark" | "light";

interface ContactChannelLinksProps {
  tone?: ContactTone;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M16.04 4C9.42 4 4.04 9.32 4.04 15.86c0 2.1.56 4.15 1.62 5.95L4 28l6.35-1.64a12.1 12.1 0 0 0 5.69 1.44c6.62 0 12-5.32 12-11.86S22.66 4 16.04 4Zm0 21.78c-1.76 0-3.48-.46-4.99-1.34l-.36-.21-3.77.97 1-3.61-.24-.37a9.72 9.72 0 0 1-1.5-5.36c0-5.42 4.43-9.84 9.86-9.84 5.44 0 9.86 4.42 9.86 9.84 0 5.5-4.42 9.92-9.86 9.92Zm5.45-7.35c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.45-2.38-1.46a8.9 8.9 0 0 1-1.65-2.03c-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.58-.91-2.16-.24-.56-.49-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1-1.04 2.45s1.07 2.86 1.22 3.06c.15.2 2.1 3.17 5.09 4.45.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35Z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M27.5 6.2 23.7 25c-.29 1.34-1.06 1.67-2.15 1.04l-5.93-4.36-2.86 2.75c-.32.32-.58.58-1.19.58l.42-6.02L23 9.05c.48-.42-.1-.66-.74-.24L8.64 17.39l-5.86-1.83c-1.27-.4-1.3-1.27.27-1.88L25.98 4.84c1.06-.39 1.99.26 1.52 1.36Z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M7.4 4.8 9 4.1c.8-.34 1.72.02 2.08.8l.8 1.77c.31.69.13 1.5-.44 2l-1.05.91a10.74 10.74 0 0 0 4.04 4.04l.91-1.05a1.6 1.6 0 0 1 2-.44l1.77.8c.78.36 1.14 1.28.8 2.08l-.7 1.6c-.32.75-1.08 1.22-1.9 1.16C10.94 17.3 6.7 13.06 6.22 6.7c-.06-.82.41-1.58 1.17-1.9Z"
      />
    </svg>
  );
}

function SmsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M5 6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v5.4a2.8 2.8 0 0 1-2.8 2.8h-3.4L8.2 19v-4H7.8A2.8 2.8 0 0 1 5 12.2V6.8Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
        d="M8.5 8.5h7M8.5 11.5h4.5"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M12 21s6-5.16 6-10a6 6 0 1 0-12 0c0 4.84 6 10 6 10Z"
      />
      <circle cx="12" cy="11" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ContactChannelLinks({ tone = "dark" }: ContactChannelLinksProps) {
  const isDark = tone === "dark";
  const textClass = isDark ? "text-white/78" : "text-[#091423]/72";
  const subtleClass = isDark ? "text-white/46" : "text-[#091423]/52";
  const borderClass = isDark ? "border-white/10" : "border-[#091423]/12";
  const mapClass = isDark
    ? "border-white/10 bg-white/[0.03] text-white/72 hover:border-[var(--color-brass)]/50 hover:text-[var(--color-brass)]"
    : "border-[#091423]/12 bg-white/45 text-[#091423]/70 hover:border-[#091423]/35 hover:text-[#091423]";

  return (
    <div className="space-y-5">
      <div className={`rounded-md border ${borderClass} p-4`}>
        <p className={`text-xs leading-5 ${textClass}`}>
          Руководитель проекта: <span className="font-semibold">{studioContacts.director}</span>
        </p>
        <p className={`mt-1 text-[11px] leading-5 ${subtleClass}`}>
          Предпочтительно отправлять ТЗ, чертежи и сметы на email. Звонок и мессенджеры — для быстрых уточнений.
        </p>
      </div>

      {studioContacts.emailHref ? (
        <a
          href={studioContacts.emailHref}
          className={`group inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border px-4 text-xs font-bold uppercase tracking-widest transition duration-200 active:scale-95 ${
            isDark
              ? "border-[var(--color-brass)]/45 bg-[var(--color-brass)]/12 text-[var(--color-brass)] hover:border-[var(--color-brass)]/70"
              : "border-[#C6A461]/55 bg-[#C6A461]/16 text-[#091423] hover:border-[#091423]/35"
          }`}
          aria-label={`Отправить email ${studioContacts.director}: ${studioContacts.email}`}
          data-cursor="interactive"
        >
          <Mail className="h-5 w-5" strokeWidth={1.8} />
          <span>Отправить email</span>
          <span className="hidden text-[10px] normal-case tracking-normal opacity-70 sm:inline">
            {studioContacts.email}
          </span>
        </a>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <a
          href={studioContacts.phoneHref ?? undefined}
          className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--color-brass)] px-3 text-xs font-bold uppercase tracking-widest text-[#070706] transition duration-200 hover:brightness-110 active:scale-95"
          aria-label={`Позвонить ${studioContacts.director}: ${studioContacts.phone}`}
          data-cursor="interactive"
        >
          <PhoneIcon />
          <span>Звонок</span>
        </a>

        <a
          href={`${studioContacts.whatsappHref}?text=${encodeURIComponent("Здравствуйте. Хочу обсудить проект мебели с FORMALAB PRO.")}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 text-xs font-bold uppercase tracking-widest text-[#07140b] transition duration-200 hover:brightness-110 active:scale-95"
          aria-label={`Написать ${studioContacts.director} в WhatsApp`}
          data-cursor="interactive"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>

        <a
          href={studioContacts.telegramHref}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#229ED9] px-3 text-xs font-bold uppercase tracking-widest text-white transition duration-200 hover:brightness-110 active:scale-95"
          aria-label={`Написать ${studioContacts.director} в Telegram`}
          data-cursor="interactive"
        >
          <TelegramIcon />
          <span>Telegram</span>
        </a>

        <a
          href={studioContacts.smsHref}
          className={`group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border px-3 text-xs font-bold uppercase tracking-widest transition duration-200 active:scale-95 ${
            isDark
              ? "border-white/12 bg-white/[0.04] text-white hover:border-white/30"
              : "border-[#091423]/15 bg-white/60 text-[#091423] hover:border-[#091423]/35"
          }`}
          aria-label={`Отправить SMS на ${studioContacts.phone}`}
          data-cursor="interactive"
        >
          <SmsIcon />
          <span>SMS</span>
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={studioContacts.yandexMapsHref}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-4 text-[11px] font-bold uppercase tracking-widest transition duration-200 active:scale-95 ${mapClass}`}
          data-cursor="interactive"
        >
          <MapIcon />
          Яндекс Карты
        </a>
        <a
          href={studioContacts.twoGisHref}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-4 text-[11px] font-bold uppercase tracking-widest transition duration-200 active:scale-95 ${mapClass}`}
          data-cursor="interactive"
        >
          <MapIcon />
          2ГИС
        </a>
      </div>
    </div>
  );
}

export function FloatingContactDock() {
  return (
    <aside
      className="fixed left-3 z-[80] flex items-center gap-2 rounded-full border border-white/12 bg-[#070706]/88 p-2 shadow-2xl backdrop-blur-xl sm:left-5"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      aria-label="Быстрая связь с FORMALAB PRO"
    >
      <span className="hidden pl-3 pr-1 text-[10px] font-bold uppercase tracking-widest text-white/62 sm:inline">
        Связаться с Павлом
      </span>
      {studioContacts.emailHref ? (
        <a
          href={studioContacts.emailHref}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brass)] text-[#070706] transition duration-200 hover:brightness-110 active:scale-95"
          aria-label={`Отправить email ${studioContacts.director}: ${studioContacts.email}`}
          title="Email (предпочтительно)"
          data-cursor="interactive"
        >
          <Mail className="h-5 w-5" strokeWidth={1.8} />
        </a>
      ) : null}
      <a
        href={studioContacts.phoneHref ?? undefined}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition duration-200 hover:border-white/30 active:scale-95"
        aria-label={`Позвонить ${studioContacts.director}: ${studioContacts.phone}`}
        title="Позвонить"
        data-cursor="interactive"
      >
        <PhoneIcon />
      </a>
      <a
        href={`${studioContacts.whatsappHref}?text=${encodeURIComponent("Здравствуйте. Хочу обсудить проект мебели с FORMALAB PRO.")}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-[#07140b] transition duration-200 hover:brightness-110 active:scale-95"
        aria-label={`Написать ${studioContacts.director} в WhatsApp`}
        title="WhatsApp"
        data-cursor="interactive"
      >
        <WhatsAppIcon />
      </a>
      <a
        href={studioContacts.telegramHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#229ED9] text-white transition duration-200 hover:brightness-110 active:scale-95"
        aria-label={`Написать ${studioContacts.director} в Telegram`}
        title="Telegram"
        data-cursor="interactive"
      >
        <TelegramIcon />
      </a>
    </aside>
  );
}
