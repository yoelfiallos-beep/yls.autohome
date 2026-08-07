import { ArrowRight, Check, Phone } from 'lucide-react';
import { useRouter } from '@/router';
import { useReveal } from '@/hooks/useReveal';
import { BUSINESS, SERVICES } from '@/data';
import { CtaBand, SectionHeading } from '@/components/Shared';

export function ServicesPage() {
  const ref = useReveal<HTMLDivElement>();
  const { navigate } = useRouter();

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-32 pb-12 sm:px-8 sm:pt-40 lg:px-12">
        <div className="absolute inset-0 bg-radial-brand" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <p className="eyebrow reveal">Our services</p>
            <h1 className="reveal mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Everything your vehicle<br />
              &amp; home <span className="text-brand-500">needs</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-lg text-silver-300 sm:text-xl">
              Four professional services, one trusted team. Mobile auto detailing, landscaping, junk
              removal, and snow removal — all delivered with care across {BUSINESS.serviceArea}.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="section-pad pt-6">
        <div className="container-x space-y-8">
          {SERVICES.map((s, i) => {
            const isAutoDetailing = s.id === 'auto-detailing';
            return (
              <article
                key={s.id}
                className="reveal group relative overflow-hidden rounded-3xl border border-silver-400/15 bg-ink-850/80 backdrop-blur"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Content */}
                <div className="p-7 sm:p-10">
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{s.title}</h2>
                  <p className="mt-1.5 text-sm font-medium text-brand-400">{s.tagline}</p>
                  <p className="mt-4 text-base leading-relaxed text-silver-300">{s.description}</p>

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 rounded-lg border border-silver-400/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white/80 transition-colors hover:border-brand-400/30 hover:bg-brand-500/5"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {isAutoDetailing ? (
                      <button
                        onClick={() => document.getElementById('see-the-difference')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary !py-2.5"
                      >
                        See the Difference
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button onClick={() => navigate('contact')} className="btn-primary !py-2.5">
                        Get a Quote
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                    <a href={BUSINESS.phoneHref} className="btn-ghost border border-silver-400/20 hover:bg-white/5">
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SEE THE DIFFERENCE — Videos */}
      <section className="section-pad pt-0" id="see-the-difference">
        <div className="container-x">
          <SectionHeading
            eyebrow="See the difference"
            title={<>Watch us work</>}
            subtitle="Watch our process and see the results for yourself."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="reveal group relative aspect-video overflow-hidden rounded-2xl border border-silver-400/15 bg-ink-900">
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/detailing-work.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="reveal group relative aspect-video overflow-hidden rounded-2xl border border-silver-400/15 bg-ink-900">
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title={<>Simple, stress-free process</>}
            subtitle="From first call to finished job — here's what to expect."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', t: 'Reach out', b: 'Call or request a free quote online. Tell us what you need.' },
              { n: '02', t: 'Get an estimate', b: 'We provide honest, upfront pricing with no obligation.' },
              { n: '03', t: 'We come to you', b: 'Mobile service on your schedule, anywhere in Mercer County.' },
              { n: '04', t: 'Enjoy the result', b: 'Quality work, done right — your satisfaction guaranteed.' },
            ].map((step, i) => (
              <div
                key={step.n}
                className="reveal card p-6 transition-all duration-300 hover:border-brand-400/30 hover:bg-ink-800"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-display text-3xl font-extrabold text-brand-500/40">{step.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

