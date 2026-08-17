import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { RASQHY_TENANT_ID } from "./worksService";

export type TrackColorType = 'blue' | 'amber' | 'purple' | 'emerald' | 'rose' | 'cyan' | 'indigo';
export type TrackIconType = 'film' | 'audio' | 'sparkles' | 'palette' | 'camera' | 'music';

export interface TimelineTrackItem {
  id: string;
  track_key: string;
  name: string;
  color: TrackColorType;
  icon: TrackIconType;
  display_order: number;
}

export const defaultTimelineTracks: TimelineTrackItem[] = [
  { id: '1', track_key: 'V2', name: 'BTS', color: 'amber', icon: 'film', display_order: 1 },
  { id: '2', track_key: 'V1', name: 'MAIN', color: 'blue', icon: 'film', display_order: 2 },
  { id: '3', track_key: 'A1', name: 'AUD', color: 'emerald', icon: 'audio', display_order: 3 },
  { id: '4', track_key: 'A2', name: 'DIA', color: 'purple', icon: 'audio', display_order: 4 },
];

export interface TimelineEventItem {
  id: string | number;
  title: string;
  subtitle: string;
  period: string;
  desc: string;
  timecode: string;
  color: string;
  track: string;
  start_year: number;
  end_year?: number;
  is_featured: boolean;
  column_slot: number;
  colorClass: string;
  dotClass: string;
  glowClass: string;
  display_order?: number;
}

