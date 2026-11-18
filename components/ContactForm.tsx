"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { PrimaryButton } from "@/components/ToolShell";

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError("Please fill in your name, email and message first.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("That email address doesn't look right — please check it and try again.");
      return;
    }
    setFormError("");
    setSent(true);
  };

  return (
    <div className="card mt-10 p-6 sm:p-8">
      {sent ? (
        <div className="py-6 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </span>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">Message received — thank you!</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Thanks for writing to us, {name.trim()}. We&apos;ll reply to{" "}
            <span className="font-medium text-slate-700">{email.trim()}</span>{" "}
            within a few days. If your question is urgent, you can also email
            us directly at{" "}
            <a href="mailto:hello@assignmenthelper.example" className="font-semibold text-brand-600 hover:text-brand-700">
              hello@assignmenthelper.example
            </a>
            .
          </p>
          <button
            onClick={() => {
              setSent(false);
              setName("");
              setEmail("");
              setMessage("");
            }}
            className="mt-6 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="text-sm font-semibold text-slate-900">
                Your name *
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-semibold text-slate-900">
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="text-sm font-semibold text-slate-900">
                Message *
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Tell us what's on your mind…"
                className={inputClass}
              />
            </div>
          </div>

          {formError && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">
              {formError}
            </p>
          )}

          <div className="mt-6">
            <PrimaryButton onClick={submit}>
              <Send className="h-4 w-4" />
              Send message
            </PrimaryButton>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Prefer email? Write to us directly at{" "}
            <a href="mailto:hello@assignmenthelper.example" className="font-semibold text-brand-600 hover:text-brand-700">
              hello@assignmenthelper.example
            </a>
            . We reply within a few days.
          </p>
        </form>
      )}
    </div>
  );
}
