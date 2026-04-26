"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  baseX: number;
  baseY: number;
  size: number;
  seed: number;
}

interface Ripple {
  x: number;
  y: number;
  startedAt: number;
}

interface ThemePalette {
  background: string;
  dot: [number, number, number];
  dotSoft: [number, number, number];
}

function readThemePalette(): ThemePalette {
  const styles = getComputedStyle(document.documentElement);
  const readTriplet = (name: string) =>
    styles
      .getPropertyValue(name)
      .trim()
      .split(/\s+/)
      .map((value) => Number(value)) as [number, number, number];

  return {
    background: `rgb(${styles.getPropertyValue("--noise-bg").trim().replace(/\s+/g, " ")})`,
    dot: readTriplet("--noise-dot"),
    dotSoft: readTriplet("--noise-dot-soft"),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function valueNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);

  return lerp(
    lerp(hash(ix, iy), hash(ix + 1, iy), ux),
    lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), ux),
    uy
  );
}

function fbm(x: number, y: number) {
  let total = 0;
  let amplitude = 0.55;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < 4; i++) {
    total += valueNoise(x * frequency, y * frequency) * amplitude;
    norm += amplitude;
    frequency *= 2;
    amplitude *= 0.5;
  }

  return total / norm;
}

function fieldIntensity(x: number, y: number, time: number) {
  const broad = fbm(x * 0.00185 - time * 0.16, y * 0.0017 + time * 0.115);
  const soft = fbm(x * 0.0036 + time * 0.2 + 17, y * 0.0031 - time * 0.17 - 13);
  const grain = fbm(x * 0.0072 - time * 0.3 - 5, y * 0.0065 + time * 0.22 + 9);

  const blobAX = Math.sin(time * 0.68) * 260;
  const blobAY = Math.cos(time * 0.52) * 210;
  const blobBX = Math.cos(time * 0.61 + 1.7) * 310;
  const blobBY = Math.sin(time * 0.47 + 0.9) * 240;

  const distA = Math.hypot(x - 620 - blobAX, y - 320 - blobAY);
  const distB = Math.hypot(x - 1320 - blobBX, y - 560 - blobBY);
  const metaballA = 1 - smoothstep(120, 520, distA);
  const metaballB = 1 - smoothstep(160, 620, distB);

  return clamp(broad * 0.44 + soft * 0.26 + grain * 0.1 + metaballA * 0.34 + metaballB * 0.28, 0, 1);
}

function flowVector(x: number, y: number, time: number) {
  const angle =
    fbm(x * 0.0022 + time * 0.18 + 31, y * 0.002 + time * 0.14 - 17) * Math.PI * 3.8;
  const strength = 0.45 + fbm(x * 0.0046 - time * 0.24 - 9, y * 0.0041 + time * 0.2 + 23) * 1.2;

  return {
    x: Math.cos(angle) * strength,
    y: Math.sin(angle) * strength,
  };
}

