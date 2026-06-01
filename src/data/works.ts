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
    role: "DIRECTOR & EDITOR",
    thumbnail: "/assets/juang.webp",
    videoUrl: "https://drive.google.com/file/d/1PdSjkI9YpB21mwz2vjAbEzb1UwuW8dBl/preview",
    desc: "Sebuah karya film pendek yang menarasikan kisah perjuangan, dedikasi, dan keteguhan hati dalam menghadapi rintangan kehidupan."
  },
  {
    id: 2,
    title: "Mimpi Buruk di Ujung Kota - Festival Film Bahari 2024",
    category: "film",
    role: "DIRECTOR & EDITOR",
    thumbnail: "/assets/mimpi_buruk_di_ujung_kota.webp",
    videoUrl: "https://www.youtube.com/embed/R6JFJT9LzmE?si=7WK0s4qZRE2QsVBB",
    desc: "Film pendek naratif fiksi yang diproduksi untuk Festival Film Bahari 2024, mengeksplorasi sisi kehidupan pesisir kota yang penuh misteri."
  },
  {
    id: 3,
    title: "Bayar Zakat atau Menyesal? - 2025",
    category: "film",
    role: "DIRECTOR & EDITOR",
    thumbnail: "/assets/bayar_zakat_atau_menyesal.webp",
    videoUrl: "https://www.youtube.com/embed/sbrV67nRva8?si=o8g1eCCu0KLRqUXm",
    desc: "Film pendek edukatif bergenre horror moral tentang kepatuhan dan kesadaran pentingnya menunaikan ibadah zakat."
  },
  // VIDEO EDITING
  {
    id: 4,
    title: "After Movie - SINILAH Batch #3 - 2025",
    category: "editing",
    role: "VIDEOGRAPHER & EDITOR",
    thumbnail: "/assets/sinilah_batch_3.webp",
    videoUrl: "https://drive.google.com/file/d/1XDut5knVN0uBjvJE7WBiYdRxzV2w5HV1/preview",
    desc: "After movie energik yang mengabadikan momen dan keseruan acara SINILAH Batch #3 tahun 2025. Dioptimalkan dengan transisi tempo cepat dan sinkronisasi audio dinamis."
  },
  {
    id: 5,
    title: "SUARA DARI BUTTA TOA - 2026",
    category: "editing",
    role: "ONLINE EDITOR",
    thumbnail: "/assets/suara_dari_butta_toa.webp",
    videoUrl: "https://www.youtube.com/embed/SbQUOUao7xI?si=9zeRO6KyUQnoDbuG",
    desc: "Dokumentasi editing mendalam yang merajut realitas kehidupan sosial, budaya, dan spiritual di Butta Toa."
  },
  {
    id: 6,
    title: "SYNCHRONIZE FEST 2025 - NEGATIFA",
    category: "editing",
    role: "OFFLINE EDITOR",
    thumbnail: "/assets/synchronize_fest_negatifa.webp",
    videoUrl: "https://www.youtube.com/embed/Arb8UgtJm2w?si=runMhqN96ouevV0k",
    desc: "Proses editing live performance multi-kamera dari penampilan NEGATIFA di festival musik terkemuka SYNCHRONIZE FEST 2025."
  },
  {
    id: 7,
    title: "Video Angkatan - SMKN 53 Jakarta - 2026",
    category: "editing",
    role: "DIRECTOR & EDITOR",
    thumbnail: "/assets/3_years_we_are_together.webp",
    videoUrl: "https://drive.google.com/file/d/1bTVOwhB-oGvq0FXO9YgA2B1wf00GjrkU/preview",
    desc: "Video kenangan kelulusan dan masa-masa kebersamaan sekolah siswa-siswi SMKN 53 Jakarta angkatan 2026."
  },
  // PHOTOGRAPHY
  {
    id: 8,
    title: "Angkatan - SMKN 53 Jakarta",
    category: "photo",
    role: "Documentary Photographer",
    thumbnail: "https://images.weserv.nl/?url=https://drive.google.com/uc?id=1UnMrjVxxAiCkZvZ0PzdyF7yXZm2p7S16",
    videoUrl: "https://drive.google.com/file/d/1UnMrjVxxAiCkZvZ0PzdyF7yXZm2p7S16/preview",
    desc: "Sesi dokumentasi foto angkatan bertema kebersamaan di lingkungan sekolah SMKN 53 Jakarta."
  },
  {
    id: 9,
    title: "Angkatan - SMKN 53 Jakarta",
    category: "photo",
    role: "Documentary Photographer",
    thumbnail: "https://images.weserv.nl/?url=https://drive.google.com/uc?id=1GVSFBC5ogd_fGulMtoYvLCzktf4CItQS",
    videoUrl: "https://drive.google.com/file/d/1GVSFBC5ogd_fGulMtoYvLCzktf4CItQS/preview",
    desc: "Sesi foto dokumenter luar ruangan (outdoor) untuk album kenangan SMKN 53 Jakarta."
  },
  {
    id: 10,
    title: "Performance - Nau",
    category: "photo",
    role: "Stage Photographer",
    thumbnail: "https://images.weserv.nl/?url=https://drive.google.com/uc?id=11QU4oC5xEucSqNWFcEjqFrj1GPoQPb1b",
    videoUrl: "https://drive.google.com/file/d/11QU4oC5xEucSqNWFcEjqFrj1GPoQPb1b/preview",
    desc: "Potret kebersamaan setelah penampilan Nau dengan suasana yang hangat dan penuh energi."
  },
  {
    id: 11,
    title: "Performance - Nau",
    category: "photo",
    role: "Stage Photographer",
    thumbnail: "https://images.weserv.nl/?url=https://drive.google.com/uc?id=1wOjv5DJ2zVmVUpnkzYjT5WikNX5XuysN",
    videoUrl: "https://drive.google.com/file/d/1wOjv5DJ2zVmVUpnkzYjT5WikNX5XuysN/preview",
    desc: "Momen panggung dinamis konser musik Nau dengan permainan lensa portrait bersudut dekat."
  },
  {
    id: 12,
    title: "Travel - Pelepasan Tunas Harapan",
    category: "photo",
    role: "Travel Photographer",
    thumbnail: "https://images.weserv.nl/?url=https://drive.google.com/uc?id=10vWhk5SW-UaaJAneNYdTDNLY77-Ki_DU",
    videoUrl: "https://drive.google.com/file/d/10vWhk5SW-UaaJAneNYdTDNLY77-Ki_DU/preview",
    desc: "Dokumentasi foto perjalanan dan prosesi awal kegiatan Pelepasan Tunas Harapan."
  },
  {
    id: 13,
    title: "Travel - Pelepasan Tunas Harapan",
    category: "photo",
    role: "Travel Photographer",
    thumbnail: "https://images.weserv.nl/?url=https://drive.google.com/uc?id=1GvK_J-uPtHbJGY6Lx7D_CQ5RhAIpjcry",
    videoUrl: "https://drive.google.com/file/d/1GvK_J-uPtHbJGY6Lx7D_CQ5RhAIpjcry/preview",
    desc: "Momen kebersamaan dan sesi foto kreatif menjelang acara Pelepasan Tunas Harapan."
  }
];
