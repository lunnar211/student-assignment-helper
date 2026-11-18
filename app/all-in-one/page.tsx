import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "All-in-One Writing Fix — Grammar, Paraphrase, Humanize & AI Check",
  description:
    "The flagship Assignment Helper tool: paste once or upload a PDF and run grammar, AI check, paraphrase, humanize and auto-fix in one click. Free, no login.",
};

export default function Page() {
  return <ToolClient />;
}
