import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PageId = 'home' | 'about' | 'services' | 'contact';
export type AdminRoute = 'admin-login' | 'admin-requests';

type Route =
  | { kind: 'public'; page: PageId }
  | { kind: 'admin'; route: AdminRoute };

type RouterValue = {
  page: PageId;
  route: Route;
  navigate: (page: PageId) => void;
  navigateAdmin: (route: AdminRoute) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

const PUBLIC_PAGES: PageId[] = ['home', 'about', 'services', 'contact'];

function readRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === 'admin/login') return { kind: 'admin', route: 'admin-login' };
  if (hash === 'admin/requests') return { kind: 'admin', route: 'admin-requests' };
  const page = (hash || 'home') as PageId;
  return PUBLIC_PAGES.includes(page) ? { kind: 'public', page } : { kind: 'public', page: 'home' };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== 'undefined' ? readRoute() : { kind: 'public', page: 'home' }
  );

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next: PageId) => {
    window.location.hash = `/${next}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateAdmin = (next: AdminRoute) => {
    window.location.hash = next === 'admin-login' ? '/admin/login' : '/admin/requests';
  };

  const page = route.kind === 'public' ? route.page : 'home';

  return (
    <RouterContext.Provider value={{ page, route, navigate, navigateAdmin }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
