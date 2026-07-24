import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Activity, Calendar, Clock, FileText, Loader2, Mail, Phone, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { guardarCita, type Cita, type CitaInput } from "@/lib/citas"

interface NuevaCitaModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved: (cita: Cita) => void
  mode?: "create" | "edit" | "view"
  initialData?: Cita | null
}

const emptyForm = {
  nombre_paciente: "",
  telefono: "",
  correo: "",
  genero: "",
  edad: "",
  fecha: "",
  hora: "",
  minutos: "",
  periodo: "AM",
  motivo: "",
  doctor: "",
}

// El fondo coincide con Género, Hora y Notas; la altura queda fija para que
// los campos que están lado a lado se alineen perfectamente.
const controlClass = "!h-11 !bg-white/70 border border-white/40 text-slate-700 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400"
const notesControlClass = "!bg-white/70 border border-white/40 text-slate-700 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400"

export default function NuevaCitaModal({
  isOpen,
  onClose,
  onSaved,
  mode = "create",
  initialData,
}: NuevaCitaModalProps) {
  const minutesInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isOpen) return
    const [hour24 = "", minutes = ""] = initialData?.hora?.slice(0, 5).split(":") ?? []
    const hourNumber = Number(hour24)
    setForm(initialData ? {
      nombre_paciente: initialData.nombre_paciente,
      telefono: initialData.telefono,
      correo: initialData.correo,
      genero: initialData.genero,
      edad: initialData.edad?.toString() ?? "",
      fecha: initialData.fecha,
      hora: hourNumber === 0 ? "12" : hourNumber > 12 ? String(hourNumber - 12).padStart(2, "0") : hour24,
      minutos: minutes,
      periodo: hourNumber >= 12 ? "PM" : "AM",
      motivo: initialData.motivo,
      doctor: initialData.doctor,
    } : emptyForm)
    setError("")
  }, [initialData, isOpen])

  if (!isOpen) return null

  const readOnly = mode === "view"
  const update = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setIsSaving(true)

    let hour = Number(form.hora)
    if (form.periodo === "PM" && hour < 12) hour += 12
    if (form.periodo === "AM" && hour === 12) hour = 0

    const payload: CitaInput = {
      nombre_paciente: form.nombre_paciente.trim(),
      telefono: form.telefono,
      correo: form.correo.trim(),
      genero: form.genero,
      edad: form.edad ? Number(form.edad) : null,
      fecha: form.fecha,
      hora: `${String(hour).padStart(2, "0")}:${form.minutos.padStart(2, "0")}:00`,
      motivo: form.motivo.trim(),
      doctor: form.doctor.trim(),
      estado: initialData?.estado ?? "en_espera",
    }

    try {
      const cita = await guardarCita(payload, mode === "edit" ? initialData?.id : undefined)
      onSaved(cita)
      onClose()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No fue posible guardar la cita.")
    } finally {
      setIsSaving(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-[540px] max-w-[95vw] max-h-[95vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl bg-[#ebe8f3]/95 backdrop-blur-xl border border-white/60 z-10">
        <button type="button" onClick={onClose} className="absolute top-6 right-6 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white/40 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600">
            {mode === "create" ? "Nueva Cita" : mode === "edit" ? "Editar Cita" : "Detalles de Cita"}
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            {mode === "view" ? "Información detallada de la cita agendada." : "Complete la información para agendar al paciente."}
          </p>
        </div>

        <div className="space-y-5">
          <Field label="Nombre completo" icon={<User className="w-4 h-4" />}>
            <Input required value={form.nombre_paciente} onChange={(e) => update("nombre_paciente", e.target.value)} readOnly={readOnly} placeholder="Nombre del paciente" className={`${controlClass} pl-9`} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Teléfono" icon={<Phone className="w-4 h-4" />}>
              <Input required type="tel" maxLength={10} value={form.telefono} onChange={(e) => update("telefono", e.target.value.replace(/\D/g, ""))} readOnly={readOnly} placeholder="0000000000" className={`${controlClass} pl-9`} />
            </Field>
            <Field label="Correo electrónico" icon={<Mail className="w-4 h-4" />}>
              <Input type="email" value={form.correo} onChange={(e) => update("correo", e.target.value)} readOnly={readOnly} placeholder="ejemplo@correo.com" className={`${controlClass} pl-9`} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-1.5 text-xs font-bold text-slate-700">
              Género
              <select value={form.genero} onChange={(e) => update("genero", e.target.value)} disabled={readOnly} className={`w-full px-3 mt-1.5 rounded-xl text-sm font-normal ${controlClass}`}>
                <option value="">Seleccione</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
                <option value="o">Otro</option>
              </select>
            </label>
            <label className="space-y-1.5 text-xs font-bold text-slate-700">
              Edad
              <Input type="number" min={0} max={120} value={form.edad} onChange={(e) => update("edad", e.target.value)} readOnly={readOnly} className={`mt-1.5 ${controlClass}`} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Fecha de la cita" icon={<Calendar className="w-4 h-4" />}>
              <Input required type="date" value={form.fecha} onChange={(e) => update("fecha", e.target.value)} readOnly={readOnly} className={`${controlClass} pl-9`} />
            </Field>
            <label className="space-y-1.5 text-xs font-bold text-slate-700">
              Hora de la cita
              <div className={`flex items-center gap-1.5 px-3 mt-1.5 rounded-xl ${controlClass}`}>
                <Clock className="w-4 h-4 text-slate-400" />
                <input required value={form.hora} onChange={(e) => update("hora", e.target.value.replace(/\D/g, "").slice(0, 2))} onBlur={() => form.hora && update("hora", Math.min(12, Math.max(1, Number(form.hora))).toString().padStart(2, "0"))} readOnly={readOnly} placeholder="12" className="w-7 text-center bg-transparent outline-none text-sm" />
                <span>:</span>
                <input ref={minutesInputRef} required value={form.minutos} onChange={(e) => update("minutos", e.target.value.replace(/\D/g, "").slice(0, 2))} onBlur={() => form.minutos && update("minutos", Math.min(59, Number(form.minutos)).toString().padStart(2, "0"))} readOnly={readOnly} placeholder="00" className="w-7 text-center bg-transparent outline-none text-sm" />
                <select value={form.periodo} onChange={(e) => update("periodo", e.target.value)} disabled={readOnly} className="ml-auto bg-transparent text-xs font-semibold outline-none">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </label>
          </div>

          <label className="block space-y-1.5 text-xs font-bold text-slate-700">
            Doctor
            <Input value={form.doctor} onChange={(e) => update("doctor", e.target.value)} readOnly={readOnly} placeholder="Nombre del doctor (opcional)" className={`mt-1.5 ${controlClass}`} />
          </label>

          <label className="block space-y-1.5 text-xs font-bold text-slate-700">
            Notas / Motivo de la cita
            <textarea value={form.motivo} onChange={(e) => update("motivo", e.target.value)} readOnly={readOnly} placeholder="Describa el motivo de la consulta..." className={`w-full p-3 mt-1.5 rounded-xl text-sm min-h-[90px] resize-none ${notesControlClass}`} />
          </label>
        </div>

        {error && <p className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">{error}</p>}

        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-2">
            {(mode === "edit" || mode === "view") && (
              <>
                <Button type="button" variant="outline" className="text-blue-600 text-xs"><FileText className="w-4 h-4 mr-2" />Historial Clínico</Button>
                <Button type="button" variant="outline" className="text-purple-600 text-xs"><Activity className="w-4 h-4 mr-2" />Antecedentes</Button>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>{mode === "view" ? "Cerrar" : "Cancelar"}</Button>
            {!readOnly && (
              <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl">
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "create" ? "Guardar Cita" : "Actualizar Cita"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>,
    document.body,
  )
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5 text-xs font-bold text-slate-700">
      {label}
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        {children}
      </div>
    </label>
  )
}
