import { NextResponse } from "next/server";

export const maxDuration = 30;

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

export async function POST(req: Request) {
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
  if (text.length > 5000) {
    return NextResponse.json(
      { error: "Text must be at most 5000 characters long." },
      { status: 400 },
    );
  }
  if (typeof language !== "string" || language.trim().length === 0) {
    return NextResponse.json(
      { error: "language must be a non-empty string." },
      { status: 400 },
    );
  }

  try {
    const params = new URLSearchParams({ text, language });
    const res = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json({
        matches: [],
        corrected: text,
        provider: "unavailable",
        error: UNAVAILABLE_ERROR,
      });
    }

    const data = (await res.json()) as { matches?: LanguageToolMatch[] };

    const matches = (data.matches ?? []).map((m) => ({
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

    // Apply each match's first replacement from the end backwards so offsets stay valid.
    let corrected = text;
    const sorted = [...matches].sort((a, b) => b.offset - a.offset);
    for (const m of sorted) {
      const replacement = m.replacements[0];
      if (!replacement) continue;
      if (m.offset < 0 || m.offset + m.length > corrected.length) continue;
      corrected =
        corrected.slice(0, m.offset) + replacement + corrected.slice(m.offset + m.length);
    }

    return NextResponse.json({ matches, corrected, provider: "languagetool" });
  } catch {
    return NextResponse.json({
      matches: [],
      corrected: text,
      provider: "unavailable",
      error: UNAVAILABLE_ERROR,
    });
  }
}
