"use client";

import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { type ProjectSlug, type ProjectSummary } from "@/lib/data/projects";

const projectVisualConfig: Record<
  ProjectSlug,
  {
    accent: string;
    cover: string;
  }
> = {
  coursesnap: {
    accent: "text-[#9a89ff]",
    cover: "/images/project-covers/coursesnap-cover.png",
  },
  "shanghai-house-price-forecasting": {
    accent: "text-[#8fd3ff]",
    cover: "/images/project-covers/shanghai-house-price-forecasting-cover.png",
  },
  "casa-rossi-valuation": {
    accent: "text-[#d9bc73]",
    cover: "/images/project-covers/casa-rossi-valuation-cover.png",
  },
  "monza-esports-hotel": {
    accent: "text-[#7fd0b2]",
    cover: "/images/project-covers/monza-esports-hotel-cover.png",
  },
  "hedonic-price-regression": {
    accent: "text-[#b7d36f]",
    cover: "/images/project-covers/hedonic-price-regression-cover.png",
  },
  "cultural-asset-digital-commercialization": {
    accent: "text-[#d6a2ff]",
    cover: "/images/project-covers/cultural-asset-digital-commercialization-cover.png",
  },
  "content-growth": {
    accent: "text-[#ff6f9c]",
    cover: "/images/project-covers/content-growth-cover.png",
  },
  "pre-master": {
    accent: "text-[#e0bc59]",
    cover: "/images/project-covers/pre-master-cover.png",
  },
  "market-intelligence": {
    accent: "text-[#6aaeff]",
    cover: "/images/project-covers/market-intelligence-cover.png",
  },
};

function NoiseOverlay() {
  return (
    <div className="absolute inset-0 opacity-12 mix-blend-overlay">
      <div
        className="h-full w-full opacity-40"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}

export function ProjectGalleryStrip({
  projects,
  compact = false,
  embed = false,
}: {
  projects: ProjectSummary[];
  compact?: boolean;
  embed?: boolean;
}) {
  const reduce = useReducedMotion();
  const loop = reduce ? projects : [...projects, ...projects];

  return (
    <div
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 ${
        embed
          ? "bg-transparent py-4 md:py-5"
          : compact
            ? "border-y border-ink/[0.07] bg-transparent py-4 md:py-5"
            : "border-y border-ink/[0.07] bg-transparent py-10 md:py-12"
      }`}
    >
      <div className={`${compact ? "mb-3" : "mb-6"} flex items-center justify-between px-2`}>
        <p
          className={`font-mono font-medium tracking-[0.2em] ${
            compact ? "text-[0.82rem] text-ink/88" : "text-[0.7rem] text-faint"
          }`}
        >
          精选项目
        </p>
      </div>

      <div className={`relative overflow-hidden ${reduce ? "overflow-x-auto" : ""}`}>
        <div
          className={
            reduce
              ? `flex w-max px-2 pb-1 ${compact ? "gap-3" : "gap-4"}`
              : `group flex w-max animate-gallery-marquee will-change-transform px-2 hover:[animation-play-state:paused] ${
                  compact ? "gap-3 md:gap-4" : "gap-4 md:gap-5"
                }`
          }
        >
          {loop.map((project, i) => {
            const visual = projectVisualConfig[project.slug];
            const index = String((i % projects.length) + 1).padStart(2, "0");

            return (
              <Link
                key={`${project.slug}-${i}`}
                href={`/projects/${project.slug}`}
                className={`group/item block shrink-0 ${
                  compact ? "w-[12rem] sm:w-[12.8rem]" : "w-[16rem]"
                }`}
              >
                <div
                  className={`relative mx-auto w-[80%] overflow-hidden rounded-[0.35rem] border border-line/40 bg-black transition-opacity duration-300 hover:opacity-95 ${
                    "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={visual.cover}
                    alt={project.title}
                    fill
                    sizes={compact ? "205px" : "256px"}
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_72%,rgba(0,0,0,0.18)_100%)]" />
                  <NoiseOverlay />
                </div>

                <div className="mx-auto mt-[0.18rem] flex w-[80%] items-start gap-2 bg-black/92 px-1.5 py-1">
                  <span className="pt-[0.15rem] font-mono text-[0.62rem] tracking-[0.12em] text-faint">
                    {index}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`truncate font-serif leading-tight text-ink ${
                        compact ? "text-[0.9rem]" : "text-[1rem]"
                      }`}
                    >
                      {project.title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
