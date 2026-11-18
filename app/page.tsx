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
  Wand2,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Assignment Helper — Free AI Paraphraser, SOP Writer & Grammar Checker for Students",
  description:
    "Free all-in-one writing help for students: AI paraphraser, humanizer, SOP writer, AI checker, similarity checker and grammar checker. No login, no signup, no paywall. Each text up to 30,000 characters.",
};

const TOOLS = [
  {
    href: "/paraphraser",
    icon: RefreshCw,
    title: "Paraphraser",
    description: "Rewrite any text in your own words — standard, formal, simple or academic tone.",
  },
  {
    href: "/humanizer",
    icon: Fingerprint,
    title: "Humanizer",
    description: "Turn stiff, AI-sounding text into natural writing that reads like you wrote it.",
  },
  {
    href: "/sop-writer",
    icon: PenLine,
    title: "SOP Writer",
    description: "Build a strong Statement of Purpose for your dream university in minutes.",
  },
  {
    href: "/ai-checker",
    icon: ScanSearch,
    title: "AI Checker",
    description: "Estimate how likely your text is to look AI-written — before you submit it.",
  },
  {
    href: "/similarity-checker",
    icon: Scale,
    title: "Similarity Checker",
    description: "Compare two texts side by side and see exactly which words overlap.",
  },
  {
    href: "/grammar-checker",
    icon: Wrench,
    title: "Grammar Checker",
    description: "Catch grammar, spelling and punctuation mistakes and fix them in one click.",
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
    icon: Check,
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
    a: "Yes. All seven tools are completely free to use — no credits, no trial that runs out, and no card details. There is no daily limit on how many times you use them, but each text you paste is capped at 30,000 characters.",
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
    <div className="paper-ruled">
      {/* ---------- Hero: the desk, not a SaaS billboard ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-[#b42318] uppercase">
              Free writing tools · No login · No paywall
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#1c2b4a] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Your draft, <span className="red-underline">marked up</span> and
              made better.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3c4a68] sm:text-lg">
              Paraphrase, humanize, write your SOP, check grammar and AI
              content — seven free tools built for students, in one place.
              Each text up to 30,000 characters.
            </p>
          </Reveal>
        </div>

        {/* ---------- All-in-One: full-width lead card, the tool itself first ---------- */}
        <Reveal delay={0.1}>
          <Link href="/all-in-one" className="card group mt-10 block overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ddd5bd] bg-[#fffdf6] px-5 py-3 sm:px-6">
              <span className="flex items-center gap-2 text-sm font-semibold text-[#1c2b4a]">
                <Wand2 className="h-4 w-4 text-[#b42318]" />
                All-in-One Fix — the flagship tool
              </span>
              <span className="font-mono text-xs font-semibold tracking-widest text-[#b42318] uppercase">
                Paste once · Fix everything
              </span>
            </div>
            <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                  Your draft
                </p>
                <p className="mt-2 font-mono text-[15px] leading-relaxed text-slate-700">
                  “Moreover, it is important to note that education plays a
                  crucial role in todays fast-paced world. Their are many
                  benefits…”
                </p>
                <p className="margin-note mt-3 text-sm">
                  ✎ “their” → “there” · “todays” → “today’s” · too many
                  “moreover”s — rewrite in plain words
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                  After one click
                </p>
                <p className="mt-2 font-mono text-[15px] leading-relaxed text-slate-700">
                  “Education opens doors to new skills, better jobs and a
                  deeper understanding of the world.”
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1c2b4a] transition-all group-hover:gap-2.5">
                  Open All-in-One
                  <ArrowRight className="h-4 w-4 text-[#b42318]" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ---------- Tool grid: six tools, two even rows ---------- */}
      <section id="tools" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1c2b4a] sm:text-3xl">
              Six more tools, one place
            </h2>
            <p className="mt-3 max-w-xl text-[#3c4a68]">
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
                className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1c2b4a]/50"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#1c2b4a] text-white transition-transform duration-300 group-hover:scale-105">
                  <tool.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[#1c2b4a]">
                  {tool.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#3c4a68]">
                  {tool.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#b42318] transition-all group-hover:gap-2.5">
                  Open tool
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-[#fffdf6]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1c2b4a] sm:text-3xl">
                How it works
              </h2>
              <p className="mt-3 max-w-xl text-[#3c4a68]">
                No learning curve. If you can paste text, you can use every tool here.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={0.08 * i}>
                <div className="card relative h-full p-6">
                  <span className="absolute top-4 right-5 font-mono text-xs font-bold tracking-widest text-[#b42318] uppercase">
                    {s.step}
                  </span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-md border border-[#1c2b4a]/30 bg-[#fbf6e9] text-[#1c2b4a]">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#1c2b4a]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3c4a68]">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why students love it ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1c2b4a] sm:text-3xl">
              Why students love it
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.07 * i}>
              <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#1c2b4a] text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif font-semibold text-[#1c2b4a]">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3c4a68]">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Guides preview ---------- */}
      <section className="bg-[#fffdf6]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1c2b4a] sm:text-3xl">
                  Learn to write better
                </h2>
                <p className="mt-3 max-w-xl text-[#3c4a68]">
                  Short, practical guides — not lectures. Read one before your next assignment.
                </p>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b42318] hover:underline"
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
                  className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1c2b4a]/50"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1c2b4a]/30 bg-[#fbf6e9] text-[#1c2b4a] transition-transform duration-300 group-hover:scale-110">
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#1c2b4a]">{g.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#3c4a68]">{g.description}</p>
                  <span className="mt-4 font-mono text-xs font-semibold tracking-wide text-slate-500 uppercase">
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
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1c2b4a] sm:text-3xl">
              Questions, answered
            </h2>
            <p className="mt-3 text-sm text-[#3c4a68]">
              <Link href="/faq" className="font-semibold text-[#b42318] hover:underline">
                Read all questions on the FAQ page →
              </Link>
            </p>
          </div>
        </Reveal>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={0.05 * i}>
              <details className="card group px-5 py-4 transition-all duration-200 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-[#1c2b4a]">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#3c4a68]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <p className="text-[#3c4a68]">Ready to fix that draft?</p>
            <Link
              href="/all-in-one"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#1c2b4a] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16233d] active:scale-95"
            >
              Fix everything — free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[#3c4a68]">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#b42318]" /> 7 tools
              </span>
              <span className="text-slate-400">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#b42318]" /> 100% free
              </span>
              <span className="text-slate-400">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#b42318]" /> No signup
              </span>
              <span className="text-slate-400">·</span>
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[#b42318]" /> 30,000 characters per text
              </span>
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
