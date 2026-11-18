import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Grammar Tips for Students — Assignment Helper",
  description:
    "The 10 grammar mistakes students make most, with a quick fix and a real example for each one — and when to use the grammar checker.",
};

const MISTAKES: { title: string; wrong: string; right: string; fix: string }[] = [
  {
    title: "1. Their / there / they're",
    wrong: "Their going to the library with there books.",
    right: "They're going to the library with their books.",
    fix: "Their = belonging to them. There = a place. They're = they are. If you can replace it with “they are”, use they're.",
  },
  {
    title: "2. Your / you're",
    wrong: "Your going to love this book.",
    right: "You're going to love this book.",
    fix: "You're is short for “you are”. Your shows possession: “your book”. Test it by expanding the contraction.",
  },
  {
    title: "3. Its / it's",
    wrong: "The dog wagged it's tail.",
    right: "The dog wagged its tail.",
    fix: "It's means “it is”. Its (no apostrophe) shows possession — like his, hers, ours. If “it is” doesn't fit, drop the apostrophe.",
  },
  {
    title: "4. Subject–verb agreement",
    wrong: "The list of items are on the table.",
    right: "The list of items is on the table.",
    fix: "The verb agrees with the main subject (list), not the nearest noun (items). Cross out the extra phrase and the answer is obvious.",
  },
  {
    title: "5. Run-on sentences",
    wrong: "I studied all night I was tired in the morning.",
    right: "I studied all night, so I was tired in the morning.",
    fix: "Two full sentences cannot just sit next to each other. Join them with a comma + and/but/so, a semicolon, or a full stop.",
  },
  {
    title: "6. Sentence fragments",
    wrong: "Because I was late. I missed the first question.",
    right: "Because I was late, I missed the first question.",
    fix: "A “because” clause cannot stand alone — it needs a main clause. Read each sentence on its own: if it has no complete thought, it is a fragment.",
  },
  {
    title: "7. Apostrophes in plurals",
    wrong: "The student's handed in their assignment's.",
    right: "The students handed in their assignments.",
    fix: "Plurals almost never take an apostrophe. Apostrophes show possession (the student's book) or a contraction (don't) — not “more than one”.",
  },
  {
    title: "8. Comma splices",
    wrong: "The experiment failed, the results were still useful.",
    right: "The experiment failed, but the results were still useful.",
    fix: "A comma alone cannot join two sentences. Add a joining word (and, but, so), use a semicolon, or split into two sentences.",
  },
  {
    title: "9. Then / than",
    wrong: "She is taller then her brother.",
    right: "She is taller than her brother.",
    fix: "Than is for comparisons (bigger than, more than). Then is for time or sequence (first this, then that).",
  },
  {
    title: "10. Affect / effect",
    wrong: "The weather had a bad affect on our trip.",
    right: "The weather had a bad effect on our trip.",
    fix: "Affect is usually the verb (to influence). Effect is usually the noun (the result). A quick test: “the effect” works with “the” — “the affect” does not.",
  },
];

export default function GrammarTipsGuidePage() {
  return (
    <div className="hero-mesh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Grammar tips for students", "description": "The 10 grammar mistakes students make most \u2014 with quick fixes for each one.", "datePublished": "2026-11-18", "author": {"@type": "Organization", "name": "Assignment Helper"}, "publisher": {"@type": "Organization", "name": "Assignment Helper"}}) }}
      />
      <article className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link href="/" className="font-semibold text-[#b42318] hover:underline">Home</Link>
            <span aria-hidden className="mx-2">›</span>
            <Link href="/guides" className="font-semibold text-[#b42318] hover:underline">Guides</Link>
            <span aria-hidden className="mx-2">›</span>
            <span aria-current="page">Grammar tips for students</span>
          </nav>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c2b4a] ring-1 ring-[#1c2b4a]/30">
            <BookOpen className="h-4 w-4" />
            Writing skills · 6 min read
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Grammar tips for students
          </h1>
          <p className="mt-4 font-mono text-xs tracking-widest text-slate-500 uppercase">Published 18 November 2026 · Assignment Helper</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Good grammar is not about sounding fancy. It is about being clear —
            so your teacher can focus on your ideas instead of untangling your
            sentences. These are the ten mistakes that show up in student
            writing again and again, with a quick fix for each one.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 space-y-4">
            {MISTAKES.map((m) => (
              <div key={m.title} className="card p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-slate-900">{m.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-rose-600">✗ Wrong: </span>
                  <span className="text-slate-700">{m.wrong}</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-emerald-600">✓ Right: </span>
                  <span className="text-slate-700">{m.right}</span>
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{m.fix}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card mt-8 space-y-6 p-6 text-[15px] leading-relaxed text-slate-600 sm:p-8">
            <div className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <Lightbulb className="h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-sm leading-relaxed text-brand-900">
                <strong>Tip:</strong> do not try to fix all ten at once. Pick
                the two mistakes you make most, and check for just those in your
                next assignment. Once they become automatic, pick the next two.
                Grammar improves one habit at a time.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">When to use the grammar checker</h2>
              <p className="mt-2">
                Run the{" "}
                <Link href="/grammar-checker" className="font-semibold text-[#b42318] hover:underline">
                  Grammar Checker
                </Link>{" "}
                after you finish a draft, not while you are still writing — fixing
                sentences you are about to delete wastes time. Read each
                suggestion instead of accepting it blindly: the checker explains
                every issue, and sometimes it misunderstands a correct sentence,
                especially names, quotes and technical terms. If a suggestion
                changes your meaning, ignore it. Finally, read the whole piece
                out loud once. Your ear catches the awkward sentences that no
                checker can.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Three habits that prevent most errors</h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5">
                <li>
                  <strong className="text-slate-800">Write short sentences.</strong>{" "}
                  Long sentences hide agreement errors and comma mistakes. If a
                  sentence runs past two lines, split it.
                </li>
                <li>
                  <strong className="text-slate-800">Proofread backwards.</strong>{" "}
                  Read the last paragraph first and work towards the top. It
                  breaks the flow, so you actually see the words instead of the
                  ideas you meant to write.
                </li>
                <li>
                  <strong className="text-slate-800">Leave it overnight.</strong>{" "}
                  Even a few hours away from a draft makes errors visible. Never
                  submit a first draft you wrote ten minutes ago.
                </li>
              </ul>
            </section>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card mt-10 p-6">
            <h2 className="font-serif text-lg font-semibold text-[#1c2b4a]">Related tools</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/grammar-checker" className="font-semibold text-[#b42318] hover:underline">Grammar Checker</Link>
                <span className="text-slate-600"> — Paste your text and get every mistake explained.</span>
              </li>
              <li>
                <Link href="/humanizer" className="font-semibold text-[#b42318] hover:underline">Humanizer</Link>
                <span className="text-slate-600"> — Make a corrected draft sound natural, not robotic.</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 text-center">
            <Link
              href="/grammar-checker"
              className="inline-flex items-center gap-2 rounded-md bg-[#1c2b4a] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16233d] active:scale-95"
            >
              Check your grammar — free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
