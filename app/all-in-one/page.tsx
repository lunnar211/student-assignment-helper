"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Download,
  FileText,
  FileUp,
  Loader2,
  ScanSearch,
  Scale,
  Sparkles,
  Upload,
  Wand2,
  Wrench,
  XCircle,
} from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import {
  ErrorBanner,
  LoadingSkeleton,
  PrimaryButton,
  ResultCard,
  ToolShell,
} from "@/components/ToolShell";
import WordStats from "@/components/WordStats";
import type { DetectResult, SimilarityResult } from "@/lib/text";
import { wordCount } from "@/lib/text";

const MAX_CHARS = 5000;
const MIN_CHARS = 30;
const MAX_FILE_MB = 10;

const EXAMPLE_TEXT =
  "Education is very important for every student. Moreover, it is important to note that education plays a crucial role in todays fast-paced world. Their are many benefits of education, it help students to learn new things and it makes there future better. In conclusion, education is the key to success and it is essential to everyones life.";

type StepStatus = "idle" | "running" | "done" | "failed";

interface StepState {
  status: StepStatus;
  note: string;
}

const STEP_DEFS = [
  { title: "Grammar check — original", hint: "Finding mistakes in your text" },
  { title: "AI check — original", hint: "Estimating how AI-like it reads" },
  { title: "Paraphrase", hint: "Rewriting in clear, standard English" },
  { title: "Humanize", hint: "Making it sound like a real person wrote it" },
  { title: "Auto-fix grammar — final", hint: "Checking the final text and applying every fix" },
  { title: "Similarity + AI re-check", hint: "Comparing the final text with your original" },
];

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

interface AppliedFix {
  problem: string;
  fix: string;
  message: string;
}

interface AllInOneResult {
  original: string;
  finalText: string;
  aiBefore: DetectResult | null;
  aiAfter: DetectResult | null;
  paraphrased: string | null;
  humanized: string | null;
  grammarBeforeCount: number;
  fixes: AppliedFix[];
  similarity: SimilarityResult | null;
}

async function postJson(
  url: string,
  body: unknown,
): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: Record<string, unknown> = {};
  try {
    data = (await res.json()) as Record<string, unknown>;
  } catch {
    // Keep empty data on a bad response.
  }
  return { ok: res.ok, data };
}

function fixesFromMatches(
  matches: GrammarMatch[],
  base: string,
): AppliedFix[] {
  const fixes: AppliedFix[] = [];
  for (const m of matches) {
    const replacement = m.replacements?.[0]?.value;
    if (!replacement) continue;
    if (m.offset < 0 || m.offset + m.length > base.length) continue;
    fixes.push({
      problem: base.slice(m.offset, m.offset + m.length),
      fix: replacement,
      message: m.shortMessage || m.message || "Grammar fix",
    });
  }
  return fixes;
}

