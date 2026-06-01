import { motion } from "framer-motion";
import { Film, Camera, ArrowRight, Scissors } from "lucide-react";

interface CategorySplitProps {
  onSelectCategory: (category: 'film' | 'editing' | 'photo') => void;
}

export default function CategorySplit({ onSelectCategory }: CategorySplitProps) {
  return (
    <section className="relative px-6 md:px-20 py-12 bg-grain">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* Films Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => onSelectCategory('film')}
          className="relative group h-[280px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-white/5"
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/gateway_films.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 space-y-2 z-10">
            <div className="flex items-center gap-2 text-blue-400">
              <Film size={16} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">Gateway 01</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold font-heading text-white">FILM</h2>
            
            <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2">
              A collection of cinematic stories, visual explorations, and narrative-driven films crafted through atmosphere, emotion, and intentional storytelling.
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-semibold text-white pt-2 font-sans group-hover:text-blue-400 transition-colors duration-300">
              <span>EXPLORE FILMS</span>
              <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>

        {/* Video Editing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onClick={() => onSelectCategory('editing')}
          className="relative group h-[280px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-white/5"
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/gateway_editing.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 space-y-2 z-10">
            <div className="flex items-center gap-2 text-blue-400">
              <Scissors size={16} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">Gateway 02</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold font-heading text-white">VIDEO EDITING</h2>
            
            <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2">
              Transforming raw footage into immersive visual experiences through pacing, rhythm, emotion, and cinematic editing techniques.
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-semibold text-white pt-2 font-sans group-hover:text-blue-400 transition-colors duration-300">
              <span>EXPLORE EDITS</span>
              <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>

        {/* Photography Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => onSelectCategory('photo')}
          className="relative group h-[280px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-white/5"
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/gateway_photo.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 space-y-2 z-10">
            <div className="flex items-center gap-2 text-blue-400">
              <Camera size={16} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">Gateway 03</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold font-heading text-white">PHOTOGRAPHY</h2>
            
            <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2">
              Capturing moments, expressions, and environments through thoughtful composition, natural atmosphere, and cinematic visual aesthetics.
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-semibold text-white pt-2 font-sans group-hover:text-blue-400 transition-colors duration-300">
              <span>EXPLORE PHOTOS</span>
              <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
