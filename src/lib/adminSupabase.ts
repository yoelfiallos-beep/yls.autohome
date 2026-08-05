import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Separate client instance for the admin dashboard. Enables session
// persistence (localStorage) so signed-in admins stay signed in across
// reloads. The public site uses a different client with persistence
// disabled, so this cannot affect the public homepage.
export const adminSupabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'yl-admin-auth',
  },
});

export type QuoteStatus = 'New' | 'Contacted' | 'Completed' | 'Archived';

export const STATUSES: QuoteStatus[] = ['New', 'Contacted', 'Completed', 'Archived'];

export type QuoteRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  service_needed: string;
  preferred_date: string | null;
  message: string | null;
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
};
