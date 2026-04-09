"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const quickActions = [
  { label: "Go to Home", path: "/" },
  { label: "Open Companion Studio", path: "/studio" },
  { label: "Open Theme Lab", path: "/themes" },
  { label: "Open Component Gallery", path: "/components" },
  { label: "Read About LumiPocket", path: "/about" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((state) => !state);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const items = quickActions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="card-surface fixed left-1/2 top-1/2 z-50 w-[min(94vw,620px)] -translate-x-1/2 -translate-y-1/2 p-4">
          <Dialog.Title className="mb-3 text-sm font-semibold">Command Palette</Dialog.Title>
          <label className="mb-3 flex items-center gap-2 rounded-xl border px-3 py-2">
            <Search size={16} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Type a command..."
            />
          </label>
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
                className="w-full rounded-xl border px-3 py-2 text-left text-sm transition hover:bg-black/5"
              >
                {item.label}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
