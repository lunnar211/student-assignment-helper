import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardPaste,
  Copy,
  FileText,
  Fingerprint,
  GraduationCap,
  MousePointerClick,
  PenLine,
  RefreshCw,
  Scale,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wand2,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Assignment Helper — Free AI Paraphraser, SOP Writer & Grammar Checker for Students",
  description:
    "Free all-in-one writing help for students: AI paraphraser, humanizer, SOP writer, AI checker, similarity checker and grammar checker. No login, no signup, no paywall.",
};

const TOOLS = [
  {
    href: "/paraphraser",
    icon: RefreshCw,
    title: "Paraphraser",
    description: "Rewrite any text in your own words — standard, formal, simple or academic tone.",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    href: "/humanizer",
    icon: Fingerprint,
    title: "Humanizer",
    description: "Turn stiff, AI-sounding text into natural writing that reads like you wrote it.",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    href: "/sop-writer",
    icon: PenLine,
    title: "SOP Writer",
    description: "Build a strong Statement of Purpose for your dream university in minutes.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    href: "/ai-checker",
    icon: ScanSearch,
    title: "AI Checker",
    description: "Estimate how likely your text is to look AI-written — before you submit it.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    href: "/similarity-checker",
    icon: Scale,
    title: "Similarity Checker",
    description: "Compare two texts side by side and see exactly which words overlap.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    href: "/grammar-checker",
    icon: Wrench,
    title: "Grammar Checker",
    description: "Catch grammar, spelling and punctuation mistakes and fix them in one click.",
    gradient: "from-blue-500 to-indigo-500",
  },
];

const STEPS = [
  {
    icon: ClipboardPaste,
    step: "Step 1",
    title: "Paste your text",
    description: "Drop in your assignment, essay or SOP draft. No account, no upload, no waiting.",
  },
  {
    icon: MousePointerClick,
    step: "Step 2",
    title: "Click one button",
    description: "Pick a tool and a tone, then hit the button. The AI does the heavy lifting.",
  },
  {
    icon: Copy,
    step: "Step 3",
    title: "Copy and go",
    description: "Copy the result, read it once, make it yours — then submit with confidence.",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Free forever",
    description: "Every tool is free. No credits, no trials, no card — ever.",
  },
  {
    icon: GraduationCap,
    title: "No login",
    description: "No account, no email, no password. Open the tool and start writing.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Your text is processed and never stored. What you paste stays yours.",
  },
  {
    icon: Smartphone,
    title: "Works on phone",
    description: "Built mobile-first, so you can fix an assignment from the bus or the library.",
  },
];

const GUIDES = [
  {
    href: "/guides/how-to-write-an-sop",
    icon: PenLine,
    title: "How to write an SOP",
    description: "Structure, hooks, goals and the mistakes that get applications rejected.",
    read: "8 min read",
  },
  {
    href: "/guides/how-to-paraphrase",
    icon: RefreshCw,
    title: "How to paraphrase without plagiarising",
    description: "A 5-step method, good vs bad examples, and what actually counts as plagiarism.",
    read: "7 min read",
  },
  {
    href: "/guides/grammar-tips",
    icon: BookOpen,
    title: "Grammar tips for students",
    description: "The 10 grammar mistakes students make most — with quick fixes for each one.",
    read: "6 min read",
  },
];

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. All six tools are completely free to use — no credits, no daily limits, no trial that runs out, and no card details. We keep it free by using efficient AI providers and keeping the site simple.",
  },
  {
    q: "Is my text stored anywhere?",
    a: "No. Your text is sent to the AI or grammar provider only to process your request, and it is not saved by us. We don't have accounts, so there is no profile or history attached to you. Once you close the page, your text is gone.",
  },
  {
    q: "Will my teacher detect AI in my work?",
    a: "No tool can guarantee that — and no AI detector is 100% accurate, including ours. The honest way to use this site: use the paraphraser and humanizer as a starting point, then rewrite the result in your own voice, add your own ideas and examples, and always follow your school's rules about AI use.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. Every tool is built mobile-first and works in any modern phone browser — no app to install. Paste your text, tap one button, and copy the result.",
  },
];

