import { useState } from "react"
import { Plus, User, CalendarCheck, Calendar, Filter, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/StatCard"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import StatusBadge from "@/components/StatusBadge"
import NuevaCitaModal from "@/components/NuevaCitaModal"

const agendaData = [
  {
    time: "09:00 AM",
    patient: {
      name: "Roberto Méndez",
      id: "#4529",
      initials: "RM",
      color: "bg-blue-100 text-blue-700"
    },
    procedure: "Limpieza y Blanqueamiento",
    status: "CONFIRMADO"
  },
  {
    time: "10:30 AM",
    patient: {
      name: "Elena Castillo",
      id: "#3182",
      initials: "EC",
      color: "bg-emerald-100 text-emerald-700"
    },
    procedure: "Endodoncia (Segunda Sesión)",
    status: "EN ESPERA"
  },
  {
    time: "12:00 PM",
    patient: {
      name: "Juan Salazar",
      id: "#8901",
      initials: "JS",
      color: "bg-slate-200 text-slate-700"
    },
    procedure: "Extracción Muela de Juicio",
    status: "NO ASISTIÓ"
  },
  {
    time: "03:45 PM",
    patient: {
      name: "Ana López",
      id: "#5562",
      initials: "AL",
      color: "bg-blue-100 text-blue-700"
    },
    procedure: "Consulta General",
    status: "CONFIRMADO"
  }
]

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <NuevaCitaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Diario</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Lunes, 14 de Octubre de 2023</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shadow-blue-200 gap-2 px-5 rounded-lg h-10 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Nueva Cita
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="PACIENTES ACTIVOS"
          value="1,248"
          subValue="↑ 12%"
          subValueType="pill"
          icon={<User className="w-6 h-6" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="VISITAS HOY"
          value="24"
          subValue="/30 80% completado"
          subValueType="neutral"
          icon={<CalendarCheck className="w-6 h-6" />}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="REGISTROS PENDIENTES"
          value="7"
          subValue="Requiere atención"
          subValueType="neutral"
          icon={<Calendar className="w-6 h-6" />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Agenda Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">Agenda de Hoy</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-600">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-600">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">HORA</TableHead>
              <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">PACIENTE</TableHead>
              <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">PROCEDIMIENTO</TableHead>
              <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">ESTADO</TableHead>
              <TableHead className="font-semibold text-slate-500 text-xs tracking-wider text-right pr-6">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendaData.map((item, index) => (
              <TableRow key={index} className="hover:bg-slate-50/50 transition-colors group">
                <TableCell className="font-bold text-blue-600 text-sm py-4">{item.time}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`font-semibold ${item.patient.color} text-xs`}>
                        {item.patient.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{item.patient.name}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">ID: {item.patient.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-600 py-4">
                  {item.procedure}
                </TableCell>
                <TableCell className="py-4">
                  <StatusBadge status={item.status as any} />
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Footer Link */}
        <div className="flex items-center justify-center py-4 border-t border-slate-100 bg-white">
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Ver agenda completa
          </button>
        </div>
      </div>
    </div>
  )
}
