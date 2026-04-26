"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LabImageFrame } from "@/components/lab/LabImageFrame";
import type { LabImageItem } from "@/lib/data/lab";

function PromptDisclosure({ prompt }: { prompt: string }) {
  return (
    <details className="rounded-xl border border-line/40 bg-ink/[0.03]">
      <summary className="cursor-pointer list-none px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/72">
        Prompt
      </summary>
      <div className="border-t border-line/40 px-4 py-4 text-sm leading-[1.9] text-muted">
        {prompt}
      </div>
    </details>
  );
}

function MetaBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{label}</p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export function LabGallery({
  title,
  images,
}: {
  title: string;
  images: LabImageItem[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = useMemo(
    () => (activeIndex === null ? null : images[activeIndex]),
    [activeIndex, images]
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null ? null : (current - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((current) => (current === null ? null : (current + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, showNext, showPrev]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-xl border border-line/40 bg-paper text-left transition-all duration-300 hover:border-line/70 hover:bg-cover/25"
          >
            <LabImageFrame
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw"
              wrapperClassName="aspect-[4/5] bg-cover/20"
              imageClassName="object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
              fallbackTitle={image.label}
              fallbackHint="将对应图片放入 public/images/flower-goddesses 后，这里会自动显示。"
            />
            <div className="border-t border-line/30 px-4 py-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-serif text-lg font-medium text-ink">{image.label}</p>
            </div>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[70] bg-black/82 px-3 py-3 backdrop-blur-md md:px-6 md:py-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}大图预览`}
        >
          <div className="mx-auto flex h-full items-center justify-center">
            <div
              className="relative grid w-[94vw] max-w-[1400px] max-h-[90vh] grid-cols-1 overflow-hidden rounded-[24px] border border-line/40 bg-paper shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:w-[92vw] lg:h-[min(88vh,860px)] lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/50 bg-paper/70 text-ink/80 transition hover:border-ink/30 hover:text-ink"
                aria-label="关闭预览"
              >
                ×
              </button>

              <div className="relative flex min-h-[42vh] items-center justify-center overflow-hidden bg-cover/20 px-4 py-6 md:px-6 lg:min-h-0 lg:border-r lg:border-line/40 lg:px-6 lg:py-6">
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/50 bg-paper/60 text-xl text-ink/72 transition hover:border-ink/30 hover:text-ink"
                  aria-label="上一张"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/50 bg-paper/60 text-xl text-ink/72 transition hover:border-ink/30 hover:text-ink"
                  aria-label="下一张"
                >
                  ›
                </button>

                <LabImageFrame
                  src={activeImage.src}
                  alt={activeImage.alt}
                  sizes="100vw"
                  priority
                  wrapperClassName="h-full w-full"
                  imageClassName="object-contain"
                  fallbackTitle={activeImage.label}
                  fallbackHint="当前图片文件还不存在，放入对应目录后会自动替换占位。"
                />
              </div>

              <aside className="min-h-0 overflow-hidden bg-transparent">
                <div className="h-full overflow-y-auto px-5 py-5 text-ink md:px-6 md:py-6 lg:px-7 lg:py-7">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                    {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 font-serif text-[1.85rem] font-medium leading-[1.15] text-ink">
                    {activeImage.label}
                  </h3>

                  <div className="mt-8 space-y-7">
                    <MetaBlock label="花神">
                      <p className="text-base leading-relaxed text-ink/88">{activeImage.deity}</p>
                    </MetaBlock>

                    <MetaBlock label="来源 / 典故">
                      <p className="text-sm leading-[1.9] text-muted">{activeImage.source}</p>
                    </MetaBlock>

                    <MetaBlock label="气质关键词">
                      <div className="flex flex-wrap gap-2">
                        {activeImage.temperament.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-line/40 px-3 py-1 text-xs font-mono text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </MetaBlock>

                    <MetaBlock label="创作说明">
                      <p className="text-sm leading-[1.9] text-muted">{activeImage.note}</p>
                    </MetaBlock>

                    <MetaBlock label="版本">
                      <p className="text-sm leading-relaxed text-muted">版本：{activeImage.version}</p>
                    </MetaBlock>

                    <PromptDisclosure prompt={activeImage.prompt} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
