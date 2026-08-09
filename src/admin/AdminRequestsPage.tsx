import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Search,
  Loader2,
  AlertCircle,
  LogOut,
  Inbox,
  Phone,
  ChevronRight,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  LayoutGrid,
} from 'lucide-react';
import { useAdminAuth } from '@/admin/AdminAuthContext';
import { useRouter } from '@/router';
import { adminSupabase, STATUSES, type QuoteRequest, type QuoteStatus } from '@/lib/adminSupabase';
import { RequestDetailsPanel, StatusBadge, StatusSelect } from '@/admin/RequestDetailsPanel';
import { ToastView, useToast } from '@/admin/Toast';

type FilterValue = 'All' | QuoteStatus;
type SortValue = 'newest' | 'oldest';

export function AdminRequestsPage() {
  const { session, loading, signOut } = useAdminAuth();
  const { navigateAdmin, navigate } = useRouter();
  const { toast, show, dismiss } = useToast();

  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterValue>('All');
  const [sort, setSort] = useState<SortValue>('newest');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setFetching(true);
    setFetchError('');
    const { data, error } = await adminSupabase
      .from('quote_requests')
      .select(
        'id, name, phone, email, address, service_needed, preferred_date, message, status, created_at, updated_at'
      )
      .order('created_at', { ascending: false });
    setFetching(false);
    if (error) {
      setFetchError(error.message || 'Failed to load requests.');
      return;
    }
    setRequests((data ?? []) as QuoteRequest[]);
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      navigateAdmin('admin-login');
    }
    if (!loading && session) {
      fetchRequests();
    }
  }, [session, loading, navigateAdmin, fetchRequests]);

  const updateStatus = useCallback(
    async (id: string, next: QuoteStatus) => {
      const prev = requests.find((r) => r.id === id);
      if (!prev || prev.status === next) return;

      setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status: next } : r)));

      const { error } = await adminSupabase
        .from('quote_requests')
        .update({ status: next, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status: prev.status } : r)));
        show('error', 'Could not save status. Reverted.');
      } else {
        show('success', `Marked as ${next}.`);
      }
    },
    [requests, show]
  );

  const deleteRequest = useCallback(
    async (id: string) => {
      const prev = requests.find((r) => r.id === id);
      if (!prev) return;

      const { error } = await adminSupabase.from('quote_requests').delete().eq('id', id);
      if (error) {
        show('error', 'Could not delete request.');
        return;
      }
      setRequests((rs) => rs.filter((r) => r.id !== id));
      setSelectedId(null);
      show('success', 'Request deleted.');
    },
    [requests, show]
  );

  const counts = useMemo(() => {
    const c: Record<QuoteStatus, number> = { New: 0, Contacted: 0, Completed: 0, Archived: 0 };
    for (const r of requests) c[r.status] += 1;
    return c;
  }, [requests]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = requests;
    if (filter !== 'All') list = list.filter((r) => r.status === filter);
    if (q) {
      list = list.filter((r) =>
        [r.name, r.phone, r.email || '', r.service_needed]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
    const sorted = [...list].sort((a, b) => {
      const cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sort === 'newest' ? -cmp : cmp;
    });
    return sorted;
  }, [requests, query, filter, sort]);

  const selected = useMemo(
    () => requests.find((r) => r.id === selectedId) ?? null,
    [requests, selectedId]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-silver-400" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-silver-400/10 bg-ink-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
              <LayoutGrid className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-white leading-tight">YL Admin</p>
              <p className="text-[11px] text-silver-500 leading-tight">Quote Requests</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-silver-500 sm:inline">
              {session.user.email}
            </span>
            <button
              onClick={async () => {
                await signOut();
                navigateAdmin('admin-login');
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-silver-400/20 bg-white/5 px-3 py-2 text-xs font-medium text-silver-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Quote Requests</h1>
          <p className="text-sm text-silver-400">
            Manage every quote request submitted through your website.
          </p>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATUSES.map((s) => (
            <SummaryCard key={s} label={s} count={counts[s]} active={filter === s} onClick={() => setFilter(filter === s ? 'All' : s)} />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, email, or service…"
              className="w-full rounded-xl border border-silver-400/15 bg-ink-800 py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-400 focus:bg-ink-700"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex rounded-xl border border-silver-400/15 bg-ink-800 p-1">
              {(['All', ...STATUSES] as FilterValue[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    filter === f ? 'bg-brand-500 text-white' : 'text-silver-300 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSort((s) => (s === 'newest' ? 'oldest' : 'newest'))}
              className="inline-flex items-center gap-1.5 rounded-xl border border-silver-400/15 bg-ink-800 px-3 py-2.5 text-xs font-semibold text-silver-200 transition-colors hover:text-white"
              aria-label="Toggle sort order"
            >
              {sort === 'newest' ? <ArrowDownWideNarrow className="h-4 w-4" /> : <ArrowUpWideNarrow className="h-4 w-4" />}
              <span className="hidden sm:inline">{sort === 'newest' ? 'Newest' : 'Oldest'}</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-6">
          {fetching ? (
            <LoadingState />
          ) : fetchError ? (
            <ErrorState message={fetchError} onRetry={fetchRequests} />
          ) : filtered.length === 0 ? (
            <EmptyState hasAny={requests.length > 0} />
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {filtered.map((r) => (
                <RequestCard
                  key={r.id}
                  request={r}
                  onOpen={() => setSelectedId(r.id)}
                  onStatusChange={(status) => updateStatus(r.id, status)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <RequestDetailsPanel
        request={selected}
        onClose={() => setSelectedId(null)}
        onStatusChange={updateStatus}
        onDelete={deleteRequest}
      />

      <ToastView toast={toast} dismiss={dismiss} />

      {/* Hidden public-site nav link for accessibility/escape — not in public nav */}
      <button
        onClick={() => navigate('home')}
        className="sr-only"
        aria-label="Back to public website"
      >
        Home
      </button>
    </div>
  );
}

function SummaryCard({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`card flex flex-col items-start p-4 text-left transition-all hover:-translate-y-0.5 sm:p-5 ${
        active ? 'border-brand-500/60 ring-1 ring-brand-500/30' : ''
      }`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-silver-500">{label}</span>
      <span className="mt-1.5 font-display text-2xl font-extrabold text-white sm:text-3xl">{count}</span>
    </button>
  );
}

function RequestCard({
  request,
  onOpen,
  onStatusChange,
}: {
  request: QuoteRequest;
  onOpen: () => void;
  onStatusChange: (status: QuoteStatus) => void;
}) {
  const phoneHref = `tel:${request.phone.replace(/[^0-9+]/g, '')}`;
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-white break-words">{request.name}</h3>
            <StatusBadge status={request.status} />
          </div>
          <p className="mt-1 text-sm text-silver-300 break-words">{request.service_needed}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-silver-500">
            <span className="break-words">{request.phone}</span>
            {request.email && <span className="break-words">{request.email}</span>}
            <span>{formatDateTimeShort(request.created_at)}</span>
            {request.preferred_date && <span>Pref: {formatDate(request.preferred_date)}</span>}
          </div>
          {request.message && (
            <p className="mt-2 text-sm text-silver-400 line-clamp-2 break-words">
              {request.message}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <StatusSelect value={request.status} onChange={onStatusChange} size="sm" />
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-2 border-t border-silver-400/10 pt-3.5">
        <a
          href={phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <button
          onClick={onOpen}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-silver-400/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Details <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-silver-400" />
      <p className="mt-3 text-sm text-silver-400">Loading requests…</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="card flex flex-col items-center justify-center py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
        <AlertCircle className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-white">Couldn't load requests</h3>
      <p className="mt-1.5 max-w-sm text-sm text-silver-400">{message}</p>
      <button onClick={onRetry} className="btn-outline mt-5">
        Try again
      </button>
    </div>
  );
}

function EmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="card flex flex-col items-center justify-center py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-silver-400">
        <Inbox className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-white">
        {hasAny ? 'No matching requests' : 'No requests yet'}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-silver-400">
        {hasAny
          ? 'Try adjusting your search or filters.'
          : 'Quote requests submitted through your contact form will appear here.'}
      </p>
    </div>
  );
}

function formatDate(d: string) {
  const date = new Date(d + 'T00:00:00');
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTimeShort(ts: string) {
  const date = new Date(ts);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
