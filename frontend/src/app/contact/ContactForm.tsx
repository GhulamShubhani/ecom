'use client';

import { useActionState } from 'react';
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Tag,
  Send,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { submitContactForm, type ContactFormState } from './actions';

const initialContactState: ContactFormState = {
  status: 'idle',
  message: '',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-brand-burgundy">{message}</p>;
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  autoComplete?: string;
  optional?: boolean;
  error?: string;
};

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  autoComplete,
  optional,
  error,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-brand-burgundy/55">
        {label} {optional ? <span className="text-brand-burgundy/35">(optional)</span> : null}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-brand-clay" />
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="input-brand pl-10"
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactState
  );

  if (state.status === 'success') {
    return (
      <div className="card-brand relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-brand-sage/10 via-transparent to-transparent" />
        <div className="relative flex flex-col items-center justify-center px-8 py-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-sage/10 ring-1 ring-brand-sage/30">
            <CheckCircle2 className="h-8 w-8 text-brand-sage" />
          </div>
          <h3 className="heading-brand mb-3 text-2xl text-brand-burgundy">Message sent</h3>
          <p className="max-w-sm leading-relaxed text-brand-burgundy/60">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-brand relative overflow-hidden">
      {/* Accent header */}
      <div className="relative border-b border-brand-clay/15 bg-brand-sand/70 px-6 py-6 md:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-clay to-transparent" />
        <h3 className="font-cormorant text-3xl font-medium text-brand-burgundy">Send us a message</h3>
        <p className="mt-1 text-sm text-brand-burgundy/55">We usually reply within a few hours.</p>
      </div>

      <form action={formAction} className="space-y-5 p-6 md:p-8" noValidate>
        {state.status === 'error' && !state.errors ? (
          <div className="flex items-center gap-2 rounded-xl border border-brand-clay/40 bg-brand-clay/10 px-4 py-3 text-sm text-brand-burgundy">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {state.message}
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Full Name"
            placeholder="Your name"
            icon={User}
            autoComplete="name"
            error={state.errors?.name}
          />
          <Field
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@email.com"
            icon={Mail}
            autoComplete="email"
            error={state.errors?.email}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="phone"
            label="Phone"
            type="tel"
            placeholder="+47 ..."
            icon={Phone}
            autoComplete="tel"
            optional
            error={state.errors?.phone}
          />
          <Field
            id="subject"
            label="Subject"
            placeholder="How can we help?"
            icon={Tag}
            error={state.errors?.subject}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-brand-burgundy/55"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your message..."
            className="input-brand resize-none"
          />
          <FieldError message={state.errors?.message} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-brand group w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-brand-burgundy/45">
          We reply within 24 hours. Your details stay private and secure.
        </p>
      </form>
    </div>
  );
}
