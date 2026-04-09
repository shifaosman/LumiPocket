 "use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const showcases = [
  "Companion-led onboarding moments",
  "Realtime theme token orchestration",
  "High-fidelity UI micro interactions",
];

const testimonials = [
  "This looks like a real startup MVP, not a toy project.",
  "The transitions and hierarchy are instantly memorable.",
  "A companion UI this polished is portfolio gold.",
];

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);
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
          Premium companion-first UI system that feels alive.
        </motion.h1>
        <p className="mt-5 max-w-2xl text-[color:var(--color-muted)]">
          A delightful SaaS-style showcase where every click teaches, every panel responds,
          and every route feels like one cohesive product.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/studio" className="premium-btn px-5 py-3 text-sm font-semibold">
            Launch Studio
          </Link>
          <Link href="/components" className="glass rounded-2xl px-5 py-3 text-sm font-semibold">
            Browse Component Gallery
          </Link>
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
    </div>
  );
}
