
-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag text,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  body text,
  cover_url text,
  pdf_url text,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins manage posts" ON public.blog_posts FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER blog_posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Academy courses
CREATE TABLE public.academy_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  lessons_label text,
  description text,
  body text,
  cover_url text,
  pdf_url text,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.academy_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published courses" ON public.academy_courses FOR SELECT USING (published = true);
CREATE POLICY "Admins manage courses" ON public.academy_courses FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER academy_courses_updated BEFORE UPDATE ON public.academy_courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- FAQ items
CREATE TABLE public.faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published faqs" ON public.faq_items FOR SELECT USING (published = true);
CREATE POLICY "Admins manage faqs" ON public.faq_items FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER faq_items_updated BEFORE UPDATE ON public.faq_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket for PDFs and images
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media','cms-media', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read cms-media" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "Admins upload cms-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cms-media' AND has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update cms-media" ON storage.objects FOR UPDATE USING (bucket_id = 'cms-media' AND has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete cms-media" ON storage.objects FOR DELETE USING (bucket_id = 'cms-media' AND has_role(auth.uid(),'admin'));
