-- Run this in Supabase SQL Editor to update the clients table
-- First, add any missing columns (skip if already added)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS fitness_check TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS weight_range TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS prefer_low_impact BOOLEAN;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS session_length TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS motivations TEXT;

-- Fix column types if they were created with wrong types
ALTER TABLE clients ALTER COLUMN fitness_check TYPE TEXT USING fitness_check::text;
ALTER TABLE clients ALTER COLUMN motivations TYPE TEXT USING motivations::text;
ALTER TABLE clients ALTER COLUMN session_length TYPE TEXT USING session_length::text;

-- Ensure RLS policies are correct
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow public client insets permissive public insert null true" ON clients;
DROP POLICY IF EXISTS "Allow public insert" ON clients;

CREATE POLICY "Allow public insert" ON clients
  FOR INSERT TO anon
  WITH CHECK (true);

-- Verify
SELECT * FROM pg_policies WHERE tablename = 'clients';