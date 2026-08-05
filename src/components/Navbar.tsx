import { useState } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { useRouter, type PageId } from '@/router';
import { useScrolled } from '@/hooks/useReveal';
import { BUSINESS } from '@/data';
import { Logo } from '@/components/Logo';

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const { page, navigate } = useRouter();
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);

  const go = (id: PageId) => {
    navigate(id);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-silver-400/10 bg-ink-950/85 backdrop-blur-xl shadow-lg shadow-black/40'
          : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
        <button onClick={() => go('home')} aria-label="YL's Auto and Home home">
          <Logo showWordmark size="md" className="group" />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                page === item.id ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-500 transition-all duration-300 ${
                  page === item.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-silver-400/15 bg-white/5 text-silver-300 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-brand-300"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a href={BUSINESS.phoneHref} className="btn-primary !py-2.5 !text-sm">
            <Phone className="h-4 w-4" />
            {BUSINESS.phone}
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-silver-400/20 bg-white/5 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-silver-400/10 bg-ink-900/95 backdrop-blur-xl transition-all duration-400 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                page === item.id ? 'bg-brand-500/10 text-brand-300' : 'text-silver-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a href={BUSINESS.phoneHref} className="btn-primary mt-2 w-full">
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-silver-400/15 bg-white/5 text-sm font-medium text-silver-300 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-brand-300"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
}


