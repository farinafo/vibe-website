"use client";

import { useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  useAnimation,
} from "framer-motion";

/**
 * Full-bleed dark dot field + noise, mouse-parallax. Pointer-events none.
 */
export function HomeNoiseBackdrop({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const reduce = useReducedMotion();
  const sx = useSpring(0.5, { stiffness: 32, damping: 34, mass: 0.55 });
  const sy = useSpring(0.5, { stiffness: 32, damping: 34, mass: 0.55 });

  useEffect(() => {
    sx.set(mouseX);
    sy.set(mouseY);
  }, [mouseX, mouseY, sx, sy]);

  const x1 = useTransform(sx, [0, 1], [26, -26]);
  const y1 = useTransform(sy, [0, 1], [20, -20]);
  const x2 = useTransform(sx, [0, 1], [-16, 16]);
  const y2 = useTransform(sy, [0, 1], [-14, 14]);
  const x3 = useTransform(sx, [0, 1], [40, -40]);
  const y3 = useTransform(sy, [0, 1], [30, -30]);

  const gradientRotate = useTransform(sx, [0, 1], [0, 360]);
  const gradientScale = useTransform(sy, [0, 1], [1, 1.2]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030303]"
      aria-hidden
    >
      <motion.div
        className="absolute inset-[-8%] opacity-[0.24]"
        style={{
          x: reduce ? 0 : x1,
          y: reduce ? 0 : y1,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 0.55px, transparent 0.55px)",
          backgroundSize: "4px 4px",
        }}
      />
      <motion.div
        className="absolute inset-[-12%] opacity-[0.11]"
        style={{
          x: reduce ? 0 : x2,
          y: reduce ? 0 : y2,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 0.45px, transparent 0.45px)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        className="absolute inset-[-16%] opacity-[0.08]"
        style={{
          x: reduce ? 0 : x3,
          y: reduce ? 0 : y3,
          backgroundImage:
            "radial-gradient(rgba(139, 92, 246, 0.06) 0.35px, transparent 0.35px)",
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          rotate: reduce ? 0 : gradientRotate,
          scale: reduce ? 1 : gradientScale,
          background: `conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.1), transparent, rgba(59, 130, 246, 0.1), transparent, rgba(139, 92, 246, 0.1))`,
          filter: "blur(40px)",
        }}
      />
      <div
        className={`home-noise-drift absolute inset-0 opacity-[0.15] mix-blend-overlay ${reduce ? "" : ""}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: reduce ? "220px 220px" : "300px 300px",
        }}
      />
      {!reduce ? (
        <div
          className="home-grid-pulse absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      ) : null}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_38%,transparent_18%,rgb(0_0_0/0.78)_100%)]"
        aria-hidden
      />
    </div>
  );
}
