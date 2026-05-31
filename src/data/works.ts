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
  {
    id: 1,
    title: "Video Angkatan - SMKN 53 Jakarta - 2026",
    category: "film",
    role: "Lead Videographer & Editor",
    thumbnail: "/assets/thumb_horizon.png",
    videoUrl: "https://drive.google.com/file/d/1bTVOwhB-oGvq0FXO9YgA2B1wf00GjrkU/preview",
    desc: "Dokumentasi kebersamaan, momentum kelulusan, dan kenangan indah angkatan 2026 SMKN 53 Jakarta. Dikemas dengan sinematografi yang dinamis dan bercerita secara emosional."
  },
  {
    id: 2,
    title: "Urban Reflections",
    category: "photo",
    role: "Photographer & Colorist",
    thumbnail: "/assets/thumb_urban.png",
    imageUrl: "/assets/thumb_urban.png",
    desc: "A collection of street photography highlighting neon light reflections on rainy city pavements. Focuses on capturing the vibrant yet lonely night city atmosphere."
  },
  {
    id: 3,
    title: "After Movie - SINILAH Batch #3 - 2025",
    category: "editing",
    role: "Lead Video Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://drive.google.com/file/d/1XDut5knVN0uBjvJE7WBiYdRxzV2w5HV1/preview",
    desc: "After movie energik yang menangkap esensi dan keseruan dari acara SINILAH Batch #3 di tahun 2025. Dioptimalkan dengan transisi tempo cepat dan sinkronisasi audio yang presisi."
  },
  {
    id: 4,
    title: "Fleeting Moments",
    category: "photo",
    role: "Portrait Photographer",
    thumbnail: "/assets/thumb_fleeting.png",
    imageUrl: "/assets/thumb_fleeting.png",
    desc: "High-end portraiture focusing on dramatic side-lighting and facial expressions. Edited with soft shadow roll-offs and a muted, cinematic color palette."
  },
  {
    id: 5,
    title: "Dokumenter - SUARA DARI BUTTA TOA",
    category: "film",
    role: "Director & Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://www.youtube.com/embed/SbQUOUao7xI?si=4Vxe1jhoDbrrtc2P",
    desc: "Sebuah karya dokumenter naratif mendalam yang mengangkat suara, budaya, dan nilai kehidupan masyarakat lokal di Butta Toa."
  },
  {
    id: 6,
    title: "Performance - SYNCHRONIZE FEST 2025 - NEGATIFA",
    category: "editing",
    role: "Live Concert Editor & Colorist",
    thumbnail: "/assets/thumb_horizon.png",
    videoUrl: "https://www.youtube.com/embed/Arb8UgtJm2w?si=OrODDPmq6WUNhk6T",
    desc: "Rekaman penampilan live band NEGATIFA di festival musik besar SYNCHRONIZE FEST 2025. Proses editing multi-kamera yang intens untuk merepresentasikan energi panggung yang otentik."
  }
];
