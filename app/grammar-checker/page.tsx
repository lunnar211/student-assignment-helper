import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "Free Grammar Checker — Fix Grammar, Spelling & Punctuation",
  description:
    "Free grammar checker for students: catch grammar, spelling and punctuation mistakes, see each one explained, and apply the corrected version in one click. No login.",
};

export default function Page() {
  return <ToolClient />;
}
