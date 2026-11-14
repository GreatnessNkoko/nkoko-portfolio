import { contactMessageSchema, type ContactMessageInput } from "@portfolio/shared";
import { ArrowUpRight, Check, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact } from "../content";
import { sendContactMessage } from "../lib/api";
import { Section } from "./Section";
import { linkProps, socialLinks } from "./social";

type Field = "name" | "email" | "subject" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const empty: ContactMessageInput = { name: "", email: "", subject: "", message: "", website: "" };

function Input({
  id,
  label,
  error,
  optional,
  textarea,
  ...props
}: {
  id: Field;
  label: string;
  error?: string;
  optional?: boolean;
  textarea?: boolean;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const common = {
    id,
    name: id,
    value: props.value,
    placeholder: props.placeholder,
    autoComplete: props.autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `w-full rounded-xl border bg-bg px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent ${
      error ? "border-red-500" : "border-line"
    }`,
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      {textarea ? (
        <textarea {...common} rows={6} onChange={(e) => props.onChange(e.target.value)} className={`${common.className} resize-y`} />
      ) : (
        <input {...common} type={props.type ?? "text"} onChange={(e) => props.onChange(e.target.value)} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState<ContactMessageInput>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [slow, setSlow] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = (field: Field) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactMessageSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as Field;
        next[f] ??= issue.message;
      }
      setErrors(next);
      document.getElementById(Object.keys(next)[0]!)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    // The free server may be asleep; tell people why it is taking a while.
    const slowTimer = setTimeout(() => setSlow(true), 4000);
    const res = await sendContactMessage(values);
    clearTimeout(slowTimer);
    setSlow(false);

    if (res.ok) {
      setStatus("sent");
      setValues(empty);
    } else {
      setStatus("error");
      setServerError(res.error);
      if (res.field && res.field in empty) setErrors({ [res.field as Field]: res.error });
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-2xl border border-line bg-surface p-8 outline-none"
      >
        <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
          <Check size={22} aria-hidden />
        </span>
        <h3 className="mt-5 font-serif text-3xl">Thank you, your message is on its way.</h3>
        <p className="mt-3 leading-relaxed text-muted">
          It has landed straight in my inbox. I usually reply within a day. For anything urgent, message me on{" "}
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
            WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="name" label="Name" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>
      <Input
        id="subject"
        label="Subject"
        optional
        value={values.subject ?? ""}
        onChange={set("subject")}
        error={errors.subject}
        placeholder="A project, a job offer, a question…"
      />
      <Input
        id="message"
        label="Message"
        textarea
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        placeholder="Tell me a bit about what you have in mind."
      />

      {/* Honeypot: invisible to people, bots fill it in and get ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {serverError} You can also email me at{" "}
          <a href={`mailto:${contact.email}`} className="font-medium underline">
            {contact.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={16} aria-hidden />
            </>
          )}
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {slow && "Waking up the server, this can take up to a minute the first time…"}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's build something together"
      intro="Have a project, a job opening or just a question? Send me a message here and it comes straight to my email, or reach me wherever you prefer."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <ul className="divide-y divide-line border-y border-line self-start">
          {socialLinks.map(({ label, display, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...linkProps(external)}
                className="group flex items-center gap-4 py-4 transition-colors"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  <Icon size={17} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">{label}</span>
                  <span className="block truncate font-medium">{display}</span>
                </span>
                <ArrowUpRight
                  size={17}
                  aria-hidden
                  className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </Section>
  );
}
