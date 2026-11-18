import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Frequently asked questions about Assignment Helper: is it really free, is my text stored, will a teacher detect AI, and can I use it on my phone? Each text is capped at 30,000 characters.",
};

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
  {
    q: "What is the 30,000-character cap?",
    a: "Every tool accepts up to 30,000 characters in one go — roughly 5,000 words. Longer texts are cut off at that limit, so split a very long assignment into parts. The SOP Writer asks for shorter fields (up to 2,000 characters each) because it builds one letter from your answers.",
  },
  {
    q: "Is the AI Checker a real AI detector?",
    a: "No — it is an honest estimate from writing patterns (repeated phrases, sentence lengths, common AI wording). A high score does not prove text was written by AI, and a low score does not prove a human wrote it. Treat it as a warning light, not a verdict.",
  },
  {
    q: "Does the Similarity Checker check the web for plagiarism?",
    a: "No. It compares two texts you paste and shows which words overlap. It cannot check your text against the internet or a plagiarism database.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="paper-ruled">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link href="/" className="font-semibold text-[#b42318] hover:underline">Home</Link>
          <span aria-hidden className="mx-2">›</span>
          <span aria-current="page">FAQ</span>
        </nav>
        <p className="mt-6 font-mono text-xs tracking-[0.3em] text-[#b42318] uppercase">
          Frequently asked questions
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl">
          Questions, answered
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#3c4a68]">
          Straight answers — including the limits. If your question is not
          here, email us at{" "}
          <a href="mailto:dipeshkarki8292@gmail.com" className="font-semibold text-[#b42318] hover:underline">
            dipeshkarki8292@gmail.com
          </a>
          .
        </p>

        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="card group px-5 py-4 open:shadow-md">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-[#1c2b4a]">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#3c4a68]">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#3c4a68]">
          Ready to fix that draft?{" "}
          <Link href="/all-in-one" className="font-semibold text-[#b42318] hover:underline">
            Open All-in-One →
          </Link>
        </p>
      </div>
    </div>
  );
}
