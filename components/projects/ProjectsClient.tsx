"use client";

import { useCallback, useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HomeCanvasBackground } from "@/components/home/HomeCanvasBackground";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectSummaries, type ProjectSlug } from "@/lib/data/projects";

type ProjectSection = {
  id: "ai" | "data" | "growth";
  eyebrow: string;
  title: string;
  subtitle: string;
  slugs: ProjectSlug[];
  emphasis: "primary" | "standard" | "supporting";
};

const projectSections: ProjectSection[] = [
  {
    id: "ai",
    eyebrow: "主线能力",
    title: "人工智能产品",
    subtitle: "围绕 AI 产品设计、用户体验与实际落地的项目",
    slugs: ["coursesnap"],
    emphasis: "primary",
  },
  {
    id: "data",
    eyebrow: "专业能力",
    title: "数据与投资",
    subtitle: "基于数据分析与建模的市场研究与投资决策项目",
    slugs: [
      "shanghai-house-price-forecasting",
      "casa-rossi-valuation",
      "monza-esports-hotel",
      "hedonic-price-regression",
      "cultural-asset-digital-commercialization",
    ],
    emphasis: "standard",
  },
  {
    id: "growth",
    eyebrow: "补充能力",
    title: "增长与商业",
    subtitle: "用户增长、内容运营与商业化实践",
    slugs: ["content-growth", "pre-master", "market-intelligence"],
    emphasis: "supporting",
  },
];

const filters = [
  { label: "全部", href: "#projects-all" },
  { label: "人工智能", href: "#ai" },
  { label: "数据与投资", href: "#data" },
  { label: "增长与商业", href: "#growth" },
];

function SectionHeader({ section }: { section: ProjectSection }) {
  return (
    <div className="border-t border-line/50 pt-8">
      <h2 className="font-serif text-2xl font-medium text-ink md:text-[2rem]">
        {section.title}
      </h2>
      <p className="mt-4 max-w-measure text-sm leading-[1.9] text-muted md:text-base">
        {section.subtitle}
      </p>
      <p className="mt-3 font-mono text-[0.68rem] font-semibold tracking-[0.2em] text-muted">
        {section.eyebrow}
      </p>
    </div>
  );
}

function ProjectSectionBlock({
  section,
  startIndex,
}: {
  section: ProjectSection;
  startIndex: number;
}) {
  const projects = section.slugs
    .map((slug) => projectSummaries.find((project) => project.slug === slug))
    .filter(Boolean);

  const gridClass =
    section.emphasis === "primary"
      ? "grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      : section.emphasis === "supporting"
        ? "grid gap-7 md:grid-cols-2 xl:grid-cols-3 [&_article]:opacity-90"
        : "grid gap-8 md:grid-cols-2 xl:grid-cols-3";

  return (
    <section id={section.id} className="scroll-mt-28">
      <Reveal>
        <SectionHeader section={section} />
      </Reveal>

      <div className={`mt-8 ${gridClass}`}>
        {projects.map((project, index) =>
          project ? (
            <Reveal key={project.slug} delay={index * 0.04}>
              <ProjectCard project={project} index={startIndex + index} />
            </Reveal>
          ) : null
        )}
      </div>
    </section>
  );
}

export function ProjectsClient() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const sectionStartIndexes = useMemo(() => {
    let cursor = 1;
    return projectSections.reduce<Record<ProjectSection["id"], number>>((acc, section) => {
      acc[section.id] = cursor;
      cursor += section.slugs.length;
      return acc;
    }, {} as Record<ProjectSection["id"], number>);
  }, []);

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
        <header id="projects-all" className="scroll-mt-28">
          <Reveal>
            <div className="grid gap-8 border border-line/40 bg-paper px-6 py-7 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] md:grid-cols-12 md:px-8 md:py-9">
              <div className="md:col-span-4">
                <h1 className="font-serif text-display-xs font-medium text-ink">
                  精选项目
                </h1>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-measure-wide text-pretty text-sm leading-[1.95] text-muted md:text-base">
                  用三个层级快速理解我的能力结构：AI 产品是主线，数据与投资提供分析和建模能力，增长与商业补充执行、运营和商业化经验。
                </p>
                <nav className="mt-7 flex flex-wrap gap-2" aria-label="项目分类筛选">
                  {filters.map((filter) => (
                    <a
                      key={filter.href}
                      href={filter.href}
                      className="border border-line/60 px-3 py-2 font-mono text-[0.68rem] tracking-[0.16em] text-muted transition-colors hover:border-ink/40 hover:text-ink"
                    >
                      {filter.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Reveal>
        </header>

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-24">
          {projectSections.map((section) => (
            <ProjectSectionBlock
              key={section.id}
              section={section}
              startIndex={sectionStartIndexes[section.id]}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
