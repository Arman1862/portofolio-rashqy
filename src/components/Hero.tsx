import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";

interface HeroProps {
  onPlayReel: () => void;
  onExploreWorks: () => void;
}

const softwareSkills = [
  { name: "Premiere Pro", short: "Pr", color: "text-[#9999FF] border-[#9999FF]/20 bg-[#9999FF]/5" },
  { name: "After Effects", short: "Ae", color: "text-[#D199FF] border-[#D199FF]/20 bg-[#D199FF]/5" },
  { name: "Photoshop", short: "Ps", color: "text-[#31A8FF] border-[#31A8FF]/20 bg-[#31A8FF]/5" },
  { name: "Lightroom", short: "Lr", color: "text-[#31F9FF] border-[#31F9FF]/20 bg-[#31F9FF]/5" },
  { name: "DaVinci Resolve", short: "Dr", color: "text-[#FF9966] border-[#FF9966]/20 bg-[#FF9966]/5" },
];

export default function Hero({ onPlayReel, onExploreWorks }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-20 py-20 overflow-hidden bg-dot-pattern bg-grain">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <img 
          src="/assets/Rashqy-WIZED00-24.webp" 
          alt="Rasqhy Background" 
          className="absolute right-0 top-0 w-full md:w-[55%] h-full object-cover opacity-60 md:opacity-85 transition-opacity duration-1000"
          style={{ objectPosition: 'center' }}
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
          Rasqhy Nuril Zawzi Zawaz / Editor. Filmmaker. Photographer.
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
          From frames to films, I turn raw footage and fleeting moments into something people feel. Crafting cinematic edits with purpose and precision.
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
          <span className="text-xs tracking-wider text-muted-foreground uppercase font-semibold">Available for Freelance</span>
          <div className="flex flex-wrap gap-2.5">
            {softwareSkills.map((skill) => (
              <div
                key={skill.name}
                title={skill.name}
                className={`flex items-center justify-center w-11 h-11 text-sm font-bold rounded-lg border font-heading glass-panel select-none ${skill.color}`}
              >
                {skill.short}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
