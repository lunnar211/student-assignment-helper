import { NextResponse } from "next/server";
import { generateText } from "@/lib/ai";
import { wordCount } from "@/lib/text";

export const maxDuration = 30;

type Tone = "standard" | "formal" | "simple" | "academic";

const TONE_GUIDANCE: Record<Tone, string> = {
  standard: "clear natural English",
  formal: "formal academic English",
  simple: "plain easy English a school student understands",
  academic: "a scholarly tone with precise vocabulary",
};

export async function POST(req: Request) {
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
  if (text.length > 5000) {
    return NextResponse.json(
      { error: "Text must be at most 5000 characters long." },
      { status: 400 },
    );
  }
  if (tone !== "standard" && tone !== "formal" && tone !== "simple" && tone !== "academic") {
    return NextResponse.json(
      { error: 'Tone must be one of "standard", "formal", "simple", or "academic".' },
      { status: 400 },
    );
  }

  const prompt =
    `Rewrite the following text in ${TONE_GUIDANCE[tone as Tone]}, keeping the same meaning and approximately the same length. Output only the rewritten text.\n\n${text}`;

  const { text: result, provider } = await generateText(prompt);

  return NextResponse.json({ result, provider, words: wordCount(result) });
}
