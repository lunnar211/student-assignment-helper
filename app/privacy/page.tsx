import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy — Assignment Helper",
  description:
    "Assignment Helper does not store your text, does not use tracking cookies, and does not require an account. Read the full privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="hero-mesh">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <Lock className="h-4 w-4" />
            Privacy Policy
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your words are yours. We don&apos;t keep them.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Last updated: November 2026. This policy explains, in plain language,
            what happens to your text when you use Assignment Helper.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-10 space-y-6 p-6 text-[15px] leading-relaxed text-slate-600 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">What data we collect</h2>
              <p className="mt-2">
                Almost none. We do not ask you to create an account, so we do not
                collect your name, email address or password. We do not store the
                text you paste into any tool. When you use a tool, your text is
                sent to the provider that processes that request — and only for
                that request — and it is not saved by us afterwards. Closing the
                page removes your text from view entirely.
              </p>
              <p className="mt-2">
                Like most websites, our hosting provider may keep basic technical
                logs (such as the date of a visit and general, non-identifying
                browser information) to keep the site running securely. These logs
                are not linked to you or to the text you paste.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Cookies</h2>
              <p className="mt-2">
                We do not use cookies for tracking or advertising. We do not run
                analytics that follow you across the web, and we do not show
                third-party ads. If a cookie is ever needed for a purely technical
                reason (for example, to keep the site secure), it will not be used
                to identify you or build a profile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Third-party services</h2>
              <p className="mt-2">
                To process your requests, text you submit is sent to the service
                that powers each tool:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-slate-800">Groq</strong> and{" "}
                  <strong className="text-slate-800">Pollinations</strong> — process
                  text for the paraphraser, humanizer and SOP writer.
                </li>
                <li>
                  <strong className="text-slate-800">LanguageTool</strong> — processes
                  text for the grammar checker.
                </li>
              </ul>
              <p className="mt-2">
                These providers receive your text only to generate a result for
                your request, under their own privacy policies. The AI checker
                and similarity checker analyse writing patterns in your browser
                session and do not send your text to an AI provider. We do not
                sell, rent or share your data with anyone else, because there is
                nothing to share — we do not store it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Children&apos;s privacy</h2>
              <p className="mt-2">
                This site is intended for students, including those under 18. We
                do not knowingly collect personal information from anyone, of any
                age. If you are under 18, please do not paste personal details —
                such as your full address or phone number — into any tool.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Your choices</h2>
              <p className="mt-2">
                Because we do not store your text or create accounts, there is no
                data to download or delete. If you contact us by email (see below),
                we will only use your message to reply to you, and we will not add
                you to any mailing list.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
              <p className="mt-2">
                If you have any questions about this policy,{" "}
                <Link href="/contact" className="font-semibold text-[#b42318] hover:underline">
                  contact us
                </Link>{" "}
                or email us at{" "}
                <a href="mailto:dipeshkarki8292@gmail.com" className="font-semibold text-[#b42318] hover:underline">
                  dipeshkarki8292@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
