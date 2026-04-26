import Link from "next/link";
import { Container } from "./Container";

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer
      className={`relative z-10 ${showCta ? "border-t border-ink/[0.08] bg-wash" : "bg-transparent"}`}
    >
      <Container size="wide" className={showCta ? "py-20 md:py-28" : "pb-10 md:pb-12"}>
        {showCta ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-faint">
                联系
              </p>
              <p className="mt-5 max-w-xl font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
                欢迎交流产品、增长与策略相关的机会和想法。
              </p>
              <p className="mt-5 max-w-md text-sm leading-[1.85] text-muted">
                如果你有合适的岗位、合作项目，或希望进一步了解我的经历，欢迎联系我。
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end lg:text-right">
              <Link
                href="/contact"
                className="inline-flex border border-plate bg-plate px-8 py-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-plate-ink transition-colors duration-300 ease-out hover:bg-transparent hover:text-ink"
              >
                联系我
              </Link>
            </div>
          </div>
        ) : null}

        <div
          className={`${showCta ? "mt-20 pt-10" : "pt-6"} flex flex-col gap-4 border-t border-ink/[0.08] font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint md:flex-row md:items-center md:justify-between`}
        >
          <span>© {new Date().getFullYear()} Fan Chen</span>
          <span className="max-w-md text-pretty text-[0.6rem] leading-relaxed text-muted normal-case tracking-normal md:text-right">
            AI 产品 · 增长策略 · 国际用户洞察
          </span>
        </div>
      </Container>
    </footer>
  );
}
