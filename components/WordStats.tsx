"use client";

import { useMemo } from "react";
import { BookOpen, FileText, Type } from "lucide-react";
import { charCount, fleschKincaidGrade, fleschReadingEase, readabilityLabel, sentenceCount, wordCount } from "@/lib/text";

export default function WordStats({ text }: { text: string }) {
  const stats = useMemo(() => {
    const words = wordCount(text);
    const ease = words > 0 ? fleschReadingEase(text) : 0;
    const grade = words > 0 ? fleschKincaidGrade(text) : 0;
    return { words, chars: charCount(text), sentences: sentenceCount(text), ease, grade, label: readabilityLabel(ease) };
  }, [text]);

  const items = [
    { icon: <Type className="h-3.5 w-3.5" />, label: "Words", value: stats.words.toLocaleString() },
    { icon: <FileText className="h-3.5 w-3.5" />, label: "Characters", value: stats.chars.toLocaleString() },
    { icon: <BookOpen className="h-3.5 w-3.5" />, label: "Sentences", value: stats.sentences.toLocaleString() },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <span
          key={it.label}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
        >
          {it.icon}
          {it.label}: <strong className="text-slate-900">{it.value}</strong>
        </span>
      ))}
      {stats.words > 0 && (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${stats.label.color}`}
          title={`Flesch reading ease ${stats.ease} · Grade level ${stats.grade}`}
        >
          Readability: {stats.label.label} (Grade {stats.grade})
        </span>
      )}
    </div>
  );
}
