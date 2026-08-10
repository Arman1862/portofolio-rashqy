import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Film,
  Volume2,
  Lock,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Clock,
  Layers,
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import {
  fetchTimelineEvents,
  defaultTimelineEvents,
  getColStartClass,
  getColSpanClass,
  getClipStyle,
  type TimelineEventItem
} from "../services/timelineService";

export default function TimelinePage() {
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState<TimelineEventItem[]>(defaultTimelineEvents);
  const [activeTimelineId, setActiveTimelineId] = useState<string | number>(
    defaultTimelineEvents[0]?.id || 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPercent, setPlayheadPercent] = useState<number>(25);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const [activeTrackFilter, setActiveTrackFilter] = useState<'ALL' | 'V2' | 'V1' | 'A1' | 'A2'>('ALL');
  const [searchQuery, setSearchQuery] = useState("");
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Fetch all timeline events from Supabase
  useEffect(() => {
    let isMounted = true;
    fetchTimelineEvents().then((data) => {
      if (isMounted) {
        if (data && data.length > 0) {
          setEventsList(data);
          setActiveTimelineId(data[0].id);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Playhead interval timer when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayheadPercent((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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

  const handleTimelineInteraction = (clientX: number) => {
    if (!timelineContainerRef.current) return;
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPlayheadPercent(percent);

    // Auto-select clip matching scrubbed year
    const yearIndex = Math.max(0, Math.min(3, Math.floor(percent / 25)));
    const targetYear = 2023 + yearIndex;
    const match = eventsList.find(
      (e) => e.start_year <= targetYear && (e.end_year || e.start_year) >= targetYear
    );
    if (match) {
      setActiveTimelineId(match.id);
    }
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

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  const filteredEvents = eventsList.filter((e) => {
    const matchesFilter = activeTrackFilter === 'ALL' || e.track === activeTrackFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-foreground font-sans flex flex-col select-none overflow-x-hidden">
      {/* --- TOP NLE CONTROL BAR --- */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 border-b border-white/10 backdrop-blur-xl px-4 py-3 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-bold font-heading text-white">
                NLE Sequence Workspace
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                Full View
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono hidden md:block">
              Interactive Video Editing Timeline — {eventsList.length} Total Projects
            </p>
          </div>
        </div>

        {/* Center Transport & Timecode Monitor */}
        <div className="flex items-center gap-4">
          {/* Timecode Digital Counter */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-white/10 font-mono text-xs font-bold text-red-400 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{activeEvent?.timecode || "00:25:00:00"}</span>
          </div>

          {/* Transport buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl text-gray-300">
            <button
              onClick={() => setPlayheadPercent(0)}
              className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Reset Playhead"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span className="hidden md:inline">{isPlaying ? "Pause" : "Play"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN WORKSPACE BODY (INSPECTOR + TIMELINE CANVAS) --- */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1700px] w-full mx-auto">
        
        {/* LEFT COLUMN: CLIP INSPECTOR & MEDIA PREVIEW */}
        <div className="w-full lg:w-96 flex flex-col gap-5 shrink-0">
          
          {/* Preview Monitor Card */}
          <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-white/5 pb-3">
              <span className="flex items-center gap-1 text-red-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                PREVIEW MONITOR
              </span>
              <span>FPS: 23.976</span>
            </div>

            {/* Media Player Container */}
            <div className="relative aspect-video rounded-xl bg-neutral-950 border border-white/10 overflow-hidden group shadow-inner">
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-gradient-to-b from-neutral-900 to-neutral-950">
                <div className={`p-3 rounded-full border shadow-xl ${activeEvent?.glowClass}`}>
                  <Film size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{activeEvent?.title}</h3>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">{activeEvent?.subtitle}</p>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                <span>RES: 1920 x 1080</span>
                <span className="text-white font-bold">{activeEvent?.period}</span>
              </div>
            </div>

            {/* Inspector Details */}
            <div className="space-y-3 pt-1">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold text-blue-400 bg-blue-500/10 border-blue-500/20">
                  {activeEvent?.track} LAYER
                </span>
                <h2 className="text-lg font-bold text-white leading-tight font-heading mt-2">
                  {activeEvent?.title}
                </h2>
                <p className="text-xs font-semibold text-blue-400 font-mono mt-0.5">
                  Client / Org: {activeEvent?.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 py-2 border-y border-white/5">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-blue-400" />
                  {activeEvent?.period}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-amber-400" />
                  {activeEvent?.timecode}
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed bg-neutral-950/50 p-3.5 rounded-xl border border-white/5">
                {activeEvent?.desc || "Visual documentation capturing activities, production moments, and storytelling elements."}
              </p>
            </div>
          </div>

          {/* Quick Filter & Search Box */}
          <div className="bg-neutral-900/60 border border-white/10 p-4 rounded-2xl space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari project / klien..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
              {(['ALL', 'V2', 'V1', 'A1', 'A2'] as const).map((tr) => (
                <button
                  key={tr}
                  onClick={() => setActiveTrackFilter(tr)}
                  className={`px-3 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                    activeTrackFilter === tr
                      ? 'bg-blue-500 text-white border-blue-400 shadow-md shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FULL MULTITRACK TIMELINE CANVAS */}
        <div className="flex-1 bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col min-h-[500px]">
          
          {/* Timeline Workspace Header */}
          <div className="bg-neutral-900 border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider font-sans text-white uppercase flex items-center gap-2">
                <Layers size={14} className="text-amber-400" />
                SEQUENCE TIMELINE CANVAS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-950 rounded border border-white/10 text-gray-400 font-bold">
                {filteredEvents.length} Clips
              </span>
            </div>

            <div className="text-[11px] font-mono text-gray-400 hidden sm:block">
              Click & drag playhead line to scrub timeline
            </div>
          </div>

          {/* Track Controls & Canvas Split */}
          <div className="flex-1 flex flex-row relative overflow-hidden">
            
            {/* Left Track Control Labels */}
            <div className="w-24 md:w-32 flex flex-col pt-8 bg-neutral-950/80 border-r border-white/10 font-mono text-[9px] md:text-[10px] font-semibold text-gray-400 divide-y divide-white/5 select-none shrink-0">
              {/* Track V2 */}
              <div className="h-16 flex flex-col justify-center px-3 space-y-1 bg-neutral-950/40">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Film size={12} className="text-amber-400" /> V2: BTS
                </span>
                <div className="flex gap-1 text-[8px]">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-amber-400 border border-amber-500/20">S</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500">M</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500"><Lock size={8} /></span>
                </div>
              </div>

              {/* Track V1 */}
              <div className="h-16 flex flex-col justify-center px-3 space-y-1 bg-neutral-950/40">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Film size={12} className="text-blue-400" /> V1: MAIN
                </span>
                <div className="flex gap-1 text-[8px]">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-blue-400 border border-blue-500/20">S</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500">M</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500"><Lock size={8} /></span>
                </div>
              </div>

              {/* Track A1 */}
              <div className="h-16 flex flex-col justify-center px-3 space-y-1 bg-neutral-950/40">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Volume2 size={12} className="text-emerald-400" /> A1: AUD
                </span>
                <div className="flex gap-1 text-[8px]">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-emerald-400 border border-emerald-500/20">S</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500">M</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500"><Lock size={8} /></span>
                </div>
              </div>

              {/* Track A2 */}
              <div className="h-16 flex flex-col justify-center px-3 space-y-1 bg-neutral-950/40">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Volume2 size={12} className="text-purple-400" /> A2: DIA
                </span>
                <div className="flex gap-1 text-[8px]">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-purple-400 border border-purple-500/20">S</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500">M</span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500"><Lock size={8} /></span>
                </div>
              </div>
            </div>

            {/* Right Interactive Track Canvas */}
            <div className="flex-1 overflow-x-auto relative select-none scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="min-w-[600px] w-full relative">
                
                {/* Timeline Ruler Header */}
                <div
                  ref={timelineContainerRef}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  className="h-8 border-b border-white/10 grid grid-cols-4 w-full bg-neutral-950/60 text-[10px] font-mono text-gray-400 cursor-ew-resize relative"
                >
                  <div className="border-r border-white/10 flex items-center px-3 font-bold">2023</div>
                  <div className="border-r border-white/10 flex items-center px-3 font-bold">2024</div>
                  <div className="border-r border-white/10 flex items-center px-3 font-bold">2025</div>
                  <div className="flex items-center px-3 font-bold">2026</div>
                </div>

                {/* Red Playhead Bar */}
                <motion.div
                  animate={{ left: `${playheadPercent}%` }}
                  transition={isDraggingPlayhead ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 15 }}
                  className="absolute top-0 bottom-0 w-[2px] bg-red-500/80 z-30 pointer-events-none shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                >
                  <div className="absolute -top-1 -left-[5px] w-3 h-3 bg-red-500 rotate-45 shadow-[0_0_12px_rgba(239,68,68,1)]" />
                </motion.div>

                {/* Track Clips Grid Area */}
                <div className="divide-y divide-white/5 relative">
                  {(['V2', 'V1', 'A1', 'A2'] as const).map((trackName) => {
                    const trackClips = filteredEvents.filter((e) => e.track === trackName);
                    return (
                      <div key={trackName} className="grid grid-cols-4 w-full h-16 relative bg-neutral-950/20">
                        {trackClips.map((clip) => {
                          const startCol = getColStartClass(clip.start_year);
                          const spanCol = getColSpanClass(clip.start_year, clip.end_year);
                          const isActive = String(clip.id) === String(activeTimelineId);
                          const clipStyle = getClipStyle(clip.color, isActive);

                          return (
                            <div key={clip.id} className={`${startCol} ${spanCol} p-1.5 h-full`}>
                              <button
                                onClick={() => handleSelectClip(clip.id)}
                                className={`w-full h-full rounded-xl px-3 text-left flex flex-col justify-center transition-all cursor-pointer ${clipStyle}`}
                              >
                                <span className="text-xs font-bold truncate leading-tight">
                                  {clip.title}
                                </span>
                                <div className="flex items-center justify-between text-[8.5px] opacity-75 font-mono mt-0.5">
                                  <span className="truncate">{clip.subtitle}</span>
                                  <span>{clip.period}</span>
                                </div>
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
  );
}
