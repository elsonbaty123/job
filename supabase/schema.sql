-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_visible BOOLEAN DEFAULT TRUE
);

-- Create project_images table
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Create Policies for projects
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.projects FOR SELECT 
  USING (is_visible = true);

CREATE POLICY "Authenticated users can insert projects" 
  ON public.projects FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects" 
  ON public.projects FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete projects" 
  ON public.projects FOR DELETE 
  TO authenticated 
  USING (true);

-- Create Policies for project_images
CREATE POLICY "Public images are viewable by everyone." 
  ON public.project_images FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert images" 
  ON public.project_images FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images" 
  ON public.project_images FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete images" 
  ON public.project_images FOR DELETE 
  TO authenticated 
  USING (true);

-- Set up Storage Schema
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true) ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" 
  ON storage.objects FOR SELECT 
  USING ( bucket_id = 'project-images' );

CREATE POLICY "Authenticated users can upload" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK ( bucket_id = 'project-images' );

CREATE POLICY "Authenticated users can update storage" 
  ON storage.objects FOR UPDATE 
  TO authenticated 
  USING ( bucket_id = 'project-images' );

CREATE POLICY "Authenticated users can delete storage" 
  ON storage.objects FOR DELETE 
  TO authenticated 
  USING ( bucket_id = 'project-images' );
