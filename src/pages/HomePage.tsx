import { Phone, ArrowRight, Car, Snowflake, Leaf, Trash2, Clock, Star, Play, Sparkles, Heart, MapPin, Wrench } from 'lucide-react';
import { useRouter } from '@/router';
import { useReveal } from '@/hooks/useReveal';
import { BUSINESS, SERVICES } from '@/data';
import { CtaBand, SectionHeading } from '@/components/Shared';
import { Logo } from '@/components/Logo';

const TRUST_BADGES = [
  { icon: Car, label: 'Mobile Service', sub: 'We come to you' },
  { icon: Phone, label: 'Free Estimates', sub: 'No obligation, no pressure' },
  { icon: Sparkles, label: 'Quality Work', sub: 'Attention to detail' },
  { icon: Clock, label: 'Reliable Service', sub: 'On time, every time' },
];

const SERVICE_ICONS = [Car, Leaf, Trash2, Snowflake];

export function HomePage() {
  const ref = useReveal<HTMLDivElement>();
  const { navigate } = useRouter();

  return (
    <div ref={ref}>
      <Hero />

      {/* Compact About + trust badges */}
      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-12">
        <div className="container-x">
          <div className="reveal rounded-2xl border border-silver-400/15 bg-ink-850/90 p-6 backdrop-blur-xl shadow-2xl shadow-black/40 sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">About YL's Auto &amp; Home Care</p>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                YL's Auto &amp; Home Care provides professional mobile auto detailing and reliable
                home services throughout Mercer County, NJ. We focus on quality work, fair pricing,
                and customer satisfaction.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button onClick={() => navigate('about')} className="btn-primary">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('services')} className="btn-outline">
                  View Services
                </button>
              </div>
            </div>

            <div className="divider-silver my-8" />

            {/* Trust badges: Mobile Service · Free Estimates · Quality Work · Reliable Service */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_BADGES.map((b, i) => (
                <div
                  key={b.label}
                  className="reveal flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.label}</p>
                    <p className="text-xs text-silver-400">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title={<>Four services, one reliable team</>}
            subtitle="From showroom-quality detailing to year-round property care — we handle it all."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <button
                  key={s.id}
                  onClick={() => navigate('services')}
                  className="reveal group relative overflow-hidden rounded-2xl border border-silver-400/15 bg-ink-850 p-6 text-left transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-400/40 hover:shadow-xl hover:shadow-brand-900/20"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition-all duration-500 group-hover:bg-brand-500/15" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-silver-300/10 text-silver-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-silver-400">{s.tagline}</p>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden section-pad pt-0">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Why choose us"
            title={<>Built on quality, trusted for reliability</>}
            subtitle="Every job is handled with the same care and attention to detail — big or small."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Car, title: 'We come to you', body: 'Mobile service across all of Mercer County — your driveway is our workshop.' },
              { icon: Phone, title: 'Honest, upfront pricing', body: 'Free estimates with no surprises. You approve the price before we start.' },
              { icon: Sparkles, title: 'Attention to detail', body: 'Premium products and careful, hand-finished work on every single job.' },
              { icon: Clock, title: 'Reliable scheduling', body: 'We show up on time and communicate clearly from quote to completion.' },
              { icon: Heart, title: 'Trusted local team', body: 'A local business that cares about its reputation and its neighbors.' },
              { icon: Star, title: 'Customer satisfaction', body: 'Your satisfaction is the standard. We don\u2019t leave until the job is right.' },
            ].map((f, i) => (
              <div
                key={f.title}
                className="reveal card p-6 transition-all duration-300 hover:border-brand-400/30 hover:bg-ink-800"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-silver-300/10 text-silver-300">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

function Hero() {
  const { navigate } = useRouter();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/interior-result.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays for text readability — keep these when video is added */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />

      {/* Centered play icon */}
      <button
        className="absolute right-8 top-28 z-10 hidden h-14 w-14 items-center justify-center rounded-full border border-silver-400/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-brand-400 hover:bg-brand-500/20 sm:flex"
        aria-label="Play hero video"
      >
        <Play className="h-5 w-5 translate-x-0.5 fill-white" />
      </button>

<div className="container-x relative z-10 px-5 pt-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <div className="reveal mb-8">
            <Logo showWordmark size="lg" />
          </div>

          <div className="reveal flex items-center gap-2 rounded-full border border-silver-400/15 bg-white/5 px-4 py-1.5 backdrop-blur w-fit">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            <span className="text-xs font-medium text-white/80">Serving {BUSINESS.serviceArea}</span>
          </div>

          <h1 className="reveal mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Professional Auto Detailing<br />
            <span className="text-brand-500">&amp; Home Services</span>
          </h1>

          <p className="reveal mt-6 max-w-xl text-lg text-white/70 sm:text-xl">
            Keeping Your Vehicle &amp; Property Looking Their Best.
          </p>

          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigate('contact')} className="btn-primary text-base">
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </button>
            <a href={BUSINESS.phoneHref} className="btn-outline text-base">
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>

          {/* Trust line: Mobile Service · Free Estimates (no Licensed/Certified) */}
          <div className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-silver-400">
            <span className="flex items-center gap-2">
              <Car className="h-4 w-4 text-brand-400" /> Mobile Service
            </span>
            <span className="hidden h-4 w-px bg-silver-400/20 sm:block" />
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-400" /> Free Estimates
            </span>
            <span className="hidden h-4 w-px bg-silver-400/20 sm:block" />
            <span className="hidden items-center gap-2 sm:flex">
              <Star className="h-4 w-4 fill-brand-500 text-brand-500" /> Quality Work
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-silver-500 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-silver-400/40 to-transparent" />
      </div>
    </section>
  );
}
