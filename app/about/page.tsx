import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Heart, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Assignment Helper",
  description:
    "Assignment Helper is a free set of AI writing tools for students: paraphraser, humanizer, SOP writer, AI checker, similarity checker and grammar checker. No login, no paywall.",
};

export default function AboutPage() {
  return (
    <div className="hero-mesh">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <GraduationCap className="h-4 w-4" />
            About us
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Free writing help, built for students.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Assignment Helper is a small, free toolkit that helps students write
            better assignments — faster, and with more confidence.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-10 space-y-6 p-6 text-[15px] leading-relaxed text-slate-600 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">What this site is</h2>
              <p className="mt-2">
                Assignment Helper brings six writing tools together in one place:
                an AI paraphraser, a humanizer, an SOP writer, an AI checker, a
                similarity checker and a grammar checker. They all work the same
                way — paste your text, click one button, copy the result. There
                is no account to create, no email to hand over, and no paywall
                waiting after three free tries. The tools are free, and they are
                meant to stay free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Who it is for</h2>
              <p className="mt-2">
                It is for students — school, college and university — writing in
                English as a first or second language. If you are drafting an
                essay the night before it is due, polishing a Statement of
                Purpose for a university abroad, or checking whether a paragraph
                still sounds like you, this site is for you. You do not need to
                be a good writer already. You just need a draft and a willingness
                to improve it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">How it works</h2>
              <p className="mt-2">
                When you use a tool, your text is sent to an AI or grammar
                provider only to process that one request. The result comes back
                to your browser, and nothing is saved by us — no account, no
                history, no copy of your assignment sitting on a server. The AI
                checker works differently: it runs entirely on writing patterns
                in your text, like sentence length and repeated phrases, and
                gives you an estimate rather than a verdict.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-amber-900">
                <Heart className="h-5 w-5 text-amber-500" />
                An honest note
              </h2>
              <p className="mt-2 text-amber-800">
                AI tools are helpers, not a substitute for learning. A paraphraser
                can reword a paragraph, but it cannot do your thinking for you —
                and it should not. Use the tools to understand, improve and polish
                your own work, then read the result, make it sound like you, and
                add your own ideas. Always follow your school&apos;s rules about
                AI use: if your teacher says an assignment must be entirely your
                own work, respect that.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <Sparkles className="h-5 w-5 text-brand-600" />
                Our free-forever promise
              </h2>
              <p className="mt-2">
                Every tool on this site is free to use, with no credits, no daily
                limits and no premium tier hiding the good features. We keep costs
                low by using efficient AI providers and keeping the site simple —
                so there is no reason to charge you. If that ever changes, we will
                say so plainly on this page first.
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Your text is never stored. What you paste stays yours.
              </p>
            </section>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 text-center">
            <Link
              href="/paraphraser"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-95"
            >
              Try the tools — free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-slate-500">
              Questions? <Link href="/contact" className="font-semibold text-brand-600 hover:text-brand-700">Contact us</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
