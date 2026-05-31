import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ExternalLink } from "lucide-react";
import Hero from "../components/Hero";
import CategorySplit from "../components/CategorySplit";
import LightboxModal from "../components/LightboxModal";
import { works } from "../data/works";
import type { WorkItem } from "../data/works";

export default function Home() {
  const navigate = useNavigate();
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  // Play the first video as showreel mockup
  const handlePlayReel = () => {
    const firstVideo = works.find((w) => w.category === "video");
    if (firstVideo) {
      setSelectedWork(firstVideo);
    }
  };

  const handleExploreWorks = () => {
    // Scroll to category gateway
    document.getElementById("gateway-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectCategory = (category: "video" | "photo") => {
    if (category === "video") {
      navigate("/works#films");
    } else {
      navigate("/works#photography");
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero onPlayReel={handlePlayReel} onExploreWorks={handleExploreWorks} />

      {/* Gateway Section container */}
      <div id="gateway-section">
        <CategorySplit onSelectCategory={handleSelectCategory} />
      </div>

      {/* About & Stats Section */}
      <section id="about-section" className="px-6 md:px-20 py-24 bg-neutral-950/60 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Main Statement / Quote */}
          <div className="lg:col-span-2 space-y-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Philosophy</span>
            <blockquote className="text-2xl md:text-4xl font-light font-serif italic text-gray-300 leading-snug">
              "Good editing is invisible. Great editing is unforgettable."
            </blockquote>
            <p className="text-sm md:text-base text-muted-foreground font-sans font-light leading-relaxed max-w-2xl">
              I believe every project has a unique pulse. My job is to find that rhythm, cut away the noise, and construct a narrative that resonates. Whether it is a high-octane commercial edit or a minimalist portrait photograph, the story always comes first.
            </p>
          </div>

          {/* Key Metrics / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8 lg:border-l lg:border-white/5 lg:pl-16">
            <div className="space-y-1">
              <h4 className="text-3xl font-bold font-heading text-white">5+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl font-bold font-heading text-white">50+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">Projects Completed</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl font-bold font-heading text-white">20+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">Happy Clients</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="px-6 md:px-20 py-24 bg-background border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Get in Touch</span>
          <h2 className="text-3xl md:text-6xl font-bold font-heading text-white tracking-tight">START A CONVERSATION</h2>
          <p className="text-sm md:text-base text-muted-foreground font-sans font-light max-w-md mx-auto leading-relaxed">
            Need a professional edit for your next showreel, commercial, or creative photo session? Feel free to reach out.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="mailto:rasqhy@example.com"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-blue-500 text-white font-bold font-sans shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all duration-300 cursor-pointer"
            >
              <Mail size={16} />
              Send Email
            </a>
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full glass-panel glass-panel-hover text-white font-bold font-sans border border-white/5 transition-all duration-300"
            >
              <span>Access Google Drive</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Showreel Lightbox */}
      <LightboxModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}
