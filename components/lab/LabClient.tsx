"use client";

import { useCallback, useState } from "react";
import { HomeCanvasBackground } from "@/components/home/HomeCanvasBackground";
import { Container } from "@/components/layout/Container";
import { LabCard } from "@/components/lab/LabCard";
import { Reveal } from "@/components/ui/Reveal";
import type { LabEntry } from "@/lib/data/lab";

export function LabClient({ entries }: { entries: LabEntry[] }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const onMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
    });
  }, []);

  return (
    <div
      className="relative isolate min-h-screen"
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0.5, y: 0.5 })}
    >
      <HomeCanvasBackground mouseX={mouse.x} mouseY={mouse.y} />

      <Container size="wide" className="relative z-10 py-16 md:py-24">
        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-line/40 bg-paper px-6 py-7 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] md:grid-cols-12 md:px-8 md:py-9">
            <div className="md:col-span-4">
              <h1 className="font-serif text-display-xs font-medium text-ink">实验</h1>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-measure-wide text-pretty text-sm leading-[1.95] text-muted md:text-base">
                这里收录一些围绕 AI、视觉表达、东方审美与个人叙事的探索性实践。它们不完全是传统意义上的项目，更像是我对系统、风格与表达边界的持续实验。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["AI 视觉", "风格实验", "东方审美", "图像叙事"].map((tag) => (
                  <span
                    key={tag}
                    className="border border-line/60 px-3 py-2 font-mono text-[0.68rem] tracking-[0.16em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 space-y-6 lg:mt-16">
          {entries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.05}>
              <LabCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
