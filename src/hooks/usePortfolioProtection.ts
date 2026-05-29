import { useEffect } from "react";

export function usePortfolioProtection() {
  useEffect(() => {
    // 1. GREETING FOR DEVELOPERS / SCRAPERS IN CONSOLE
    console.log(
      "%cFORMALAB // КОНСТРУКТОРСКАЯ ДИСЦИПЛИНА\n" +
      "%cПриветствуем! Мы скрупулезно подходим к проектированию мебели и ценим интеллектуальную собственность.\n" +
      "Все чертежи, фотографии и текстовые материалы защищены авторским правом. \n" +
      "Хотите работать вместе или обсудить проект? Напишите нам в разделе Бриф!\n" +
      "https://formalab.ru",
      "color: #C5A46D; font-family: monospace; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em;",
      "color: #8A6242; font-family: sans-serif; font-size: 12px; line-height: 1.5;"
    );

    // 2. DISABLE CONTEXT MENU (RIGHT CLICK) EXCEPT FOR FORM INPUTS/TEXTAREAS
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest("input") ||
        target.closest("textarea");

      if (!isInput) {
        e.preventDefault();
      }
    };

    // 3. DISABLE IMAGE DRAG & DROP (Prevent saving images by dragging to desktop/search)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("img")) {
        e.preventDefault();
      }
    };

    // 4. BLOCK KEYBOARD SHORTCUTS (Ctrl+S, Cmd+S, Ctrl+U, Cmd+Option+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      // Disable Save Page: Ctrl+S / Cmd+S
      if (modifier && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return;
      }

      // Disable View Source: Ctrl+U / Cmd+Option+U (Note: Cmd+Opt+U on Mac uses e.altKey)
      if (e.key.toLowerCase() === "u" && (modifier || (isMac && modifier && e.altKey))) {
        e.preventDefault();
        return;
      }
    };

    // Attach listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
