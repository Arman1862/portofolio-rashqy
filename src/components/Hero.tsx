import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";

interface HeroProps {
  onPlayReel: () => void;
  onExploreWorks: () => void;
}

const SoftwareIcons: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactNode> = {
  Dr: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="davinci-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd300" />
          <stop offset="35%" stopColor="#ff2a5f" />
          <stop offset="70%" stopColor="#7d2ae8" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
      </defs>
      <path 
        d="M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z"
        fill="url(#davinci-grad)"
      />
    </svg>
  ),
  Pr: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path 
        d="M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z" 
        fill="#9999FF"
      />
    </svg>
  ),
  LrC: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path 
        d="M19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM8.57 16.689c-.01.061-.03.101-.06.121-.03.02-.06.029-.09.029H2.71c-.1 0-.14-.061-.14-.18V6.44c0-.1.04-.14.13-.14h1.77c.07 0 .1.04.1.11v8.4h4.16c.09 0 .12.049.1.14l-.26 1.739zm5.6-5.919c0 .08-.05.11-.141.11-.319-.02-.639 0-.949.07-.26.06-.51.15-.75.27-.18.09-.35.22-.49.37v5.1c0 .101-.04.141-.12.141H9.98c-.1 0-.14-.051-.14-.16v-5.54c0-.24 0-.49-.01-.75 0-.26-.01-.52-.02-.78-.01-.221-.03-.441-.06-.661 0-.03 0-.06.02-.09.03-.01.05-.02.08-.01h1.58c.09 0 .15.05.19.16.03.07.06.15.07.23.02.1.03.21.04.31.01.11.01.23.01.36.26-.34.59-.64.96-.86.399-.24.87-.37 1.34-.36.09 0 .13.05.13.14v1.95zm7.2-1.61c.01.06-.021.11-.06.15-.041.02-.09.02-.131 0-.229-.12-.47-.2-.72-.24-.31-.06-.63-.08-.94-.08-.51-.01-1.02.12-1.459.38-.41.25-.73.62-.94 1.05-.229.5-.341 1.05-.33 1.6-.011.4.05.791.16 1.169.1.311.25.601.44.86.17.229.379.431.629.58.24.14.49.25.76.32.25.069.521.11.781.11.289 0 .58-.011.869-.041.24-.029.48-.09.7-.17.08-.06.13-.029.16-.01.04.04.06.1.05.15v1.49c.01.119-.05.22-.15.27-.26.1-.529.17-.81.2-.339.052-.679.072-1.029.072-.49 0-.99-.069-1.459-.199-.461-.12-.891-.33-1.271-.6-.38-.271-.71-.601-.979-.99-.291-.42-.5-.881-.641-1.371-.15-.58-.23-1.17-.221-1.759 0-.98.191-1.86.58-2.6.381-.73.951-1.34 1.66-1.75.711-.41 1.57-.62 2.551-.62.34 0 .68.02 1.02.06.23.03.46.08.67.17.08.05.12.14.11.24V9.16z" 
        fill="#25a3ff"
      />
    </svg>
  ),
  Lr: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path 
        d="M19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-6.99 16.389c0 .051-.029.09-.06.121-.03.02-.06.029-.101.029H6.26c-.11 0-.16-.061-.16-.18V6.44c-.01-.07.04-.13.11-.14h2c.05-.01.11.03.11.08v8.4h4.62c.101 0 .131.049.11.14l-.29 1.739zm6.25-7.859v1.95c0 .08-.05.11-.16.11-.649-.04-1.3.08-1.89.34-.2.09-.39.21-.54.37v5.1c0 .1-.04.14-.13.14h-1.95c-.08.01-.15-.04-.16-.119V11.14c0-.24 0-.49-.01-.75s-.01-.52-.02-.78c-.01-.22-.03-.44-.061-.66-.01-.05.02-.1.07-.11.01-.01.02-.01.04 0h1.75c.1 0 .18.07.21.16.04.07.07.15.08.23.02.1.039.21.05.31.01.11.021.23.021.36.299-.35.66-.64 1.069-.86.46-.25.97-.37 1.49-.36.069-.01.13.04.14.11.001.01.001.02.001.04z" 
        fill="#00e5ff"
      />
    </svg>
  ),
  Cv: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00c4cc" />
          <stop offset="60%" stopColor="#7d2ae8" />
          <stop offset="100%" stopColor="#a300ff" />
        </linearGradient>
      </defs>
      <path 
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z" 
        fill="url(#canva-grad)"
      />
    </svg>
  ),
};

const softwareSkills = [
  { name: "DaVinci Resolve", short: "Dr" },
  { name: "Premiere Pro", short: "Pr" },
  { name: "Lightroom Classic", short: "LrC" },
  { name: "Lightroom Mobile", short: "Lr" },
  { name: "Canva", short: "Cv" },
];

export default function Hero({ onPlayReel, onExploreWorks }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-20 py-20 overflow-hidden bg-dot-pattern bg-grain">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <img 
          src="/assets/rasqhy-bg-hero.webp" 
          alt="Rasqhy Background" 
          className="absolute right-0 top-0 w-full h-full object-cover opacity-45 md:opacity-75 transition-opacity duration-1000 object-[68%_center] md:object-[110%_center]"
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
          <div className="flex flex-wrap gap-3">
            {softwareSkills.map((skill) => {
              const IconComponent = SoftwareIcons[skill.short];
              return (
                <div
                  key={skill.name}
                  title={skill.name}
                  className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md hover:border-white/30 hover:bg-neutral-800/80 transition-all duration-300 select-none p-2.5 shadow-lg shadow-black/30"
                >
                  {IconComponent ? (
                    <IconComponent className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <span className="text-[10px] font-bold text-muted-foreground uppercase font-heading">
                      {skill.short}
                    </span>
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
