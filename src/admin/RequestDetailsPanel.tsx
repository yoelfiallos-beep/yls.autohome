import { useState } from 'react';
import { X, Phone, Mail, MapPin, Calendar, Clock, MessageSquare, User, Wrench, Trash2, Archive } from 'lucide-react';
import type { QuoteRequest, QuoteStatus } from '@/lib/adminSupabase';
import { STATUSES } from '@/lib/adminSupabase';

type Props = {
  request: QuoteRequest | null;
  onClose: () => void;
  onStatusChange: (id: string, status: QuoteStatus) => void;
  onDelete: (id: string) => void;
};

export function RequestDetailsPanel({ request, onClose, onStatusChange, onDelete }: Props) {
  if (!request) return null;

  const phoneHref = `tel:${request.phone.replace(/[^0-9+]/g, '')}`;
  const emailHref = request.email ? `mailto:${request.email}` : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel: full-screen on mobile, side drawer on desktop */}
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-ink-900 shadow-2xl animate-fade-up sm:w-[92%] md:w-[560px] lg:w-[620px]"
        role="dialog"
        aria-modal="true"
        aria-label="Request details"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-silver-400/10 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-silver-500">Request details</p>
            <h2 className="mt-0.5 font-display text-lg font-bold text-white break-words">{request.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-silver-400/15 bg-white/5 text-silver-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-5">
            <DetailRow icon={User} label="Full name" value={request.name} />
            <DetailRow icon={Phone} label="Phone" value={request.phone} href={phoneHref} />
            <DetailRow
              icon={Mail}
              label="Email"
              value={request.email || '—'}
              href={emailHref || undefined}
            />
            <DetailRow icon={MapPin} label="Address" value={request.address || '—'} />
            <DetailRow icon={Wrench} label="Service needed" value={request.service_needed} />
            <DetailRow
              icon={Calendar}
              label="Preferred date"
              value={request.preferred_date ? formatDate(request.preferred_date) : '—'}
            />

            <div>
              <p className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-wider text-silver-500">
                <MessageSquare className="h-3.5 w-3.5" /> Full message
              </p>
              <div className="rounded-xl border border-silver-400/15 bg-ink-800 p-4 text-sm leading-relaxed text-silver-200 whitespace-pre-wrap break-words">
                {request.message || 'No message provided.'}
              </div>
            </div>

            <div className="rounded-xl border border-silver-400/15 bg-ink-850 p-4">
              <p className="text-xs uppercase tracking-wider text-silver-500">Status</p>
              <p className="mt-1.5">
                <StatusBadge status={request.status} />
              </p>
            </div>

            <DetailRow
              icon={Clock}
              label="Submitted"
              value={formatDateTime(request.created_at)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-silver-400/10 px-5 py-4">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-400"
            >
              <Phone className="h-4 w-4" /> Call Customer
            </a>
            {emailHref ? (
              <a
                href={emailHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white border border-silver-400/20 transition-all hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> Email Customer
              </a>
            ) : (
              <button
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white/40 border border-silver-400/10"
              >
                <Mail className="h-4 w-4" /> No Email
              </button>
            )}
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2.5">
            <button
              onClick={() => onStatusChange(request.id, 'Contacted')}
              className="rounded-xl border border-steel-500/40 bg-steel-500/10 px-3 py-2.5 text-xs font-semibold text-steel-200 transition-colors hover:bg-steel-500/20"
            >
              Mark Contacted
            </button>
            <button
              onClick={() => onStatusChange(request.id, 'Completed')}
              className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/20"
            >
              Mark Completed
            </button>
            <button
              onClick={() => onStatusChange(request.id, 'Archived')}
              className="rounded-xl border border-silver-400/30 bg-white/5 px-3 py-2.5 text-xs font-semibold text-silver-200 transition-colors hover:bg-white/10"
            >
              <Archive className="mr-1 inline h-3.5 w-3.5" /> Archive
            </button>
          </div>

          <DeleteControl request={request} onDelete={onDelete} />
        </div>
      </aside>
    </>
  );
}

function DeleteControl({
  request,
  onDelete,
}: {
  request: QuoteRequest;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="mt-2.5 rounded-xl border border-red-500/25 bg-red-500/5 p-3">
      <DeleteButton request={request} onDelete={onDelete} />
    </div>
  );
}

function DeleteButton({
  request,
  onDelete,
}: {
  request: QuoteRequest;
  onDelete: (id: string) => void;
}) {
  const [armed, setArmed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (!armed) {
    return (
      <button
        onClick={() => setArmed(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4" /> Delete request
      </button>
    );
  }

  if (!confirming) {
    return (
      <div>
        <p className="mb-2 text-center text-sm text-red-200">
          Delete <span className="font-semibold">{request.name}</span>'s request? This cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setArmed(false)}
            className="flex-1 rounded-lg border border-silver-400/20 bg-white/5 px-3 py-2.5 text-sm font-medium text-silver-200 transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="flex-1 rounded-lg bg-red-500/20 px-3 py-2.5 text-sm font-semibold text-red-100 transition-colors hover:bg-red-500/30"
          >
            Yes, continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 text-center text-sm font-semibold text-red-100">
        Are you absolutely sure? Type-confirm required.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setArmed(false);
            setConfirming(false);
          }}
          className="flex-1 rounded-lg border border-silver-400/20 bg-white/5 px-3 py-2.5 text-sm font-medium text-silver-200 transition-colors hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onDelete(request.id);
            setArmed(false);
            setConfirming(false);
          }}
          className="flex-1 rounded-lg bg-red-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
        >
          Delete forever
        </button>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div>
      <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-silver-500">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="text-sm font-medium text-white break-words">{value}</p>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

export function StatusBadge({ status }: { status: QuoteStatus }) {
  const styles: Record<QuoteStatus, string> = {
    New: 'border-brand-500/40 bg-brand-500/15 text-brand-200',
    Contacted: 'border-steel-500/40 bg-steel-500/15 text-steel-200',
    Completed: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200',
    Archived: 'border-silver-400/30 bg-white/5 text-silver-300',
  };
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function StatusSelect({
  value,
  onChange,
  size = 'md',
}: {
  value: QuoteStatus;
  onChange: (status: QuoteStatus) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as QuoteStatus)}
      aria-label="Change status"
      className={`rounded-lg border border-silver-400/20 bg-ink-800 text-xs font-medium text-white outline-none transition-colors focus:border-brand-400 ${
        size === 'sm' ? 'px-2 py-1.5' : 'px-2.5 py-2'
      }`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

function formatDate(d: string) {
  const date = new Date(d + 'T00:00:00');
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(ts: string) {
  const date = new Date(ts);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
