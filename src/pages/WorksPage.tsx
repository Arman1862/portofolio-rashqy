import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Camera, Play, Grid, ArrowLeft, Scissors } from "lucide-react";
import { works } from "../data/works";
import LightboxModal from "../components/LightboxModal";
import type { WorkItem } from "../data/works";

export default function WorksPage() {
  const { hash } = useLocation();
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const filmWorks = works.filter((w) => w.category === "film");
  const editingWorks = works.filter((w) => w.category === "editing");
  const photoWorks = works.filter((w) => w.category === "photo");

  // Hash-based smooth scroll logic
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(`${id}-section`);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background bg-dot-pattern bg-grain px-6 md:px-20 py-12 md:py-20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
            BACK TO HOME
          </Link>
          <h1 className="text-3xl md:text-6xl font-bold font-heading text-white tracking-tight">
            SELECTED WORKS
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-sans max-w-xl font-light leading-relaxed">
            Explore the creative outputs of Rasqhy. Scroll down to browse through films, video editing projects, and photography sessions.
          </p>
        </div>

        {/* SECTION 1: FILMS */}
        <section id="films-section" className="space-y-10 scroll-mt-24">
          <div className="border-b border-white/5 pb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400">
              <Film size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase font-sans">Category 01</span>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">FILMS</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filmWorks.map((work, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedWork(work)}
                  className="group relative flex flex-col space-y-3 cursor-pointer"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Desktop Hover Info Overlay */}
                    <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-8 space-y-2.5 z-10">
                      <span className="text-[10px] font-semibold tracking-widest text-blue-400 uppercase">
                        {work.role}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-white">{work.title}</h3>
                      <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2">
                        {work.desc}
                      </p>
                      <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-blue-400 tracking-wider">
                        <Play size={10} fill="currentColor" /> WATCH PROJECT
                      </div>
                    </div>

                    {/* Desktop Play Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:group-hover:opacity-0 transition-opacity duration-300 z-10">
                      <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 backdrop-blur-sm">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute top-4 left-4 text-xs font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 backdrop-blur-sm pointer-events-none">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Mobile details (under image) */}
                  <div className="flex flex-col space-y-1 pt-1 md:hidden">
                    <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase">{work.role}</span>
                    <h3 className="text-lg font-bold font-heading text-white">{work.title}</h3>
                    <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">{work.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: VIDEO EDITING */}
        <section id="editing-section" className="space-y-10 scroll-mt-24">
          <div className="border-b border-white/5 pb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-400">
              <Scissors size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase font-sans">Category 02</span>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">VIDEO EDITING</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editingWorks.map((work, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedWork(work)}
                  className="group relative flex flex-col space-y-3 cursor-pointer"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Desktop Hover Info Overlay */}
                    <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-8 space-y-2.5 z-10">
                      <span className="text-[10px] font-semibold tracking-widest text-amber-400 uppercase">
                        {work.role}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-white">{work.title}</h3>
                      <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2">
                        {work.desc}
                      </p>
                      <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-amber-400 tracking-wider">
                        <Play size={10} fill="currentColor" /> WATCH PROJECT
                      </div>
                    </div>

                    {/* Desktop Play Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:group-hover:opacity-0 transition-opacity duration-300 z-10">
                      <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 backdrop-blur-sm">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute top-4 left-4 text-xs font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 backdrop-blur-sm pointer-events-none">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Mobile details (under image) */}
                  <div className="flex flex-col space-y-1 pt-1 md:hidden">
                    <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">{work.role}</span>
                    <h3 className="text-lg font-bold font-heading text-white">{work.title}</h3>
                    <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">{work.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: PHOTOGRAPHY */}
        <section id="photography-section" className="space-y-10 scroll-mt-24">
          <div className="border-b border-white/5 pb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 text-purple-400">
              <Camera size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-purple-500 uppercase font-sans">Category 03</span>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">PHOTOGRAPHY</h2>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 gap-6">
            {photoWorks.map((work) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedWork(work)}
                className="break-inside-avoid flex flex-col space-y-3 mb-6 group cursor-pointer"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Desktop Hover Info Overlay */}
                  <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-8 space-y-2.5 z-10">
                    <span className="text-[10px] font-semibold tracking-widest text-purple-400 uppercase">
                      {work.role}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-white">{work.title}</h3>
                    <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2">
                      {work.desc}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-purple-400 tracking-wider">
                      <Grid size={10} /> VIEW PHOTO
                    </div>
                  </div>
                </div>

                {/* Mobile details (under image) */}
                <div className="flex flex-col space-y-1 pt-1 md:hidden">
                  <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase">{work.role}</span>
                  <h3 className="text-lg font-bold font-heading text-white">{work.title}</h3>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox / Video Player Modal */}
      <LightboxModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}
