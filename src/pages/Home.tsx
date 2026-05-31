import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import CategorySplit from "../components/CategorySplit";
import LightboxModal from "../components/LightboxModal";
import { works } from "../data/works";
import type { WorkItem } from "../data/works";

interface TimelineEvent {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  desc: string;
  colorClass: string;
  dotClass: string;
  glowClass: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "School Event Documentation",
    subtitle: "SMKN 53 Jakarta",
    period: "2023–2025",
    desc: "Documented various school events through photography and video coverage over a two-year period.",
    colorClass: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    dotClass: "border-blue-500",
    glowClass: "bg-blue-500/20"
  },
  {
    id: 2,
    title: "Lokakarya Placemaker Muda",
    subtitle: "Kami Ruang Ketiga",
    period: "2025",
    desc: "Produced visual documentation capturing discussions, activities, and workshop atmosphere.",
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20"
  },
  {
    id: 3,
    title: "Behind The Scenes — Operasi Pesta Pora",
    subtitle: "Imajinari",
    period: "2025",
    desc: "Captured behind-the-scenes moments and production activities during the filming process.",
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20"
  },
  {
    id: 4,
    title: "Screening & Discussion — SINILAH Batch #3",
    subtitle: "SINILAH",
    period: "2025",
    desc: "Documented screening sessions and public discussions through cinematic event coverage.",
    colorClass: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    dotClass: "border-amber-500",
    glowClass: "bg-amber-500/20"
  },
  {
    id: 5,
    title: "Teman Tegar Maira",
    subtitle: "Aksa Bumi Langit",
    period: "2026",
    desc: "Created visual documentation focused on event moments, interactions, and storytelling elements.",
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20"
  },
  {
    id: 6,
    title: "Travel Documentation — Pelepasan Tunas Harapan",
    subtitle: "Pesona Mahardika",
    period: "2026",
    desc: "Produced travel-style visual documentation highlighting journeys, activities, and emotional moments.",
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  // Play the first video as showreel mockup
  const handlePlayReel = () => {
    const firstVideo = works.find((w) => w.category === "film" || w.category === "editing");
    if (firstVideo) {
      setSelectedWork(firstVideo);
    }
  };

  const handleExploreWorks = () => {
    // Scroll to category gateway
    document.getElementById("gateway-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectCategory = (category: 'film' | 'editing' | 'photo') => {
    if (category === "film") {
      navigate("/works#films");
    } else if (category === "editing") {
      navigate("/works#editing");
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

      {/* Timeline Section */}
      <section id="timeline-section" className="px-6 md:px-20 py-24 bg-background relative overflow-hidden border-t border-white/5">
        {/* Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Journey</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight">PROJECT TIMELINE</h2>
            <p className="text-sm md:text-base text-muted-foreground font-sans max-w-xl mx-auto font-light leading-relaxed">
              A chronological walkthrough of my visual documentation, behind-the-scenes filmmaking, and creative event coverage.
            </p>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative pl-8 md:pl-0">
            {/* Central Vertical Line (Base) */}
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-white/5 transform md:-translate-x-1/2 pointer-events-none" />

            {/* Glowing vertical path that fades from blue to amber to purple */}
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-amber-500 to-purple-500 opacity-40 transform md:-translate-x-1/2 pointer-events-none" />

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={event.id}
                    className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Event Dot */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                      <div className={`w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 ${event.dotClass} relative`}>
                        {/* Glow ring */}
                        <div className={`absolute -inset-1.5 rounded-full opacity-35 ${event.glowClass} -z-10`} />
                      </div>
                    </div>

                    {/* Timeline Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full md:w-[44%] relative pl-6 md:pl-0"
                    >
                      <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 bg-neutral-950/40 hover:bg-neutral-950/60 transition-all duration-300 shadow-xl space-y-4">
                        {/* Period Badge */}
                        <div className="flex items-center justify-between gap-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider border font-sans uppercase ${event.colorClass}`}>
                            <Calendar size={10} />
                            {event.period}
                          </span>
                        </div>

                        {/* Title and subtitle */}
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-bold font-heading text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors duration-300">
                            {event.title}
                          </h3>
                          <p className="text-xs font-semibold text-muted-foreground font-sans">
                            {event.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed">
                          {event.desc}
                        </p>
                      </div>
                    </motion.div>

                    {/* Empty block to preserve space layout on desktop */}
                    <div className="hidden md:block w-[44%]" />
                  </div>
                );
              })}
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
              href="mailto:nurielrasqhy@gmail.com"
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
