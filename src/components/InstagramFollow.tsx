import { Instagram, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/data';
import { useReveal } from '@/hooks/useReveal';

export function InstagramFollow() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="px-5 sm:px-8 lg:px-12">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-3xl border border-silver-400/15 bg-gradient-to-br from-ink-800 to-ink-900 px-6 py-14 text-center sm:px-12 md:py-16">
          <div className="absolute inset-0 bg-radial-brand" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative">
            <span className="reveal mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/40">
              <Instagram className="h-7 w-7" />
            </span>
            <h2 className="reveal mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Follow Our Latest Work
            </h2>
            <p className="reveal mx-auto mt-4 max-w-xl text-base text-silver-300 sm:text-lg">
              See our latest detailing jobs, landscaping projects, and behind-the-scenes content on Instagram.
            </p>
            <div className="reveal mt-8">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Instagram className="h-4 w-4" />
                Follow Us on Instagram
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
