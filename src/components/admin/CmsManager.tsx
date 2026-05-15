import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Trash2, FileText, Image as ImageIcon, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import RichTextEditor from "@/components/RichTextEditor";
import { uploadCmsFile, slugify } from "@/lib/cmsUpload";

type Blog = { id: string; tag: string | null; title: string; slug: string; excerpt: string | null; body: string | null; cover_url: string | null; pdf_url: string | null; published: boolean; published_at: string };
type Course = { id: string; level: string | null; title: string; slug: string; lessons_label: string | null; description: string | null; body: string | null; cover_url: string | null; pdf_url: string | null; published: boolean; sort_order: number };
type Faq = { id: string; question: string; answer: string; category: string | null; sort_order: number; published: boolean };

const CmsManager = () => {
  return (
    <Tabs defaultValue="blog">
      <TabsList>
        <TabsTrigger value="blog">Blog</TabsTrigger>
        <TabsTrigger value="academy">Academy</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>
      <TabsContent value="blog" className="mt-4"><BlogManager /></TabsContent>
      <TabsContent value="academy" className="mt-4"><AcademyManager /></TabsContent>
      <TabsContent value="faq" className="mt-4"><FaqManager /></TabsContent>
    </Tabs>
  );
};

/* ---------------- Blog ---------------- */
const emptyBlog: Partial<Blog> = { tag: "", title: "", slug: "", excerpt: "", body: "", cover_url: "", pdf_url: "", published: true };

const BlogManager = () => {
  const [items, setItems] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Partial<Blog> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
    setItems((data ?? []) as Blog[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title) return toast.error("Title required");
    setSaving(true);
    const slug = editing.slug || slugify(editing.title);
    const payload = { ...editing, slug, tag: editing.tag || null, excerpt: editing.excerpt || null, body: editing.body || null, cover_url: editing.cover_url || null, pdf_url: editing.pdf_url || null };
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload as any);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  if (editing) {
    return (
      <Card className="p-5 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Title</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div><Label>Tag</Label><Input value={editing.tag ?? ""} onChange={(e) => setEditing({ ...editing, tag: e.target.value })} placeholder="Strategy, Psychology..." /></div>
          <div><Label>Slug (optional)</Label><Input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto" /></div>
          <div className="flex items-end gap-2"><Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
        </div>
        <div><Label>Excerpt</Label><Textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></div>
        <div>
          <Label>Body</Label>
          <RichTextEditor value={editing.body ?? ""} onChange={(html) => setEditing({ ...editing, body: html })} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FileField label="Cover image" accept="image/*" value={editing.cover_url ?? ""} folder="covers" onChange={(url) => setEditing({ ...editing, cover_url: url })} icon={<ImageIcon className="h-4 w-4" />} />
          <FileField label="PDF attachment" accept="application/pdf" value={editing.pdf_url ?? ""} folder="pdfs" onChange={(url) => setEditing({ ...editing, pdf_url: url })} icon={<FileText className="h-4 w-4" />} />
        </div>
        <div className="flex gap-2">
          <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setEditing(emptyBlog)}><Plus className="h-4 w-4 mr-1" />New post</Button>
      <div className="grid gap-3">
        {items.map((p) => (
          <Card key={p.id} className="p-4 flex items-center gap-4">
            {p.cover_url && <img src={p.cover_url} alt="" className="h-14 w-14 rounded object-cover" />}
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{p.title}</div>
              <div className="text-xs text-muted-foreground">{p.tag} · {new Date(p.published_at).toLocaleDateString()} · {p.published ? "Published" : "Draft"}{p.pdf_url ? " · PDF" : ""}</div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
            <Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
          </Card>
        ))}
        {!items.length && <p className="text-muted-foreground text-sm">No posts yet.</p>}
      </div>
    </div>
  );
};

/* ---------------- Academy ---------------- */
const emptyCourse: Partial<Course> = { level: "Beginner", title: "", slug: "", lessons_label: "", description: "", body: "", cover_url: "", pdf_url: "", published: true, sort_order: 0 };

