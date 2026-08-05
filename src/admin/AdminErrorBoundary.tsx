import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

export class AdminErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Something went wrong.' };
  }

  componentDidCatch(error: Error) {
    console.error('Admin dashboard error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink-950 p-6">
          <div className="card max-w-md p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
              <AlertTriangle className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-xl font-bold text-white">Dashboard problem</h1>
            <p className="mt-2 text-sm text-silver-400">
              The dashboard hit an unexpected error. The public website is unaffected. Try reloading
              the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mt-6"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
