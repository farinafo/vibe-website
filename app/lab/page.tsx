import type { Metadata } from "next";
import { LabClient } from "@/components/lab/LabClient";
import { getAllLabEntries } from "@/lib/data/lab";

export const metadata: Metadata = {
  title: "实验",
  description: "围绕 AI、视觉表达、东方审美与个人叙事的探索性实践。",
};

export default function LabPage() {
  return <LabClient entries={getAllLabEntries()} />;
}
