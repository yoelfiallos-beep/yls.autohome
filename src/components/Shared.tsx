import { Phone, ArrowRight } from 'lucide-react';
import { useRouter } from '@/router';
import { BUSINESS } from '@/data';

export function CtaBand() {
  const { navigate } = useRouter();
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 md:py-24 lg:px-12">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-silver-400/15 bg-gradient-to-br from-ink-800 to-ink-900 px-6 py-14 text-center sm:px-12 md:py-20">
          <div className="absolute inset-0 bg-radial-brand" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative">
            <p className="eyebrow reveal justify-center">Ready when you are</p>
            <h2 className="reveal mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Get your free quote today
            </h2>
            <p className="reveal mx-auto mt-4 max-w-xl text-base text-silver-300 sm:text-lg">
              Quality work. Honest pricing. Reliable service across {BUSINESS.serviceArea}.
            </p>
            <div className="reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => navigate('contact')} className="btn-primary w-full sm:w-auto">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <a href={BUSINESS.phoneHref} className="btn-outline w-full sm:w-auto">
                <Phone className="h-4 w-4" />
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow reveal ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className="reveal mt-4 font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="reveal mt-4 text-base text-silver-300 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
