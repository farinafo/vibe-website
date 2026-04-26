"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/notes", label: "笔记" },
  { href: "/resume", label: "履历" },
  { href: "/contact", label: "联系" },
] as const;

function RailLinks({
  layout,
  onNavigate,
}: {
  layout: "row" | "col";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav
      className={
        layout === "row"
          ? "flex flex-row flex-wrap items-center justify-center gap-1"
          : "flex flex-col gap-1"
      }
      aria-label="快捷导航"
    >
      {links.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`rounded-sm px-2.5 py-2 font-mono text-[0.625rem] font-medium tracking-[0.12em] transition-colors md:px-3 md:text-[0.6875rem] ${
              active
                ? "bg-ink/10 text-ink"
                : "text-muted hover:bg-ink/[0.06] hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function HomeLeftRail({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="shrink-0 border-b border-line/40 px-1 py-2 sm:hidden">
        <RailLinks layout="row" onNavigate={onNavigate} />
      </div>
      <aside className="relative z-10 hidden w-[4.5rem] shrink-0 flex-col border-r border-line/40 py-6 pl-1.5 pr-0 sm:flex md:w-[6.75rem] md:py-10 md:pl-2">
        <RailLinks layout="col" onNavigate={onNavigate} />
      </aside>
    </>
  );
}
