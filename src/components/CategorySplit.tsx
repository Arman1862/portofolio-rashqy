import { motion } from "framer-motion";
import { Film, Camera, ArrowRight } from "lucide-react";

interface CategorySplitProps {
  onSelectCategory: (category: 'video' | 'photo') => void;
}

export default function CategorySplit({ onSelectCategory }: CategorySplitProps) {
  return (
    <section className="relative px-6 md:px-20 py-12 bg-grain">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        {/* Films & Editing Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => onSelectCategory('video')}
          className="relative group h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/5"
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/thumb_echoes.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 space-y-3 z-10">
            <div className="flex items-center gap-2 text-blue-400">
              <Film size={18} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-xs uppercase tracking-widest font-semibold font-sans">Gateway 01</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-white">FILMS & EDITING</h2>
            
            <p className="text-sm text-gray-400 font-sans max-w-sm font-light leading-relaxed">
              Cinematic edits that bring stories to life. Custom showreels, music videos, and commercial works.
            </p>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-white pt-2 font-sans group-hover:text-blue-400 transition-colors duration-300">
              <span>EXPLORE FILMS</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>

        {/* Photography Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => onSelectCategory('photo')}
          className="relative group h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/5"
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/thumb_fleeting.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 space-y-3 z-10">
            <div className="flex items-center gap-2 text-purple-400">
              <Camera size={18} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span className="text-xs uppercase tracking-widest font-semibold font-sans">Gateway 02</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-white">PHOTOGRAPHY</h2>
            
            <p className="text-sm text-gray-400 font-sans max-w-sm font-light leading-relaxed">
              Capturing moments frozen in time. Street reflections, cinematic portraits, and landscapes.
            </p>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-white pt-2 font-sans group-hover:text-purple-400 transition-colors duration-300">
              <span>EXPLORE PHOTOS</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
