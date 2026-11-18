import { NextResponse } from "next/server";
import { generateText } from "@/lib/ai";
import { wordCount } from "@/lib/text";

export const maxDuration = 30;

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
  if (text.length > 5000) {
    return NextResponse.json(
      { error: "Text must be at most 5000 characters long." },
      { status: 400 },
    );
  }

  const prompt =
    `Rewrite the following text so it sounds like a real person wrote it: natural, slightly imperfect rhythm, varied sentence lengths, contractions, plain words, and no stock AI phrases (do not use "moreover", "furthermore", "delve", "in conclusion", or "it is important to note"). Keep the same meaning and facts. Output only the rewritten text.\n\n${text}`;

  const { text: result, provider } = await generateText(prompt);

  return NextResponse.json({ result, provider, words: wordCount(result) });
}
