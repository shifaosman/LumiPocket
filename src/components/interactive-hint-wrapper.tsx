"use client";

import { ReactNode } from "react";
import { useCompanionGuide } from "@/hooks/use-companion-guide";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  usage: string;
  className?: string;
};

export function InteractiveHintWrapper({
  children,
  title,
  description,
  usage,
  className,
}: Props) {
  const { explainElement } = useCompanionGuide();
  return (
    <div
      className={className}
      data-help-title={title}
      data-help-description={description}
      data-help-usage={usage}
      onClick={(event) => explainElement(event.currentTarget)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          explainElement(event.currentTarget);
        }
      }}
    >
      {children}
    </div>
  );
}
