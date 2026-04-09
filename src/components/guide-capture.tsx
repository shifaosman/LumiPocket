"use client";

import { useEffect } from "react";
import { useCompanionGuide } from "@/hooks/use-companion-guide";

export function GuideCapture() {
  const { explainElement } = useCompanionGuide();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest<HTMLElement>(
        "button,a,input,select,textarea,[role='button'],[data-help-title]",
      );
      if (!interactive) return;
      explainElement(interactive);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [explainElement]);

  return null;
}
