import { useState, useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(Boolean(session?.user));
      setLoading(false);
    });

    // Listen to real-time auth changes (logout, session expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session?.user));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center space-y-3 font-sans text-foreground">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground font-mono">Memverifikasi Otentikasi Admin...</p>
      </div>
    );
  }

  if (!authenticated) {
    // Redirect to login page if unauthenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