export const defaultTimelineEvents: TimelineEventItem[] = [
  // SEQ 01 (Col 1)
  {
    id: "1",
    title: "School Event Documentation",
    subtitle: "SMKN 53 Jakarta",
    period: "2023–2025",
    desc: "Mengabadikan berbagai momen, kegiatan, dan cerita dari kehidupan sekolah selama dua tahun.",
    timecode: "00:23:05:12",
    color: "amber",
    track: "V2",
    start_year: 2023,
    end_year: 2025,
    is_featured: true,
    column_slot: 1,
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20",
    display_order: 1
  },
  {
    id: "2",
    title: "Three Short Films",
    subtitle: "SMKN 53 Jakarta",
    period: "2023-2025",
    desc: "Tiga film pendek yang saya produksi dari tahap penulisan, penyutradaraan, hingga penyuntingan sebagai bagian dari perjalanan kreatif di SMKN 53 Jakarta.",
    timecode: "00:23:05:17",
    color: "blue",
    track: "V1",
    start_year: 2023,
    end_year: 2025,
    is_featured: true,
    column_slot: 1,
    colorClass: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    dotClass: "border-blue-500",
    glowClass: "bg-blue-500/20",
    display_order: 2
  },

  // SEQ 02 (Col 2)
  {
    id: "3",
    title: "Lokakarya Placemaker Muda",
    subtitle: "Kami Ruang Ketiga",
    period: "2025",
    desc: "Merekam perjalanan kolaboratif anak muda dalam memahami dan membentuk ruang di sekitarnya.",
    timecode: "00:25:00:00",
    color: "amber",
    track: "V2",
    start_year: 2025,
    end_year: 2025,
    is_featured: true,
    column_slot: 2,
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20",
    display_order: 3
  },
  {
    id: "4",
    title: "Talkshow Sal Priadi",
    subtitle: "KindShow",
    period: "2025",
    desc: "Mengolah footage talkshow menjadi video yang dinamis dengan menjaga alur, ritme, dan momen interaksi selama acara.",
    timecode: "00:25:00:00",
    color: "blue",
    track: "V1",
    start_year: 2025,
    end_year: 2025,
    is_featured: true,
    column_slot: 2,
    colorClass: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    dotClass: "border-blue-500",
    glowClass: "bg-blue-500/20",
    display_order: 4
  },
  {
    id: "5",
    title: "Behind The Scenes - Operasi Pesta Ccpet",
    subtitle: "Imajinari",
    period: "2025",
    desc: "Dokumentasi di balik proses produksi yang menangkap dinamika, momen, dan aktivitas selama proses shooting.",
    timecode: "00:25:00:00",
    color: "amber",
    track: "A1",
    start_year: 2025,
    end_year: 2025,
    is_featured: true,
    column_slot: 2,
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20",
    display_order: 5
  },

  // SEQ 03 (Col 3)
  {
    id: "6",
    title: "Gala Premiere Film - Andai Waktu Bisa Diulang Kembali",
    subtitle: "FMM Studios",
    period: "2026",
    desc: "Menangkap atmosfer gala premiere, dari momen kedatangan hingga perayaan film bersama para pemain dan tamu.",
    timecode: "00:25:00:00",
    color: "purple",
    track: "V2",
    start_year: 2025,
    end_year: 2025,
    is_featured: true,
    column_slot: 3,
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20",
    display_order: 6
  },
  {
    id: "7",
    title: "Editor Promosi Film - Andai Waktu Bisa Diulang Kembali",
    subtitle: "FMM Studios",
    period: "2026",
    desc: "Mengemas cerita dan identitas film ke dalam materi promosi visual yang menarik.",
    timecode: "00:25:00:00",
    color: "blue",
    track: "V1",
    start_year: 2025,
    end_year: 2025,
    is_featured: true,
    column_slot: 3,
    colorClass: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    dotClass: "border-blue-500",
    glowClass: "bg-blue-500/20",
    display_order: 7
  },
  {
    id: "8",
    title: "Screening & Discussion - SINILAH Batch #3",
    subtitle: "SINILAH",
    period: "2025",
    desc: "Merekam suasana pemutaran film dan dinamika diskusi yang mempertemukan karya, pembuat film, dan penonton.",
    timecode: "00:25:00:00",
    color: "amber",
    track: "A1",
    start_year: 2025,
    end_year: 2025,
    is_featured: true,
    column_slot: 3,
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20",
    display_order: 8
  },

  // SEQ 04 (Col 4)
  {
    id: "9",
    title: "Gala Premiere Film - Teman Tegar Maira",
    subtitle: "Aksa Bumi Langit",
    period: "2026",
    desc: "Dokumentasi visual yang menangkap momen, interaksi, dan suasana acara.",
    timecode: "00:26:00:00",
    color: "purple",
    track: "V2",
    start_year: 2026,
    end_year: 2026,
    is_featured: true,
    column_slot: 4,
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20",
    display_order: 9
  },
  {
    id: "10",
    title: "Travel Documentation — Pelepasan Tunas Harapan",
    subtitle: "Pesona Mahardika",
    period: "2026",
    desc: "Mengabadikan perjalanan, momen kebersamaan, dan cerita di sepanjang rangkaian kegiatan.",
    timecode: "00:26:02:11",
    color: "purple",
    track: "V1",
    start_year: 2026,
    end_year: 2026,
    is_featured: true,
    column_slot: 4,
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20",
    display_order: 10
  },
  {
    id: "11",
    title: "Hammer Fight Series 3",
    subtitle: "Muh Ismail Said",
    period: "2026",
    desc: "Menangkap intensitas pertandingan dan atmosfer arena melalui dokumentasi visual yang dinamis.",
    timecode: "00:25:00:00",
    color: "purple",
    track: "A1",
    start_year: 2026,
    end_year: 2026,
    is_featured: true,
    column_slot: 4,
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20",
    display_order: 11
  },
  {
    id: "12",
    title: "Video Angkatan - 3 Years We Are Together",
    subtitle: "SMKN 53 Jakarta",
    period: "2026",
    desc: "Sebuah perjalanan visual yang merangkum tiga tahun kebersamaan, dari awal mengenal hingga akhirnya berpisah sebagai satu angkatan.",
    timecode: "00:25:00:00",
    color: "purple",
    track: "A2",
    start_year: 2026,
    end_year: 2026,
    is_featured: true,
    column_slot: 4,
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20",
    display_order: 12
  },
  {
    id: "13",
    title: "Jakarta Boxing Open Vol. 5",
    subtitle: "Egi Rozten",
    period: "2026",
    desc: "Merekam intensitas pertandingan, momen pertarungan, dan atmosfer kompetisi di atas ring.",
    timecode: "00:25:00:00",
    color: "purple",
    track: "A3",
    start_year: 2026,
    end_year: 2026,
    is_featured: true,
    column_slot: 4,
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20",
    display_order: 13
  }
];

