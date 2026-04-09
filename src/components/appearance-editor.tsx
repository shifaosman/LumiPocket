"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useLumiStore } from "@/store/use-lumi-store";

export function AppearanceEditor() {
  const companion = useLumiStore((state) => state.companion);
  const setCompanion = useLumiStore((state) => state.setCompanion);
  const randomizeCompanion = useLumiStore((state) => state.randomizeCompanion);
  const companionEnabled = useLumiStore((state) => state.companionEnabled);
  const setCompanionEnabled = useLumiStore((state) => state.setCompanionEnabled);
  const companionScale = useLumiStore((state) => state.companionScale);
  const setCompanionScale = useLumiStore((state) => state.setCompanionScale);

  return (
    <section className="card-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Companion Studio</h3>
        <button
          onClick={randomizeCompanion}
          className="rounded-xl border px-3 py-1 text-sm"
          data-help-title="Randomize look"
          data-help-description="Instantly generates a fresh mascot style combination."
          data-help-usage="Use this to explore unexpected directions before refining details."
        >
          Randomize
        </button>
      </div>
      <label className="mb-4 block text-sm">
        Pet name
        <input
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={companion.petName}
          onChange={(e) => setCompanion({ petName: e.target.value })}
        />
      </label>
      <label className="mb-4 flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
        <span>Show companion on screen</span>
        <input
          aria-label="Show or hide companion character"
          type="checkbox"
          checked={companionEnabled}
          onChange={(e) => setCompanionEnabled(e.target.checked)}
        />
      </label>
      <Tabs.Root defaultValue="appearance">
        <Tabs.List className="mb-3 flex gap-2">
          <Tabs.Trigger className="rounded-lg border px-3 py-1.5" value="appearance">
            Appearance
          </Tabs.Trigger>
          <Tabs.Trigger className="rounded-lg border px-3 py-1.5" value="mood">
            Mood & Motion
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="appearance" className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="mb-2 text-sm">Choose character image style</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "classic-cream", src: "/characters/mochi-classic.svg", label: "Classic" },
                { key: "minty-pop", src: "/characters/mochi-minty.svg", label: "Minty" },
                { key: "peachy-glow", src: "/characters/mochi-peachy.svg", label: "Peachy" },
              ].map((skin) => (
                <button
                  key={skin.key}
                  className={`rounded-xl border p-2 text-xs ${
                    companion.skin === skin.key ? "border-[color:var(--color-primary)]" : ""
                  }`}
                  onClick={() => setCompanion({ skin: skin.key as never })}
                >
                  <Image src={skin.src} alt={skin.label} width={56} height={56} className="mx-auto" />
                  <span>{skin.label}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="text-sm">
            Body color
            <input
              type="color"
              className="mt-1 h-10 w-full rounded-lg"
              value={companion.bodyColor}
              onChange={(e) => setCompanion({ bodyColor: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Leaf color
            <input
              type="color"
              className="mt-1 h-10 w-full rounded-lg"
              value={companion.leafColor ?? "#8FD56A"}
              onChange={(e) => setCompanion({ leafColor: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Outfit accent
            <input
              type="color"
              className="mt-1 h-10 w-full rounded-lg"
              value={companion.outfitAccent}
              onChange={(e) => setCompanion({ outfitAccent: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Eye style
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={companion.eyeStyle}
              onChange={(e) => setCompanion({ eyeStyle: e.target.value as never })}
            >
              {["dot", "sparkle", "oval", "wink"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Accessory
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={companion.accessory}
              onChange={(e) => setCompanion({ accessory: e.target.value as never })}
            >
              {["none", "hat", "bow", "glasses", "star clip", "scarf"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm sm:col-span-2">
            <span>Show blush cheeks</span>
            <input
              type="checkbox"
              checked={companion.blushEnabled ?? true}
              onChange={(e) => setCompanion({ blushEnabled: e.target.checked })}
            />
          </label>
        </Tabs.Content>
        <Tabs.Content value="mood" className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Expression
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={companion.expression}
              onChange={(e) => setCompanion({ expression: e.target.value as never })}
            >
              {["happy", "curious", "focused", "sleepy"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Idle animation
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={companion.idleStyle}
              onChange={(e) => setCompanion({ idleStyle: e.target.value as never })}
            >
              {["float", "bounce", "tilt"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm sm:col-span-2">
            Character size ({Math.round(companionScale * 100)}%)
            <input
              aria-label="Resize companion character"
              type="range"
              min={70}
              max={160}
              value={Math.round(companionScale * 100)}
              className="mt-2 w-full"
              onChange={(e) => setCompanionScale(Number(e.target.value) / 100)}
            />
          </label>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
