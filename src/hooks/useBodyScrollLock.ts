import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";
let previousPosition = "";
let previousTop = "";
let previousWidth = "";
let lockedScrollY = 0;

function lockBodyScroll() {
  if (typeof document === "undefined") {
    return;
  }

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    previousPosition = document.body.style.position;
    previousTop = document.body.style.top;
    previousWidth = document.body.style.width;
    lockedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
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
    document.body.style.position = previousPosition;
    document.body.style.top = previousTop;
    document.body.style.width = previousWidth;
    window.scrollTo(0, lockedScrollY);
    previousOverflow = "";
    previousPosition = "";
    previousTop = "";
    previousWidth = "";
    lockedScrollY = 0;
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
