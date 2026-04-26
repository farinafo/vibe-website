"use client";

import Link from "next/link";
import { LabImageFrame } from "@/components/lab/LabImageFrame";
import { labTypeLabels, type LabEntry } from "@/lib/data/lab";

export function LabCard({ entry }: { entry: LabEntry }) {
  return (
    <Link
      href={`/lab/${entry.slug}`}
      className="group block rounded-2xl border border-line/40 bg-paper shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] transition-all duration-300 hover:border-line/70 hover:bg-cover/20"
    >
      <div className="grid min-h-full gap-0 lg:grid-cols-[1.15fr_1fr]">
        <LabImageFrame
          src={entry.coverImage}
          alt={entry.title}
          sizes="(min-width: 1024px) 44vw, 100vw"
          wrapperClassName="aspect-[4/3] rounded-t-2xl bg-cover/20 lg:aspect-auto lg:rounded-l-2xl lg:rounded-tr-none"
          imageClassName="object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
          fallbackTitle={entry.title}
          fallbackHint="封面图会从 public/images/flower-goddesses 中读取，文件缺失时显示占位。"
        />

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-line/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                {labTypeLabels[entry.type]}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                {entry.date}
              </span>
            </div>

            <h2 className="mt-5 font-serif text-[1.55rem] font-medium leading-[1.18] text-ink md:text-[1.8rem]">
              {entry.title}
            </h2>
            <p className="mt-4 text-sm leading-[1.95] text-muted md:text-base">{entry.subtitle}</p>
            <p className="mt-5 text-sm leading-[1.95] text-muted md:text-[0.96rem]">
              {entry.description}
            </p>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cover px-3 py-1 text-xs font-mono text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-ink">
              查看实验
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
