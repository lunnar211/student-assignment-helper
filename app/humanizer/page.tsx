"use client";

import { useState } from "react";
import { Fingerprint, Sparkles } from "lucide-react";
import { ErrorBanner, LoadingSkeleton, PrimaryButton, ResultCard, ToolShell } from "@/components/ToolShell";
import WordStats from "@/components/WordStats";

const MAX_CHARS = 5000;

const EXAMPLES = [
  {
    label: "Example: stiff AI-style paragraph",
    text: "Moreover, it is important to note that education plays a crucial role in today's fast-paced world. Furthermore, it is worth noting that learning significantly enhances one's ability to navigate the complexities of modern life. In conclusion, education is a testament to human progress.",
  },
  {
    label: "Example: robotic essay opening",
    text: "In today's world, technology has become increasingly important. It is essential to understand that technology impacts every aspect of our lives. Additionally, it leverages innovation to transform the landscape of communication and learning.",
  },
];

export default function HumanizerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ result: string; provider?: string; words?: number } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/humanize", {
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

  return (
    <ToolShell
      icon={<Fingerprint className="h-4 w-4" />}
      badge="AI Humanizer"
      title="Make AI text sound human"
      description="Rewrites stiff, robotic, AI-sounding text into natural writing that reads like a real person wrote it. Free, no login."
    >
      <div className="card p-5 sm:p-6">
        <label htmlFor="humanize-input" className="text-sm font-semibold text-slate-900">
          Your text
        </label>
        <textarea
          id="humanize-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          rows={9}
          placeholder="Paste the AI-sounding text you want to humanize here…"
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
            <Fingerprint className="h-4 w-4" />
            Humanize text
          </PrimaryButton>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Rewrites AI-sounding text to sound natural.
        </p>

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
          title="Humanized text"
          text={result.result}
          words={result.words}
          provider={result.provider}
          accent="emerald"
        />
      )}
    </ToolShell>
  );
}
