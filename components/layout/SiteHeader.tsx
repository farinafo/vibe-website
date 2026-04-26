"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

const nav = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/lab", label: "实验" },
  { href: "/notes", label: "笔记" },
  { href: "/resume", label: "履历" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/[0.06] bg-paper/85 backdrop-blur-md backdrop-saturate-150">
      <div className="flex h-[var(--header-h)] w-full items-center gap-3 px-2 md:gap-4">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-3.5 outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <span className="flex min-w-0 items-center">
            <span className="font-serif text-[1.0625rem] font-semibold leading-none tracking-[-0.02em] text-ink transition-opacity group-hover:opacity-75 md:text-[1.125rem]">
              Fan Chen
            </span>
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:gap-3">
          <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-sm px-3 py-2 font-mono text-[1rem] font-medium tracking-[0.08em] transition-colors ${
                    active
                      ? "bg-ink/10 text-ink"
                      : "text-faint hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeSwitcher />

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm border border-transparent transition-colors hover:border-line md:hidden"
              aria-expanded={open}
              aria-label={open ? "关闭菜单" : "打开菜单"}
              onClick={() => setOpen((value) => !value)}
            >
              <span
                className={`block h-px w-[1.125rem] bg-ink transition-transform duration-300 ease-out ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-[1.125rem] bg-ink transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-[1.125rem] bg-ink transition-transform duration-300 ease-out ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <nav className="flex flex-col px-[var(--page-pad)] py-5">
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-line/80 py-3.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink"
                  >
                    <span>{item.label}</span>
                    <span className="text-faint">{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
