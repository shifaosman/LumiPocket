"use client";

import { ThemeTokens } from "@/lib/themes";
import { useLumiStore } from "@/store/use-lumi-store";

export function PaletteCard({
  name,
  tokens,
}: {
  name: string;
  tokens: ThemeTokens;
}) {
  const setTheme = useLumiStore((state) => state.setTheme);
  return (
    <button
      className="card-surface w-full p-4 text-left transition hover:-translate-y-1"
      onClick={() => setTheme(name, tokens)}
      data-help-title={`${name} palette`}
      data-help-description="A curated token set for brand-level visual consistency."
      data-help-usage="Tap to apply this mood instantly, then tweak details in the editor."
    >
      <p className="mb-3 text-sm font-semibold">{name}</p>
      <div className="flex gap-2">
        {[tokens.primary, tokens.secondary, tokens.accent, tokens.background].map(
          (item) => (
            <span
              key={item}
              className="h-7 w-7 rounded-full border border-white/60 shadow-sm"
              style={{ backgroundColor: item }}
            />
          ),
        )}
      </div>
    </button>
  );
}
