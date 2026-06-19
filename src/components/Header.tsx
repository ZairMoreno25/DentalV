import { useState, useEffect } from "react";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import vaneImage from "@/assets/vane.jpeg";

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="h-20 bg-white dark:bg-[#1E222A] dark:border-slate-800 border-b px-8 flex items-center justify-between shrink-0 transition-colors">
      {/* Search Bar */}
      <div className="relative w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Buscar pacientes, citas o doctores..."
          className="pl-10 bg-slate-50 dark:bg-[#15171C] border-transparent dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 dark:text-slate-200 focus-visible:ring-1 focus-visible:ring-slate-300 dark:focus-visible:ring-slate-700 transition-colors rounded-xl h-10 text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="relative flex items-center justify-between w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full p-1 transition-colors cursor-pointer"
        >
          <div className="relative z-10 w-5 h-5 flex items-center justify-center">
            <Sun className={`w-3.5 h-3.5 transition-colors duration-200 ${isDark ? 'text-slate-500 dark:text-slate-500' : 'text-amber-500'}`} />
          </div>
          <div className="relative z-10 w-5 h-5 flex items-center justify-center">
            <Moon className={`w-3.5 h-3.5 transition-colors duration-200 ${isDark ? 'text-blue-400 dark:text-blue-400' : 'text-slate-400'}`} />
          </div>
          <div className={`absolute top-1 left-1 w-5 h-5 bg-white dark:bg-slate-900 rounded-full transition-transform ${isDark ? 'translate-x-7' : 'translate-x-0'} shadow-sm`} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-50 dark:hover:bg-slate-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1E222A]"></span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Dr. Julian Smith</p>
            <p className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              Cirujano Dentista
            </p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm">
            <AvatarImage src={vaneImage} alt="Dr. Julian Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
