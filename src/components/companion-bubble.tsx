"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pin, PinOff, X } from "lucide-react";
import { useEffect } from "react";
import { useLumiStore } from "@/store/use-lumi-store";

export function CompanionBubble() {
  const activeGuide = useLumiStore((state) => state.activeGuide);
  const dismissGuide = useLumiStore((state) => state.dismissGuide);
  const pinnedBubble = useLumiStore((state) => state.pinnedBubble);
  const setPinnedBubble = useLumiStore((state) => state.setPinnedBubble);

  useEffect(() => {
    if (!activeGuide || pinnedBubble) return;
    const timer = window.setTimeout(() => dismissGuide(), 4300);
    return () => window.clearTimeout(timer);
  }, [activeGuide, dismissGuide, pinnedBubble]);

  return (
    <AnimatePresence mode="wait">
      {activeGuide && (
        <motion.div
          key={activeGuide.id}
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          className="card-surface absolute -top-52 right-0 z-30 w-[min(22rem,88vw)] p-4"
          aria-live="polite"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold">{activeGuide.title}</h4>
            <div className="flex gap-2">
              <button
                aria-label={pinnedBubble ? "Unpin speech bubble" : "Pin speech bubble"}
                onClick={() => setPinnedBubble(!pinnedBubble)}
                className="rounded-lg p-1.5 hover:bg-black/5"
              >
                {pinnedBubble ? <PinOff size={14} /> : <Pin size={14} />}
              </button>
              <button
                aria-label="Dismiss speech bubble"
                onClick={dismissGuide}
                className="rounded-lg p-1.5 hover:bg-black/5"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <p className="text-xs text-[color:var(--color-muted)]">
            <strong className="uppercase tracking-wide text-[10px]">{activeGuide.kind}</strong>
          </p>
          <p className="mt-2 text-xs text-[color:var(--color-muted)]">
            <strong>What it is:</strong> {activeGuide.what}
          </p>
          <p className="mt-2 text-xs text-[color:var(--color-muted)]">
            <strong>How to use:</strong> {activeGuide.how}
          </p>
          {activeGuide.steps && (
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-[color:var(--color-muted)]">
              {activeGuide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
