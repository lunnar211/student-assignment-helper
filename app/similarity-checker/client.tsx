"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scale } from "lucide-react";
import { ClearButton, ErrorBanner, LoadingSkeleton, PrimaryButton, ToolShell } from "@/components/ToolShell";
import WordStats from "@/components/WordStats";

const MAX_CHARS = 30000;

interface SimilarityResponse {
  similarity: number;
  overlapWords: string[];
  stats: { wordsA: number; wordsB: number; commonWords: number; uniqueA: number; uniqueB: number };
}

const EXAMPLE_A =
  "Education is important because it helps people learn new skills, get better jobs, and understand the world around them. It also teaches critical thinking and problem-solving, which are useful in everyday life.";
const EXAMPLE_B =
  "Learning matters because it gives people new abilities, improves their chances of finding good work, and helps them make sense of the world. It also builds the habit of thinking carefully and solving problems, which helps in daily life.";

function interpretation(sim: number) {
  if (sim < 20)
    return {
      text: "Low overlap — well paraphrased",
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      bar: "bg-emerald-600",
      num: "text-emerald-600",
    };
  if (sim <= 50)
    return {
      text: "Some overlap — rewrite the highlighted words",
      badge: "bg-amber-50 text-amber-700 ring-amber-200",
      bar: "bg-amber-600",
      num: "text-amber-600",
    };
  return {
    text: "High overlap — needs a real rewrite",
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    bar: "bg-[#b42318]",
    num: "text-rose-600",
  };
}

export default function SimilarityCheckerPage() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [result, setResult] = useState<SimilarityResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!textA.trim() || !textB.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/similarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textA, textB }),
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

  const interp = result ? interpretation(result.similarity) : null;

  return (
    <ToolShell
      icon={<Scale className="h-4 w-4" />}
      badge="Similarity Checker"
      variant="compare"
      kicker="Tool 05 · Similarity"
      redNote="✎ word-for-word overlap only — this is not a web plagiarism check"
      title="Compare two texts for overlap"
      description="Paste an original and a rewritten version side by side to see how similar they are — and exactly which words still overlap."
    >
      <div className="card p-5 sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="sim-a" className="text-sm font-semibold text-slate-900">
              Original text
            </label>
            <textarea
              id="sim-a"
              value={textA}
              onChange={(e) => { setTextA(e.target.value.slice(0, MAX_CHARS)); setResult(null); setError(""); }}
              rows={8}
              placeholder="Paste the original text here…"
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <WordStats text={textA} />
              <span className="text-xs text-slate-400">{textA.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <label htmlFor="sim-b" className="text-sm font-semibold text-slate-900">
              Rewritten text
            </label>
            <textarea
              id="sim-b"
              value={textB}
              onChange={(e) => { setTextB(e.target.value.slice(0, MAX_CHARS)); setResult(null); setError(""); }}
              rows={8}
              placeholder="Paste your rewritten version here…"
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <WordStats text={textB} />
              <span className="text-xs text-slate-400">{textB.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={run} disabled={!textA.trim() || !textB.trim()} loading={loading}>
            <Scale className="h-4 w-4" />
            Compare texts
          </PrimaryButton>
          <ClearButton
            onClick={() => { setTextA(""); setTextB(""); setResult(null); setError(""); }}
            disabled={!textA && !textB && !result && !error}
          />
          <button
            onClick={() => {
              setTextA(EXAMPLE_A);
              setTextB(EXAMPLE_B);
              setResult(null);
              setError("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            Try an example pair
          </button>
        </div>
      </div>

      {loading && <LoadingSkeleton />}
      {error && <ErrorBanner message={error} />}

      <AnimatePresence>
        {result && interp && (
          <motion.div
            key="sim-result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="card mt-5 p-5 sm:p-6"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">Similarity</p>
                <p className={`mt-1 text-5xl font-bold tracking-tight ${interp.num}`}>
                  {result.similarity}
                  <span className="text-2xl">%</span>
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ${interp.badge}`}
              >
                {interp.text}
              </span>
            </div>

            <div className="mt-5 h-3.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, result.similarity)}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${interp.bar}`}
              />
            </div>

            {result.overlapWords.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  Overlapping words ({result.overlapWords.length})
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.overlapWords.map((w) => (
                    <span
                      key={w}
                      className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: "Words — original", value: result.stats.wordsA.toLocaleString() },
                { label: "Words — rewritten", value: result.stats.wordsB.toLocaleString() },
                { label: "Common words", value: result.stats.commonWords.toLocaleString() },
                { label: "Unique — original", value: result.stats.uniqueA.toLocaleString() },
                { label: "Unique — rewritten", value: result.stats.uniqueB.toLocaleString() },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-100">
                  <p className="text-xs font-medium text-slate-400">{s.label}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolShell>
  );
}
