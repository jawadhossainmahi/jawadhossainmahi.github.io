"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Magnetic } from "./magnetic";
import { GithubMark, LinkedinMark } from "./brand-icons";

type Status = "idle" | "sending" | "sent" | "error";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

// Below this, a submission is almost certainly a bot filling the form
// programmatically rather than a person reading and typing into it.
const MIN_FILL_TIME_MS = 2500;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // Honeypot: real users never see or fill this field. Bots that
    // autofill every input in a form will populate it, so any value here
    // means it's spam. Filled-too-fast is the same signal from a
    // different angle — a human can't read the form and type a message
    // in under ~2.5s. Both cases fake a normal "sent" response instead of
    // erroring, so scripted submitters get no signal their post to
    // Formspree/mailto was silently dropped.
    const honeypot = String(data.get("company") ?? "");
    const filledInTime = Date.now() - mountedAt.current;
    if (honeypot !== "" || filledInTime < MIN_FILL_TIME_MS) {
      setStatus("sent");
      form.reset();
      return;
    }

    // Without a Formspree project wired up (NEXT_PUBLIC_FORMSPREE_ID), fall
    // back to a pre-filled mailto so the form always does something real
    // instead of silently failing.
    if (!FORMSPREE_ID) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Portfolio contact from ${name}`
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          label="contact"
          title="Let's Build Together"
          description="Looking for a fresher / junior Full Stack developer, or want to talk about EduSelf? I'm always open to a conversation."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <InfoCard icon={<MapPin size={20} />} label="Location" value={site.location} />
            <InfoCard
              icon={<Mail size={20} />}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <InfoCard
              icon={<Phone size={20} />}
              label="Phone"
              value={site.phoneDisplay}
              href={`tel:${site.phone}`}
            />

            <div className="flex gap-3 pt-2">
              <Magnetic>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-xs text-subtle hover:border-accent hover:text-accent"
                >
                  <LinkedinMark size={14} /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-xs text-subtle hover:border-accent hover:text-accent"
                >
                  <GithubMark size={14} /> GitHub
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="card-glow rounded-2xl border border-border bg-card p-8"
            >
              <div className="space-y-5">
                {/* Honeypot: hidden from sighted and screen-reader users alike, so only a bot filling every field would ever populate it. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <Field label="Name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-xs text-subtle"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-gradient flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-display font-bold text-bg transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "sent" && (
                  <p className="text-center text-sm text-accent">
                    Thanks — I&apos;ll get back to you soon!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-red-400">
                    Something went wrong — email me directly at {site.email}.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="card-glow flex items-center gap-4 rounded-xl border border-border bg-card p-6">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <div className="font-mono text-xs text-muted">{label}</div>
        <div className="font-medium text-text">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-mono text-xs text-subtle">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
