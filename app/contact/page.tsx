import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Found a bug, have an idea for a tool, or just want to say thanks? Email the Assignment Helper team directly — there is no form here, your mail app opens with the address filled in.",
};

export default function ContactPage() {
  return (
    <div className="paper-ruled">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 border border-[#1c2b4a] bg-[#fffdf6] px-3.5 py-1.5 font-mono text-xs font-semibold tracking-widest text-[#1c2b4a] uppercase">
            <Mail className="h-4 w-4" />
            Contact us
          </span>
          <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-[#1c2b4a] sm:text-4xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#3c4a68]">
            Found a bug, have an idea for a tool, or just want to say thanks?
            There is no form on this page — email us directly and your message
            goes straight to the team&apos;s inbox.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-10 p-6 text-center sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-[#b42318] uppercase">
              Email us at
            </p>
            <a
              href="mailto:dipeshkarki8292@gmail.com?subject=Assignment%20Helper%20—%20feedback"
              className="mt-3 inline-block font-mono text-lg font-bold text-[#1c2b4a] break-all underline decoration-[#b42318] decoration-2 underline-offset-4 hover:text-[#b42318] sm:text-2xl"
            >
              dipeshkarki8292@gmail.com
            </a>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Clicking the address opens your own mail app with the address
              already filled in. We read every message and reply when we can —
              bug reports with the tool name and what you pasted help most.
            </p>
            <a
              href="mailto:dipeshkarki8292@gmail.com?subject=Assignment%20Helper%20—%20bug%20report&body=Tool%3A%20%0AWhat%20happened%3A%20%0AWhat%20you%20expected%3A%20"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#1c2b4a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16233d] active:scale-95"
            >
              <Mail className="h-4 w-4" />
              Write an email
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
