import { NextResponse } from "next/server";
import { rateLimit, AI_RATE_LIMIT } from "@/lib/rate-limit";
import { generateText, processChunks } from "@/lib/ai";
import { detectAI, scrubCliches, splitIntoChunks, wordCount } from "@/lib/text";

export const maxDuration = 60;

export const MAX_HUMANIZE_CHARS = 30000;

const HUMANIZE_PROMPT_V1 = `Rebuild every sentence from scratch. Do NOT keep any sentence the same — change the words AND the sentence structure of each one. Break long sentences into two short ones. Start sentences in different ways. Mix very short sentences (3-7 words) with longer ones. Use contractions (don't, can't, it's). Use simple everyday words. Write like a student telling a friend. Keep every fact, number, name and date the same, and keep all the points — do not cut anything out. Never use: moreover, furthermore, additionally, in conclusion, delve, crucial, pivotal, leverage, utilize, in essence, it is important to note. Give only the rewritten text.

Text:
`;

const HUMANIZE_PROMPT_V2 = `Rewrite this text again, even more casual — like you're explaining it to a friend over tea. Rebuild every sentence with different words and a different structure. Throw in a short fragment for emphasis. Use contractions. Keep all facts the same and don't cut anything out. Never use moreover, furthermore, delve, in conclusion, crucial. Give only the rewritten text.

Text:
`;

const HUMANIZE_PROMPT_V3 = `Rewrite this in the simplest plain English. Very short sentences mixed with medium ones. Rebuild every sentence with different, everyday words. Keep all facts the same and don't cut anything out. Give only the rewritten text.

Text:
`;

const FALLBACK_TEXT =
  "AI is temporarily unavailable right now. Please try again in a minute — your text was not changed.";

export async function POST(req: Request) {
  const limited = rateLimit(req, AI_RATE_LIMIT.limit, AI_RATE_LIMIT.windowMs);
  if (limited) return limited;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { text } = body as { text?: unknown };

  if (typeof text !== "string" || text.trim().length < 10) {
    return NextResponse.json(
      { error: "Text is required and must be at least 10 characters long." },
      { status: 400 },
    );
  }
  if (text.length > MAX_HUMANIZE_CHARS) {
    return NextResponse.json(
      { error: `Text must be at most ${MAX_HUMANIZE_CHARS.toLocaleString()} characters long.` },
      { status: 400 },
    );
  }

  const input = text.trim();

  // Pass 1: humanize every chunk.
  const chunks = splitIntoChunks(input, 700);
  const pass1 = await processChunks(chunks, (chunk) => `${HUMANIZE_PROMPT_V1}${chunk}`, {
    maxTokens: 3000,
    temperature: 0.85,
    concurrency: 2,
  });

  if (pass1.every((r) => !r.ok)) {
    return NextResponse.json({
      result: FALLBACK_TEXT,
      provider: "fallback",
      words: wordCount(FALLBACK_TEXT),
      aiScore: null,
      passes: 0,
    });
  }

  const provider = pass1.some((r) => r.provider === "groq") ? "groq" : "pollinations";
  let bestText = scrubCliches(pass1.map((r) => r.output).join("\n\n"));
  let bestScore = detectAI(bestText).score;
  let passes = 1;

  // Multi-pass: while the score is still 30+ (our "Mixed" band), re-humanize
  // ONLY the chunks that still read AI-like, with a different variation prompt.
  // Keep the best (lowest-score) version seen.
  while (bestScore >= 30 && passes < 3) {
    const prompt = passes === 1 ? HUMANIZE_PROMPT_V2 : HUMANIZE_PROMPT_V3;
    const parts = splitIntoChunks(bestText, 700);
    const scored = parts.map((part) => ({
      part,
      score: detectAI(part).score,
    }));
    const targets = scored.filter((s) => s.score >= 30 && wordCount(s.part) >= 40);
    if (targets.length === 0) break;

    const rerun = await processChunks(
      targets.map((t) => t.part),
      (chunk) => `${prompt}${chunk}`,
      { maxTokens: 3000, temperature: 0.9, concurrency: 2 },
    );
    const replacement = new Map<string, string>();
    targets.forEach((t, i) => {
      replacement.set(t.part, rerun[i].ok ? rerun[i].output : t.part);
    });
    const nextText = scrubCliches(parts.map((p) => replacement.get(p) ?? p).join("\n\n"));
    const nextScore = detectAI(nextText).score;
    passes += 1;
    if (nextScore < bestScore) {
      bestText = nextText;
      bestScore = nextScore;
    } else {
      break; // No improvement — keep the best version so far.
    }
  }

  return NextResponse.json({
    result: bestText,
    provider,
    words: wordCount(bestText),
    aiScore: bestScore,
    passes,
    bestScore,
  });
}
