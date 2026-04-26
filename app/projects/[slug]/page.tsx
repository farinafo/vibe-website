import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  type ProjectDetail,
  type ProjectSlug,
} from "@/lib/data/projects";

type Props = { params: Promise<{ slug: string }> };

const caseLens: Record<ProjectSlug, string> = {
  coursesnap: "AI 产品",
  "shanghai-house-price-forecasting": "房价预测",
  "casa-rossi-valuation": "房地产投资",
  "monza-esports-hotel": "可行性研究",
  "hedonic-price-regression": "计量分析",
  "cultural-asset-digital-commercialization": "文化资产策略",
  "content-growth": "增长与洞察",
  "pre-master": "0 到 1 创业",
  "market-intelligence": "市场分析",
};

type TextSectionKey = keyof Pick<
  ProjectDetail,
  "overview" | "problem" | "whatIDid" | "result" | "reflection"
>;

type DetailSection =
  | {
      id: string;
      key: TextSectionKey;
      kind: "text";
      title: string;
      label: string;
    }
  | {
      id: string;
      kind: "analysisFlow" | "keyOutputs";
      title: string;
      label: string;
    };

const sections: DetailSection[] = [
  { id: "section-overview", key: "overview", kind: "text", title: "背景", label: "背景" },
  { id: "section-problem", key: "problem", kind: "text", title: "问题", label: "问题" },
  { id: "section-work", key: "whatIDid", kind: "text", title: "方案或方法", label: "方法" },
  { id: "section-flow", kind: "analysisFlow", title: "分析流程", label: "分析流程" },
  { id: "section-result", key: "result", kind: "text", title: "结果", label: "结果" },
  { id: "section-outputs", kind: "keyOutputs", title: "关键输出", label: "关键输出" },
  { id: "section-reflection", key: "reflection", kind: "text", title: "复盘", label: "复盘" },
];

const getSections = (project: ProjectDetail) =>
  sections.filter((section) => {
    if (section.kind === "analysisFlow") return Boolean(project.analysisFlow?.length);
    if (section.kind === "keyOutputs") return Boolean(project.keyOutputs?.length);
    return true;
  });

const summaryMeta: {
  id: string;
  key: keyof Pick<ProjectDetail, "role" | "phase" | "headlineOutcome">;
  label: string;
}[] = [
  { id: "summary-role", key: "role", label: "我的角色" },
  { id: "summary-phase", key: "phase", label: "项目阶段" },
  { id: "summary-outcome", key: "headlineOutcome", label: "关键结果" },
];

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "未找到项目" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

