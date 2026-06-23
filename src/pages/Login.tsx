import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Smile, User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión. Asegúrese de que el servidor backend esté activo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#a6cce9]">
      {/* Sweeping Abstract Background with blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Base center glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87b9df] via-[#e8f3fa] to-[#87b9df] opacity-80 h-full w-full" />

        {/* Soft blurred SVG shapes for the waves */}
        <div className="absolute inset-0 w-full h-full scale-[1.15] blur-[32px]">
          <svg
            className="w-full h-full opacity-80"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top curve */}
            <path d="M0,150 Q500,550 1000,150 L1000,0 L0,0 Z" fill="#cde4f5" />
            {/* Bottom curve */}
            <path
              d="M0,850 Q500,450 1000,850 L1000,1000 L0,1000 Z"
              fill="#cde4f5"
            />
            {/* Central intersecting swoops */}
            <path
              d="M-100,500 Q500,250 1100,500 Q500,750 -100,500 Z"
              fill="#ffffff"
              fillOpacity="1"
            />
            <path
              d="M0,350 Q500,600 1000,350 Q500,650 0,350 Z"
              fill="#f0f8fd"
              fillOpacity="0.8"
            />
            <path
              d="M0,650 Q500,400 1000,650 Q500,350 0,650 Z"
              fill="#f0f8fd"
              fillOpacity="0.8"
            />
            {/* Additional sweeping lines */}
            <path
              d="M-200,200 Q500,700 1200,200"
              fill="none"
              stroke="#ffffff"
              strokeWidth="40"
              strokeOpacity="0.6"
            />
            <path
              d="M-200,800 Q500,300 1200,800"
              fill="none"
              stroke="#ffffff"
              strokeWidth="40"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative w-[380px] max-w-[90vw] rounded-[24px] p-8 pb-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-[#ebe8f3]/85 backdrop-blur-xl border border-white/60 z-10 animate-in fade-in zoom-in-95 duration-500 ease-out">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-slate-800 text-white p-2.5 rounded-full mb-3 shadow-sm">
            <Smile className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-bold text-[#004282] tracking-tight">
            DentalPro
          </h1>
          <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-[0.2em]">
            Acceso al Sistema
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100/90 border border-red-200 text-red-600 text-[13px] font-medium rounded-lg text-center animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  required
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9 bg-white/80 text-slate-700 border-white/60 focus-visible:ring-[#004282]/30 focus-visible:border-[#004282] transition-colors h-11 shadow-sm rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 tracking-widest font-medium bg-white/80 text-slate-700 border-white/60 focus-visible:ring-[#004282]/30 focus-visible:border-[#004282] transition-colors h-11 shadow-sm rounded-xl"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#004282] hover:bg-[#003060] text-white font-semibold shadow-md shadow-[#004282]/20 h-12 rounded-xl transition-all active:scale-[0.98] text-base flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? "Iniciando..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            ¿Problemas técnicos?{" "}
            <a href="#" className="text-[#004282] font-bold hover:underline">
              Soporte IT
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
