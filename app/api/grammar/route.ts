import { NextResponse } from "next/server";
import { rateLimit, AI_RATE_LIMIT } from "@/lib/rate-limit";
import { sentences } from "@/lib/text";

export const maxDuration = 60;

export const MAX_GRAMMAR_CHARS = 30000;
// One LanguageTool call per chunk; the free API is happiest with short texts.
const LT_CHUNK_CHARS = 4500;
const LT_TIMEOUT_MS = 15000;
const LT_GAP_MS = 250;

const UNAVAILABLE_ERROR =
  "The free grammar service is temporarily unreachable. Please try again in a moment — your text is shown unchanged above.";

interface LanguageToolMatch {
  message?: string;
  shortMessage?: string;
  offset?: number;
  length?: number;
  replacements?: { value?: string }[];
  rule?: { id?: string; description?: string };
}

interface GrammarMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: string[];
  ruleId: string;
  ruleDescription: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Split text into pieces of at most `maxChars`, remembering the separator
 * that followed each piece in the original, so offsets stay in original
 * coordinates and the corrected text keeps the original formatting.
 */
function splitWithSeparators(
  text: string,
  maxChars: number,
): { text: string; sep: string }[] {
  const parts = text.split(/(\n\s*\n)/); // separators kept as elements
  const pieces: { text: string; sep: string }[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const para = parts[i];
    const sep = parts[i + 1] ?? "";
    if (!para) continue;
    if (para.length <= maxChars) {
      pieces.push({ text: para, sep });
      continue;
    }
    // Long paragraph: split into sentences, one space between them.
    let cur = "";
    for (const s of sentences(para)) {
      if (cur && cur.length + 1 + s.length > maxChars) {
        pieces.push({ text: cur, sep: " " });
        cur = "";
      }
      cur = cur ? `${cur} ${s}` : s;
    }
    if (cur) pieces.push({ text: cur, sep });
  }
  return pieces.length ? pieces : [{ text, sep: "" }];
}

async function checkChunk(chunk: string, language: string): Promise<GrammarMatch[] | null> {
  try {
    const params = new URLSearchParams({ text: chunk, language });
    const res = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(LT_TIMEOUT_MS),
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { matches?: LanguageToolMatch[] };
    return (data.matches ?? []).map((m) => ({
      message: m.message ?? "",
      shortMessage: m.shortMessage ?? "",
      offset: m.offset ?? 0,
      length: m.length ?? 0,
      replacements: (m.replacements ?? [])
        .slice(0, 3)
        .map((r) => r.value ?? "")
        .filter(Boolean),
      ruleId: m.rule?.id ?? "",
      ruleDescription: m.rule?.description ?? "",
    }));
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const limited = rateLimit(req, AI_RATE_LIMIT.limit, AI_RATE_LIMIT.windowMs);
  if (limited) return limited;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { text, language = "en-US" } = body as { text?: unknown; language?: unknown };

  if (typeof text !== "string" || text.length < 1) {
    return NextResponse.json(
      { error: "Text is required and must be at least 1 character long." },
      { status: 400 },
    );
  }
  if (text.length > MAX_GRAMMAR_CHARS) {
    return NextResponse.json(
      { error: `Text must be at most ${MAX_GRAMMAR_CHARS.toLocaleString()} characters long.` },
      { status: 400 },
    );
  }
  if (typeof language !== "string" || language.trim().length === 0) {
    return NextResponse.json(
      { error: "language must be a non-empty string." },
      { status: 400 },
    );
  }

  // Long texts are checked chunk by chunk so no chunk ever hits the free
  // API's size or rate limits. Matches are merged in ORIGINAL coordinates
  // and applied to the original text, so formatting is preserved exactly.
  const pieces = splitWithSeparators(text, LT_CHUNK_CHARS);
  const allMatches: GrammarMatch[] = [];
  let succeeded = 0;
  let origOffset = 0;

  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    const matches = await checkChunk(piece.text, language);
    if (matches) {
      succeeded += 1;
      for (const m of matches) {
        allMatches.push({ ...m, offset: m.offset + origOffset });
      }
    }
    origOffset += piece.text.length + piece.sep.length;
    if (i < pieces.length - 1) await sleep(LT_GAP_MS);
  }

  if (succeeded === 0) {
    return NextResponse.json({
      matches: [],
      corrected: text,
      provider: "unavailable",
      error: UNAVAILABLE_ERROR,
    });
  }

  // Apply every match's first replacement from the end backwards so the
  // earlier offsets stay valid.
  let corrected = text;
  const sorted = [...allMatches].sort((a, b) => b.offset - a.offset);
  for (const m of sorted) {
    const replacement = m.replacements[0];
    if (!replacement) continue;
    if (m.offset < 0 || m.offset + m.length > corrected.length) continue;
    corrected =
      corrected.slice(0, m.offset) + replacement + corrected.slice(m.offset + m.length);
  }

  return NextResponse.json({
    matches: allMatches,
    corrected,
    provider: "languagetool",
  });
}
