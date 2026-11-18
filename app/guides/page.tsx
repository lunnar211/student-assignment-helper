import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine, RefreshCw } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Guides — Assignment Helper",
  description:
    "Short, practical writing guides for students: how to write an SOP, how to paraphrase without plagiarising, and the grammar mistakes students make most.",
};

const GUIDES = [
  {
    href: "/guides/how-to-write-an-sop",
    icon: PenLine,
    title: "How to write an SOP",
    description:
      "What a Statement of Purpose really is, the structure that works (hook, background, why this program, goals, closing), and the mistakes that get applications rejected.",
    read: "8 min read",
    tag: "Applications",
  },
  {
    href: "/guides/how-to-paraphrase",
    icon: RefreshCw,
    title: "How to paraphrase without plagiarising",
    description:
      "A 5-step paraphrasing method, what actually counts as plagiarism, good vs bad examples, and how the tools on this site fit in.",
    read: "7 min read",
    tag: "Assignments",
  },
  {
    href: "/guides/grammar-tips",
    icon: BookOpen,
    title: "Grammar tips for students",
    description:
      "The 10 grammar mistakes students make most — with a quick fix and a real example for each one — and when to run the grammar checker.",
    read: "6 min read",
    tag: "Writing skills",
  },
];

export default function GuidesPage() {
  return (
    <div className="hero-mesh">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
              <BookOpen className="h-4 w-4" />
              Guides
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Learn to write better
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Short, practical guides — not lectures. Each one takes a few
              minutes and leaves you with something you can use on your next
              assignment.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Reveal key={g.href} delay={0.07 * i}>
              <Link
                href={g.href}
                className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/10"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <g.icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                    {g.tag}
                  </span>
                </div>
                <h2 className="mt-5 text-lg font-semibold text-slate-900">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{g.description}</p>
                <span className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">{g.read}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2.5">
                    Read guide
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
