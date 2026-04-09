"use client";

import * as Slider from "@radix-ui/react-slider";
import { ThemeTokens } from "@/lib/themes";
import { useLumiStore } from "@/store/use-lumi-store";

const tokenKeys: Array<keyof ThemeTokens> = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "text",
  "muted",
  "success",
  "warning",
  "error",
];

export function ThemeEditor() {
  const tokens = useLumiStore((state) => state.tokens);
  const patchTheme = useLumiStore((state) => state.patchTheme);
  const resetTheme = useLumiStore((state) => state.resetTheme);

  return (
    <section className="card-surface p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Token Theme Editor</h3>
        <button
          onClick={resetTheme}
          className="rounded-xl border px-3 py-1 text-sm"
          data-help-title="Reset theme"
          data-help-description="Restore all design tokens to the default palette."
          data-help-usage="Use this when experimentation gets messy and you want a clean baseline."
        >
          Reset default
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tokenKeys.map((key) => (
          <label key={key} className="space-y-2 text-sm">
            <span className="capitalize">{key}</span>
            <input
              aria-label={`${key} color`}
              type="color"
              value={tokens[key]}
              className="h-10 w-full cursor-pointer rounded-lg"
              onChange={(event) => patchTheme({ [key]: event.target.value })}
              data-help-title={`${key} token`}
              data-help-description={`Sets the ${key} color across the UI system.`}
              data-help-usage="Choose a color that preserves readability and hierarchy."
            />
          </label>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-sm font-medium">Transition speed</p>
        <Slider.Root defaultValue={[70]} max={100} step={1} className="relative h-6">
          <Slider.Track className="relative h-2 grow rounded-full bg-black/10">
            <Slider.Range className="absolute h-full rounded-full bg-[color:var(--color-primary)]" />
          </Slider.Track>
          <Slider.Thumb className="block h-4 w-4 rounded-full bg-white shadow" />
        </Slider.Root>
      </div>
    </section>
  );
}
