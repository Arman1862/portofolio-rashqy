import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import WorksPage from "./pages/WorksPage";

export default function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = location.pathname + location.hash;

  const isHomeActive = currentPath === "/" || currentPath === "";
  const isFilmsActive = currentPath === "/works#films" || (location.pathname === "/works" && !location.hash);
  const isPhotoActive = currentPath === "/works#photography";

  return (
    <div className="min-h-screen bg-background text-foreground relative bg-grain pb-1">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none -z-20" />
      
      {/* Redesigned Premium Floating Navbar */}
      <div className="sticky top-4 w-full z-50 flex flex-col items-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-4xl rounded-full border border-white/5 bg-neutral-950/60 backdrop-blur-xl px-5 py-2.5 md:px-6 md:py-3 flex items-center justify-between transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold tracking-widest font-heading text-white hover:scale-105 transition-transform duration-300">
            R<span className="text-blue-500">.</span>
          </Link>
          
          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-full">
            <Link
              to="/"
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${
                isHomeActive
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              HOME
            </Link>
            <Link
              to="/works#films"
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${
                isFilmsActive
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              FILMS
            </Link>
            <Link
              to="/works#photography"
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${
                isPhotoActive
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              PHOTOGRAPHY
            </Link>
          </nav>

          {/* Action / Menu Trigger */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:nurielrasqhy@gmail.com"
              className="flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] font-bold font-sans glass-panel glass-panel-hover border border-white/5 text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              LET'S TALK
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 active:scale-90 transition-all duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto mt-2 w-full max-w-4xl rounded-3xl border border-white/5 bg-neutral-950/90 backdrop-blur-xl p-4 flex flex-col gap-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:hidden"
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold tracking-wider transition-all duration-300 flex justify-between items-center ${
                  isHomeActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>HOME</span>
                {isHomeActive && <span className="w-1 h-1 rounded-full bg-blue-400"></span>}
              </Link>
              <Link
                to="/works#films"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold tracking-wider transition-all duration-300 flex justify-between items-center ${
                  isFilmsActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>FILMS</span>
                {isFilmsActive && <span className="w-1 h-1 rounded-full bg-blue-400"></span>}
              </Link>
              <Link
                to="/works#photography"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold tracking-wider transition-all duration-300 flex justify-between items-center ${
                  isPhotoActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>PHOTOGRAPHY</span>
                {isPhotoActive && <span className="w-1 h-1 rounded-full bg-blue-400"></span>}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pages Container */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<WorksPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-12 bg-neutral-950 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-xs font-light text-muted-foreground font-sans">
          <span>© {new Date().getFullYear()} RASQHY.</span>
          <span>All rights reserved.</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/rasqhynurilzz/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-white transition-colors duration-300"
            title="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://wa.me/62881010316931"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-white transition-colors duration-300"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
