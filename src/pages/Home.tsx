import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ExternalLink, Calendar, Film, Volume2, Lock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import CategorySplit from "../components/CategorySplit";
import LightboxModal from "../components/LightboxModal";
import type { WorkItem } from "../data/works";
import {
  fetchTimelineEvents,
  defaultTimelineEvents,
  getColStartClass,
  getColSpanClass,
  getClipStyle,
  type TimelineEventItem
} from "../services/timelineService";

export default function Home() {
  const navigate = useNavigate();
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [eventsList, setEventsList] = useState<TimelineEventItem[]>(defaultTimelineEvents);

  useEffect(() => {
    let isMounted = true;
    fetchTimelineEvents().then((data) => {
      if (isMounted && data && data.length > 0) {
        setEventsList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Prevent background scroll when CV Modal is open (scroll-lock on both html and body)
  useEffect(() => {
    if (isCvOpen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isCvOpen]);

  const [activeTimelineId, setActiveTimelineId] = useState<string | number>(
    eventsList[0]?.id || 1
  );

  useEffect(() => {
    if (eventsList.length > 0 && !eventsList.some((e) => String(e.id) === String(activeTimelineId))) {
      setActiveTimelineId(eventsList[0].id);
    }
  }, [eventsList]);

  const [playheadPercent, setPlayheadPercent] = useState<number>(37.5);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const activeEvent =
    eventsList.find((e) => String(e.id) === String(activeTimelineId)) ||
    eventsList[0] ||
    defaultTimelineEvents[0];

  const handleSelectClip = (id: string | number) => {
    setActiveTimelineId(id);
    const target = eventsList.find((e) => String(e.id) === String(id));
    if (target) {
      const startCol = Math.max(1, Math.min(4, target.start_year - 2022));
      const endCol = Math.max(startCol, Math.min(4, (target.end_year || target.start_year) - 2022));
      const centerCol = (startCol + endCol) / 2;
      setPlayheadPercent((centerCol - 0.5) * 25);
    }
  };

  const getProjectForPercent = (percent: number, currentActiveId: string | number): string | number => {
    if (!eventsList || eventsList.length === 0) return currentActiveId;
    const yearIndex = Math.max(0, Math.min(3, Math.floor(percent / 25)));
    const targetYear = 2023 + yearIndex;

    const currentCover = eventsList.find(e => String(e.id) === String(currentActiveId));
    if (currentCover && currentCover.start_year <= targetYear && (currentCover.end_year || currentCover.start_year) >= targetYear) {
      return currentActiveId;
    }

    const match = eventsList.find(e => e.start_year <= targetYear && (e.end_year || e.start_year) >= targetYear);
    return match ? match.id : (eventsList[0]?.id || currentActiveId);
  };

  const handleTimelineInteraction = (clientX: number) => {
    if (!timelineContainerRef.current) return;
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPlayheadPercent(percent);
    setActiveTimelineId((prev) => getProjectForPercent(percent, prev));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingPlayhead(true);
    handleTimelineInteraction(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleTimelineInteraction(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      setIsDraggingPlayhead(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDraggingPlayhead(true);
    handleTimelineInteraction(e.touches[0].clientX);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      // Prevent browser default scrolling gesture during playhead dragging
      if (moveEvent.cancelable) {
        moveEvent.preventDefault();
      }
      handleTimelineInteraction(moveEvent.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      setIsDraggingPlayhead(false);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    // Register listener with passive: false to allow e.preventDefault()
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleExploreWorks = () => {
    // Scroll to category gateway
    document.getElementById("gateway-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewCv = () => {
    if (window.innerWidth < 768) {
      // Open PDF directly in new tab for mobile viewports to avoid iframe scroll issues
      window.open("/assets/CV Online Rasqhy.pdf", "_blank");
    } else {
      // Show glassmorphic popup viewer modal on desktop
      setIsCvOpen(true);
    }
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
      <Hero onExploreWorks={handleExploreWorks} onViewCv={handleViewCv} />

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
              I believe the most memorable visuals are the ones people can feel. Through editing, photography, and filmmaking, I focus on creating atmospheric and emotionally driven work that stays with people beyond the screen.
            </p>
          </div>

          {/* Key Metrics / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:border-l lg:border-white/5 lg:pl-16">
            <div className="space-y-1">
              <h4 className="text-3xl font-bold font-heading text-white">5+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl font-bold font-heading text-white">50+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">Projects Completed</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline-section" className="px-6 md:px-20 py-24 bg-background relative overflow-hidden border-t border-white/5">
        {/* Decorative Glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-600/5 blur-[100px] md:blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-7xl xl:max-w-[1440px] mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Chronology</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight">PROJECT TIMELINE</h2>
            <p className="text-sm md:text-base text-muted-foreground font-sans max-w-xl mx-auto font-light leading-relaxed">
              A workspace mockup illustrating my experience path, structured like a video editing project timeline. Click on the clips below to preview details.
            </p>
          </div>

          {/* Interactive Workspace Panel - Side-by-Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Program Monitor (Preview Screen) */}
            <div className="lg:col-span-5 w-full flex flex-col">
              <div className="w-full aspect-auto sm:aspect-video lg:aspect-auto lg:h-full min-h-[320px] sm:min-h-0 rounded-2xl bg-neutral-950/80 border border-white/5 p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-black/80 backdrop-blur-xl">
                
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

            {/* Right: Sequence Timeline Panel */}
            <div className="lg:col-span-7 w-full flex flex-col">
              <div className="w-full h-full rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between">
                
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
                  <div className="w-20 md:w-28 flex flex-col pt-8 bg-neutral-950/60 border-r border-white/5 font-mono text-[8px] font-semibold text-gray-500 divide-y divide-white/5 select-none">
                    {/* Track V2 */}
                    <div className="h-12 flex flex-col justify-center px-2 space-y-0.5 bg-neutral-950/20">
                      <span className="text-white font-bold flex items-center gap-1"><Film size={10} className="text-amber-400" /> V2: BTS</span>
                      <div className="flex gap-1 text-[7px] md:text-[8px]">
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 text-amber-500/50 hover:text-amber-400 cursor-pointer">S</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-red-400 cursor-pointer">M</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-white cursor-pointer"><Lock size={7} /></span>
                      </div>
                    </div>
                    {/* Track V1 */}
                    <div className="h-12 flex flex-col justify-center px-2 space-y-0.5 bg-neutral-950/20">
                      <span className="text-white font-bold flex items-center gap-1"><Film size={10} className="text-blue-400" /> V1: MAIN</span>
                      <div className="flex gap-1 text-[7px] md:text-[8px]">
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 text-blue-500/50 hover:text-blue-400 cursor-pointer">S</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-red-400 cursor-pointer">M</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-white cursor-pointer"><Lock size={7} /></span>
                      </div>
                    </div>
                    {/* Track A1 */}
                    <div className="h-12 flex flex-col justify-center px-2 space-y-0.5 bg-neutral-950/20">
                      <span className="text-white font-bold flex items-center gap-1"><Volume2 size={10} className="text-amber-400" /> A1: AUD</span>
                      <div className="flex gap-1 text-[7px] md:text-[8px]">
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-green-400 cursor-pointer">S</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-red-400 cursor-pointer">M</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-white cursor-pointer"><Lock size={7} /></span>
                      </div>
                    </div>
                    {/* Track A2 */}
                    <div className="h-12 flex flex-col justify-center px-2 space-y-0.5 bg-neutral-950/20">
                      <span className="text-white font-bold flex items-center gap-1"><Volume2 size={10} className="text-amber-400" /> A2: DIA</span>
                      <div className="flex gap-1 text-[7px] md:text-[8px]">
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-green-400 cursor-pointer">S</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-red-400 cursor-pointer">M</span>
                        <span className="px-1 py-0.25 rounded-sm bg-neutral-900 hover:text-white cursor-pointer"><Lock size={7} /></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Scrollable Tracks & Timeline ruler */}
                  <div className="flex-1 overflow-x-auto relative select-none scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="min-w-[400px] sm:min-w-0 sm:w-full relative">
                      
                      {/* Timeline Ruler */}
                      <div 
                        ref={timelineContainerRef}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        className="h-8 border-b border-white/5 grid grid-cols-4 w-full bg-neutral-950/40 text-[9px] sm:text-[10px] font-mono text-gray-500 select-none cursor-ew-resize relative"
                      >
                        <div className="border-r border-white/5 flex items-center px-2 py-1 select-none">2023</div>
                        <div className="border-r border-white/5 flex items-center px-2 py-1 select-none">2024</div>
                        <div className="border-r border-white/5 flex items-center px-2 py-1 select-none">2025</div>
                        <div className="flex items-center px-2 py-1 select-none">2026</div>
                      </div>

                      {/* Playhead Indicator (Red vertical line) */}
                      <motion.div
                        animate={{ left: `${playheadPercent}%` }}
                        transition={isDraggingPlayhead ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 15 }}
                        className="absolute top-0 bottom-0 w-[2px] bg-red-500/60 z-20 pointer-events-none"
                      >
                        <div className="absolute -top-1 -left-[4px] w-2.5 h-2.5 bg-red-500 rotate-45 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                      </motion.div>

                      {/* Dynamic Timeline Clips Area */}
                      <div className="divide-y divide-white/5 select-none relative">
                        {(['V2', 'V1', 'A1', 'A2'] as const).map((trackName) => {
                          const trackClips = eventsList.filter((e) => e.track === trackName);
                          return (
                            <div key={trackName} className="grid grid-cols-4 w-full h-12 relative bg-neutral-950/10">
                              {trackClips.map((clip) => {
                                const startCol = getColStartClass(clip.start_year);
                                const spanCol = getColSpanClass(clip.start_year, clip.end_year);
                                const isActive = String(clip.id) === String(activeTimelineId);
                                const clipStyle = getClipStyle(clip.color, isActive);

                                return (
                                  <div key={clip.id} className={`${startCol} ${spanCol} p-1 h-full`}>
                                    <button
                                      onClick={() => handleSelectClip(clip.id)}
                                      className={`w-full h-full rounded-lg px-2 text-left flex flex-col justify-center transition-all cursor-pointer ${clipStyle}`}
                                    >
                                      <span className="text-[9px] sm:text-[10px] font-bold truncate">
                                        {clip.title}
                                      </span>
                                      <span className="text-[7.5px] opacity-60 font-mono">
                                        {clip.period}
                                      </span>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
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
              href="https://drive.google.com/drive/folders/17ioEoimDqOovYBWQ9WDCYskWYZxz00mf?usp=sharing"
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

      {/* PDF CV Modal Viewer */}
      <AnimatePresence>
        {isCvOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
             className="relative w-full max-w-5xl h-[96vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-neutral-950/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">CV Viewer</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs text-muted-foreground font-sans font-light">CV Online Rasqhy.pdf</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/assets/CV Online Rasqhy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans text-blue-400 hover:text-blue-300 transition-all duration-300 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Open in New Tab"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={() => setIsCvOpen(false)}
                    className="text-muted-foreground hover:text-white transition-colors duration-300 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-center"
                    title="Close Viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {/* Modal Body (PDF Viewer) */}
              <div className="flex-1 w-full h-full bg-neutral-950 p-2">
                <iframe
                  src="/assets/CV Online Rasqhy.pdf"
                  className="w-full h-full border-0 rounded-lg bg-neutral-900"
                  title="CV Online Rasqhy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
