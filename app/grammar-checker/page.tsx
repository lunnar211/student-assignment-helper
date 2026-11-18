"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Wrench } from "lucide-react";
import { ErrorBanner, LoadingSkeleton, PrimaryButton, ResultCard, ToolShell } from "@/components/ToolShell";
import WordStats from "@/components/WordStats";

const MAX_CHARS = 30000;

interface GrammarMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements?: { value: string }[];
  ruleId?: string;
  ruleDescription?: string;
}

interface GrammarResponse {
  matches: GrammarMatch[];
  corrected: string;
  provider?: string;
  error?: string;
}

export default function GrammarCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<GrammarResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else if (data.provider === "unavailable") {
        setError(data.error || "The grammar service is temporarily unavailable. Please try again in a few minutes.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      icon={<Wrench className="h-4 w-4" />}
      badge="Grammar Checker"
      title="Fix grammar, spelling & punctuation"
      description="Paste your assignment and get every mistake explained — then apply the corrected version in one click. Free, no login."
    >
      <div className="card p-5 sm:p-6">
        <label htmlFor="grammar-input" className="text-sm font-semibold text-slate-900">
          Your text
        </label>
        <textarea
          id="grammar-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          rows={9}
          placeholder="Paste the text you want to check here…"
          className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <WordStats text={text} />
          <span className="text-xs font-medium text-slate-400">
            {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={run} disabled={!text.trim()} loading={loading}>
            <Wrench className="h-4 w-4" />
            Check grammar
          </PrimaryButton>
          <button
            onClick={() => {
              setText("Their going to the library to study for there exams. Its important to practise everyday, because good habits makes a big difference.");
              setResult(null);
              setError("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            Try an example with mistakes
          </button>
        </div>
      </div>

      {loading && <LoadingSkeleton />}
      {error && <ErrorBanner message={error} />}

      <AnimatePresence>
        {result && (
          <motion.div
            key="grammar-result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-5 flex items-center gap-2">
              {result.matches.length === 0 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-4 w-4" />
                  No issues found — nice work!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200">
                  Found {result.matches.length} issue{result.matches.length === 1 ? "" : "s"}
                </span>
              )}
            </div>

            {result.corrected && result.corrected !== text && (
              <ResultCard
                title="Corrected text"
                text={result.corrected}
                provider={result.provider}
                accent="emerald"
              />
            )}

            {result.matches.length > 0 && (
              <>
                <div className="mt-4">
                  <PrimaryButton
                    onClick={() => {
                      setText(result.corrected);
                      setResult(null);
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Use corrected text
                  </PrimaryButton>
                </div>
                <ul className="mt-5 space-y-3">
                  {result.matches.map((m, i) => {
                    const suggestion = m.replacements?.[0]?.value;
                    const problem = text.slice(m.offset, m.offset + m.length);
                    return (
                      <li key={`${m.ruleId ?? "rule"}-${i}`} className="card p-4 sm:p-5">
                        <p className="text-sm font-semibold text-slate-900">
                          {m.shortMessage || m.message}
                        </p>
                        {m.message !== (m.shortMessage || "") && (
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">{m.message}</p>
                        )}
                        {problem && (
                          <p className="mt-2 text-sm text-slate-600">
                            In your text:{" "}
                            <span className="rounded bg-rose-50 px-1.5 py-0.5 font-medium text-rose-700 ring-1 ring-rose-200">
                              {problem}
                            </span>
                            {suggestion && (
                              <>
                                {"  →  "}
                                <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700 ring-1 ring-emerald-200">
                                  {suggestion}
                                </span>
                              </>
                            )}
                          </p>
                        )}
                        {m.ruleDescription && (
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{m.ruleDescription}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ToolShell>
  );
}
