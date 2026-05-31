# Design Style Guide & Project Specification
**Project:** Raski Portfolio (Cinematic Minimalism)  
**Stack:** Vite + React + TailwindCSS + Shadcn/ui  

---

## 1. Core Brand Concept: "Cinematic Minimalism"
Vibe utama dari portofolio ini adalah **Cinema/Film Academy**—bukan AI SaaS startup, crypto, atau gaming website. Desain harus terasa premium, tenang, dan membiarkan karya visual (video/foto) Raski yang menjadi pusat perhatian utama (*whitespaces are active design elements*).

*   **Rule of Thumb**: 85% Solid Matte Dark, 15% Glass/Liquid Accent.
*   **Avoid**: Neon overload, gamer RGB effects, excessive floating particles, and complex/fast animations.

---

## 2. Color Palette
Warna yang digunakan harus natural, tidak terlampau mencolok agar menjaga akurasi warna karya foto/video saat ditampilkan.

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Dark Matte (Base BG)** | `#080808` | Background utama seluruh halaman |
| **Dark Card BG** | `#121212` | Background card, panel, and modal |
| **Off-White Text** | `#F3F4F6` | Heading utama, kontras tinggi |
| **Muted Gray Text** | `#9CA3AF` | Sub-heading, deskripsi, metadata |
| **Dark Gray Text** | `#4B5563` | Info kecil, border inaktif, captions |
| **Cinematic Glow (Accent)** | `rgba(59,130,246,0.15)` | Blur radial glow di background (sangat halus) |
| **Glow Blue Active** | `#3B82F6` | Aksen titik aktif (status), line hover |

---

## 3. Typography
Kombinasi font untuk menghadirkan kesan artistik dan profesional:

*   **Headings (H1, H2, H3)**: `General Sans` atau `Satoshi` (Sans-serif dengan geometri tegas, elegan, dan bersih).
*   **Body & UI Elements**: `Inter` (Readability tinggi untuk teks kecil dan UI).
*   **Cinematic Serif / Quotes**: `Cormorant Garamond` (Italic, elegan, memberikan sentuhan editorial/indie film).

---

## 4. UI Layout & Architecture

### Section 1: Hero (Fullscreen)
*   **Headline**: Sangat besar (e.g., "I EDIT MOMENTS INTO MEMORIES." atau "I CREATE VISUALS THAT TELL STORIES.").
*   **Sub-headline**: Deskripsi positioning 1-2 baris.
*   **CTA Button**: "Play Reel" dengan micro-animation magnetic, memicu showreel modal.
*   **Software Badge**: Logo minimalis dari software yang dikuasai (Premiere Pro, After Effects, Photoshop, Lightroom, DaVinci Resolve) terbungkus liquid glass panel kecil.
*   **Background**: Fullscreen background hitam pekat dengan grain tekstur tipis + radial blue glow blur statis di belakang teks hero.

### Section 2: Category Split (The Gateway)
*   Dua card horizontal/vertical berdampingan yang membagi ranah keahlian Raski:
    1.  **FILMS & EDITING**: *"Cinematic edits that bring stories to life."*
    2.  **PHOTOGRAPHY**: *"Capturing moments, frozen in time."*
*   **Hover state**: Transisi smooth. Saat di-hover, opacity background card berkurang dan menampilkan thumbnail/video loop tersamar di bawahnya (zoom-in lambat).
*   **Interaction**: Klik card ini akan men-scroll halaman secara smooth ke galeri karya di bawahnya dan menyaring kategori secara otomatis.

### Section 3: Selected Works (Dynamic Grid)
*   Menggunakan layout responsif untuk menampilkan thumbnail project.
*   Header section memiliki tab filter kecil: `All`, `Films`, `Photography` dengan desain pill/tab minimalis.
*   Setiap card proyek memiliki layout bersih:
    *   Thumbnail dengan aspect ratio yang konsisten (16:9 untuk film, aspect ratio dinamis/3:2 untuk foto).
    *   Tanda play kecil di tengah (hanya untuk kategori film).
    *   Metadata di bawah gambar: **Project Title**, **Project Number (01, 02, etc.)**, dan **Role** (misal: "Editor", "Director").

### Section 4: Project Detail (Lightbox/Modal System)
*   Ketika card project diklik, modal full-screen overlay (glassmorphism dark) terbuka secara halus.
*   **Content untuk Film**: Video player responsif (YouTube/Vimeo embed atau Drive direct link) yang diset auto-play muted, dengan tombol unmute.
*   **Content untuk Foto**: Foto resolusi tinggi dengan navigasi slider jika ada beberapa foto di satu project.
*   **Side Info / Bottom Info**: Title, Detail Role (misal: *Director, Lead Editor, Colorist*), dan Deskripsi singkat tentang project atau konsep BTS (*Behind the Scenes*).

### Section 5: Footer & Contact
*   Sosial media links minimalis (Instagram, YouTube, Vimeo, Email).
*   Desain ultra clean dengan copyright info.

---

## 5. Animation Guidelines (Framer Motion / Tailwind Transitions)
Setiap interaksi harus terasa *weighty* (memiliki bobot) dan lambat, meniru gerakan kamera sinematik.

*   **Smooth Scroll**: Wajib diaktifkan di level dokumen (`scroll-behavior: smooth`).
*   **Reveal Blur**: Elemen teks/hero muncul perlahan dari blur & fade-in saat pertama kali diload.
*   **Hover Zoom**: Efek scale image saat di-hover maksimal `scale-105` dengan durasi lambat (`duration-700` atau lebih).
*   **Reveal / Fade-in**: Animasi transisi antar filter kategori harus smooth, bukan kedip instan.
