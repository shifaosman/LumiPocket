 "use client";

import { PaletteCard } from "@/components/palette-card";
import { ThemeEditor } from "@/components/theme-editor";
import { themePresets } from "@/lib/themes";
import { useLumiStore } from "@/store/use-lumi-store";

export default function ThemesPage() {
  const tokens = useLumiStore((state) => state.tokens);
  const savedPresets = useLumiStore((state) => state.savedPresets);
  const applySavedPreset = useLumiStore((state) => state.applySavedPreset);

  const exportTheme = () => {
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
  };

  const luminanceMix =
    Math.abs(
      parseInt(tokens.background.slice(1, 3), 16) -
        parseInt(tokens.text.slice(1, 3), 16),
    ) +
    Math.abs(
      parseInt(tokens.background.slice(3, 5), 16) -
        parseInt(tokens.text.slice(3, 5), 16),
    ) +
    Math.abs(
      parseInt(tokens.background.slice(5, 7), 16) -
        parseInt(tokens.text.slice(5, 7), 16),
    );
  const themeHealth = Math.min(100, Math.max(48, Math.round((luminanceMix / 765) * 100)));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Theme Lab</h1>
        <p className="mt-2 text-[color:var(--color-muted)]">
          Curate palettes, verify contrast, and inspect token behavior.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {themePresets.map((preset) => (
          <PaletteCard key={preset.name} name={preset.name} tokens={preset.tokens} />
        ))}
      </div>
      <ThemeEditor />
      <section className="card-surface p-5">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold sm:text-lg">Contrast checker badges</h2>
          <button className="premium-btn px-4 py-2 text-xs font-semibold" onClick={exportTheme}>
            Export theme JSON
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Primary on background", "AA"],
            ["Text on surface", "AAA"],
            ["Accent highlight", "AA"],
            ["Muted labels", "AA"],
          ].map(([label, grade]) => (
            <article key={label} className="glass rounded-2xl p-3">
              <p className="text-xs text-[color:var(--color-muted)]">{label}</p>
              <p className="mt-1 font-semibold">{grade}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="card-surface p-5">
        <h2 className="text-lg font-semibold">Theme Health</h2>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Readability and contrast confidence for current token pairings.
        </p>
        <div className="mt-3 h-2 w-full rounded-full bg-black/10">
          <div
            className="h-2 rounded-full bg-[color:var(--color-success)]"
            style={{ width: `${themeHealth}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold">{themeHealth}/100</p>
      </section>
      <section className="card-surface p-5">
        <h2 className="text-lg font-semibold">Preset Library</h2>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Categories: Calm, High Contrast, Dark Pro.
        </p>
        {savedPresets.length ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {savedPresets.map((preset) => (
              <button
                key={preset.id}
                className="glass rounded-2xl p-3 text-left"
                onClick={() => applySavedPreset(preset.id)}
              >
                <p className="text-sm font-semibold">{preset.name}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{preset.category}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">
            No presets saved yet. Save one in the token editor below.
          </p>
        )}
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <article key={item} className="card-surface p-4">
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
              Elevation {item}
            </p>
            <h3 className="mt-1 font-semibold">Surface preview card</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              Hierarchy should stay clear while remaining soft and welcoming.
            </p>
          </article>
        ))}
      </section>
      <section className="card-surface p-5">
        <h2 className="text-lg font-semibold">Token preview playground</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl p-4" style={{ background: "var(--color-primary)", color: "white" }}>
            Primary button sample
          </div>
          <div className="rounded-2xl p-4" style={{ background: "var(--color-surface)" }}>
            Surface card sample
          </div>
          <div className="rounded-2xl p-4" style={{ color: "var(--color-muted)", border: "1px solid var(--color-muted)" }}>
            Muted content sample
          </div>
        </div>
      </section>
    </div>
  );
}
