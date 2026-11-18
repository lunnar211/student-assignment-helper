import { NextResponse } from "next/server";
import { generateText, processChunks } from "@/lib/ai";
import { detectAI, scrubCliches, splitIntoChunks, wordCount } from "@/lib/text";

export const maxDuration = 60;

export const MAX_HUMANIZE_CHARS = 30000;

const HUMANIZE_PROMPT_V1 = `Rewrite this text so it sounds like a real student wrote it by hand — natural, a bit uneven, and human. Rules you MUST follow:
- Mix very short sentences (3-7 words) with longer ones (15-25 words). Never keep the same sentence length twice in a row.
- Use contractions: don't, can't, it's, that's, we're, you'll.
- Use plain everyday words, not fancy ones.
- NEVER use these words or phrases: moreover, furthermore, additionally, in conclusion, in summary, it is important to note, it is worth noting, delve, crucial, pivotal, landscape, tapestry, leverage, utilize, in essence, a testament to, plays a crucial role, it is essential to, shed light on, embark on, in today's fast-paced world, in the realm of.
- Start some sentences with And, But or So when it sounds natural.
- Keep every fact, number, name and date EXACTLY the same. Do not add new facts. Do not drop any point.
- Do NOT shorten or summarize — keep about the same length as the original.
- Output only the rewritten text, no explanation.

Text to rewrite:
`;

const HUMANIZE_PROMPT_V2 = `Rewrite this text AGAIN, even more casual and human — like you are explaining it to a friend over tea. Break up every long sentence. Throw in a short fragment for emphasis now and then. Use the simplest words you can. Keep the meaning, facts, numbers, names and dates exactly the same, and keep about the same length. Never use: moreover, furthermore, additionally, in conclusion, delve, crucial, pivotal, leverage, utilize, in essence, it is important to note. Output only the rewritten text.

Text to rewrite:
`;

const HUMANIZE_PROMPT_V3 = `Rewrite this text in the simplest plain English a school student would use. Very short sentences mixed with medium ones. Everyday words only — if a word sounds like a textbook, swap it for a simpler one. Keep every fact, number, name and date exactly the same, and keep about the same length. Never use: moreover, furthermore, additionally, in conclusion, delve, crucial, pivotal, leverage, utilize, in essence, it is important to note. Output only the rewritten text.

Text to rewrite:
`;

const FALLBACK_TEXT =
  "AI is temporarily unavailable right now. Please try again in a minute — your text was not changed.";

export async function POST(req: Request) {
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
    concurrency: 3,
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
      { maxTokens: 3000, temperature: 0.9, concurrency: 3 },
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
