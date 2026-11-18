import { NextResponse } from "next/server";
import { rateLimit, AI_RATE_LIMIT } from "@/lib/rate-limit";
import { generateTextChunked } from "@/lib/ai";
import { wordCount } from "@/lib/text";

export const maxDuration = 60;

export const MAX_PARAPHRASE_CHARS = 30000;

type Tone = "standard" | "formal" | "simple" | "academic";

const TONE_GUIDANCE: Record<Tone, string> = {
  standard: "clear natural English",
  formal: "formal academic English",
  simple: "plain easy English a school student understands",
  academic: "a scholarly tone with precise vocabulary",
};

export async function POST(req: Request) {
  const limited = rateLimit(req, AI_RATE_LIMIT.limit, AI_RATE_LIMIT.windowMs);
  if (limited) return limited;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { text, tone = "standard" } = body as { text?: unknown; tone?: unknown };

  if (typeof text !== "string" || text.trim().length < 10) {
    return NextResponse.json(
      { error: "Text is required and must be at least 10 characters long." },
      { status: 400 },
    );
  }
  if (text.length > MAX_PARAPHRASE_CHARS) {
    return NextResponse.json(
      { error: `Text must be at most ${MAX_PARAPHRASE_CHARS.toLocaleString()} characters long.` },
      { status: 400 },
    );
  }
  if (tone !== "standard" && tone !== "formal" && tone !== "simple" && tone !== "academic") {
    return NextResponse.json(
      { error: 'Tone must be one of "standard", "formal", "simple", or "academic".' },
      { status: 400 },
    );
  }

  const { text: result, provider, failedChunks, chunkCount } = await generateTextChunked(
    (chunk) =>
      `Rewrite the following text in ${TONE_GUIDANCE[tone as Tone]}. Rebuild each sentence with different words and a different structure — do not keep sentences as they are. Keep the same meaning, facts and approximately the same length. Do not shorten or summarize it. Output only the rewritten text.\n\n${chunk}`,
    text,
    { maxTokens: 3000, concurrency: 2 },
  );

  return NextResponse.json({ result, provider, words: wordCount(result), failedChunks, chunkCount });
}
