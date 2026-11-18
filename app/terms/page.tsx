import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service — Assignment Helper",
  description:
    "Free use, no account, acceptable use, and no warranty: the terms for using Assignment Helper's free writing tools for students.",
};

export default function TermsPage() {
  return (
    <div className="hero-mesh">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <ScrollText className="h-4 w-4" />
            Terms of Service
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Last updated: November 2026. By using Assignment Helper, you agree to
            these terms. They are written in plain language on purpose.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-10 space-y-6 p-6 text-[15px] leading-relaxed text-slate-600 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">1. Free use, no account</h2>
              <p className="mt-2">
                All tools on this site are free to use. You do not need an account,
                a subscription or a payment method. You may use the tools for your
                own school, college or university work, as often as you like.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">2. Acceptable use</h2>
              <p className="mt-2">You agree not to use this site to:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>Submit someone else&apos;s work as your own, or claim AI-generated text as entirely your own writing where that is not allowed.</li>
                <li>Break your school, college or university&apos;s rules about AI use, plagiarism or academic honesty.</li>
                <li>Generate misleading, defamatory or unlawful content, or content that infringes someone else&apos;s rights.</li>
                <li>Abuse, overload or attempt to disrupt the site or its providers.</li>
              </ul>
              <p className="mt-2">
                The tools are helpers for learning and improving your own writing —
                not a way to skip learning. If your teacher or institution says an
                assignment must be your own unaided work, that rule wins over
                anything on this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">3. AI output may be inaccurate</h2>
              <p className="mt-2">
                The paraphraser, humanizer and SOP writer use AI models, and AI
                models sometimes make mistakes: they can change the meaning of a
                sentence, invent facts, or produce awkward or incorrect English.
                The AI checker gives an estimate based on writing patterns — it is
                not a guarantee, and no detector is 100% accurate. Always read the
                result, check the facts, and edit the output in your own voice
                before submitting anything.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">4. No warranty</h2>
              <p className="mt-2">
                The site and its tools are provided &ldquo;as is&rdquo;, without any
                warranty of any kind. We do not guarantee that the tools will always
                be available, error-free or suitable for any particular purpose,
                including passing an AI detector or meeting a grade. You use the
                results at your own judgement, and you are responsible for what you
                submit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">5. Your content</h2>
              <p className="mt-2">
                You keep full ownership of the text you paste and the results you
                generate. We do not store your text, and we claim no rights over
                it. You are responsible for making sure the text you paste is yours
                to use, or that you have permission to use it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">6. Changes</h2>
              <p className="mt-2">
                We may update these terms or the site from time to time — for
                example, if we add a tool or change a provider. The updated terms
                will be posted on this page with a new &ldquo;last updated&rdquo; date.
                Continued use of the site after a change means you accept the new
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">7. Contact</h2>
              <p className="mt-2">
                Questions about these terms?{" "}
                <Link href="/contact" className="font-semibold text-brand-600 hover:text-brand-700">
                  Contact us
                </Link>{" "}
                or email{" "}
                <a href="mailto:hello@assignmenthelper.example" className="font-semibold text-brand-600 hover:text-brand-700">
                  hello@assignmenthelper.example
                </a>
                .
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
