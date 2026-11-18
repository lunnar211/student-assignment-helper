"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ScanSearch } from "lucide-react";
import { ClearButton, ErrorBanner, LoadingSkeleton, PrimaryButton, ToolShell } from "@/components/ToolShell";
import WordStats from "@/components/WordStats";

const MAX_CHARS = 30000;

interface DetectResponse {
  score: number;
  verdict: string;
  reasons: string[];
  stats: {
    words: number;
    sentences: number;
    avgSentenceLength: number;
    sentenceLengthStdDev: number;
    repeatedTrigrams: number;
    aiPhraseHits: string[];
  };
}

const EXAMPLE =
  "Moreover, it is important to note that education plays a crucial role in today's fast-paced world. Furthermore, it is worth noting that learning significantly enhances one's ability to navigate the complexities of modern life. In conclusion, education is a testament to human progress and it is essential to understand its pivotal role in the landscape of society.";

function verdictStyle(score: number) {
  if (score < 30)
    return {
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      bar: "bg-emerald-600",
      text: "text-emerald-600",
    };
  if (score <= 70)
    return {
      badge: "bg-amber-50 text-amber-700 ring-amber-200",
      bar: "bg-amber-600",
      text: "text-amber-600",
    };
  return {
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    bar: "bg-[#b42318]",
    text: "text-rose-600",
  };
}

export default function AiCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const style = result ? verdictStyle(result.score) : null;

  return (
    <ToolShell
      icon={<ScanSearch className="h-4 w-4" />}
      badge="AI Checker"
      variant="report"
      kicker="Tool 04 · AI check"
      redNote="✎ estimate only — patterns, not proof. No detector is 100% accurate."
      title="Check if your text looks AI-written"
      description="Get an instant estimate of how likely your writing is to read as AI-generated — based on sentence patterns, repeated phrases and common AI wording."
    >
      <div className="card p-5 sm:p-6">
        <label htmlFor="detect-input" className="text-sm font-semibold text-slate-900">
          Your text
        </label>
        <textarea
          id="detect-input"
          value={text}
          onChange={(e) => { setText(e.target.value.slice(0, MAX_CHARS)); setResult(null); setError(""); }}
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
            <ScanSearch className="h-4 w-4" />
            Check for AI patterns
          </PrimaryButton>
          <ClearButton
            onClick={() => { setText(""); setResult(null); setError(""); }}
            disabled={!text && !result && !error}
          />
          <button
            onClick={() => {
              setText(EXAMPLE);
              setResult(null);
              setError("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            Try an AI-style example
          </button>
        </div>
      </div>

      {loading && <LoadingSkeleton />}
      {error && <ErrorBanner message={error} />}

      <AnimatePresence>
        {result && style && (
          <motion.div
            key="detect-result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="card mt-5 p-5 sm:p-6"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">AI likelihood</p>
                <p className={`mt-1 text-5xl font-bold tracking-tight ${style.text}`}>
                  {result.score}
                  <span className="text-2xl">%</span>
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ${style.badge}`}
              >
                {result.verdict}
              </span>
            </div>

            <div className="mt-5 h-3.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${style.bar}`}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-400">
              <span>0% — likely human</span>
              <span>100% — likely AI</span>
            </div>

            {result.reasons.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900">Why this score?</h3>
                <ul className="mt-3 space-y-2.5">
                  {result.reasons.map((r, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { label: "Words", value: result.stats.words.toLocaleString() },
                { label: "Sentences", value: result.stats.sentences.toLocaleString() },
                { label: "Avg sentence", value: `${result.stats.avgSentenceLength} words` },
                { label: "Repeated phrases", value: String(result.stats.repeatedTrigrams) },
                { label: "AI phrases found", value: String(result.stats.aiPhraseHits.length) },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-100">
                  <p className="text-xs font-medium text-slate-400">{s.label}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm leading-relaxed text-amber-800">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
              <p>
                This is an ESTIMATE from writing patterns, not a guarantee — no
                detector is 100% accurate. A high score does not prove text was
                written by AI, and a low score does not prove it was written by a
                human. Always follow your school&apos;s rules about AI use.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolShell>
  );
}
