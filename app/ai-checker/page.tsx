import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "AI Checker (Estimate) — Check How AI-Like Your Text Reads",
  description:
    "Free AI checker: an honest heuristic estimate of how likely your text is to read as AI-written, with reasons for the score. An estimate, not a detector — no tool is 100% accurate.",
};

export default function Page() {
  return <ToolClient />;
}
