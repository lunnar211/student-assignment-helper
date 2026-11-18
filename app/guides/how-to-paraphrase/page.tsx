import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, RefreshCw } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How to Paraphrase Without Plagiarising — Assignment Helper",
  description:
    "What paraphrasing really is, a 5-step method that works, what counts as plagiarism, and good vs bad paraphrase examples.",
};

export default function ParaphraseGuidePage() {
  return (
    <div className="hero-mesh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to paraphrase without plagiarising", "description": "A 5-step method, good vs bad examples, and what actually counts as plagiarism.", "datePublished": "2026-11-18", "author": {"@type": "Organization", "name": "Assignment Helper"}, "publisher": {"@type": "Organization", "name": "Assignment Helper"}}) }}
      />
      <article className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link href="/" className="font-semibold text-[#b42318] hover:underline">Home</Link>
            <span aria-hidden className="mx-2">›</span>
            <Link href="/guides" className="font-semibold text-[#b42318] hover:underline">Guides</Link>
            <span aria-hidden className="mx-2">›</span>
            <span aria-current="page">How to paraphrase without plagiarising</span>
          </nav>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c2b4a] ring-1 ring-[#1c2b4a]/30">
            <RefreshCw className="h-4 w-4" />
            Assignments · 7 min read
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How to paraphrase without plagiarising
          </h1>
          <p className="mt-4 font-mono text-xs tracking-widest text-slate-500 uppercase">Published 18 November 2026 · Assignment Helper</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Paraphrasing is one of the most useful skills in academic writing —
            and one of the most misunderstood. It is not swapping a few words
            for synonyms. It is understanding an idea so well that you can
            explain it in your own words.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-10 space-y-7 p-6 text-[15px] leading-relaxed text-slate-600 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">What paraphrasing is — and isn&apos;t</h2>
              <p className="mt-2">
                A good paraphrase keeps the original meaning but changes the
                words <em>and</em> the sentence structure. It is shorter or
                roughly the same length as the original, and it is written for
                your assignment, not copied into it. What it is not: changing
                three words in a sentence and keeping the rest. That is still
                the author&apos;s sentence, and most teachers — and most
                plagiarism checkers — will treat it that way.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">The 5-step method</h2>
              <ol className="mt-3 list-decimal space-y-3 pl-5">
                <li>
                  <strong className="text-slate-800">Read until you understand.</strong>{" "}
                  Read the passage twice. If you cannot explain it to a friend
                  without looking at it, you do not understand it yet — and any
                  paraphrase you write will be a guess.
                </li>
                <li>
                  <strong className="text-slate-800">Cover it up.</strong> Put
                  the source aside — literally close the book or tab. This is the
                  step most students skip, and it is the one that matters most.
                </li>
                <li>
                  <strong className="text-slate-800">Write it from memory.</strong>{" "}
                  Explain the idea in your own words, as if you were telling a
                  classmate. Use your normal vocabulary and your normal sentence
                  length.
                </li>
                <li>
                  <strong className="text-slate-800">Compare and fix.</strong>{" "}
                  Now look at the original again. Check two things: did you keep
                  the meaning, and did you accidentally keep the author&apos;s
                  phrasing? Rewrite any sentence that still follows the original
                  word for word.
                </li>
                <li>
                  <strong className="text-slate-800">Cite it.</strong> Even a
                  perfect paraphrase needs a citation. Paraphrasing is not a way
                  to avoid referencing — it is a way to use a source well.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">What counts as plagiarism?</h2>
              <p className="mt-2">
                Plagiarism is presenting someone else&apos;s words or ideas as
                your own. That includes copying text without quotation marks,
                changing a few words and keeping the structure, using an idea
                without citing its source, and submitting work written by someone
                (or something) else as if it were yours. The rule of thumb is
                simple: if a reader would think the words or the idea came from
                you, and they did not, you need a citation — or quotation marks.
              </p>
              <p className="mt-2">
                Note that a paraphrase still needs a citation. The citation is
                what turns “copied idea” into “properly used source.”
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Bad vs good paraphrase</h2>
              <div className="mt-3 space-y-3">
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-semibold text-rose-800">Original</p>
                  <p className="mt-1 text-sm text-rose-900">
                    “Regular exercise improves memory and concentration, and it
                    also reduces stress in students.”
                  </p>
                  <p className="mt-3 text-sm font-semibold text-rose-800">✗ Bad paraphrase — only synonyms swapped</p>
                  <p className="mt-1 text-sm text-rose-900">
                    “Frequent physical activity enhances memory and focus, and it
                    also lowers stress in learners.”
                  </p>
                  <p className="mt-2 text-xs text-rose-700">
                    Same sentence structure, same order — this is still plagiarism.
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">✓ Good paraphrase — new structure, own words</p>
                  <p className="mt-1 text-sm text-emerald-900">
                    “Students who exercise regularly tend to feel calmer and find
                    it easier to remember what they study and stay focused in
                    class.”
                  </p>
                  <p className="mt-2 text-xs text-emerald-700">
                    Same idea, different sentence, different words — and it still
                    needs a citation.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">When paraphrasing isn&apos;t enough</h2>
              <p className="mt-2">
                Some things should be quoted, not paraphrased. A definition from
                a textbook, a striking sentence from an author, a statistic, or a
                legal wording — these lose accuracy when you reword them. In
                those cases, use quotation marks, keep the wording exact, and
                cite the source. A good assignment mixes both: paraphrase for
                the ideas you are weaving into your argument, and short quotes
                for the words that matter exactly as written. If you find
                yourself paraphrasing every sentence of a source, step back and
                ask whether you are adding anything of your own. A paragraph
                that only restates a source is not your argument — it is a
                summary wearing your name.
              </p>
            </section>

            <div className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <Lightbulb className="h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-sm leading-relaxed text-brand-900">
                <strong>Tip:</strong> use the{" "}
                <Link href="/paraphraser" className="font-semibold underline underline-offset-2">
                  Paraphraser
                </Link>{" "}
                as a starting point, not a finish line. Read its version, check
                it against the original meaning, then rewrite it once more in
                your own voice. Then check the result with the{" "}
                <Link href="/similarity-checker" className="font-semibold underline underline-offset-2">
                  Similarity Checker
                </Link>{" "}
                — if the overlap is still high, rewrite the highlighted words.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Tools on this site</h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5">
                <li>
                  <strong className="text-slate-800">Paraphraser</strong> — rewrites
                  a passage in a standard, formal, simple or academic tone.
                </li>
                <li>
                  <strong className="text-slate-800">Similarity Checker</strong> — compares
                  your version with the original and shows the overlapping words.
                </li>
                <li>
                  <strong className="text-slate-800">Humanizer</strong> — smooths
                  out stiff, robotic phrasing so the result reads naturally.
                </li>
                <li>
                  <strong className="text-slate-800">AI Checker</strong> — estimates
                  whether your text still reads as AI-written before you submit it.
                </li>
              </ul>
              <p className="mt-3">
                Tools can help you paraphrase, but they cannot decide what is
                honest. That part is always yours: understand the source, write
                it yourself, and cite it.
              </p>
            </section>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card mt-10 p-6">
            <h2 className="font-serif text-lg font-semibold text-[#1c2b4a]">Related tools</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/paraphraser" className="font-semibold text-[#b42318] hover:underline">Paraphraser</Link>
                <span className="text-slate-600"> — Rewrite a passage in standard, formal, simple or academic tone.</span>
              </li>
              <li>
                <Link href="/similarity-checker" className="font-semibold text-[#b42318] hover:underline">Similarity Checker</Link>
                <span className="text-slate-600"> — Compare your rewrite with the original and see the overlap.</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 text-center">
            <Link
              href="/paraphraser"
              className="inline-flex items-center gap-2 rounded-md bg-[#1c2b4a] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16233d] active:scale-95"
            >
              Try the paraphraser — free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
