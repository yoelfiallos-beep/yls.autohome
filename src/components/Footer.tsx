import { Phone, MapPin, Mail, Facebook, Instagram, Clock } from 'lucide-react';
import { useRouter, type PageId } from '@/router';
import { BUSINESS, SERVICES } from '@/data';
import { Logo } from '@/components/Logo';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative border-t border-silver-400/10 bg-ink-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="container-x px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo showWordmark size="md" />
            <p className="mt-4 text-sm leading-relaxed text-silver-400">
              Professional auto detailing and home services across Mercer County, New Jersey. Quality work, fair pricing, reliable service.
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink label="Facebook" href="#">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink label="Instagram" href={BUSINESS.instagram} external>
                <Instagram className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => navigate('services')}
                    className="text-sm text-silver-400 transition-colors hover:text-brand-300"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {([
                ['home', 'Home'],
                ['about', 'About'],
                ['services', 'Services'],
                ['contact', 'Get a Quote'],
              ] as [PageId, string][]).map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => navigate(id)}
                    className="text-sm text-silver-400 transition-colors hover:text-brand-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Get in touch</h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a href={BUSINESS.phoneHref} className="flex items-center gap-3 text-white/70 transition-colors hover:text-brand-300">
                  <Phone className="h-4 w-4 text-silver-300" />
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 text-silver-300" />
                {BUSINESS.serviceArea}
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-white/70 transition-colors hover:text-brand-300">
                  <Mail className="h-4 w-4 text-silver-300" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Clock className="h-4 w-4 text-silver-300" />
                7 days a week · 7am–7pm
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-silver-400/10 pt-6 sm:flex-row">
          <p className="text-xs text-silver-500">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-xs text-silver-500">Serving {BUSINESS.serviceArea}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ children, href, label, external }: { children: React.ReactNode; href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-silver-400/15 bg-white/5 text-silver-400 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-brand-300"
    >
      {children}
    </a>
  );
}
