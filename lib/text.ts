export function wordCount(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return text.trim() === "" ? 0 : words.length;
}

export function charCount(text: string): number {
  return text.length;
}

export function sentenceCount(text: string): number {
  const s = text.split(/[.!?]+/).map((x) => x.trim()).filter(Boolean);
  return s.length;
}

export function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  const groups = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").match(/[aeiouy]{1,2}/g);
  const n = groups ? groups.length : 1;
  return Math.max(1, n);
}

export function fleschReadingEase(text: string): number {
  const words = wordCount(text);
  const sents = Math.max(1, sentenceCount(text));
  if (words === 0) return 0;
  const syllables = text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((acc, w) => acc + countSyllables(w), 0);
  const score = 206.835 - 1.015 * (words / sents) - 84.6 * (syllables / words);
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

export function fleschKincaidGrade(text: string): number {
  const words = wordCount(text);
  const sents = Math.max(1, sentenceCount(text));
  if (words === 0) return 0;
  const syllables = text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((acc, w) => acc + countSyllables(w), 0);
  const grade = 0.39 * (words / sents) + 11.8 * (syllables / words) - 15.59;
  return Math.max(0, Math.round(grade * 10) / 10);
}

export function readabilityLabel(ease: number): { label: string; color: string } {
  if (ease >= 90) return { label: "Very easy — a 5th grader can read it", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  if (ease >= 80) return { label: "Easy — plain everyday English", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  if (ease >= 70) return { label: "Fairly easy — most adults read it fine", color: "text-teal-600 bg-teal-50 border-teal-200" };
  if (ease >= 60) return { label: "Standard — typical school writing", color: "text-sky-600 bg-sky-50 border-sky-200" };
  if (ease >= 50) return { label: "Fairly difficult — needs some focus", color: "text-amber-600 bg-amber-50 border-amber-200" };
  if (ease >= 30) return { label: "Difficult — university level", color: "text-orange-600 bg-orange-50 border-orange-200" };
  return { label: "Very difficult — academic / technical", color: "text-rose-600 bg-rose-50 border-rose-200" };
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

/* ---------------- AI detection (heuristic estimate — never a guarantee) ---------------- */

const AI_PHRASES = [
  "moreover", "furthermore", "additionally", "in conclusion", "in summary",
  "it is important to note", "it is worth noting", "in today's fast-paced world",
  "in today's world", "delve", "delve into", "crucial", "pivotal", "landscape",
  "tapestry", "vibrant", "underscore", "leverage", "utilize", "significantly",
  "overall", "in essence", "a testament to", "plays a crucial role",
  "it is essential to", "one cannot overlook", "in the realm of",
  "shed light on", "navigate the complexities", "embark on",
  "a wide range of", "in recent years", "has become increasingly",
  "when it comes to", "at the end of the day", "firstly", "secondly", "lastly",
];

export interface DetectResult {
  score: number;
  verdict: string;
  reasons: string[];
  stats: {
    words: number;
    sentences: number;
    avgSentenceLength: number;
    sentenceLengthStdDev: number;
    repeatedTrigrams: number;
    aiPhraseHits: string[];
  };
}

export function detectAI(text: string): DetectResult {
  const words = tokenize(text);
  const sents = sentences(text);
  const wordList = text.split(/\s+/).filter(Boolean);
  const reasons: string[] = [];

  const sentLengths = sents.map((s) => tokenize(s).length).filter((n) => n > 0);
  const avgLen = sentLengths.length
    ? sentLengths.reduce((a, b) => a + b, 0) / sentLengths.length
    : 0;
  const variance = sentLengths.length
    ? sentLengths.reduce((a, b) => a + (b - avgLen) ** 2, 0) / sentLengths.length
    : 0;
  const stdDev = Math.sqrt(variance);
  const burstiness = avgLen > 0 ? stdDev / avgLen : 0;

  // Repeated 3-word phrases (humans rarely repeat long phrases)
  const trigrams = new Map<string, number>();
  for (let i = 0; i + 2 < words.length; i++) {
    const tri = words.slice(i, i + 3).join(" ");
    trigrams.set(tri, (trigrams.get(tri) || 0) + 1);
  }
  let repeatedTrigrams = 0;
  for (const c of trigrams.values()) if (c > 1) repeatedTrigrams += c - 1;

  const lower = text.toLowerCase();
  const aiPhraseHits = AI_PHRASES.filter((p) => lower.includes(p));

  let score = 12; // base: short / mixed text starts low

  // 1. Uniform sentence length (low burstiness) — classic AI tell. Up to +34.
  if (sents.length >= 3) {
    if (burstiness < 0.25) { score += 34; reasons.push("Your sentences are almost all the same length. Human writing mixes short and long sentences much more."); }
    else if (burstiness < 0.4) { score += 20; reasons.push("Sentence lengths are quite uniform — human writing usually varies more."); }
    else if (burstiness < 0.55) { score += 8; reasons.push("Sentence length varies a little, which looks more human."); }
    else { reasons.push("Sentence lengths vary a lot — that is a strong human-like pattern."); }
  }

  // 2. Long, even sentences. Up to +12.
  if (avgLen > 28) { score += 12; reasons.push(`Average sentence is ${avgLen.toFixed(0)} words long — AI text tends to run long and even.`); }
  else if (avgLen > 22) { score += 6; reasons.push(`Average sentence is ${avgLen.toFixed(0)} words — slightly long and even.`); }

  // 3. Repeated phrases. Up to +20.
  if (repeatedTrigrams >= 4) { score += 20; reasons.push(`Found ${repeatedTrigrams} repeated 3-word phrases — AI text often reuses the same phrasing.`); }
  else if (repeatedTrigrams >= 2) { score += 10; reasons.push(`Found ${repeatedTrigrams} repeated 3-word phrases.`); }
  else if (words.length > 60) { reasons.push("No repeated phrases found — good, that looks human."); }

  // 4. Stock AI phrases. Up to +24.
  if (aiPhraseHits.length >= 4) { score += 24; reasons.push(`Found ${aiPhraseHits.length} phrases AI tools use a lot: “${aiPhraseHits.slice(0, 4).join("”, “")}”.`); }
  else if (aiPhraseHits.length >= 2) { score += 14; reasons.push(`Found ${aiPhraseHits.length} common AI phrases: “${aiPhraseHits.join("”, “")}”.`); }
  else if (aiPhraseHits.length === 1) { score += 6; reasons.push(`Found one common AI phrase: “${aiPhraseHits[0]}”.`); }
  else if (words.length > 60) { reasons.push("No stock AI phrases found — good."); }

  // 5. Very short text cannot be judged well.
  if (words.length < 60) {
    reasons.unshift("This text is short — short samples are hard to judge, so treat this score with extra care.");
  }

  score = Math.max(1, Math.min(98, Math.round(score)));
  const verdict =
    score < 30 ? "Likely human-written"
    : score < 55 ? "Mixed — some AI-like patterns"
    : score < 75 ? "Likely AI-written"
    : "Very likely AI-written";

  return {
    score,
    verdict,
    reasons,
    stats: {
      words: wordList.length,
      sentences: sents.length,
      avgSentenceLength: Math.round(avgLen * 10) / 10,
      sentenceLengthStdDev: Math.round(stdDev * 10) / 10,
      repeatedTrigrams,
      aiPhraseHits,
    },
  };
}

/* ---------------- Similarity ---------------- */

export interface SimilarityResult {
  similarity: number;
  overlapWords: string[];
  stats: { wordsA: number; wordsB: number; commonWords: number; uniqueA: number; uniqueB: number };
}

export function similarity(a: string, b: string): SimilarityResult {
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  const common = [...setA].filter((w) => setB.has(w));

  // Dice coefficient on unique words
  const sim = setA.size + setB.size === 0
    ? 0
    : (2 * common.length) / (setA.size + setB.size) * 100;

  // Rank overlapping words by how often they appear in both texts
  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();
  for (const w of tokensA) freqA.set(w, (freqA.get(w) || 0) + 1);
  for (const w of tokensB) freqB.set(w, (freqB.get(w) || 0) + 1);
  const overlapWords = common
    .map((w) => ({ w, n: Math.min(freqA.get(w) || 0, freqB.get(w) || 0) }))
    .sort((x, y) => y.n - x.n || x.w.localeCompare(y.w))
    .slice(0, 30)
    .map((x) => x.w);

  return {
    similarity: Math.round(sim * 10) / 10,
    overlapWords,
    stats: {
      wordsA: tokensA.length,
      wordsB: tokensB.length,
      commonWords: common.length,
      uniqueA: setA.size,
      uniqueB: setB.size,
    },
  };
}

/* ---------------- Chunking (long texts) ---------------- */

/** Split text into chunks of at most `maxWords` words, on paragraph/sentence boundaries. */
export function splitIntoChunks(text: string, maxWords = 700): string[] {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) return [text];
  const chunks: string[] = [];
  let current = "";
  let currentWords = 0;

  const pushCurrent = () => {
    if (current.trim()) chunks.push(current.trim());
    current = "";
    currentWords = 0;
  };

  for (const para of paragraphs) {
    const paraWords = wordCount(para);
    if (currentWords + paraWords <= maxWords) {
      current = current ? `${current}\n\n${para}` : para;
      currentWords += paraWords;
      continue;
    }
    if (paraWords > maxWords) {
      pushCurrent();
      let sentBuf = "";
      let sentWords = 0;
      for (const s of sentences(para)) {
        const w = wordCount(s);
        if (sentWords + w > maxWords && sentBuf) {
          chunks.push(sentBuf.trim());
          sentBuf = "";
          sentWords = 0;
        }
        sentBuf = sentBuf ? `${sentBuf} ${s}` : s;
        sentWords += w;
      }
      if (sentBuf.trim()) chunks.push(sentBuf.trim());
      continue;
    }
    pushCurrent();
    current = para;
    currentWords = paraWords;
  }
  pushCurrent();
  return chunks.length ? chunks : [text];
}

/** Split text into chunks of at most `maxChars` characters, on sentence boundaries. */
export function splitIntoCharChunks(text: string, maxChars = 4500): string[] {
  const sents = sentences(text);
  if (sents.length === 0) return [text];
  const chunks: string[] = [];
  let cur = "";
  for (const s of sents) {
    if (cur && cur.length + s.length + 1 > maxChars) {
      chunks.push(cur);
      cur = "";
    }
    cur = cur ? `${cur} ${s}` : s;
  }
  if (cur) chunks.push(cur);
  return chunks.length ? chunks : [text];
}

/* ---------------- AI-cliché scrub (deterministic) ---------------- */

const CLICHE_REPLACEMENTS: [RegExp, string][] = [
  [/\bin today's fast-paced world\b/gi, "these days"],
  [/\bin today'?s world\b/gi, "these days"],
  [/\bit is important to note that\b/gi, ""],
  [/\bit is important to note\b/gi, ""],
  [/\bit is worth noting that\b/gi, ""],
  [/\bit is worth noting\b/gi, ""],
  [/\bin conclusion\b/gi, ""],
  [/\bin summary\b/gi, ""],
  [/\bmoreover\b/gi, "Also"],
  [/\bfurthermore\b/gi, "Also"],
  [/\badditionally\b/gi, "Also"],
  [/\bdelve into\b/gi, "look at"],
  [/\bdelve\b/gi, "look at"],
  [/\butilize\b/gi, "use"],
  [/\butilised\b/gi, "used"],
  [/\butilized\b/gi, "used"],
  [/\bleverage\b/gi, "use"],
  [/\bin essence\b/gi, ""],
  [/\ba testament to\b/gi, "proof of"],
  [/\bplays a crucial role\b/gi, "matters a lot"],
  [/\bplay a crucial role\b/gi, "matter a lot"],
  [/\bit is essential to\b/gi, "you need to"],
  [/\bshed light on\b/gi, "explain"],
  [/\bembark on\b/gi, "start"],
  [/\bnavigate the complexities of\b/gi, "deal with"],
  [/\bin the realm of\b/gi, "in"],
];

/** Deterministically strip stock AI phrases. Never changes facts — only wording. */
export function scrubCliches(text: string): string {
  let out = text;
  for (const [re, rep] of CLICHE_REPLACEMENTS) out = out.replace(re, rep);
  // Clean up commas left behind by removed phrases ("In conclusion, X" -> "X").
  out = out.replace(/(^|[.!?]\s+),\s*/g, "$1");
  out = out.replace(/,\s*,/g, ",");
  out = out.replace(/ {2,}/g, " ");
  out = out.replace(/\s+([,.!?;:])/g, "$1");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}
