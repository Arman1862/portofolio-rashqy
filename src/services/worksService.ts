import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { works as staticWorks, type WorkItem } from "../data/works";
import { parseMediaUrl } from "../utils/driveParser";

export const RASQHY_TENANT_SLUG = "rasqhy";
export const RASQHY_TENANT_ID = "a1b2c3d4-e5f6-7890-abcd-111111111111";

export interface DbWorkItem {
  id: string | number;
  tenant_id?: string;
  title: string;
  category: 'film' | 'editing' | 'photo';
  role: string;
  thumbnail_url: string;
  media_url?: string;
  description?: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Maps DB work item row to frontend WorkItem structure with Google Drive / YT parsed media URLs.
 */
export function mapDbToWorkItem(row: DbWorkItem): WorkItem {
  const parsed = parseMediaUrl(row.media_url || "", row.thumbnail_url || "");
  return {
    id: typeof row.id === "number" ? row.id : row.id as any,
    title: row.title,
    category: row.category,
    role: row.role,
    thumbnail: parsed.thumbnailUrl || row.thumbnail_url,
    videoUrl: parsed.videoUrl || row.media_url,
    desc: row.description || ""
  };
}

/**
 * Fetches all portfolio works for Rasqhy dynamically from Supabase DB.
 * Falls back to static works if Supabase is offline/unconfigured.
 */
export async function fetchWorks(): Promise<WorkItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return staticWorks;
  }

  try {
    // 1. Get tenant ID for rasqhy if needed, or query portfolio_works directly
    const { data, error } = await supabase
      .from("portfolio_works")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.info("[WorksService] Supabase returned empty or error, falling back to static works.", error);
      return staticWorks;
    }

    return data.map((item: DbWorkItem) => mapDbToWorkItem(item));
  } catch (err) {
    console.error("[WorksService] Error fetching works from Supabase:", err);
    return staticWorks;
  }
}

/**
 * Creates a new portfolio work item in Supabase.
 */
export async function createWork(item: {
  title: string;
  category: 'film' | 'editing' | 'photo';
  role: string;
  thumbnail_url: string;
  media_url?: string;
  description?: string;
  display_order?: number;
}) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const parsed = parseMediaUrl(item.media_url || "", item.thumbnail_url || "");

  const { data, error } = await supabase
    .from("portfolio_works")
    .insert({
      tenant_id: RASQHY_TENANT_ID,
      title: item.title,
      category: item.category,
      role: item.role,
      thumbnail_url: parsed.thumbnailUrl || item.thumbnail_url,
      media_url: parsed.videoUrl || item.media_url,
      description: item.description || "",
      display_order: item.display_order || 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Updates an existing portfolio work item in Supabase.
 */
export async function updateWork(
  id: string | number,
  item: Partial<{
    title: string;
    category: 'film' | 'editing' | 'photo';
    role: string;
    thumbnail_url: string;
    media_url: string;
    description: string;
    display_order: number;
  }>
) {
  if (!supabase) throw new Error("Supabase is not configured.");

  let updatePayload: any = { ...item };

  if (item.media_url || item.thumbnail_url) {
    const parsed = parseMediaUrl(item.media_url || "", item.thumbnail_url || "");
    if (item.thumbnail_url) updatePayload.thumbnail_url = parsed.thumbnailUrl || item.thumbnail_url;
    if (item.media_url) updatePayload.media_url = parsed.videoUrl || item.media_url;
  }

  updatePayload.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("portfolio_works")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Deletes a portfolio work item from Supabase.
 */
export async function deleteWork(id: string | number) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("portfolio_works")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}
