import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { Icon } from "@iconify/react";

interface HeroProps {
  onPlayReel: () => void;
  onExploreWorks: () => void;
}

const softwareSkills = [
  { 
    name: "DaVinci Resolve", 
    image: "https://img.icons8.com/color/48/davinci-resolve.png" 
  },
  { 
    name: "Premiere Pro", 
    icon: "logos:adobe-premiere" 
  },
  { 
    name: "Lightroom Classic", 
    icon: "simple-icons:adobelightroomclassic",
    color: "#31A8FF"
  },
  { 
    name: "Lightroom Mobile", 
    icon: "logos:adobe-lightroom" 
  },
  { 
    name: "Canva", 
    icon: "devicon:canva" 
  },
];

export default function Hero({ onPlayReel, onExploreWorks }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-20 py-20 overflow-hidden bg-dot-pattern bg-grain">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <img 
          src="/assets/rasqhy-bg-hero.webp" 
          alt="Rasqhy Background" 
          className="absolute right-0 top-0 w-full md:w-[55%] lg:w-[48%] h-full object-cover opacity-45 md:opacity-75 transition-opacity duration-1000 object-[68%_center] md:object-[80%_center]"
          loading="eager"
        />
        {/* Custom multi-stop cubic gradient easing for seamless background blend */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to right, #080808 0%, #080808 40%, rgba(8, 8, 8, 0.95) 50%, rgba(8, 8, 8, 0.6) 60%, rgba(8, 8, 8, 0.15) 70%, transparent 80%)'
          }}
        />
        {/* Mobile dimming overlay */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
        {/* Bottom blend transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      {/* Background Glowing Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-600/5 blur-[80px] md:blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-purple-600/5 blur-[80px] md:blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl space-y-8 relative z-10">
        {/* Sub-header / Role */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.2em] text-blue-500 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Rasqhy Nuril Zawzi Zawaz / Filmmaker - Editor - Photographer
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold font-heading text-foreground leading-[1.1] tracking-tight"
        >
          I CREATE VISUALS <br className="hidden md:inline" />
          THAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">TELL STORIES.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-lg text-muted-foreground font-sans max-w-xl font-light leading-relaxed"
        >
          Through editing, photography, and filmmaking, I create cinematic visuals that capture emotion, atmosphere, and moments people can feel and remember.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <button
            onClick={onPlayReel}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full glass-panel glass-panel-hover text-sm font-semibold text-foreground cursor-pointer transition-all duration-300"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400">
              <Play size={10} fill="currentColor" />
            </span>
            Play Showreel
          </button>

          <button
            onClick={onExploreWorks}
            className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-300 group"
          >
            Explore Works
            <ArrowDown size={16} className="transform group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Software Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="pt-8 flex flex-col gap-3"
        >
          <span className="text-xs tracking-wider text-muted-foreground font-semibold">Open to projects, collaborations, and creative opportunities.</span>
          <div className="flex flex-wrap gap-3">
            {softwareSkills.map((skill) => {
              return (
                <div
                  key={skill.name}
                  title={skill.name}
                  className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md hover:border-white/30 hover:bg-neutral-800/80 transition-all duration-300 select-none p-2.5 shadow-lg shadow-black/30"
                >
                  {skill.image ? (
                    <img 
                      src={skill.image} 
                      alt={skill.name} 
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 object-contain"
                    />
                  ) : (
                    <Icon 
                      icon={skill.icon || ""} 
                      style={skill.color ? { color: skill.color } : undefined}
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
