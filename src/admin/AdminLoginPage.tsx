import { useState, type FormEvent, useEffect } from 'react';
import { Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/admin/AdminAuthContext';
import { useRouter } from '@/router';

export function AdminLoginPage() {
  const { session, loading, signIn, error } = useAdminAuth();
  const { navigateAdmin, navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!loading && session) {
      navigateAdmin('admin-requests');
    }
  }, [session, loading, navigateAdmin]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    const { error: err } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (err) setFormError(err);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-silver-400" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-5 py-12">
      <div className="absolute inset-0 bg-radial-brand" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate('home')}
          className="mb-6 inline-flex items-center gap-2 text-sm text-silver-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        <div className="card p-8">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-600/40">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold text-white">Admin Sign In</h1>
            <p className="mt-2 text-sm text-silver-400">
              Restricted access. Only approved administrators may continue.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-7 space-y-5">
            {(formError || error) && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{formError || error}</span>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-silver-400/15 bg-ink-800 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-400 focus:bg-ink-700"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-silver-400/15 bg-ink-800 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-400 focus:bg-ink-700"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
