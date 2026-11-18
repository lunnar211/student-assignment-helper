import { NextResponse } from "next/server";
import { rateLimit, LOCAL_RATE_LIMIT } from "@/lib/rate-limit";
import { similarity } from "@/lib/text";

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

  const { textA, textB } = body as { textA?: unknown; textB?: unknown };

  if (typeof textA !== "string" || textA.trim().length < 10) {
    return NextResponse.json(
      { error: "textA is required and must be at least 10 characters long." },
      { status: 400 },
    );
  }
  if (typeof textB !== "string" || textB.trim().length < 10) {
    return NextResponse.json(
      { error: "textB is required and must be at least 10 characters long." },
      { status: 400 },
    );
  }
  if (textA.length > 30000 || textB.length > 30000) {
    return NextResponse.json(
      { error: "Each text must be at most 30,000 characters long." },
      { status: 400 },
    );
  }

  return NextResponse.json(similarity(textA, textB));
}
