"use client";

import { useTheme, type SiteTheme } from "./ThemeProvider";

const themes: SiteTheme[] = ["dark", "green", "pink", "light"];

function nextTheme(theme: SiteTheme): SiteTheme {
  const index = themes.indexOf(theme);
  return themes[(index + 1) % themes.length];
}

function label(theme: SiteTheme): string {
  if (theme === "light") return "浅色";
  if (theme === "dark") return "深色";
  if (theme === "green") return "绿幕";
  return "粉色";
}

function icon(theme: SiteTheme) {
  if (theme === "light") {
    return <circle cx="12" cy="12" r="4.5" fill="currentColor" className="text-ink/80" />;
  }
  if (theme === "dark") {
    return (
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
        fill="currentColor"
        className="text-ink/80"
      />
    );
  }
  if (theme === "green") {
    return (
      <>
        <circle cx="12" cy="12" r="4" fill="currentColor" className="text-ink/85" />
        <path
          d="M12 3v3M12 18v3M3 12h3M18 12h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="text-ink/70"
        />
      </>
    );
  }
  return (
    <>
      <circle cx="12" cy="12" r="4" fill="currentColor" className="text-ink/85" />
      <path
        d="M5 7.5h14M5 12h14M5 16.5h14"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        className="text-ink/65"
      />
    </>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const upcomingTheme = nextTheme(theme);

  return (
    <button
      type="button"
      onClick={() => setTheme(upcomingTheme)}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-paper/70 text-ink shadow-sm backdrop-blur-sm transition-colors duration-200 hover:border-ink/[0.12] hover:bg-paper md:h-9 md:w-9"
      aria-label={`当前主题：${label(theme)}。切换到${label(upcomingTheme)}模式`}
      title={`${label(theme)} → ${label(upcomingTheme)}`}
    >
      <span className="sr-only">切换主题</span>
      <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>
        {icon(theme)}
      </svg>
    </button>
  );
}
