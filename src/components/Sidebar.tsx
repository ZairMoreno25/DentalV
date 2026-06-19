import { Link, useLocation } from "react-router-dom"
import { ClipboardList, Users, BriefcaseMedical, Building2, Settings, LayoutDashboard, BarChart3, ShoppingCart, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Historiales", path: "/historiales", icon: ClipboardList },
  { name: "Pacientes", path: "/pacientes", icon: Users },
  { name: "Doctores", path: "/doctores", icon: BriefcaseMedical },
  { name: "Clínicas", path: "/clinicas", icon: Building2 },
  { name: "Métricas", path: "/metricas", icon: BarChart3 },
  { name: "Compras", path: "/compras", icon: ShoppingCart },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-[260px] h-screen border-r bg-white dark:bg-[#1E222A] dark:border-slate-800 flex flex-col justify-between shrink-0 transition-colors">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {/* Tooth icon placeholder */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21V11"/><path d="M14 21V11"/><path d="M12 21a4 4 0 0 1-4-4V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v11a4 4 0 0 1-4 4Z"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">DentalPro</h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Clinical Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t dark:border-slate-800 flex flex-col gap-1">
        <Link
          to="/ajustes"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            location.pathname.startsWith("/ajustes")
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
          )}
        >
          <Settings className="w-5 h-5" />
          Ajustes
        </Link>
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20 text-left"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
