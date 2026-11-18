import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Found a bug, have an idea for a tool, or just want to say thanks? Contact the Assignment Helper team — we reply within a few days.",
};

export default function ContactPage() {
  return (
    <div className="hero-mesh">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <Mail className="h-4 w-4" />
            Contact us
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Found a bug, have an idea for a tool, or just want to say thanks?
            Send us a message — we reply within a few days.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
