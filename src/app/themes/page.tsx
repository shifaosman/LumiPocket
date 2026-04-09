 "use client";

import { PaletteCard } from "@/components/palette-card";
import { ThemeEditor } from "@/components/theme-editor";
import { themePresets } from "@/lib/themes";
import { useLumiStore } from "@/store/use-lumi-store";

export default function ThemesPage() {
  const tokens = useLumiStore((state) => state.tokens);

  const exportTheme = () => {
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
  };

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
