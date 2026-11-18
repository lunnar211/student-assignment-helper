"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Loader2 } from "lucide-react";
import Reveal from "./Reveal";

interface ToolShellProps {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolShell({ icon, badge, title, description, children }: ToolShellProps) {
  return (
    <div className="hero-mesh">
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
              {icon}
              {badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
              {description}
            </p>
          </div>
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
}

const ACCENTS = {
  brand: "border-brand-200 bg-brand-50/50",
  emerald: "border-emerald-200 bg-emerald-50/50",
  amber: "border-amber-200 bg-amber-50/50",
  rose: "border-rose-200 bg-rose-50/50",
};

export function ResultCard({ title, text, words, provider, accent = "brand" }: ResultCardProps) {
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
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 px-5 py-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {typeof words === "number" && (
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
              {words.toLocaleString()} words
            </span>
          )}
          {provider && provider !== "fallback" && (
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
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
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-700 active:scale-95"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="max-h-[480px] overflow-y-auto px-5 py-4">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">{text}</p>
      </div>
    </motion.div>
  );
}

export function LoadingSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="card mt-5 space-y-3 px-5 py-5" aria-label="Loading result">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded-full"
          style={{ width: `${92 - i * 9}%` }}
        />
      ))}
      <p className="flex items-center gap-2 pt-1 text-sm text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
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
      className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm leading-relaxed text-rose-800"
      role="alert"
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
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:shadow-xl hover:shadow-brand-600/30 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
