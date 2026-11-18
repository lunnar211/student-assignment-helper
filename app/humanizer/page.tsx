import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "Free AI Humanizer — Make AI Text Sound Human",
  description:
    "Free AI humanizer: turn stiff, robotic, AI-sounding text into natural writing that reads like a real person wrote it. No login. Up to 30,000 characters per text.",
};

export default function Page() {
  return <ToolClient />;
}
