"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Accessory,
  CompanionExpression,
  CompanionSkin,
  EyeStyle,
  IdleStyle,
  ThemeTokens,
  defaultTheme,
} from "@/lib/themes";

type GuideMessage = {
  id: string;
  title: string;
  what: string;
  how: string;
  kind: "quick tip" | "step-by-step" | "did you know";
  steps?: string[];
};

type CompanionLook = {
  petName: string;
  bodyColor: string;
  leafColor: string;
  blushEnabled: boolean;
  eyeStyle: EyeStyle;
  accessory: Accessory;
  outfitAccent: string;
  expression: CompanionExpression;
  idleStyle: IdleStyle;
  skin: CompanionSkin;
};

type LumiState = {
  themeName: string;
  tokens: ThemeTokens;
  companion: CompanionLook;
  interactions: number;
  mood: CompanionExpression;
  recentExplained: string[];
  pinnedBubble: boolean;
  activeGuide: GuideMessage | null;
  queue: GuideMessage[];
  reaction: "idle" | "excited" | "thinking" | "success" | "warning" | "celebrate";
  toasts: Array<{ id: string; title: string; message: string }>;
  companionEnabled: boolean;
  companionScale: number;
  animationSpeed: number;
  animationIntensity: number;
  setTheme: (name: string, tokens: ThemeTokens) => void;
  patchTheme: (patch: Partial<ThemeTokens>) => void;
  resetTheme: () => void;
  setCompanion: (patch: Partial<CompanionLook>) => void;
  randomizeCompanion: () => void;
  enqueueGuide: (item: GuideMessage) => void;
  dismissGuide: () => void;
  setPinnedBubble: (value: boolean) => void;
  setReaction: (reaction: LumiState["reaction"]) => void;
  pushToast: (title: string, message: string) => void;
  dismissToast: (id: string) => void;
  setCompanionEnabled: (enabled: boolean) => void;
  setCompanionScale: (scale: number) => void;
  setAnimationSpeed: (value: number) => void;
  setAnimationIntensity: (value: number) => void;
};

const defaultCompanion: CompanionLook = {
  petName: "Lumi",
  bodyColor: "#FFE8C2",
  leafColor: "#8FD56A",
  blushEnabled: true,
  eyeStyle: "sparkle",
  accessory: "star clip",
  outfitAccent: "#7c5cff",
  expression: "happy",
  idleStyle: "float",
  skin: "classic-cream",
};

const cycleMood = (count: number): CompanionExpression => {
  if (count < 6) return "happy";
  if (count < 14) return "curious";
  if (count < 24) return "focused";
  return "sleepy";
};

export const useLumiStore = create<LumiState>()(
  persist(
    (set) => ({
      themeName: "Cotton Candy",
      tokens: defaultTheme,
      companion: defaultCompanion,
      interactions: 0,
      mood: "happy",
      recentExplained: [],
      pinnedBubble: false,
      activeGuide: null,
      queue: [],
      reaction: "idle",
      toasts: [],
      companionEnabled: true,
      companionScale: 1,
      animationSpeed: 65,
      animationIntensity: 54,
      setTheme: (name, tokens) => set({ themeName: name, tokens }),
      patchTheme: (patch) =>
        set((state) => ({ tokens: { ...state.tokens, ...patch } })),
      resetTheme: () => set({ themeName: "Cotton Candy", tokens: defaultTheme }),
      setCompanion: (patch) =>
        set((state) => ({
          companion: { ...state.companion, ...patch },
        })),
      randomizeCompanion: () =>
        set(() => ({
          companion: {
            petName: "Lumi",
            bodyColor: `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`,
            leafColor: `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`,
            blushEnabled: Math.random() > 0.3,
            eyeStyle: ["dot", "sparkle", "oval", "wink"][
              Math.floor(Math.random() * 4)
            ] as EyeStyle,
            accessory: ["none", "hat", "bow", "glasses", "star clip", "scarf"][
              Math.floor(Math.random() * 6)
            ] as Accessory,
            outfitAccent: `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`,
            expression: ["happy", "curious", "focused", "sleepy"][
              Math.floor(Math.random() * 4)
            ] as CompanionExpression,
            idleStyle: ["float", "bounce", "tilt"][
              Math.floor(Math.random() * 3)
            ] as IdleStyle,
            skin: ["classic-cream", "minty-pop", "peachy-glow"][
              Math.floor(Math.random() * 3)
            ] as CompanionSkin,
          },
        })),
      enqueueGuide: (item) =>
        set((state) => {
          const interactions = state.interactions + 1;
          const mood = cycleMood(interactions);
          const recentExplained = [item.title, ...state.recentExplained].slice(
            0,
            5,
          );
          if (!state.activeGuide) {
            return {
              activeGuide: item,
              interactions,
              mood,
              recentExplained,
              reaction:
                item.kind === "did you know"
                  ? "thinking"
                  : item.kind === "step-by-step"
                    ? "excited"
                    : "idle",
            };
          }
          return {
            queue: [...state.queue, item].slice(-5),
            interactions,
            mood,
            recentExplained,
          };
        }),
      dismissGuide: () =>
        set((state) => ({
          activeGuide: state.queue[0] ?? null,
          queue: state.queue.slice(1),
        })),
      setPinnedBubble: (value) => set({ pinnedBubble: value }),
      setReaction: (reaction) => set({ reaction }),
      pushToast: (title, message) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, title, message },
          ].slice(-4),
        })),
      dismissToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
      setCompanionEnabled: (enabled) => set({ companionEnabled: enabled }),
      setCompanionScale: (scale) =>
        set({ companionScale: Math.max(0.7, Math.min(1.6, scale)) }),
      setAnimationSpeed: (value) =>
        set({ animationSpeed: Math.max(20, Math.min(100, value)) }),
      setAnimationIntensity: (value) =>
        set({ animationIntensity: Math.max(20, Math.min(100, value)) }),
    }),
    { name: "lumipocket-state-v1" },
  ),
);
