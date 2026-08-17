import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Film,
  Volume2,
  Lock,
  ArrowLeft,
  Play,
  Pause,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  Palette,
  Camera,
  Music
} from "lucide-react";
import { motion } from "framer-motion";
import {
  fetchTimelineEvents,
  fetchTimelineTracks,
  defaultTimelineEvents,
  defaultTimelineTracks,
  getColStartClass,
  getColSpanClass,
  getClipStyle,
  getTimelineColorClasses,
  type TimelineEventItem,
  type TimelineTrackItem
} from "../services/timelineService";

export default function TimelinePage() {
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState<TimelineEventItem[]>(defaultTimelineEvents);
  const [tracksList, setTracksList] = useState<TimelineTrackItem[]>(defaultTimelineTracks);
  const [activeTimelineId, setActiveTimelineId] = useState<string | number>(
    defaultTimelineEvents[0]?.id || 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPercent, setPlayheadPercent] = useState<number>(12.5);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Fetch all timeline events & tracks from Supabase
  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchTimelineEvents(), fetchTimelineTracks()]).then(([eventsData, tracksData]) => {
      if (isMounted) {
        if (eventsData && eventsData.length > 0) {
          setEventsList(eventsData);
          setActiveTimelineId(eventsData[0].id);
          const firstCol = eventsData[0].column_slot || Math.max(1, Math.min(4, eventsData[0].start_year - 2022));
          setPlayheadPercent((firstCol - 0.5) * 25);
        }
        if (tracksData && tracksData.length > 0) {
          setTracksList(tracksData);
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
            return 12.5;
          }
          const nextPercent = prev + 0.25;
          const colIndex = Math.max(1, Math.min(4, Math.floor(nextPercent / 25) + 1));
          const match = eventsList.find(
            (e) => (e.column_slot || Math.max(1, Math.min(4, e.start_year - 2022))) === colIndex
          );
          if (match) {
            setActiveTimelineId(match.id);
          }
          return nextPercent;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, eventsList]);

  const activeEvent =
    eventsList.find((e) => String(e.id) === String(activeTimelineId)) ||
    eventsList[0] ||
    defaultTimelineEvents[0];

  const handleSelectClip = (id: string | number) => {
    setActiveTimelineId(id);
    const target = eventsList.find((e) => String(e.id) === String(id));
    if (target) {
      const col = target.column_slot || Math.max(1, Math.min(4, target.start_year - 2022));
      setPlayheadPercent((col - 0.5) * 25);
    }
  };

  const handleTimelineInteraction = (clientX: number) => {
    if (!timelineContainerRef.current) return;
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPlayheadPercent(percent);

    // Auto-select clip matching scrubbed sequence column (1 to 4)
    const colIndex = Math.max(1, Math.min(4, Math.floor(percent / 25) + 1));
    const match = eventsList.find(
      (e) => (e.column_slot || Math.max(1, Math.min(4, e.start_year - 2022))) === colIndex
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

        {/* Right Transport: Play Button Only */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30 active:scale-95"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE BODY (INSPECTOR + TIMELINE CANVAS) --- */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1700px] w-full mx-auto">
        
        {/* LEFT COLUMN: SLEEK CLIP INSPECTOR */}
        <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
          <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-white/5 pb-3">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Layers size={14} />
                CLIP INSPECTOR
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold text-blue-400 bg-blue-500/10 border-blue-500/20">
                {activeEvent?.track} LAYER
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-white leading-tight font-heading">
                  {activeEvent?.title}
                </h2>
                <p className="text-xs font-semibold text-blue-400 font-mono mt-1">
                  Client / Org: {activeEvent?.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 py-2.5 border-y border-white/5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-blue-400" />
                  {activeEvent?.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-400" />
                  {activeEvent?.timecode}
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed bg-neutral-950/50 p-4 rounded-xl border border-white/5">
                {activeEvent?.desc || "Visual documentation capturing activities, production moments, and storytelling elements."}
              </p>
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
                {eventsList.length} Clips ({tracksList.length} Tracks)
              </span>
            </div>
          </div>

          {/* Track Controls & Canvas Split */}
          <div className="flex-1 flex flex-row relative overflow-hidden">
            
            {/* Left Track Control Labels */}
            <div className="w-24 md:w-32 flex flex-col pt-8 bg-neutral-950/80 border-r border-white/10 font-mono text-[9px] md:text-[10px] font-semibold text-gray-400 divide-y divide-white/5 select-none shrink-0">
              {tracksList.map((track) => {
                const colorStyles = getTimelineColorClasses(track.color);
                return (
                  <div key={track.id} className="h-16 flex flex-col justify-center px-3 space-y-1 bg-neutral-950/40">
                    <span className="text-white font-bold flex items-center gap-1.5 truncate">
                      {track.icon === 'audio' ? <Volume2 size={12} className={colorStyles.colorClass.split(' ')[0]} /> :
                       track.icon === 'sparkles' ? <Sparkles size={12} className={colorStyles.colorClass.split(' ')[0]} /> :
                       track.icon === 'palette' ? <Palette size={12} className={colorStyles.colorClass.split(' ')[0]} /> :
                       track.icon === 'camera' ? <Camera size={12} className={colorStyles.colorClass.split(' ')[0]} /> :
                       track.icon === 'music' ? <Music size={12} className={colorStyles.colorClass.split(' ')[0]} /> :
                       <Film size={12} className={colorStyles.colorClass.split(' ')[0]} />}
                      {track.track_key}: {track.name}
                    </span>
                    <div className="flex gap-1 text-[8px]">
                      <span className={`px-1.5 py-0.5 rounded bg-neutral-900 border ${colorStyles.colorClass}`}>S</span>
                      <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500">M</span>
                      <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-gray-500"><Lock size={8} /></span>
                    </div>
                  </div>
                );
              })}
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
                  <div className="border-r border-white/10 flex items-center px-3 font-bold text-gray-300 font-mono">SEQ 01</div>
                  <div className="border-r border-white/10 flex items-center px-3 font-bold text-gray-300 font-mono">SEQ 02</div>
                  <div className="border-r border-white/10 flex items-center px-3 font-bold text-gray-300 font-mono">SEQ 03</div>
                  <div className="flex items-center px-3 font-bold text-gray-300 font-mono">SEQ 04</div>
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
                  {tracksList.map((track) => {
                    const trackClips = eventsList.filter((e) => e.track === track.track_key);
                    return (
                      <div key={track.id} className="grid grid-cols-4 w-full h-16 relative bg-neutral-950/20">
                        {trackClips.map((clip) => {
                          const startCol = getColStartClass(clip.start_year, clip.column_slot);
                          const spanCol = getColSpanClass(clip.start_year, clip.end_year, clip.column_slot);
                          const isActive = String(clip.id) === String(activeTimelineId);
                          const clipStyle = getClipStyle(clip.color || track.color, isActive);

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