export function getTimelineColorClasses(color: string) {
  switch (color) {
    case 'amber':
      return { colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10", dotClass: "border-amber-500", glowClass: "bg-amber-500/20" };
    case 'purple':
      return { colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10", dotClass: "border-purple-500", glowClass: "bg-purple-500/20" };
    case 'emerald':
      return { colorClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", dotClass: "border-emerald-500", glowClass: "bg-emerald-500/20" };
    case 'rose':
      return { colorClass: "text-rose-400 border-rose-500/30 bg-rose-500/10", dotClass: "border-rose-500", glowClass: "bg-rose-500/20" };
    case 'cyan':
      return { colorClass: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10", dotClass: "border-cyan-500", glowClass: "bg-cyan-500/20" };
    case 'indigo':
      return { colorClass: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10", dotClass: "border-indigo-500", glowClass: "bg-indigo-500/20" };
    case 'blue':
    default:
      return { colorClass: "text-blue-400 border-blue-500/30 bg-blue-500/10", dotClass: "border-blue-500", glowClass: "bg-blue-500/20" };
  }
}

export function getColStartClass(startYear: number, columnSlot?: number): string {
  const col = columnSlot || Math.max(1, Math.min(4, startYear - 2022));
  switch (col) {
    case 1: return "col-start-1";
    case 2: return "col-start-2";
    case 3: return "col-start-3";
    case 4: return "col-start-4";
    default: return "col-start-1";
  }
}

export function getColSpanClass(startYear: number, endYear?: number, columnSlot?: number): string {
  if (columnSlot) return "col-span-1";
  const startCol = Math.max(1, Math.min(4, startYear - 2022));
  const endCol = Math.max(startCol, Math.min(4, (endYear || startYear) - 2022));
  const span = Math.max(1, Math.min(4 - startCol + 1, endCol - startCol + 1));
  switch (span) {
    case 1: return "col-span-1";
    case 2: return "col-span-2";
    case 3: return "col-span-3";
    case 4: return "col-span-4";
    default: return "col-span-1";
  }
}

export function getClipStyle(color: string, isActive: boolean): string {
  switch (color) {
    case 'amber':
      return isActive
        ? "bg-amber-500/30 border border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-[0.98]"
        : "bg-amber-950/20 border border-amber-500/10 text-amber-400 hover:bg-amber-950/30";
    case 'purple':
      return isActive
        ? "bg-purple-500/30 border border-purple-500 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)] scale-[0.98]"
        : "bg-purple-950/20 border border-purple-500/10 text-purple-400 hover:bg-purple-950/30";
    case 'emerald':
      return isActive
        ? "bg-emerald-500/30 border border-emerald-500 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-[0.98]"
        : "bg-emerald-950/20 border border-emerald-500/10 text-emerald-400 hover:bg-emerald-950/30";
    case 'rose':
      return isActive
        ? "bg-rose-500/30 border border-rose-500 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)] scale-[0.98]"
        : "bg-rose-950/20 border border-rose-500/10 text-rose-400 hover:bg-rose-950/30";
    case 'cyan':
      return isActive
        ? "bg-cyan-500/30 border border-cyan-500 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-[0.98]"
        : "bg-cyan-950/20 border border-cyan-500/10 text-cyan-400 hover:bg-cyan-950/30";
    case 'indigo':
      return isActive
        ? "bg-indigo-500/30 border border-indigo-500 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.3)] scale-[0.98]"
        : "bg-indigo-950/20 border border-indigo-500/10 text-indigo-400 hover:bg-indigo-950/30";
    case 'blue':
    default:
      return isActive
        ? "bg-blue-500/30 border border-blue-500 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.3)] scale-[0.98]"
        : "bg-blue-950/20 border border-blue-500/10 text-blue-400 hover:bg-blue-950/30";
  }
}

/**
 * Maps DB timeline row to frontend TimelineEventItem structure.
 */
export function mapDbToTimelineEvent(row: any): TimelineEventItem {
  const color = (row.color || 'blue') as 'blue' | 'amber' | 'purple';
  const colorStyles = getTimelineColorClasses(color);

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    period: row.period,
    desc: row.description || "",
    timecode: row.timecode || "00:25:00:00",
    color,
    track: row.track || 'V1',
    start_year: row.start_year || 2025,
    end_year: row.end_year || row.start_year || 2025,
    is_featured: row.is_featured !== undefined ? row.is_featured : true,
    column_slot: row.column_slot || 1,
    colorClass: colorStyles.colorClass,
    dotClass: colorStyles.dotClass,
    glowClass: colorStyles.glowClass,
    display_order: row.display_order || 0
  };
}

/**
 * Fetches all timeline sequence events from Supabase DB.
 * Falls back to defaultTimelineEvents if offline or unconfigured.
 */
export async function fetchTimelineEvents(): Promise<TimelineEventItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultTimelineEvents;
  }

  try {
    const { data, error } = await supabase
      .from("timeline_events")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      console.info("[TimelineService] Supabase returned empty or error, falling back to default timeline events.", error);
      return defaultTimelineEvents;
    }

    return data.map((item: any) => mapDbToTimelineEvent(item));
  } catch (err) {
    console.error("[TimelineService] Error fetching timeline events from Supabase:", err);
    return defaultTimelineEvents;
  }
}

export function normalizeDbColor(color?: string): 'blue' | 'amber' | 'purple' {
  if (color === 'amber') return 'amber';
  if (color === 'purple' || color === 'indigo' || color === 'rose') return 'purple';
  return 'blue';
}

/**
 * Creates a new timeline event clip in Supabase.
 */
export async function createTimelineEvent(item: {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  timecode: string;
  color: string;
  track: string;
  start_year: number;
  end_year?: number;
  is_featured?: boolean;
  column_slot?: number;
  display_order?: number;
}) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const safeColor = normalizeDbColor(item.color);

  const { data, error } = await supabase
    .from("timeline_events")
    .insert({
      tenant_id: RASQHY_TENANT_ID,
      title: item.title,
      subtitle: item.subtitle,
      period: item.period,
      description: item.description,
      timecode: item.timecode || "00:25:00:00",
      color: safeColor,
      track: item.track,
      start_year: item.start_year,
      end_year: item.end_year || item.start_year,
      is_featured: item.is_featured !== undefined ? item.is_featured : true,
      column_slot: item.column_slot || 1,
      display_order: item.display_order || 0
    })
    .select()
    .single();

  if (error) throw error;
  return mapDbToTimelineEvent(data);
}

