 "use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as Slider from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import { useState } from "react";
import { AppearanceEditor } from "@/components/appearance-editor";
import { useLumiStore } from "@/store/use-lumi-store";

export default function StudioPage() {
  const [compare, setCompare] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const speed = useLumiStore((state) => state.animationSpeed);
  const intensity = useLumiStore((state) => state.animationIntensity);
  const setAnimationSpeed = useLumiStore((state) => state.setAnimationSpeed);
  const setAnimationIntensity = useLumiStore((state) => state.setAnimationIntensity);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Companion Studio</h1>
        <p className="mt-2 text-[color:var(--color-muted)]">
          Shape your mascot personality, style, and idle behavior.
        </p>
      </header>
      <Tabs.Root defaultValue="customize" className="card-surface p-4 sm:p-6">
        <Tabs.List className="relative mb-4 flex gap-2 overflow-x-auto border-b pb-2 [scrollbar-width:none]">
          {["customize", "preview", "motion"].map((item) => (
            <Tabs.Trigger
              key={item}
              value={item}
              className="shrink-0 rounded-xl px-3 py-1.5 text-sm capitalize data-[state=active]:bg-[color:var(--color-primary)] data-[state=active]:text-white"
            >
              {item}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="customize" className="space-y-4">
          <AppearanceEditor />
          <div className="flex flex-wrap gap-2">
            {["Soft Hero", "Mini Mentor", "Spark Buddy", "Focus Mode"].map((chip) => (
              <button key={chip} className="glass rounded-full px-3 py-1.5 text-xs">
                {chip}
              </button>
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content value="preview">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div layout className="glass rounded-2xl p-4">
              <h3 className="font-semibold">Live Preview Stage</h3>
              <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                Watch companion personality updates in real-time.
              </p>
            </motion.div>
            <div className="glass rounded-2xl p-4">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold">Before / After</h3>
                <button
                  className="rounded-lg border px-3 py-1.5 text-xs"
                  onClick={() => setCompare((state) => !state)}
                >
                  {compare ? "Show before" : "Show after"}
                </button>
              </div>
              <motion.div
                key={String(compare)}
                initial={{ opacity: 0.35, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border p-4 text-sm"
              >
                {compare ? "After: richer glow, bolder expression, livelier bounce." : "Before: calm base style and neutral balance."}
              </motion.div>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="motion" className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <p className="text-sm font-semibold">Animation controls</p>
            <div className="mt-3 space-y-4">
              <div>
                <p className="mb-2 text-xs text-[color:var(--color-muted)]">Speed: {speed}%</p>
                <Slider.Root
                  value={[speed]}
                  onValueChange={([v]) => setAnimationSpeed(v)}
                  max={100}
                  className="relative h-5"
                >
                  <Slider.Track className="relative h-2 rounded-full bg-black/10">
                    <Slider.Range className="absolute h-2 rounded-full bg-[color:var(--color-primary)]" />
                  </Slider.Track>
                  <Slider.Thumb className="block h-4 w-4 rounded-full bg-white" />
                </Slider.Root>
              </div>
              <div>
                <p className="mb-2 text-xs text-[color:var(--color-muted)]">
                  Intensity: {intensity}%
                </p>
                <Slider.Root
                  value={[intensity]}
                  onValueChange={([v]) => setAnimationIntensity(v)}
                  max={100}
                  className="relative h-5"
                >
                  <Slider.Track className="relative h-2 rounded-full bg-black/10">
                    <Slider.Range className="absolute h-2 rounded-full bg-[color:var(--color-secondary)]" />
                  </Slider.Track>
                  <Slider.Thumb className="block h-4 w-4 rounded-full bg-white" />
                </Slider.Root>
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-sm font-semibold">Performance instrumentation</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border p-3">
                <p className="text-xs text-[color:var(--color-muted)]">Animation load</p>
                <p className="mt-1 text-sm font-semibold">
                  {speed > 85 || intensity > 85 ? "High" : speed > 65 || intensity > 65 ? "Medium" : "Low"}
                </p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-xs text-[color:var(--color-muted)]">Reduced motion</p>
                <p className="mt-1 text-sm font-semibold">{reducedMotion ? "Enabled" : "Disabled"}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-xs text-[color:var(--color-muted)]">Suggested FPS budget</p>
                <p className="mt-1 text-sm font-semibold">60fps target</p>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
