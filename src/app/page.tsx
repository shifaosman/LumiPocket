 "use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLumiStore } from "@/store/use-lumi-store";

const showcases = [
  "Theme coaching that improves visual consistency",
  "Accessibility-aware token workflow",
  "Production-like UI architecture and motion patterns",
];

const testimonials = [
  "We used LumiPocket to lock a contrast-safe palette in one session.",
  "The workflow from theme creation to component preview is crystal clear.",
  "It feels like a practical frontend tool, not just a visual playground.",
];

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const professionalMode = useLumiStore((state) => state.professionalMode);
  const landingCopyVariant = useLumiStore((state) => state.landingCopyVariant);
  const setLandingCopyVariant = useLumiStore((state) => state.setLandingCopyVariant);
  const counters = useMemo(
    () => [
      { label: "Interactive states", value: "46+" },
      { label: "Animated surfaces", value: "28" },
      { label: "Tokenized variables", value: "10" },
      { label: "Routes with continuity", value: "5" },
    ],
    [],
  );

  return (
    <div className="space-y-10">
      <section className="card-surface relative overflow-hidden p-5 sm:p-8 lg:p-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[color:var(--color-accent)]/20 blur-3xl" />
        <p className="mb-3 text-sm font-medium text-[color:var(--color-muted)]">LumiPocket</p>
        <motion.h1
          className="gradient-title max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {landingCopyVariant === "recruiter"
            ? "Frontend engineer showcase: product thinking, polish, and system depth."
            : "Build accessible, production-ready UI systems faster."}
        </motion.h1>
        <p className="mt-5 max-w-2xl text-[color:var(--color-muted)]">
          {landingCopyVariant === "recruiter"
            ? "This version highlights implementation quality: state architecture, accessibility, motion control, and reusable theme workflows recruiters can evaluate quickly."
            : "LumiPocket is a frontend-focused assistant for designers and engineers who need cohesive themes, strong accessibility, and reusable component decisions in one flow."}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setLandingCopyVariant("product")}
            className={`rounded-xl px-3 py-1.5 text-xs ${landingCopyVariant === "product" ? "bg-[color:var(--color-primary)] text-white" : "border"}`}
          >
            Product copy
          </button>
          <button
            onClick={() => setLandingCopyVariant("recruiter")}
            className={`rounded-xl px-3 py-1.5 text-xs ${landingCopyVariant === "recruiter" ? "bg-[color:var(--color-primary)] text-white" : "border"}`}
          >
            Recruiter copy
          </button>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/themes" className="premium-btn px-5 py-3 text-sm font-semibold">
            Start with Theme Lab
          </Link>
          <Link href="/components" className="glass rounded-2xl px-5 py-3 text-sm font-semibold">
            Apply in Component Gallery
          </Link>
        </div>
        {professionalMode && (
          <p className="mt-4 text-xs text-[color:var(--color-muted)]">
            Professional mode is active: reduced visual noise, tighter hierarchy, stronger scanability.
          </p>
        )}
      </section>

      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Recommended workflow</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            ["1", "Create tokens", "/themes"],
            ["2", "Validate contrast", "/themes"],
            ["3", "Test components", "/components"],
            ["4", "Save and export preset", "/themes"],
          ].map(([step, label, href]) => (
            <Link key={`${step}-${label}`} href={href} className="glass rounded-2xl p-4">
              <p className="text-xs text-[color:var(--color-muted)]">Step {step}</p>
              <p className="mt-1 text-sm font-semibold">{label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {showcases.map((item, index) => (
          <motion.article
            key={item}
            whileHover={{ y: -6, rotateX: -4, rotateY: 4 }}
            className="card-surface p-5"
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="text-xs text-[color:var(--color-muted)]">Feature {index + 1}</p>
            <h3 className="mt-2 text-lg font-semibold">{item}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              Designed with tactile states, glass layers, and expressive motion timing.
            </p>
          </motion.article>
        ))}
      </section>

      <section className="card-surface p-6">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Founder-style testimonials</h2>
          <div className="flex gap-2">
            <button
              className="glass rounded-xl p-2"
              onClick={() => setCarouselIndex((state) => (state - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="glass rounded-xl p-2"
              onClick={() => setCarouselIndex((state) => (state + 1) % testimonials.length)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <motion.p
          key={carouselIndex}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg text-[color:var(--color-muted)]"
        >
          “{testimonials[carouselIndex]}”
        </motion.p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {counters.map((item) => (
          <motion.article
            key={item.label}
            className="card-surface p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{item.label}</p>
          </motion.article>
        ))}
      </section>

      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">What this project demonstrates</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Design system thinking",
            "Animation craftsmanship",
            "Stateful UI architecture",
            "Accessibility and responsiveness",
            "Personal style and product taste",
          ].map((item) => (
            <motion.div key={item} whileHover={{ y: -4 }} className="glass rounded-2xl p-4">
              <Star size={14} />
              <p className="mt-2 text-sm font-semibold">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <article className="card-surface p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
            Accessibility
          </p>
          <h3 className="mt-2 font-semibold">Keyboard and contrast-first</h3>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Focus-visible rings, responsive controls, and contrast validation are built into
            the main workflow.
          </p>
        </article>
        <article className="card-surface p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
            Performance
          </p>
          <h3 className="mt-2 font-semibold">Measured animation behavior</h3>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Motion speed/intensity controls and reduced-motion handling keep interaction smooth
            across device classes.
          </p>
        </article>
        <article className="card-surface p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
            State architecture
          </p>
          <h3 className="mt-2 font-semibold">Reusable persistent model</h3>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Shared Zustand slices coordinate themes, presets, and companion controls across all
            routes.
          </p>
        </article>
      </section>

      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold">Benchmark snapshots</h2>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Lightweight visual benchmarks used to communicate performance and quality outcomes.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["/benchmarks/render-time.svg", "Render Stability"],
            ["/benchmarks/interaction-latency.svg", "Interaction Latency"],
            ["/benchmarks/a11y-score.svg", "Accessibility Score"],
          ].map(([src, title]) => (
            <article key={title} className="glass rounded-2xl p-3">
              <Image
                src={src}
                alt={`${title} benchmark screenshot`}
                width={360}
                height={200}
                className="h-auto w-full rounded-xl border"
              />
              <p className="mt-2 text-sm font-semibold">{title}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
