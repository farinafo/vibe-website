import type { ReactNode } from "react";

const maxWidths: Record<"default" | "wide" | "narrow" | "full", string> = {
  default: "max-w-[min(100%,68rem)]",
  wide: "max-w-[min(100%,88rem)]",
  narrow: "max-w-[min(100%,40rem)]",
  full: "max-w-none",
};

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: keyof typeof maxWidths;
}) {
  return (
    <div
      className={`mx-auto w-full px-[var(--page-pad)] ${maxWidths[size]} ${className}`}
    >
      {children}
    </div>
  );
}
