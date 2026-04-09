"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
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
  const [presetName, setPresetName] = useState("");
  const [presetCategory, setPresetCategory] = useState<"Calm" | "High Contrast" | "Dark Pro">(
    "Calm",
  );
  const [importText, setImportText] = useState("");
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const tokens = useLumiStore((state) => state.tokens);
  const patchTheme = useLumiStore((state) => state.patchTheme);
  const resetTheme = useLumiStore((state) => state.resetTheme);
  const undoTheme = useLumiStore((state) => state.undoTheme);
  const redoTheme = useLumiStore((state) => state.redoTheme);
  const saveThemeDraft = useLumiStore((state) => state.saveThemeDraft);
  const restoreThemeDraft = useLumiStore((state) => state.restoreThemeDraft);
  const saveCurrentPreset = useLumiStore((state) => state.saveCurrentPreset);
  const importPresetFromJson = useLumiStore((state) => state.importPresetFromJson);
  const savedPresets = useLumiStore((state) => state.savedPresets);
  const applySavedPreset = useLumiStore((state) => state.applySavedPreset);
  const pushToast = useLumiStore((state) => state.pushToast);

  return (
    <section className="card-surface p-5">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold">Token Theme Editor</h3>
        <button onClick={undoTheme} className="rounded-xl border px-3 py-1 text-sm">
          Undo
        </button>
        <button onClick={redoTheme} className="rounded-xl border px-3 py-1 text-sm">
          Redo
        </button>
        <button
          onClick={() => {
            saveThemeDraft();
            pushToast("Draft saved", "You can restore this theme state anytime.");
          }}
          className="rounded-xl border px-3 py-1 text-sm"
        >
          Save draft
        </button>
        <button onClick={restoreThemeDraft} className="rounded-xl border px-3 py-1 text-sm">
          Restore draft
        </button>
        <button
          onClick={resetTheme}
          className="rounded-xl border px-3 py-1 text-sm"
          data-help-title="Reset theme"
          data-help-description="Restore all design tokens to the default palette."
          data-help-usage="Use this when experimentation gets messy and you want a clean baseline."
        >
          Reset default
        </button>
        <p className="text-xs text-[color:var(--color-muted)]">
          Autosave is always on. Use restore draft to recover last edited state.
        </p>
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

      <div className="mt-6 grid gap-3 sm:grid-cols-[2fr_1fr_auto]">
        <input
          value={presetName}
          onChange={(event) => setPresetName(event.target.value)}
          className="rounded-xl border px-3 py-2 text-sm"
          placeholder="Preset name"
        />
        <select
          className="rounded-xl border px-3 py-2 text-sm"
          value={presetCategory}
          onChange={(event) =>
            setPresetCategory(event.target.value as "Calm" | "High Contrast" | "Dark Pro")
          }
        >
          <option>Calm</option>
          <option>High Contrast</option>
          <option>Dark Pro</option>
        </select>
        <button
          className="rounded-xl border px-3 py-2 text-sm"
          onClick={() => saveCurrentPreset(presetName, presetCategory)}
        >
          Save preset
        </button>
      </div>

      {savedPresets.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {savedPresets.map((preset) => (
            <button
              key={preset.id}
              className="rounded-xl border p-3 text-left"
              onClick={() => applySavedPreset(preset.id)}
            >
              <p className="text-sm font-semibold">{preset.name}</p>
              <p className="text-xs text-[color:var(--color-muted)]">{preset.category}</p>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium">Import preset JSON</p>
        <textarea
          value={importText}
          onChange={(event) => setImportText(event.target.value)}
          className="min-h-28 w-full rounded-xl border p-3 text-xs"
          placeholder='Paste JSON with keys like {"primary":"#...","secondary":"#..."}'
        />
        <div className="mt-2 flex items-center gap-2">
          <button
            className="rounded-xl border px-3 py-1.5 text-sm"
            onClick={() => {
              const result = importPresetFromJson(importText);
              setImportFeedback(result.message);
            }}
          >
            Validate and import
          </button>
          {importFeedback && (
            <p className="text-xs text-[color:var(--color-muted)]">{importFeedback}</p>
          )}
        </div>
      </div>
    </section>
  );
}
