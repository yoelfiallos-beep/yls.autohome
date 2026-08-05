import { useEffect } from 'react';
import { AdminAuthProvider } from '@/admin/AdminAuthContext';
import { AdminErrorBoundary } from '@/admin/AdminErrorBoundary';
import { AdminLoginPage } from '@/admin/AdminLoginPage';
import { AdminRequestsPage } from '@/admin/AdminRequestsPage';
import { useRouter } from '@/router';

function useNoIndex() {
  useEffect(() => {
    const existing = document.getElementById('robots-meta');
    if (existing) return;
    const meta = document.createElement('meta');
    meta.id = 'robots-meta';
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);
}

function AdminShell() {
  useNoIndex();
  const { route } = useRouter();

  if (route.kind !== 'admin') return null;
  if (route.route === 'admin-login') return <AdminLoginPage />;
  return <AdminRequestsPage />;
}

export function AdminApp() {
  return (
    <AdminErrorBoundary>
      <AdminAuthProvider>
        <AdminShell />
      </AdminAuthProvider>
    </AdminErrorBoundary>
  );
}
