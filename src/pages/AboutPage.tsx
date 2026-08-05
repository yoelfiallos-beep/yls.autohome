import { ArrowRight, ShieldCheck, Heart, Wrench, MapPin } from 'lucide-react';
import { useRouter } from '@/router';
import { useReveal } from '@/hooks/useReveal';
import { BUSINESS } from '@/data';
import { CtaBand, SectionHeading } from '@/components/Shared';

const VALUES = [
  { icon: ShieldCheck, title: 'Reliability', body: 'We do what we say — on time, every time, with clear communication from start to finish.' },
  { icon: Heart, title: 'Customer Care', body: 'Your satisfaction is the standard. We treat every vehicle and property like it\u2019s our own.' },
  { icon: Wrench, title: 'Quality Work', body: 'Premium products, careful technique, and attention to the details others overlook.' },
];

export function AboutPage() {
  const ref = useReveal<HTMLDivElement>();
  const { navigate } = useRouter();

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-40 lg:px-12">
        <div className="absolute inset-0 bg-radial-brand" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <p className="eyebrow reveal">About us</p>
            <h1 className="reveal mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Local service you can <span className="text-brand-500">count on</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-lg text-silver-300 sm:text-xl">
              Professional mobile auto detailing and reliable home services throughout Mercer County, NJ.
            </p>
          </div>
        </div>
      </section>

      {/* Story — no image */}
      <section className="section-pad pt-8">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow reveal justify-center">About YL's Auto &amp; Home Care</p>
            <div className="reveal mt-5 text-base leading-relaxed text-silver-300 sm:text-lg">
              <p>
                YL's Auto &amp; Home Care provides professional mobile auto detailing and reliable
                home services throughout Mercer County, NJ. We focus on quality work, fair pricing,
                and customer satisfaction.
              </p>
            </div>
            <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate('contact')} className="btn-primary">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate('services')} className="btn-outline">
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 sm:px-8 lg:px-12">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-silver-400/15 bg-ink-850/80 p-6 backdrop-blur sm:p-8 lg:grid-cols-4">
            {[
              { n: '4', l: 'Services offered' },
              { n: '7 days', l: 'Available weekly' },
              { n: '100%', l: 'Satisfaction goal' },
              { n: 'Mobile', l: 'We come to you' },
            ].map((s, i) => (
              <div key={s.l} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="font-display text-3xl font-extrabold text-brand-500 sm:text-4xl">{s.n}</p>
                <p className="mt-1 text-sm text-silver-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="What drives us"
            title={<>Our core values</>}
            subtitle="The principles behind every job we take on."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="reveal card p-7 text-center transition-all duration-300 hover:border-brand-400/30 hover:bg-ink-800"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-silver-300/10 text-silver-300">
                  <v.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="container-x">
          <div className="reveal relative overflow-hidden rounded-3xl border border-silver-400/15 bg-ink-850/80 p-8 backdrop-blur sm:p-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="flex items-center gap-2 text-brand-400">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Service area</span>
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                  Proudly serving {BUSINESS.serviceArea}
                </h3>
                <p className="mt-2 max-w-lg text-silver-400">
                  Mobile service throughout Mercer County and surrounding areas. Not sure if we cover
                  your spot? Just call — we likely do.
                </p>
              </div>
              <a href={BUSINESS.phoneHref} className="btn-primary shrink-0">
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
