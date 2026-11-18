"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Menu, X, Sparkles } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  badge?: string;
}

const TOOLS: NavLink[] = [
  { href: "/all-in-one", label: "All-in-One", badge: "NEW" },
  { href: "/paraphraser", label: "Paraphraser" },
  { href: "/humanizer", label: "Humanizer" },
  { href: "/sop-writer", label: "SOP Writer" },
  { href: "/ai-checker", label: "AI Checker" },
  { href: "/similarity-checker", label: "Similarity" },
  { href: "/grammar-checker", label: "Grammar" },
];

const PAGES: NavLink[] = [
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#1c2b4a] bg-[#fffdf6]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1c2b4a] text-white transition-transform duration-300 group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-[17px] font-bold tracking-tight text-[#1c2b4a]">
              Assignment Helper
            </span>
            <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-[#b42318]">
              <Sparkles className="h-3 w-3" /> Free for students
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {[...TOOLS, ...PAGES].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(l.href)
                  ? "bg-[#eef1f6] text-[#1c2b4a]"
                  : "text-slate-600 hover:bg-[#f3ecd7] hover:text-[#1c2b4a]"
              }`}
            >
              {l.label}
              {l.badge && (
                <span className="rounded-full bg-[#fdecea] px-1.5 py-px text-[10px] font-bold tracking-wide text-[#b42318]">
                  {l.badge}
                </span>
              )}
            </Link>
          ))}
          <Link
            href="/paraphraser"
            className="ml-2 rounded-md bg-[#1c2b4a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16233d] active:scale-95"
          >
            Start writing free
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200/70 bg-white lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4">
              {[...TOOLS, ...PAGES].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive(l.href)
                      ? "bg-[#eef1f6] text-[#1c2b4a]"
                      : "text-slate-700 hover:bg-[#f3ecd7]"
                  }`}
                >
                  {l.label}
                  {l.badge && (
                    <span className="rounded-full bg-[#fdecea] px-1.5 py-px text-[10px] font-bold tracking-wide text-[#b42318]">
                      {l.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/paraphraser"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md bg-[#1c2b4a] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
              >
                Start writing free
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
