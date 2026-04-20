-- Run this in Supabase SQL Editor to create the clients table

CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  goals TEXT[],
  experience_level INTEGER,
  fitness_check TEXT,
  weight_range TEXT,
  prefer_low_impact BOOLEAN,
  injuries TEXT,
  equipment_access TEXT[],
  days_per_week INTEGER,
  session_length TEXT,
  location TEXT,
  delivery_method TEXT,
  motivations TEXT,
  package_name TEXT,
  package_price INTEGER,
  status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  payment_status TEXT DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for the intake form)
CREATE POLICY "Allow public insert" ON clients
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all
CREATE POLICY "Allow authenticated read" ON clients
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON clients
  FOR UPDATE TO authenticated
  USING (true);