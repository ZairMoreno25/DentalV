import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import vaneImage from "@/assets/vane.jpeg";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b px-8 flex items-center justify-between shrink-0">
      {/* Search Bar */}
      <div className="relative w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Buscar paciente, ID o tratamiento..."
          className="pl-10 bg-slate-50 border-transparent hover:border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:border-slate-300 transition-colors rounded-xl h-10 text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">Dra. Vanessa</p>
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Odontólogo General
            </p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
            {/*<AvatarImage src={vaneImage} alt="Dra. Vanessa" />*/}
            <AvatarImage
              src="https://i.pravatar.cc/150?u=dra-vanessa"
              alt="Dra. Vanessa"
            />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