/**
 * Updates an existing timeline event clip in Supabase.
 */
export async function updateTimelineEvent(
  id: string | number,
  item: Partial<{
    title: string;
    subtitle: string;
    period: string;
    description: string;
    timecode: string;
    color: string;
    track: string;
    start_year: number;
    end_year: number;
    is_featured: boolean;
    column_slot: number;
    display_order: number;
  }>
) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const updatePayload: any = { ...item, updated_at: new Date().toISOString() };
  if (item.color !== undefined) {
    updatePayload.color = normalizeDbColor(item.color);
  }

  const { data, error } = await supabase
    .from("timeline_events")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapDbToTimelineEvent(data);
}

/**
 * Deletes a timeline event clip from Supabase.
 */
export async function deleteTimelineEvent(id: string | number) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("timeline_events")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

/**
 * Fetches all track layers from Supabase.
 */
export async function fetchTimelineTracks(): Promise<TimelineTrackItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultTimelineTracks;
  }

  try {
    const { data, error } = await supabase
      .from("timeline_tracks")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultTimelineTracks;
    }

    return data.map((t: any) => ({
      id: t.id,
      track_key: t.track_key,
      name: t.name,
      color: t.color || 'blue',
      icon: t.icon || 'film',
      display_order: t.display_order || 0
    }));
  } catch (err) {
    console.error("[TimelineService] Error fetching tracks:", err);
    return defaultTimelineTracks;
  }
}

/**
 * Creates a new track layer in Supabase.
 */
export async function createTimelineTrack(track: {
  track_key: string;
  name: string;
  color: TrackColorType;
  icon: TrackIconType;
  display_order?: number;
}) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("timeline_tracks")
    .insert({
      tenant_id: RASQHY_TENANT_ID,
      track_key: track.track_key.toUpperCase(),
      name: track.name.toUpperCase(),
      color: track.color,
      icon: track.icon,
      display_order: track.display_order || 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Updates an existing track layer in Supabase.
 */
export async function updateTimelineTrack(
  id: string,
  track: Partial<{
    track_key: string;
    name: string;
    color: TrackColorType;
    icon: TrackIconType;
    display_order: number;
  }>
) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("timeline_tracks")
    .update({ ...track, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Deletes a track layer from Supabase.
 */
export async function deleteTimelineTrack(id: string) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("timeline_tracks")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}
