import { useEffect } from "react";

import type { ContactFormValues } from "../types/site";

const CONTACT_INTENT_EVENT = "formalabpro:contact-intent";

export type ContactIntentDetail = Partial<ContactFormValues>;

export function requestContactIntent(intent: string | ContactIntentDetail) {
  if (typeof window === "undefined") {
    return;
  }

  const detail = typeof intent === "string" ? { message: intent } : intent;

  window.dispatchEvent(
    new CustomEvent<ContactIntentDetail>(CONTACT_INTENT_EVENT, {
      detail,
    }),
  );
}

export function useContactIntent(onIntent: (intent: ContactIntentDetail) => void) {
  useEffect(() => {
    const handleContactIntent = (event: Event) => {
      const detail = (event as CustomEvent<ContactIntentDetail>).detail;

      if (detail && Object.keys(detail).length > 0) {
        onIntent(detail);
      }
    };

    window.addEventListener(CONTACT_INTENT_EVENT, handleContactIntent);

    return () => {
      window.removeEventListener(CONTACT_INTENT_EVENT, handleContactIntent);
    };
  }, [onIntent]);
}
