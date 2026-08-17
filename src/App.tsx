import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import WorksPage from "./pages/WorksPage";
import TimelinePage from "./pages/TimelinePage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = location.pathname + location.hash;
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const isHomeActive = currentPath === "/" || currentPath === "";
  const isProjectsActive = currentPath === "/#timeline-section" || location.pathname === "/timeline";
  const isFilmsActive = currentPath === "/works#films" || (location.pathname === "/works" && !location.hash);
  const isEditingActive = currentPath === "/works#editing";
  const isPhotoActive = currentPath === "/works#photography";

  if (isAdminRoute) {
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    );
  }

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
              to="/#timeline-section"
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${
                isProjectsActive
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              PROJECTS
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
              to="/works#editing"
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${
                isEditingActive
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              EDITING
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
                to="/#timeline-section"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold tracking-wider transition-all duration-300 flex justify-between items-center ${
                  isProjectsActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>PROJECTS</span>
                {isProjectsActive && <span className="w-1 h-1 rounded-full bg-blue-400"></span>}
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
                to="/works#editing"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold tracking-wider transition-all duration-300 flex justify-between items-center ${
                  isEditingActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>EDITING</span>
                {isEditingActive && <span className="w-1 h-1 rounded-full bg-blue-400"></span>}
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
          <Route path="/timeline" element={<TimelinePage />} />
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
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.518 0 10.011-4.493 10.014-10.011.002-2.673-1.037-5.186-2.93-7.079-1.892-1.893-4.407-2.934-7.087-2.935-5.522 0-10.016 4.493-10.02 10.01-.001 1.734.452 3.425 1.314 4.912L1.082 20.89l3.864-1.013c1.5.82 3.12 1.25 4.7 1.25zM15.54 11.75c-.26-.13-1.56-.77-1.8-.86-.24-.09-.42-.13-.6.13-.18.26-.69.86-.85 1.04-.16.18-.32.2-.58.07a7.31 7.31 0 0 1-2.16-1.33 8.08 8.08 0 0 1-1.49-1.86c-.16-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.18-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.6-1.43-.82-1.97-.22-.53-.44-.45-.6-.46-.15-.01-.33-.01-.52-.01-.19 0-.49.07-.74.34-.26.27-.99.97-.99 2.37s1.02 2.76 1.16 2.95c.14.19 2 3.06 4.85 4.29.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.56-.64 1.78-1.25.22-.61.22-1.13.15-1.25-.07-.12-.26-.19-.52-.32z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
