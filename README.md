# LumiPocket

LumiPocket is a frontend-focused UI coaching workspace. It helps builders define theme tokens, validate usability constraints, apply them to reusable components, and save/share preset profiles.

## Case Study Summary

### Problem
- Many UI demos look polished but do not prove practical product value.
- Designers and frontend developers need one place to tune visual systems and verify accessibility outcomes quickly.

### Goal
- Build a portfolio-grade product that demonstrates both visual craft and engineering depth.
- Keep the experience emotionally warm while remaining production-minded.

## Getting Started

Install dependencies and start development:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and lint

```bash
npm run lint
npm run build
```

## Routes

- `/` Product overview + guided workflow entry
- `/studio` Companion Studio + motion instrumentation
- `/themes` Theme Lab + preset library + import/export + undo/redo
- `/components` Component Gallery + usage tips + interaction tests
- `/about` Architecture rationale, quality checks, and roadmap

## Architecture Decisions

- **App framework:** Next.js App Router + TypeScript for route-level composition.
- **State model:** Zustand + persist for cross-route continuity (`theme`, `companion`, `presets`, `history`).
- **UI system:** Tailwind + CSS token variables + Radix primitives for accessible controls.
- **Motion:** Framer Motion for route transitions, micro-interactions, and controllable animation intensity/speed.

## What This Demonstrates

- Design system thinking with token workflows and reusable presets.
- Stateful UI architecture with persistence, draft recovery, and undo/redo.
- Accessibility-first interaction patterns (focus states, reduced motion compatibility, contrast checks).
- Product-level UX decisions (guided workflow, validation feedback, empty/loading/error resilience).

## Trade-offs

- Frontend-only implementation keeps setup simple, but sharing and account sync remain mock/local.
- Theme health scoring is intentionally lightweight and fast rather than a full WCAG engine.
- Companion personality is optional to keep a professional mode available for stricter product contexts.

## Measurable Outcomes (Current)

- Theme configuration flow from blank state to reusable preset in under 2 minutes.
- Core quality checks surfaced directly in-product (keyboard support, reduced motion, state persistence, import validation).
- Supports up to 20 saved presets with category tagging and JSON import/export workflow.

## Benchmark Screenshots

- `public/benchmarks/render-time.svg` (render stability snapshot)
- `public/benchmarks/interaction-latency.svg` (interaction latency snapshot)
- `public/benchmarks/a11y-score.svg` (accessibility score snapshot)

## Future Enhancements

- Voice interaction for companion
- Save and share companion presets
- Guided onboarding tour
- Backend profile sync
