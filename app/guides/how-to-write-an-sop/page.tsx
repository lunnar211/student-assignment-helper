import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb, PenLine } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How to Write an SOP — Assignment Helper",
  description:
    "What a Statement of Purpose is, the structure that works, practical tips, and the common mistakes that get applications rejected.",
};

export default function SopGuidePage() {
  return (
    <div className="hero-mesh">
      <article className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" /> All guides
          </Link>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <PenLine className="h-4 w-4" />
            Applications · 8 min read
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How to write an SOP
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            A Statement of Purpose is the one document in your application where
            the admissions committee hears your voice. Grades and test scores
            tell them what you did. The SOP tells them who you are, why this
            program, and why now.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-10 space-y-7 p-6 text-[15px] leading-relaxed text-slate-600 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">What an SOP actually is</h2>
              <p className="mt-2">
                An SOP is a short essay — usually 500 to 1,000 words — that
                explains your academic journey, your motivation for the program,
                and your plans after graduation. It is not a repeat of your CV.
                The committee already has your CV. The SOP should connect the
                dots: how a subject you loved became a project, how that project
                became a goal, and how this program is the next step. Think of it
                as a story with evidence, not a list of achievements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">The structure that works</h2>
              <p className="mt-2">
                A clear structure keeps the reader with you. Most strong SOPs
                follow five parts:
              </p>
              <ol className="mt-3 list-decimal space-y-3 pl-5">
                <li>
                  <strong className="text-slate-800">The hook.</strong> Open with
                  a specific moment, not a cliché. “The first time I debugged a
                  program at 2 a.m. and it finally worked” beats “Since I was a
                  child, I have always been fascinated by computers.”
                </li>
                <li>
                  <strong className="text-slate-800">Your background.</strong>{" "}
                  What did you study, and what did you actually do with it?
                  Mention two or three courses, projects or jobs that shaped your
                  interests — with a result, not just a title.
                </li>
                <li>
                  <strong className="text-slate-800">Why this program.</strong>{" "}
                  Name the program, and ideally a course, lab or professor that
                  fits your interests. This is the part that proves you researched
                  the university instead of copying the same SOP everywhere.
                </li>
                <li>
                  <strong className="text-slate-800">Your goals.</strong> What do
                  you want to learn, and what will you do with it afterwards?
                  Short-term goals (during the degree) and long-term goals (after
                  it) both matter.
                </li>
                <li>
                  <strong className="text-slate-800">The closing.</strong> One
                  short paragraph that ties the story together and states plainly
                  why you are ready. End with confidence, not apologies.
                </li>
              </ol>
            </section>

            <div className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <Lightbulb className="h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-sm leading-relaxed text-brand-900">
                <strong>Tip:</strong> write your first draft fast and messy, in
                your own words. Then use the{" "}
                <Link href="/sop-writer" className="font-semibold underline underline-offset-2">
                  SOP Writer
                </Link>{" "}
                to build a structured draft from your notes — and edit the result
                until every sentence sounds like you. An SOP that sounds generic
                is worse than one that sounds honest.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Tips that make a difference</h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5">
                <li>
                  <strong className="text-slate-800">Show, don&apos;t claim.</strong>{" "}
                  “I am hardworking” means nothing. “I taught myself Python over
                  one summer and built a timetable app my whole school uses”
                  proves it.
                </li>
                <li>
                  <strong className="text-slate-800">Be specific about the university.</strong>{" "}
                  One sentence about a real course or professor does more than a
                  paragraph of praise about the university&apos;s reputation.
                </li>
                <li>
                  <strong className="text-slate-800">Keep it to the word limit.</strong>{" "}
                  If the limit is 1,000 words, do not send 1,400. Committees read
                  hundreds of SOPs; respecting the limit is itself a signal.
                </li>
                <li>
                  <strong className="text-slate-800">Read it out loud.</strong>{" "}
                  If a sentence is hard to say, it is hard to read. Fix it or cut it.
                </li>
                <li>
                  <strong className="text-slate-800">Get one honest reader.</strong>{" "}
                  A teacher or friend who will tell you the truth is worth more
                  than five people who only say “it&apos;s good.”
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Common mistakes to avoid</h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5">
                <li>
                  <strong className="text-slate-800">Copying a template word for word.</strong>{" "}
                  Committees recognise the famous sample SOPs. Borrow the structure,
                  never the sentences.
                </li>
                <li>
                  <strong className="text-slate-800">Listing everything.</strong>{" "}
                  Your CV already lists it. The SOP should explain the two or
                  three things that matter most.
                </li>
                <li>
                  <strong className="text-slate-800">Exaggerating.</strong>{" "}
                  A small true achievement beats a big invented one — and
                  exaggerations are easy to spot in an interview.
                </li>
                <li>
                  <strong className="text-slate-800">Forgetting the “why here”.</strong>{" "}
                  An SOP that could be sent to any university will impress no
                  university.
                </li>
                <li>
                  <strong className="text-slate-800">Submitting without proofreading.</strong>{" "}
                  Run your draft through the{" "}
                  <Link href="/grammar-checker" className="font-semibold text-brand-600 hover:text-brand-700">
                    Grammar Checker
                  </Link>{" "}
                  and read it once more the next morning with fresh eyes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">A final word</h2>
              <p className="mt-2">
                The best SOPs are not written by the best writers — they are
                written by the clearest thinkers. Know what you want, know why
                this program helps you get it, and say it simply. Start with a
                rough draft today, sleep on it, and revise it twice. That is how
                a good SOP is made.
              </p>
            </section>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 text-center">
            <Link
              href="/sop-writer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-95"
            >
              Draft your SOP now — free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
