"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, Eraser, Loader2 } from "lucide-react";
import Reveal from "./Reveal";

export type ToolVariant =
  | "rewrite"
  | "human"
  | "letter"
  | "report"
  | "compare"
  | "manuscript"
  | "desk";

interface ToolShellProps {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
  /** Distinct header treatment per tool — no two tools share a hero. */
  variant?: ToolVariant;
  /** Red-pen annotation shown in the header, in the tool's own voice. */
  redNote?: string;
  kicker?: string;
}

const VARIANT_HEADER: Record<ToolVariant, { align: string; noteClass: string }> = {
  rewrite: { align: "text-left", noteClass: "" },
  human: { align: "text-left", noteClass: "" },
  letter: { align: "text-center", noteClass: "" },
  report: { align: "text-left", noteClass: "font-mono" },
  compare: { align: "text-left", noteClass: "" },
  manuscript: { align: "text-left", noteClass: "" },
  desk: { align: "text-left", noteClass: "" },
};

export function ToolShell({
  icon,
  badge,
  title,
  description,
  children,
  variant = "rewrite",
  redNote,
  kicker,
}: ToolShellProps) {
  const header = VARIANT_HEADER[variant];
  const isLetter = variant === "letter";
  const isReport = variant === "report";
  const isManuscript = variant === "manuscript";
  const isCompare = variant === "compare";

  return (
    <div className="paper-ruled">
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          {/* Distinct header per tool */}
          {isLetter ? (
            <div className="border-y-4 border-double border-[#1c2b4a] py-6 text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-[#b42318] uppercase">
                {kicker ?? badge}
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl">
                {title}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl font-serif text-base leading-relaxed text-[#3c4a68] italic sm:text-lg">
                {description}
              </p>
              {redNote && (
                <p className="margin-note mt-4 text-sm">{redNote}</p>
              )}
            </div>
          ) : isReport ? (
            <div className="border border-[#1c2b4a] bg-[#fffdf6] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] text-[#b42318] uppercase">
                    {kicker ?? badge} — margin report
                  </p>
                  <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-[#3c4a68]">
                    {description}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#b42318] font-mono text-lg font-bold text-[#b42318]"
                >
                  ?%
                </span>
              </div>
              {redNote && <p className="margin-note mt-4 text-sm">{redNote}</p>}
            </div>
          ) : isCompare ? (
            <div>
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#b42318] uppercase">
                <span className="inline-flex items-center gap-2">{icon} {kicker ?? badge}</span>
                <span aria-hidden className="h-px flex-1 bg-[#b42318]/40" />
                <span aria-hidden>A ⇄ B</span>
              </div>
              <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3c4a68] sm:text-lg">
                {description}
              </p>
              {redNote && <p className="margin-note mt-3 text-sm">{redNote}</p>}
            </div>
          ) : isManuscript ? (
            <div className="border-l-4 border-[#b42318] bg-[#fffdf6] py-4 pl-5">
              <p className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-[#b42318] uppercase">
                {icon} {kicker ?? badge} — marked-up manuscript
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3c4a68] sm:text-lg">
                {description}
              </p>
              {redNote && (
                <p className="margin-note mt-3 text-sm">
                  <s className="opacity-70">teh</s> → the &nbsp;·&nbsp; {redNote}
                </p>
              )}
            </div>
          ) : (
            <div className={header.align}>
              <span className="inline-flex items-center gap-2 border border-[#1c2b4a] bg-[#fffdf6] px-3.5 py-1.5 font-mono text-xs font-semibold tracking-widest text-[#1c2b4a] uppercase">
                {icon}
                {kicker ?? badge}
              </span>
              <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3c4a68] sm:text-lg">
                {description}
              </p>
              {redNote && <p className="margin-note mt-3 text-sm">{redNote}</p>}
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          {children}
        </Reveal>
      </div>
    </div>
  );
}

interface ResultCardProps {
  title: string;
  text: string;
  words?: number;
  provider?: string;
  accent?: "brand" | "emerald" | "amber" | "rose";
  /** When set, a Download .txt button is shown (file name for the download). */
  downloadName?: string;
}

const ACCENTS = {
  brand: "border-[#1c2b4a]/30 bg-[#fffdf6]",
  emerald: "border-emerald-800/30 bg-[#fffdf6]",
  amber: "border-amber-800/30 bg-[#fffdf6]",
  rose: "border-[#b42318]/40 bg-[#fffdf6]",
};

function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ResultCard({ title, text, words, provider, accent = "brand", downloadName }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`card mt-5 overflow-hidden ${ACCENTS[accent]}`}
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ddd5bd] px-5 py-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-[#1c2b4a]">{title}</h2>
          {typeof words === "number" && (
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-300">
              {words.toLocaleString()} words
            </span>
          )}
          {provider && provider !== "fallback" && (
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-300">
              via{" "}
              {provider === "groq"
                ? "Groq AI"
                : provider === "languagetool"
                  ? "LanguageTool"
                  : provider === "pollinations"
                    ? "Pollinations AI"
                    : provider}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {downloadName && (
            <button
              onClick={() => downloadTextFile(downloadName, text)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c2b4a] ring-1 ring-slate-300 transition-colors hover:bg-slate-50 active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              Download .txt
            </button>
          )}
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1c2b4a] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16233d] active:scale-95"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="max-h-[480px] overflow-y-auto px-5 py-4">
        <p className="font-mono whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">{text}</p>
      </div>
    </motion.div>
  );
}

export function LoadingSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="card mt-5 space-y-3 px-5 py-5" role="status" aria-live="polite" aria-label="Loading result">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded-full"
          style={{ width: `${92 - i * 9}%` }}
        />
      ))}
      <p className="flex items-center gap-2 pt-1 text-sm text-slate-600">
        <Loader2 className="h-4 w-4 animate-spin text-[#b42318]" />
        AI is writing… this usually takes a few seconds.
      </p>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-5 rounded-lg border border-rose-300 bg-rose-50 px-5 py-4 text-sm leading-relaxed text-rose-900"
      role="alert"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#1c2b4a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16233d] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/** Secondary "start over" button — sits next to every PrimaryButton. */
export function ClearButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1c2b4a] ring-1 ring-[#1c2b4a]/30 transition-all duration-200 hover:bg-[#f3ecd7] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Eraser className="h-4 w-4" />
      {children ?? "Clear"}
    </button>
  );
}
