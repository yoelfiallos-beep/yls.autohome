-- The quote_requests.status column has a CHECK constraint requiring
-- one of 'New','Contacted','Completed','Archived', but the column default
-- was set to the lowercase 'new', which violates that constraint and caused
-- every insert that omits an explicit status to fail. Align the default
-- with the allowed values.

ALTER TABLE quote_requests
  ALTER COLUMN status SET DEFAULT 'New';