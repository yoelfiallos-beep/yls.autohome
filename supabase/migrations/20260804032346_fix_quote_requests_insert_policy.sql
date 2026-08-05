/*
# Fix quote_requests insert policy

The anon INSERT policy was created but inserts from the anon role are being rejected
with "new row violates row-level security policy". Re-applying the policy to ensure
it is active and correctly permissive for the anon role.
*/

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;

CREATE POLICY "anon_insert_quote_requests"
ON quote_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
