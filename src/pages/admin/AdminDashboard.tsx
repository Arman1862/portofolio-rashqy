import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import {
  fetchWorks,
  createWork,
  updateWork,
  deleteWork
} from "../../services/worksService";
import {
  fetchTimelineEvents,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
  type TimelineEventItem
} from "../../services/timelineService";
import { parseMediaUrl } from "../../utils/driveParser";
import {
  Film,
  Scissors,
  Camera,
  Plus,
  Trash2,
  Edit,
  LogOut,
  RefreshCw,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowLeft,
  Sliders,
  Layers,
  Calendar,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { WorkItem } from "../../data/works";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'works' | 'timeline'>('works');

  // Works State
  const [worksList, setWorksList] = useState<WorkItem[]>([]);
  const [loadingWorks, setLoadingWorks] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'film' | 'editing' | 'photo'>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<WorkItem | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  // Works Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<'film' | 'editing' | 'photo'>("film");
  const [role, setRole] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");

  // Timeline State
  const [timelineList, setTimelineList] = useState<TimelineEventItem[]>([]);
  const [loadingTimeline, setLoadingTimeline] = useState<boolean>(true);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState<boolean>(false);
  const [editingTimelineItem, setEditingTimelineItem] = useState<TimelineEventItem | null>(null);
  const [savingTimeline, setSavingTimeline] = useState<boolean>(false);
  const [deletingTimelineId, setDeletingTimelineId] = useState<string | number | null>(null);

  // Timeline Form Fields
  const [tTitle, setTTitle] = useState("");
  const [tSubtitle, setTSubtitle] = useState("");
  const [tPeriod, setTPeriod] = useState("");
  const [tTimecode, setTTimecode] = useState("00:25:00:00");
  const [tColor, setTColor] = useState<'blue' | 'amber' | 'purple'>("blue");
  const [tTrack, setTTrack] = useState<'V2' | 'V1' | 'A1' | 'A2'>("V1");
  const [tStartYear, setTStartYear] = useState<number>(2025);
  const [tEndYear, setTEndYear] = useState<number>(2025);
  const [tDescription, setTDescription] = useState("");

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Check auth session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingWorks(false);
      setLoadingTimeline(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserEmail(session.user.email || "Admin");
      } else {
        navigate("/admin/login");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || "Admin");
      } else {
        setUserEmail(null);
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Load works
  const loadWorksData = async () => {
    setLoadingWorks(true);
    try {
      const data = await fetchWorks();
      setWorksList(data);
    } catch (err: any) {
      showToast('error', 'Gagal memuat data karya dari database');
    } finally {
      setLoadingWorks(false);
    }
  };

  // Load timeline
  const loadTimelineData = async () => {
    setLoadingTimeline(true);
    try {
      const data = await fetchTimelineEvents();
      setTimelineList(data);
    } catch (err: any) {
      showToast('error', 'Gagal memuat sequence timeline dari database');
    } finally {
      setLoadingTimeline(false);
    }
  };

  useEffect(() => {
    loadWorksData();
    loadTimelineData();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- WORKS HANDLERS ---
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("film");
    setRole("");
    setMediaUrl("");
    setThumbnailUrl("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: WorkItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setRole(item.role);
    setMediaUrl(item.videoUrl || "");
    setThumbnailUrl(item.thumbnail || "");
    setDescription(item.desc || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !role) {
      showToast('error', 'Judul dan Role wajib diisi.');
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        await updateWork(editingItem.id, {
          title,
          category,
          role,
          media_url: mediaUrl,
          thumbnail_url: thumbnailUrl,
          description
        });
        showToast('success', 'Karya berhasil diperbarui!');
      } else {
        await createWork({
          title,
          category,
          role,
          media_url: mediaUrl,
          thumbnail_url: thumbnailUrl,
          description,
          display_order: worksList.length + 1
        });
        showToast('success', 'Karya baru berhasil ditambahkan!');
      }

      setIsModalOpen(false);
      loadWorksData();
    } catch (err: any) {
      console.error(err);
      showToast('error', err.message || 'Gagal menyimpan karya.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus karya ini?")) return;

    setDeletingId(id);
    try {
      await deleteWork(id);
      showToast('success', 'Karya berhasil dihapus!');
      loadWorksData();
    } catch (err: any) {
      console.error(err);
      showToast('error', err.message || 'Gagal menghapus karya.');
    } finally {
      setDeletingId(null);
    }
  };

  // --- TIMELINE HANDLERS ---
  const handleOpenAddTimelineModal = () => {
    setEditingTimelineItem(null);
    setTTitle("");
    setTSubtitle("");
    setTPeriod("2025");
    setTTimecode("00:25:00:00");
    setTColor("blue");
    setTTrack("V1");
    setTStartYear(2025);
    setTEndYear(2025);
    setTDescription("");
    setIsTimelineModalOpen(true);
  };

  const handleOpenEditTimelineModal = (item: TimelineEventItem) => {
    setEditingTimelineItem(item);
    setTTitle(item.title);
    setTSubtitle(item.subtitle);
    setTPeriod(item.period);
    setTTimecode(item.timecode);
    setTColor(item.color);
    setTTrack(item.track);
    setTStartYear(item.start_year);
    setTEndYear(item.end_year || item.start_year);
    setTDescription(item.desc);
    setIsTimelineModalOpen(true);
  };

  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tTitle || !tSubtitle) {
      showToast('error', 'Judul dan Subtitle (Klien/Organisasi) wajib diisi.');
      return;
    }

    setSavingTimeline(true);
    try {
      if (editingTimelineItem) {
        await updateTimelineEvent(editingTimelineItem.id, {
          title: tTitle,
          subtitle: tSubtitle,
          period: tPeriod,
          timecode: tTimecode,
          color: tColor,
          track: tTrack,
          start_year: tStartYear,
          end_year: tEndYear,
          description: tDescription
        });
        showToast('success', 'Timeline clip berhasil diperbarui!');
      } else {
        await createTimelineEvent({
          title: tTitle,
          subtitle: tSubtitle,
          period: tPeriod,
          timecode: tTimecode,
          color: tColor,
          track: tTrack,
          start_year: tStartYear,
          end_year: tEndYear,
          description: tDescription,
          display_order: timelineList.length + 1
        });
        showToast('success', 'Timeline clip baru berhasil ditambahkan!');
      }

      setIsTimelineModalOpen(false);
      loadTimelineData();
    } catch (err: any) {
      console.error(err);
      showToast('error', err.message || 'Gagal menyimpan timeline clip.');
    } finally {
      setSavingTimeline(false);
    }
  };

  const handleDeleteTimeline = async (id: string | number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus timeline clip ini?")) return;

    setDeletingTimelineId(id);
    try {
      await deleteTimelineEvent(id);
      showToast('success', 'Timeline clip berhasil dihapus!');
      loadTimelineData();
    } catch (err: any) {
      console.error(err);
      showToast('error', err.message || 'Gagal menghapus timeline clip.');
    } finally {
      setDeletingTimelineId(null);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate("/admin/login");
  };

  // Filtered works list
  const filteredWorks = activeCategory === 'all'
    ? worksList
    : worksList.filter((w) => w.category === activeCategory);

  // Live Drive / YT Parser preview for form
  const parsedPreview = parseMediaUrl(mediaUrl, thumbnailUrl);

  return (
    <div className="min-h-screen bg-neutral-950 text-foreground relative bg-dot-pattern font-sans pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-xl ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300'
                : 'bg-red-950/90 border-red-500/30 text-red-300'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            title="Ke Website Publik"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-heading text-white">Raski Dashboard Admin</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold">
                W4U Tenant
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Kelola Portfolio, Film, Video Editing & Timeline Sequence</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userEmail ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400 hidden sm:inline">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/admin/login")}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Main Tab Navigation Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900/80 border border-white/10 p-2 rounded-2xl">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('works')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'works'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film size={16} />
              <span>Karya Portfolio ({worksList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers size={16} />
              <span>Sequence Timeline Editor ({timelineList.length})</span>
            </button>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            {activeTab === 'works' ? (
              <button
                onClick={handleOpenAddModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Plus size={16} />
                <span>Tambah Karya Baru</span>
              </button>
            ) : (
              <button
                onClick={handleOpenAddTimelineModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
              >
                <Plus size={16} />
                <span>Tambah Timeline Clip</span>
              </button>
            )}
          </div>
        </div>

        {/* --- TAB 1: KARYA PORTFOLIO --- */}
        {activeTab === 'works' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                    : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
                }`}
              >
                Semua Karya ({worksList.length})
              </button>
              <button
                onClick={() => setActiveCategory('film')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'film'
                    ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                    : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
                }`}
              >
                <Film size={14} />
                Films ({worksList.filter((w) => w.category === 'film').length})
              </button>
              <button
                onClick={() => setActiveCategory('editing')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'editing'
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                    : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
                }`}
              >
                <Scissors size={14} />
                Video Editing ({worksList.filter((w) => w.category === 'editing').length})
              </button>
              <button
                onClick={() => setActiveCategory('photo')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'photo'
                    ? 'bg-purple-500/20 border border-purple-500/40 text-purple-400'
                    : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
                }`}
              >
                <Camera size={14} />
                Photography ({worksList.filter((w) => w.category === 'photo').length})
              </button>
            </div>

            {/* Works List Grid */}
            {loadingWorks ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-xs text-gray-400 font-mono">Memuat karya dari Supabase W4U database...</p>
              </div>
            ) : filteredWorks.length === 0 ? (
              <div className="py-20 border border-dashed border-white/10 rounded-2xl text-center space-y-4 bg-neutral-900/30">
                <Film className="w-12 h-12 text-gray-600 mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-white">Belum Ada Karya di Kategori Ini</h3>
                  <p className="text-xs text-gray-400 mt-1">Klik "Tambah Karya Baru" di atas untuk memasukkan data karya.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorks.map((work) => {
                  const mediaMeta = parseMediaUrl(work.videoUrl || "", work.thumbnail);
                  return (
                    <motion.div
                      key={work.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-white/20 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video bg-neutral-950 overflow-hidden border-b border-white/5">
                          <img
                            src={mediaMeta.thumbnailUrl}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/80 border border-white/10 text-[10px] font-bold text-white backdrop-blur-md uppercase font-mono">
                            {work.category === 'film' && <Film size={12} className="text-blue-400" />}
                            {work.category === 'editing' && <Scissors size={12} className="text-amber-400" />}
                            {work.category === 'photo' && <Camera size={12} className="text-purple-400" />}
                            <span>{work.category}</span>
                          </div>

                          {mediaMeta.isYoutube && (
                            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-red-600/90 text-[9px] font-bold text-white font-mono flex items-center gap-1">
                              <Play size={10} fill="currentColor" />
                              <span>YouTube</span>
                            </div>
                          )}
                          {mediaMeta.isDrive && (
                            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-blue-600/90 text-[9px] font-bold text-white font-mono">
                              Google Drive
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-2">
                          <h3 className="text-base font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                            {work.title}
                          </h3>
                          <p className="text-xs font-semibold text-blue-400/90 font-mono">
                            Role: {work.role}
                          </p>
                          {work.desc && (
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                              {work.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="px-5 py-4 bg-neutral-950/60 border-t border-white/5 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(work)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(work.id)}
                          disabled={deletingId === work.id}
                          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {deletingId === work.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                          <span>Hapus</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: SEQUENCE TIMELINE EDITOR --- */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* Visual Header Banner */}
            <div className="bg-neutral-900/60 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders size={18} className="text-amber-400" />
                  <span>Premiere Pro NLE Sequence Timeline Events</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Kelola event klip yang muncul di timeline visual beranda (`Home.tsx`). Klip diatur berdasarkan Layer Track (`V2: BTS`, `V1: MAIN`, `A1: AUD`, `A2: DIA`) dan span tahun (`2023–2026`).
                </p>
              </div>

              <button
                onClick={loadTimelineData}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2 self-start md:self-auto cursor-pointer"
              >
                <RefreshCw size={14} className={loadingTimeline ? "animate-spin" : ""} />
                <span>Refresh Timeline</span>
              </button>
            </div>

            {/* Timeline Events List Grouped by Track */}
            {loadingTimeline ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                <p className="text-xs text-gray-400 font-mono">Memuat sequence timeline dari Supabase W4U database...</p>
              </div>
            ) : timelineList.length === 0 ? (
              <div className="py-20 border border-dashed border-white/10 rounded-2xl text-center space-y-4 bg-neutral-900/30">
                <Layers className="w-12 h-12 text-gray-600 mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-white">Belum Ada Timeline Clip</h3>
                  <p className="text-xs text-gray-400 mt-1">Klik "Tambah Timeline Clip" di atas untuk menambahkan event timeline.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {(['V2', 'V1', 'A1', 'A2'] as const).map((trackName) => {
                  const trackClips = timelineList.filter((t) => t.track === trackName);
                  let trackTitle = "Track V1: MAIN (Primary Video)";
                  let trackColorClass = "border-blue-500/30 text-blue-400 bg-blue-500/10";
                  if (trackName === 'V2') {
                    trackTitle = "Track V2: BTS (Behind The Scenes & Secondary)";
                    trackColorClass = "border-amber-500/30 text-amber-400 bg-amber-500/10";
                  } else if (trackName === 'A1') {
                    trackTitle = "Track A1: AUD (Audio & Workshop Docs)";
                    trackColorClass = "border-emerald-500/30 text-emerald-400 bg-emerald-500/10";
                  } else if (trackName === 'A2') {
                    trackTitle = "Track A2: DIA (Discussion & Dialogue)";
                    trackColorClass = "border-purple-500/30 text-purple-400 bg-purple-500/10";
                  }

                  return (
                    <div key={trackName} className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${trackColorClass}`}>
                          {trackTitle} ({trackClips.length})
                        </span>
                      </div>

                      {trackClips.length === 0 ? (
                        <div className="p-4 border border-white/5 rounded-xl text-center text-xs text-gray-500 font-mono bg-neutral-900/20">
                          Tidak ada clip di {trackName}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {trackClips.map((item) => (
                            <div
                              key={item.id}
                              className="bg-neutral-900/80 border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="text-sm font-bold text-white leading-tight">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                                      {item.subtitle}
                                    </p>
                                  </div>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${item.colorClass}`}>
                                    {item.color.toUpperCase()}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4 text-[11px] font-mono text-gray-400 pt-1 border-t border-white/5">
                                  <span className="flex items-center gap-1">
                                    <Calendar size={12} className="text-blue-400" />
                                    {item.period} ({item.start_year}{item.end_year && item.end_year !== item.start_year ? `–${item.end_year}` : ''})
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={12} className="text-amber-400" />
                                    {item.timecode}
                                  </span>
                                </div>

                                {item.desc && (
                                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed pt-1">
                                    {item.desc}
                                  </p>
                                )}
                              </div>

                              <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditTimelineModal(item)}
                                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} />
                                  <span>Edit Clip</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteTimeline(item.id)}
                                  disabled={deletingTimelineId === item.id}
                                  className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  {deletingTimelineId === item.id ? (
                                    <RefreshCw size={14} className="animate-spin" />
                                  ) : (
                                    <Trash2 size={14} />
                                  )}
                                  <span>Hapus</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- MODAL 1: FORM TAMBAH / EDIT KARYA PORTFOLIO --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">
                    {editingItem ? "Edit Karya Portfolio" : "Tambah Karya Baru"}
                  </h2>
                  <p className="text-xs text-gray-400">Isi detail projek & tempel link Google Drive atau YouTube</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Judul Karya / Projek *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: School Event Documentation / Operasi Pesta Pora"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="film">Film (Videografi / Doc)</option>
                      <option value="editing">Video Editing</option>
                      <option value="photo">Photography</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Role / Peran *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Director / Editor / BTS Photographer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Media URL Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Media URL (Google Drive / YouTube) *</label>
                  <input
                    type="text"
                    placeholder="https://drive.google.com/file/d/.../view ATAU https://youtu.be/..."
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                  <p className="text-[11px] text-gray-400">
                    Tempel link share Google Drive atau YouTube di sini. Sistem akan otomatis memprosesnya menjadi link embed player & thumbnail CDN.
                  </p>
                </div>

                {/* Thumbnail Override */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Thumbnail URL (Opsional / Override)</label>
                  <input
                    type="text"
                    placeholder="Biarkan kosong jika memakai thumbnail otomatis Drive/YouTube"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>

                {/* Live Parser Feedback */}
                {mediaUrl && (
                  <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                      <CheckCircle2 size={14} />
                      <span>Link Parser Verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {parsedPreview.thumbnailUrl && (
                        <img
                          src={parsedPreview.thumbnailUrl}
                          alt="Preview"
                          className="w-24 aspect-video object-cover rounded-lg border border-white/10 shrink-0"
                        />
                      )}
                      <div className="text-[11px] space-y-1 overflow-hidden font-mono text-gray-300">
                        <p className="truncate"><strong>Embed URL:</strong> {parsedPreview.videoUrl}</p>
                        <p className="truncate"><strong>Thumbnail URL:</strong> {parsedPreview.thumbnailUrl}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Deskripsi Karya</label>
                  <textarea
                    rows={3}
                    placeholder="Deskripsi singkat mengenai alur cerita, proses pembuatan, atau apresiasi karya..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Simpan Karya</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: FORM TAMBAH / EDIT SEQUENCE TIMELINE CLIP --- */}
      <AnimatePresence>
        {isTimelineModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">
                    {editingTimelineItem ? "Edit Timeline Clip" : "Tambah Timeline Clip Baru"}
                  </h2>
                  <p className="text-xs text-gray-400">Atur posisi clip, track layer, timecode, dan warna aksen di sequence timeline</p>
                </div>
                <button
                  onClick={() => setIsTimelineModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveTimeline} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Judul Project *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: School Event Documentation"
                      value={tTitle}
                      onChange={(e) => setTTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Subtitle / Klien / Organisasi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: SMKN 53 Jakarta / Imajinari"
                      value={tSubtitle}
                      onChange={(e) => setTSubtitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Tahun Mulai Grid *</label>
                    <select
                      value={tStartYear}
                      onChange={(e) => {
                        const newStart = parseInt(e.target.value);
                        setTStartYear(newStart);
                        if (tEndYear < newStart) setTEndYear(newStart);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    >
                      <option value={2023}>2023 (Kolom 1)</option>
                      <option value={2024}>2024 (Kolom 2)</option>
                      <option value={2025}>2025 (Kolom 3)</option>
                      <option value={2026}>2026 (Kolom 4)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Tahun Selesai Grid *</label>
                    <select
                      value={tEndYear}
                      onChange={(e) => {
                        const newEnd = parseInt(e.target.value);
                        if (newEnd >= tStartYear) setTEndYear(newEnd);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    >
                      {[2023, 2024, 2025, 2026].filter(y => y >= tStartYear).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Teks Periode *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 2023–2025"
                      value={tPeriod}
                      onChange={(e) => setTPeriod(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                      <span>Track Layer (Posisi Timeline) *</span>
                      <span className="text-[10px] font-mono text-blue-400">Status Tahun {tStartYear}{tEndYear !== tStartYear ? `–${tEndYear}` : ''}</span>
                    </label>
                    <select
                      value={tTrack}
                      onChange={(e) => setTTrack(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      {[
                        { value: 'V1', name: 'Video Layer 1 (V1 - Utama)' },
                        { value: 'V2', name: 'Video Layer 2 (V2 - BTS / Special)' },
                        { value: 'A1', name: 'Audio Layer 1 (A1 - Workshop / Audio)' },
                        { value: 'A2', name: 'Audio Layer 2 (A2 - Dialogue / Discussion)' }
                      ].map((tr) => {
                        const occupyingClip = timelineList.find((item) => {
                          if (editingTimelineItem && String(item.id) === String(editingTimelineItem.id)) return false;
                          if (item.track !== tr.value) return false;
                          const itemEnd = item.end_year || item.start_year;
                          return item.start_year <= tEndYear && itemEnd >= tStartYear;
                        });

                        const statusText = occupyingClip
                          ? `(Terpakai oleh: "${occupyingClip.title.substring(0, 20)}...")`
                          : `(Tersedia)`;

                        return (
                          <option key={tr.value} value={tr.value}>
                            {tr.name} {statusText}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Warna Aksen *</label>
                    <select
                      value={tColor}
                      onChange={(e) => setTColor(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="blue">Blue (V1 Main)</option>
                      <option value="amber">Amber (BTS / Audio)</option>
                      <option value="purple">Purple (Premiere / Special)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Timecode *</label>
                  <input
                    type="text"
                    required
                    placeholder="00:23:05:12"
                    value={tTimecode}
                    onChange={(e) => setTTimecode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Deskripsi Clip</label>
                  <textarea
                    rows={3}
                    placeholder="Deskripsi singkat mengenai aktivitas dokumentasi..."
                    value={tDescription}
                    onChange={(e) => setTDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTimelineModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={savingTimeline}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
                  >
                    {savingTimeline ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Simpan Timeline Clip</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