export default function Home() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="hero-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8">
          {/* Floating gradient blobs */}
          <div
            aria-hidden
            className="animate-float absolute top-16 right-[8%] hidden h-24 w-24 rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-600 opacity-20 blur-xl lg:block"
          />
          <div
            aria-hidden
            className="animate-float absolute bottom-24 left-[4%] hidden h-16 w-16 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 opacity-25 blur-lg lg:block"
            style={{ animationDelay: "1.2s" }}
          />
          <div
            aria-hidden
            className="animate-float absolute top-40 left-[12%] hidden h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-30 blur-md lg:block"
            style={{ animationDelay: "2s" }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Free · No login · No paywall
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Write <span className="gradient-text">better assignments</span>,
                faster.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
                Paraphrase, humanize, write your SOP, check grammar and AI
                content — six free tools built for students, in one place.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/paraphraser"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:shadow-xl hover:shadow-brand-600/30 hover:brightness-110 active:scale-95 sm:w-auto"
                >
                  Start writing free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#tools"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:bg-slate-50 hover:ring-slate-300 active:scale-95 sm:w-auto"
                >
                  Explore tools
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> 6 tools
                </span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> 100% free
                </span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> No signup
                </span>
              </p>
            </Reveal>
          </div>

          {/* Floating preview cards */}
          <div className="relative mx-auto mt-14 hidden max-w-4xl justify-center gap-4 md:flex">
            <div className="animate-float card w-64 rotate-[-2deg] p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <RefreshCw className="h-4 w-4 text-brand-600" /> Paraphrased
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                “Education opens doors to new skills, better jobs and a deeper
                understanding of the world.”
              </p>
            </div>
            <div
              className="animate-float card w-64 rotate-[1.5deg] p-4"
              style={{ animationDelay: "1.4s" }}
            >
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <ScanSearch className="h-4 w-4 text-emerald-600" /> AI Checker
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                <span className="font-semibold text-emerald-600">12% likely AI</span> —
                reads like a human wrote it.
              </p>
            </div>
            <div
              className="animate-float card w-64 rotate-[-1deg] p-4"
              style={{ animationDelay: "2.6s" }}
            >
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <FileText className="h-4 w-4 text-amber-600" /> SOP draft ready
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                A full Statement of Purpose, structured and ready to edit in
                your own voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Tool grid ---------- */}
      <section id="tools" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Six tools, one place
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Everything you need to go from a rough draft to a submission-ready
              assignment.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <Reveal key={tool.href} delay={0.06 * i}>
              <Link
                href={tool.href}
                className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/10"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <tool.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {tool.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">
                  {tool.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2.5">
                  Open tool
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                How it works
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-500">
                No learning curve. If you can paste text, you can use every tool here.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={0.08 * i}>
                <div className="card relative h-full p-6 text-center">
                  <span className="absolute top-4 right-5 text-xs font-bold tracking-widest text-brand-300 uppercase">
                    {s.step}
                  </span>
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why students love it ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why students love it
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.07 * i}>
              <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white shadow-md">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Guides preview ---------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Learn to write better
                </h2>
                <p className="mt-3 max-w-xl text-slate-500">
                  Short, practical guides — not lectures. Read one before your next assignment.
                </p>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                All guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {GUIDES.map((g, i) => (
              <Reveal key={g.href} delay={0.08 * i}>
                <Link
                  href={g.href}
                  className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/10"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-transform duration-300 group-hover:scale-110">
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{g.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{g.description}</p>
                  <span className="mt-4 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {g.read}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Questions, answered
            </h2>
          </div>
        </Reveal>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={0.05 * i}>
              <details className="card group px-5 py-4 transition-all duration-200 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-slate-900">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <p className="text-slate-500">Ready to fix that draft?</p>
            <Link
              href="/paraphraser"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-95"
            >
              Start writing free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
