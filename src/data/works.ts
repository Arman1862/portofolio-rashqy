export interface WorkItem {
  id: number;
  title: string;
  category: 'film' | 'editing' | 'photo';
  role: string;
  thumbnail: string;
  videoUrl?: string;
  imageUrl?: string;
  desc: string;
}

export const works: WorkItem[] = [
  // FILMS
  {
    id: 1,
    title: "JUANG - 2024",
    category: "film",
    role: "Director & Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://drive.google.com/file/d/1PdSjkI9YpB21mwz2vjAbEzb1UwuW8dBl/preview",
    desc: "Sebuah karya film pendek yang menarasikan kisah perjuangan, dedikasi, dan keteguhan hati dalam menghadapi rintangan kehidupan."
  },
  {
    id: 2,
    title: "Mimpi Buruk di Ujung Kota - Festival Film Bahari 2024",
    category: "film",
    role: "Lead Director & Editor",
    thumbnail: "/assets/thumb_horizon.png",
    videoUrl: "https://www.youtube.com/embed/R6JFJT9LzmE?si=7WK0s4qZRE2QsVBB",
    desc: "Film pendek naratif fiksi yang diproduksi untuk Festival Film Bahari 2024, mengeksplorasi sisi kehidupan pesisir kota yang penuh misteri."
  },
  {
    id: 3,
    title: "ZIS (Bayar Zakat atau Menyesal?) - 2025",
    category: "film",
    role: "Director & Lead Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://www.youtube.com/embed/sbrV67nRva8?si=o8g1eCCu0KLRqUXm",
    desc: "Film pendek edukatif bergenre komedi moral tentang kepatuhan dan kesadaran pentingnya menunaikan ibadah zakat."
  },
  // VIDEO EDITING
  {
    id: 4,
    title: "After Movie - SINILAH Batch #3 - 2025",
    category: "editing",
    role: "Lead Video Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://drive.google.com/file/d/1XDut5knVN0uBjvJE7WBiYdRxzV2w5HV1/preview",
    desc: "After movie energik yang mengabadikan momen dan keseruan acara SINILAH Batch #3 tahun 2025. Dioptimalkan dengan transisi tempo cepat dan sinkronisasi audio dinamis."
  },
  {
    id: 5,
    title: "SUARA DARI BUTTA TOA - 2026",
    category: "editing",
    role: "Video Editor & Colorist",
    thumbnail: "/assets/thumb_horizon.png",
    videoUrl: "https://www.youtube.com/embed/SbQUOUao7xI?si=9zeRO6KyUQnoDbuG",
    desc: "Dokumentasi editing mendalam yang merajut realitas kehidupan sosial, budaya, dan spiritual di Butta Toa."
  },
  {
    id: 6,
    title: "SYNCHRONIZE FEST 2025 - NEGATIFA",
    category: "editing",
    role: "Multi-camera Video Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://www.youtube.com/embed/Arb8UgtJm2w?si=runMhqN96ouevV0k",
    desc: "Proses editing live performance multi-kamera dari penampilan NEGATIFA di festival musik terkemuka SYNCHRONIZE FEST 2025."
  },
  {
    id: 7,
    title: "Video Angkatan - SMKN 53 Jakarta - 2026",
    category: "editing",
    role: "Videographer & Video Editor",
    thumbnail: "/assets/thumb_horizon.png",
    videoUrl: "https://drive.google.com/file/d/1bTVOwhB-oGvq0FXO9YgA2B1wf00GjrkU/preview",
    desc: "Video kenangan kelulusan dan masa-masa kebersamaan sekolah siswa-siswi SMKN 53 Jakarta angkatan 2026."
  },
  // PHOTOGRAPHY
  {
    id: 8,
    title: "Angkatan - SMKN 53 Jakarta - 1",
    category: "photo",
    role: "Photographer & Colorist",
    thumbnail: "https://drive.google.com/thumbnail?id=1UnMrjVxxAiCkZvZ0PzdyF7yXZm2p7S16&sz=w800",
    videoUrl: "https://drive.google.com/file/d/1UnMrjVxxAiCkZvZ0PzdyF7yXZm2p7S16/preview",
    desc: "Sesi dokumentasi foto angkatan bertema kebersamaan di lingkungan sekolah SMKN 53 Jakarta."
  },
  {
    id: 9,
    title: "Angkatan - SMKN 53 Jakarta - 4",
    category: "photo",
    role: "Photographer & Colorist",
    thumbnail: "https://drive.google.com/thumbnail?id=1GVSFBC5ogd_fGulMtoYvLCzktf4CItQS&sz=w800",
    videoUrl: "https://drive.google.com/file/d/1GVSFBC5ogd_fGulMtoYvLCzktf4CItQS/preview",
    desc: "Sesi foto dokumenter luar ruangan (outdoor) untuk album kenangan SMKN 53 Jakarta."
  },
  {
    id: 10,
    title: "Performance - Nau - 2",
    category: "photo",
    role: "Stage Photographer",
    thumbnail: "https://drive.google.com/thumbnail?id=11QU4oC5xEucSqNWFcEjqFrj1GPoQPb1b&sz=w800",
    videoUrl: "https://drive.google.com/file/d/11QU4oC5xEucSqNWFcEjqFrj1GPoQPb1b/preview",
    desc: "Foto panggung aksi panggung live concert Nau dengan kontras lampu panggung dramatis."
  },
  {
    id: 11,
    title: "Performance - Nau - 3",
    category: "photo",
    role: "Stage Photographer",
    thumbnail: "https://drive.google.com/thumbnail?id=1wOjv5DJ2zVmVUpnkzYjT5WikNX5XuysN&sz=w800",
    videoUrl: "https://drive.google.com/file/d/1wOjv5DJ2zVmVUpnkzYjT5WikNX5XuysN/preview",
    desc: "Momen panggung dinamis konser musik Nau dengan permainan lensa portrait bersudut dekat."
  },
  {
    id: 12,
    title: "Travel - Pelepasan Tunas Harapan - 1",
    category: "photo",
    role: "Documentary Photographer",
    thumbnail: "https://drive.google.com/thumbnail?id=10vWhk5SW-UaaJAneNYdTDNLY77-Ki_DU&sz=w800",
    videoUrl: "https://drive.google.com/file/d/10vWhk5SW-UaaJAneNYdTDNLY77-Ki_DU/preview",
    desc: "Dokumentasi foto perjalanan dan prosesi awal kegiatan Pelepasan Tunas Harapan."
  },
  {
    id: 13,
    title: "Travel - Pelepasan Tunas Harapan - 3",
    category: "photo",
    role: "Documentary Photographer",
    thumbnail: "https://drive.google.com/thumbnail?id=1GvK_J-uPtHbJGY6Lx7D_CQ5RhAIpjcry&sz=w800",
    videoUrl: "https://drive.google.com/file/d/1GvK_J-uPtHbJGY6Lx7D_CQ5RhAIpjcry/preview",
    desc: "Esensi dokumentasi kegiatan petualangan alam bebas dari acara Pelepasan Tunas Harapan."
  }
];
