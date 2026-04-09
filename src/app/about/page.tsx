import { MotionCard } from "@/components/motion-card";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="card-surface p-6">
        <h1 className="text-3xl font-bold">About LumiPocket</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--color-muted)]">
          LumiPocket explores how emotionally warm product design can feel premium,
          scalable, and portfolio-ready. It blends live token theming with a persistent
          companion guide so interaction feels coached, not mechanical.
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
        <h2 className="text-xl font-semibold">What this project demonstrates</h2>
        <p className="mt-3 text-sm text-[color:var(--color-muted)]">
          A complete frontend product demo built with Next.js App Router, TypeScript,
          Tailwind CSS, Framer Motion, Zustand persistence, and Radix UI primitives.
        </p>
      </section>
      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Architecture Highlights</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            "Global Zustand store for theme, companion, and guidance",
            "App-shell based route continuity with shared transitions",
            "Composable feature cards for scalable design systems",
          ].map((item) => (
            <div key={item} className="glass rounded-2xl p-4 text-sm">
              {item}
            </div>
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
