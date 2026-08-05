import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export type ToastKind = 'success' | 'error';

export type ToastState = { id: number; kind: ToastKind; message: string } | null;

let counter = 0;

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);

  const show = (kind: ToastKind, message: string) => {
    counter += 1;
    setToast({ id: counter, kind, message });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  return { toast, show, dismiss: () => setToast(null) };
}

export function ToastView({ toast, dismiss }: { toast: ToastState; dismiss: () => void }) {
  if (!toast) return null;
  const isSuccess = toast.kind === 'success';
  return (
    <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 animate-fade-up px-4">
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${
          isSuccess
            ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-100'
            : 'border-red-500/30 bg-red-500/15 text-red-100'
        }`}
      >
        {isSuccess ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
        <span>{toast.message}</span>
        <button onClick={dismiss} className="ml-1 opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
