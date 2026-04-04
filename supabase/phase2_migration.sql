-- Phase 2 Migrations

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS price INTEGER,
ADD COLUMN IF NOT EXISTS price_display TEXT,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_id UUID REFERENCES public.projects(id),
  occasion_type TEXT,
  quantity INTEGER,
  preferred_date DATE,
  notes TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Everyone can submit an inquiry
CREATE POLICY "Public can insert inquiries" 
  ON public.inquiries FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Admin can see and edit inquiries
CREATE POLICY "Authenticated users can view inquiries" 
  ON public.inquiries FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can update inquiries" 
  ON public.inquiries FOR UPDATE 
  TO authenticated 
  USING (true);
