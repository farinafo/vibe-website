import type { Metadata } from "next";
import { NotesClient } from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title: "分析与思考",
  description: "数据、商业、城市与产品问题中的分析过程、方法框架与观察结论。",
};

export default function NotesPage() {
  return <NotesClient />;
}
