"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const MESSAGES = {
  en: "I know the UI looks rough, but I'm having a hard time dealing with AI slop, so please be patient with me...",
  zh: "我知道界面还不够精致，但我正在努力处理 AI 生成内容带来的问题，请给我一点时间……",
} as const;
let hasPlayedIntro = false;

export default function LoadingIntro({ locale = "en" }: { locale?: "en" | "zh" }) {
  const message = MESSAGES[locale];
  const prefersReducedMotion = useReducedMotion();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [isVisible, setIsVisible] = useState(!hasPlayedIntro);

  useEffect(() => {
    if (!isVisible) return;
    hasPlayedIntro = true;

    if (prefersReducedMotion) {
      const exitTimer = window.setTimeout(() => setIsVisible(false), 1900);
      return () => window.clearTimeout(exitTimer);
    }

    if (visibleCharacters < message.length) {
      const typingTimer = window.setTimeout(() => setVisibleCharacters((count) => count + 1), 32);
      return () => window.clearTimeout(typingTimer);
    }

    const exitTimer = window.setTimeout(() => setIsVisible(false), 1700);
    return () => window.clearTimeout(exitTimer);
  }, [isVisible, message, prefersReducedMotion, visibleCharacters]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-label={locale === "zh" ? "正在载入作品集" : "Loading portfolio"}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-workspace-bg px-6"
        >
          <div className="w-full max-w-3xl text-center">
            <p className="font-mono text-sm font-bold leading-7 tracking-[0.08em] text-workspace-text sm:text-base sm:leading-8">
              {prefersReducedMotion ? message : message.slice(0, visibleCharacters)}
              {!prefersReducedMotion && <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-0.5 animate-pulse bg-workspace-accent align-middle" />}
            </p>
            <button onClick={() => setIsVisible(false)} className="mt-10 rounded-full border border-workspace-border bg-white px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-workspace-muted hover:text-workspace-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
              {locale === "zh" ? "跳过开场" : "Skip intro"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
