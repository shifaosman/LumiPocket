import { MotionCard } from "@/components/motion-card";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="card-surface p-6">
        <h1 className="text-3xl font-bold">About LumiPocket</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--color-muted)]">
          LumiPocket is designed as a practical frontend system builder: define tokens,
          validate usability, pressure-test components, and package decisions into reusable
          presets. The mascot adds personality, but the product focus is speed and clarity.
        </p>
        <p className="mt-2 text-xs text-[color:var(--color-muted)]">
          Recruiter-focused copy is available on the home page for concise portfolio storytelling.
        </p>
      </header>
      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Product Journey Timeline</h2>
        <div className="mt-4 space-y-4">
          {[
            ["Concept", "Companion-centered UX and playful SaaS visual identity."],
            ["System", "Tokenized theme architecture and shared state continuity."],
            ["Craft", "Framer Motion polish and component-rich interaction patterns."],
          ].map(([title, desc]) => (
            <div key={title} className="grid gap-1 sm:grid-cols-[90px_1fr] sm:gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">{title}</p>
              <p className="text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {[
          "Design system thinking",
          "Animation craftsmanship",
          "Stateful UI architecture",
          "Accessibility and responsiveness",
          "Personal style and product taste",
        ].map((item) => (
          <MotionCard key={item}>
            <h2 className="font-semibold">{item}</h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              Implemented with intentional spacing, themed tokens, route persistence, and
              companion-led guidance UX.
            </p>
          </MotionCard>
        ))}
      </section>
      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Engineering proof checklist</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Keyboard support", "Pass", "Tab navigation and focus rings tested across pages."],
            ["Reduced motion", "Pass", "Motion respects user preference and speed controls."],
            ["State persistence", "Pass", "Themes and companion settings persist in localStorage."],
            ["Error resilience", "Pass", "Import validation and fallback feedback are in place."],
          ].map(([title, status, note]) => (
            <article key={title} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{title}</p>
                <span className="rounded-full border px-2 py-0.5 text-xs">{status}</span>
              </div>
              <p className="mt-2 text-xs text-[color:var(--color-muted)]">{note}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Architecture Highlights</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            "Global Zustand store for theme, companion, and guidance",
            "App-shell based route continuity with shared transitions",
            "Undo/redo + draft recovery + preset import/export validation",
          ].map((item) => (
            <div key={item} className="glass rounded-2xl p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Measured outcomes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Theme setup time", "Under 2 min"],
            ["Accessibility checks surfaced", "4 core checks"],
            ["Reusable preset capacity", "20 profiles"],
          ].map(([k, v]) => (
            <article key={k} className="glass rounded-2xl p-4">
              <p className="text-xs text-[color:var(--color-muted)]">{k}</p>
              <p className="mt-1 text-lg font-semibold">{v}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Future Enhancements</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Voice interaction for companion",
            "Save and share companion presets",
            "Guided onboarding tour",
            "Backend profile sync",
          ].map((item) => (
            <article key={item} className="glass rounded-2xl p-4 text-sm">
              {item}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
