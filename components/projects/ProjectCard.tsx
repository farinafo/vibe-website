"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type ProjectSlug, type ProjectSummary } from "@/lib/data/projects";

const projectCoverImages: Partial<Record<ProjectSlug, string>> = {
  coursesnap: "/images/project-covers/coursesnap-cover.png",
  "shanghai-house-price-forecasting":
    "/images/project-covers/shanghai-house-price-forecasting-cover.png",
  "casa-rossi-valuation": "/images/project-covers/casa-rossi-valuation-cover.png",
  "monza-esports-hotel": "/images/project-covers/monza-esports-hotel-cover.png",
  "hedonic-price-regression": "/images/project-covers/hedonic-price-regression-cover.png",
  "cultural-asset-digital-commercialization":
    "/images/project-covers/cultural-asset-digital-commercialization-cover.png",
  "content-growth": "/images/project-covers/content-growth-cover.png",
  "pre-master": "/images/project-covers/pre-master-cover.png",
  "market-intelligence": "/images/project-covers/market-intelligence-cover.png",
};

function TextureOverlay() {
  return (
    <div className="absolute inset-0 opacity-[0.14] mix-blend-overlay" aria-hidden>
      <Image
        src="data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"
        alt=""
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

export function ProjectCard({
  project,
  index = 1,
}: {
  project: ProjectSummary;
  index?: number;
}) {
  const reduce = useReducedMotion();
  const idx = String(index).padStart(2, "0");
  const coverImage = projectCoverImages[project.slug];

  return (
    <motion.article
      className="group relative"
      whileHover={
        reduce
          ? undefined
          : { y: -2, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
      }
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          <motion.div
            className="absolute inset-0"
            initial={false}
            whileHover={
              reduce
                ? undefined
                : {
                    scale: 1.02,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  }
            }
          >
            {coverImage ? (
              <>
                <Image
                  src={coverImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain opacity-90 grayscale-[0.15] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  priority={project.slug === "coursesnap"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/14 to-black/8" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] via-cover to-[#2a2a2a]" />
                <TextureOverlay />
              </>
            )}
          </motion.div>

          <div className="absolute left-5 top-5 font-mono text-[0.72rem] font-semibold tabular-nums tracking-[0.16em] text-ink/65 transition-colors duration-500 group-hover:text-ink/85">
            {idx}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-ink/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16">
            <p className="text-[0.72rem] font-medium leading-relaxed tracking-wide text-ink/68">
              {project.tags.join(" · ")}
            </p>
            <h3 className="mt-3 font-serif text-[1.35rem] font-medium leading-[1.15] text-ink sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-ink/70">
              {project.cardSubtitle}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] text-ink/70 transition-all duration-500 ease-out group-hover:gap-3 group-hover:text-ink/90">
              查看案例
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