const AcademyManager = () => {
  const [items, setItems] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("academy_courses").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems((data ?? []) as Course[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title) return toast.error("Title required");
    setSaving(true);
    const slug = editing.slug || slugify(editing.title);
    const payload = { ...editing, slug, level: editing.level || null, lessons_label: editing.lessons_label || null, description: editing.description || null, body: editing.body || null, cover_url: editing.cover_url || null, pdf_url: editing.pdf_url || null };
    const { error } = editing.id
      ? await supabase.from("academy_courses").update(payload).eq("id", editing.id)
      : await supabase.from("academy_courses").insert(payload as any);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    const { error } = await supabase.from("academy_courses").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  if (editing) {
    return (
      <Card className="p-5 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><Label>Title</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div><Label>Level</Label><Input value={editing.level ?? ""} onChange={(e) => setEditing({ ...editing, level: e.target.value })} placeholder="Beginner / Pro..." /></div>
          <div><Label>Lessons label</Label><Input value={editing.lessons_label ?? ""} onChange={(e) => setEditing({ ...editing, lessons_label: e.target.value })} placeholder="12 lessons" /></div>
          <div><Label>Sort order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
          <div className="flex items-end gap-2"><Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
        </div>
        <div><Label>Short description</Label><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
        <div>
          <Label>Course content</Label>
          <RichTextEditor value={editing.body ?? ""} onChange={(html) => setEditing({ ...editing, body: html })} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FileField label="Cover image" accept="image/*" value={editing.cover_url ?? ""} folder="covers" onChange={(url) => setEditing({ ...editing, cover_url: url })} icon={<ImageIcon className="h-4 w-4" />} />
          <FileField label="PDF material" accept="application/pdf" value={editing.pdf_url ?? ""} folder="pdfs" onChange={(url) => setEditing({ ...editing, pdf_url: url })} icon={<FileText className="h-4 w-4" />} />
        </div>
        <div className="flex gap-2">
          <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setEditing(emptyCourse)}><Plus className="h-4 w-4 mr-1" />New course</Button>
      <div className="grid gap-3">
        {items.map((c) => (
          <Card key={c.id} className="p-4 flex items-center gap-4">
            {c.cover_url && <img src={c.cover_url} alt="" className="h-14 w-14 rounded object-cover" />}
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{c.title}</div>
              <div className="text-xs text-muted-foreground">{c.level} · {c.lessons_label} · {c.published ? "Published" : "Draft"}{c.pdf_url ? " · PDF" : ""}</div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setEditing(c)}><Pencil className="h-4 w-4" /></Button>
            <Button size="sm" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4" /></Button>
          </Card>
        ))}
        {!items.length && <p className="text-muted-foreground text-sm">No courses yet.</p>}
      </div>
    </div>
  );
};

/* ---------------- FAQ ---------------- */
const emptyFaq: Partial<Faq> = { question: "", answer: "", category: "", sort_order: 0, published: true };

const FaqManager = () => {
  const [items, setItems] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("faq_items").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems((data ?? []) as Faq[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.question || !editing?.answer) return toast.error("Question & answer required");
    setSaving(true);
    const payload = { ...editing, category: editing.category || null };
    const { error } = editing.id
      ? await supabase.from("faq_items").update(payload).eq("id", editing.id)
      : await supabase.from("faq_items").insert(payload as any);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    await supabase.from("faq_items").delete().eq("id", id);
    load();
  };

  if (editing) {
    return (
      <Card className="p-5 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><Label>Question</Label><Input value={editing.question ?? ""} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></div>
          <div><Label>Category</Label><Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
          <div><Label>Sort order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
          <div className="flex items-end gap-2"><Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
        </div>
        <div>
          <Label>Answer</Label>
          <RichTextEditor value={editing.answer ?? ""} onChange={(html) => setEditing({ ...editing, answer: html })} />
        </div>
        <div className="flex gap-2">
          <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setEditing(emptyFaq)}><Plus className="h-4 w-4 mr-1" />New FAQ</Button>
      <div className="grid gap-3">
        {items.map((f) => (
          <Card key={f.id} className="p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{f.question}</div>
              <div className="text-xs text-muted-foreground">{f.category ?? "—"} · {f.published ? "Published" : "Draft"}</div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setEditing(f)}><Pencil className="h-4 w-4" /></Button>
            <Button size="sm" variant="ghost" onClick={() => remove(f.id)}><Trash2 className="h-4 w-4" /></Button>
          </Card>
        ))}
        {!items.length && <p className="text-muted-foreground text-sm">No FAQs yet.</p>}
      </div>
    </div>
  );
};

/* ---------------- shared file field ---------------- */
const FileField = ({ label, accept, value, onChange, folder, icon }: { label: string; accept: string; value: string; onChange: (url: string) => void; folder: "covers" | "pdfs"; icon: React.ReactNode }) => {
  const [busy, setBusy] = useState(false);
  const upload = async (file: File) => {
    setBusy(true);
    try {
      const url = await uploadCmsFile(file, folder);
      onChange(url);
      toast.success(`${label} uploaded`);
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <Label className="flex items-center gap-1">{icon}{label}</Label>
      <div className="flex items-center gap-2">
        <Input type="file" accept={accept} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} disabled={busy} />
        {value && <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>Clear</Button>}
      </div>
      {value && <a href={value} target="_blank" rel="noreferrer" className="text-xs text-primary underline mt-1 inline-block truncate max-w-full">{value.split("/").pop()}</a>}
    </div>
  );
};

export default CmsManager;
