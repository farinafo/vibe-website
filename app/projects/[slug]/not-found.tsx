import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function ProjectNotFound() {
  return (
    <Container size="narrow" className="py-28 text-center md:py-36">
      <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.28em] text-faint">
        404
      </p>
      <h1 className="mt-5 font-serif text-2xl font-medium tracking-tight text-ink md:text-3xl">
        未找到该项目
      </h1>
      <Link
        href="/projects"
        className="mt-10 inline-flex font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted underline decoration-ink/15 underline-offset-8 transition-colors hover:text-ink"
      >
        返回项目页
      </Link>
    </Container>
  );
}
