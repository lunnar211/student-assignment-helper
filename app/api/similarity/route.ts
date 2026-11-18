import { NextResponse } from "next/server";
import { similarity } from "@/lib/text";

export const maxDuration = 30;

export async function POST(req: Request) {
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
  if (textA.length > 5000 || textB.length > 5000) {
    return NextResponse.json(
      { error: "Each text must be at most 5000 characters long." },
      { status: 400 },
    );
  }

  return NextResponse.json(similarity(textA, textB));
}
