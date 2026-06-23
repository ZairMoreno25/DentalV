import { useState } from "react"
import { Plus, Calendar, Filter, Printer, Edit2, ChevronLeft, ChevronRight, Receipt, FileImage, CalendarX, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      name: "Marco Antonio Solís",
      id: "#4529",
      initials: "MA",
      color: "bg-emerald-100 text-emerald-700"
    },
    procedure: "Endodoncia",
    doctor: "Dr. Smith",
    status: "CONFIRMADO"
  },
  {
    time: "10:30 AM",
    patient: {
      name: "Elena Poniatowska",
      id: "#3182",
      initials: "EP",
      color: "bg-blue-100 text-blue-700"
    },
    procedure: "Limpieza General",
    doctor: "Dr. Smith",
    status: "EN ESPERA"
  },
  {
    time: "12:00 PM",
    patient: {
      name: "Roberto Juarroz",
      id: "#8901",
      initials: "RJ",
      color: "bg-red-100 text-red-700"
    },
    procedure: "Ortodoncia",
    doctor: "Dra. Garcia",
    status: "CANCELADO"
  }
]

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  const openModal = (mode: 'create' | 'edit' | 'view', data?: any) => {
    setModalMode(mode);
    setSelectedAppointment(data || null);
    setIsModalOpen(true);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <NuevaCitaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode}
        initialData={selectedAppointment}
      />
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Panel Principal</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Bienvenido de nuevo, Dr. Smith. Tienes 8 citas para hoy.</p>
        </div>
        <Button 
          onClick={() => openModal('create')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shadow-blue-200 dark:shadow-none gap-2 px-5 rounded-lg h-10 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Nueva Cita
        </Button>
      </div>

      {/* Agenda Section */}
      <div className="bg-white dark:bg-[#1E222A] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Agenda de Hoy</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-600 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-600 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableRow className="hover:bg-transparent dark:border-slate-800">
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs tracking-wider">HORA</TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs tracking-wider">PACIENTE</TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs tracking-wider">TRATAMIENTO</TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs tracking-wider">DOCTOR</TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs tracking-wider">ESTADO</TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs tracking-wider text-right pr-6">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendaData.map((item, index) => (
              <TableRow key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 dark:border-slate-800 transition-colors group">
                <TableCell className="font-bold text-slate-800 dark:text-white text-sm py-4">{item.time}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`font-semibold ${item.patient.color} text-xs`}>
                        {item.patient.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">{item.patient.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-600 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-blue-400 text-xs font-semibold">
                    {item.procedure}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-600 dark:text-slate-300 py-4">
                  {item.doctor}
                </TableCell>
                <TableCell className="py-4">
                  <StatusBadge status={item.status as any} />
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openModal('edit', item)} className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-slate-800">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Footer Link / Date Selector */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Mostrando 3 de 12 citas programadas</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white dark:bg-[#1E222A] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </Button>
              <div className="px-4 py-1 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border-x border-slate-200 dark:border-slate-700">
                <Calendar className="w-4 h-4" />
                15 de Octubre, 2023
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </Button>
            </div>
            <Button variant="ghost" className="h-9 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Hoy
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="h-9 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                Anterior
              </Button>
              <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mensajes */}
        <div className="md:col-span-2 bg-white dark:bg-[#1E222A] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Mensajes en clínica</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-bold">Factura generada</span> para Marco Antonio Solís - $450.00</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Hace 25 minutos</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <FileImage className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-bold">Radiografía cargada</span> al perfil de Elena Poniatowska</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Hace 1 hora</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <CalendarX className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-bold">Cita cancelada</span> por Roberto Juarroz (vía WhatsApp)</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Hace 2 horas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mis Notas */}
        <div className="bg-white dark:bg-[#1E222A] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Mis Notas</h2>
          <textarea 
            placeholder="Escribe una nota rápida..."
            className="w-full flex-1 p-3 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none mb-4"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10">
            Guardar nota
          </Button>
        </div>
      </div>
    </div>
  )
}
