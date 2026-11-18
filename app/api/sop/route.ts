import { NextResponse } from "next/server";
import { generateText } from "@/lib/ai";
import { wordCount } from "@/lib/text";

export const maxDuration = 30;

const MAX_LEN = 2000;

function buildTemplateDraft(fields: {
  fullName: string;
  program: string;
  university: string;
  background: string;
  goals: string;
  achievements: string;
  extra: string;
}): string {
  const sections: string[] = [];

  sections.push(
    `My name is ${fields.fullName}, and I am applying for the ${fields.program} programme at ${fields.university}.`,
  );

  sections.push(
    `Introduction and motivation\n\n${fields.background}`,
  );

  if (fields.achievements.trim()) {
    sections.push(
      `Academic background and experience\n\n${fields.achievements}`,
    );
  }

  sections.push(
    `Why this programme at ${fields.university}\n\nI chose the ${fields.program} programme at ${fields.university} because it matches what I want to study and where I want to grow.`,
  );

  sections.push(
    `Career goals\n\n${fields.goals}`,
  );

  if (fields.extra.trim()) {
    sections.push(`Additional information\n\n${fields.extra}`);
  }

  sections.push(
    `Thank you for considering my application. I would be grateful for the chance to study ${fields.program} at ${fields.university} and to contribute what I have learned so far.`,
  );

  return sections.join("\n\n");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    fullName,
    program,
    university,
    background,
    goals,
    achievements = "",
    extra = "",
  } = body as {
    fullName?: unknown;
    program?: unknown;
    university?: unknown;
    background?: unknown;
    goals?: unknown;
    achievements?: unknown;
    extra?: unknown;
  };

  const required: [string, unknown][] = [
    ["fullName", fullName],
    ["program", program],
    ["university", university],
    ["background", background],
    ["goals", goals],
  ];
  for (const [name, value] of required) {
    if (typeof value !== "string" || value.trim().length === 0) {
      return NextResponse.json(
        { error: `${name} is required and must not be empty.` },
        { status: 400 },
      );
    }
  }
  const all: [string, unknown][] = [
    ...required,
    ["achievements", achievements],
    ["extra", extra],
  ];
  for (const [name, value] of all) {
    if (typeof value !== "string") {
      return NextResponse.json(
        { error: `${name} must be a string.` },
        { status: 400 },
      );
    }
    if (value.length > MAX_LEN) {
      return NextResponse.json(
        { error: `${name} must be at most ${MAX_LEN} characters long.` },
        { status: 400 },
      );
    }
  }

  const fields = {
    fullName: fullName as string,
    program: program as string,
    university: university as string,
    background: background as string,
    goals: goals as string,
    achievements: achievements as string,
    extra: extra as string,
  };

  const prompt =
    `Write a complete Statement of Purpose (550–750 words) in the first person for the following applicant, using only the details given. Structure it with: introduction and motivation, academic background, relevant experience and achievements, why this programme at this university, career goals, and a closing paragraph.\n\n` +
    `Full name: ${fields.fullName}\n` +
    `Programme: ${fields.program}\n` +
    `University: ${fields.university}\n` +
    `Background: ${fields.background}\n` +
    `Goals: ${fields.goals}\n` +
    `Achievements: ${fields.achievements || "None provided"}\n` +
    `Extra information: ${fields.extra || "None provided"}`;

  const { text, provider } = await generateText(prompt);

  let result = text;
  if (provider === "fallback") {
    result = buildTemplateDraft(fields);
  }

  return NextResponse.json({ result, provider, words: wordCount(result) });
}
