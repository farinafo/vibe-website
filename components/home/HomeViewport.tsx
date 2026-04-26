"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { HomeCanvasBackground } from "@/components/home/HomeCanvasBackground";
import {
  aboutCapabilities,
  aboutClosingBody,
  aboutEducationSummary,
  aboutExperiences,
  aboutFocusBody,
  aboutIntroLead,
  homeMetrics,
} from "@/lib/data/about";
import { type ProjectSummary } from "@/lib/data/projects";
import { ProjectGalleryStrip } from "@/components/projects/ProjectGalleryStrip";

type WindowId = "about" | "notes" | "lab";

type WindowConfig = {
  id: WindowId;
  label: string;
  title: string;
  href?: string;
  summary?: string;
  defaultOpen: boolean;
  position: {
    x: number;
    y: number;
  };
};

const windowConfigs: WindowConfig[] = [
  {
    id: "about",
    label: "关于我",
    title: "关于我",
    defaultOpen: true,
    position: { x: 415, y: 80 },
  },
  {
    id: "notes",
    label: "分析与思考",
    title: "分析与思考",
    href: "/notes",
    summary: "数据、商业、城市与产品",
    defaultOpen: true,
    position: { x: 310, y: 94 },
  },
  {
    id: "lab",
    label: "一些好玩的",
    title: "一些好玩的",
    href: "/lab",
    defaultOpen: true,
    position: { x: 900, y: 330 },
  },
];

const flowerGoddessImages = [
  { src: "/images/flower-goddesses/01-plum.png", alt: "1月 梅花花神" },
  { src: "/images/flower-goddesses/02-apricot.png", alt: "2月 杏花花神" },
  { src: "/images/flower-goddesses/03-peach.png", alt: "3月 桃花花神" },
  { src: "/images/flower-goddesses/04-peony.png", alt: "4月 牡丹花神" },
  { src: "/images/flower-goddesses/05-pomegranate.png", alt: "5月 石榴花花神" },
  { src: "/images/flower-goddesses/06-lotus.png", alt: "6月 荷花花神" },
  { src: "/images/flower-goddesses/07-hollyhock.png", alt: "7月 蜀葵花神" },
  { src: "/images/flower-goddesses/08-osmanthus.png", alt: "8月 桂花花神" },
  { src: "/images/flower-goddesses/09-chrysanthemum.png", alt: "9月 菊花花神" },
  { src: "/images/flower-goddesses/10-hibiscus.png", alt: "10月 芙蓉花神" },
  { src: "/images/flower-goddesses/11-camellia.png", alt: "11月 山茶花神" },
  { src: "/images/flower-goddesses/12-narcissus.png", alt: "12月 水仙花神" },
];

function DraggableWindow({
  title,
  defaultPosition,
  onClose,
  onActivate,
  className,
  zIndex,
  children,
}: {
  title: string;
  defaultPosition: { x: number; y: number };
  onClose: () => void;
  onActivate: () => void;
  className: string;
  zIndex: number;
  children: React.ReactNode;
}) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ opacity: 0, x: defaultPosition.x, y: defaultPosition.y + 16, scale: 0.985 }}
      animate={{ opacity: 1, x: defaultPosition.x, y: defaultPosition.y, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onPointerDownCapture={onActivate}
      className={`absolute border border-line/55 bg-paper shadow-[0_30px_90px_-48px_rgb(0_0_0/0.45)] ${className}`}
      style={{ left: 0, top: 0, zIndex }}
    >
      <div
        onPointerDown={(event) => dragControls.start(event)}
        className="flex cursor-grab items-center justify-between gap-3 border-b border-line/40 px-4 py-3 active:cursor-grabbing"
      >
        <p className="font-mono text-[1.04rem] tracking-[0.14em] text-ink">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center border border-line/70 text-faint transition-colors hover:border-ink/30 hover:text-ink"
          aria-label={`关闭${title}窗口`}
        >
          <span className="font-mono text-sm leading-none">×</span>
        </button>
      </div>
      {children}
    </motion.div>
  );
}

