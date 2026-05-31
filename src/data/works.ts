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
    title: "Echoes of Silence",
    category: "film",
    role: "Director & Lead Editor",
    thumbnail: "/assets/thumb_echoes.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "A cinematic short film exploring isolation in urban spaces. Captured with vintage lenses, featuring deep contrast and moody atmospheric color grading."
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
    title: "Beyond the Horizon",
    category: "editing",
    role: "Video Editor & Colorist",
    thumbnail: "/assets/thumb_horizon.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "An epic travel film detailing a solo journey through mountain ranges. Edited to emphasize slow camera sweeps, natural ambient soundscapes, and cinematic storytelling."
  },
  {
    id: 4,
    title: "Fleeting Moments",
    category: "photo",
    role: "Portrait Photographer",
    thumbnail: "/assets/thumb_fleeting.png",
    imageUrl: "/assets/thumb_fleeting.png",
    desc: "High-end portraiture focusing on dramatic side-lighting and facial expressions. Edited with soft shadow roll-offs and a muted, cinematic color palette."
  }
];
