"use client";

import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { ErrorBanner, LoadingSkeleton, PrimaryButton, ResultCard, ToolShell } from "@/components/ToolShell";
import WordStats from "@/components/WordStats";

const MAX_CHARS = 30000;

type Tone = "Standard" | "Formal" | "Simple" | "Academic";
const TONES: Tone[] = ["Standard", "Formal", "Simple", "Academic"];

const EXAMPLES = [
  {
    label: "Example: why education matters",
    text: "Education is important because it helps people learn new skills, get better jobs, and understand the world around them. It also teaches critical thinking and problem-solving, which are useful in everyday life.",
  },
  {
    label: "Example: climate change",
    text: "Climate change is one of the biggest challenges facing the world today. Rising temperatures are causing sea levels to rise, weather patterns to change, and natural disasters to become more frequent and severe.",
  },
];

export default function ParaphraserPage() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState<Tone>("Standard");
  const [result, setResult] = useState<{ result: string; provider?: string; words?: number } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
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

  return (
    <ToolShell
      icon={<RefreshCw className="h-4 w-4" />}
      badge="AI Paraphraser"
      title="Paraphrase any text in seconds"
      description="Rewrite essays, assignments and notes in your own words. Pick a tone, paste your text, and get a fresh version — free, no login."
    >
      <div className="card p-5 sm:p-6">
        <label htmlFor="paraphrase-input" className="text-sm font-semibold text-slate-900">
          Your text
        </label>
        <textarea
          id="paraphrase-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          rows={9}
          placeholder="Paste the text you want to rewrite here…"
          className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <WordStats text={text} />
          <span className="text-xs font-medium text-slate-400">
            {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-900">Tone</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Paraphrase tone">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                aria-pressed={tone === t}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                  tone === t
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-600/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={run} disabled={!text.trim()} loading={loading}>
            <RefreshCw className="h-4 w-4" />
            Paraphrase
          </PrimaryButton>
          <span className="text-xs text-slate-400">
            Tip: read the result once and make it sound like you before submitting.
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => {
                setText(ex.text);
                setResult(null);
                setError("");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Try an example
              <span className="font-normal text-brand-500">— {ex.label.replace("Example: ", "")}</span>
            </button>
          ))}
        </div>
      </div>

      {loading && <LoadingSkeleton />}
      {error && <ErrorBanner message={error} />}
      {result && (
        <ResultCard
          title={`Paraphrased — ${tone} tone`}
          text={result.result}
          words={result.words}
          provider={result.provider}
        />
      )}
    </ToolShell>
  );
}