function DesktopMenu({
  openWindows,
  onToggle,
}: {
  openWindows: Record<WindowId, boolean>;
  onToggle: (id: WindowId) => void;
}) {
  return (
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      {windowConfigs.map((item) => {
        const active = openWindows[item.id];

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className={`flex items-center gap-3 text-left transition-colors ${
              active ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            <span
              className={`h-3 w-3 shrink-0 rounded-[2px] border ${
                active ? "border-ink bg-ink" : "border-line/80 bg-transparent"
              }`}
              aria-hidden
            />
            <span className="font-mono text-[0.86rem] tracking-[0.14em]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function LabWindowPreview({ href }: { href: string }) {
  const loopImages = [...flowerGoddessImages, ...flowerGoddessImages];

  return (
    <Link
      href={href}
      aria-label="打开实验页面"
      className="group block overflow-hidden px-2.5 py-2.5"
    >
      <div className="relative h-[5.75rem] overflow-hidden border border-line/35 bg-cover/35">
        <div className="home-lab-marquee flex h-full w-max gap-2 p-2">
          {loopImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative h-[8.6rem] w-[6.6rem] shrink-0 overflow-hidden border border-line/40 bg-paper"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="7rem"
                className="object-cover object-top opacity-88 grayscale transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent" />
      </div>
    </Link>
  );
}

export function HomeViewport({ projects }: { projects: ProjectSummary[] }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [openWindows, setOpenWindows] = useState<Record<WindowId, boolean>>({
    about: true,
    notes: true,
    lab: true,
  });
  const [windowOrder, setWindowOrder] = useState<WindowId[]>(["notes", "lab", "about"]);

  const aboutWindow = windowConfigs.find((item) => item.id === "about")!;
  const summaryWindows = windowConfigs.filter((item) => item.id !== "about");
  const getWindowZIndex = (id: WindowId) => 30 + windowOrder.indexOf(id);

  const toggleWindow = (id: WindowId) => {
    setOpenWindows((current) => ({
      ...current,
      [id]: !current[id],
    }));

    setWindowOrder((current) => {
      const next = current.filter((item) => item !== id);
      return [...next, id];
    });
  };

  const bringWindowToFront = (id: WindowId) => {
    setWindowOrder((current) => {
      const next = current.filter((item) => item !== id);
      return [...next, id];
    });
  };

  return (
    <div
      className="relative isolate flex h-[calc(100dvh-var(--header-h))] flex-col overflow-hidden"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMouse({
          x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
        });
      }}
      onMouseLeave={() => setMouse({ x: 0.5, y: 0.5 })}
    >
      <HomeCanvasBackground mouseX={mouse.x} mouseY={mouse.y} />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden lg:overflow-visible">
        <div className="min-h-0 flex-1 overflow-hidden px-[var(--page-pad)] pt-5 sm:px-8 sm:pt-8 md:px-12 md:pt-9 lg:overflow-visible">
          <div className="relative h-full min-h-0">
            <div className="relative z-20 max-w-[17rem] pt-2">
              <DesktopMenu openWindows={openWindows} onToggle={toggleWindow} />
            </div>

            <div className="absolute inset-0 z-30 hidden overflow-visible lg:block">
              {openWindows.about ? (
                <DraggableWindow
                  title={aboutWindow.title}
                  defaultPosition={aboutWindow.position}
                  onClose={() => toggleWindow("about")}
                  onActivate={() => bringWindowToFront("about")}
                  zIndex={getWindowZIndex("about")}
                  className="w-[33.887109375rem]"
                >
                  <div className="h-[min(33.72375vh,17.04515625rem)] overflow-y-auto px-[0.95625rem] py-[0.95625rem]">
                    <div className="space-y-5 text-[1.08rem] leading-[1.72] text-muted">
                      <p className="font-medium text-ink/92">{aboutIntroLead}</p>
                      <p>{aboutEducationSummary}</p>
                      <p>{aboutFocusBody}</p>
                      <div className="grid gap-2 border-t border-line/40 pt-4 sm:grid-cols-2">
                        {homeMetrics.map((metric) => (
                          <span
                            key={metric}
                            className="border border-line/40 bg-cover/50 px-3 py-2 font-mono text-[0.62rem] leading-tight text-muted"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-3 border-t border-line/40 pt-4">
                        {aboutExperiences.map((experience) => (
                          <div
                            key={experience.org}
                            className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
                          >
                            <span className="font-medium text-ink">{experience.org}</span>
                            <span className="font-mono text-[0.62rem] tracking-[0.12em] text-faint">
                              {experience.role}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 border-t border-line/40 pt-4">
                        {aboutCapabilities.map((capability) => (
                          <p key={capability}>{capability}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </DraggableWindow>
              ) : null}

              {summaryWindows.map((item) =>
                openWindows[item.id] ? (
                  <DraggableWindow
                    key={item.id}
                    title={item.title}
                    defaultPosition={item.position}
                    onClose={() => toggleWindow(item.id)}
                    onActivate={() => bringWindowToFront(item.id)}
                    zIndex={getWindowZIndex(item.id)}
                    className={item.id === "lab" ? "w-[18.25rem]" : "w-[15.3rem]"}
                  >
                    {item.id === "lab" ? (
                      <LabWindowPreview href={item.href!} />
                    ) : (
                      <Link
                        href={item.href!}
                        className="block px-[0.6375rem] py-[0.6375rem] text-[1.18rem] leading-[1.55] text-muted transition-colors hover:text-ink"
                      >
                        {item.summary}
                      </Link>
                    )}
                  </DraggableWindow>
                ) : null
              )}
            </div>

            <div className="mt-10 space-y-4 overflow-y-auto pb-4 lg:hidden">
              {openWindows.about ? (
                <div className="border border-line/55 bg-paper shadow-[0_30px_90px_-48px_rgb(0_0_0/0.45)]">
                  <div className="flex items-center justify-between gap-3 border-b border-line/40 px-4 py-3">
                    <p className="font-mono text-[1.04rem] tracking-[0.14em] text-ink">关于我</p>
                    <button
                      type="button"
                      onClick={() => toggleWindow("about")}
                      className="inline-flex h-8 w-8 items-center justify-center border border-line/70 text-faint"
                      aria-label="关闭关于我窗口"
                    >
                      <span className="font-mono text-sm leading-none">×</span>
                    </button>
                  </div>
                  <div className="space-y-4 px-5 py-5 text-sm leading-[1.76] text-muted">
                    <p className="font-medium text-ink/92">{aboutIntroLead}</p>
                    <p>{aboutEducationSummary}</p>
                    <p>{aboutFocusBody}</p>
                    <p>{aboutClosingBody}</p>
                  </div>
                </div>
              ) : null}

              {summaryWindows
                .filter((item) => openWindows[item.id])
                .map((item) => (
                  <div
                    key={item.id}
                    className="border border-line/55 bg-paper shadow-[0_30px_90px_-48px_rgb(0_0_0/0.45)]"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-line/40 px-4 py-3">
                      <p className="font-mono text-[1.04rem] tracking-[0.14em] text-ink">{item.title}</p>
                      <button
                        type="button"
                        onClick={() => toggleWindow(item.id)}
                        className="inline-flex h-8 w-8 items-center justify-center border border-line/70 text-faint"
                        aria-label={`关闭${item.title}窗口`}
                      >
                        <span className="font-mono text-sm leading-none">×</span>
                      </button>
                    </div>
                    {item.id === "lab" ? (
                      <LabWindowPreview href={item.href!} />
                    ) : (
                      <Link
                        href={item.href!}
                        className="block px-4 py-5 text-base leading-relaxed text-muted transition-colors hover:text-ink"
                      >
                        {item.summary}
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="relative z-0 shrink-0">
          <ProjectGalleryStrip projects={projects} compact embed />
        </div>
      </div>
    </div>
  );
}
