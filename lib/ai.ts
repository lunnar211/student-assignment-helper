export type AIProvider = "groq" | "pollinations" | "fallback";

const FALLBACK_TEXT =
  "AI is temporarily unavailable right now. Please try again in a minute — your text was not changed.";

export async function generateText(prompt: string): Promise<{ text: string; provider: AIProvider }> {
  const groqKey = process.env.GROQ_API_KEY;

  if (groqKey) {
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
          temperature: 0.7,
          max_tokens: 2000,
        }),
        signal: AbortSignal.timeout(20000),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) {
          return { text, provider: "groq" };
        }
      }
    } catch {
      // Fall through to Pollinations.
    }
  }

  try {
    const res = await fetch(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
      {
        headers: { Accept: "text/plain" },
        signal: AbortSignal.timeout(25000),
      },
    );

    if (res.ok) {
      const text = (await res.text()).trim();
      if (text) {
        return { text, provider: "pollinations" };
      }
    }
  } catch {
    // Fall through to the fallback message.
  }

  return { text: FALLBACK_TEXT, provider: "fallback" };
}
