import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { Lock, LogIn, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg("Supabase configuration missing in .env.local (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY).");
      return;
    }

    setLoading(true);
    try {
      // 1. Try sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInData?.session) {
        if (signInData.user?.id) {
          await supabase.from("tenant_users").upsert({
            tenant_id: "a1b2c3d4-e5f6-7890-abcd-111111111111",
            user_id: signInData.user.id,
            role: "owner"
          }, { onConflict: "tenant_id,user_id" });
        }
        navigate("/admin");
        return;
      }

      // 2. If sign in fails because user is not registered or credentials invalid, attempt native signUp
      const isInvalidCredentials =
        signInError?.message?.toLowerCase().includes("invalid login credentials") ||
        signInError?.message?.toLowerCase().includes("user not found") ||
        signInError?.status === 400;

      if (isInvalidCredentials) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: "Nuriel Rasqhy" }
          }
        });

        if (signUpError) {
          const msg = signUpError.message || String(signUpError);
          setErrorMsg(msg);
        } else if (signUpData?.session) {
          // Link user to tenant_users
          if (signUpData.user?.id) {
            await supabase.from("tenant_users").insert({
              tenant_id: "a1b2c3d4-e5f6-7890-abcd-111111111111",
              user_id: signUpData.user.id,
              role: "owner"
            });
          }
          navigate("/admin");
        } else if (signUpData?.user) {
          // Sign in after sign up if email confirmation was skipped
          const { data: retrySignIn, error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (retrySignIn?.session) {
            navigate("/admin");
          } else {
            setErrorMsg(retryError?.message || "Akun berhasil dibuat. Silahkan login kembali.");
          }
        }
      } else {
        const msg = signInError?.message || "Gagal melakukan login. Periksa email & password.";
        setErrorMsg(msg);
      }
    } catch (err: any) {
      const msg = err?.message || String(err);
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden bg-dot-pattern">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-neutral-950/80 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl relative z-10 space-y-6"
      >
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/10">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-muted-foreground font-sans">
            W4U Multi-Tenant CMS • Portfolio Rasqhy
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> Environment variables for Supabase are missing. Please set <code>VITE_SUPABASE_URL</code> & <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env.local</code>.
            </span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold font-sans text-gray-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="admin@w4u.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold font-sans text-gray-300">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold font-sans text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all duration-300 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                Sign In to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-white/5">
          <button
            onClick={() => navigate("/")}
            className="text-xs text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Portfolio Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
