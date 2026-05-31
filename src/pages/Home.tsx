import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ExternalLink, Calendar, Film, Volume2, Lock } from "lucide-react";
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
  timecode: string;
  color: "blue" | "amber" | "purple";
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
    timecode: "00:23:05:12",
    color: "blue",
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
    timecode: "00:25:01:00",
    color: "amber",
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
    timecode: "00:25:02:18",
    color: "amber",
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
    timecode: "00:25:03:09",
    color: "amber",
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
    timecode: "00:26:01:24",
    color: "purple",
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
    timecode: "00:26:02:11",
    color: "purple",
    colorClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    dotClass: "border-purple-500",
    glowClass: "bg-purple-500/20"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [activeTimelineId, setActiveTimelineId] = useState<number>(1);

  const activeEvent = timelineEvents.find((e) => e.id === activeTimelineId) || timelineEvents[0];

  const getPlayheadPosition = () => {
    // 6 columns in total. Center of each column is calculated by ((col_index * 2) + 1) * (100 / 12)
    return `${((activeTimelineId - 1) * 2 + 1) * (100 / 12)}%`;
  };

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
        {/* Decorative Glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Chronology</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight">PROJECT TIMELINE</h2>
            <p className="text-sm md:text-base text-muted-foreground font-sans max-w-xl mx-auto font-light leading-relaxed">
              A workspace mockup illustrating my experience path, structured like a video editing project timeline. Click on the clips below to preview details.
            </p>
          </div>

          {/* Interactive Workspace Panel - Stacked Layout */}
          <div className="space-y-8 md:space-y-12">
            
            {/* Top: Program Monitor (Preview Screen) - Centered, comfortable reading width */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl bg-neutral-950/80 border border-white/5 p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-black/80 backdrop-blur-xl">
                
                {/* Viewport pulsers / decorative grid */}
                <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
                
                {/* Pulsing focal point */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className={`w-32 h-32 rounded-full filter blur-xl animate-pulse ${
                    activeEvent.color === "blue" ? "bg-blue-500/40" : activeEvent.color === "amber" ? "bg-amber-500/40" : "bg-purple-500/40"
                  }`} />
                  <div className="absolute w-24 h-24 rounded-full border border-white/5 flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 absolute top-0" />
                  </div>
                </div>

                {/* Viewport Top Bar */}
                <div className="flex justify-between items-center z-10 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[9px] font-mono font-bold tracking-widest text-red-500 uppercase">● PREVIEW</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 tracking-wider">
                    {activeEvent.timecode}
                  </span>
                </div>

                {/* Main Viewport details */}
                <div className="space-y-3 z-10 pt-4 md:pt-6">
                  {/* Period Tag */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider border font-sans uppercase ${activeEvent.colorClass}`}>
                    <Calendar size={8} />
                    {activeEvent.period}
                  </span>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="text-xl lg:text-2xl font-bold font-heading text-white tracking-tight leading-tight">
                      {activeEvent.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest font-sans">
                      {activeEvent.subtitle}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-0.5 bg-white/10" />

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed">
                    {activeEvent.desc}
                  </p>
                </div>

                {/* Viewport Bottom Controls Mock */}
                <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-gray-500 z-10 mt-4 select-none">
                  <span>RES: 1920 x 1080</span>
                  <span>FPS: 23.976</span>
                </div>
              </div>
            </div>

            {/* Bottom: Timeline Panel (Resolve/Premiere mockup) - Spans full width for maximum readability */}
            <div className="w-full">
              <div className="w-full rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
                
                {/* Timeline Header (Workspace name & Mini transport controls) */}
                <div className="bg-neutral-900/60 px-5 py-3.5 border-b border-white/5 flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wider font-sans text-white uppercase">SEQUENCE TIMELINE</span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-950 rounded text-gray-500 font-semibold">v1.0</span>
                  </div>
                  {/* Mock Transport icons */}
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <button className="hover:text-white transition-colors duration-200 cursor-default">◀◀</button>
                    <button className="hover:text-white transition-colors duration-200 cursor-default font-bold">▶</button>
                    <button className="hover:text-white transition-colors duration-200 cursor-default">▶▶</button>
                  </div>
                </div>

                {/* Tracks Container */}
                <div className="flex flex-row">
                  
                  {/* Left Column: Track Control Headers */}
                  <div className="w-24 md:w-32 flex flex-col pt-10 bg-neutral-950/60 border-r border-white/5 font-mono text-[9px] font-semibold text-gray-500 divide-y divide-white/5 select-none">
                    {/* Track V1 */}
                    <div className="h-20 flex flex-col justify-center px-3 space-y-1.5 bg-neutral-950/20">
                      <span className="text-white font-bold flex items-center gap-1.5"><Film size={11} className="text-blue-400" /> V1: VIDEO</span>
                      <div className="flex gap-1.5 text-[8px]">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-blue-500/50 hover:text-blue-400 cursor-pointer">S</span>
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-red-400 cursor-pointer">M</span>
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-white cursor-pointer"><Lock size={8} /></span>
                      </div>
                    </div>
                    {/* Track A1 */}
                    <div className="h-20 flex flex-col justify-center px-3 space-y-1.5 bg-neutral-950/20">
                      <span className="text-white font-bold flex items-center gap-1.5"><Volume2 size={11} className="text-amber-400" /> A1: AUDIO</span>
                      <div className="flex gap-1.5 text-[8px]">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-green-400 cursor-pointer">S</span>
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-red-400 cursor-pointer">M</span>
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-white cursor-pointer"><Lock size={8} /></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Scrollable Tracks & Timeline ruler */}
                  <div className="flex-1 overflow-x-auto relative select-none">
                    <div className="min-w-[800px] md:min-w-full relative">
                      
                      {/* Timeline Ruler */}
                      <div className="h-10 border-b border-white/5 grid grid-cols-6 w-full bg-neutral-950/40 text-[10px] font-mono text-gray-500 select-none">
                        <div className="border-r border-white/5 flex items-end p-2 select-none">2023 - 2025</div>
                        <div className="border-r border-white/5 flex items-end p-2 select-none">2025 (Event)</div>
                        <div className="border-r border-white/5 flex items-end p-2 select-none">2025 (BTS)</div>
                        <div className="border-r border-white/5 flex items-end p-2 select-none">2025 (Screening)</div>
                        <div className="border-r border-white/5 flex items-end p-2 select-none">2026 (Story)</div>
                        <div className="flex items-end p-2 select-none">2026 (Travel)</div>
                      </div>

                      {/* Playhead Indicator (Red vertical line) */}
                      <motion.div
                        animate={{ left: getPlayheadPosition() }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                        className="absolute top-0 bottom-0 w-[2px] bg-red-500/60 z-20 pointer-events-none"
                      >
                        <div className="absolute -top-1 -left-[4px] w-2.5 h-2.5 bg-red-500 rotate-45 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                      </motion.div>

                      {/* Timeline Clips Area */}
                      <div className="divide-y divide-white/5 select-none relative">
                        
                        {/* Track V1 */}
                        <div className="grid grid-cols-6 w-full h-20 relative bg-neutral-950/10">
                          {/* Col 1: School Event Documentation */}
                          <div className="col-start-1 p-2 h-full">
                            <button
                              onClick={() => setActiveTimelineId(1)}
                              className={`w-full h-full rounded-xl px-4 text-left flex flex-col justify-center transition-all cursor-pointer ${
                                activeTimelineId === 1
                                  ? "bg-blue-500/30 border border-blue-500 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.3)] scale-[0.98]"
                                  : "bg-blue-950/20 border border-blue-500/10 text-blue-400 hover:bg-blue-950/30"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">School Event</span>
                              <span className="text-[9px] opacity-60 font-mono">2023 - 2025</span>
                            </button>
                          </div>
                          {/* Col 3: BTS */}
                          <div className="col-start-3 p-2 h-full">
                            <button
                              onClick={() => setActiveTimelineId(3)}
                              className={`w-full h-full rounded-xl px-4 text-left flex flex-col justify-center transition-all cursor-pointer ${
                                activeTimelineId === 3
                                  ? "bg-amber-500/30 border border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-[0.98]"
                                  : "bg-amber-950/20 border border-amber-500/10 text-amber-400 hover:bg-amber-950/30"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">BTS - Pesta Pora</span>
                              <span className="text-[9px] opacity-60 font-mono">2025</span>
                            </button>
                          </div>
                          {/* Col 5: Teman Tegar Maira */}
                          <div className="col-start-5 p-2 h-full">
                            <button
                              onClick={() => setActiveTimelineId(5)}
                              className={`w-full h-full rounded-xl px-4 text-left flex flex-col justify-center transition-all cursor-pointer ${
                                activeTimelineId === 5
                                  ? "bg-purple-500/30 border border-purple-500 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)] scale-[0.98]"
                                  : "bg-purple-950/20 border border-purple-500/10 text-purple-400 hover:bg-purple-950/30"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">Teman Tegar Maira</span>
                              <span className="text-[9px] opacity-60 font-mono">2026</span>
                            </button>
                          </div>
                          {/* Col 6: Travel Documentation */}
                          <div className="col-start-6 p-2 h-full">
                            <button
                              onClick={() => setActiveTimelineId(6)}
                              className={`w-full h-full rounded-xl px-4 text-left flex flex-col justify-center transition-all cursor-pointer ${
                                activeTimelineId === 6
                                  ? "bg-purple-500/30 border border-purple-500 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)] scale-[0.98]"
                                  : "bg-purple-950/20 border border-purple-500/10 text-purple-400 hover:bg-purple-950/30"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">Travel Documentation</span>
                              <span className="text-[9px] opacity-60 font-mono">2026</span>
                            </button>
                          </div>
                        </div>

                        {/* Track A1 */}
                        <div className="grid grid-cols-6 w-full h-20 relative bg-neutral-950/10">
                          {/* Col 2: Lokakarya Placemaker */}
                          <div className="col-start-2 p-2 h-full">
                            <button
                              onClick={() => setActiveTimelineId(2)}
                              className={`w-full h-full rounded-xl px-4 text-left flex flex-col justify-center transition-all cursor-pointer ${
                                activeTimelineId === 2
                                  ? "bg-amber-500/30 border border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-[0.98]"
                                  : "bg-amber-950/20 border border-amber-500/10 text-amber-400 hover:bg-amber-950/30"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">Placemaker Muda</span>
                              <span className="text-[9px] opacity-60 font-mono">2025</span>
                            </button>
                          </div>
                          {/* Col 4: SINILAH Batch #3 */}
                          <div className="col-start-4 p-2 h-full">
                            <button
                              onClick={() => setActiveTimelineId(4)}
                              className={`w-full h-full rounded-xl px-4 text-left flex flex-col justify-center transition-all cursor-pointer ${
                                activeTimelineId === 4
                                  ? "bg-amber-500/30 border border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-[0.98]"
                                  : "bg-amber-950/20 border border-amber-500/10 text-amber-400 hover:bg-amber-950/30"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">SINILAH Batch #3</span>
                              <span className="text-[9px] opacity-60 font-mono">2025</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

              </div>
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