export function HomeCanvasBackground({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const paletteRef = useRef<ThemePalette | null>(null);
  const mouseRef = useRef({ x: mouseX, y: mouseY });
  const lastMousePixelRef = useRef<{ x: number; y: number } | null>(null);
  const lastRippleAtRef = useRef(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const timeRef = useRef(0);
  const reduce = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const initializeParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const spacing = width > 1500 ? 6 : 7;
    const padding = spacing * 5;
    const cols = Math.ceil((width + padding * 2) / spacing) + 2;
    const rows = Math.ceil((height + padding * 2) / spacing) + 2;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = col * spacing - padding;
        const y = row * spacing - padding;

        particles.push({
          baseX: x,
          baseY: y,
          size: Math.random() > 0.9 ? 1.1 : 0.72,
          seed: Math.random() * Math.PI * 2,
        });
      }
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    paletteRef.current = readThemePalette();

    const observer = new MutationObserver(() => {
      paletteRef.current = readThemePalette();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      setDimensions({ width, height });
      initializeParticles(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [initializeParticles]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const palette = paletteRef.current;
    if (!canvas || !palette) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    if (!width || !height) return;

    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const time = (timeRef.current += reduce ? 0.007 : 0.016);
    const pointerX = mouse.x * width;
    const pointerY = mouse.y * height;

    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);

    for (const particle of particles) {
      const drawBaseX = particle.baseX;
      const drawBaseY = particle.baseY;
      const density = fieldIntensity(drawBaseX, drawBaseY, time);

      const flow = flowVector(drawBaseX, drawBaseY, time);
      const driftAmount = reduce ? 0.95 : 3.9;
      const shimmer = valueNoise(
        drawBaseX * 0.12 - time * 10.5 + particle.seed,
        drawBaseY * 0.12 + time * 8.6
      );
      const twinkle =
        0.5 + 0.5 * Math.sin(time * 8.4 + particle.seed * 3.1 + shimmer * 7.2);
      const localDriftX =
        flow.x * driftAmount +
        Math.sin(time * 2.2 + particle.seed) * (reduce ? 0.26 : 0.8);
      const localDriftY =
        flow.y * driftAmount +
        Math.cos(time * 1.9 + particle.seed) * (reduce ? 0.22 : 0.72);
      const drawXBase = drawBaseX + localDriftX;
      const drawYBase = drawBaseY + localDriftY;

      const dx = drawXBase - pointerX;
      const dy = drawYBase - pointerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const hover = 1 - smoothstep(0, 132, distance);
      const angle = Math.atan2(dy, dx);
      const microNoise = valueNoise(drawBaseX * 0.085 + time * 4.8, drawBaseY * 0.085 - time * 4.2);
      const hoverLift = hover * (0.08 + microNoise * 0.12);
      const mouseGlow = (1 - smoothstep(0, 170, distance)) * 0.18;

      let rippleLift = 0;
      let rippleOffsetX = 0;
      let rippleOffsetY = 0;
      const now = performance.now();

      for (const ripple of ripplesRef.current) {
        const age = (now - ripple.startedAt) / 1000;
        if (age > 1.3) continue;

        const rx = drawXBase - ripple.x;
        const ry = drawYBase - ripple.y;
        const rippleDistance = Math.sqrt(rx * rx + ry * ry);
        const radius = age * (reduce ? 180 : 290);
        const band = reduce ? 20 : 26;
        const wave = Math.exp(-((rippleDistance - radius) ** 2) / (2 * band * band));
        const fade = 1 - age / 1.3;
        const force = wave * fade;
        const rippleAngle = Math.atan2(ry, rx);

        rippleLift += force * 0.34;
        rippleOffsetX += Math.cos(rippleAngle) * force * (reduce ? 0.75 : 1.85);
        rippleOffsetY += Math.sin(rippleAngle) * force * (reduce ? 0.75 : 1.85);
      }

      const intensity = clamp(density + hoverLift + mouseGlow + rippleLift, 0, 1);

      const alpha = clamp(
        smoothstep(0.13, 0.9, intensity) * (0.48 + twinkle * 0.68),
        0.018,
        1
      );
      if (alpha < 0.032) continue;

      const brightness = clamp(
        0.1 + intensity * 0.92 + microNoise * 0.08 + twinkle * 0.28,
        0.08,
        1
      );
      const blueAccent = smoothstep(0.72, 0.98, shimmer) * smoothstep(0.28, 0.82, intensity);
      const baseR = palette.dotSoft[0] + (palette.dot[0] - palette.dotSoft[0]) * brightness;
      const baseG = palette.dotSoft[1] + (palette.dot[1] - palette.dotSoft[1]) * brightness;
      const baseB = palette.dotSoft[2] + (palette.dot[2] - palette.dotSoft[2]) * brightness;
      const r = Math.round(baseR * (1 - blueAccent) + 120 * blueAccent);
      const g = Math.round(baseG * (1 - blueAccent) + 140 * blueAccent);
      const b = Math.round(baseB * (1 - blueAccent) + 255 * blueAccent);

      const hoverShift = hover * (1.2 + microNoise * 1.4);
      const drawX =
        drawXBase +
        rippleOffsetX +
        Math.cos(angle) * hoverShift +
        Math.sin(time * 3.2 + particle.seed * 1.6) * (reduce ? 0.12 : 0.32);
      const drawY =
        drawYBase +
        rippleOffsetY +
        Math.sin(angle) * hoverShift +
        Math.cos(time * 2.8 + particle.seed * 1.4) * (reduce ? 0.12 : 0.32);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fillRect(drawX, drawY, particle.size, particle.size);
    }

    ripplesRef.current = ripplesRef.current.filter(
      (ripple) => performance.now() - ripple.startedAt < 1300
    );

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, reduce]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, dimensions]);

  useEffect(() => {
    mouseRef.current.x = mouseX;
    mouseRef.current.y = mouseY;

    const { width, height } = dimensions;
    if (!width || !height) return;

    const nextX = mouseX * width;
    const nextY = mouseY * height;
    const previous = lastMousePixelRef.current;

    if (!previous) {
      lastMousePixelRef.current = { x: nextX, y: nextY };
      ripplesRef.current = [{ x: nextX, y: nextY, startedAt: performance.now() }];
      return;
    }

    const now = performance.now();
    const moved = Math.hypot(nextX - previous.x, nextY - previous.y);
    if (moved > 2.5 && now - lastRippleAtRef.current > 18) {
      ripplesRef.current.push({ x: nextX, y: nextY, startedAt: now });
      if (ripplesRef.current.length > 8) {
        ripplesRef.current = ripplesRef.current.slice(-8);
      }
      lastRippleAtRef.current = now;
    }

    lastMousePixelRef.current = { x: nextX, y: nextY };
  }, [dimensions, mouseX, mouseY]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const nextX = clamp(event.clientX / width, 0, 1);
      const nextY = clamp(event.clientY / height, 0, 1);

      mouseRef.current.x = nextX;
      mouseRef.current.y = nextY;

      const pixelX = nextX * width;
      const pixelY = nextY * height;
      const previous = lastMousePixelRef.current;
      const now = performance.now();

      if (!previous) {
        lastMousePixelRef.current = { x: pixelX, y: pixelY };
        ripplesRef.current = [{ x: pixelX, y: pixelY, startedAt: now }];
        lastRippleAtRef.current = now;
        return;
      }

      const moved = Math.hypot(pixelX - previous.x, pixelY - previous.y);
      if (moved > 1.2 && now - lastRippleAtRef.current > 10) {
        ripplesRef.current.push({ x: pixelX, y: pixelY, startedAt: now });
        if (ripplesRef.current.length > 12) {
          ripplesRef.current = ripplesRef.current.slice(-12);
        }
        lastRippleAtRef.current = now;
      }

      lastMousePixelRef.current = { x: pixelX, y: pixelY };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-screen w-screen pointer-events-none"
      style={{ opacity: reduce ? 0.82 : 1 }}
    />
  );
}
