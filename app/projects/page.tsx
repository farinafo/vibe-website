import type { Metadata } from "next";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "项目",
  description: "围绕人工智能产品、数据投资、增长与商业化的精选项目。",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
