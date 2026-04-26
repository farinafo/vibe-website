"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const languages = [
  { code: "zh", label: "中文" },
] as const;

type LanguageCode = typeof languages[number]["code"];

export function LanguageSwitcher() {
  const [currentLang] = useState<LanguageCode>("zh");

  return (
    <div
      className="flex items-center rounded-sm border border-ink/[0.12] bg-ink/[0.02] p-0.5"
      aria-label="当前语言"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`relative px-2 py-1 font-mono text-[0.5625rem] font-medium tracking-[0.08em] transition-colors md:text-[0.625rem] ${
            currentLang === lang.code ? "text-ink" : "text-muted hover:text-ink"
          }`}
          aria-pressed={currentLang === lang.code}
        >
          {lang.label}
          {currentLang === lang.code ? (
            <motion.div
              layoutId="language-tab"
              className="absolute inset-0 rounded-sm bg-ink/[0.06]"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
}
