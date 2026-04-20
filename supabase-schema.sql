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

-- Ensure RLS is enabled
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Drop old/conflicting policies
DROP POLICY IF EXISTS "allow public client insets permissive public insert null true" ON clients;
DROP POLICY IF EXISTS "Allow public insert" ON clients;
DROP POLICY IF EXISTS "Allow anon insert" ON clients;
DROP POLICY IF EXISTS "Allow authenticated insert" ON clients;
DROP POLICY IF EXISTS "Allow authenticated read" ON clients;
DROP POLICY IF EXISTS "Allow authenticated update" ON clients;

-- Allow both anon and authenticated inserts (for intake form)
CREATE POLICY "Allow anon insert" ON clients
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated insert" ON clients
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all
CREATE POLICY "Allow authenticated read" ON clients
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON clients
  FOR UPDATE TO authenticated
  USING (true);

-- Verify
SELECT * FROM pg_policies WHERE tablename = 'clients';