import { useEffect } from "react";

const CONTACT_INTENT_EVENT = "formalabpro:contact-intent";

interface ContactIntentDetail {
  message: string;
}

export function requestContactIntent(message: string) {
  window.dispatchEvent(
    new CustomEvent<ContactIntentDetail>(CONTACT_INTENT_EVENT, {
      detail: { message },
    }),
  );
}

export function useContactIntent(onMessage: (message: string) => void) {
  useEffect(() => {
    const handleContactIntent = (event: Event) => {
      const detail = (event as CustomEvent<ContactIntentDetail>).detail;

      if (typeof detail?.message === "string" && detail.message.trim()) {
        onMessage(detail.message);
      }
    };

    window.addEventListener(CONTACT_INTENT_EVENT, handleContactIntent);

    return () => {
      window.removeEventListener(CONTACT_INTENT_EVENT, handleContactIntent);
    };
  }, [onMessage]);
}
