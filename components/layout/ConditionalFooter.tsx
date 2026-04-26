"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

/** Landing is full-viewport; other routes keep the global footer. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (pathname === "/projects") return <SiteFooter showCta={false} />;
  if (pathname.startsWith("/projects/")) return <SiteFooter showCta={false} />;
  if (pathname === "/lab") return <SiteFooter showCta={false} />;
  if (pathname.startsWith("/lab/")) return <SiteFooter showCta={false} />;
  if (pathname === "/notes") return <SiteFooter showCta={false} />;
  if (pathname === "/resume") return <SiteFooter showCta={false} />;
  return <SiteFooter />;
}
