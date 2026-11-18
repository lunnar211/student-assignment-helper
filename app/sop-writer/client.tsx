"use client";

import { useState } from "react";
import { Download, FileText, PenLine } from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { ClearButton, ErrorBanner, LoadingSkeleton, PrimaryButton, ResultCard, ToolShell } from "@/components/ToolShell";
import WordStats from "@/components/WordStats";

const MAX_CHARS = 5000;

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none";
const labelClass = "text-sm font-semibold text-slate-900";

export default function SopWriterPage() {
  const [fullName, setFullName] = useState("");
  const [program, setProgram] = useState("");
  const [university, setUniversity] = useState("");
  const [background, setBackground] = useState("");
  const [goals, setGoals] = useState("");
  const [achievements, setAchievements] = useState("");
  const [extra, setExtra] = useState("");
  const [formError, setFormError] = useState("");
  const [result, setResult] = useState<{ result: string; provider?: string; words?: number } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [lengthTarget, setLengthTarget] = useState<"short" | "medium" | "long">("medium");

  const LENGTH_TARGETS = {
    short: { label: "Short · about 250 words", words: "about 250 words" },
    medium: { label: "Medium · about 500 words", words: "about 500 words" },
    long: { label: "Long · about 800 words", words: "about 800 words" },
  } as const;

  const run = async () => {
    const missing: string[] = [];
    if (!fullName.trim()) missing.push("your full name");
    if (!program.trim()) missing.push("the program");
    if (!university.trim()) missing.push("the university");
    if (!background.trim()) missing.push("your background");
    if (!goals.trim()) missing.push("your goals");
    if (missing.length > 0) {
      setFormError(`Please fill in ${missing.join(", ")} before generating your SOP.`);
      return;
    }
    setFormError("");
    if (loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, program, university, background, goals, achievements, extra, lengthTarget: LENGTH_TARGETS[lengthTarget].words }),
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

  const downloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Statement-of-Purpose.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadDocx = async () => {
    if (!result || downloading) return;
    setDownloading(true);
    try {
      const doc = new Document({
        sections: [
          {
            children: result.result.split("\n").map(
              (p) =>
                new Paragraph({
                  children: [new TextRun(p)],
                  spacing: { after: 160 },
                }),
            ),
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Statement-of-Purpose.docx";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ToolShell
      icon={<PenLine className="h-4 w-4" />}
      badge="SOP Writer"
      variant="letter"
      kicker="Tool 06 · Statement of Purpose"
      redNote="✎ written on letterhead — a formal letter, not a form"
      title="Write a Statement of Purpose that stands out"
      description="Tell us about yourself, your program and your goals — get a structured SOP draft in under a minute, then make it yours."
    >
      <div className="card p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sop-name" className={labelClass}>
              Full name *
            </label>
            <input
              id="sop-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Sharma"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sop-program" className={labelClass}>
              Program *
            </label>
            <input
              id="sop-program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              placeholder="e.g. MSc Computer Science"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sop-university" className={labelClass}>
              University *
            </label>
            <input
              id="sop-university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g. State University"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sop-background" className={labelClass}>
              Your background *
            </label>
            <textarea
              id="sop-background"
              value={background}
              onChange={(e) => setBackground(e.target.value.slice(0, MAX_CHARS))}
              rows={4}
              placeholder="Your degree, subjects you loved, projects, work experience — a few sentences is enough."
              className={inputClass}
            />
            <p className="mt-1 text-right text-xs text-slate-400">
              {background.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sop-goals" className={labelClass}>
              Your goals *
            </label>
            <textarea
              id="sop-goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value.slice(0, MAX_CHARS))}
              rows={4}
              placeholder="What do you want to study, and what do you want to do after the degree?"
              className={inputClass}
            />
            <p className="mt-1 text-right text-xs text-slate-400">
              {goals.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sop-achievements" className={labelClass}>
              Achievements <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="sop-achievements"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value.slice(0, MAX_CHARS))}
              rows={3}
              placeholder="Awards, top grades, publications, competitions, volunteer work…"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sop-extra" className={labelClass}>
              Anything else? <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="sop-extra"
              value={extra}
              onChange={(e) => setExtra(e.target.value.slice(0, MAX_CHARS))}
              rows={3}
              placeholder="Why this university? A professor you admire? Something personal that shaped your path?"
              className={inputClass}
            />
          </div>
        </div>

        {formError && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">
            {formError}
          </p>
        )}

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-900">Length target</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="SOP length target">
            {(Object.keys(LENGTH_TARGETS) as ("short" | "medium" | "long")[]).map((k) => (
              <button
                key={k}
                onClick={() => { setLengthTarget(k); setResult(null); }}
                aria-pressed={lengthTarget === k}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                  lengthTarget === k
                    ? "bg-[#1c2b4a] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {LENGTH_TARGETS[k].label}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-slate-600">Your notes so far:</p>
            <div className="mt-2">
              <WordStats text={[background, goals, achievements, extra].filter(Boolean).join(" ")} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <PrimaryButton onClick={run} loading={loading}>
            <PenLine className="h-4 w-4" />
            Generate my SOP
          </PrimaryButton>
          <ClearButton
            onClick={() => {
              setFullName(""); setProgram(""); setUniversity(""); setBackground("");
              setGoals(""); setAchievements(""); setExtra(""); setResult(null);
              setError(""); setFormError("");
            }}
            disabled={!fullName && !program && !university && !background && !goals && !achievements && !extra && !result}
          />
          <p className="mt-3 text-sm text-slate-500">
            AI draft — edit it in your own voice before submitting.
          </p>
        </div>
      </div>

      {loading && <LoadingSkeleton lines={8} />}
      {error && <ErrorBanner message={error} />}
      {result && (
        <>
          <ResultCard
            title={`Statement of Purpose — ${program || "your program"}`}
            text={result.result}
            words={result.words}
            provider={result.provider}
            accent="amber"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={downloadTxt}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download .txt
            </button>
            <button
              onClick={downloadDocx}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-50"
            >
              <FileText className="h-4 w-4" />
              {downloading ? "Preparing…" : "Download .docx"}
            </button>
          </div>
        </>
      )}
    </ToolShell>
  );
}
