"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export type SiteTheme = "light" | "dark" | "green" | "pink";

type Ctx = {
  theme: SiteTheme;
  setTheme: (t: SiteTheme) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

function normalizeTheme(theme: string | null): SiteTheme | null {
  if (theme === "light" || theme === "dark" || theme === "green" || theme === "pink") {
    return theme;
  }
  if (theme === "terminal") {
    return "green";
  }
  return null;
}

function applyTheme(theme: SiteTheme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>("dark");

  useLayoutEffect(() => {
    const stored = normalizeTheme(localStorage.getItem("portfolio-theme"));
    if (stored) {
      setThemeState(stored);
      applyTheme(stored);
      return;
    }

    const attr = normalizeTheme(document.documentElement.getAttribute("data-theme"));
    if (attr) {
      setThemeState(attr);
      applyTheme(attr);
      return;
    }

    applyTheme("dark");
    setThemeState("dark");
  }, []);

  const setTheme = useCallback((t: SiteTheme) => {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem("portfolio-theme", t);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
