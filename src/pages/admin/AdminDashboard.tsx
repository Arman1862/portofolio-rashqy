import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import {
  fetchWorks,
  createWork,
  updateWork,
  deleteWork
} from "../../services/worksService";
import { parseMediaUrl, extractDriveFileId, extractYouTubeId } from "../../utils/driveParser";
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
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { WorkItem } from "../../data/works";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [worksList, setWorksList] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'film' | 'editing' | 'photo'>('all');
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<WorkItem | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<'film' | 'editing' | 'photo'>("film");
  const [role, setRole] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Check auth session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
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
    setLoading(true);
    try {
      const data = await fetchWorks();
      setWorksList(data);
    } catch (err: any) {
      showToast('error', 'Gagal memuat data karya dari database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorksData();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

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
        // Update existing work
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
        // Create new work
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

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate("/admin/login");
  };

  // Filtered list
  const filteredWorks = activeCategory === 'all'
    ? worksList
    : worksList.filter((w) => w.category === activeCategory);

  // Live Drive / YT Parser preview for form
  const parsedPreview = parseMediaUrl(mediaUrl, thumbnailUrl);
  const driveId = extractDriveFileId(mediaUrl);
  const ytId = extractYouTubeId(mediaUrl);

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
            <p className="text-xs text-muted-foreground">Kelola Projek, Film, Video Editing & Google Drive</p>
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
        
        {/* Top Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900/60 border border-white/5 p-5 rounded-2xl">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
              }`}
            >
              Semua Karya ({worksList.length})
            </button>
            <button
              onClick={() => setActiveCategory('film')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'film'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
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
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
              }`}
            >
              <Scissors size={14} />
              Editing ({worksList.filter((w) => w.category === 'editing').length})
            </button>
            <button
              onClick={() => setActiveCategory('photo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'photo'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 border border-white/5 text-muted-foreground hover:text-white'
              }`}
            >
              <Camera size={14} />
              Photography ({worksList.filter((w) => w.category === 'photo').length})
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={loadWorksData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Tambah Karya Baru</span>
            </button>
          </div>
        </div>

        {/* Works Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-muted-foreground">Memuat data karya dari database...</p>
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
            <p className="text-sm font-semibold text-gray-400">Belum ada karya di kategori ini.</p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all inline-flex items-center gap-1.5"
            >
              <Plus size={14} /> Tambah Karya Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-xl"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden border-b border-white/5">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border backdrop-blur-md ${
                    work.category === 'film'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : work.category === 'editing'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }`}>
                    {work.category}
                  </span>

                  {/* Play badge if video exists */}
                  {work.videoUrl && (
                    <span className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md">
                      <Play size={12} fill="currentColor" />
                    </span>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase font-mono">
                      {work.role}
                    </span>
                    <h3 className="text-base font-bold font-heading text-white leading-snug line-clamp-2">
                      {work.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-light">
                      {work.desc || "Tanpa deskripsi"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditModal(work)}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Edit size={14} className="text-blue-400" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(work.id)}
                      disabled={deletingId === work.id}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold transition-all cursor-pointer"
                      title="Hapus Karya"
                    >
                      {deletingId === work.id ? (
                        <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Work Item Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 bg-neutral-950 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-heading text-white">
                    {editingItem ? "Edit Karya Portfolio" : "Tambah Karya Baru"}
                  </h2>
                  <p className="text-xs text-muted-foreground">Isi detail projek & tempel link Google Drive atau YouTube</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Judul Karya / Project Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: JUANG - 2024"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Category & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="film">Film</option>
                      <option value="editing">Video Editing</option>
                      <option value="photo">Photography</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Role / Peran *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: DIRECTOR & EDITOR"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Media URL (Google Drive / YouTube Link) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-300">Media URL (Google Drive / YouTube) *</label>
                    <span className="text-[10px] text-blue-400 font-mono">Auto Google Drive Engine</span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/.../view atau https://youtu.be/..."
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Tempel link share Google Drive atau YouTube di sini. Sistem akan otomatis mengekstrak <strong>File ID</strong> dan mengubahnya menjadi link embed player & thumbnail CDN.
                  </p>
                </div>

                {/* Thumbnail URL (Optional Override) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Thumbnail URL (Opsional / Override)</label>
                  <input
                    type="text"
                    placeholder="Biarkan kosong jika memakai thumbnail otomatis Drive/YouTube, atau masukkan custom URL"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 text-xs font-mono"
                  />
                </div>

                {/* Automatic Media Parser Feedback Box */}
                {(driveId || ytId || parsedPreview.thumbnailUrl) && (
                  <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-300">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Link Parser Verified
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-blue-500/20 px-2 py-0.5 rounded">
                        {driveId ? "Google Drive" : ytId ? "YouTube" : "Direct Link"}
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
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
    </div>
  );
}
