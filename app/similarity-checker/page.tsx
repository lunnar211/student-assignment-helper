import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "Free Similarity Checker — Compare Two Texts for Overlap",
  description:
    "Free similarity checker: compare an original and a rewritten text side by side and see exactly which words overlap. Word-overlap only — not a web plagiarism check.",
};

export default function Page() {
  return <ToolClient />;
}
