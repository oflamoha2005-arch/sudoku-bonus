-- ========================================================
-- Oufella Books - Supabase Cloud Database Setup
-- Run this script in: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ========================================================

-- 1. Create table for storing custom book demands
CREATE TABLE IF NOT EXISTS public.book_demands (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  category TEXT DEFAULT 'other',
  book_title TEXT DEFAULT '',
  demand_text TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) for data protection
ALTER TABLE public.book_demands ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow visitors from your website to submit demands
DROP POLICY IF EXISTS "Allow anonymous book demands" ON public.book_demands;
CREATE POLICY "Allow anonymous book demands"
  ON public.book_demands
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Policy: Only you (the authenticated project owner) can view and edit demands
DROP POLICY IF EXISTS "Allow admin read" ON public.book_demands;
CREATE POLICY "Allow admin read"
  ON public.book_demands
  FOR SELECT
  TO authenticated
  USING (true);
