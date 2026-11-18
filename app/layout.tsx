import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://student-assignment-helper.vercel.app"),
  title: {
    default: "Assignment Helper — Free AI Paraphraser, SOP Writer & Grammar Checker for Students",
    template: "%s | Assignment Helper",
  },
  description:
    "Free all-in-one writing help for students: AI paraphraser, humanizer, SOP writer, AI checker, similarity checker and grammar checker. No login, no signup, no paywall.",
  keywords: [
    "assignment helper", "ai paraphraser", "paraphrase tool", "sop writer",
    "statement of purpose", "ai checker", "ai detector", "grammar checker",
    "similarity checker", "humanize ai text", "free writing tools for students",
  ],
  authors: [{ name: "Assignment Helper" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Assignment Helper",
    title: "Assignment Helper — Free AI Writing Tools for Students",
    description:
      "Paraphrase, humanize, write your SOP, check grammar and AI content — free, no login, all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assignment Helper — Free AI Writing Tools for Students",
    description:
      "Paraphrase, humanize, write your SOP, check grammar and AI content — free, no login, all in one place.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