export default function AllInOnePage() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [fileNote, setFileNote] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [steps, setSteps] = useState<StepState[]>(
    STEP_DEFS.map(() => ({ status: "idle" as StepStatus, note: "" })),
  );
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<AllInOneResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showParaphrased, setShowParaphrased] = useState(false);
  const [showHumanized, setShowHumanized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateStep = (index: number, status: StepStatus, note = "") => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = { status, note };
      return next;
    });
  };

  const extractTextFromFile = async (file: File) => {
    setExtracting(true);
    setFileNote("");
    setPageCount(null);
    try {
      if (file.name.toLowerCase().endsWith(".txt")) {
        const content = await file.text();
        applyExtracted(content, file.name, null, "Text file loaded.");
        return;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setFileNote(`That file is over ${MAX_FILE_MB} MB — please use a smaller PDF.`);
        return;
      }
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const buf = await file.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: buf }).promise;
      let out = "";
      for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p);
        const content = await page.getTextContent();
        let pageText = "";
        let line = "";
        for (const item of content.items) {
          if (!("str" in item)) continue;
          line += `${item.str} `;
          if (item.hasEOL) {
            pageText += `${line.trim()}\n`;
            line = "";
          }
        }
        if (line.trim()) pageText += `${line.trim()}\n`;
        out += `${pageText}\n`;
      }
      const cleaned = out.replace(/ {2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
      if (!cleaned) {
        setFileNote(
          "No text found in this PDF — it may be a scanned image. Try a text-based PDF or paste the text instead.",
        );
        return;
      }
      applyExtracted(cleaned, file.name, doc.numPages, "PDF text extracted in your browser.");
    } catch {
      setFileNote(
        "Could not read that file. Make sure it is a normal PDF (not password-protected) and try again.",
      );
    } finally {
      setExtracting(false);
    }
  };

  const applyExtracted = (
    content: string,
    name: string,
    pages: number | null,
    note: string,
  ) => {
    const truncated = content.length > MAX_CHARS;
    setText(content.slice(0, MAX_CHARS));
    setFileName(name);
    setPageCount(pages);
    setResult(null);
    setError("");
    setFileNote(
      `${note}${pages ? ` ${pages} page${pages === 1 ? "" : "s"}.` : ""}${
        truncated ? ` Only the first ${MAX_CHARS.toLocaleString()} characters were kept (the tools accept up to 5,000 characters).` : ""
      }`,
    );
  };

  const handleFile = (file: File | undefined | null) => {
    if (!file || extracting) return;
    const lower = file.name.toLowerCase();
    if (!lower.endsWith(".pdf") && !lower.endsWith(".txt")) {
      setFileNote("Please upload a .pdf file (or a .txt file).");
      return;
    }
    void extractTextFromFile(file);
  };

  const run = async () => {
    const original = text.trim();
    if (original.length < MIN_CHARS || running) return;
    setRunning(true);
    setError("");
    setResult(null);
    setSteps(STEP_DEFS.map(() => ({ status: "idle" as StepStatus, note: "" })));

    let aiBefore: DetectResult | null = null;
    let grammarBeforeCount = 0;
    let paraphrased: string | null = null;
    let humanized: string | null = null;
    let finalText = original;
    let fixes: AppliedFix[] = [];
    let aiAfter: DetectResult | null = null;
    let similarity: SimilarityResult | null = null;

    try {
      // Steps 1 + 2 in parallel: grammar + AI check on the original.
      updateStep(0, "running");
      updateStep(1, "running");
      const [grammarFirst, detectFirst] = await Promise.allSettled([
        postJson("/api/grammar", { text: original }),
        postJson("/api/detect", { text: original }),
      ]);

      if (
        grammarFirst.status === "fulfilled" &&
        grammarFirst.value.ok &&
        grammarFirst.value.data.provider !== "unavailable" &&
        !grammarFirst.value.data.error
      ) {
        const g = grammarFirst.value.data as unknown as GrammarResponse;
        grammarBeforeCount = g.matches.length;
        updateStep(
          0,
          "done",
          grammarBeforeCount === 0
            ? "No issues found"
            : `${grammarBeforeCount} issue${grammarBeforeCount === 1 ? "" : "s"} found`,
        );
      } else {
        updateStep(0, "failed", "couldn't run this step");
      }

      if (
        detectFirst.status === "fulfilled" &&
        detectFirst.value.ok &&
        typeof detectFirst.value.data.score === "number"
      ) {
        aiBefore = detectFirst.value.data as unknown as DetectResult;
        updateStep(1, "done", `${aiBefore.score}% likely AI — ${aiBefore.verdict}`);
      } else {
        updateStep(1, "failed", "couldn't run this step");
      }

      // Step 3: paraphrase (sequential — step 4 depends on it).
      updateStep(2, "running");
      const para = await postJson("/api/paraphrase", { text: original, tone: "standard" });
      if (
        para.ok &&
        para.data.provider !== "fallback" &&
        typeof para.data.result === "string" &&
        (para.data.result as string).trim().length > 0
      ) {
        paraphrased = para.data.result as string;
        updateStep(2, "done", `${wordCount(paraphrased)} words rewritten`);
      } else {
        updateStep(2, "failed", "couldn't run this step");
      }

      // Step 4: humanize the paraphrased text (or the original if paraphrase failed).
      updateStep(3, "running");
      const humanizeInput = paraphrased ?? original;
      const hum = await postJson("/api/humanize", { text: humanizeInput });
      if (
        hum.ok &&
        hum.data.provider !== "fallback" &&
        typeof hum.data.result === "string" &&
        (hum.data.result as string).trim().length > 0
      ) {
        humanized = hum.data.result as string;
        updateStep(3, "done", `${wordCount(humanized)} words, natural rhythm`);
      } else {
        updateStep(3, "failed", "couldn't run this step");
      }

      // Step 5: grammar-check the final text and auto-apply every correction.
      updateStep(4, "running");
      const base = humanized ?? paraphrased ?? original;
      const grammarFinal = await postJson("/api/grammar", { text: base });
      if (
        grammarFinal.ok &&
        grammarFinal.data.provider !== "unavailable" &&
        !grammarFinal.data.error
      ) {
        const g = grammarFinal.data as unknown as GrammarResponse;
        fixes = fixesFromMatches(g.matches, base);
        finalText = g.corrected || base;
        updateStep(
          4,
          "done",
          fixes.length === 0
            ? "Already clean — no fixes needed"
            : `${fixes.length} fix${fixes.length === 1 ? "" : "es"} applied automatically`,
        );
      } else {
        finalText = base;
        updateStep(4, "failed", "couldn't run this step — showing the text without the final grammar pass");
      }

      // Step 6 in parallel: similarity (final vs original) + AI re-check on the final text.
      updateStep(5, "running");
      const [simRes, detectFinal] = await Promise.allSettled([
        postJson("/api/similarity", { textA: original, textB: finalText }),
        postJson("/api/detect", { text: finalText }),
      ]);

      if (
        simRes.status === "fulfilled" &&
        simRes.value.ok &&
        typeof simRes.value.data.similarity === "number"
      ) {
        similarity = simRes.value.data as unknown as SimilarityResult;
      }
      if (
        detectFinal.status === "fulfilled" &&
        detectFinal.value.ok &&
        typeof detectFinal.value.data.score === "number"
      ) {
        aiAfter = detectFinal.value.data as unknown as DetectResult;
      }

      if (similarity || aiAfter) {
        const parts: string[] = [];
        if (similarity) parts.push(`${similarity.similarity}% similar to your original`);
        if (aiAfter) parts.push(`now ${aiAfter.score}% likely AI`);
        updateStep(5, "done", parts.join(" · "));
      } else {
        updateStep(5, "failed", "couldn't run this step");
      }

      setResult({
        original,
        finalText,
        aiBefore,
        aiAfter,
        paraphrased,
        humanized,
        grammarBeforeCount,
        fixes,
        similarity,
      });
    } catch {
      setError("Something went wrong while running the fixes. Your original text is still above — please try again.");
    } finally {
      setRunning(false);
    }
  };

  const copyFinal = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.finalText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = result.finalText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.finalText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Assignment-Helper-Fixed-Text.txt";
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
            children: result.finalText.split("\n").map(
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
      a.download = "Assignment-Helper-Fixed-Text.docx";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const canRun = text.trim().length >= MIN_CHARS && !running;
  const runningStep = steps.findIndex((s) => s.status === "running");

  return (
    <ToolShell
      icon={<Wand2 className="h-4 w-4" />}
      badge="All-in-One Fix"
      title="Paste once. Fix everything."
      description="One click runs the whole pipeline: grammar check, AI check, paraphrase, humanize, auto grammar fix and a similarity check — and hands you the final text, ready to submit."
    >
      {/* ---------- Input card ---------- */}
      <div className="card p-5 sm:p-6">
        {/* PDF / TXT upload */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-all duration-200 ${
            dragActive
              ? "border-brand-500 bg-brand-50/60"
              : "border-slate-200 bg-slate-50/60 hover:border-brand-300 hover:bg-brand-50/40"
          }`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-500/25">
            <FileUp className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-semibold text-slate-900">
            Drop your PDF here, or{" "}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
            >
              choose a file
            </button>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            PDF or .txt, up to {MAX_FILE_MB} MB. The text is extracted in your browser —
            your file never leaves your device.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          {extracting && (
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-700">
              <Loader2 className="h-4 w-4 animate-spin" />
              Reading your file…
            </p>
          )}
          {fileName && !extracting && (
            <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              <FileText className="h-3.5 w-3.5 text-brand-600" />
              {fileName}
              {pageCount ? <span className="text-slate-400">· {pageCount} page{pageCount === 1 ? "" : "s"}</span> : null}
            </p>
          )}
        </div>
        {fileNote && (
          <p className="mt-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-800">
            {fileNote}
          </p>
        )}

        <label htmlFor="all-in-one-input" className="mt-6 block text-sm font-semibold text-slate-900">
          Your text
        </label>
        <textarea
          id="all-in-one-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value.slice(0, MAX_CHARS));
            setResult(null);
          }}
          rows={10}
          placeholder="Paste your assignment, essay or SOP draft here — or upload a PDF above and it will appear here…"
          className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <WordStats text={text} />
          <span className="text-xs font-medium text-slate-400">
            {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={run} disabled={!canRun} loading={running}>
            <Sparkles className="h-4 w-4" />
            {running ? "Fixing everything…" : "Fix Everything"}
          </PrimaryButton>
          <button
            onClick={() => {
              setText(EXAMPLE_TEXT);
              setResult(null);
              setError("");
              setFileName("");
              setPageCount(null);
              setFileNote("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            Try an example
          </button>
          {text.trim().length > 0 && text.trim().length < MIN_CHARS && (
            <span className="text-xs font-medium text-amber-700">
              Paste at least {MIN_CHARS} characters to run the full pipeline.
            </span>
          )}
        </div>
      </div>

      {/* ---------- Progress checklist ---------- */}
      {(running || steps.some((s) => s.status !== "idle")) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="card mt-5 p-5 sm:p-6"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            {running
              ? `Working… step ${runningStep + 1} of ${STEP_DEFS.length}`
              : "All steps finished"}
          </h2>
          <ul className="mt-4 space-y-3">
            {STEP_DEFS.map((step, i) => {
              const state = steps[i];
              return (
                <li key={step.title} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">
                    {state.status === "running" && (
                      <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
                    )}
                    {state.status === "done" && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                    {state.status === "failed" && (
                      <XCircle className="h-5 w-5 text-rose-500" />
                    )}
                    {state.status === "idle" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200">
                        {i + 1}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-semibold ${
                        state.status === "failed" ? "text-rose-700" : "text-slate-900"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="block text-xs leading-relaxed text-slate-500">
                      {state.note || step.hint}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      {running && <LoadingSkeleton lines={5} />}
      {error && <ErrorBanner message={error} />}

      {/* ---------- Results ---------- */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="all-in-one-result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResultCard
              title="Your fixed text — ready to use"
              text={result.finalText}
              words={wordCount(result.finalText)}
              accent="emerald"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={copyFinal}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-700 active:scale-95"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy final text"}
              </button>
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

            {/* Step result cards */}
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {/* AI before vs after */}
              <div className="card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <ScanSearch className="h-4 w-4 text-emerald-600" />
                  AI score — before vs after
                </p>
                {result.aiBefore && result.aiAfter ? (
                  <>
                    <div className="mt-4 flex items-end justify-center gap-3 text-center">
                      <div>
                        <p className="text-3xl font-bold text-slate-400">{result.aiBefore.score}%</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">Before</p>
                        <p className="text-xs text-slate-400">{result.aiBefore.verdict}</p>
                      </div>
                      <span className="pb-6 text-xl font-bold text-slate-300">→</span>
                      <div>
                        <p className="text-3xl font-bold text-emerald-600">{result.aiAfter.score}%</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">After</p>
                        <p className="text-xs text-slate-400">{result.aiAfter.verdict}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                      {result.aiAfter.score < result.aiBefore.score
                        ? `Down ${result.aiBefore.score - result.aiAfter.score} points — the final text reads more human.`
                        : result.aiAfter.score === result.aiBefore.score
                          ? "Same score — the wording changed, but the AI patterns stayed similar."
                          : `Up ${result.aiAfter.score - result.aiBefore.score} points — the rewrite still shows AI-like patterns, so read it once and add your own voice.`}
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    The AI check could not run on{" "}
                    {result.aiBefore ? "the final text" : "your original text"} — that step
                    was skipped, the rest of the fixes still ran.
                  </p>
                )}
                <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                  Estimate only — heuristics, not a guarantee.
                </p>
              </div>

              {/* Similarity */}
              <div className="card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Scale className="h-4 w-4 text-rose-500" />
                  Similarity — final vs original
                </p>
                {result.similarity ? (
                  <>
                    <p className="mt-4 text-center text-3xl font-bold text-slate-900">
                      {result.similarity.similarity}%
                    </p>
                    <p className="mt-2 text-center text-xs leading-relaxed text-slate-500">
                      {result.similarity.similarity >= 70
                        ? "Very close to your original — the meaning is fully kept, with light rewording."
                        : result.similarity.similarity >= 40
                          ? "Well reworded — clearly different wording, same meaning."
                          : "Very different wording — read it once to make sure every fact is still right."}
                    </p>
                    {result.similarity.overlapWords.length > 0 && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-400">
                        Words that stayed the same:{" "}
                        {result.similarity.overlapWords.slice(0, 12).join(", ")}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    The similarity check could not run — that step was skipped, the rest of
                    the fixes still ran.
                  </p>
                )}
              </div>

              {/* Grammar fixes */}
              <div className="card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Wrench className="h-4 w-4 text-blue-500" />
                  Grammar fixes applied
                </p>
                <p className="mt-4 text-center text-3xl font-bold text-slate-900">
                  {result.fixes.length}
                </p>
                <p className="mt-2 text-center text-xs leading-relaxed text-slate-500">
                  {result.fixes.length === 0
                    ? "No grammar fixes were needed on the final text."
                    : `fix${result.fixes.length === 1 ? "" : "es"} applied automatically to your final text.`}
                </p>
                {result.grammarBeforeCount > 0 && (
                  <p className="mt-2 text-center text-xs text-slate-400">
                    Your original had {result.grammarBeforeCount} issue
                    {result.grammarBeforeCount === 1 ? "" : "s"} before the rewrite.
                  </p>
                )}
              </div>
            </div>

            {/* Grammar fix list */}
            {result.fixes.length > 0 && (
              <div className="card mt-5 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  What was fixed ({result.fixes.length})
                </h3>
                <ul className="mt-4 space-y-3">
                  {result.fixes.map((f, i) => (
                    <li key={`${f.problem}-${i}`} className="text-sm leading-relaxed text-slate-600">
                      <span className="font-semibold text-slate-900">{f.message}:</span>{" "}
                      <span className="rounded bg-rose-50 px-1.5 py-0.5 font-medium text-rose-700 ring-1 ring-rose-200">
                        {f.problem}
                      </span>
                      {"  →  "}
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700 ring-1 ring-emerald-200">
                        {f.fix}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Collapsible intermediate versions */}
            {result.paraphrased && (
              <details className="card group mt-5 px-5 py-4 transition-all duration-200 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-slate-900">
                  Paraphrased version
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-600">
                  {result.paraphrased}
                </p>
              </details>
            )}
            {result.humanized && (
              <details className="card group mt-3 px-5 py-4 transition-all duration-200 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-slate-900">
                  Humanized version
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-600">
                  {result.humanized}
                </p>
              </details>
            )}

            <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
              Read the final text once in your own voice before submitting — and follow
              your school&apos;s rules about AI use.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolShell>
  );
}
