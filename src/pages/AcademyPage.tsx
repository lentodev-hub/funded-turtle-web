import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Course = {
  id: string;
  level: string | null;
  title: string;
  lessons_label: string | null;
  description: string | null;
  body: string | null;
  cover_url: string | null;
  pdf_url: string | null;
};

const fallback: Course[] = [
  { id: "1", level: "Beginner", title: "Trading Foundations", lessons_label: "12 lessons", description: "Markets, instruments, order types and your first trade plan.", body: null, cover_url: null, pdf_url: null },
  { id: "2", level: "Intermediate", title: "Technical Analysis Mastery", lessons_label: "18 lessons", description: "Price action, structure, supply & demand and high-probability setups.", body: null, cover_url: null, pdf_url: null },
  { id: "3", level: "Intermediate", title: "Trading Psychology", lessons_label: "10 lessons", description: "Discipline, journaling and managing tilt under live capital.", body: null, cover_url: null, pdf_url: null },
  { id: "4", level: "Advanced", title: "Risk & Position Sizing", lessons_label: "8 lessons", description: "Kelly, fixed fractional and surviving the drawdown that ends careers.", body: null, cover_url: null, pdf_url: null },
];

const AcademyPage = () => {
  const [courses, setCourses] = useState<Course[]>(fallback);
  const [open, setOpen] = useState<Course | null>(null);

  useEffect(() => {
    supabase.from("academy_courses").select("id, level, title, lessons_label, description, body, cover_url, pdf_url")
      .eq("published", true).order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => { if (data && data.length) setCourses(data as Course[]); });
  }, []);

  if (open) {
    return (
      <article className="py-20 bg-background">
        <div className="container max-w-3xl">
          <button onClick={() => setOpen(null)} className="text-primary text-sm mb-6">← Back to academy</button>
          {open.level && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{open.level}</span>}
          <h1 className="font-display font-extrabold text-4xl mt-3">{open.title}</h1>
          {open.lessons_label && <div className="text-muted-foreground text-sm mt-1">{open.lessons_label}</div>}
          {open.cover_url && <img src={open.cover_url} alt={open.title} className="w-full rounded-xl my-6" />}
          {open.pdf_url && (
            <a href={open.pdf_url} target="_blank" rel="noreferrer">
              <Button className="mb-6"><FileDown className="h-4 w-4 mr-2" /> Download course PDF</Button>
            </a>
          )}
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: open.body || `<p>${open.description ?? ""}</p>` }} />
        </div>
      </article>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Academy" title="Free education for serious traders" description="Structured courses and downloadable materials — the same playbook our top funded traders use." />
      <section className="py-20 bg-background">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <Card key={c.id} onClick={() => setOpen(c)} className="bg-gradient-card border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all cursor-pointer overflow-hidden">
              {c.cover_url && <img src={c.cover_url} alt={c.title} className="w-full h-44 object-cover" />}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  {c.level && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{c.level}</span>}
                </div>
                <CardTitle className="text-xl font-display mt-3">{c.title}</CardTitle>
                <CardDescription>{c.lessons_label}{c.pdf_url ? " · PDF" : ""}</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">{c.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
};

export default AcademyPage;
