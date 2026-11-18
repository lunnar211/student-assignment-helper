import { splitIntoChunks } from "./text";

export type AIProvider = "groq" | "pollinations" | "fallback";

const FALLBACK_TEXT =
  "AI is temporarily unavailable right now. Please try again in a minute — your text was not changed.";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
}

/** Parse a Pollinations reply: either OpenAI-style JSON or plain text. */
function parsePollinationsResponse(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("{")) {
    try {
      const data = JSON.parse(trimmed) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content?.trim();
      if (content) return content;
    } catch {
      // Not JSON — fall through to plain text.
    }
  }
  return trimmed;
}

async function tryGroq(
  prompt: string,
  maxTokens: number,
  temperature: number,
): Promise<string | null> {
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) return null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful writing assistant for students. Follow the user's instruction exactly and output only the requested text, no preamble.",
            },
            { role: "user", content: prompt },
          ],
          temperature,
          max_tokens: maxTokens,
        }),
        signal: AbortSignal.timeout(20000),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) return text;
      }
    } catch {
      // Retry once, then fall through to Pollinations.
    }
    if (attempt === 0) await sleep(1000);
  }
  return null;
}

async function tryPollinations(prompt: string, temperature: number): Promise<string | null> {
  // Pollinations' free (anonymous) tier currently exposes a single model family
  // ("openai-fast", aliases "openai" / "gpt-oss"). We still vary the model
  // parameter and the seed across attempts, because a fresh request path + a
  // new sample is what gets past a transient 429 / timeout.
  const attempts: { model?: string; seed?: number }[] = [
    {},
    { model: "openai-fast", seed: Math.floor(Math.random() * 1_000_000_000) },
    { model: "gpt-oss", seed: Math.floor(Math.random() * 1_000_000_000) },
  ];

  for (let i = 0; i < attempts.length; i++) {
    try {
      const params = new URLSearchParams();
      if (attempts[i].model) params.set("model", attempts[i].model as string);
      if (attempts[i].seed !== undefined) params.set("seed", String(attempts[i].seed));
      // Temperature is not a documented GET parameter; the model default is used.
      void temperature;
      const qs = params.toString();
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}${
        qs ? `?${qs}` : ""
      }`;
      const res = await fetch(url, {
        headers: { Accept: "text/plain" },
        signal: AbortSignal.timeout(25000),
      });

      if (res.ok) {
        const text = parsePollinationsResponse(await res.text());
        if (text) return text;
      }
    } catch {
      // Next attempt.
    }
    if (i < attempts.length - 1) await sleep(i === 0 ? 2000 : 5000);
  }
  return null;
}

/**
 * One AI call with retries across backends.
 * Order: Groq first (when a key is set — far more reliable), then Pollinations
 * (up to 3 attempts with backoff and model/seed variation).
 */
export async function generateText(
  prompt: string,
  opts: GenerateOptions = {},
): Promise<{ text: string; provider: AIProvider }> {
  const maxTokens = opts.maxTokens ?? 3000;
  const temperature = opts.temperature ?? 0.7;

  const groq = await tryGroq(prompt, maxTokens, temperature);
  if (groq) return { text: groq, provider: "groq" };

  const pollinations = await tryPollinations(prompt, temperature);
  if (pollinations) return { text: pollinations, provider: "pollinations" };

  return { text: FALLBACK_TEXT, provider: "fallback" };
}

export interface ChunkResult {
  index: number;
  input: string;
  output: string;
  ok: boolean;
  provider: AIProvider;
}

/**
 * Run one prompt per chunk (up to `concurrency` in parallel). A failed chunk
 * keeps its ORIGINAL text so one flaky call never kills a long document.
 */
export async function processChunks(
  chunks: string[],
  buildPrompt: (chunk: string) => string,
  opts: GenerateOptions & { concurrency?: number } = {},
): Promise<ChunkResult[]> {
  const concurrency = Math.max(1, Math.min(4, opts.concurrency ?? 3));
  const results: ChunkResult[] = new Array(chunks.length);
  let next = 0;

  async function worker() {
    while (next < chunks.length) {
      const index = next++;
      const input = chunks[index];
      const { text, provider } = await generateText(buildPrompt(input), opts);
      const ok = provider !== "fallback";
      results[index] = {
        index,
        input,
        output: ok ? text : input,
        ok,
        provider,
      };
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, chunks.length) }, () => worker()),
  );
  return results;
}

export interface ChunkedResult {
  text: string;
  provider: AIProvider;
  failedChunks: number;
  chunkCount: number;
}

/**
 * Rewrite a long text chunk by chunk (~700 words each) and rejoin in order.
 * When EVERY chunk fails, returns the fallback text with provider "fallback"
 * so the caller can treat the whole call as failed. Partial failures keep
 * the original wording for just those chunks.
 */
export async function generateTextChunked(
  buildPrompt: (chunk: string) => string,
  text: string,
  opts: GenerateOptions & { maxWords?: number; concurrency?: number } = {},
): Promise<ChunkedResult> {
  const chunks = splitIntoChunks(text, opts.maxWords ?? 700);
  const results = await processChunks(chunks, buildPrompt, opts);
  const failedChunks = results.filter((r) => !r.ok).length;
  const provider: AIProvider = results.some((r) => r.provider === "groq")
    ? "groq"
    : "pollinations";

  if (failedChunks === chunks.length) {
    return { text: FALLBACK_TEXT, provider: "fallback", failedChunks, chunkCount: chunks.length };
  }
  return {
    text: results.map((r) => r.output).join("\n\n"),
    provider,
    failedChunks,
    chunkCount: chunks.length,
  };
}
