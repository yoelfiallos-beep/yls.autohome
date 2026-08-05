import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PageId = 'home' | 'about' | 'services' | 'contact';

type RouterValue = {
  page: PageId;
  navigate: (page: PageId) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

function readHash(): PageId {
  const raw = window.location.hash.replace('#/', '').replace('#', '') as PageId;
  const valid: PageId[] = ['home', 'about', 'services', 'contact'];
  return valid.includes(raw) ? raw : 'home';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? readHash() : 'home'
  );

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next: PageId) => {
    window.location.hash = `/${next}`;
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ page, navigate }}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
