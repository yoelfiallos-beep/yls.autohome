/*
# Create quote_requests table (single-tenant, no auth)

1. New Tables
- `quote_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer's full name
  - `phone` (text, not null) — contact phone number
  - `email` (text, nullable) — contact email
  - `address` (text, nullable) — service address
  - `service_needed` (text, not null) — which service category (auto detailing / landscaping / junk removal / snow removal)
  - `preferred_date` (date, nullable) — requested service date
  - `message` (text, nullable) — additional details from customer
  - `status` (text, default 'new') — lead status for the business owner
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `quote_requests`.
- Allow anon + authenticated INSERT so website visitors can submit quotes without signing in.
- All other operations (select/update/delete) are denied by default — only the business owner can access submitted leads through the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text,
  service_needed text NOT NULL,
  preferred_date date,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests"
ON quote_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx ON quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS quote_requests_status_idx ON quote_requests (status);
