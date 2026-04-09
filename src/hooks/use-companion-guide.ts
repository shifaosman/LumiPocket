"use client";

import { useLumiStore } from "@/store/use-lumi-store";

const fallbackByRole: Record<
  string,
  { title: string; what: string; how: string }
> = {
  button: {
    title: "Action Button",
    what: "This triggers an action in the interface.",
    how: "Activate it with click, tap, or Enter/Space from keyboard focus.",
  },
  input: {
    title: "Input Field",
    what: "This is where you provide a value.",
    how: "Type naturally, then confirm by leaving the field or pressing Enter.",
  },
  link: {
    title: "Navigation Link",
    what: "This takes you to another section or page.",
    how: "Use click or Enter while focused to move without losing your settings.",
  },
  default: {
    title: "Helpful Surface",
    what: "This part gives context or controls.",
    how: "Explore it; your companion will explain each interactive element.",
  },
};

const buildGuide = (target: HTMLElement) => {
  const role =
    target.getAttribute("role") ??
    (target instanceof HTMLButtonElement
      ? "button"
      : target instanceof HTMLInputElement
        ? "input"
        : target instanceof HTMLAnchorElement
          ? "link"
          : "default");
  const title = target.dataset.helpTitle ?? fallbackByRole[role]?.title;
  const what = target.dataset.helpDescription ?? fallbackByRole[role]?.what;
  const how = target.dataset.helpUsage ?? fallbackByRole[role]?.how;
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: title ?? fallbackByRole.default.title,
    what: what ?? fallbackByRole.default.what,
    how: how ?? fallbackByRole.default.how,
    kind: (target.dataset.helpKind as "quick tip" | "step-by-step" | "did you know") ?? "quick tip",
    steps:
      target.dataset.helpKind === "step-by-step"
        ? [
            "Choose the option that matches your intent.",
            "Check visual feedback and confirmation state.",
            "Save or continue to keep your progress.",
          ]
        : undefined,
  };
};

export const useCompanionGuide = () => {
  const enqueueGuide = useLumiStore((state) => state.enqueueGuide);

  const explainElement = (target: HTMLElement | null) => {
    if (!target) return;
    enqueueGuide(buildGuide(target));
  };

  return { explainElement };
};
