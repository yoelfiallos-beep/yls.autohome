import { useState, type FormEvent } from 'react';
import { Phone, MapPin, Mail, Clock, ArrowRight, CheckCircle2, Loader2, AlertCircle, Instagram } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { BUSINESS, SERVICES } from '@/data';
import { supabase } from '@/lib/supabase';
import { SectionHeading } from '@/components/Shared';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactPage() {
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      email: String(data.get('email') || '').trim() || null,
      address: String(data.get('address') || '').trim() || null,
      service_needed: String(data.get('service') || '').trim(),
      preferred_date: String(data.get('date') || '').trim() || null,
      message: String(data.get('message') || '').trim() || null,
    };

    if (!payload.name || !payload.phone || !payload.service_needed) {
      setStatus('error');
      setError('Please fill in your name, phone number, and the service you need.');
      return;
    }

    const { error: insertError } = await supabase.from('quote_requests').insert(payload);
    if (insertError) {
      setStatus('error');
      setError('Something went wrong sending your request. Please try calling us instead.');
      return;
    }

    setStatus('success');
    form.reset();
  };

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-32 pb-10 sm:px-8 sm:pt-40 lg:px-12">
        <div className="absolute inset-0 bg-radial-brand" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <p className="eyebrow reveal">Contact</p>
            <h1 className="reveal mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Get your <span className="text-brand-500">free quote</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-lg text-silver-300 sm:text-xl">
              Tell us what you need and we'll get back to you fast. Prefer to talk? Call us directly —
              we're available 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* Call now banner */}
      <section className="px-5 sm:px-8 lg:px-12">
        <div className="container-x">
          <a
            href={BUSINESS.phoneHref}
            className="reveal group relative flex items-center justify-between overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-800/30 to-brand-500/10 p-6 transition-all hover:border-brand-400/60 sm:p-8"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl transition-all group-hover:bg-brand-500/30" />
            <div className="relative flex items-center gap-4">
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-600/40">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-2xl bg-brand-400" />
                <Phone className="relative h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-medium text-silver-300">Call now — we answer fast</p>
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">{BUSINESS.phone}</p>
              </div>
            </div>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-silver-400/15 bg-white/5 text-silver-300 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-brand-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <ArrowRight className="relative hidden h-6 w-6 text-brand-300 transition-transform group-hover:translate-x-1 sm:block" />
          </a>
        </div>
      </section>

      {/* Form + info */}
      <section className="section-pad pt-10">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <div className="reveal card p-6 sm:p-8">
              {status === 'success' ? (
                <SuccessState onReset={() => setStatus('idle')} />
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Request a free quote</h2>
                    <p className="mt-1 text-sm text-silver-400">Fill out the form and we'll reach out shortly.</p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" required placeholder="Your full name" />
                    <Field label="Phone Number" name="phone" type="tel" required placeholder="609-555-0123" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" placeholder="you@email.com" />
                    <Field label="Address" name="address" placeholder="City, NJ" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-white/80">Service Needed</label>
                      <select
                        name="service"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-silver-400/15 bg-ink-800 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400 focus:bg-ink-700"
                      >
                        <option value="" disabled>Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other">Other / Not sure</option>
                      </select>
                    </div>
                    <Field label="Preferred Date" name="date" type="date" />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/80">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us a bit about what you need…"
                      className="w-full resize-none rounded-xl border border-silver-400/15 bg-ink-800 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-400 focus:bg-ink-700"
                    />
                  </div>

                  <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Request
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info column */}
            <div className="space-y-5">
              <div className="reveal card p-6">
                <h3 className="font-display text-lg font-semibold text-white">Contact info</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  <InfoRow icon={Phone} label="Phone" value={BUSINESS.phone} href={BUSINESS.phoneHref} />
                  <InfoRow icon={Mail} label="Email" value={BUSINESS.email} href={`mailto:${BUSINESS.email}`} />
                  <InfoRow icon={MapPin} label="Service area" value={BUSINESS.serviceArea} />
                  <InfoRow icon={Clock} label="Hours" value="7 days a week · 7am–7pm" />
                </ul>
              </div>

              <div className="reveal card relative overflow-hidden p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />
                <h3 className="relative font-display text-lg font-semibold text-white">Why request a quote?</h3>
                <ul className="relative mt-4 space-y-2.5 text-sm text-silver-400">
                  {['Free, no-obligation estimate', 'Fast response — usually same day', 'Honest, upfront pricing', 'Mobile service at your location'].map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="container-x">
          <SectionHeading eyebrow="Where we work" title={<>Serving all of Mercer County</>} center />
          <div className="reveal mt-8 relative overflow-hidden rounded-3xl border border-silver-400/15 bg-ink-850">
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="relative flex aspect-[16/7] flex-col items-center justify-center gap-3 text-center">
              <MapPin className="h-10 w-10 text-brand-400" />
              <p className="font-display text-xl font-bold text-white">{BUSINESS.serviceArea}</p>
              <p className="max-w-md text-sm text-silver-500">
                Mobile service across Mercer County and surrounding areas. Map placeholder — add an
                embedded map here later.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/80">
        {label}{required && <span className="text-brand-400"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-silver-400/15 bg-ink-800 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-400 focus:bg-ink-700"
      />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-silver-300/10 text-silver-300">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-silver-500">{label}</p>
        <p className="mt-0.5 font-medium text-white">{value}</p>
      </div>
    </div>
  );
  return <li>{href ? <a href={href} className="transition-opacity hover:opacity-80">{content}</a> : content}</li>;
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 animate-scale-in">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold text-white">Request sent!</h2>
      <p className="mt-2 max-w-sm text-silver-300">
        Thanks for reaching out. We'll get back to you shortly. For urgent requests, call us at{' '}
        <a href={BUSINESS.phoneHref} className="font-medium text-brand-400 hover:underline">
          {BUSINESS.phone}
        </a>.
      </p>
      <button onClick={onReset} className="btn-outline mt-6">
        Send another request
      </button>
    </div>
  );
}
