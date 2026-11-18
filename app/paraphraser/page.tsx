import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "Free Paraphraser — Rewrite Text in Your Own Words",
  description:
    "Free AI paraphraser for students: rewrite essays, assignments and notes in standard, formal, simple or academic tone. No login, no paywall. Up to 30,000 characters per text.",
};

export default function Page() {
  return <ToolClient />;
}
