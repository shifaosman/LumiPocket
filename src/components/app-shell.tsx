"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Companion } from "@/components/companion";
import { CommandPalette } from "@/components/command-palette";
import { FloatingOrbs } from "@/components/floating-orbs";
import { ToastStack } from "@/components/toast-stack";
import { themePresets } from "@/lib/themes";
import { useLumiStore } from "@/store/use-lumi-store";

const routes = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Companion Studio" },
  { href: "/themes", label: "Theme Lab" },
  { href: "/components", label: "UI Showcase" },
  { href: "/about", label: "About" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const tokens = useLumiStore((state) => state.tokens);
  const themeName = useLumiStore((state) => state.themeName);
  const setTheme = useLumiStore((state) => state.setTheme);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [tokens]);

  return (
    <div className="grain relative min-h-screen pb-32">
      <FloatingOrbs />
      <header
        className="sticky top-0 z-20 backdrop-blur"
        style={{
          borderBottom: "1px solid color-mix(in oklab, var(--color-muted) 28%, transparent)",
          background:
            "color-mix(in oklab, var(--color-surface) 86%, var(--color-background))",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="font-semibold tracking-tight"
            data-help-title="LumiPocket logo"
            data-help-description="Brand home anchor and playful easter egg trigger."
            data-help-usage="Click to return home and wave at your companion."
          >
            LumiPocket
          </Link>
          <nav
            className="flex gap-1 rounded-2xl p-1"
            style={{
              border: "1px solid color-mix(in oklab, var(--color-muted) 34%, transparent)",
              background:
                "color-mix(in oklab, var(--color-surface) 78%, var(--color-background))",
            }}
          >
            {routes.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-3 py-1.5 text-xs sm:text-sm ${
                    active ? "text-white" : "text-[color:var(--color-muted)]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-xl bg-[color:var(--color-primary)]"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => {
              const nextTheme = themeName === "Midnight Glow" ? "Cotton Candy" : "Midnight Glow";
              const target = themePresets.find((item) => item.name === nextTheme);
              if (target) setTheme(target.name, target.tokens);
            }}
            className="ml-2 rounded-xl px-3 py-1.5 text-xs"
            style={{
              border: "1px solid color-mix(in oklab, var(--color-muted) 34%, transparent)",
              background:
                "color-mix(in oklab, var(--color-surface) 76%, var(--color-background))",
              color: "var(--color-text)",
            }}
            data-help-title="Dark and light switch"
            data-help-description="Toggles between a bright and dark base palette."
            data-help-usage="Use this for quick contrast checks before fine-tuning individual tokens."
          >
            {themeName === "Midnight Glow" ? "Light mode" : "Dark mode"}
          </button>
          <button
            className="ml-2 rounded-xl border px-3 py-1.5 text-xs"
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
          >
            Cmd/Ctrl + K
          </button>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <footer className="mx-auto mt-10 max-w-6xl px-4 pb-24 text-sm text-[color:var(--color-muted)] sm:px-6">
        Crafted with care for a portfolio-grade startup demo experience.
      </footer>
      <ToastStack />
      <CommandPalette />
      <Companion />
    </div>
  );
}
