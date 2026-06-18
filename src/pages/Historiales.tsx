import { Plus, User, CalendarCheck, CalendarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/StatCard"
import PatientsTable from "@/components/PatientsTable"

export default function Historiales() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Historiales Clínicos</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Gestión y revisión de registros de pacientes activos e inactivos.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shadow-blue-200 gap-2 px-5 rounded-lg h-10 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          Nuevo Registro
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="PACIENTES ACTIVOS"
          value="102"
          subValue="+12 este mes"
          subValueType="pill"
          icon={<User className="w-6 h-6" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="VISITAS HOY"
          value="5"
          subValue="/ 9 programadas"
          subValueType="neutral"
          icon={<CalendarCheck className="w-6 h-6" />}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="REGISTROS PENDIENTES"
          value="7"
          subValue="Requieren firma"
          subValueType="danger"
          icon={<CalendarOff className="w-6 h-6" />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Table */}
      <PatientsTable />
    </div>
  )
}
