import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabDetailClient } from "@/components/lab/LabDetailClient";
import { getAllLabSlugs, getLabBySlug } from "@/lib/data/lab";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLabBySlug(slug);

  if (!entry) {
    return { title: "未找到实验" };
  }

  return {
    title: entry.title,
    description: entry.subtitle,
  };
}

export default async function LabDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getLabBySlug(slug);

  if (!entry) {
    notFound();
  }

  return <LabDetailClient entry={entry} />;
}