function Toc({ pageSections }: { pageSections: DetailSection[] }) {
  return (
    <nav className="space-y-1 border-l border-ink/[0.1] pl-5" aria-label="页内导航">
      <p className="mb-4 font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-muted">
        目录
      </p>
      {pageSections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-baseline gap-3 py-1.5 text-[0.95rem] text-muted transition-colors hover:text-ink"
        >
          <span className="font-mono text-[0.68rem] tabular-nums text-muted transition-colors group-hover:text-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="leading-snug">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const lens = caseLens[project.slug];
  const keywordLine = project.tags.join(" / ");
  const pageSections = getSections(project);

  return (
    <article>
      <header className="border-b border-ink/[0.08] bg-wash">
        <Container size="wide" className="py-14 md:py-20 lg:py-24">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-[0.625rem] font-medium tracking-[0.2em] text-muted transition-colors duration-300 hover:text-ink"
          >
            <span aria-hidden>←</span>
            返回项目页
          </Link>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="lg:col-span-8">
              <p className="font-mono text-[0.72rem] font-semibold tracking-[0.2em] text-muted">
                项目案例
              </p>
              <h1 className="mt-4 max-w-[24rem] font-serif text-display-xs font-medium leading-[1.05] text-ink md:max-w-3xl">
                {project.title}
              </h1>
              <p className="mt-8 max-w-measure-wide text-pretty text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
                {project.subtitle}
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {summaryMeta.map((item) => (
                  <div key={item.key} className="border border-line/40 bg-paper/70 px-5 py-5">
                    <p className="font-mono text-[0.68rem] font-semibold tracking-[0.15em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/85">
                      {project[item.key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-ink/[0.08] pt-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
              <dl className="space-y-8">
                <div>
                  <dt className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-muted">
                    项目视角
                  </dt>
                  <dd className="mt-2 font-serif text-lg text-ink">{lens}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-muted">
                    关键词
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{keywordLine}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-muted">
                    阅读方式
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    先看背景和问题，再看方法、结果与复盘。
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-14 md:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Toc pageSections={pageSections} />
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="mx-auto max-w-measure-wide lg:mx-0">
              {pageSections.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.04}>
                  <section
                    id={s.id}
                    className="scroll-mt-28 border-b border-ink/[0.07] py-14 first:pt-0 last:border-0 md:py-16"
                  >
                    <div className="flex items-start gap-5 sm:gap-8">
                      <span className="w-9 shrink-0 pt-1 font-mono text-[0.72rem] font-semibold tabular-nums tracking-[0.1em] text-muted sm:w-10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                          <h2 className="font-serif text-xl font-medium text-ink md:text-2xl">
                            {s.title}
                          </h2>
                          <span
                            className="hidden h-px flex-1 bg-ink/[0.12] sm:block sm:min-w-[4rem]"
                            aria-hidden
                          />
                        </div>
                        <p className="mt-8 text-sm leading-[2] text-muted md:text-[0.9375rem]">
                          {s.kind === "text" ? project[s.key] : null}
                        </p>
                        {s.kind === "analysisFlow" && project.analysisFlow ? (
                          <div className="mt-8 space-y-5">
                            {project.analysisFlow.map((step, stepIndex) => (
                              <div
                                key={step.title}
                                className="grid gap-3 border-t border-ink/[0.07] pt-5 sm:grid-cols-[3.5rem_1fr]"
                              >
                                <span className="font-mono text-[0.68rem] font-semibold tabular-nums tracking-[0.12em] text-muted">
                                  {String(stepIndex + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <h3 className="font-serif text-base font-medium text-ink">
                                    {step.title}
                                  </h3>
                                  <p className="mt-2 text-sm leading-[1.9] text-muted md:text-[0.9375rem]">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {s.kind === "keyOutputs" && project.keyOutputs ? (
                          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                            {project.keyOutputs.map((item) => (
                              <li
                                key={item}
                                className="border-t border-ink/[0.07] pt-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </section>
                </Reveal>
              ))}

              {project.reportUrl ? (
                <Reveal delay={pageSections.length * 0.04}>
                  <section className="border-t border-ink/[0.07] pt-10">
                    <div className="flex items-start gap-5 sm:gap-8">
                      <span className="w-9 shrink-0 pt-1 font-mono text-[0.72rem] font-semibold tabular-nums tracking-[0.1em] text-muted sm:w-10">
                        PDF
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-serif text-lg font-medium text-ink">
                          原始交付物
                        </h2>
                        <p className="mt-4 max-w-measure text-sm leading-[1.9] text-muted">
                          本页面为项目摘要版，完整研究过程与模型细节可查看原始报告。
                        </p>
                        <Link
                          href={project.reportUrl}
                          className="mt-5 inline-flex border border-ink/[0.14] px-4 py-2 font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-muted transition-colors hover:border-ink/40 hover:text-ink"
                        >
                          查看完整报告
                        </Link>
                      </div>
                    </div>
                  </section>
                </Reveal>
              ) : null}
            </div>

            <Reveal className="mt-16 border-t border-ink/[0.08] pt-12 md:mt-20 md:pt-16">
              <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-muted">
                继续浏览
              </p>
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {getAllProjectSlugs()
                  .filter((s) => s !== project.slug)
                  .map((s) => {
                    const p = getProjectBySlug(s as ProjectSlug)!;
                    return (
                      <Link
                        key={s}
                        href={`/projects/${s}`}
                        className="group inline-flex items-baseline gap-3 font-serif text-lg text-ink transition-opacity hover:opacity-70"
                      >
                        <span className="font-mono text-[0.68rem] font-semibold tracking-[0.15em] text-muted transition-colors group-hover:text-ink">
                          查看
                        </span>
                        {p.title}
                      </Link>
                    );
                  })}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </article>
  );
}
