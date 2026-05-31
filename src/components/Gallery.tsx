import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Grid } from "lucide-react";
import { works } from "../data/works";
import type { WorkItem } from "../data/works";

interface GalleryProps {
  selectedCategory: 'all' | 'film' | 'editing' | 'photo';
  onSelectWork: (work: WorkItem) => void;
}

export default function Gallery({ selectedCategory, onSelectWork }: GalleryProps) {
  const [filter, setFilter] = useState<'all' | 'film' | 'editing' | 'photo'>(selectedCategory);

  // Sync state if selectedCategory prop changes (e.g. clicked from CategorySplit)
  useEffect(() => {
    setFilter(selectedCategory);
  }, [selectedCategory]);

  const filteredWorks = filter === "all" 
    ? works 
    : works.filter(work => work.category === filter);

  return (
    <section id="gallery-section" className="px-6 md:px-20 py-20 bg-grain bg-dot-pattern border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Gallery Header and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Selected Works</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mt-2">A SELECTION OF RECENT WORK</h2>
          </div>
          
          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-900/60 border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "all"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter("film")}
              className={`px-4 py-2 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "film"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              FILMS
            </button>
            <button
              onClick={() => setFilter("editing")}
              className={`px-4 py-2 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "editing"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              EDITING
            </button>
            <button
              onClick={() => setFilter("photo")}
              className={`px-4 py-2 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "photo"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              PHOTOS
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => onSelectWork(work)}
                  className="group relative flex flex-col space-y-4 cursor-pointer"
                >
                  {/* Card Thumbnail Frame */}
                  <div className="relative aspect-[16:9] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover dark overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {work.category === "film" || work.category === "editing" ? (
                        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play size={20} fill="currentColor" className="ml-1" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Grid size={20} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Metadata details */}
                  <div className="flex justify-between items-start pt-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        {work.category === "film" ? "Films" : work.category === "editing" ? "Video Editing" : "Photography"}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors duration-300">
                        {work.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-sans font-light">
                        Role: {work.role}
                      </p>
                    </div>
                    
                    <span className="text-xs font-mono text-muted-foreground opacity-60">
                      {formattedIndex}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredWorks.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-sans font-light">
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
