"use client";

import { useState, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HomeCanvasBackground } from "@/components/home/HomeCanvasBackground";
import { getAllNotes, type Note } from "@/lib/data/notes";

export function NotesClient() {
  const notes = getAllNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
      y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
    });
  }, []);

  const onLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <div className="relative isolate min-h-screen" onMouseMove={onMove} onMouseLeave={onLeave}>
      <HomeCanvasBackground mouseX={mouse.x} mouseY={mouse.y} />

      <Container size="wide" className="relative z-10 py-16 md:py-24">
        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-line/40 bg-paper px-6 py-7 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] md:grid-cols-12 md:px-8 md:py-9">
            <div className="md:col-span-4">
              <h1 className="font-serif text-display-xs font-medium text-ink">分析与思考</h1>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-measure-wide text-pretty text-sm leading-[1.95] text-muted md:text-base">
                这里记录我在数据、商业、城市与产品问题中的分析过程、方法框架与观察结论。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["数据分析", "商业判断", "城市观察", "产品思考"].map((tag) => (
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

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-line/40 bg-paper px-5 py-5 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] md:px-6">
              <h2 className="mb-5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted">
                索引
              </h2>
              <nav className="space-y-2">
                {notes.map((note) => {
                  const isSelected = selectedNote?.id === note.id;

                  return (
                    <button
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-line bg-ink/10 text-ink"
                          : "border-transparent bg-cover/40 text-muted hover:border-line/30 hover:bg-cover/70 hover:text-ink"
                      }`}
                    >
                      <div className="min-w-0">
                        {note.date ? (
                          <span className="mb-1 block font-mono text-[0.68rem] font-medium text-muted">
                            {note.date}
                          </span>
                        ) : null}
                        <h3 className="font-serif text-sm font-medium leading-tight">
                          {note.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[0.82rem] leading-relaxed text-muted">
                          {note.summary}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.1}>
            {selectedNote ? (
              <div className="rounded-2xl border border-line/40 bg-paper p-7 shadow-[0_32px_100px_-50px_rgb(0_0_0/0.25)] md:p-8">
                <div className="mb-6">
                  <h2 className="mb-2 font-serif text-2xl font-medium text-ink md:text-[2rem]">
                    {selectedNote.title}
                  </h2>
                </div>

                <div className="mb-8 flex flex-wrap gap-2">
                  {selectedNote.date ? (
                    <span className="rounded-full bg-cover px-3 py-1 text-xs font-mono text-muted">
                      {selectedNote.date}
                    </span>
                  ) : null}
                  {selectedNote.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cover px-3 py-1 text-xs font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="space-y-4 leading-relaxed text-ink/80">
                    {selectedNote.content.split("\n\n").map((paragraph, index) => {
                      if (paragraph.trim() === "---") {
                        return <hr key={index} className="my-7 border-line/50" />;
                      }
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h3
                            key={index}
                            className="mb-4 mt-8 font-serif text-xl font-semibold leading-snug text-ink md:text-2xl"
                          >
                            {paragraph.replace(/^##\s+/, "")}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return (
                          <h3
                            key={index}
                            className="mb-4 mt-8 font-serif text-xl font-semibold leading-snug text-ink md:text-2xl"
                          >
                            {paragraph.replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith("-")) {
                        return (
                          <ul
                            key={index}
                            className="ml-4 list-disc space-y-1 text-sm leading-relaxed text-ink/80 md:text-[0.96rem]"
                          >
                            {paragraph.split("\n").map((item) => (
                              <li key={item}>{item.replace(/^-+\s*/, "")}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={index} className="text-sm leading-relaxed md:text-[0.96rem]">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-line/40 bg-paper p-12 text-center shadow-[0_32px_100px_-50px_rgb(0_0_0/0.25)]">
                <p className="text-faint">选择一篇笔记即可阅读。</p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
