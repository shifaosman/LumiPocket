"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useLumiStore } from "@/store/use-lumi-store";

export function ToastStack() {
  const toasts = useLumiStore((state) => state.toasts);
  const dismissToast = useLumiStore((state) => state.dismissToast);

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismissToast(toast.id), 3500),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [dismissToast, toasts]);

  return (
    <div className="fixed bottom-24 left-4 z-50 flex w-[min(88vw,360px)] flex-col gap-2 sm:left-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="card-surface p-3"
          >
            <p className="text-sm font-semibold">{toast.title}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
