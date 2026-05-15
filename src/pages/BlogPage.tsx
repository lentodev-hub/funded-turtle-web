import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, FileDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  tag: string | null;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_url: string | null;
  pdf_url: string | null;
  published_at: string;
};

const fallback: Post[] = [
  { id: "1", tag: "Risk management", title: "Why the 1% rule still beats every fancy strategy", excerpt: "Drawdown control is the difference between a 3-month funded trader and a 3-year one.", body: null, cover_url: null, pdf_url: null, published_at: "2026-04-22" },
  { id: "2", tag: "Psychology", title: "Trading like an ox: the patience edge", excerpt: "The original Ox Traders made millions by waiting. Here's how to apply it on a funded account.", body: null, cover_url: null, pdf_url: null, published_at: "2026-04-15" },
  { id: "3", tag: "Strategy", title: "Passing a $200K challenge in 11 days", excerpt: "A breakdown of the exact trades, lot sizes and entry logic from one of our top performers.", body: null, cover_url: null, pdf_url: null, published_at: "2026-04-02" },
];

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>(fallback);
  const [open, setOpen] = useState<Post | null>(null);

  useEffect(() => {
    supabase.from("blog_posts").select("id, tag, title, excerpt, body, cover_url, pdf_url, published_at")
      .eq("published", true).order("published_at", { ascending: false })
      .then(({ data }) => { if (data && data.length) setPosts(data as Post[]); });
  }, []);

  if (open) {
    return (
      <article className="py-20 bg-background">
        <div className="container max-w-3xl">
          <button onClick={() => setOpen(null)} className="text-primary text-sm mb-6">← Back to all posts</button>
          {open.tag && <div className="text-xs font-semibold text-primary uppercase tracking-wider">{open.tag}</div>}
          <h1 className="font-display font-extrabold text-4xl mt-2">{open.title}</h1>
          <div className="text-muted-foreground text-sm mt-1">{new Date(open.published_at).toLocaleDateString()}</div>
          {open.cover_url && <img src={open.cover_url} alt={open.title} className="w-full rounded-xl my-6" />}
          {open.pdf_url && (
            <a href={open.pdf_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold mb-6">
              <FileDown className="h-4 w-4" /> Download PDF
            </a>
          )}
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: open.body || `<p>${open.excerpt ?? ""}</p>` }} />
        </div>
      </article>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Insights" title="The Funded Ox blog" description="Strategy, psychology and behind-the-scenes from the world of prop trading." />
      <section className="py-20 bg-background">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Card key={p.id} onClick={() => setOpen(p)} className="bg-gradient-card border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden">
              {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full h-44 object-cover" />}
              <CardHeader>
                {p.tag && <div className="text-xs font-semibold text-primary uppercase tracking-wider">{p.tag}</div>}
                <CardTitle className="text-xl font-display mt-2 group-hover:text-primary transition-colors">{p.title}</CardTitle>
                <CardDescription>{new Date(p.published_at).toLocaleDateString()}{p.pdf_url ? " · PDF attached" : ""}</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                <p>{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold">
                  Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
