import { supabase } from "@/integrations/supabase/client";

export const uploadCmsFile = async (file: File, folder: "covers" | "pdfs"): Promise<string> => {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("cms-media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
  return data.publicUrl;
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80) || crypto.randomUUID().slice(0, 8);
