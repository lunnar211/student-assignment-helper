import { NextResponse } from "next/server";
import { rateLimit, LOCAL_RATE_LIMIT } from "@/lib/rate-limit";
import { detectAI } from "@/lib/text";

export const maxDuration = 30;

export async function POST(req: Request) {
  const limited = rateLimit(req, LOCAL_RATE_LIMIT.limit, LOCAL_RATE_LIMIT.windowMs);
  if (limited) return limited;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { text } = body as { text?: unknown };

  if (typeof text !== "string" || text.trim().length < 30) {
    return NextResponse.json(
      { error: "Text is required and must be at least 30 characters long." },
      { status: 400 },
    );
  }
  if (text.length > 30000) {
    return NextResponse.json(
      { error: "Text must be at most 30,000 characters long." },
      { status: 400 },
    );
  }

  const result = detectAI(text);

  return NextResponse.json({
    ...result,
    note: "Estimate only — heuristics, not a guarantee.",
  });
}
