import type { Metadata } from "next";
import ToolClient from "./client";

export const metadata: Metadata = {
  title: "Free SOP Writer — Statement of Purpose Generator",
  description:
    "Free SOP writer: build a structured Statement of Purpose draft for your university application in minutes, with a length target you choose. No login.",
};

export default function Page() {
  return <ToolClient />;
}
