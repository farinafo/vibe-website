import { HomeViewport } from "@/components/home/HomeViewport";
import { projectSummaries } from "@/lib/data/projects";

export default function HomePage() {
  return <HomeViewport projects={projectSummaries} />;
}
