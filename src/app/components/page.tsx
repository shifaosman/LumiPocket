"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLumiStore } from "@/store/use-lumi-store";

export default function ComponentsPage() {
  const pushToast = useLumiStore((state) => state.pushToast);
  const [toast, setToast] = useState(false);
  const [step, setStep] = useState(0);
  const [items, setItems] = useState(["Hero card", "Stats card", "CTA card"]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emptyActive, setEmptyActive] = useState(false);

  const move = (from: number, to: number) => {
    const clone = [...items];
    const [value] = clone.splice(from, 1);
    clone.splice(to, 0, value);
    setItems(clone);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Component Gallery</h1>
        <p className="mt-2 text-[color:var(--color-muted)]">
          Inputs, overlays, feedback, and data display with animated polish.
        </p>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="card-surface space-y-3 p-5">
          <h2 className="font-semibold">Inputs</h2>
          <button className="premium-btn px-4 py-2">
            Primary action
          </button>
          <input className="w-full rounded-xl border px-3 py-2 glass" placeholder="Type something..." />
          <span className="inline-flex rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-xs font-semibold">
            Badge
          </span>
        </article>
        <article className="card-surface space-y-3 p-5">
          <h2 className="font-semibold">Overlays</h2>
          <Dialog.Root>
            <Dialog.Trigger className="rounded-xl border px-4 py-2">Open modal</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30" />
              <Dialog.Content className="card-surface fixed left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 p-5 data-[state=open]:animate-in">
                <Dialog.Title className="font-semibold">LumiPocket Modal</Dialog.Title>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                  Great for focused tasks that need temporary attention.
                </p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Popover.Root>
            <Popover.Trigger className="rounded-xl border px-4 py-2">
              Open popover
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="card-surface p-3 text-sm">
                Compact context for lightweight guidance.
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <button
            className="rounded-xl border px-4 py-2"
            onClick={() => {
              setToast(true);
              setTimeout(() => setToast(false), 2200);
              pushToast("Toast", "This action demonstrates stacked animated toasts.");
            }}
          >
            Trigger toast
          </button>
        </article>
        <article className="card-surface space-y-3 p-5">
          <h2 className="font-semibold">Tooltip variants</h2>
          <Tooltip.Provider>
            <div className="flex flex-wrap gap-2">
              {["Info", "Success", "Warning"].map((item) => (
                <Tooltip.Root key={item}>
                  <Tooltip.Trigger className="rounded-lg border px-3 py-2 text-xs">
                    {item}
                  </Tooltip.Trigger>
                  <Tooltip.Content className="card-surface px-2 py-1 text-xs">
                    {item} tooltip variant
                  </Tooltip.Content>
                </Tooltip.Root>
              ))}
            </div>
          </Tooltip.Provider>
        </article>
      </section>
      <section className="card-surface p-5">
        <h2 className="font-semibold">Drag-and-drop card reorder</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item}
              draggable
              onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                const from = Number(event.dataTransfer.getData("text/plain"));
                move(from, index);
              }}
              className="glass cursor-grab rounded-xl p-3 text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="card-surface p-5">
        <h2 className="font-semibold">Multi-step form wizard</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i <= step ? "bg-[color:var(--color-primary)]" : "bg-black/10"}`}
            />
          ))}
        </div>
        <div className="mt-4 rounded-xl border p-4 text-sm">
          {step === 0 && "Step 1: Define companion purpose."}
          {step === 1 && "Step 2: Pick preferred visual mood."}
          {step === 2 && "Step 3: Review and confirm setup."}
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded-lg border px-3 py-1.5 text-xs" onClick={() => setStep((s) => Math.max(0, s - 1))}>
            Back
          </button>
          <button className="premium-btn px-3 py-1.5 text-xs" onClick={() => setStep((s) => Math.min(2, s + 1))}>
            Next
          </button>
        </div>
      </section>
      <section className="card-surface p-5">
        <h2 className="font-semibold">Accordion FAQ</h2>
        <div className="mt-3 space-y-2">
          {[
            "Why a companion?",
            "How does state persist?",
            "Can this architecture scale?",
          ].map((q, i) => (
            <div key={q} className="rounded-xl border p-3">
              <button className="w-full text-left text-sm font-medium" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {q}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-2 text-xs text-[color:var(--color-muted)]"
                  >
                    It combines clarity, emotional guidance, and stronger first-time UX.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      <section className="card-surface p-5">
        <h2 className="font-semibold">Empty state with CTA</h2>
        <div className="mt-3 rounded-2xl border border-dashed p-6 text-center">
          {!emptyActive ? (
            <>
              <p className="text-sm">No saved scenes yet.</p>
              <button className="mt-3 premium-btn px-4 py-2 text-xs" onClick={() => setEmptyActive(true)}>
                Generate a starter scene
              </button>
            </>
          ) : (
            <p className="text-sm text-[color:var(--color-muted)]">
              Starter scene generated. You can now customize and reorder cards.
            </p>
          )}
        </div>
      </section>
      {toast && (
        <div className="card-surface fixed bottom-28 left-1/2 -translate-x-1/2 px-4 py-2 text-sm">
          Theme saved with sparkling confidence.
        </div>
      )}
    </div>
  );
}
