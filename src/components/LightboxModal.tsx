import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film, Camera, Scissors } from "lucide-react";
import type { WorkItem } from "../data/works";

interface LightboxModalProps {
  work: WorkItem | null;
  onClose: () => void;
}

export default function LightboxModal({ work, onClose }: LightboxModalProps) {
  const isYouTube = work?.videoUrl?.includes("youtube.com") || work?.videoUrl?.includes("youtu.be");
  const isDriveVideo = work?.videoUrl?.includes("drive.google.com");

  // Disable body scroll when modal is open
  useEffect(() => {
    if (work) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [work]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
        >
          {/* Close Area */}
          <div className="absolute inset-0 cursor-default" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden glass-panel flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-[80vh] shadow-2xl shadow-blue-500/5"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950/90 border-b border-white/5 md:hidden w-full z-20">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {work.category === "film" ? "Film" : work.category === "editing" ? "Video Editing" : "Photography"}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="hidden md:flex absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white cursor-pointer transition-all duration-300 z-20 items-center justify-center"
            >
              <X size={18} />
            </button>

            {/* Media Area (Left side) */}
            <div className={`w-full md:w-[65%] bg-black flex items-center justify-center relative ${
              isYouTube
                ? "aspect-video"
                : isDriveVideo
                  ? "h-[320px] sm:h-[360px] md:aspect-auto md:h-full md:min-h-[450px]"
                  : "aspect-video md:aspect-auto md:h-full min-h-[250px] md:min-h-[450px]"
            }`}>
              {work.videoUrl ? (
                <iframe
                  src={work.videoUrl}
                  title={work.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 absolute inset-0"
                />
              ) : work.imageUrl ? (
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain"
                />
              ) : null}
            </div>

            {/* Project Details Sidebar (Right side) */}
            <div className="w-full md:w-[35%] p-6 md:p-10 flex flex-col justify-between overflow-y-auto bg-neutral-950/80 md:h-full border-t md:border-t-0 md:border-l border-white/5">
              <div className="space-y-6">
                
                {/* Category Pill */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                  {work.category === "film" ? (
                    <div className="flex items-center gap-2 text-blue-400">
                      <Film size={14} />
                      <span>FILM</span>
                    </div>
                  ) : work.category === "editing" ? (
                    <div className="flex items-center gap-2 text-amber-400">
                      <Scissors size={14} />
                      <span>VIDEO EDITING</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-purple-400">
                      <Camera size={14} />
                      <span>PHOTOGRAPHY</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-white leading-tight">
                    {work.title}
                  </h2>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground font-sans">Role / Responsibility:</span>
                    <span className="text-sm font-semibold font-sans text-blue-300">{work.role}</span>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Description */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground font-sans">Overview:</span>
                  <p className="text-sm text-gray-300 font-sans font-light leading-relaxed">
                    {work.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-8 text-[11px] text-muted-foreground font-sans font-light border-t border-white/5 mt-6 flex justify-between">
                <span>© {new Date().getFullYear()} Rasqhy</span>
                <span className="text-blue-500 uppercase tracking-widest font-semibold">Verified Work</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
