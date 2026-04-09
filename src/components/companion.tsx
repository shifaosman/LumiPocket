"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLumiStore } from "@/store/use-lumi-store";

export function Companion() {
  const companion = useLumiStore((state) => state.companion);
  const companionEnabled = useLumiStore((state) => state.companionEnabled);
  const companionScale = useLumiStore((state) => state.companionScale);
  const animationSpeed = useLumiStore((state) => state.animationSpeed);
  const animationIntensity = useLumiStore((state) => state.animationIntensity);
  const reaction = useLumiStore((state) => state.reaction);
  const prefersReducedMotion = useReducedMotion();
  const [size, setSize] = useState(72);
  const [trackingCursor, setTrackingCursor] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 26, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 200, damping: 26, mass: 0.8 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const base = width < 640 ? 56 : width < 1024 ? 64 : 72;
      setSize(Math.round(base * companionScale));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [companionScale]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        setTrackingCursor(false);
        return;
      }
      setTrackingCursor(true);
      const gap = window.innerWidth < 640 ? 16 : 24;
      const targetX = event.clientX + gap;
      const targetY = event.clientY - gap;
      const maxX = window.innerWidth - size - 10;
      const maxY = window.innerHeight - size - 10;

      x.set(Math.max(10, Math.min(maxX, targetX)));
      y.set(Math.max(10, Math.min(maxY, targetY)));
    };

    const handlePointerLeave = () => setTrackingCursor(false);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReducedMotion, size, x, y]);

  const idleMotion = useMemo(() => {
    const intensityFactor = animationIntensity / 54;
    if (companion.idleStyle === "bounce") return { y: [0, -6 * intensityFactor, 0] };
    if (companion.idleStyle === "tilt")
      return { rotate: [0, 3 * intensityFactor, -3 * intensityFactor, 0] };
    return {
      y: [0, -4 * intensityFactor, 0],
      x: [0, 2 * Math.max(0.8, intensityFactor), 0],
    };
  }, [animationIntensity, companion.idleStyle]);

  const speedFactor = Math.max(0.35, animationSpeed / 65);
  const loopDuration = Math.max(1.2, 3.5 / speedFactor);
  const blinkDuration = Math.max(2.2, 4.8 / speedFactor);
  const leafDuration = Math.max(1.6, 2.6 / speedFactor);

  const skinBodyColor = useMemo(() => {
    if (companion.skin === "minty-pop") return "#CFF7E8";
    if (companion.skin === "peachy-glow") return "#FFD7BE";
    return companion.bodyColor;
  }, [companion.bodyColor, companion.skin]);
  const scaleUnit = size / 72;
  const eyeDot = Math.max(2, 2.5 * scaleUnit);
  const eyeOvalW = Math.max(2.2, 2.5 * scaleUnit);
  const eyeOvalH = Math.max(2.5, 3 * scaleUnit);
  const eyeSparkle = Math.max(2.6, 3 * scaleUnit);
  const eyeShine = Math.max(0.8, 1 * scaleUnit);
  const eyeWinkW = Math.max(3, 4 * scaleUnit);
  const eyeWinkH = Math.max(0.5, 0.8 * scaleUnit);

  if (!companionEnabled) return null;

  return (
    <motion.aside
      className="fixed z-40"
      style={
        trackingCursor && !prefersReducedMotion
          ? { left: springX, top: springY }
          : undefined
      }
      animate={
        !trackingCursor || prefersReducedMotion
          ? { right: 16, bottom: 16, left: "auto", top: "auto" }
          : undefined
      }
    >
      <motion.div
        className="relative"
        style={{ width: size + 16, height: size + 26 }}
        animate={
          reaction === "celebrate"
            ? { ...idleMotion, rotate: [0, -8, 8, -4, 0], y: [0, -10, 0] }
            : reaction === "success"
              ? { ...idleMotion, y: [0, -12, 0] }
              : reaction === "warning"
                ? { ...idleMotion, rotate: [0, -3, 3, -2, 2, 0] }
            : reaction === "excited"
              ? { ...idleMotion, scale: [1, 1.04, 1] }
              : idleMotion
        }
        transition={{ repeat: Infinity, duration: loopDuration, ease: "easeInOut" }}
        aria-label={`${companion.petName} companion`}
      >
        <div className="relative" style={{ width: size + 16, height: size + 26 }}>
          <motion.div
            className="absolute bottom-1 left-1/2 h-3 -translate-x-1/2 rounded-full bg-black/15 blur-[1px]"
            style={{ width: size * 0.72 }}
            animate={{ scaleX: reaction === "success" ? [1, 0.82, 1] : [1, 0.92, 1] }}
            transition={{ duration: Math.max(1.2, 2.8 / speedFactor), repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1/2 top-2 -translate-x-1/2"
            animate={
              prefersReducedMotion
                ? undefined
                : reaction === "excited" || reaction === "success"
                  ? { y: [0, -8, 0] }
                  : reaction === "warning"
                    ? { rotate: [0, -3, 3, -2, 2, 0] }
                    : { y: [0, -4, 0] }
            }
            transition={{
              duration: Math.max(1.2, 2.8 / speedFactor),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute -top-5 left-1/2 h-6 w-10 -translate-x-1/2"
              animate={prefersReducedMotion ? undefined : { rotate: [0, -4, 4, 0] }}
              transition={{ repeat: Infinity, duration: leafDuration, ease: "easeInOut" }}
            >
              <div
                className="absolute left-2 top-2 h-4 w-3 -rotate-12 rounded-[80%_20%_60%_40%]"
                style={{ backgroundColor: companion.leafColor ?? "#93D96C" }}
              />
              <div
                className="absolute right-2 top-1 h-4 w-3 rotate-12 rounded-[20%_80%_40%_60%]"
                style={{ backgroundColor: companion.leafColor ?? "#7FCC58" }}
              />
            </motion.div>
            <div
              className="relative"
              style={{
                width: size,
                height: size + 10,
                background: `linear-gradient(160deg, ${skinBodyColor}, color-mix(in oklab, ${skinBodyColor} 80%, #ffffff))`,
                borderRadius: "44% 44% 50% 50% / 38% 38% 62% 62%",
              }}
            >
              {companion.eyeStyle === "dot" && (
                <>
                  <motion.div
                    className="absolute left-[31%] top-[45%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeDot, height: eyeDot }}
                    animate={prefersReducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
                    transition={{ repeat: Infinity, duration: blinkDuration, times: [0, 0.4, 0.45, 0.52, 1] }}
                  />
                  <motion.div
                    className="absolute right-[31%] top-[45%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeDot, height: eyeDot }}
                    animate={prefersReducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
                    transition={{ repeat: Infinity, duration: blinkDuration, times: [0, 0.4, 0.45, 0.52, 1] }}
                  />
                </>
              )}
              {companion.eyeStyle === "oval" && (
                <>
                  <motion.div
                    className="absolute left-[29%] top-[42%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeOvalW, height: eyeOvalH }}
                    animate={prefersReducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
                    transition={{ repeat: Infinity, duration: blinkDuration, times: [0, 0.4, 0.45, 0.52, 1] }}
                  />
                  <motion.div
                    className="absolute right-[29%] top-[42%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeOvalW, height: eyeOvalH }}
                    animate={prefersReducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
                    transition={{ repeat: Infinity, duration: blinkDuration, times: [0, 0.4, 0.45, 0.52, 1] }}
                  />
                </>
              )}
              {companion.eyeStyle === "sparkle" && (
                <>
                  <div
                    className="absolute left-[29%] top-[42%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeSparkle, height: eyeSparkle }}
                  />
                  <div
                    className="absolute right-[29%] top-[42%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeSparkle, height: eyeSparkle }}
                  />
                  <div
                    className="absolute left-[30%] top-[43%] rounded-full bg-white"
                    style={{ width: eyeShine, height: eyeShine }}
                  />
                  <div
                    className="absolute right-[30%] top-[43%] rounded-full bg-white"
                    style={{ width: eyeShine, height: eyeShine }}
                  />
                </>
              )}
              {companion.eyeStyle === "wink" && (
                <>
                  <div
                    className="absolute left-[28%] top-[46%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeWinkW, height: eyeWinkH }}
                  />
                  <motion.div
                    className="absolute right-[30%] top-[42%] rounded-full bg-[#2B2B2B]"
                    style={{ width: eyeOvalW, height: eyeOvalH }}
                    animate={prefersReducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
                    transition={{ repeat: Infinity, duration: blinkDuration, times: [0, 0.4, 0.45, 0.52, 1] }}
                  />
                </>
              )}
              <div className="absolute left-[36%] top-[63%] h-1.5 w-[28%] rounded-full border-b-2 border-[#2B2B2B]" />
              {(companion.blushEnabled ?? true) && (
                <>
                  <div className="absolute left-[20%] top-[56%] h-2 w-3 rounded-full bg-[#FFB3C7]/80" />
                  <div className="absolute right-[20%] top-[56%] h-2 w-3 rounded-full bg-[#FFB3C7]/80" />
                </>
              )}

              {companion.accessory === "hat" && (
                <>
                  <div className="absolute left-1/2 top-0 h-2.5 w-8 -translate-x-1/2 rounded-full bg-[color:var(--color-text)]/80" />
                  <div className="absolute left-1/2 -top-2 h-3 w-5 -translate-x-1/2 rounded-t-full bg-[color:var(--color-text)]/80" />
                </>
              )}
              {companion.accessory === "bow" && (
                <>
                  <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#ff7fb5]" />
                  <div className="absolute left-[41%] -top-1 h-3 w-3 rounded-full bg-[#ff9fcc]" />
                  <div className="absolute left-[52%] -top-1 h-3 w-3 rounded-full bg-[#ff9fcc]" />
                </>
              )}
              {companion.accessory === "glasses" && (
                <>
                  <div className="absolute left-[25%] top-[41%] h-4 w-4 rounded-full border border-[#2B2B2B]" />
                  <div className="absolute right-[25%] top-[41%] h-4 w-4 rounded-full border border-[#2B2B2B]" />
                  <div className="absolute left-[43%] top-[43%] h-0.5 w-[14%] bg-[#2B2B2B]" />
                </>
              )}
              {companion.accessory === "star clip" && (
                <div className="absolute left-[58%] top-[10%] text-xs text-[#f8c541]">★</div>
              )}
              {companion.accessory === "scarf" && (
                <div
                  className="absolute left-1/2 top-[67%] h-3 w-[56%] -translate-x-1/2 rounded-full"
                  style={{ backgroundColor: companion.outfitAccent }}
                />
              )}
            </div>
          </motion.div>
          <AnimatePresence>
            {(reaction === "success" || reaction === "celebrate") && !prefersReducedMotion && (
              <motion.div
                key="sparkle-pop"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="pointer-events-none absolute inset-0"
              >
                {[0, 1, 2].map((idx) => (
                  <Sparkles
                    key={idx}
                    size={12}
                    className="absolute text-[color:var(--color-accent)]"
                    style={{
                      left: idx === 0 ? "18%" : idx === 1 ? "74%" : "48%",
                      top: idx === 0 ? "22%" : idx === 1 ? "30%" : "8%",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.aside>
  );
}
