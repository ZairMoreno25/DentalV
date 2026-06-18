import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, TriangleAlert, Eye, Pencil, Filter } from "lucide-react"
import StatusBadge from "./StatusBadge"
import { Button } from "@/components/ui/button"

const patientsData = [
  {
    id: "#0492",
    name: "Ana Martínez",
    dob: "12/04/1985",
    initials: "AM",
    avatarColor: "bg-blue-100 text-blue-700",
    lastVisitText: "Hoy, 09:30 AM",
    lastVisitIcon: "calendar",
    treatment: "Limpieza y Profilaxis",
    status: "Completado",
  },
  {
    id: "#0491",
    name: "Carlos Rivera",
    dob: "05/11/1972",
    initials: "CR",
    avatarColor: "bg-slate-200 text-slate-700",
    lastVisitText: "Ayer, 16:00 PM",
    lastVisitIcon: "calendar",
    treatment: "Endodoncia (Fase 1)",
    status: "En Tratamiento",
  },
  {
    id: "#0490",
    name: "Laura Sánchez",
    dob: "22/08/1990",
    initials: "LS",
    avatarColor: "bg-blue-100 text-blue-700",
    lastVisitText: "Hace 3 días",
    lastVisitIcon: "alert",
    treatment: "Extracción Molar",
    status: "Firma Pendiente",
  },
  {
    id: "#0489",
    name: "Roberto Gómez",
    dob: "03/01/1965",
    initials: "RG",
    avatarColor: "bg-slate-200 text-slate-700",
    lastVisitText: "15 Oct 2023",
    lastVisitIcon: "calendar",
    treatment: "Revisión Prótesis",
    status: "Inactivo",
  },
]

export default function PatientsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Registros Recientes</h2>
        <Button variant="outline" className="h-9 gap-2 text-slate-600 font-medium">
          <Filter className="w-4 h-4" />
          Todos los estados
        </Button>
      </div>
      
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">ID</TableHead>
            <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">PACIENTE</TableHead>
            <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">ÚLTIMA VISITA</TableHead>
            <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">TRATAMIENTO PRINCIPAL</TableHead>
            <TableHead className="font-semibold text-slate-500 text-xs tracking-wider">ESTADO</TableHead>
            <TableHead className="font-semibold text-slate-500 text-xs tracking-wider text-right pr-6">ACCIONES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patientsData.map((patient) => (
            <TableRow key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
              <TableCell className="font-medium text-slate-500 text-sm py-4">{patient.id}</TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`font-semibold ${patient.avatarColor}`}>
                      {patient.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{patient.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">DOB: {patient.dob}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  {patient.lastVisitIcon === "calendar" ? (
                    <Calendar className="w-4 h-4 text-slate-400" />
                  ) : (
                    <TriangleAlert className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${patient.lastVisitIcon === 'alert' ? 'text-red-600' : 'text-slate-600'}`}>
                    {patient.lastVisitText}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600 py-4">
                {patient.treatment}
              </TableCell>
              <TableCell className="py-4">
                <StatusBadge status={patient.status as any} />
              </TableCell>
              <TableCell className="text-right py-4 pr-6">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
        <p className="text-sm text-slate-500 font-medium">
          Mostrando 1 a 4 de 102 registros
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0" disabled>
            &lt;
          </Button>
          <span className="text-sm font-medium text-slate-600 px-2">Página 1 de 26</span>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
