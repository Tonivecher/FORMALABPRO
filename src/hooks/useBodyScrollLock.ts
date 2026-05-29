import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";

function lockBodyScroll() {
  if (typeof document === "undefined") {
    return;
  }

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  lockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === "undefined" || lockCount === 0) {
    return;
  }

  lockCount -= 1;

  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = "";
  }
}

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    lockBodyScroll();
    return unlockBodyScroll;
  }, [isLocked]);
}
