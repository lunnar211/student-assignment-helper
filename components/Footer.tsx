import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

const TOOLS = [
  { href: "/paraphraser", label: "AI Paraphraser" },
  { href: "/humanizer", label: "AI Humanizer" },
  { href: "/sop-writer", label: "SOP Writer" },
  { href: "/ai-checker", label: "AI Checker" },
  { href: "/similarity-checker", label: "Similarity Checker" },
  { href: "/grammar-checker", label: "Grammar Checker" },
];

const LEARN = [
  { href: "/guides/how-to-write-an-sop", label: "How to write an SOP" },
  { href: "/guides/how-to-paraphrase", label: "How to paraphrase without plagiarising" },
  { href: "/guides/grammar-tips", label: "Grammar tips for students" },
  { href: "/guides", label: "All guides" },
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-indigo-600 to-sky-500 text-white shadow-lg shadow-brand-500/25">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-[17px] font-bold tracking-tight text-slate-900">
                Assignment <span className="gradient-text">Helper</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Free AI writing tools for students. Paraphrase, humanize, write
              your SOP, check grammar and AI content — no login, no signup,
              no paywall.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              100% free · No account needed
            </p>
          </div>

          {[
            { title: "Tools", links: TOOLS },
            { title: "Learn", links: LEARN },
            { title: "Company", links: COMPANY },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 Assignment Helper. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 fill-rose-400 text-rose-400" /> for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
